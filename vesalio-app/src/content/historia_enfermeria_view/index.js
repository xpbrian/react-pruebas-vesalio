import { Card, CardContent, CardHeader, Divider, Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router'
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from 'axios';
import DatosUsuario from '../historia_paciente/DatosUsuario'
import AntecedentesDash from '../historia_paciente/antecedentes'
import useLayoutContext from 'src/hooks/useAuthLayout';
import Historial from '../historia_paciente/historial'

export default function Index() {
    const [filtroEsp, setFiltroEsp] = useState([])
    const { id } = useParams();
    const theme = useTheme()
    const [datosUsuario, setDatosUsuario] = useState(null)
    const [cards, setCards] = useState([{ id: 'datos', lg: 3, display: true }, { id: 'historial', lg: 6, display: true }, { id: 'antecedentes', lg: 3, display: true }])
    const [sidebar, setSidebar] = useState([])
    const [antecedentes, setAntecedentes] = useState(null)
    const [historial, setHistorial] = useState([])
    const [botonEmergenia, setBotonEmergencia] = useState(null)
    const { addItemDrawer } = useLayoutContext()


    const handleFiltroEspecialidad = (id) => {
        if (filtroEsp.find(x => (x === id)) === undefined) {
            setFiltroEsp(x => [...x, id])
        } else {
            setFiltroEsp(x => x.filter(y => (y !== id)))
        }
    }

    const getDatos = async (id) => {
        try {
            const citas = await axios.get(`http://200.121.91.211:4001/historiaPacienteEnfermera/${id}`)
            setDatosUsuario(citas.data.datos.length > 0 ? citas.data.datos[0] : null)
            setSidebar(citas.data.sidebar)
            setAntecedentes(citas.data.antecedentes)
            setHistorial(citas.data.historial)
            setBotonEmergencia(citas.data.botonEmergencia.length === 0 ? null : citas.data.botonEmergencia[0])
        } catch (e) {
            console.log(e);
        }

    }

    const actualizarView = () => {
        getDatos(id)
    }

    useEffect(() => {
        getDatos(id);
        return () => {
            setDatosUsuario(null);
            setSidebar([])
            setAntecedentes([])
            setHistorial([])
            setBotonEmergencia(null)
        };
    }, [id])

    const setDatos = async (tipo) => {
        const citas = await axios.get(`http://200.121.91.211:4001/historiaPaciente/${id}`)
        setAntecedentes(citas.data.antecedentes)

        if (tipo === 'patologicos') {
            addItemDrawer(citas.data.antecedentes.patologicos)
        }
        if (tipo === 'noPatologicos') {
            addItemDrawer(citas.data.antecedentes.noPatologicos)
        }
        if (tipo === 'medicamentos') {
            addItemDrawer(citas.data.antecedentes.medicamentos)
        }
        if (tipo === 'heredo') {
            addItemDrawer(citas.data.antecedentes.heredoFamiliar)
        }
        if (tipo === 'quirurgico') {
            addItemDrawer(citas.data.antecedentes.quirurgico)
        }
        if (tipo === 'habito') {
            addItemDrawer(citas.data.antecedentes.habito)
        }
    }
    const mostrarOcultar = (id, estado, sumar) => {

        let tmp = []
        cards.map(x => {
            if (x.id === id) {
                tmp.push({
                    ...x, lg: estado ? 3 : 1, display: estado
                })
            } else {
                tmp.push({
                    ...x, lg: x.id !== "historial" ? x.lg : (estado ? 6 + sumar : 8 + sumar)
                })
            }
            return false
        })
        setCards(tmp)
    }
    return (
        <>
            <Helmet>
                <title>Historia clínica</title>
            </Helmet>
            <PageTitleWrapper>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h3" component="h3" gutterBottom>
                            {'Historia clínica'}
                        </Typography>
                    </Grid>
                </Grid>
            </PageTitleWrapper>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 }
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={12} lg={cards.find(x => x.id === "datos").lg}>
                    <Card sx={{ py: 2 }} >
                        <CardHeader
                            sx={{
                                p: 2
                            }}
                            disableTypography
                            action={
                                <IconButton
                                    size="small"
                                    color="secondary"
                                    onClick={() => mostrarOcultar("datos", !cards.find(x => x.id === "datos").display, cards.find(x => x.id === "antecedentes").lg === 3 ? 0 : 2)}>
                                    <Tooltip placement='top' title={!cards.find(x => x.id === "datos").display ? "Expandir" : "Contraer"}>
                                        <CloseFullscreenIcon fontSize="small" />
                                    </Tooltip>
                                </IconButton>
                            }
                            title={
                                <>
                                    {
                                        cards.find(x => x.id === "datos").display ? <Typography
                                            sx={{
                                                fontSize: `${theme.typography.pxToRem(17)}`
                                            }}
                                            gutterBottom
                                            variant="h3"
                                            textAlign="center"
                                        >
                                            Datos del paciente
                                        </Typography> :
                                            <Tooltip title={"Datos del paciente"}>
                                                <AccountCircleIcon fontSize='large' style={{ marginTop: "-8px", cursor: "pointer" }} />
                                            </Tooltip>

                                    }
                                </>
                            }
                        />
                        <Divider />
                        {datosUsuario !== null && <DatosUsuario handleFiltroEspecialidad={handleFiltroEspecialidad} antecedentes={antecedentes} datosUsuario={datosUsuario} display={cards.find(x => x.id === "datos").display} sidebar={sidebar} botonEmergenia={botonEmergenia} />}


                    </Card>
                </Grid>
                <Grid item xs={12} lg={cards.find(x => x.id === "historial").lg}>
                    <Card sx={{ py: 2, display: cards.find(x => x.id === "historial").display ? '' : 'none' }} >
                        <CardHeader
                            sx={{
                                p: 2
                            }}
                            disableTypography
                            title={
                                <>
                                    <Typography
                                        sx={{
                                            fontSize: `${theme.typography.pxToRem(17)}`
                                        }}
                                        gutterBottom
                                        variant="h3"
                                        textAlign="center"
                                    >
                                        Historial
                                    </Typography>
                                </>
                            }
                        />
                        <Divider />
                        <Historial historial={historial} filtroEsp={filtroEsp} antecedentes={antecedentes} datosUsuario={datosUsuario} actualizarView={actualizarView} />
                    </Card>
                </Grid>
                <Grid item xs={12} lg={cards.find(x => x.id === "antecedentes").lg}>
                    <Card sx={{ py: 2 }} >
                        <CardHeader
                            sx={{
                                p: 2
                            }}
                            disableTypography
                            action={
                                <IconButton
                                    size="small"
                                    color="secondary"
                                    onClick={() => mostrarOcultar("antecedentes", !cards.find(x => x.id === "antecedentes").display, cards.find(x => x.id === "datos").lg === 3 ? 0 : 2)}>
                                    <Tooltip placement='top' title={!cards.find(x => x.id === "antecedentes").display ? "Expandir" : "Contraer"}>
                                        <CloseFullscreenIcon fontSize="small" />
                                    </Tooltip>
                                </IconButton>
                            }
                            title={
                                <>
                                    {
                                        cards.find(x => x.id === "antecedentes").display ? <Typography
                                            sx={{
                                                fontSize: `${theme.typography.pxToRem(17)}`
                                            }}
                                            gutterBottom
                                            variant="h3"
                                            textAlign="center"
                                        >
                                            Antecedentes
                                        </Typography> :
                                            <Tooltip title="Antecedentes" placement='top'>
                                                <BadgeIcon fontSize='large' style={{ marginTop: "-11px", cursor: "pointer" }} />
                                            </Tooltip>
                                    }
                                </>
                            }
                        />
                        <Divider />
                        {
                            <CardContent sx={{ display: cards.find(x => x.id === "antecedentes").display ? '' : 'none' }}>
                                <AntecedentesDash actualizarView={actualizarView} antecedentes={antecedentes} datosUsuario={datosUsuario} setDatos={setDatos} />
                            </CardContent>}
                    </Card>
                </Grid>
            </Grid>


        </>
    )
}
