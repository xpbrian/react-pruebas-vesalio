import { Avatar, Box, Button, FormControl, FormControlLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Radio, RadioGroup, TextField, Typography, Zoom } from '@mui/material'
import React, { useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import ComponenteHTML from '../../consulta_ambulatoria/ComponenteHTML'
import CloseIcon from '@mui/icons-material/Close';
import { Markup } from 'interweave';
import Diagnostico from './Diagnostico';
import { useSnackbar } from 'notistack';
import DiagnosticoText from './DiagnosticoText';
import confirmSweetAlert from 'src/utils/confirm';
import useAuth from 'src/hooks/useAuth';


export default function index({ title }) {
    const vezConsulta = [
        { value: '1', label: 'Si', fila: 2 },

        { value: '2', label: 'No', fila: 2 },
        { value: '16', label: 'Curado', fila: 3 },
        { value: '18', label: 'Mejorado', fila: 3 },
        { value: '17', label: 'Fallecido', fila: 3 },
        { value: '19', label: 'Por Indicación Médica', fila: 4 },
        { value: '20', label: 'Alta Voluntaria', fila: 4 },
        { value: '21', label: 'Fuga', fila: 4 },
        { value: '22', label: 'Traslado a otra IPRESS', fila: 4 }
    ]
    const { user } = useAuth()
    const { enqueueSnackbar } = useSnackbar();
    const { mostrarComponent, drawerOpen } = useLayoutContext()
    const [estudios, setEstudios] = useState([])
    const [text, setText] = useState([
        { id: 'enfermedadActual', text: '' },
        { id: 'examenFisico', text: '' },
        { id: 'imagenes', text: '' },
        { id: 'otros', text: '' },
        { id: 'evolucion', text: '' },
        { id: 'tratamiento', text: '' },
        { id: 'complicaciones', text: '' },
        { id: 'procedimientos', text: '' },

    ])
    const [selected, setSelected] = useState(null)
    const [selectedFinal, setSelectedFinal] = useState(null)
    const [selectedInter, setSelectedInter] = useState(null)
    const [selectedBasica, setSelectedBasica] = useState(null)
    const [diagnosticos, setDiagnosticos] = useState([])
    const [mostrar, setMostrar] = useState([{ id: 'altaIPRESS', value: '', active: false }])

    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const addEstudios = (item) => {
        setEstudios(x => [...x, item])
    }
    const mostrarModal = () => {
        mostrarComponent({
            contenido: 'estudiosExternos',
            estado: true,
            size: 'md',
            item: {
                datosUsuario: null, addEstudios: (item) => addEstudios(item)
            }
        }, 'modalOpen')
    }
    const addDiagnostico = () => {
        if (selected !== null) {
            if (diagnosticos.find(x => x.id === selected.id) === undefined) {
                setDiagnosticos([...diagnosticos, { ...selected }])
            } else {
                enqueueSnackbar('Ya agrego un diagnosticos igual.', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 1000
                })
            }

        } else {
            enqueueSnackbar('Debe seleccionar un diagnóstico', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1000
            })
        }
    }
    const handleTipoAlta = (xItem) => {
        setMostrar(x => x.reduce((arr, item) => {
            if (xItem === '22') {
                arr.push({ ...item, value: item.id === 'altaIPRESS' ? xItem : item.value, active: item.id === 'altaIPRESS' ? true : item.active })
            } else {
                arr.push({ ...item, value: item.id === 'altaIPRESS' ? '' : item.value, active: item.id === 'altaIPRESS' ? false : item.active })

            }
            return arr
        }, []))

    }
    // 
    const guardarClick = async () => {
        const rpta = await confirmSweetAlert(`${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`, `Esta seguro que desea guardar la epicrisis de ${drawerOpen.title}`, 'warning', true)
        if (rpta) {
            console.log("rfklr");
        }
    }
    return (
        <>
            <Typography variant='h4'>{title}</Typography>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 },
                    mt: 2
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >

                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'enfermedadActual')} handleChangedTextState={handleChangedTextState} title={'Resumen de la enfermedad actual:'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'examenFisico')} handleChangedTextState={handleChangedTextState} title={'Examen físico al ingreso:'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Examenes Auxiliares</b></Typography>
                    <Grid
                        sx={{
                            px: { xs: 0, md: 2 },
                            mt: 2
                        }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}
                    >
                        <Grid item lg={2}>
                            <Typography variant="h5" sx={{ mb: 1 }}><b>Estudios</b></Typography>
                        </Grid>
                        <Grid item lg={10} sx={{ mt: -.5 }}>
                            <Button variant='contained' size='small' onClick={() => mostrarModal()}>Agregar estudio</Button>
                        </Grid>
                        <Grid item lg={12}>

                            <List disablePadding component="div" sx={{ ml: 2 }}>

                                {estudios.map((value, ix) => {
                                    return (
                                        <ListItem
                                            sx={{
                                                py: 0,
                                                ml: -2
                                            }}
                                            key={ix}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete" size='small'>
                                                    <CloseIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>{ix + 1}</Avatar>
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary={value.label}
                                                primaryTypographyProps={{ variant: 'h5' }}
                                                secondary={
                                                    <>
                                                        <Markup content={value.informacion} />
                                                    </>
                                                }
                                            />

                                        </ListItem>
                                    );
                                })}
                            </List>

                        </Grid>
                        <Grid item lg={12}>
                            <ComponenteHTML text={text.find(x => x.id === 'otros')} handleChangedTextState={handleChangedTextState} title={'Otros:'} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'evolucion')} handleChangedTextState={handleChangedTextState} title={'Evolución:'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'tratamiento')} handleChangedTextState={handleChangedTextState} title={'Tratamiento:'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Procedimientos Terapéuticos y/o diagnósticos realizados</b></Typography>
                    <Grid
                        sx={{
                            px: { xs: 0, md: 2 },
                            mt: 2
                        }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}
                    >
                        <Diagnostico setSelected={setSelected} selected={selected} addDiagnostico={addDiagnostico} />

                        <Grid item lg={12}>

                            <List disablePadding component="div" sx={{ ml: 2 }}>

                                {diagnosticos.map((value, ix) => {
                                    return (
                                        <ListItem
                                            sx={{
                                                py: 0,
                                                ml: -2
                                            }}
                                            key={ix}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete" size='small'>
                                                    <CloseIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>{ix + 1}</Avatar>
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary={value.label}
                                                primaryTypographyProps={{ variant: 'h5' }}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>

                        </Grid>
                        <Grid item lg={12}>
                            <ComponenteHTML text={text.find(x => x.id === 'procedimientos')} handleChangedTextState={handleChangedTextState} title={'Procedimientos:'} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'complicaciones')} handleChangedTextState={handleChangedTextState} title={'Complicaciones Medicas y/o quirurgicas:'} />
                </Grid>
                <Grid item lg={2}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Tipo de Alta</b></Typography>
                </Grid>
                <Grid item lg={10}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FormControl>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                sx={{ mb: 1 }}
                            // value={vezConsulta.find(x => x.active).value}
                            // onChange={(e) => handleClickRadio(e)}
                            >
                                {
                                    vezConsulta.filter(x => x.fila === 4).map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio size="small" onChange={(e) => handleTipoAlta(e.target.value)} />} label={item.label} />)
                                }

                            </RadioGroup>
                        </FormControl>
                    </Box>
                    {
                        mostrar.find(x => x.id === 'altaIPRESS').active && <TextField
                            fullWidth
                            variant="outlined"
                            label={'IPRESS de destino'}
                        />
                    }

                </Grid>
                <Grid item lg={4}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Condición de egreso</b></Typography>
                </Grid>
                <Grid item lg={8}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FormControl>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                sx={{ mb: 1 }}
                            // value={vezConsulta.find(x => x.active).value}
                            // onChange={(e) => handleClickRadio(e)}
                            >
                                {
                                    vezConsulta.filter(x => x.fila === 3).map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio size="small" onChange={(e) => handleTipoAlta(e.target.value)} />} label={item.label} />)
                                }

                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Diagnostico de Egreso</b></Typography>
                    <Grid
                        sx={{
                            px: { xs: 0, md: 2 },
                            mt: 2
                        }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}
                    >
                        <Diagnostico setSelected={setSelected} selected={selected} addDiagnostico={addDiagnostico} />

                        <Grid item lg={12}>

                            <List disablePadding component="div" sx={{ ml: 2 }}>

                                {diagnosticos.map((value, ix) => {
                                    return (
                                        <ListItem
                                            sx={{
                                                py: 0,
                                                ml: -2
                                            }}
                                            key={ix}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete" size='small'>
                                                    <CloseIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>{ix + 1}</Avatar>
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary={value.label}
                                                primaryTypographyProps={{ variant: 'h5' }}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Descanso médico</b></Typography>
                    <Grid
                        sx={{
                            px: { xs: 0, md: 2 },
                            mt: 2
                        }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}
                    >

                        <Grid item lg={6}>
                            <Typography variant='h5'>Desde</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type={"date"}
                                label={''}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <Typography variant='h5'>Hasta</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type={"date"}
                                label={''}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Información sobre la mortalidad</b></Typography>
                </Grid>
                <Grid item lg={8}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                sx={{ mb: 1 }}
                            >
                                {
                                    vezConsulta.filter(x => x.fila === 2).map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio size="small" onChange={(e) => handleTipoAlta(e.target.value)} />} label={item.label} />)
                                }

                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b><i>Indicar causas de muerte</i></b></Typography>
                </Grid>
                <Grid item lg={2} sx={{ mt: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Causa Final</b></Typography>
                </Grid>
                <DiagnosticoText selected={selectedFinal} setSelected={setSelectedFinal} />
                <Grid item lg={2} sx={{ mt: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Causa Intermedia</b></Typography>
                </Grid>
                <DiagnosticoText selected={selectedInter} setSelected={setSelectedInter} />
                <Grid item lg={2} sx={{ mt: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Causa Basica</b></Typography>
                </Grid>
                <DiagnosticoText selected={selectedBasica} setSelected={setSelectedBasica} />
            </Grid>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 },
                    mt: 2
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item lg={4}>
                    <Button variant='contained' fullWidth onClick={() => guardarClick()}>Guardar</Button>
                </Grid>
            </Grid>
        </>
    )
}
