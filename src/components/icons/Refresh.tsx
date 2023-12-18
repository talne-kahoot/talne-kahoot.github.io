import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
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

export const RefreshCustomIcon = ({color = 'primary', style, className = '', onClick = () => {}}: Props) => {
    return <RefreshIcon onClick={onClick} className={className} color={color} style={{...style}}/>;
};
