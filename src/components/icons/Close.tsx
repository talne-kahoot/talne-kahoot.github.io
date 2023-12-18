import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
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

export const CloseCustomIcon = ({color = 'primary', style, className = '', onClick = () => {}}: Props) => {
    return <CloseIcon onClick={onClick} className={className} color={color} style={{...style}}/>;
};
