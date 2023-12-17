import React from 'react';
import {DotCustomIcon, SquareCustomIcon, HexagonCustomIcon, StarCustomIcon} from "../../../../../../components/icons";
import {QuizTypes} from "../../../../../../types.ts";

type Props = {
    currentQuestion?: QuizTypes
};
export const StageFourthQuizView = ({currentQuestion}: Props) => {
    return (
        <>
            {currentQuestion?.variantA && <div className="first-button quiz">
                <SquareCustomIcon className="icon"/>
                {currentQuestion?.variantA}
            </div>}

            {currentQuestion?.variantB && <div className="second-button">
                <DotCustomIcon className="icon"/>
                {currentQuestion?.variantB}
            </div>}

            {currentQuestion?.variantC && <div className="third-button">
                <HexagonCustomIcon className="icon"/>
                {currentQuestion?.variantC}
            </div>}

            {currentQuestion?.variantD && <div className="fourth-button">
                <StarCustomIcon className="icon" />
                {currentQuestion?.variantD}
            </div>}
        </>
    );
};
