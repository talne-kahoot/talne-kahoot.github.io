import {QUESTION_TYPE} from "../../../../../../constants.ts";
import {QuestionType} from "../../../../../../components/card/Card.tsx";
import {PuzzleType} from "../../../../../../types.ts";

type Props = {
    currentQuestion: QuestionType | null,
    answer: PuzzleType[] | string | number | null,
    type: string
}

export const isSliderInRange = ({currentQuestion, type, answer}: Props) => {
    if (type !== QUESTION_TYPE.SLIDER) return false;

    let isValueInRange = false;
    if (currentQuestion?.SLIDER?.correctVariant && answer) {
        const correctVariant = +(currentQuestion?.SLIDER?.correctVariant as number);
        isValueInRange = correctVariant - 3 <= (+answer) && (+answer) <= correctVariant + 3;
    }

    return isValueInRange;
}
