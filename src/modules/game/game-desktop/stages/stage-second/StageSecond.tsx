import React, {useEffect, useState} from 'react';
import {QuestionType} from "../../../../../components/card/Card.tsx";
import {Paper, Zoom} from "@mui/material";
import './index.scss';

type Props = {
    questions: QuestionType[] | null,
    changeStage: () => void
}
const StageSecond = ({questions, changeStage}: Props) => {
    const [state, setState] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setState(false);
        }, 2500)

        setTimeout(() => {
            changeStage();
        }, 3000)
    }, []);
    return (
        <div className="game__stage-second">
            <Zoom in={state} className="game__stage-second-zoom" timeout={1000}>
                <Paper elevation={24}>
                    <div className="quantity-question">{questions?.length} Запитань.</div>
                    <div className="stage-second__are-you-ready">Ви готові?</div>
                </Paper>
            </Zoom>
        </div>
    );
};

export default StageSecond;
