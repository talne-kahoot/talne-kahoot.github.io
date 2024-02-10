import React, {useEffect, useState} from 'react';
import {Paper, Zoom} from "@mui/material";
import {QuestionType} from "../../../../../components/card/Card.tsx";
import './index.scss';
import {Progress} from "../../../../../components/progress";

type Props = {
    changeStage: () => void,
    currentQuestion: QuestionType | null
}
const StageThird = ({changeStage, currentQuestion}: Props) => {
    const [state, setState] = useState(true);

useEffect(() => {
    setTimeout(() => {
        setState(false);
    }, 5000);
    setTimeout(() => {
        changeStage();
    }, 5500);

}, []);
    return (
        <div className="game__stage-third">
            <div></div>
            <Zoom in={state} className="game__stage-third-zoom" timeout={1000}>
                <Paper elevation={24}>
                    {currentQuestion?.title}
                </Paper>
            </Zoom>
            <Progress/>
        </div>
    );
};

export default StageThird;
