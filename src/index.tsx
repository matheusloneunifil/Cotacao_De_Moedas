import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';
import './sass/main.scss';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

const rootElement: any = document.getElementById('root');

render(
    <SnackbarProvider
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        maxSnack={2}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </SnackbarProvider>,
    rootElement
);
