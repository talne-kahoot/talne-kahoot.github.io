import React, {useEffect, useRef, useState} from 'react';
import {Paper, Zoom} from "@mui/material";

import {QuestionType} from "../../../../../components/card/Card.tsx";
import Countdown from "../../../utils/getScoreForWinner.ts";

import './index.scss';
import {User} from "../../../types.ts";
import {onValue, ref} from "firebase/database";
import {db} from "../../../../../firebase/firebase.ts";
import {QUESTION_TYPE} from "../../../../../constants.ts";
import {
    StageFourthPuzzleView,
    StageFourthQuizView,
    StageFourthSliderView,
    StageFourthTrueFalseView,
    StageFourthTypeAnswerView
} from "./views";

type Props = {
    changeStage: () => void,
    currentQuestion: QuestionType | null
};

type CountRef = null | Countdown;

const StageFourth = ({changeStage, currentQuestion}: Props) => {
    const timerRef = useRef(null);
    const [answered, setAnswered] = useState<number>(0);
    const [isChanged, setIsChanged] = useState(false);
    const [playersNumber, setPlayersNumber] = useState<number>(0);
    const countRef = useRef<CountRef>(null);

    useEffect(() => {
        const playersRef = ref(db, `/game/players`);
        onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            const arrayPlayers = Object.values(players) as User[];

            const answered = arrayPlayers.reduce((acc: number, player: User) => {
                if (player.lastAnswer.questionId === currentQuestion?.id) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            setPlayersNumber(arrayPlayers.length);
            setAnswered(answered);

        });
    }, []);

    useEffect(() => {
        if (timerRef.current && currentQuestion?.time) {
            countRef.current = new Countdown(timerRef.current, currentQuestion.time, () => {
                onChangeStage();
            });

            countRef.current && countRef.current.start();
        }
    }, []);

    useEffect(() => {
        if (playersNumber === answered && playersNumber > 0 && answered > 0) {
            countRef.current && countRef.current.stop();
        }
    }, [answered, playersNumber])

    const onChangeStage = () => {
        if (!isChanged) {
            setIsChanged(true);
            changeStage();
        }
    }


    return (
        <div className="stage-fourth">
            <Zoom in={true} timeout={500}>
                <div className="stage-fourth__header">
                    <Paper elevation={24} className="stage-fourth__header-paper">
                        {currentQuestion?.title}
                    </Paper>
                </div>
            </Zoom>

            <Zoom in={true} timeout={500}>
                <div className="stage-fourth__body">
                    <div className="stage-fourth__timer">
                        <span ref={timerRef}>{currentQuestion?.time}</span>
                        <div>Час</div>
                    </div>

                    <div className="stage-fourth__img">
                        {currentQuestion?.img && <img src={currentQuestion?.img} alt="image"/>}
                    </div>

                    <div className="stage-fourth__number-of-question">
                        <div className="stage-fourth__number-of-question-count">
                            {answered}
                        </div>
                        <span>
                        Відп.
                    </span>
                    </div>
                </div>
            </Zoom>

            <Zoom in={true} timeout={500}>
                <div className="stage-fourth__footer">
                    {currentQuestion?.questionType === QUESTION_TYPE.QUIZ &&
                        <StageFourthQuizView currentQuestion={currentQuestion.QUIZ}/>}
                    {currentQuestion?.questionType === QUESTION_TYPE.TRUE_OR_FALSE && <StageFourthTrueFalseView/>}
                    {currentQuestion?.questionType === QUESTION_TYPE.TYPE_ANSWER && <StageFourthTypeAnswerView/>}
                    {currentQuestion?.questionType === QUESTION_TYPE.SLIDER &&
                        <StageFourthSliderView currentQuestion={currentQuestion.SLIDER}/>}
                    {currentQuestion?.questionType === QUESTION_TYPE.PUZZLE && <StageFourthPuzzleView/>}
                </div>
            </Zoom>
        </div>
    );
};

export default StageFourth;
