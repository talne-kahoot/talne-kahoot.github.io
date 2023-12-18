import React, {useEffect, useState} from 'react';
import {onChildChanged, onValue, ref} from "firebase/database";

import {StageFifth, StageFirst, StageSecond, StageSeventh,StageFourth, StageSixth, StageThird} from "./stages";
import {QuestionType} from "../../../components/card/Card.tsx";
import {db} from "../../../firebase/firebase.ts";
import {STAGE} from "../constants.ts";
import {User} from "../types";

import './index.scss';

type Props = {
    users: User[],
    stage: string,
    currentQuestion: QuestionType | null
}
const GameMobile = ({users, stage, currentQuestion}: Props) => {
    const [startedGame, setStartedGame] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        onValue(ref(db, '/game/startedGame'), (snapshot) => {
            const data = snapshot.val();
            if (data && !startedGame) {
                setStartedGame(true);
            }
        });
    }, []);

    useEffect(() => {
        const userName = sessionStorage.getItem("name");
        users.forEach((user) => {
            if (user.name === userName) {
                setCurrentUser(user);
            }
        });
    }, [users]);

    const startedGameRef = ref(db, '/game');
    onChildChanged(startedGameRef, (snapshot) => {
        const data = snapshot.val();
        if (typeof data === 'boolean' && data && !startedGame) {
            setStartedGame(true);
        }
    });

    return (
        <div className="mobile-wrapper-game">
            {stage === STAGE.START && <StageFirst currentUser={currentUser}/>}
            {stage === STAGE.PREVIEW_QUIZ && <StageSecond/>}
            {stage === STAGE.PREVIEW_QUESTION && <StageThird currentQuestion={currentQuestion}/>}
            {stage === STAGE.QUESTION_AND_ANSWER && <StageFourth currentQuestion={currentQuestion} />}
            {stage === STAGE.RESULT && <StageFifth currentQuestion={currentQuestion} />}
            {stage === STAGE.SCORE_RESULT && <StageSixth/>}
            {stage === STAGE.FINISH && <StageSeventh/>}

        </div>
    );
};

export default GameMobile;
