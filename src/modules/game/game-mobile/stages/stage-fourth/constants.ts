import {QUESTION_TYPE} from "../../../../../constants";

type ScoreType = {
    [key in QUESTION_TYPE]: number;
}

export const SCORE: ScoreType = {
    [QUESTION_TYPE.TRUE_OR_FALSE]: 750,
    [QUESTION_TYPE.QUIZ]: 1000,
    [QUESTION_TYPE.SLIDER]: 1250,
    [QUESTION_TYPE.TYPE_ANSWER]: 1500,
    [QUESTION_TYPE.PUZZLE]: 2000,
};

// const percent = (winning_time * 100) / all_time_in_second;
// 1000 - 100%
// 984 - x
// x = (984 * 100) / 1000 = 98.4 %

// const value = (SCORE.QUIZ * percent) / 100;
// 1000 - 100%;
// x - 98.4%;
// x = (1000 * 98.4) / 100 = 984
