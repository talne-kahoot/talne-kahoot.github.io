import React, {useEffect, useState} from 'react';
import {Button, Slide, Zoom} from "@mui/material";
import './index.scss';
import {User} from "../../../types.ts";
import {db} from "../../../../../firebase/firebase.ts";
import {onValue, ref, set} from "firebase/database";
import {useNavigate} from "react-router-dom";


type TempType = {
    name: string,
    lastAnswer: {
        answer: string,
        questionId: number,
        winStreak: number
    }
}

type Props = {
    isAdmin: boolean
}

const StageSeventh = ({isAdmin}: Props) => {
    const [players, setPlayers] = useState<User[]>([]);
    const [allPlayers, setAllPlayers] = useState<User[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const playersRef = ref(db, '/game/players');
        onValue(playersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const players: User[] = Object.values(data);
                setAllPlayers(players);

                const mappedPlayers = players.sort((a: User, b: User) => b.score - a.score).slice(0, 3);
                setPlayers(mappedPlayers);

            }
        }, {onlyOnce: true})

        setTimeout(() => {
            const showRatingRef = ref(db, '/game/showUsersRating');
            set(showRatingRef, true);
        }, 9000);
    }, []);

    const saveScores = () => {
        allPlayers.forEach((player: User) => {
            const userRef = ref(db, `/users/${player.name}`);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const totalScore = (+data.totalScore) + (+player.score);
                    set(userRef, {
                        ...data,
                        totalScore
                    });
                }
            }, {onlyOnce: true});
        });
    };

    const finishGame = () => {
        saveScores();

        const answers = players.reduce((acc: TempType[], player: User) => {
            return [...acc, {
                name: player.name,
                lastAnswer: player.lastAnswer
            }];
        }, []);

        const newDate = +new Date();
        const answersRef = ref(db, '/lastAnswers/'+ newDate);
        set(answersRef, answers)


        const gameRef = ref(db, '/game');
        set(gameRef, null);

        const statusRef = ref(db, '/isGameActive');
        set(statusRef, false);
    }
    const onClick = () => {
        finishGame()
        navigate('/quizzes');
    };

    const onRatingClick = () => {
        finishGame();
        navigate('/rating');
    }

    return (
        <div className="seventh-stage">
            {isAdmin && <>
                <Button variant="outlined" color="success" onClick={onClick}
                        className="seventh-stage__close-button">
                    завершити гру
                </Button>

                <Button variant="outlined" color="success" onClick={onRatingClick}
                        className="seventh-stage__close-button rating">
                    рейтинг
                </Button>
            </>}

            {players.length ? <>
                {
                    players[2] && <div className="third-wrapper">
                        <Zoom in={true} timeout={1000} style={{transitionDelay: '3000ms'}}>
                            <div className="result-wrapper" style={{marginTop: 250}}>
                                <div className="title">
                                    {/*{players[2]?.name}*/}
                                    Error: Not Found 404
                                </div>
                                <div className="score">
                                    {/*{players[2]?.score}*/}
                                    77777
                                </div>

                                <div className="img">
                                    <img
                                        src='/third.PNG'
                                        alt='Bronze image'
                                    />
                                </div>
                            </div>
                        </Zoom>
                        <Slide direction="up" in={true} timeout={2000} mountOnEnter unmountOnExit
                               className="castle__wrapper">
                            <div className="castle"></div>
                        </Slide>
                    </div>
                }

                {players[0] &&  <div className="first-wrapper">
                    <Zoom in={true} timeout={1000} style={{transitionDelay: '8800ms'}}>
                        <div className="result-wrapper">
                            <div className="title">
                                Error: Not Found 404
                                {/*{players[0]?.name}*/}
                            </div>
                            <div className="score">
                                {/*{players[0]?.score}*/}
                                77777
                            </div>

                            <div className="img">
                                <img
                                    src='/first.PNG'
                                    alt='Gold image'
                                />
                            </div>
                        </div>
                    </Zoom>

                    <Slide direction="up" in={true} timeout={2000} mountOnEnter unmountOnExit
                           className="castle__wrapper">
                        <div className="castle"></div>
                    </Slide>
                </div>}

                {
                    players[1] &&  <div className="second-wrapper">
                        <Zoom in={true} timeout={1000} style={{transitionDelay: '5800ms'}}>
                            <div className="result-wrapper" style={{marginTop: 250}}>
                                <div className="title">
                                    {/*{players[1]?.name}*/}
                                    Error: Not Found 404
                                </div>
                                <div className="score">
                                    {/*{players[1]?.score}*/}
                                    77777
                                </div>

                                <div className="img">
                                    <img
                                        src='/second.PNG'
                                        alt='Silver image'
                                    />
                                </div>
                            </div>
                        </Zoom>

                        <Slide direction="up" in={true} timeout={2000} mountOnEnter unmountOnExit
                               className="castle__wrapper">
                            <div className="castle"></div>
                        </Slide>
                    </div>
                }
            </> : null}
        </div>
    );
};

export default StageSeventh;
