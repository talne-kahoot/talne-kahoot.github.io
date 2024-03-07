import React, {useEffect, useState} from 'react';
import {onValue, ref} from "firebase/database";

import {StageFifth, StageFirst, StageFourth, StageSecond, StageSeventh, StageSixth, StageThird} from "./stages";
import {QuestionType} from "../../../components/card/Card.tsx";
import {db} from "../../../firebase/firebase.ts";
import {STAGE} from "../constants.ts";
import {User} from "../types";

import './index.scss';
import {useNavigate} from "react-router-dom";

type Props = {
    users: User[],
    stage: string,
    currentQuestion: QuestionType | null
}
const GameMobile = ({users, stage, currentQuestion}: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        let xBot: number | null = null;
        let yBot: number | null = null;

        document.addEventListener('touchstart', (e) => {
            xBot = e.touches[0].clientX;
            yBot = e.touches[0].clientY;
        }, {passive: false});

        document.addEventListener('touchmove', (e) => {
            if (!xBot || !yBot) {
                return;
            }

            const xTop = e.touches[0].clientX;
            const yTop = e.touches[0].clientY;

            const xDiff = xBot - xTop;
            const yDiff = yBot - yTop;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                if (xDiff > 0) {
                    /* left swipe */
                    e.preventDefault(); // Prevents swipe back action
                } else {
                    /* right swipe */
                    e.preventDefault(); // Prevents swipe back action
                }
            }
            /* reset values */
            xBot = null;
            yBot = null;
        }, {passive: false});



        const isActiveGameRef = ref(db, '/isGameActive');
        onValue(isActiveGameRef, (snapshot) => {
            const isGameActive = snapshot.val();

            if (!isGameActive) {
                sessionStorage.removeItem("name");
                navigate("/");
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
