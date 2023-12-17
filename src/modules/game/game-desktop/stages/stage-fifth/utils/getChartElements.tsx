import React from "react";
import {DotCustomIcon, HexagonCustomIcon, SquareCustomIcon, StarCustomIcon} from "../../../../../../components/icons";
import {QUESTION_TYPE} from "../../../../../../constants";

export const getChartElements = (playersAnswered: {[key: string]: number}, type?: QUESTION_TYPE) => {
    const variants = [
        {
            answer: playersAnswered.A,
            variant: 'A',
            className: 'stage-fifth__first-result',
            icon: <SquareCustomIcon className="icon"/>
        },
        {
            answer: playersAnswered.B,
            variant: 'B',
            className: 'stage-fifth__second-result',
            icon: <DotCustomIcon className="icon"/>
        },
        {
            answer: playersAnswered.C,
            variant: 'C',
            className: 'stage-fifth__third-result',
            icon: <HexagonCustomIcon className="icon"/>
        },
        {
            answer: playersAnswered.D,
            variant: 'D',
            className: 'stage-fifth__fourth-result',
            icon: <StarCustomIcon className="icon"/>
        }
    ];
    if (type === QUESTION_TYPE.TRUE_OR_FALSE) {
        return variants.slice(0, 2);
    }

    else return variants;
}
