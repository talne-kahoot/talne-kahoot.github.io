import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useNavigate} from "react-router-dom";

import {onChildAdded, onChildChanged, onChildRemoved, onValue, ref, set} from "firebase/database";
import {db} from "../../firebase/firebase.ts";
import {GameMobile} from "./game-mobile";

import {isLastStage, getNextStage, getNextQuestion} from "./utils";
import {QuestionType} from "../../components/card/Card.tsx";
import {MAPPED_STAGE, STAGES} from "./constants.ts";
import {GameDesktop} from "./game-desktop";
import {User} from "./types.ts";

import './index.scss';


const Game = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [questions, setQuestions] = useState<QuestionType[] | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
    const [currentStage, setCurrentStage] = useState(MAPPED_STAGE.START);
    const [isGameStarted, setIsGameStarted] = useState(null);

    useEffect(() => {
        // set questions
        const quizRef = ref(db, '/game/quizId/');
        onValue(quizRef, (snapshot) => {
            const quizId = snapshot.val();

            const questions_server = ref(db, '/quizzes/' + quizId);
            onValue(questions_server, (snapshot) => {
                const questions_server = snapshot.val();

                if (questions_server?.questions && !questions) {
                    setQuestions(questions_server.questions)
                }
            });
        });
    }, [questions]);

    useEffect(() => {
        // change stage
        const stageRef = ref(db, '/game/stage');
        onValue(stageRef, (snapshot) => {
            const stage = snapshot.val();


            if (currentStage !== stage) {
                setCurrentStage(stage);
            }
        });
    }, [currentStage]);

    useEffect(() => {
        // change current question
        const game = ref(db, '/game/currentQuestion');
        onValue(game, (snapshot) => {
            const currQServer = snapshot.val();

            if (currentQuestion?.id !== currQServer && questions) {
                setCurrentQuestion(questions[currQServer])
            }
        });
    }, [currentQuestion, questions]);

    useEffect(() => {
        const startedGameRef = ref(db, '/game/startedGame');
        onValue(startedGameRef, (snapshot) => {
            const isGameStarted = snapshot.val();
            setIsGameStarted(isGameStarted);
        });

        const name = sessionStorage.getItem("name");
        if (isMobile && !name) {
            navigate('/');
        }

        const gamePlayersRef = ref(db, '/game/players/');
        onChildAdded(gamePlayersRef, (snapshot) => {
            const user = snapshot.val();
            const hasThisPlayer = users.some(el => (el.name === user.name));
            if (!hasThisPlayer) {
                setUsers(prevState => ([...new Set([...prevState, user])]));
            }
        });

        onChildChanged(gamePlayersRef, (snapshot) => {
            const user = snapshot.val();
            if (user) {
                setUsers(prevState => {
                    return prevState.map((el) => el.name === user.name ? user : el)
                });
            }
        })

        onChildRemoved(gamePlayersRef, (snapshot) => {
            const user = snapshot.val();
            setUsers(prevState => (prevState.filter(el => el.name !== user.name)));
        });
    }, []);

    useEffect(() => {
        if (isMobile) {
            window.onunload = window.onbeforeunload = function () {
                const name = sessionStorage.getItem("name");
                if (name && !isGameStarted) {
                    const playerRef = ref(db, '/game/players/' + name);
                    set(playerRef, null);
                    sessionStorage.removeItem('name');
                    navigate('/');
                }
            };
        }
    }, [isGameStarted, navigate]);

    const setCurrentTimeInDB = () => {
        const now = +(new Date());
        const currentTimeRef = ref(db, '/game/currentTime');
        set(currentTimeRef, currentQuestion?.id === MAPPED_STAGE.QUESTION_AND_ANSWER ? now : null);
    };

    const changeStage = () => {
        const stageRef = ref(db, '/game/stage');

        if (!questions) {
            console.error('Questions is not defined');
            return;
        }

        if (isLastStage(currentStage)) {
            console.error('Game is finished');
            return;
        }

        setCurrentTimeInDB();

        const lastQuestion = questions?.[questions.length - 1];
        if (currentQuestion?.id !== lastQuestion?.id && currentStage === MAPPED_STAGE.SCORE_RESULT) {
            set(stageRef, MAPPED_STAGE.PREVIEW_QUESTION);
            changeQuestion();
        } else if(currentQuestion?.id === lastQuestion?.id && currentStage === MAPPED_STAGE.RESULT) {
            set(stageRef, MAPPED_STAGE.FINISH);
        } else {
            set(stageRef, getNextStage(currentStage));
        }
    };

    const changeQuestion = () => {
        const questionRef = ref(db, '/game/currentQuestion');
        if (!questions && !currentQuestion) {
            console.error('Questions is not defined');
            return;
        }

        const nextQuestion = getNextQuestion(currentQuestion);

        if (nextQuestion) {
            set(questionRef, nextQuestion);
        }

    }


    return (<>
        <div className="bg"/>
        {
            isMobile ?
                <GameMobile
                    users={users}
                    stage={STAGES[currentStage]}
                    currentQuestion={currentQuestion}
                /> :
                <GameDesktop
                    users={users}
                    lastQuestion={questions?.[questions.length - 1]}
                    changeStage={changeStage}
                    stage={STAGES[currentStage]}
                    questions={questions}
                    currentQuestion={currentQuestion}
                />
        }
    </>);
};

export default Game;
