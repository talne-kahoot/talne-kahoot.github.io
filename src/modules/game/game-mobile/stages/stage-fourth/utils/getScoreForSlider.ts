import {QuestionType} from "../../../../../../components/card/Card.tsx";

type SliderProps = {
    currentQuestion: QuestionType | null,
    answer: number,
    score: number
};

export const getScoreForSlider = ({currentQuestion, answer, score}: SliderProps) => {
    const correctVariant = +(currentQuestion?.SLIDER?.correctVariant as number);
    const coefficient = Math.abs(correctVariant - (+answer)) + 1;

    return Math.floor(score / coefficient);
};
