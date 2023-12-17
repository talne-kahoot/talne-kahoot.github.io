import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import {Button, Zoom} from "@mui/material";

import {PeopleCustomIcon} from "../../../../../components/icons";
import {db} from "../../../../../firebase/firebase.ts";
import {onValue, ref, set} from "firebase/database";

import './index.scss';

type User = {
    name: string,
    score: number
};

type Props = {
    users: User[],
    changeStage: () => void
}

const StageFirst = ({users, changeStage}: Props) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);



    useEffect(() => {
        const isAuth = sessionStorage.getItem("isAuth");
        if (isAuth) {
            setIsAdmin(true);
        }

        const gameRef = ref(db, '/game/quizId');

        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            if (!data && isAuth) {
                navigate('/quizzes');
            } else if (!data && !isAuth) {
                navigate('/');
            }
        }, {onlyOnce: true});


    }, []);
    const onStartGame = () => {
        changeStage();

        const gameRef = ref(db, '/game/startedGame');
        set(gameRef, true);
    }
    return (
        <>
            <Zoom in={true} timeout={500}>
                <div className="game__header">
                    <Paper elevation={24} className="game__info-wrapper">
                        <div>
                            Приєднатись до гри
                            <div className="game__url">
                                {
                                    window.location.origin
                                }
                            </div>
                        </div>
                    </Paper>
                    {isAdmin ?
                        <Button variant="outlined" color="success" className="game__start-game" onClick={onStartGame}
                                disabled={!users.length}>
                            Розпочати
                        </Button> : null}
                </div>
            </Zoom>
            <Zoom in={true} timeout={500}>
                <div className="game__title">
                    <span>ВІКТОРИНА</span>
                </div>
            </Zoom>
            <Zoom in={true} timeout={500}>
                <div className="game__body-wrapper">
                    <div className="game__players">
                            {users.map((player, index) => (
                                <Card key={index} className="game__player">
                                    {player.name}
                                </Card>
                            ))}
                    </div>
                </div>
            </Zoom>

            <div className="game__activity">
                <PeopleCustomIcon className="game__activity-icon"/>
                <div className="quantity">{users.length > 0 ? users.length : 0}</div>
            </div>
            <Zoom in={true} timeout={500}>
                <div className="game__qr">
                    <img
                        src='/qr.png'
                        alt='QR code'
                    />
                </div>
            </Zoom>
        </>
    );
};

export default StageFirst;
