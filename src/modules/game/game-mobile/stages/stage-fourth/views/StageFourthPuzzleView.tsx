import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";

import {QuestionType} from "../../../../../../components/card/Card";
import {MobilePuzzleComponent} from "./MobilePuzzleComponent";
import {QUESTION_TYPE} from "../../../../../../constants";
import {PuzzleType} from "../../../../../../types";
import {setWinStreakAndScore, getCountOfCorrectPuzzleAnswers} from "../utils";

import './index.scss';

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthPuzzleView = ({currentQuestion, setWaitingState}: Props) => {
    const [puzzle, setPuzzle] = useState<PuzzleType[]>([])

    useEffect(() => {
        const puzzle = (currentQuestion?.PUZZLE || []).sort(() => Math.random() - 0.5);
        setPuzzle(puzzle)
    }, [currentQuestion?.PUZZLE])

    const chooseVariant = (variant: PuzzleType[]) => {
        setWaitingState(false);

        const countOfCorrectAnswers = getCountOfCorrectPuzzleAnswers({currentQuestion, answer: variant});
        const isCorrectedAnswer = countOfCorrectAnswers === currentQuestion?.PUZZLE?.length;

        setWinStreakAndScore({
            currentQuestion,
            answer: variant,
            isCorrectedAnswer,
            type: QUESTION_TYPE.PUZZLE
        });
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
