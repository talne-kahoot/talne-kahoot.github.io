import React from 'react';
import {OverridableStringUnion} from "@mui/types";
import {SvgIconPropsColorOverrides} from "@mui/material/SvgIcon/SvgIcon";
import SaveIcon from '@mui/icons-material/Save';

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

export const SaveCustomIcon = ({color = 'primary', style, className = '', onClick = () => {}}: Props) => {
    return <SaveIcon onClick={onClick} className={className} color={color} style={{...style}}/>;
};
