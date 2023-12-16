import React from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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

export const RatingCustomIcon = ({color = 'primary', style}: Props) => {
    return <EmojiEventsIcon color={color} style={{...style}}/>;
};
