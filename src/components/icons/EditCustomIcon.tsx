import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
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

export const EditCustomIcon = ({color = 'primary', style, className = '', onClick = () => {}}: Props) => {
    return <EditIcon onClick={onClick} className={className} color={color} style={{...style}}/>;
};
