import {QUESTION_TYPE} from "../../../../../../constants";
import {SCORE} from "../constants";
import {ref, set} from "firebase/database";
import {db} from "../../../../../../firebase/firebase";

type Props = {
    type: QUESTION_TYPE,
    questionTime?: number,
    answerTime?: number,
    streak?: number
};

export const getCorrectScore = ({type, questionTime = 1, answerTime = 1, streak = 1}: Props) => {
    const timeInSecond = questionTime * 100;
    const percentByTime = (answerTime * 100) / timeInSecond;
    const score = ((SCORE[type] || 1) * percentByTime) / 100;

    // every streak is 10% to score;
    const valueByStreak = (score / 100) * (10 * streak);

    const gameRef = ref(db, '/game/debugging');
    set(gameRef, {
        scoreByType: SCORE[type],
        defaultScore: answerTime * 100,
        score,
        valueByStreak
    })

    return Math.floor((+score) + (+valueByStreak));
};
