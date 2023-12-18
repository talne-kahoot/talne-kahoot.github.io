import React from 'react';
import {OverridableStringUnion} from "@mui/types";
import {SvgIconPropsColorOverrides} from "@mui/material/SvgIcon/SvgIcon";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

type Props = {
    style?: React.CSSProperties,
    color?: OverridableStringUnion<
        | 'inherit'
        | 'action'
        | 'disabled'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning',
        SvgIconPropsColorOverrides
    >,
    className?: string,
    onClick?: () => void
};

export const QrCustomIcon = ({color = 'primary', style, className = '', onClick = () => {}}: Props) => {
    return <QrCodeScannerIcon onClick={onClick} className={className} color={color} style={{...style}}/>;
};

