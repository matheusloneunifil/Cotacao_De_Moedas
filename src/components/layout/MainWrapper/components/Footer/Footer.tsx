import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, Divider, Typography } from '@mui/material';

const Footer = (): JSX.Element => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true
    });

    return (
        <>
            <Box
                component={Grid}
                container
                display={'flex'}
                flexDirection='column'
                justifyContent={'center'}
                alignItems={'center'}
                width={1}
                //flexDirection={{ xs: 'column', sm: 'row' }}
                paddingTop={isSm ? 3 : 0}
                paddingBottom={isSm ? 3 : 1}
                // position='fixed'
                // bottom={0}
                // left={0}
                //top={isSm ? 0 : 70}
            >
                <Typography component='p' variant='body2' textAlign='center'>
                    Projeto teste utiliza API pública para obter as taxas de conversão.
                </Typography>
                <Typography component='p' variant='body2' color='text.primary' textAlign='center'>
                    Acesso:{' '}
                    <a href='https://docs.awesomeapi.com.br/api-de-moedas'>
                        docs.awesomeapi.com.br
                    </a>
                </Typography>
            </Box>
        </>
    );
};

export default Footer;
