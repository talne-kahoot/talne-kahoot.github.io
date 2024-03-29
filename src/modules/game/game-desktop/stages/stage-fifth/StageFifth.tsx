import React from 'react';

import {QuestionType} from "../../../../../components/card/Card.tsx";
import {QUESTION_TYPE} from "../../../../../constants.ts";
import {
    StageFifthPuzzleView,
    StageFifthQuizView,
    StageFifthSliderView,
    StageFifthTrueFalseView,
    StageFifthTypeAnswerView
} from "./views";

import './index.scss';
import {Paper, Zoom} from "@mui/material";

type Props = {
    changeStage: () => void,
    currentQuestion: QuestionType | null,
    lastQuestion?: QuestionType,
    isAdmin: boolean
};


const StageFifth = ({changeStage, currentQuestion, lastQuestion, isAdmin}: Props) => {

    const onClick = () => {
        changeStage();
    };

    return (
        <div className="stage-fourth stage-fifth">
            <Zoom in={true} timeout={500}>
                <div className="stage-fourth__header">
                    <Paper elevation={24} className="stage-fourth__header-paper">
                        {currentQuestion?.title}
                    </Paper>
                </div>
            </Zoom>
            {currentQuestion?.questionType === QUESTION_TYPE.QUIZ &&
                <StageFifthQuizView
                    currentQuestion={currentQuestion}
                    lastQuestion={lastQuestion}
                    onClickNextStage={onClick}
                    isAdmin={isAdmin}
                />
            }
            {currentQuestion?.questionType === QUESTION_TYPE.TRUE_OR_FALSE &&
                <StageFifthTrueFalseView
                    currentQuestion={currentQuestion}
                    lastQuestion={lastQuestion}
                    onClickNextStage={onClick}
                    isAdmin={isAdmin}
                />
            }
            {currentQuestion?.questionType === QUESTION_TYPE.TYPE_ANSWER &&
                <StageFifthTypeAnswerView
                    currentQuestion={currentQuestion}
                    lastQuestion={lastQuestion}
                    onClickNextStage={onClick}
                    isAdmin={isAdmin}
                />
            }
            {currentQuestion?.questionType === QUESTION_TYPE.SLIDER &&
                <StageFifthSliderView
                    currentQuestion={currentQuestion}
                    lastQuestion={lastQuestion}
                    onClickNextStage={onClick}
                    isAdmin={isAdmin}
                />
            }
            {currentQuestion?.questionType === QUESTION_TYPE.PUZZLE &&
                <StageFifthPuzzleView
                    currentQuestion={currentQuestion}
                    lastQuestion={lastQuestion}
                    onClickNextStage={onClick}
                    isAdmin={isAdmin}
                />
            }
        </div>
    );
};

export default StageFifth;
