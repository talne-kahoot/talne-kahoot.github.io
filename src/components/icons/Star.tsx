import React from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
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

export const StarCustomIcon = ({color = 'primary', style}: Props) => {
    return <StarRateIcon color={color} style={{...style}}/>
};
