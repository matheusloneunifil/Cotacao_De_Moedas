import React, { useState, useEffect } from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '../../templates/Container';
import { Header, Footer, Sidebar } from './components';

interface Props {
    children: React.ReactNode;
    // colorInvert?: boolean;
    bgcolor?: string;
    // showDotsPattern?: boolean;
    // //topMenu: Array<MenuItem>;
    menu: any;
    childProps: any;
    className?: string;
}

const MainWrapper = ({
    children,
    // colorInvert = false,
    bgcolor = 'transparent',
    // showDotsPattern = false,
    menu = [],
    className = '',
    childProps
}: Props): JSX.Element => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true
    });
    const isSm = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true
    });
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const [isScrolled, setScrolled] = useState<boolean>(false);

    const open = isMd ? false : openSidebar;

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrolled(window.scrollY > 50);
        });
    }, []);

    return (
        <Box className={`main-wrapper ${className ? className : ''}`}>
            <AppBar
                position='sticky'
                sx={{
                    top: 0,
                    //backgroundColor: trigger ? theme.palette.background.paper : bgcolor
                    backgroundColor: 'background.level1',
                    color: 'text.primary',
                    borderBottomWidth: 0,
                    opacity: 1,
                    boxShadow: isScrolled
                        ? //? `0px 0px 10px 0px ${alpha(theme.palette.text.primary, 0.3)}`
                          `0px 10px 25px ${alpha(theme.palette.secondary.main, 0.05)}`
                        : 'none'
                }}
                elevation={0}
            >
                <Container
                    paddingY={2}
                    sx={{
                        alignItems: 'center'
                    }}
                >
                    <Header
                        onSidebarOpen={() => setOpenSidebar(true)}
                        menu={menu}
                        colorInvert={false}
                        childProps={childProps}
                    />
                </Container>
            </AppBar>
            <Sidebar
                onClose={() => setOpenSidebar(false)}
                open={open}
                variant='temporary'
                menu={menu}
                childProps={childProps}
            />
            <main style={{ minHeight: '75vh' }}>{children}</main>
            {/* <Box bgcolor='alternate.main' position='fixed' width='100%' bottom={0}> */}
            <Box
                // bgcolor='alternate.main'
                width='100%'
                bgcolor={alpha(theme.palette.secondary.main, 0.01)}
            >
                <Container paddingY={2}>
                    <Footer />
                </Container>
            </Box>
        </Box>
    );
};

export default MainWrapper;
