import React from 'react';

import {DotCustomIcon, SquareCustomIcon} from "../../../../../../components/icons";
import {QuestionType} from "../../../../../../components/card/Card";
import {setWinStreakAndScore} from "../utils";
import {QUESTION_TYPE} from "../../../../../../constants.ts";

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthTrueFalseView = ({currentQuestion, setWaitingState}: Props) => {

    const chooseVariant = (variant: string) => {
        setWaitingState(false);

        const isCorrectedAnswer = currentQuestion?.TRUE_OR_FALSE?.correctVariant === variant;
        setWinStreakAndScore({
            currentQuestion,
            answer: variant,
            isCorrectedAnswer,
            type: QUESTION_TYPE.TRUE_OR_FALSE
        });

    };

    return (
        <>
            <div onClick={() => chooseVariant('A')} className="fourth-stage__icon square-icon">
                <SquareCustomIcon className="icon"/>
            </div>
            <div onClick={() => chooseVariant('B')} className="fourth-stage__icon circle-icon">
                <DotCustomIcon className="icon"/>
            </div>
        </>
    );
};
