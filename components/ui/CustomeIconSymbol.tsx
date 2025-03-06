import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

interface IconProps {
    name: keyof typeof MaterialIcons.glyphMap;
    size?: number;
    color?: string;
}

const CustomeIconSymbol: React.FC<IconProps> = ({ name, size = 24, color = 'black' }) => {
    return <MaterialIcons name={name} size={size} color={color} />;
};

export default CustomeIconSymbol;
