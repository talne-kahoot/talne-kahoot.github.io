import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {onValue, ref} from "firebase/database";
import {Button, Divider} from "@mui/material";
import Paper from "@mui/material/Paper";

import UserAvatar from "../../components/avatar /Avatar";
import {db} from "../../firebase/firebase.ts";

import './index.scss';
import {AvatarProps} from "@bigheads/core";

type User = {
    name: string,
    avatarSettings?: AvatarProps,
    totalScore: number
}


const Rating = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const usersRef = ref(db, '/users');
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            const users = Object.values(data) as User[];
            if (users.length) {
                setUsers(users.filter(i => i.totalScore > 0).sort((a: User, b: User) => b.totalScore - a.totalScore));
            }
        });

        const isAdmin = sessionStorage.getItem("isAuth");
        setIsAdmin(!!isAdmin);
    }, []);

    const getRatingClass = (index: number) => {
        if (index !== 0 && index !== 1 && index !== 2) {
            return '';
        }

        const rating = {
            0: 'gold',
            1: 'silver',
            2: 'bronze'
        }

        return rating[index] ? rating[index] : ''
    }

    const onClick = () => {
        const isAuth = sessionStorage.getItem("isAuth");
        if (isAuth) {
            navigate('/game');
        }
        navigate('/quizzes');
    };

    return (
        <div className="rating__wrapper">
            <div className="bg"/>
            <Button variant="outlined" color="success" onClick={onClick} className="rating__come-back-button">
                {isAdmin ? 'До запитань' : 'На головну'}
            </Button>

            <Typography variant="h3" gutterBottom className="rating__title">
                Рейтинг
            </Typography>
            <div className="rating__users">
                {users && users.map(({name, avatarSettings, totalScore}, index) => (
                    <Paper elevation={3} key={index} className={`rating__user ${getRatingClass(index)}`}>
                        <div className="name__wrapper">
                            <UserAvatar params={avatarSettings} />
                            <Divider orientation="vertical" className="divider" variant="fullWidth" flexItem/>
                            <div className="name__text">
                                {name}
                            </div>
                        </div>
                        <div className="total-score">{totalScore}</div>
                    </Paper>

                ))}
            </div>
        </div>
    );
};

export default Rating;
