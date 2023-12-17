import React, {useEffect, useState} from 'react';
import './index.scss';
import Typography from "@mui/material/Typography";
import {CircularProgress, Zoom} from "@mui/material";
import {QuestionType} from "../../../../../components/card/Card.tsx";
import Countdown from "../../../utils/getScoreForWinner.ts";
import {QUESTION_TYPE} from "../../../../../constants.ts";
import {
    StageFourthPuzzleView,
    StageFourthQuizView,
    StageFourthSliderView,
    StageFourthTrueFalseView,
    StageFourthTypeAnswerView
} from "./views";
import {onValue, ref} from "firebase/database";
import {db} from "../../../../../firebase/firebase";

type Props = {
    currentQuestion: QuestionType | null
};

const CLASS_NAME = {
    [QUESTION_TYPE.QUIZ]: 'fourth-stage__quiz',
    [QUESTION_TYPE.TRUE_OR_FALSE]: 'fourth-stage__true-false',
    [QUESTION_TYPE.TYPE_ANSWER]: 'fourth-stage__type-answer',
    [QUESTION_TYPE.SLIDER]: 'fourth-stage__slider',
    [QUESTION_TYPE.PUZZLE]: 'fourth-stage__puzzle',
    '': ''
};


const StageFourth = ({currentQuestion}: Props) => {
    const [waitingState, setWaitingState] = useState(true);
    useEffect(() => {
        if (currentQuestion) {
            const count = new Countdown(null, currentQuestion?.time, () => {
            });
            count.start();
        }

        const name = sessionStorage.getItem("name");
        const userRef = ref(db, `/game/players/${name}/lastAnswer`);

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.questionId === currentQuestion?.id) {
                setWaitingState(false);
            }
        }, {
            onlyOnce: true
        });
    }, [])


    return (<div className={`fourth-stage ${CLASS_NAME[currentQuestion?.questionType || '']}`}>
        {waitingState ? (
                <>
                    {currentQuestion?.questionType === QUESTION_TYPE.QUIZ &&
                        <StageFourthQuizView
                            currentQuestion={currentQuestion}
                            setWaitingState={setWaitingState}
                        />
                    }
                    {currentQuestion?.questionType === QUESTION_TYPE.TRUE_OR_FALSE &&
                        <StageFourthTrueFalseView
                            currentQuestion={currentQuestion}
                            setWaitingState={setWaitingState}
                        />
                    }
                    {currentQuestion?.questionType === QUESTION_TYPE.TYPE_ANSWER &&
                        <StageFourthTypeAnswerView
                            currentQuestion={currentQuestion}
                            setWaitingState={setWaitingState}
                        />
                    }
                    {currentQuestion?.questionType === QUESTION_TYPE.SLIDER &&
                        <StageFourthSliderView
                            currentQuestion={currentQuestion}
                            setWaitingState={setWaitingState}
                        />
                    }
                    {currentQuestion?.questionType === QUESTION_TYPE.PUZZLE &&
                        <StageFourthPuzzleView
                            currentQuestion={currentQuestion}
                            setWaitingState={setWaitingState}
                        />
                    }
                </>
            ) :
            (<div className="fourth-stage__waiting">
                <Zoom in={true} timeout={500}>
                    <div className="fourth-stage__font-wrapper">
                        <Typography variant="h6" gutterBottom className="fourth-stage__font">
                            Очікування результатів
                        </Typography>
                        <CircularProgress className="fourth-stage__circular-progress" size={70}/>
                    </div>
                </Zoom>
            </div>)
        }
    </div>);
};

export default StageFourth;
