import React from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
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

export const SuperAdminCustomIcon = ({color = 'primary', style}: Props) => {
    return <AdminPanelSettingsIcon color={color} style={{...style}}/>;
};
