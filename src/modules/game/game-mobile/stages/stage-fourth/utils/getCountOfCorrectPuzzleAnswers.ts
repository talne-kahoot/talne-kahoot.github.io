import {QuestionType} from "../../../../../../components/card/Card.tsx";
import {PuzzleType} from "../../../../../../types.ts";

type Props =  {
    currentQuestion: QuestionType | null,
    answer: PuzzleType[]
}

export const getCountOfCorrectPuzzleAnswers = ({currentQuestion, answer}: Props) => {
    const correctVariant = [...currentQuestion?.PUZZLE || []].sort((a, b) => a.id - b.id );
    let countOfCorrectAnswers = 0;
    answer.forEach((item, index) => {
        if (item?.id === correctVariant?.[index]?.id) {
            countOfCorrectAnswers++;
        }
    });

    return countOfCorrectAnswers;
}
