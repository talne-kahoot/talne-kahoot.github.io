import React from 'react';

import HexagonIcon from '@mui/icons-material/Hexagon';
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

export const HexagonCustomIcon = ({color = 'primary', style, className = ''}: Props) => {
    return <HexagonIcon className={className} color={color} style={{...style}} />;
};
