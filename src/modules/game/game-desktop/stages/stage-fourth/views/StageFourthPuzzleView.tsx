import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";

export const StageFourthPuzzleView = () => {
    return (
        <>
            <Paper elevation={24} className="stage-fifth__puzzle-paper">
                <Typography variant="h6" gutterBottom className="fourth-stage__font">
                    Від найбільшого до найменшого <FilterListIcon className="fourth-stage__puzzle-icon"/>
                </Typography>
            </Paper>
        </>
    );
};
