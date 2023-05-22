import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, CardHeader, Divider, Grid, IconButton, List, ListItemButton, ListItemText, styled, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import Label from "src/components/Label";
import useLayoutContext from "src/hooks/useAuthLayout";
import ListaOrigenes from '../ListaOrigenes'
import { useNavigate } from "react-router";
import confirmSweetAlert from "src/utils/confirm";

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
// const MyComponent = forwardRef(function MyComponent(props, ref) {
//     //  Spread the props to the underlying DOM element.
//     return (
//         <div {...props} ref={ref} style={{ marginRight: "3px", marginLeft: "3px" }} >
//             <Label style={{ padding: "15px" }} color={props.color} >{props.valor}</Label>
//         </div>
//     );
// });
// const MyComponent2 = forwardRef(function MyComponent(props, ref) {
//     //  Spread the props to the underlying DOM element.
//     return (
//         <div {...props} ref={ref} style={{ marginRight: "3px", marginLeft: "3px" }} >
//             <Label style={{ padding: "15px" }} color={props.color} >{props.valor}</Label>
//         </div>
//     );
// });

export default function index({ datos, ocupados }) {
    const { mostrarComponent } = useLayoutContext()
    const theme = useTheme()
    const navigate = useNavigate();
    const [mostrar, setMostrar] = useState([])
    const [camaSelected, setCamaSelected] = useState(null)
    const [camas, setCamas] = useState([]);


    useEffect(() => {
        const getDatos = async () => {
            try {

                const response = await axios.get(`http://200.121.91.211:4001/habitaciones`)
                let arrayC = response.data.datos.filter(x => response.data.ocupados.find(y => y.id === x.camaId) === undefined)
                setCamas(arrayC.reduce((arr, item) => {
                    arr.push({ id: item.camaId, title: item.nombreSala + '/' + item.nombreHabitacion + '/' + item.nombreCama })
                    return arr
                }, []))
            } catch (e) {
                console.log(e);
            }
        }
        getDatos()

    }, [])


    const handleMostrar = (cod) => {
        let exist = mostrar.find(x => x === cod)
        if (exist === undefined) {
            setMostrar(x => [...x, cod])
        } else {
            setMostrar(x => x.filter(y => y !== cod))
        }
    }

    const handleListCama = async (cama) => {
        let existe = ocupados.find(x => parseInt(x.id) === parseInt(cama.camaId))
        if (existe !== undefined) {

            const res = await axios.get(`http://200.121.91.211:4001/camaPaciente/${existe.persona_internacion_id}`)
            const datosUsuario = res.data.datos[0]
            let edad = new Date().getFullYear() - parseInt(datosUsuario.Fec_Nacimien.split('T')[0].split('-')[0]);
            let obj = {
                nombres: (datosUsuario.Des_ApePaterno + ' ' + datosUsuario.Des_ApeMaterno + ' ' + datosUsuario.Des_Nombres).toUpperCase(),
                dni: datosUsuario.Nro_DocIdenti,
                hc: datosUsuario.Nro_Historia,
                nacimiento: datosUsuario.Fec_Nacimien.split('T')[0].split('-')[2] + '-' + datosUsuario.Fec_Nacimien.split('T')[0].split('-')[1] + '-' + datosUsuario.Fec_Nacimien.split('T')[0].split('-')[0],
                edad
            }
            let fecha = res.data.listaOrigenes.find(x => x.tipo_evento_id === 2).fechahora.split('T')
            let fechaFinal = fecha[0].split('-')

            setCamaSelected({
                title: cama.nombreSala + '/ ' + cama.nombreHabitacion + '/ ' + cama.nombreCama,
                datosUsuario: obj,
                lista: res.data.listaOrigenes,
                fechaIngreso: `${fechaFinal[0]}-${fechaFinal[1].length === 1 ? '0' + fechaFinal[1] : fechaFinal[1]}-${fechaFinal[2].length === 1 ? '0' + fechaFinal[2] : fechaFinal[2]}T${fecha[1]}`,
                turno: res.data.turnosProgramado
            })
        } else {
            mostrarComponent({
                contenido: 'agregarCama',
                estado: true,
                title: cama.nombreSala + '/ ' + cama.nombreHabitacion + '/ ' + cama.nombreCama,
                subtitle: '',
                item: { cama }
            }, 'drawerOpen')
        }
    }

    const handleConsultar = () => {
        console.log()
        navigate('/clinica/historiaEnfermeria/' + camaSelected.datosUsuario.dni)
    }


    const handleMoverCama = async (value, newValue) => {
     
        if (newValue !== null) {
            const rpta = await confirmSweetAlert("Mover Cama", "¿Está seguro que desea mover cama?", "warning", true)
            if (rpta) {
                console.log(newValue)
                await axios.post(`http://200.121.91.211:4001/moverCama`,{
                     camaSelected : newValue.id,
                     internacionId : camaSelected.lista[0].persona_internacion_id
                })
            }
        }
    }

    return (
        <>
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
                <Grid item xs={12} lg={5}>
                    <Grid
                        sx={{
                            px: { xs: 0, md: 2 }
                        }}
                        container
                        direction="row"
                        justifyContent="center"
                        justifyItems="center"
                        alignContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        {
                            datos.reduce((arr, item) => {
                                let existe = arr.findIndex(x => x.codigoSala === item.codigoSala)
                                if (existe < 0) {
                                    arr.push(item)
                                }
                                return arr
                            }, []).sort(function (a, b) {
                                if (a.nombreSala > b.nombreSala) {
                                    return 1;
                                }
                                if (a.nombreSala < b.nombreSala) {
                                    return -1;
                                }
                                return 0;
                            }).map((x, i) => <Grid key={i} item xs={12} lg={12}>
                                <Card sx={{ py: 0 }} style={{ height: "10px !important", border: "1px solid transparent" }}>
                                    <CardHeader

                                        sx={{
                                            p: 1
                                        }}
                                        disableTypography
                                        action={
                                            <Tooltip placement="right-start" title="Ver Detalles">
                                                <IconButton
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() => handleMostrar(x.codigoSala)}>
                                                    <CloseFullscreenIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        title={
                                            <>

                                                <Typography
                                                    sx={{
                                                        fontSize: `${theme.typography.pxToRem(17)}`
                                                    }}
                                                    gutterBottom
                                                    variant="h3"
                                                    textAlign="center"
                                                    style={{ marginTop: "10px" }}
                                                >
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                        <Box>
                                                            {x.nombreSala}
                                                        </Box>

                                                        {/* <Box style={{ display: "flex" }}>
                                                            <Tooltip placement="left-start" title="Camas Disponibles">
                                                                <MyComponent valor={2} color={"success"}
                                                                />
                                                            </Tooltip>
                                                            <Tooltip placement="bottom-end" title="Camas Ocupadas">
                                                                <MyComponent2 valor={5} color={"error"}
                                                                />
                                                            </Tooltip>
                                                        </Box> */}

                                                    </div>
                                                </Typography>
                                            </>
                                        }
                                    />
                                    {/* <Divider /> */}


                                    {
                                        datos.filter(habitaciones => habitaciones.codigoSala === x.codigoSala).reduce((arr, item) => {
                                            let existe = arr.findIndex(x => x.codigoHabitacion === item.codigoHabitacion)
                                            if (existe < 0) {
                                                arr.push(item)
                                            }
                                            return arr
                                        }, []).map((y, ix) => <Accordion
                                            sx={{
                                                p: 1,
                                                display: mostrar.find(r => r === x.codigoSala) === undefined ? 'none' : ''
                                            }}
                                            key={ix}
                                        >
                                            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
                                                <Typography variant="h5">{y.nombreHabitacion}</Typography>
                                            </AccordionSummaryWrapper>
                                            <AccordionDetails
                                                sx={{
                                                    p: 0
                                                }}
                                            >
                                                <List disablePadding component="div" sx={{ mt: 1 }}>

                                                    {datos.filter(cama => cama.codigoHabitacion === y.codigoHabitacion && cama.codigoSala === x.codigoSala).map((value, ixx) => {
                                                        return (
                                                            <ListItemWrapper
                                                                sx={{
                                                                    py: 1,
                                                                    px: 2
                                                                }}
                                                                key={ixx}
                                                                onClick={() => handleListCama(value)}
                                                            >
                                                                <ListItemText
                                                                    primary={value.nombreCama}
                                                                    primaryTypographyProps={{ variant: 'h6' }}
                                                                    secondary={ocupados.find(x => parseInt(x.id) === parseInt(value.camaId)) !== undefined ?
                                                                        <b>{ocupados.find(x => parseInt(x.id) === parseInt(value.camaId)).titulo}</b> : <b>Libre</b>}
                                                                />

                                                                {
                                                                    ocupados.find(x => parseInt(x.id) === parseInt(value.camaId)) !== undefined ?
                                                                        <Label color="error">Ocupado</Label> : <Label color="success">Disponible</Label>
                                                                }
                                                            </ListItemWrapper>
                                                        );
                                                    })}
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>)
                                    }


                                </Card>
                            </Grid>)
                        }

                    </Grid>

                </Grid>
                <Grid item xs={12} lg={7}>
                    {
                        camaSelected !== null ? <Card sx={{ py: 2 }} >
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
                                            {camaSelected.title}
                                        </Typography>
                                    </>
                                }
                            />
                            <Divider />
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
                                <Grid item xs={6} lg={6}>
                                    <Card sx={{ py: 2 }} >
                                        <Box sx={{ p: 2, alignItems: "center", justifyContent: "center" }} >
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
                                                <Grid item xs={12} lg={12}>
                                                    <Typography variant='subtitle2'>
                                                        {camaSelected.datosUsuario.nombres}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} lg={12}>
                                                    <Typography variant='subtitle2'>
                                                        <b>DNI:</b>{' '}{camaSelected.datosUsuario.dni}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} lg={12}>
                                                    <Typography variant='subtitle2'>
                                                        <b>HC:</b> {' '}{camaSelected.datosUsuario.hc}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} lg={8}>
                                                    <Typography variant='subtitle2'>
                                                        <b>Nacimiento:</b>{' '}{camaSelected.datosUsuario.nacimiento}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} lg={4}>
                                                    <Typography variant='subtitle2'>
                                                        <b>Edad:</b>{' '}{camaSelected.datosUsuario.edad}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box sx={{ p: 2, alignItems: "center", justifyContent: "center" }} >
                                            {/* <Button variant="contained">Mover </Button> */}
                                            <Box style={{ marginBottom: "10px" }}>
                                                <Autocomplete
                                                    fullWidth
                                                    onChange={handleMoverCama}
                                                    options={camas}
                                                    getOptionLabel={(option) => option.title}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            variant="outlined"
                                                            label={('Mover')}
                                                            placeholder={('Seleccione cama')}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                            <Button variant="contained" fullWidth sx={{ mx: 0 }} onClick={() => handleConsultar()}>Historia</Button>
                                            {/* <Button variant="contained">Alta médica</Button> */}
                                        </Box>

                                    </Card>
                                </Grid>
                                <Grid item xs={6} lg={6}>
                                    <Card sx={{ py: 2 }} >
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
                                            <Grid item xs={6} lg={5}>
                                                <Typography variant="p" component="p" gutterBottom>
                                                    <b>Fecha de Ingreso</b>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} lg={7}>
                                                <TextField
                                                    fullWidth
                                                    value={camaSelected.fechaIngreso}
                                                    disabled
                                                    type={'datetime-local'}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={12}>
                                                <ListaOrigenes datos={camaSelected.lista} />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>






                        </Card> : ''
                    }

                </Grid>




            </Grid>

        </>
    )
}
