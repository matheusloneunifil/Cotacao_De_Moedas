import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { LogoBlack } from '../../../../../utilities/constants';
import { Link, useHistory } from 'react-router-dom';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    Fade,
    useTheme,
    useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Sidebar = (props: any): JSX.Element => {
    const { open, onClose, menu, variant, childProps } = props;

    const theme = useTheme();

    const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true
    });

    const [activeMenu, setActiveMenu] = useState<any>(menu);
    const history = useHistory();
    const [activeSubMenu, setActiveSubMenu] = useState<string>('');

    const handleClick = (e: any, item: any) => {
        if (item.items) {
            setActiveMenu(item.items);
            setActiveSubMenu(item.title);
        } else {
            props.onClose();
            setActiveMenu(menu);
            setActiveSubMenu('');
            if (item.path) {
                history.push(item.path);
            }
            if (item.url) {
                window.open(item.url, '_self', 'noreferer');
            }
        }
    };
    return (
        <Drawer
            anchor='left'
            onClose={() => onClose()}
            open={open}
            variant={variant}
            sx={{
                '& .MuiPaper-root': {
                    width: '100%'
                    //maxWidth: 280
                }
            }}
        >
            <Box
                sx={{
                    height: '100%',
                    padding: 2
                }}
            >
                <Box display={'flex'} flexDirection={'column'} alignItems='start'>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent='space-between'
                        alignItems='center'
                        onClick={() => {
                            props.onClose();
                            history.push('/');
                        }}
                        title='Cotação de moedas'
                        // width={{ xs: 150, md: 150 }}
                        paddingY={1}
                        marginBottom={2}
                        width='100%'
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        {!activeSubMenu ? (
                            <Typography
                                component='h2'
                                variant='h4'
                                fontWeight={700}
                                color='text.primary'
                                //fontSize={'1.3rem !important'}
                            >
                                Cotação de moedas
                            </Typography>
                        ) : (
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveSubMenu('');
                                    setActiveMenu(menu);
                                }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        )}

                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {activeMenu && (
                        <List
                            //dense
                            sx={{
                                width: '100%',
                                //maxWidth: 360,
                                bgcolor: 'background.paper'
                            }}
                        >
                            {activeMenu.map((x: any, index: number) => (
                                <React.Fragment key={`submenu-item-${x.id}`}>
                                    <ListItem
                                        alignItems='center'
                                        onClick={(e) => handleClick(e, x)}
                                    >
                                        {x.icon && (
                                            <Box
                                                component='img'
                                                src={x.icon}
                                                width={42}
                                                sx={{
                                                    marginRight: 2,
                                                    alignSelf: 'start',
                                                    position: 'relative',
                                                    top: 12
                                                }}
                                            />
                                        )}
                                        <ListItemText
                                            primary={x.title}
                                            secondary={
                                                x.description ? (
                                                    <Box
                                                        component='span'
                                                        display='flex'
                                                        flexDirection='column'
                                                    >
                                                        {x.description}
                                                    </Box>
                                                ) : (
                                                    ''
                                                )
                                            }
                                            primaryTypographyProps={{
                                                color: 'secondary.main'
                                            }}
                                            secondaryTypographyProps={{
                                                color: 'text.primary',
                                                marginTop: 0.5,
                                                marginBottom:
                                                    x.description || !activeSubMenu ? 'inherit' : 4
                                            }}
                                            sx={{
                                                paddingY: 1
                                            }}
                                        />
                                    </ListItem>

                                    <Divider
                                        component='li'
                                        //sx={{ marginY: 1 }}
                                    />
                                </React.Fragment>
                            ))}
                        </List>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
