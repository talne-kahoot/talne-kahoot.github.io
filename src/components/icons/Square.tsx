import React from 'react';

import SquareIcon from '@mui/icons-material/Square';
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
    className?: string
};

export const SquareCustomIcon = ({color = 'primary', style, className = ''}: Props) => {
    return <SquareIcon color={color} className={className} style={{...style}}/>;
};
