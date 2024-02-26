import {QuestionType} from "../../../../../../components/card/Card";
import {QUESTION_TYPE} from "../../../../../../constants";
import {Answer} from "../StageFifth";
import {PuzzleType} from "../../../../../../types";
import {getCountOfCorrectPuzzleAnswers} from "../../stage-fourth/utils";

export const getCondition = (lastAnswer: Answer | null, currentQuestion: QuestionType | null) => {
    const isCurrentQuestion = lastAnswer?.questionId === currentQuestion?.id;
    switch (currentQuestion?.questionType) {
        case QUESTION_TYPE.QUIZ: {
            return isCurrentQuestion && lastAnswer?.answer === currentQuestion?.QUIZ?.correctVariant;
        }
        case QUESTION_TYPE.TRUE_OR_FALSE: {
            return isCurrentQuestion && lastAnswer?.answer === currentQuestion?.TRUE_OR_FALSE?.correctVariant;
        }
        case QUESTION_TYPE.TYPE_ANSWER: {
            const answer = lastAnswer?.answer as string;
            const equalAnswers = answer.toLowerCase() === currentQuestion?.TYPE_ANSWER?.correctVariant?.toLowerCase();
            return isCurrentQuestion && equalAnswers;
        }
        case QUESTION_TYPE.SLIDER: {
            const currentVariant = +(currentQuestion?.SLIDER?.correctVariant as number)
            let answer = -Infinity;

            if (lastAnswer?.answer && typeof +lastAnswer?.answer === 'number') {
               answer = +lastAnswer?.answer;
            }

            const inRange = currentVariant - 3 <= answer && answer <= currentVariant + 3;
            return isCurrentQuestion && inRange;
        }
        case QUESTION_TYPE.PUZZLE: {
            const lastAnswerPuzzle = [...lastAnswer?.answer as PuzzleType[]];
            const count = getCountOfCorrectPuzzleAnswers({currentQuestion, answer: lastAnswerPuzzle as PuzzleType[]});

            return count > lastAnswerPuzzle.length / 2;
        }
        default:
            return false;
    }
}
