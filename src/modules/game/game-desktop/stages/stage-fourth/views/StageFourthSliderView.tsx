import React from 'react';
import Typography from "@mui/material/Typography";
import {SliderTypes} from "../../../../../../types.ts";

import './index.scss';
import {Paper} from "@mui/material";

type Props = {
    currentQuestion?: SliderTypes
};
export const StageFourthSliderView = ({currentQuestion}: Props) => {
    return (
        <>
            <Paper elevation={24} className="stage-fourth__type-answer-view">
                <Typography variant="h6" gutterBottom className="fourth-stage__font">
                    Оберіть число від {currentQuestion?.min} до {currentQuestion?.max}
                </Typography>
            </Paper>
        </>
    );
};
