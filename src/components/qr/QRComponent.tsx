import React, {useState} from "react";
import {Fade, Modal} from "@mui/material";

import {QrCustomIcon} from "../icons";

import "./styles.scss";

export const QRComponent = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    const openQrCode = () => {
        setOpen(open => !open);
    };

    return (
        <div className="game__qr-action">
            <QrCustomIcon className="game__qr-action-button" onClick={openQrCode} />

            <Modal
                className='qr-code-full-screen__modal'
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open} timeout={500} className='qr-code-full-screen'>
                    <img
                        src='/qr.png'
                        alt='QR code'
                        style={{maxHeight: "90%", maxWidth: "90%"}}
                    />
                </Fade>
            </Modal>
        </div>
    );
}
