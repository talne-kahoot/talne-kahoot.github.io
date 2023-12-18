import React, {useEffect, useState} from 'react';

import {onValue, ref, set} from "firebase/database";

import {QuestionType} from "../../../../../../components/card/Card";
import {db} from "../../../../../../firebase/firebase";
import Button from "@mui/material/Button";

import './index.scss';
import {MobilePuzzleComponent} from "./MobilePuzzleComponent";
import {PuzzleType} from "../../../../../../types";
import {getCorrectScore} from "../utils";
import {QUESTION_TYPE} from "../../../../../../constants";

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthPuzzleView = ({currentQuestion, setWaitingState}: Props) => {
    const [puzzle, setPuzzle] = useState<PuzzleType[]>([])

    useEffect(() => {
        const puzzle = (currentQuestion?.PUZZLE || []).sort(() => Math.random() - 0.5);
        setPuzzle(puzzle)
    }, [])
    const chooseVariant = (variant: PuzzleType[]) => {
        setWaitingState(false);

        const time = sessionStorage.getItem("time");
        const name = sessionStorage.getItem("name");

        const correctVariant = [...currentQuestion?.PUZZLE || []].sort((a, b) => a.id - b.id );
        let countOfCorrectAnswers = 0;
        variant.forEach((item, index) => {
            if (item?.id === correctVariant?.[index]?.id) {
                countOfCorrectAnswers++;
            }
        })

        let streak = 0;
        const winStreakRef = ref(db, `/game/players/${name}/winStreak`);
        onValue(winStreakRef, (snapshot) => {
            const winStreak = snapshot.val();

            if (countOfCorrectAnswers === correctVariant.length) {
                streak = winStreak + 1;
                set(winStreakRef, winStreak + 1);
            } else {
                streak = 0;
                set(winStreakRef, 0);
            }
        }, {onlyOnce: true});

        const lastAnswerAnswerRef = ref(db, `/game/players/${name}/lastAnswer/answer`);
        set(lastAnswerAnswerRef, variant);

        const lastAnswerQuestionIdRef = ref(db, `/game/players/${name}/lastAnswer/questionId`);
        set(lastAnswerQuestionIdRef, currentQuestion?.id);

        if (time && countOfCorrectAnswers > 0) {
            const refMyScore = ref(db, `/game/players/${name}/score`);
            onValue(refMyScore, (snapshot) => {
                const prevScore = snapshot.val();
                const score = getCorrectScore({
                    type: QUESTION_TYPE.PUZZLE,
                    questionTime: currentQuestion?.time,
                    answerTime: +time,
                    streak
                });

                const quantityOfQuestions = currentQuestion?.PUZZLE?.length || 1;
                const scoreByCorrectAnswers = Math.floor((score / quantityOfQuestions) * countOfCorrectAnswers);
                sessionStorage.setItem("lastScore", `${scoreByCorrectAnswers}`);
                set(refMyScore, +prevScore + scoreByCorrectAnswers);
            }, {onlyOnce: true});
        }
    };

    const onSave = () => {
        chooseVariant(puzzle);
    }

    const data = currentQuestion?.PUZZLE && currentQuestion?.PUZZLE?.length ? currentQuestion?.PUZZLE : [];
    return (
        <div className="stage-fourth__type-answer-view-mobile">
            <MobilePuzzleComponent data={data} setData={setPuzzle}/>
            <Button variant="contained" onClick={onSave} className="stage-fourth__type-answer-view-mobile-button">
                Зберегти
            </Button>
        </div>
    );
};
