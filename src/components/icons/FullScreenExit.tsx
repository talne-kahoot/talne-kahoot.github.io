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
    >
};

export const FullScreenExitCustomIcon = ({color = 'primary', style}: Props) => {
    return <FullscreenExitIcon color={color} style={{...style}}/>;
};
