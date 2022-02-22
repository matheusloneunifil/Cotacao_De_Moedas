import React, { useEffect, useState } from 'react';
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
    useTheme,
    Divider,
    Slide,
    Zoom
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import NumberFormat from 'react-number-format';
import Container from '../components/templates/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Home: React.FC = (props: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [currency, setCurrency] = useState<string>('brl');
    const [amount, setAmount] = useState<number | null>(null);
    const [destCurruncies, setDestCurrencies] = useState<Array<any>>([]);
    const [data, setData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [conHistory, setConHistory] = useState<Array<any>>([]);
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true
    });

    useEffect(() => {
        let datafromLS = localStorage.getItem('conversionHistory');
        if (datafromLS) {
            setConHistory(JSON.parse(datafromLS));
        }
    }, []);

    const reset = () => {
        setCurrency('brl');
        setAmount(null);
        setDestCurrencies([]);
        setData(null);
        setErrorMessage('');
    };

    const updateBaseCurrency = (value: string) => {
        if (destCurruncies.includes(value)) {
            let selectedCurr = [...destCurruncies];
            let index = selectedCurr.findIndex((c: any) => c === value);
            selectedCurr.splice(index, 1);
            setDestCurrencies(selectedCurr);
        }
        if (errorMessage) {
            setErrorMessage('');
        }
        setCurrency(value);
    };

    const targetCurrencies = [
        {
            label: 'BRL',
            value: 'brl',
            name: 'Real Brasileiro'
        },
        {
            label: 'USD',
            value: 'usd',
            name: 'Dólar Americano'
        },
        {
            label: 'EUR',
            value: 'eur',
            name: 'Euro'
        },
        {
            label: 'JPY',
            value: 'jpy',
            name: 'Iene Japonês'
        }
    ];

    const updateDestCurrencies = (value: string) => {
        if (errorMessage) {
            setErrorMessage('');
        }
        const selectedCurr = [...destCurruncies];
        if (selectedCurr.includes(value)) {
            let index = selectedCurr.findIndex((c: any) => c === value);
            selectedCurr.splice(index, 1);
        } else {
            selectedCurr.push(value);
        }

        setDestCurrencies(selectedCurr);
    };

    const updateHistory = (data: any) => {
        let newConHistory = [...conHistory];
        if (newConHistory.length === 3) {
            newConHistory.pop();
        }
        newConHistory.unshift(data);
        localStorage.setItem('conversionHistory', JSON.stringify(newConHistory));
        setConHistory(newConHistory);
    };

    const formatExchangeData = (data: any, urlParams: Array<any>) => {
        let formattedData: any = [];
        let sourceCurrName: string = '';

        urlParams.forEach((param: string) => {
            let paramArray = param.split('-');
            const factor =
                (Number(data[paramArray.join('')].high) + Number(data[paramArray.join('')].low)) /
                2;
            formattedData[param] = data[paramArray.join('')];
            formattedData.push({
                ...data[paramArray.join('')],
                name: data[paramArray.join('')].name.split('/')[1],
                factor: factor,
                convertedAmount: amount ? amount * Number(factor) : 0
            });
            if (!sourceCurrName) {
                sourceCurrName = data[paramArray.join('')].name.split('/')[0];
            }
        });
        return {
            sourceCurrency: currency.toUpperCase(),
            sourceCurrencyName: sourceCurrName,
            amount: amount,
            items: formattedData
        };
    };

    const exchangeTheCurrency = () => {
        if (amount && destCurruncies.length > 0) {
            setLoading(true);
            let urlParams = destCurruncies.map(
                (c: any) => `${currency.toUpperCase()}-${c.toUpperCase()}`
            );

            fetch(`https://economia.awesomeapi.com.br/last/${urlParams.join()}`)
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    if (data && data.status) {
                        // alert(data.message);
                        setErrorMessage(data.message);
                    } else {
                        let newData = formatExchangeData(data, urlParams);

                        updateHistory(newData);
                        setData(newData);
                    }
                })
                .catch((error: any) => {
                    console.log('Error');
                    console.log(error);
                });
        } else {
            if (!amount) {
                setErrorMessage('por favor insira o valor.');
            }
            if (destCurruncies.length === 0) {
                setErrorMessage('nenhuma moeda foi selecionada');
            }
        }
    };

    return (
        <Container>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography component='h3' variant='h3' fontWeight={700} textAlign='center'>
                    Cotação de moedas
                </Typography>
                {!data ? (
                    <>
                        <Box
                            marginTop={3}
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                        >
                            <Typography component='p' variant='body1'>
                                Selecione a moeda e o valor inicial
                            </Typography>
                            <Box
                                display='flex'
                                flexDirection='column'
                                //justifyContent='space-evenly'
                                width='100%'
                                marginTop={2}
                            >
                                <FormControl sx={{ width: '100%' }} size='small'>
                                    <Select
                                        value={currency}
                                        //label='Age'
                                        onChange={(e: any) => updateBaseCurrency(e.target.value)}
                                    >
                                        {targetCurrencies.map((cr: any, index: number) => (
                                            <MenuItem key={`currency-${index}`} value={cr.value}>
                                                {`${cr.label} (${cr.name})`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {/* <TextField
                            size='small'
                            variant='outlined'
                            sx={{ width: '30%' }}
                            value={amount}
                            onChange={(e: any) => setAmount(e.target.value)}
                            InputProps={{
                                inputComponent: NumberFormatCustom
                            }}
                        /> */}
                                <NumberFormat
                                    onValueChange={(values: any) => {
                                        if (errorMessage) {
                                            setErrorMessage('');
                                        }
                                        setAmount(values.floatValue);
                                    }}
                                    //onChange={handleKeyDown}
                                    thousandSeparator
                                    required={true}
                                    value={amount}
                                    isNumericString
                                    // decimalScale={block.display_precision ? block.display_precision : 0}
                                    // suffix={block.symbol_after ? ` ${block.symbol_after}` : ''}
                                    fullWidth
                                    size='small'
                                    type='text'
                                    sx={{
                                        marginTop: 1
                                    }}
                                    inputProps={{ inputMode: 'numeric' }}
                                    variant='outlined'
                                    placeholder='montante'
                                    //label={props.block.title}
                                    color={'secondary'}
                                    isAllowed={function ({ floatValue, ...rest }: any) {
                                        console.log(floatValue);
                                        console.log(rest);

                                        if (floatValue < 0 || rest.formattedValue === '-') {
                                            setErrorMessage(
                                                'Não é possível converter valores negativos'
                                            );
                                            return false;
                                        }
                                        if (!Number(floatValue)) {
                                            if (amount && rest.formattedValue === '') {
                                                return true;
                                            }
                                            setErrorMessage('Digitar apenas números, e valor maior ou igual a 1');
                                            return false;
                                        }
                                        if (amount === floatValue && rest.formattedValue !== '') {
                                            setErrorMessage('Digitar apenas números, e valor maior ou igual a 1');
                                            return false;
                                        }
                                        return true;
                                    }}
                                    allowLeadingZeros
                                    customInput={TextField}
                                />
                            </Box>
                        </Box>
                        <Box
                            marginTop={3}
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                        >
                            <Typography component='p' variant='body1'>
                                selecione as moedas de destino
                            </Typography>
                            <FormControl
                                sx={{ marginTop: 1, textAlign: 'center' }}
                                component='fieldset'
                                variant='standard'
                            >
                                <FormGroup row>
                                    {targetCurrencies.map((cu: any, index: number) => (
                                        <FormControlLabel
                                            sx={{
                                                marginRight:
                                                    index < targetCurrencies.length
                                                        ? isSm
                                                            ? 3
                                                            : 2
                                                        : 0
                                            }}
                                            key={`dest-curruncies-${index}`}
                                            control={
                                                <Checkbox
                                                    checked={destCurruncies.includes(cu.value)}
                                                    onChange={() => updateDestCurrencies(cu.value)}
                                                    name={cu.value}
                                                    size='small'
                                                    sx={{ padding: 0.5 }}
                                                    disabled={currency === cu.value}
                                                />
                                            }
                                            label={cu.label}
                                        />
                                    ))}
                                </FormGroup>

                                {/* <FormHelperText>Be careful</FormHelperText> */}
                            </FormControl>
                            {/* </Box> */}
                        </Box>

                        <LoadingButton
                            loading={loading}
                            //loadingIndicator='Loading...'
                            //loadingPosition='start'
                            variant='contained'
                            sx={{ mt: 2 }}
                            onClick={exchangeTheCurrency}
                        >
                            obter cotação
                        </LoadingButton>

                        <Typography
                            component='p'
                            variant='body2'
                            color='error'
                            sx={{ marginTop: 1 }}
                            minHeight={20}
                        >
                            {errorMessage ? errorMessage : ''}
                        </Typography>
                    </>
                ) : (
                    amount && (
                        <Slide in={true} direction='up'>
                            <Box marginTop={3} display='flex' flexDirection='column'>
                                <Typography component='p' variant='h5' fontWeight={500}>
                                    {`${new Intl.NumberFormat('pt-BR').format(amount)}`}
                                    <Box
                                        component={'span'}
                                        sx={{ fontWeight: 400, marginLeft: 1 }}
                                    >{`${data.sourceCurrencyName}(${data.sourceCurrency})`}</Box>
                                </Typography>
                                <Divider sx={{ marginY: 1 }} />

                                {data.items.map((item: any, index: number) => (
                                    <React.Fragment key={`output-${index}`}>
                                        <Typography component='p' variant='h5' fontWeight={500}>
                                            {`${new Intl.NumberFormat('pt-BR').format(
                                                item.convertedAmount
                                            )}`}
                                            <Box
                                                component={'span'}
                                                sx={{ fontWeight: 400, marginLeft: 1 }}
                                            >{`${item.name}(${item.codein})`}</Box>
                                        </Typography>
                                        <Divider sx={{ marginY: 1 }} />
                                    </React.Fragment>
                                ))}

                                <Button
                                    variant='contained'
                                    sx={{ mt: 2 }}
                                    onClick={reset}
                                    startIcon={<RestartAltIcon />}
                                >
                                    Nova cotação
                                </Button>
                            </Box>
                        </Slide>
                    )
                )}
                {conHistory.length > 0 && (
                    <Box marginTop={!data ? 1 : 3}>
                        <Typography component='h4' variant='h5' fontWeight={600} textAlign='center'>
                            Conversões anteriores
                        </Typography>
                        <Box marginTop={1} display='flex' flexDirection='column'>
                            {conHistory.map((data: any, index: number) => (
                                <React.Fragment key={`con-history-${index}`}>
                                    <Box display='flex' alignItems='center'>
                                        <Typography
                                            component='p'
                                            variant='body2'
                                            width={isSm ? '150px' : '100px'}
                                        >
                                            {`${new Intl.NumberFormat('pt-BR').format(
                                                data.amount
                                            )}`}
                                            <Box
                                                component={'span'}
                                                sx={{
                                                    display: 'block',
                                                    fontWeight: 400
                                                    //marginLeft: 1
                                                }}
                                            >{`${data.sourceCurrencyName}(${data.sourceCurrency})`}</Box>
                                        </Typography>
                                        <ArrowRightAltIcon fontSize='small' sx={{ marginX: 2 }} />
                                        <Box
                                            key={`output-${index}`}
                                            display='flex'
                                            flexDirection='column'
                                        >
                                            {data.items.map((item: any, index: number) => (
                                                <Typography
                                                    component='p'
                                                    variant='body2'
                                                    key={`con-history-2-${index}`}
                                                    //fontWeight={500}
                                                >
                                                    {`${new Intl.NumberFormat('pt-BR').format(
                                                        item.convertedAmount
                                                    )}`}
                                                    <Box
                                                        component={'span'}
                                                        sx={{ fontWeight: 400, marginLeft: 1 }}
                                                    >{`${item.name}(${item.codein})`}</Box>
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                    <Divider sx={{ marginY: 0.5 }} />
                                </React.Fragment>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Home;
