import {onValue, ref, set} from "firebase/database";
import {db} from "../../../../../../firebase/firebase.ts";
import {QUESTION_TYPE} from "../../../../../../constants.ts";
import {QuestionType} from "../../../../../../components/card/Card.tsx";

import {setScore} from "./setScore.ts";
import {PuzzleType} from "../../../../../../types.ts";

type Props = {
    isCorrectedAnswer: boolean,
    type: QUESTION_TYPE,
    currentQuestion: QuestionType | null,
    sliderValue?: number,
    answer: PuzzleType[] | string | number
};

export const setWinStreakAndScore = ({isCorrectedAnswer, type, currentQuestion, answer}: Props) => {
    const name = sessionStorage.getItem("name") || '';
    let streak = 0;
    const winStreakRef = ref(db, `/game/players/${name}/winStreak`);
    onValue(winStreakRef, (snapshot) => {
        const winStreak = snapshot.val();

        streak = isCorrectedAnswer ? winStreak + 1 : 0;
        set(winStreakRef, streak);

        setScore({
            name,
            isCorrectedAnswer,
            streak,
            type,
            currentQuestion,
            answer
        });
    }, {onlyOnce: true});

    const lastAnswerAnswerRef = ref(db, `/game/players/${name}/lastAnswer/answer`);
    set(lastAnswerAnswerRef, answer);

    const lastAnswerQuestionIdRef = ref(db, `/game/players/${name}/lastAnswer/questionId`);
    set(lastAnswerQuestionIdRef, currentQuestion?.id);
};
