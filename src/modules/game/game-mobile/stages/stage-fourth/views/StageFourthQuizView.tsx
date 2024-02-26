import React from 'react';

import {DotCustomIcon, HexagonCustomIcon, SquareCustomIcon, StarCustomIcon} from "../../../../../../components/icons";
import {QuestionType} from "../../../../../../components/card/Card";
import {QUESTION_TYPE} from "../../../../../../constants";
import {setWinStreakAndScore} from "../utils";

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthQuizView = ({currentQuestion, setWaitingState}: Props) => {
    const chooseVariant = (variant: string) => {
        setWaitingState(false);

        const isCorrectedAnswer = currentQuestion?.QUIZ?.correctVariant === variant;
        setWinStreakAndScore({
            currentQuestion,
            answer: variant,
            isCorrectedAnswer,
            type: QUESTION_TYPE.QUIZ
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
            <div onClick={() => chooseVariant('C')} className="fourth-stage__icon triangle-icon">
                <HexagonCustomIcon className="icon"/>
            </div>
            <div onClick={() => chooseVariant('D')} className="fourth-stage__icon star-icon">
                <StarCustomIcon className="icon" />
            </div>
        </>
    );
};
