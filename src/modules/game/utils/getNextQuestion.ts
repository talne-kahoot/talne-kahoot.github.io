import {QuestionType} from "../../../components/card/Card.tsx";

export const getNextQuestion = (currentQuestion: QuestionType | null) => (currentQuestion?.id || 0) + 1;
