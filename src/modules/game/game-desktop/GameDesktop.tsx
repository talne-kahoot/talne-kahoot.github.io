import React from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import {StageFifth, StageFirst, StageFourth, StageSecond, StageSeventh, StageSixth, StageThird} from "./stages";
import {QuestionType} from "../../../components/card/Card.tsx";
import {FullScreenCustomIcon, FullScreenExitCustomIcon} from "../../../components/icons";
import {STAGE} from "../constants.ts";

type User = {
    name: string,
    score: number
};

type Props = {
    users: User[],
    stage: string,
    questions: QuestionType[] | null,
    currentQuestion: QuestionType | null,
    changeStage: () => void,
    lastQuestion?: QuestionType
}

const GameDesktop = ({users, changeStage, stage, questions, currentQuestion, lastQuestion}: Props) => {
    const handle = useFullScreenHandle();

    return (
        <>
            <FullScreenCustomIcon className="full-screen-icon" onClick={handle.enter}/>
            <FullScreen handle={handle}>
                <div className="bg"/>
                {handle.active && <FullScreenExitCustomIcon className="full-screen-icon" onClick={handle.exit}/>}
                <div className="game">
                    {stage === STAGE.START && <StageFirst users={users} changeStage={changeStage}/>}
                    {stage === STAGE.PREVIEW_QUIZ && <StageSecond questions={questions} changeStage={changeStage}/>}
                    {stage === STAGE.PREVIEW_QUESTION &&
                        <StageThird changeStage={changeStage} currentQuestion={currentQuestion}/>}
                    {stage === STAGE.QUESTION_AND_ANSWER &&
                        <StageFourth changeStage={changeStage} currentQuestion={currentQuestion}/>}
                    {stage === STAGE.RESULT && <StageFifth changeStage={changeStage} currentQuestion={currentQuestion} lastQuestion={lastQuestion}/>}
                    {stage === STAGE.SCORE_RESULT && <StageSixth changeStage={changeStage} />}
                    {stage === STAGE.FINISH && <StageSeventh/>}
                </div>
            </FullScreen>
        </>
    );
};

export default GameDesktop;
