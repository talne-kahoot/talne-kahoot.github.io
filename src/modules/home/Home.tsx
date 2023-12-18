import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Paper, TextField} from "@mui/material";
import {onValue, ref, set} from "firebase/database";

import {RatingCustomIcon, SuperAdminCustomIcon} from "../../components/icons";
import {db} from "../../firebase/firebase.ts";

import './index.scss';
import {getRandomAvatarParams} from "../../components/avatar /utils";

const WARNING_MESSAGE = {
    req_name: 'Name is required! Please enter name.',
    uniq_name: 'This name is already taken. Please enter another name.'
};
const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [warning, setWarning] = useState<string | null>(null);
    const [isStartedQuiz, setIsStartedQuiz] = useState(false);

    useEffect(() => {
        const name = sessionStorage.getItem("name");
        if (name) {
            navigate('/game');
        }
    }, []);

    const starCountRef = ref(db, '/game/quizId');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        if (!isStartedQuiz && data) {
            setIsStartedQuiz(true);
        }
    });
    const addNewUser = () => {
        if (!name) {
            setWarning(WARNING_MESSAGE.req_name);
            return;
        }

        const gameRef = ref(db, '/game/players/' + name);
        onValue(gameRef, (snapshot) => {
            const existingName = snapshot.val();
            if (existingName) {
                setWarning(WARNING_MESSAGE.uniq_name);
            } else {
                const usersRef = ref(db, '/users/' + name);
                onValue(usersRef, (snapshot) => {
                    const userName = snapshot.val();
                    const newAvatar = getRandomAvatarParams();
                    if (!userName) {
                        set(usersRef, {
                            name,
                            avatarSettings: newAvatar,
                            totalScore: "0"
                        });
                    }

                    set(gameRef, {
                        name,
                        score: 0,
                        avatarSettings: !userName || !userName?.avatarSettings ? newAvatar : userName.avatarSettings,
                        winStreak: 0,
                        lastAnswer: {
                            questionId: '',
                            answer: ''
                        }
                    })
                }, {onlyOnce: true});
                navigate('/game');
            }

            sessionStorage.setItem("name", name);
        }, {
            onlyOnce: true
        });
    };

    const onKeyEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            addNewUser();
        }
    }


    return (
        <div className="home">
            <div className="bg"/>
            <div className="home__inputs">
                <Paper elevation={24} className="home__inputs-paper">
                    <div className="home__title">Вхід в гру</div>
                    <TextField
                        disabled={!isStartedQuiz}
                        error={!!warning}
                        helperText={warning}
                        className="home__input"
                        label="Ім'я"
                        variant="outlined"
                        onChange={(e) => {
                            setName(e.target.value);
                            if (warning) {
                                setWarning(null);
                            }
                        }}
                        onKeyDown={onKeyEnter}
                        inputProps={{ maxLength: 15 }}
                    />
                    <Button disabled={!isStartedQuiz} variant="outlined" className="home__join-room" onClick={addNewUser}>
                        Почати гру
                    </Button>
                    <div className="home__host-action">
                        <Link to='/rating'>
                            <RatingCustomIcon style={{fontSize: 36}}/>
                        </Link>

                        <Link to='/home-host'>
                            <SuperAdminCustomIcon style={{fontSize: 36}}/>
                        </Link>
                    </div>

                </Paper>
            </div>
        </div>
    );
};
export default Home;
