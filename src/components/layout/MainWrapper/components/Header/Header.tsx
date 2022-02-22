import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Clock from 'react-live-clock';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Button,
    Box,
    Menu,
    MenuItem,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Divider,
    Backdrop,
    Grow,
    Collapse,
    Zoom,
    Fade,
    Slide
} from '@mui/material';
import { LogoBlack, LogoWhite } from '../../../../../utilities/constants';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Header = (props: any): JSX.Element => {
    const { menu, childProps } = props;
    const [activeId, setActiveId] = useState<any>('');
    const [menuId, setMenuId] = useState<string>('');
    const theme = useTheme();
    const history = useHistory();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true
    });
    const { mode } = theme.palette;

    const handleClick = (e: any, m: any) => {
        e.stopPropagation();
        if (m.items) {
            setMenuId(m.path);
        } else {
            if (m.path) {
                setActiveId(m.path);
                setMenuId('');
                history.push(m.path);
            } else if (m.url) {
                setMenuId('');
                window.open(m.url, '_self', 'noreferer');
            }
        }
    };

    const closeDropdown = (e?: any) => {
        if (e) {
            e.stopPropagation();
        }

        setMenuId('');
    };

    return (
        <Box
            display={'flex'}
            justifyContent={isSm ? 'start' : 'space-between'}
            alignItems={'center'}
            width={1}
        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                component={RouterLink}
                to='/'
                title='Cotação de moedas'
                width={{ xs: 200 }}
                sx={{ textDecoration: 'none' }}
            >
                {/* <Box
                    component={'img'}
                    src={mode === 'light' ? LogoBlack : LogoWhite}
                    alt='loopreceipt'
                    height={1}
                    width={{ xs: 150 }}
                /> */}
                <Typography
                    component='h2'
                    variant='h4'
                    fontWeight={700}
                    color='text.primary'
                    fontSize={'1.3rem !important'}
                >
                    Cotação de moedas
                </Typography>
            </Box>
            <Box
                sx={{ display: { xs: 'none', md: 'flex' }, position: 'relative' }}
                alignItems={'center'}
            >
                {menu &&
                    menu.map((m: any, index: number) => (
                        <Box marginLeft={4} key={`menu-item-${m.id}`}>
                            <Box
                                color={
                                    m.path === activeId || m.path === menuId
                                        ? 'secondary.main'
                                        : 'text.primary'
                                }
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'all 0.5s ease',
                                    '&:hover': {
                                        color: 'secondary.main'
                                    }
                                }}
                                // onClick={!m.items ? (e: any) => handleClick(e, m) : null}
                                onClick={!m.items ? (e: any) => handleClick(e, m) : () => null}
                                onMouseEnter={m.items ? (e: any) => handleClick(e, m) : () => null}
                                onMouseLeave={(e: any) => closeDropdown(e)}
                            >
                                {m.title}
                            </Box>
                        </Box>
                    ))}
            </Box>
            {isSm && (
                <Typography
                    component='p'
                    variant='body1'
                    sx={{ marginLeft: 'auto' }}
                    color='text.primary'
                >
                    <Clock
                        //date={'1997-12-31T14:15:23+01:00'}
                        format={'dddd, DD/MM/YY, HH:mm'}
                        ticking
                        locale='PT-BR'
                    />
                </Typography>
            )}

            <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
                <Button
                    onClick={() => props.onSidebarOpen()}
                    aria-label='Menu'
                    color={'secondary'}
                    sx={{
                        minWidth: 'auto',
                        padding: 1,
                        cursor: 'pointer'
                    }}
                >
                    <MenuIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default Header;
