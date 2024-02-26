import React, {useState} from 'react';

import {TextField, Zoom} from "@mui/material";
import Button from "@mui/material/Button";

import {QuestionType} from "../../../../../../components/card/Card";
import {QUESTION_TYPE} from '../../../../../../constants';
import {setWinStreakAndScore} from '../utils';

import './index.scss';

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthTypeAnswerView = ({currentQuestion, setWaitingState}: Props) => {
    const [value, setValue] = useState('');

    const chooseVariant = (variant: string) => {
        setWaitingState(false);

        const correctVariant = currentQuestion?.TYPE_ANSWER?.correctVariant || '';
        const isCorrectedAnswer = correctVariant.toLowerCase() === variant.toLowerCase();

        setWinStreakAndScore({
            answer: variant,
            currentQuestion,
            isCorrectedAnswer,
            type: QUESTION_TYPE.TYPE_ANSWER
        });
    };


    const onSave = () => {
        chooseVariant(value);
    }

    return (
        <div className="stage-fourth__type-answer-view-mobile">
            <Zoom in={true} timeout={500}>
                <TextField
                    className="stage-fourth__type-answer-view-mobile-input"
                    label="Ваша відповідь"
                    variant="outlined"
                    value={value}
                    color="primary"
                    focused
                    onChange={e => setValue(e.currentTarget.value)}
                />
            </Zoom>

            <Zoom in={true} timeout={500}>
                <Button
                    variant="contained"
                    onClick={onSave}
                    className="stage-fourth__type-answer-view-mobile-button">
                    Зберегти
                </Button>
            </Zoom>
        </div>
    );
};
