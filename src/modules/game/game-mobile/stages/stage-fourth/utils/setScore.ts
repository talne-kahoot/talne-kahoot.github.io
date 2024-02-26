import {onValue, ref, set} from "firebase/database";

import {QuestionType} from "../../../../../../components/card/Card.tsx";
import {QUESTION_TYPE} from "../../../../../../constants.ts";
import {db} from "../../../../../../firebase/firebase.ts";
import {getScoreForSlider} from "./getScoreForSlider.ts";
import {getScoreForPuzzle} from "./getScoreForPuzzle.ts";
import {PuzzleType} from "../../../../../../types.ts";
import {getCorrectScore} from "./getCorrectScore.ts";
import {isSliderInRange} from "./isSliderInRange.ts";
import {getCountOfCorrectPuzzleAnswers} from "./getCountOfCorrectPuzzleAnswers.ts";

type Props = {
    name: string,
    isCorrectedAnswer: boolean,
    streak: number,
    type: QUESTION_TYPE,
    currentQuestion: QuestionType | null,
    answer: PuzzleType[] | string | number
};

export const setScore = (props: Props) => {
    const {name, isCorrectedAnswer, streak, type, currentQuestion, answer = null} = props;
    const startedTimeRef = ref(db, '/game/startedTime');

    onValue(startedTimeRef, (snapshot) => {
        const startedTime = snapshot.val();
        const now = +(new Date());
        const diff = Math.floor(Math.abs((startedTime - now)));

        const isCorrectSlider = isSliderInRange({
            currentQuestion,
            answer,
            type
        });

        let countCorrectPuzzle = 0;
        let isCorrectPuzzle = false;
        if (type === QUESTION_TYPE.PUZZLE) {
            countCorrectPuzzle = getCountOfCorrectPuzzleAnswers({
                currentQuestion,
                answer: answer as PuzzleType[]
            });

            const puzzle = currentQuestion?.PUZZLE?.length;
            isCorrectPuzzle = !!puzzle && countCorrectPuzzle > puzzle / 2;
        }

        if (isCorrectedAnswer || isCorrectSlider || isCorrectPuzzle) {
            const refMyScore = ref(db, `/game/players/${name}/score`);
            onValue(refMyScore, (snapshot) => {
                const prevScore = +(snapshot.val());
                let score = getCorrectScore({
                    type,
                    questionTime: currentQuestion?.time,
                    answerTime: diff,
                    streak
                });

                if (type === QUESTION_TYPE.SLIDER) {
                    score = getScoreForSlider({
                        currentQuestion,
                        answer: answer as number,
                        score
                    });
                }

                if (type === QUESTION_TYPE.PUZZLE) {
                    score = getScoreForPuzzle({currentQuestion, answer: answer as PuzzleType[], score});
                }

                sessionStorage.setItem("lastScore", `${score}`);
                set(refMyScore, prevScore + score);
            }, {onlyOnce: true});
        } else {
            sessionStorage.setItem("lastScore", '');
        }
    }, {onlyOnce: true});
}
