import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons'
import COLOR from '../constants/colors';

export const CustomHeaderButton = props => {
    return(
        <HeaderButton
            {...props}
            IconComponent={MaterialIcons}
            iconSize={23}
            color="white" />
    );
}

export const CustomHeaderButtonEmpty = props => {
    return(
        <HeaderButton
            {...props}
            IconComponent={MaterialIcons}
            iconSize={23}
            color={COLOR.primaryColor} />
    );
}