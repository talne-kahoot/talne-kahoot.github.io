import React from 'react';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
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

export const FullScreenExitCustomIcon = ({color = 'primary', style, className = '', onClick = () => {}}: Props) => {
    return <FullscreenExitIcon onClick={onClick} className={className} color={color} style={{...style}}/>;
};
