import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
    alpha,
    Box,
    Button,
    FormControl,
    FormGroup,
    Checkbox,
    FormLabel,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import NumberFormat from 'react-number-format';
import Container from '../components/templates/Container';

// const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
//     const { onChange, ...other } = props;
//     return (
//         <NumberFormat
//             {...other}
//             getInputRef={ref}
//             onValueChange={(values) => {
//                 onChange({
//                     target: {
//                         name: props.name,
//                         value: values.value
//                     }
//                 });
//             }}
//             thousandSeparator
//             isNumericString
//             prefix='$'
//         />
//     );
// });

const Documentation: React.FC = (props: any) => {
    return (
        <Container>
            <Typography component='h3' variant='h3' fontWeight={700} textAlign='center'>
                Documentação
            </Typography>
        </Container>
    );
};

export default Documentation;
