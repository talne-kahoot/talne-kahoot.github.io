import {STAGES} from "../constants.ts";

export const isLastStage = (stage: number | null) => stage === STAGES.length - 1
