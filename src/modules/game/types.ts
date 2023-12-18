import {AvatarProps} from "@bigheads/core";

export type User = {
    name: string,
    score: number,
    winStreak: number,
    avatarSettings?: AvatarProps
    lastAnswer: {
        answer: string,
        questionId: number,
        winStreak: number
    }
};
