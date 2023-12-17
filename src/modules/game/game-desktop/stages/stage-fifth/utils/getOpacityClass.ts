import {QuestionType} from "../../../../../../components/card/Card";

export const getOpacityClassQuiz = (variant: string, currentQuestion: QuestionType) => currentQuestion?.QUIZ?.correctVariant === variant ? '' : 'opacity';

export const getOpacityClassTrueFalse = (variant: string, currentQuestion: QuestionType | null) =>
    currentQuestion?.TRUE_OR_FALSE?.correctVariant === variant ? '' : 'opacity';
