import { PaletteMode } from '@mui/material';

export const light = {
    alternate: {
        main: '#ffffff',
        dark: '#000000'
    },
    mode: 'light' as PaletteMode,
    primary: {
        main: '#4F86FF',
        contrastText: '#fff'
    },
    secondary: {
        main: '#130F49',
        contrastText: '#fff'
    },
    text: {
        primary: '#000000'
        //secondary: '#130F4940'
    },
    divider: '#130F491A',
    background: {
        paper: '#ffffff',
        default: '#ffffff',
        level2: 'rgba(19, 15, 73, 0.02)',
        level1: '#b2d8ff'
    }
};

export const dark = {
    alternate: {
        main: '#ffffff',
        dark: '#000000'
    },
    common: {
        black: '#000',
        white: '#fff'
    },
    mode: 'dark' as PaletteMode
};
