import React, { memo } from 'react';
import Box from '@mui/material/Box';

interface Props {
    children: React.ReactNode;
    [x: string]: any;
}

const Container = ({ children, ...rest }: Props): JSX.Element => (
    <Box
        maxWidth={{ sm: 720, md: 1207, xl: 1320 }}
        width={1}
        margin={'0 auto'}
        paddingX={2}
        paddingY={{ xs: 6, sm: 6, md: 6 }}
        {...rest}
    >
        {children}
    </Box>
);

export default memo(Container);
