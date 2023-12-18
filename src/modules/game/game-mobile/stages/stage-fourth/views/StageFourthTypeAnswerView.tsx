import React, {useState} from 'react';

import {onValue, ref, set} from "firebase/database";
import {TextField, Zoom} from "@mui/material";
import Button from "@mui/material/Button";

import {QuestionType} from "../../../../../../components/card/Card";
import {QUESTION_TYPE} from '../../../../../../constants';
import {db} from "../../../../../../firebase/firebase";
import {getCorrectScore} from '../utils';

import './index.scss';

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthTypeAnswerView = ({currentQuestion, setWaitingState}: Props) => {
    const [value, setValue] = useState('');

    const chooseVariant = (variant: string) => {
        setWaitingState(false);

        const time = sessionStorage.getItem("time");
        const name = sessionStorage.getItem("name");

        const correctVariant = currentQuestion?.TYPE_ANSWER?.correctVariant || '';
        const isCorrectedAnswer = correctVariant.toLowerCase() === variant.toLowerCase();
        let streak = 0;
        const winStreakRef = ref(db, `/game/players/${name}/winStreak`);
        onValue(winStreakRef, (snapshot) => {
            const winStreak = snapshot.val();

            if (isCorrectedAnswer) {
                streak = winStreak + 1;
                set(winStreakRef, winStreak + 1);
            } else {
                streak = 0;
                set(winStreakRef, 0);
            }
        }, {onlyOnce: true});

        const lastAnswerAnswerRef = ref(db, `/game/players/${name}/lastAnswer/answer`);
        set(lastAnswerAnswerRef, variant);

        const lastAnswerQuestionIdRef = ref(db, `/game/players/${name}/lastAnswer/questionId`);
        set(lastAnswerQuestionIdRef, currentQuestion?.id);

        if (time && isCorrectedAnswer) {
            const refMyScore = ref(db, `/game/players/${name}/score`);
            onValue(refMyScore, (snapshot) => {
                const prevScore = snapshot.val();
                const score = getCorrectScore({
                    type: QUESTION_TYPE.TYPE_ANSWER,
                    questionTime: currentQuestion?.time,
                    answerTime: +time,
                    streak
                });

                sessionStorage.setItem("lastScore", `${score}`);
                set(refMyScore, +prevScore + score);
            }, {onlyOnce: true});
        }
    };

    const onSave = () => {
        chooseVariant(value);
    }

    return (
        <div className="stage-fourth__type-answer-view-mobile">
            <Zoom in={true} timeout={500}>
                <TextField
                    className="stage-fourth__type-answer-view-mobile-input"
                    label="Ваша відповідь"
                    variant="outlined"
                    value={value}
                    color="primary"
                    focused
                    onChange={e => setValue(e.currentTarget.value)}
                />
            </Zoom>

            <Zoom in={true} timeout={500}>
                <Button variant="contained" onClick={onSave}
                        className="stage-fourth__type-answer-view-mobile-button">
                    Зберегти
                </Button>
            </Zoom>
        </div>
    );
};
