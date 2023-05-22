import { Box, Grid, Typography, IconButton, Tooltip, useTheme, styled, Divider, Accordion, List, ListItemButton, AccordionSummary, ListItemText, ListItemIcon, Checkbox, AccordionDetails, Button, Link, Card } from '@mui/material';
import { useEffect, useState } from 'react'
// import AdfScannerIcon from '@mui/icons-material/AdfScanner';
// import ChatIcon from '@mui/icons-material/Chat';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SourceIcon from '@mui/icons-material/Source';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import axios from 'axios';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { useParams } from 'react-router';

const IconButtonWrapper = styled(IconButton)(
    ({ theme }) => `
          transform: translateY(0px);
          transition: ${theme.transitions.create(['color', 'transform'])};
  
          .MuiSvgIcon-root {
              transform: scale(1);
              transition: ${theme.transitions.create(['transform'])};
          }
  
          &:hover {
              transform: translateY(-2px);
      
              .MuiSvgIcon-root {
                  transform: scale(1.3);
              }
          }
    `
);
const AccordionSummaryWrapper = styled(AccordionSummary)(
    () => `
        &.Mui-expanded {
          min-height: 48px;
        }
  
        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }
    `
);

const ListItemWrapper = styled(ListItemButton)(
    () => `
    
        &.MuiButtonBase-root {
          border-radius: 0;
        }
    `
);

// 

export default function DatosUsuario({ datosUsuario, display, sidebar, botonEmergenia, antecedentes, handleFiltroEspecialidad }) {
    const { t } = useTranslation();
    const { mostrarComponent } = useLayoutContext()
    const [datos, setDatos] = useState(null)
    const [lista, setLista] = useState([])
    const [boton, setButton] = useState(null)
    const [mostraEmergencia, setMostrarEmergencia] = useState([])
    const [botonExtra, setBotonExtra] = useState(null)
    const { id } = useParams();


    useEffect(() => {
        const getDatosExtra = async () => {
            try {
                const res = await axios.get(`http://200.121.91.211:4001/turnoPrormamadoExtra/${id}`)
                console.log(res.data === null ? null : res.data.extras);
                setBotonExtra(res.data === null ? null : res.data.extras)
            } catch (e) {
                console.log(e);
            }
        }
        getDatosExtra()
    }, [id])

    const resultadosMedicos = (dato) => {
        mostrarComponent({
            contenido: 'resultadosMedicos',
            estado: true,
            title: dato.nombres,
            subtitle: '(' + dato.dni + ')',
            item: { documento_paciente: dato.dni }
        }, 'drawerOpen')
    }

    const [array] = useState([
        {
            id: 'imprimir2',
            icon: <SourceIcon fontSize="small" />,
            tootltip: 'Resultados medicos',
            onclick: (dato) => resultadosMedicos(dato)
        },
        // {
        //     id: 'imprimir',
        //     icon: <AdfScannerIcon fontSize="small" />,
        //     tootltip: 'Imprimir',
        //     onclick: () => console.log("eilfr")
        // },

        // {
        //     id: 'chat',
        //     icon: <ChatIcon fontSize="small" />,
        //     tootltip: 'Imprimir2',
        //     onclick: () => console.log("eilfr")
        // },
        // {
        //     id: 'camara',
        //     icon: <CameraAltIcon fontSize="small" />,
        //     tootltip: 'camara',
        //     onclick: () => console.log("eilfr")
        // }
    ])

    const theme = useTheme()

    const getDatos = async (documento) => {
        try {
            const res = await axios.get(`http://200.121.91.211:4001/noMostrarEmergencia/${documento}`)
            setMostrarEmergencia(res.data.lista)
            if (res.data.lista.length > 0) {
                if (res.data.lista[0].is_primera_vez) {
                    mostrarComponent({
                        contenido: 'consultaAmbulatoria',
                        estado: true,
                        title: 'Nueva consulta',
                        subtitle: 'Emergencia',
                        item: {
                            datosUsuario,
                            antecedentes,
                        },

                    }, 'drawerOpen')
                }

            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (datosUsuario !== null) {

            let edad = new Date().getFullYear() - parseInt(datosUsuario.Fec_Nacimien.split('T')[0].split('-')[0]);
            let obj = {
                nombres: (datosUsuario.Des_ApePaterno + ' ' + datosUsuario.Des_ApeMaterno + ' ' + datosUsuario.Des_Nombres).toUpperCase(),
                dni: datosUsuario.Nro_DocIdenti,
                hc: datosUsuario.Nro_Historia,
                nacimiento: datosUsuario.Fec_Nacimien.split('T')[0].split('-')[2] + '-' + datosUsuario.Fec_Nacimien.split('T')[0].split('-')[1] + '-' + datosUsuario.Fec_Nacimien.split('T')[0].split('-')[0],
                edad
            }
            getDatos(datosUsuario.Nro_DocIdenti)
            setDatos(obj)
        }
    }, [datosUsuario])

    useEffect(() => {
        setLista(sidebar)
    }, [sidebar])

    useEffect(() => {
        setButton(botonEmergenia)
    }, [botonEmergenia])

    useEffect(() => { }, [mostraEmergencia])

    const handleClickModal = () => {

        mostrarComponent({
            contenido: 'hospitalizacion',
            estado: true,
            title: datos.nombres,
            subtitle: boton.isEmergencia === 1 ? 'Emergencia' : 'Hospitalización',
            item: { boton }
        }, 'drawerOpen')

    }
    // let nom = []

    useEffect(() => {
        console.log(datos)
    }, [datos])



    const mostrarTeleconsulta = (id) => {
        window.open(id, '_blank');
    }


    return (
        <>
            {datos !== null &&

                <Box style={{ marginTop: "-3px" }} sx={{ p: 2, alignItems: "center", justifyContent: "center", display: display ? '' : 'none' }} >

                    <Card style={{ border: "1px solid #efefef", boxShadow: "7px 7px 7px -7px #333", padding: "10px" }}>
                        <Grid
                            sx={{
                                px: { xs: 0, md: 2 }
                            }}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid container style={{ marginTop: "20px" }} xs={12} lg={12}>
                                <Grid style={{ paddingLeft: "5px", textAlign: "left" }} item xs={3}>
                                    {datosUsuario.Des_Sexo === "M" ? <img style={{ width: "45px" }} src='/static/images/img/pacienteHombre.png' alt='Clinica Vesalio' /> : <img style={{ width: "45px" }} src='/static/images/img/pacienteMujer.png' alt='Clinica Vesalio' />}
                                </Grid>
                                <Grid style={{ padding: "0px", textAlign: "left" }} item xs={9}>
                                    <Typography variant='subtitle2'>
                                        <Tooltip title="Agregar Datos" placement='top-end'>
                                            <Link href='#'>
                                                {datos.nombres}
                                            </Link>
                                        </Tooltip>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <Typography variant='subtitle2'>
                                    <b>DNI:{" "}</b>{datos.dni}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <Typography variant='subtitle2'>
                                    <b>HC:{" "}</b> {datos.hc}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <Typography variant='subtitle2'>
                                    <b>Nacimiento:{" "}</b>{datos.nacimiento}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <Typography variant='subtitle2'>
                                    <b>Edad:{" "}</b>{datos.edad}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>}
            <Box p={3} sx={{ p: 2, alignItems: "center", justifyContent: "center", display: display ? '' : 'none' }}>
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: 3
                    }}
                >
                    {array.map(x => <Tooltip arrow placement="top" title={x.tootltip} key={x.id}>
                        <IconButtonWrapper
                            sx={{
                                boxShadow: `${theme.colors.shadows.primary}`,
                                background: `${theme.colors.primary.main}`,
                                m: .1,
                                color: `${theme.palette.getContrastText(
                                    theme.colors.primary.main
                                )}`,

                                '&:hover': {
                                    background: `${theme.colors.primary.main}`,
                                    color: `${theme.palette.getContrastText(
                                        theme.colors.primary.main
                                    )}`
                                },
                                borderRadius: 50,
                                width: theme.spacing(6),
                                height: theme.spacing(6)
                            }}
                            color="primary"
                            size="small"
                            onClick={() => x.onclick(datos)}
                        >
                            {x.icon}
                        </IconButtonWrapper>
                    </Tooltip>
                    )}
                    {
                        botonExtra !== null && <Tooltip arrow placement="top" title={"Teleconsulta"}>
                            <IconButtonWrapper
                                sx={{
                                    boxShadow: `${theme.colors.shadows.primary}`,
                                    background: `${theme.colors.primary.main}`,
                                    m: .1,
                                    color: `${theme.palette.getContrastText(
                                        theme.colors.primary.main
                                    )}`,

                                    '&:hover': {
                                        background: `${theme.colors.primary.main}`,
                                        color: `${theme.palette.getContrastText(
                                            theme.colors.primary.main
                                        )}`
                                    },
                                    borderRadius: 50,
                                    width: theme.spacing(6),
                                    height: theme.spacing(6)
                                }}
                                color="primary"
                                size="small"
                                onClick={() => mostrarTeleconsulta(botonExtra)}
                            >
                                <VideoCameraFrontIcon fontSize="small" />
                            </IconButtonWrapper>
                        </Tooltip>
                    }

                </Box>
            </Box>
            <Divider />
            {
                boton !== null && <Box
                    sx={{ mx: 2, my: 2 }}
                >
                    <Button sx={{ p: 1, alignItems: "center", justifyContent: "center", display: display ? '' : 'none' }} fullWidth variant='contained' color={boton.isEmergencia === 1 ? 'error' : 'primary'}
                        onClick={() => handleClickModal(boton)}>
                        {boton.isEmergencia === 1 ? 'Emergencia' : 'Hospitalización'}
                    </Button>
                </Box>

            }

            <Accordion
                sx={{ p: 2, alignItems: "center", justifyContent: "center", display: display ? '' : 'none' }}
                defaultExpanded
            >
                <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">{t('Especialidades')}</Typography>

                </AccordionSummaryWrapper>
                <AccordionDetails
                    sx={{
                        p: 0
                    }}
                >
                    <List disablePadding component="div" sx={{ mt: 1 }}>
                        {
                            lista.reduce((arr, item) => {
                                let existe = arr.findIndex(x => x.especialidad_id === item.especialidad_id)
                                if (existe < 0) {
                                    arr.push(item)
                                }
                                return arr
                            }, []).map((value, ix) => {
                                return (
                                    <ListItemWrapper
                                        sx={{
                                            py: 0,
                                            px: 2
                                        }}
                                        key={ix}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 32
                                            }}
                                        >
                                            <Checkbox
                                                edge="start"
                                                tabIndex={-1}
                                                disableRipple
                                                onChange={() => handleFiltroEspecialidad(value.nombre)}

                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={value.nombre}
                                            primaryTypographyProps={{ variant: 'body1' }}
                                        />
                                        {/* <Label color="primary">{value.cantidad}</Label> */}
                                    </ListItemWrapper>
                                );
                            })}
                    </List>
                </AccordionDetails>
            </Accordion>
        </>
    )
}
