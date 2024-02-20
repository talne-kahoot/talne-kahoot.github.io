import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Paper, Slide, TextField} from "@mui/material";
import {onValue, ref, set} from "firebase/database";
import {isMobile} from "react-device-detect";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import PWAPrompt from 'react-ios-pwa-prompt'


import {RatingCustomIcon, SuperAdminCustomIcon} from "../../components/icons";
import {db} from "../../firebase/firebase.ts";

import './index.scss';
import {getRandomAvatarParams} from "../../components/avatar /utils";
import {BeforeInstallPromptEvent} from "./types.ts";

const WARNING_MESSAGE = {
    req_name: 'Name is required! Please enter name.',
    uniq_name: 'This name is already taken. Please enter another name.'
};
const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [warning, setWarning] = useState<string | null>(null);
    const [isStartedQuiz, setIsStartedQuiz] = useState(false);
    const [isInstallVisible, setIsInstallVisible] = useState(false);
    const installRef = useRef<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const name = sessionStorage.getItem("name");
        if (name) {
            navigate('/game');
        }

        window.addEventListener('beforeinstallprompt', e => {
            // For older browsers
            e.preventDefault();
            console.log("Install Prompt fired");

            installRef.current = e as BeforeInstallPromptEvent;
            // See if the app is already installed, in that case, do nothing
            // if ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window?.navigator?.standalone === true) {
            //     return false;
            // }
            // Set the state variable to make button visible
            setIsInstallVisible(true);
        })
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

    const onInstall = () => {
        if(installRef.current?.prompt) {
            installRef.current?.prompt();
            installRef.current = null;
            setIsInstallVisible(false);
        }
    };



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


                    <Slide direction="up" in={isInstallVisible} timeout={3000} mountOnEnter unmountOnExit>
                        <Button variant="contained" color="info" className="install-button" onClick={onInstall}>
                            Завантажити гру на {isMobile ? 'мобільний' : 'комп\'ютер'}
                        </Button>
                    </Slide>

                    <PWAPrompt
                        copyTitle="Завантаження Kahoot"
                        copyBody="Щоб завантажити гру TALNE Kahoot на телефон відкрийте браузер (Safari/Chrome) і виконайте перелічені нижче кроки."
                        copyShareButtonLabel="1) Натисніть на кнопку 'Поділитись'"
                        copyAddHomeButtonLabel="2) Натисніть 'Додати на початковий екран'"
                        copyClosePrompt="Закрити"
                        permanentlyHideOnDismiss={true}
                        debug={true}
                    />
                </Paper>
            </div>
        </div>
    );
};
export default Home;
