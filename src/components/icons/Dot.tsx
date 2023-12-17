import React from 'react';
import LensIcon from '@mui/icons-material/Lens';
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

export const DotCustomIcon = ({color = 'primary', style, className = ''}: Props) => {
    return <LensIcon className={className} color={color} style={{...style}}/>;
};
