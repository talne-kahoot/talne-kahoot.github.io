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


const getPercentFromMaxScore = (maxScore: number, percent: number) => +maxScore * (+percent / 100);

// answerTime - how many times I spent for answer in milliseconds (its dif between "startedDate" and "answeredDate")
export const getCorrectScore = ({type, questionTime = 1, answerTime = 1, streak = 0}: Props) => {
    const questionTimeInSecond = +questionTime * 1000; // convert question time to seconds
    const remainingTime = questionTimeInSecond - answerTime; // how many times remaining for this question
    const convertingRemainingTimeToPercent = (remainingTime * 100) / questionTimeInSecond; // convert remaining time to percent
    const maxScore = SCORE[type] as number; // maximum score by this type of question
    const score = getPercentFromMaxScore(maxScore, convertingRemainingTimeToPercent); // get score from maximum score and percent of remaining time

    const streakPercent = 10 * streak; // every streak is 10% to score;
    const valueByStreak = getPercentFromMaxScore(score, streakPercent); // value by streak
    const scoreWithStreak = score + valueByStreak; // score with streak

    const gameRef = ref(db, '/game/debugging');
    set(gameRef, {
        scoreByType: SCORE[type],
        defaultScore: answerTime * 100,
        score,
        valueByStreak
    })

    return Math.floor(scoreWithStreak);
};
