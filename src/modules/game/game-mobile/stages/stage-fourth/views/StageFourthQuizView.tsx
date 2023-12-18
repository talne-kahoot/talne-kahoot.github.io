import React from 'react';
import {onValue, ref, set} from "firebase/database";

import {DotCustomIcon, HexagonCustomIcon, SquareCustomIcon, StarCustomIcon} from "../../../../../../components/icons";
import {QuestionType} from "../../../../../../components/card/Card";
import {QUESTION_TYPE} from "../../../../../../constants";
import {db} from "../../../../../../firebase/firebase";
import {getCorrectScore} from "../utils";

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthQuizView = ({currentQuestion, setWaitingState}: Props) => {
    const chooseVariant = (variant: string) => {
        setWaitingState(false);

        const time = sessionStorage.getItem("time");
        const name = sessionStorage.getItem("name");

        const isCorrectedAnswer = currentQuestion?.QUIZ?.correctVariant === variant;
        let streak = 0;
        const winStreakRef = ref(db, `/game/players/${name}/winStreak`);
        onValue(winStreakRef, (snapshot) => {
            const winStreak = snapshot.val();

            if (isCorrectedAnswer) {
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

        if (time && isCorrectedAnswer) {
            const refMyScore = ref(db, `/game/players/${name}/score`);
            onValue(refMyScore, (snapshot) => {
                const prevScore = snapshot.val();
                const score = getCorrectScore({
                    type: QUESTION_TYPE.QUIZ,
                    questionTime: currentQuestion?.time,
                    answerTime: +time,
                    streak
                });

                sessionStorage.setItem("lastScore", `${score}`);
                set(refMyScore, +prevScore + score);
            }, {onlyOnce: true});
        }
    };

    return (
        <>
            <div onClick={() => chooseVariant('A')} className="fourth-stage__icon square-icon">
                <SquareCustomIcon className="icon"/>
            </div>
            <div onClick={() => chooseVariant('B')} className="fourth-stage__icon circle-icon">
                <DotCustomIcon className="icon"/>
            </div>
            <div onClick={() => chooseVariant('C')} className="fourth-stage__icon triangle-icon">
                <HexagonCustomIcon className="icon"/>
            </div>
            <div onClick={() => chooseVariant('D')} className="fourth-stage__icon star-icon">
                <StarCustomIcon className="icon" />
            </div>
        </>
    );
};
