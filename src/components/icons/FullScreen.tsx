import React from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import {OverridableStringUnion} from "@mui/types";
import {SvgIconPropsColorOverrides} from "@mui/material/SvgIcon/SvgIcon";

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

export const FullScreenCustomIcon = ({color = 'primary', style, className = '', onClick = () => {}}: Props) => {
    return <FullscreenIcon onClick={onClick} className={className} color={color} style={{...style}}/>;
};
