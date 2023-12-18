import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Fab, Paper, Slide, Zoom} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import {AvatarProps} from "@bigheads/core";

import {CloseCustomIcon, EditCustomIcon, RefreshCustomIcon, SaveCustomIcon} from "../../../../../components/icons";
import UserAvatar from "../../../../../components/avatar /Avatar";
import {getRandomAvatars} from "./utils";
import {User} from "../../../types";

import './index.scss';
import {db} from "../../../../../firebase/firebase";
import {ref, set} from "firebase/database";


type Props = {
    currentUser: User | null
};


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} children={props.children}/>;
});

const StageFirst = ({currentUser}: Props) => {
    const [showGalleryAvatars, setShowGalleryAvatars] = useState<boolean>(false);
    const [avatars, setAvatars] = useState<AvatarProps[]>(getRandomAvatars());
    const [activeElement, setActiveElement] = useState<{ index: number, params: AvatarProps } | null>(null);


    const saveAvatarSettings = () => {
        const gameRef = ref(db, `/game/players/${currentUser?.name}/avatarSettings`);
        const userRef = ref(db, `/users/${currentUser?.name}/avatarSettings`);
        if(activeElement) {
            set(gameRef, activeElement?.params);
            set(userRef, activeElement?.params);
        }
        setShowGalleryAvatars(false);
    }

    return (
        <div className="stage-first">
            <Zoom in={true} timeout={500}>
                <div className="stage-first__wrapper">
                    <Typography variant="h2" gutterBottom className="stage-first__font">
                        Ти в грі!
                    </Typography>
                    <Typography variant="h6" gutterBottom className="stage-first__font">
                        Перевірь своє ім'я на екрані.
                    </Typography>
                </div>
            </Zoom>

            <Zoom in={true} timeout={1000}>
                <Paper elevation={24} className="stage-first__paper">
                    <div className="stage-first__avatar-title">
                        {currentUser?.name || ''}
                    </div>
                    <div className="stage-first__avatar">
                        <UserAvatar params={currentUser?.avatarSettings}/>
                        <Fab
                            color="secondary"
                            className="stage-first__avatar-edit-icon"
                            onClick={() => setShowGalleryAvatars(!showGalleryAvatars)}>
                            <EditCustomIcon/>
                        </Fab>
                    </div>
                </Paper>
            </Zoom>


            <Dialog
                open={showGalleryAvatars}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setShowGalleryAvatars(false)}
                className="stage-first__dialog-avatars"
            >
                <DialogTitle className="stage-first__dialog-avatars-title">
                    <div/>
                    Обери свій аватар!
                    <CloseCustomIcon
                        className="stage-first__dialog-avatars-title-close-icon"
                        onClick={() => setShowGalleryAvatars(false)}
                    />
                </DialogTitle>
                <DialogContent className="stage-first__dialog-avatars-content">
                    {avatars.map((params, index) => {
                        const isActiveClass = activeElement?.index === index ?
                            'stage-first__dialog-avatars-content_active' : '';
                        return <div
                            className={`stage-first__dialog-avatars-content_avatar-wrapper ${isActiveClass}`}
                            onClick={() => setActiveElement({index, params})}>
                            <UserAvatar params={params}/>
                        </div>
                    })}
                </DialogContent>
                <DialogActions className="stage-first__dialog-avatars-actions">
                    <SaveCustomIcon color={`${activeElement ? 'primary': 'disabled'}`} onClick={() => activeElement ? saveAvatarSettings() : null}/>
                    <RefreshCustomIcon onClick={() => setAvatars(getRandomAvatars())}/>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default StageFirst;
