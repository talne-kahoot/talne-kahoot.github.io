import React from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
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

export const PeopleCustomIcon = ({color = 'primary', style, className = '', onClick = () => {}}: Props) => {
    return <PeopleAltIcon onClick={onClick} className={className} color={color} style={{...style}}/>;
};
