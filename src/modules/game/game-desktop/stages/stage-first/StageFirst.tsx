import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {onValue, ref, set} from "firebase/database";
import {Button, Zoom} from "@mui/material";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";

import UserAvatar from "../../../../../components/avatar /Avatar";
import {PeopleCustomIcon} from "../../../../../components/icons";
import {QRComponent} from "../../../../../components/qr";
import {db} from "../../../../../firebase/firebase.ts";
import {User} from "../../../types";

import './index.scss';


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
                    <Zoom in={true} timeout={500}>
                        <img
                            className="game__qr-img"
                            src='/qr.png'
                            alt='QR code'
                        />
                    </Zoom>
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
                    <div/>
                    {isAdmin ?
                        <Button variant="outlined" color="success" className="game__start-game" onClick={onStartGame}
                                disabled={!users?.length}>
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
                                    <UserAvatar params={player.avatarSettings} />
                                    <div className="game__player-name">{player.name}</div>
                                </Card>
                            ))}
                    </div>
                </div>
            </Zoom>

            <div className="game__activity">
                <PeopleCustomIcon className="game__activity-icon"/>
                <div className="quantity">{users.length > 0 ? users.length : 0}</div>
            </div>
            <div className="game__qr">
                <QRComponent />
            </div>
        </>
    );
};

export default StageFirst;
