import React from 'react';
import Typography from "@mui/material/Typography";

import './index.scss';
import {Paper} from "@mui/material";

export const StageFourthTypeAnswerView = () => {
    return (
        <Paper elevation={24} className="stage-fourth__type-answer-view">
            <Typography variant="h6" gutterBottom className="stage-fourth__type-answer-view__font">
                Введіть відповідь на телефоні
            </Typography>
        </Paper>
    );
};
