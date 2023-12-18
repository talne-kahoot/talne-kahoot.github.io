import React from 'react';
import {AvatarProps, BigHead} from "@bigheads/core";

type Props = {
    params?: AvatarProps
};
const UserAvatar = ({params}: Props) => {
    return (
        <BigHead
            {...params}
        />
    );
};

export default UserAvatar;
