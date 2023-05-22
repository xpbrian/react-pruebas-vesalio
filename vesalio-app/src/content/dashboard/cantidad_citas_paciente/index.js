import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    TextField,
    Zoom,
    alpha,
    useTheme,

} from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Chart from 'react-apexcharts';

export default function Index() {
    const { t } = useTranslation();
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [display, setDisplay] = useState(true)
    const [fecha, setFecha] = useState([{ id: 'fecha', value: new Date().toISOString().split('T')[0] }, { id: 'fecha2', value: new Date().toISOString().split('T')[0] }])
    const [datos, setDatos] = useState({ total: [], generado: [], anulada: [], lista: [] })
    const [arrayDatos, setArrayDatos] = useState([])
    const [arrayDatosLine, setArrayDatosLine] = useState([])
    const [selected, setSelected] = useState(null)
    const [chartOptionsLine2, setChartOptionsLine2] = useState({
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
            },

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
    const [arrayDatosLine2, setArrayDatosLine2] = useState([])
    const [chartOptionsLine, setChartOptionsLine] = useState({
        stroke: {
            curve: 'smooth',
            width: [0, 5]
        },
        theme: {
            mode: theme.palette.mode
        },
        chart: {
            events: {
                dataPointSelection: (event, chartContext, config) => {

                    setSelected(config.dataPointIndex)
                }
            },
            background: 'transparent',
            toolbar: {
                show: false
            },

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
    useEffect(() => {
        if (selected !== null) {
            let arrzTotal = datos.total.filter(x => x.fecha.split('T')[0] === arrayDatosLine[selected].fecha)
            let arrzGenerados = datos.generado.filter(x => x.fecha.split('T')[0] === arrayDatosLine[selected].fecha)
            let arrzAnulados = datos.anulada.filter(x => x.fecha.split('T')[0] === arrayDatosLine[selected].fecha)
            let farray2 = arrzTotal.reduce((arr, item) => {
                let arFind = arr.findIndex(x => x.nombre === item.nombre)
                if (arFind < 0) {
                    arr.push({
                        nombre: item.nombre,
                        generados: arrzGenerados.filter(x => x.nombre === item.nombre).length,
                        anulados: arrzAnulados.filter(x => x.nombre === item.nombre).length
                    })
                }
                return arr
            }, [])
            setArrayDatosLine2(farray2)
            setChartOptionsLine2(x => {
                return {
                    ...x, labels: farray2.reduce((arr, item) => {
                        arr.push(item.nombre)
                        return arr
                    }, [])
                }
            })
        }
    }, [selected, datos, arrayDatosLine])

    const handleClickBuscar = async () => {

        try {
            const response = await axios.post(`http://200.121.91.211:4001/reporteGeneral`, { fechaInicio: fecha.find(x => x.id === 'fecha').value, fechaFin: fecha.find(x => x.id === 'fecha2').value })
            setDatos({
                total: response.data,
                generado: response.data.filter(x => x.estado_turno_id !== 3),
                anulada: response.data.filter(x => x.estado_turno_id === 3),
                lista: []
            });
        } catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        setArrayDatos([{
            id: 'total',
            title: 'Total de citas',
            cantidad: datos.total.length,
            icon: <PeopleAltIcon
                sx={{
                    fontSize: 54
                }}
            />
        },
        {
            id: 'generado',
            title: 'Total de citas generadas',
            cantidad: datos.generado.length,
            icon: <CheckCircleOutlineIcon
                sx={{
                    fontSize: 54
                }}
            />
        },
        {
            id: 'anulado',
            title: 'Total de citas desertadas',
            cantidad: datos.anulada.length,
            icon: <DoNotDisturbIcon
                sx={{
                    fontSize: 54
                }}
            />
        }])
        let arrayResponse = datos.total.reduce((arr, item) => {
            let findExiste = arr.findIndex(x => x.fecha === item.fecha.split('T')[0])
            if (findExiste < 0) {
                arr.push({
                    fecha: item.fecha.split('T')[0],
                    generados: datos.generado.filter(x => x.fecha.split('T')[0] === item.fecha.split('T')[0]).length,
                    anulados: datos.anulada.filter(x => x.fecha.split('T')[0] === item.fecha.split('T')[0]).length
                })
            }
            return arr
        }, []);
        setArrayDatosLine(arrayResponse)
        setChartOptionsLine(x => {
            return {
                ...x, labels: arrayResponse.reduce((arr, item) => {
                    arr.push(item.fecha)
                    return arr
                }, [])
            }
        })
    }, [datos])

    const handleChangedText = (e) => {
        setFecha(fe => fe.reduce((arr, item) => {
            arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
            return arr
        }, []))
    }

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
                title={t('Cantidad de Citas en fecha por especialidad - Portal Web Pacientes')} />
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
                            name="fecha"
                            value={fecha.find(x => x.id === 'fecha').value}
                            variant="outlined"
                            onChange={(e) => handleChangedText(e)}
                        />

                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            name="fecha2"
                            type={"date"}
                            value={fecha.find(x => x.id === 'fecha2').value}
                            variant="outlined"
                            onChange={(e) => handleChangedText(e)}
                        />

                    </Grid>
                    <Grid item lg={4}  >
                        <Button

                            variant="outlined"
                            size='large'
                            onClick={() => {
                                enqueueSnackbar('Generando el reporte solicitado', {
                                    variant: 'success',
                                    anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right'
                                    },
                                    TransitionComponent: Zoom
                                })
                                handleClickBuscar()
                            }}
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
                                <Divider />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                            >
                                <Chart
                                    options={chartOptionsLine}
                                    series={[{
                                        name: 'Generadas',
                                        type: 'column',
                                        data: arrayDatosLine.map(x => x.generados)
                                    },
                                    {
                                        name: 'Anuldas',
                                        type: 'line',
                                        data: arrayDatosLine.map(x => x.anulados)
                                    }]}
                                    type="line"
                                    height="300"
                                />

                            </Grid>
                            {
                                arrayDatosLine2.length > 0 && <Grid
                                    item
                                    xs={12}
                                    md={12}
                                >
                                    <Typography variant='h4'> Resultados por especialidad</Typography>
                                    <br />
                                    <Chart
                                        options={chartOptionsLine2}
                                        series={[{
                                            name: 'Generadas',
                                            type: 'column',
                                            data: arrayDatosLine2.map(x => x.generados)
                                        },
                                        {
                                            name: 'Anuldas',
                                            type: 'line',
                                            data: arrayDatosLine2.map(x => x.anulados)
                                        }]}
                                        type="line"
                                        height="300"
                                    />

                                </Grid>
                            }
                        </>
                    }
                </Grid>
            </CardContent>
            <Divider />

        </Card>
    );
}

