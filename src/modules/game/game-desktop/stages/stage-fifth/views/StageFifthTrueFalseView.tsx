import React, {useEffect, useState} from 'react';

import CheckIcon from "@mui/icons-material/Check";
import {Button, Zoom} from "@mui/material";
import {onValue, ref} from "firebase/database";

import {DotCustomIcon, SquareCustomIcon} from "../../../../../../components/icons";
import {QuestionType} from "../../../../../../components/card/Card";
import {QUESTION_TYPE} from "../../../../../../constants";
import {db} from "../../../../../../firebase/firebase";
import {getChartElements, getOpacityClassTrueFalse} from "../utils";
import {User} from "../../../../types";

type Props = {
    currentQuestion: QuestionType | null,
    lastQuestion?: QuestionType,
    onClickNextStage: () => void
};

type Accumulator = {
    A: number,
    B: number
};


export const StageFifthTrueFalseView = ({currentQuestion, lastQuestion, onClickNextStage}: Props) => {
    const [playersAnswered, setPlayersAnswered] = useState({A: 0, B: 0});
    const [players, setPlayers] = useState<User[]>([]);
    useEffect(() => {
        const playersRef = ref(db, `/game/players`);

        onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            const answers = Object.values(players) as User[];

            setPlayers(answers);
            const mappedAnswers = answers.length > 0 && answers.reduce((acc: Accumulator, player: User) => {
                const lastAnswer = player.lastAnswer.answer as keyof Accumulator;
                if (lastAnswer && currentQuestion?.id === player.lastAnswer.questionId) {
                    return {...acc, [lastAnswer]: acc[lastAnswer] + 1}
                }
                return acc;
            }, {A: 0, B: 0})
            if (mappedAnswers) {
                setPlayersAnswered(mappedAnswers);
            }
        }, {onlyOnce: true});
    }, []);

    return (
        <>
            <div className="stage-fifth__body">
                <Button variant="outlined" color="success" onClick={onClickNextStage}
                        className="stage-fourth__next-button">
                    {currentQuestion?.id !== lastQuestion?.id ? 'Далі' : 'Результати'}
                </Button>

                <div className="stage-fourth__img stage-fifth__charts">
                    {getChartElements(playersAnswered, QUESTION_TYPE.TRUE_OR_FALSE)
                        .map(({answer, variant, className, icon}, index) => (
                            <Zoom key={index} in={true} timeout={2000}>
                                <div
                                    className={`${className} ${currentQuestion?.TRUE_OR_FALSE?.correctVariant === variant ? '' : 'chart-opacity'}`}>
                                    <div className="number">
                                        {currentQuestion?.TRUE_OR_FALSE?.correctVariant === variant &&
                                            <CheckIcon className="check-icon"/>}
                                        {answer}
                                    </div>

                                    <div className="chart" style={{height: `${100 * answer / players.length}%`}}>
                                    </div>
                                    <div className="icon-wrapper">
                                        {icon}
                                    </div>
                                </div>
                            </Zoom>
                        ))}
                </div>
            </div>

            <div className="stage-fourth__footer">
                <div className={`first-button ${getOpacityClassTrueFalse('A', currentQuestion)}`}>
                    <SquareCustomIcon className="icon"/>
                    Правда
                </div>

                <div className={`second-button ${getOpacityClassTrueFalse('B', currentQuestion)}`}>
                    <DotCustomIcon className="icon"/>
                    Не правда
                </div>
            </div>
        </>
    );
};
