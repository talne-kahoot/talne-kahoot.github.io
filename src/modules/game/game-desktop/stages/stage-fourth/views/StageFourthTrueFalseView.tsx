import React from 'react';
import {DotCustomIcon, SquareCustomIcon} from "../../../../../../components/icons";

export const StageFourthTrueFalseView = () => {
    return (
        <div>
            <div className="first-button" style={{height: '100%', fontSize: '50px', padding: '50px'}}>
                <SquareCustomIcon className="icon"/>
                Правда
            </div>

            <div className="second-button" style={{height: '100%', fontSize: '50px', padding: '50px'}}>
                <DotCustomIcon className="icon"/>
                Не правда
            </div>
        </div>
    );
};
