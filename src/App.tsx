import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from './utilities/theme';
import { Box, CssBaseline } from '@mui/material';
import { MainWrapper } from './components/layout';
import { withRouter } from 'react-router-dom';
import { MENU } from './utilities/constants';
import Routes from './routes/rootRoutes';

const App: React.FC = (props: any) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        try {
            const localTheme = window.localStorage.getItem('themeMode');
            if (localTheme) {
                props.updateThemeMode(localTheme);
            }

            //validateWallet();
        } catch (e: any) {
            // tema default entra em ação
            enqueueSnackbar(e.message, {
                variant: 'error'
            });
        }
    }, []);

    let childProps: any = {
        signIn: () => null,
        signOut: () => null
    };

    return (
        <ThemeProvider theme={getTheme('light', () => null)}>
            <CssBaseline />
            <MainWrapper
                bgcolor={'alternate.main'}
                menu={MENU}
                childProps={childProps}
                className={props.themeMode}
            >
                <Box marginTop={1}>
                    <Routes childProps={childProps} />
                </Box>
            </MainWrapper>
        </ThemeProvider>
    );
};

export default App;
