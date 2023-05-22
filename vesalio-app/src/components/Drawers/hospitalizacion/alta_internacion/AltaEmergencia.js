import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Zoom, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import useLayoutContext from 'src/hooks/useAuthLayout'
import ComponenteHTML from '../../consulta_ambulatoria/ComponenteHTML';
import Diagnostico from '../epicrisis/Diagnostico';
import CloseIcon from '@mui/icons-material/Close';


export default function AltaEmergencia() {
    const { enqueueSnackbar } = useSnackbar();
    const { drawerOpen } = useLayoutContext();
    const [text, setText] = useState([
        { id: 'tratamiento', text: '' },
        { id: 'pronostico', text: '' },
        { id: 'recomendaciones', text: '' },
        { id: 'recomendaciones', text: '' },
        { id: 'pronostico', text: '' },
        { id: 'procedimiento', text: '' },
        { id: 'recomendaciones', text: '' },
    ])
    const [selected, setSelected] = useState(null)
    const [diagnosticos, setDiagnosticos] = useState([])
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
    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const handleGuardar = async () => {
        let obj = {
            personaInternacion: drawerOpen.item.boton.persona_internacion_id,
            ttoAlta:text.find(x=>x.id==='tratamiento').text, 
            pronostico:text.find(x=>x.id==='pronostico').text, 
            recomendaciones:text.find(x=>x.id==='pronostico').text, 
            tipodieta:text.find(x=>x.id==='pronostico').text,
            actividadfisica:text.find(x=>x.id==='pronostico').text, 
            descanso_medico_inicio:text.find(x=>x.id==='pronostico').text, 
            descanso_medico_fin:text.find(x=>x.id==='pronostico').text
        }
        const response = await axios.post(`http://200.121.91.211:4001/insertAlta`, { ...obj })
        if (typeof response.data === 'object') {
            enqueueSnackbar(response.data.error, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
        } else {
            enqueueSnackbar(response.data, {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
            window.location.reload(true);
        }
    }

    return (
        <>

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

                <Grid item lg={12}>
                    <ComponenteHTML text={text.find(x => x.id === 'procedimiento')} handleChangedTextState={handleChangedTextState} title={'Procedimientos Medicos y/o Quirúrgicos efectuados:'} />
                </Grid>
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
                    <ComponenteHTML text={text.find(x => x.id === 'tratamiento')} handleChangedTextState={handleChangedTextState} title={'Tratamiento de Alta:'} />
                </Grid>
                <Grid item lg={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label={'Pronóstico'}
                    />
                </Grid>
                <Grid item lg={12}>
                    <ComponenteHTML text={text.find(x => x.id === 'recomendaciones')} handleChangedTextState={handleChangedTextState} title={'Recomendaciones para el manejo de la enfermedad:'} />
                </Grid>
                <Grid item lg={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label={'Tipo de Dieta'}
                    />
                </Grid>
                <Grid item lg={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label={'Actividad física'}
                    />
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
            </Grid>

            <Button
                fullWidth
                sx={{ mt: 4, mb: 2 }}
                variant="contained"
                onClick={handleGuardar}
            >Alta paciente</Button>
        </>
    )
}
