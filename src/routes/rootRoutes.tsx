import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Home from '../containers/Home';
import Documentation from '../containers/Documentatio';

const Routes = ({ childProps }: any) => {
    return (
        <Suspense
            fallback={
                <Box display='flex' justifyContent='center' paddingY={4}>
                    <CircularProgress />
                </Box>
            }
        >
            <Switch>
                <Route exact path='/index.html' render={() => <Redirect to='/' />} />
                <Route exact path='/' render={(props) => <Home {...props} {...childProps} />} />
                <Route
                    exact
                    path='/documentation'
                    render={(props) => <Documentation {...props} {...childProps} />}
                />
                {/* <NonPrivateRoute exact path='/about-us' component={AboutUs} props={childProps} /> */}
                //handle 404 pages
                {/* <Route component={NotFound} /> */}
            </Switch>
        </Suspense>
    );
};

export default Routes;
