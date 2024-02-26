import {getCountOfCorrectPuzzleAnswers} from "./getCountOfCorrectPuzzleAnswers.ts";
import {QuestionType} from "../../../../../../components/card/Card.tsx";
import {PuzzleType} from "../../../../../../types.ts";

type Props = {
    currentQuestion: QuestionType | null,
    answer: PuzzleType[],
    score: number
};

export const getScoreForPuzzle = ({currentQuestion, answer, score}: Props) => {
    const countOfCorrectAnswers = getCountOfCorrectPuzzleAnswers({
        currentQuestion,
        answer
    });
    const quantityOfQuestions = currentQuestion?.PUZZLE?.length || 1;

    // scoreByCorrectAnswers
    return Math.floor((score / quantityOfQuestions) * countOfCorrectAnswers);
}
