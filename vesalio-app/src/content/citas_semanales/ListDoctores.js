import { useEffect, useState } from 'react';

import {
    Grid,
    Chip,
    Typography,
    Card,
    Box,
    Divider,
    styled,
    Link,
    Button,
    TextField,
    InputAdornment,
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import useAuthLayout from 'src/hooks/useAuthLayout'

const Results = ({ lista: datos, getDatos }) => {

    const { mostrarComponent } = useAuthLayout()
    const [lista, setLista] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        setLista(datos)

    }, [datos])



    const ChipWrapper = styled(Chip)(
        ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        margin: ${theme.spacing(0.5)};
        padding: ${theme.spacing(1)};
        height: 28px;
        line-height: 28px;
        font-weight: bold;
`
    );

    useEffect(() => {
        setLista(query.length === 0 ? datos : datos.filter(x => x.nombres.toUpperCase().includes(query.toUpperCase())))
    }, [query])

    return (
        <>

            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Box p={2}>
                        <TextField
                            sx={{
                                m: 0
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchTwoToneIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={'Buscar'}
                            value={query}
                            size="small"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />

                    </Box>
                </Grid>

                {lista.sort(function (a, b) {
                    if (a.nombres > b.nombres) {
                        return 1;
                    }
                    if (a.nombres < b.nombres) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                }).map((job, ix) => {
                    return (
                        <Grid key={ix} item xs={12} md={12}>
                            <Card>
                                <Box px={3}>
                                    <Link href="#"
                                        onClick={() => mostrarComponent({
                                            contenido: 'verMedico',
                                            estado: true,
                                            size: 'xs',
                                            item: job
                                        }, 'modalOpen')}>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                mb: 1
                                            }}
                                        >
                                            Médico: {job.nombres}
                                        </Typography>
                                    </Link>
                                    <Typography variant="subtitle1" >Dias de Atención</Typography>
                                </Box>
                                <Box px={2} py={1}>
                                    {job.dias.map((value, ix) => {
                                        return (
                                            <ChipWrapper
                                                key={ix}
                                                color="secondary"
                                                label={value}
                                            />
                                        );
                                    })}
                                </Box>

                                <Divider />
                                <Box px={3} py={2}>
                                    <Grid
                                        container
                                        spacing={3}
                                        justifyContent="center"
                                        alignItems="center">
                                        <Grid item md={6}>
                                            <Button
                                                size="small"
                                                fullWidth
                                                variant="outlined"
                                                onClick={() => getDatos({ id_especialidad: job.especialidad, documento: job.documento })}
                                            >
                                                {'Seleccionar'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};


export default Results;
