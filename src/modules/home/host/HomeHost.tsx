import React, {useState} from 'react';
import {Button, Paper, TextField} from "@mui/material";

import './index.scss';
import {Link, useNavigate} from "react-router-dom";
import {onValue, ref} from "firebase/database";
import {db} from "../../../firebase/firebase.ts";

const HomeHost = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [warningMessage, setWarning] = useState<string | null>(null);
    const onClick = () => {
        const adminRef = ref(db, '/admin');

        onValue(adminRef, (snapshot) => {
            const data = snapshot.val();
            if (data.login === login && data.password === password) {
                sessionStorage.setItem("isAuth", "true");
                navigate('/quizzes');
            } else {
                setWarning('Incorrect login or password');
            }
        }, {onlyOnce: true});
    };

    const onKeyEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            onClick();
        }
    }

    return (
        <div className="home-host">
            <div className="bg"/>
            <Paper elevation={24} className="home-host__inputs-paper">
                <div className="home-host__title">Секретний кабінет</div>
                <TextField
                    className="home-host__login"
                    label="Ім'я"
                    variant="outlined"
                    onChange={e => setLogin(e.currentTarget.value)} error={!!warningMessage}
                    onKeyDown={onKeyEnter}
                />
                <TextField
                    className="home-host__password"
                    label="Пароль"
                    variant="outlined"
                    onChange={e => setPassword(e.currentTarget.value)}
                    error={!!warningMessage}
                    helperText={warningMessage}
                    onKeyDown={onKeyEnter}
                    type="password"
                />
                <Button variant="outlined" color="primary" onClick={onClick} className="home-host__log-in">
                    Увійти
                </Button>
                <div className="home-host__return-link">
                    <Link to='/' className="home-host__return-link_style">
                        Повернутись назад
                    </Link>
                </div>
            </Paper>
        </div>
    );
};

export default HomeHost;
