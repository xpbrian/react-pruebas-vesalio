import { useRef, useState } from 'react';
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
    Typography,
    IconButton,
    TextField,
    alpha,
    Table,
    TableCell,
    useTheme,
    TableHead,
    TableRow,
    TableBody,
    Zoom
} from '@mui/material';
import axios from 'axios';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Chart from 'react-apexcharts';
import Lista from './Lista'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useSnackbar } from 'notistack';


export default function Index() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const tableRef = useRef(null);
    const [display, setDisplay] = useState(true)
    const [fecha, setFecha] = useState([{ id: 'fecha', value: new Date().toISOString().split('T')[0] }, { id: 'fecha2', value: new Date().toISOString().split('T')[0] }])
    const [datos, setDatos] = useState({ total: [], generado: [], desertados: [], lista: [] })
    const [arrayDatos, setArrayDatos] = useState([])
    const [arrayDatosExportar, setArrayDatosExportar] = useState([])
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

        try {


            const response = await axios.post(`http://200.121.91.211:4001/desertadosGenerados`, { fechaInicio: fecha.find(x => x.id === 'fecha').value, fechaFin: fecha.find(x => x.id === 'fecha2').value })
            const response2 = await axios.post(`http://200.121.91.211:4001/desertadosGeneradosTotal`, { fechaInicio: fecha.find(x => x.id === 'fecha').value, fechaFin: fecha.find(x => x.id === 'fecha2').value })

            setArrayDatosExportar(response2.data.total)





            let arrayResponse = response.data.total.reduce((arr, item) => {
                let findExiste = arr.findIndex(x => x.especialidadId === item.especialidadId)
                if (findExiste < 0) {
                    arr.push({
                        ...item,
                        generados: item.valor === 'Generadas' ? item.cantidad : 0,
                        desertados: item.valor === 'Desertadas' ? item.cantidad : 0
                    })
                } else {
                    if (arr[findExiste].generados === 0) {
                        arr[findExiste].generados = item.valor === 'Generadas' ? item.cantidad : 0
                    }
                    if (arr[findExiste].desertados === 0) {
                        arr[findExiste].desertados = item.valor === 'Desertadas' ? item.cantidad : 0
                    }
                }
                return arr
            }, [])

            setDatos({
                total: arrayResponse.reduce((arr, item) => {
                    arr.push({ ...item, cantidadMostrar: item.generados + item.desertados })
                    return arr
                }, []),
                generado: arrayResponse.reduce((arr, item) => {
                    arr.push({ ...item, cantidadMostrar: item.generados })
                    return arr
                }, []),
                desertados: arrayResponse.reduce((arr, item) => {
                    arr.push({ ...item, cantidadMostrar: item.desertados })
                    return arr
                }, []),
                lista: arrayResponse
            });

            setArrayDatos([{
                id: 'total',
                title: 'Total de citas',
                cantidad: arrayResponse.map(x => x.generados + x.desertados).reduce((arr, item) => arr + item, 0),
                icon: <PeopleAltIcon
                    sx={{
                        fontSize: 54
                    }}
                />
            },
            {
                id: 'generado',
                title: 'Total de citas generadas',
                cantidad: arrayResponse.map(x => x.generados).reduce((arr, item) => arr + item, 0),
                icon: <CheckCircleOutlineIcon
                    sx={{
                        fontSize: 54
                    }}
                />
            },
            {
                id: 'anulado',
                title: 'Total de citas desertadas',
                cantidad: arrayResponse.map(x => x.desertados).reduce((arr, item) => arr + item, 0),
                icon: <DoNotDisturbIcon
                    sx={{
                        fontSize: 54
                    }}
                />
            }])
            setChartOptionsLine(x => {
                return {
                    ...x, labels: arrayResponse.reduce((arr, item) => {
                        arr.push(item.nombre)
                        return arr
                    }, [])
                }
            })
        } catch (e) {
            console.log(e)
        }

    }

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
                title={t('Cantidad de Citas en fecha por especialidad – Portal Usuario')} />
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
                                {
                                    arrayDatosExportar.length > 0 && <> <DownloadTableExcel
                                        filename="Lista de turno programados"
                                        sheet="listas"
                                        currentTableRef={tableRef.current}
                                    >
                                        <Button variant='containet' fullWidth>
                                            Exportar Lista de turnos completa
                                        </Button>

                                    </DownloadTableExcel>


                                        <Table ref={tableRef} sx={{ display: "none" }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>{t('Fecha')}</TableCell>
                                                    <TableCell>{t('Hora')}</TableCell>
                                                    <TableCell>{t('Especialidad')}</TableCell>
                                                    <TableCell>{t('Doctor')}</TableCell>
                                                    <TableCell>{t('Paciente')}</TableCell>
                                                    <TableCell>{t('Documento Paciente')}</TableCell>
                                                    <TableCell>{t('Estado turno')}</TableCell>
                                                    <TableCell>{t('Consulta id')}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {arrayDatosExportar.map((list, ix) => {
                                                    return (
                                                        <TableRow hover key={ix} >
                                                            <TableCell>
                                                                <Typography
                                                                    noWrap
                                                                    variant="subtitle1"
                                                                    color="text.primary"
                                                                >
                                                                    <b>{list.fecha.split('T')[0]}</b>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    noWrap
                                                                    variant="subtitle1"
                                                                    color="text.primary"
                                                                >
                                                                    <b>{`${list.hora}`}</b>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    noWrap
                                                                    variant="subtitle1"
                                                                    color="text.primary"
                                                                >
                                                                    <b>{list.nombre}</b>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    noWrap
                                                                    variant="subtitle1"
                                                                    color="text.primary"
                                                                >
                                                                    <b>{list.doctor}</b>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    noWrap
                                                                    variant="subtitle1"
                                                                    color="text.primary"
                                                                >
                                                                    <b>{list.paciente}</b>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    noWrap
                                                                    variant="subtitle1"
                                                                    color="text.primary"
                                                                >
                                                                    <b>{list.documento}</b>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    noWrap
                                                                    variant="subtitle1"
                                                                    color="text.primary"
                                                                >
                                                                    <b>{list.estado_turno}</b>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    noWrap
                                                                    variant="subtitle1"
                                                                    color="text.primary"
                                                                >
                                                                    <b>{list.consulta_id}</b>
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>

                                                    );
                                                })}
                                            </TableBody>
                                        </Table>



                                    </>

                                }

                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={5}
                            >
                                <Lista datos={datos.lista} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={7}
                            >
                                <Typography>Detallado</Typography>
                                <Chart
                                    options={chartOptionsLine}
                                    series={[{
                                        name: 'Generadas',
                                        type: 'column',
                                        data: datos.generado.map(x => x.cantidadMostrar)
                                    },
                                    {
                                        name: 'Desertadas',
                                        type: 'line',
                                        data: datos.desertados.map(x => x.cantidadMostrar)
                                    }]}
                                    type="line"
                                    height="300"
                                />

                            </Grid>
                        </>
                    }
                </Grid>
            </CardContent>
            <Divider />

        </Card>
    );
}

