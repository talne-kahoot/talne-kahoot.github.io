import React, {useEffect, useState} from 'react';
import {Button, Divider, Zoom} from "@mui/material";

import './index.scss';
import Paper from "@mui/material/Paper";
import {onValue, ref} from "firebase/database";
import {db} from "../../../../../firebase/firebase.ts";
import {User} from "../../../types.ts";
import UserAvatar from "../../../../../components/avatar /Avatar";

type Props = {
    changeStage: () => void,
    isAdmin: boolean
};
const StageSixth = ({changeStage, isAdmin}: Props) => {
    const [players, setPlayers] = useState<User[]>();

    useEffect(() => {
        const playersRef = ref(db, `/game/players`);

        onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            const answers = Object.values(players) as User[];

            if (answers) {
                setPlayers(answers);
            }
        }, {onlyOnce: true});

    }, []);
    const onClick = () => {
        changeStage();
    }


    return (
        <div className="stage-sixth">
            <div className="stage-sixth__action-bitton">
                {isAdmin &&
                    <Button variant="outlined" color="success" onClick={onClick} className="stage-sixth__next-stage">
                        Далі
                    </Button>
                }
            </div>

            <div className="stage-sixth__score">
                {
                    players && players.sort((a, b) => b.score - a.score).map((player, index) => (
                        <>
                            {index <= 9 ?
                                <Zoom in={true} timeout={1500 + 400 * index}>
                                    <Paper elevation={3} key={index} className="stage-sixth__score-result">
                                        <div className="name">
                                            <UserAvatar params={player.avatarSettings} />
                                            <Divider orientation="vertical" className="divider" variant="fullWidth" flexItem/>
                                            {player.name}
                                        </div>
                                        <div className="score">{player.score}</div>
                                    </Paper>
                                </Zoom> : null
                            }
                        </>
                    ))
                }
            </div>
        </div>
    );
};

export default StageSixth;
