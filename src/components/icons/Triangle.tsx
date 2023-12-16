import React from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
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

export const TriangleCustomIcon = ({color = 'primary', style}: Props) => {
    return <PlayArrowIcon color={color} style={{...style}} />;
};
