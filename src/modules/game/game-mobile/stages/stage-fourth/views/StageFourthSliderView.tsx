import React, {useState} from 'react';

import {Slider as SliderMaterial} from "@mui/material";
import Button from "@mui/material/Button";

import {QuestionType} from "../../../../../../components/card/Card";
import {QUESTION_TYPE} from "../../../../../../constants";
import {setWinStreakAndScore} from "../utils";

import './index.scss';

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthSliderView = ({currentQuestion, setWaitingState}: Props) => {
    const [value, setValue] = useState(+(currentQuestion?.SLIDER?.min || 0));

    const chooseVariant = (variant: number) => {
        setWaitingState(false);

        const isCorrectedAnswer = currentQuestion?.SLIDER?.correctVariant === variant;
        setWinStreakAndScore({
            currentQuestion,
            answer: variant,
            isCorrectedAnswer,
            type: QUESTION_TYPE.SLIDER
        });
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
