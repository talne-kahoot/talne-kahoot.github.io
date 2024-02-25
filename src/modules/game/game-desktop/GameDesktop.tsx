import React, {useEffect, useState} from 'react';

import {StageFifth, StageFirst, StageFourth, StageSecond, StageSeventh, StageSixth, StageThird} from "./stages";
import {FullScreenCustomIcon, FullScreenExitCustomIcon} from "../../../components/icons";
import {QuestionType} from "../../../components/card/Card.tsx";
import {closeFullscreen, openFullscreen} from "./utils";
import {STAGE} from "../constants.ts";
import {User} from "../types";


type Props = {
    users: User[],
    stage: string,
    questions: QuestionType[] | null,
    currentQuestion: QuestionType | null,
    changeStage: () => void,
    lastQuestion?: QuestionType
}

const GameDesktop = ({users, changeStage, stage, questions, currentQuestion, lastQuestion}: Props) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const isAuth = sessionStorage.getItem("isAuth");
        if (isAuth) {
            setIsAdmin(true);
        }

        document.addEventListener('fullscreenchange', () => {
            function onFullscreenChange() {
                setIsFullscreen(Boolean(document.fullscreenElement));
            }

            document.addEventListener('fullscreenchange', onFullscreenChange);

            return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
        });

    }, [])

    const onChangeFullScreen = () => {
        if (isFullscreen) {
            closeFullscreen();
        } else {
            openFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    }

    const fullScreenIconClassName = `full-screen-icon ${stage === STAGE.START ? '' : 'opacity_0_1'}`
    return (
        <>
            {!isFullscreen && <FullScreenCustomIcon className={fullScreenIconClassName} onClick={onChangeFullScreen}/>}
            <div className="bg"/>
            {isFullscreen &&
                <FullScreenExitCustomIcon className={fullScreenIconClassName} onClick={onChangeFullScreen}/>}
            <div className="game">
                {stage === STAGE.START && <StageFirst users={users} changeStage={changeStage} isAdmin={isAdmin}/>}
                {stage === STAGE.PREVIEW_QUIZ && <StageSecond questions={questions} changeStage={changeStage}/>}
                {stage === STAGE.PREVIEW_QUESTION &&
                    <StageThird changeStage={changeStage} currentQuestion={currentQuestion}/>
                }
                {stage === STAGE.QUESTION_AND_ANSWER &&
                    <StageFourth changeStage={changeStage} currentQuestion={currentQuestion}/>
                }
                {stage === STAGE.RESULT &&
                    <StageFifth
                        changeStage={changeStage}
                        currentQuestion={currentQuestion}
                        lastQuestion={lastQuestion}
                        isAdmin={isAdmin}
                    />
                }
                {stage === STAGE.SCORE_RESULT && <StageSixth changeStage={changeStage} isAdmin={isAdmin}/>}
                {stage === STAGE.FINISH && <StageSeventh isAdmin={isAdmin}/>}
            </div>
        </>
    );
};

export default GameDesktop;
