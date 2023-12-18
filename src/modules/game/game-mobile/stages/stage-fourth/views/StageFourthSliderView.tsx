import React, {useState} from 'react';

import {Slider as SliderMaterial} from "@mui/material";
import {onValue, ref, set} from "firebase/database";
import Button from "@mui/material/Button";

import {QuestionType} from "../../../../../../components/card/Card";
import {QUESTION_TYPE} from "../../../../../../constants";
import {db} from "../../../../../../firebase/firebase";
import {getCorrectScore} from "../utils";

import './index.scss';

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthSliderView = ({currentQuestion, setWaitingState}: Props) => {
    const [value, setValue] = useState(+(currentQuestion?.SLIDER?.min || 0));

    const chooseVariant = (variant: number) => {
        setWaitingState(false);

        const time = sessionStorage.getItem("time");
        const name = sessionStorage.getItem("name");

        const shouldIncreaseStreak = currentQuestion?.SLIDER?.correctVariant === variant;
        let streak = 0;
        const winStreakRef = ref(db, `/game/players/${name}/winStreak`);
        onValue(winStreakRef, (snapshot) => {
            const winStreak = snapshot.val();

            if (shouldIncreaseStreak) {
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

        let isValueInRange;
        if (currentQuestion?.SLIDER?.correctVariant) {
            const correctVariant = +(currentQuestion?.SLIDER?.correctVariant as number);
            isValueInRange = correctVariant - 3 <= (+variant) && (+variant) <= correctVariant + 3;
        }


        if (time && isValueInRange) {
            const refMyScore = ref(db, `/game/players/${name}/score`);
            onValue(refMyScore, (snapshot) => {
                const prevScore = snapshot.val();
                const score = getCorrectScore({
                    type: QUESTION_TYPE.SLIDER,
                    questionTime: currentQuestion?.time,
                    answerTime: +time,
                    streak
                });

                const correctVariant = +(currentQuestion?.SLIDER?.correctVariant as number);
                const coefficient = Math.abs(correctVariant - (+variant)) + 1;

                const scoreWithCoef = Math.floor(score / coefficient);
                sessionStorage.setItem("lastScore", `${scoreWithCoef}`);
                set(refMyScore, +prevScore + scoreWithCoef);
            }, {onlyOnce: true});
        }
    };

    const onSave = () => {
        chooseVariant(value);
    }

    return (
        <div className="stage-fourth__type-answer-view-mobile">
            <SliderMaterial
                valueLabelDisplay="on"
                step={1}
                value={value}
                marks
                min={+(currentQuestion?.SLIDER?.min || 0)}
                max={+(currentQuestion?.SLIDER?.max || 100)}
                onChange={(_, newValue) => setValue(newValue as number)}
            />
            <Button variant="contained" onClick={onSave} className="stage-fourth__type-answer-view-mobile-button">
                Зберегти
            </Button>
        </div>
    );
};
