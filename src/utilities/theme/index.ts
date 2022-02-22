import { Theme, responsiveFontSizes } from '@mui/material';
import { createTheme, ComponentsOverrides } from '@mui/material/styles';
import { light, dark } from './palette';

const getTheme = (mode: string, toggleTheme: () => void): Theme =>
    responsiveFontSizes(
        createTheme({
            palette: mode === 'light' ? light : dark,
            typography: {
                fontFamily: '"Roboto", sans-serif',
                button: {
                    textTransform: 'none',
                    fontSize: 16,
                    fontWeight: 'medium' as React.CSSProperties['fontWeight']
                },
                h1: {
                    fontFamily: '"Playfair Display", serif'
                },
                h2: {
                    fontFamily: '"Playfair Display", serif'
                },
                h3: {
                    fontFamily: '"Playfair Display", serif'
                },
                h4: {
                    fontFamily: '"Playfair Display", serif'
                }
            },
            zIndex: {
                appBar: 1100,
                drawer: 1200
            },
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            paddingLeft: 25,
                            paddingRight: 25,

                            boxShadow: 'none'
                        }
                    } as ComponentsOverrides['MuiButton']
                },

                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            borderRadius: 0
                        }
                    } as ComponentsOverrides['MuiInputBase']
                }
            },
            toggleTheme
        })
    );

export default getTheme;
