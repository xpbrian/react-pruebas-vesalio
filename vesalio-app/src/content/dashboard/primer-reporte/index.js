import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography,
    useTheme,
    alpha
} from '@mui/material';
import axios from 'axios';
import Chart from 'react-apexcharts';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Lista from './Lista'


export default function Index() {
    const { t } = useTranslation();
    const theme = useTheme();
    const [display, setDisplay] = useState(true)
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
    const [fecha2, setFecha2] = useState(new Date().toISOString().split('T')[0])
    const [datos, setDatos] = useState({ total: [], generado: [], anulado: [] })
    const [datosDetalle, setDatosDetalle] = useState([])
    const [alephoo, setAlephoo] = useState([])

    const [arrayDatos, setArrayDatos] = useState([])

    const [chartOptions, setChartOptions] = useState({
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '60%'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter(val) {
                return `${parseFloat(val).toFixed(2)}%`;
            },
            style: {
                colors: [theme.colors.alpha.trueWhite[100]]
            },
            background: {
                enabled: true,
                foreColor: theme.colors.alpha.trueWhite[100],
                padding: 8,
                borderRadius: 4,
                borderWidth: 0,
                opacity: 0.3,
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: theme.colors.alpha.black[70],
                    opacity: 0.5
                }
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                color: theme.colors.alpha.black[50],
                opacity: 0.5
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            labels: {
                colors: theme.colors.alpha.trueWhite[100]
            },
            show: false
        },
        stroke: {
            width: 0
        },
        theme: {
            mode: theme.palette.mode
        }
    })
    const [chartOptionsLine, setChartOptionsLine] = useState({
        stroke: {
            curve: 'smooth',
            width: [0, 5]
        },
        theme: {
            mode: theme.palette.mode
        },
        chart: {
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        colors: [alpha(theme.colors.primary.main, 0.4), theme.colors.primary.main],
        fill: {
            opacity: 1
        },
        xaxis: {
            type: 'text'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            strokeDashArray: 5,
            borderColor: theme.palette.divider
        },
        legend: {
            show: false
        }
    })






    const handleClickBuscar = async () => {
        const total = await axios.post(`http://200.121.91.211:4001/primerReporte`, { fecha, fechaFin: fecha2, filtro: "" })
        const generado = await axios.post(`http://200.121.91.211:4001/primerReporte`, { fecha, fechaFin: fecha2, filtro: "generada" })
        const anulado = await axios.post(`http://200.121.91.211:4001/primerReporte`, { fecha, fechaFin: fecha2, filtro: "anulada" })
        const detalle = await axios.post(`http://200.121.91.211:4001/primerReporteDetalle`, { fecha, fechaFin: fecha2, })
        const alephooResponse = await axios.post(`http://200.121.91.211:4001/primerReporteAplehoo`, { fecha, fechaFin: fecha2, })

        setAlephoo(alephooResponse.data)
        setDatosDetalle(detalle.data)
        console.log(detalle.data);
        setArrayDatos([{
            id: 'total',
            title: 'Total de citas',
            cantidad: total.data.map(x => parseInt(x.cantidad)).reduce((arr, item) => arr + item, 0),
            icon: <PeopleAltIcon
                sx={{
                    fontSize: 54
                }}
            />
        },
        {
            id: 'generado',
            title: 'Total de citas generadas',
            cantidad: generado.data.map(x => parseInt(x.cantidad)).reduce((arr, item) => arr + item, 0),
            icon: <CheckCircleOutlineIcon
                sx={{
                    fontSize: 54
                }}
            />
        },
        {
            id: 'anulado',
            title: 'Total de citas anuladas',
            cantidad: anulado.data.map(x => parseInt(x.cantidad)).reduce((arr, item) => arr + item, 0),
            icon: <DoNotDisturbIcon
                sx={{
                    fontSize: 54
                }}
            />
        }])
        setDatos({
            total: total.data,
            generado: generado.data,
            anulado: anulado.data
        });
    }


    useEffect(() => {
        setChartOptions(x => {
            return {
                ...x, labels: datos.total.reduce((arr, item) => {
                    arr.push(item.id)
                    return arr
                }, [])
            }
        })
    }, [datos])

    useEffect(() => {
        setChartOptionsLine(x => {
            return {
                ...x, labels: datosDetalle.reduce((arr, item) => {
                    arr.push(item.id)
                    return arr
                }, [])
            }
        })
    }, [datosDetalle])

    return (
        <Card>
            <CardHeader
                action={
                    <>
                        <IconButton
                            size="medium"
                            color="secondary"
                            onClick={() => setDisplay(x => !x)}
                        >
                            <ExpandMoreTwoToneIcon fontSize="small" />
                        </IconButton>
                    </>
                }
                title={t('Cantidad Citas Total por Perfil')} />
            <Divider />
            <CardContent sx={{ display: display ? '' : 'none' }}>
                <Grid
                    sx={{
                        px: 4
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                >
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type={"date"}
                            value={fecha}
                            variant="outlined"

                            onChange={(e) => setFecha(e.target.value)}
                        />

                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type={"date"}
                            value={fecha2}
                            variant="outlined"

                            onChange={(e) => setFecha2(e.target.value)}
                        />

                    </Grid>
                    <Grid item lg={4}  >
                        <Button

                            variant="outlined"
                            size='large'
                            onClick={() => handleClickBuscar()}
                            endIcon={<SearchIcon fontSize="small" />}
                        >
                            Generar
                        </Button>
                    </Grid>
                    {
                        datos.total.length > 0 && <>
                            <Grid item lg={12}  >
                                <Divider />
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    {arrayDatos.map(x => <Box key={x.id} py={3} px={5} display="flex" alignItems="center">
                                        <Typography
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                opacity: 0.4
                                            }}
                                            color="text.secondary"
                                        >
                                            {x.icon}
                                        </Typography>
                                        <Box ml={1}>
                                            <Typography noWrap gutterBottom variant="subtitle2">
                                                {x.title}
                                            </Typography>
                                            <Typography color="primary" variant="h4">
                                                {x.cantidad}
                                            </Typography>
                                        </Box>
                                    </Box>)}
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={4}
                            >
                                <Typography>Agrupado</Typography>
                                <Chart
                                    height={228}
                                    options={chartOptions}
                                    series={datos.total.reduce((arr, item) => {
                                        arr.push(parseInt(item.cantidad))
                                        return arr
                                    }, [])}
                                    type="donut"
                                />
                                <Lista tipo={1} alephoo={alephoo} datos={datos.total.reduce((arr, item) => {
                                    arr.push({
                                        ...item,
                                        generado: datos.generado.find(x => x.id === item.id) === undefined ? '-' : datos.generado.find(x => x.id === item.id).cantidad,
                                        anulado: datos.anulado.find(x => x.id === item.id) === undefined ? '-' : datos.anulado.find(x => x.id === item.id).cantidad

                                    })
                                    return arr
                                }, [])} />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={8}
                            >
                                <Typography>Detallado</Typography>
                                <Chart
                                    options={chartOptionsLine}
                                    series={[{
                                        name: 'Generadas',
                                        type: 'column',
                                        data: datosDetalle.map(x => x.generado)
                                    },
                                    {
                                        name: 'Anuladas',
                                        type: 'line',
                                        data: datosDetalle.map(x => x.anulado)
                                    }]}
                                    type="line"
                                    height="200"
                                />
                                <Lista datos={datosDetalle} alephoo={alephoo} tipo={2} />
                            </Grid>
                        </>
                    }



                </Grid>
            </CardContent>
            <Divider />

        </Card>
    );
}

