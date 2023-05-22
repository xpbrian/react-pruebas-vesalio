import { useEffect, useState } from 'react'
import { Box, Button, Grid, TextField, Divider, Zoom } from '@mui/material';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import useLayoutContext from 'src/hooks/useAuthLayout';
import Paciente from 'src/components/Drawers/cita_admision_/Paciente';

export default function SearchInsumos() {

    const { enqueueSnackbar } = useSnackbar();

    const [hora, setHora] = useState('')
    const [fecha, setFecha] = useState('')
    const { user } = useAuth()
    const { modalOpen, mostrarComponent } = useLayoutContext()
    const [selected, setSelected] = useState({ paciente: { item: null, selected: false } })

    useEffect(() => {
        console.log(modalOpen.item);
    }, [modalOpen])
    const handleSleccionarPaciente = async (id, item) => {
        setSelected(x => {
            return {
                ...x,
                [id]: {
                    item,
                    selected: true
                }
            }
        })
    }
    const handleClickGuardar = async () => {
        let errors = []
        if (fecha.length === 0) {
            errors.push('Debe ingresar una Fecha')
        }
        if (hora.length === 0) {
            errors.push('Debe ingresar una Hora')
        }
        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            }))
        } else {
            let obj = {
                documento: user.datos.numero_documento,
                persona: modalOpen.item.datosUsuario.Nro_DocIdenti
            }

            const response = await axios.post(``, { ...obj })
            if (typeof response.data === 'object') {
                enqueueSnackbar(response.data.error, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,

                })
            } else {
                modalOpen.item.setDatosAntecedentes()
                enqueueSnackbar(response.data, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
                mostrarComponent({
                    contenido: '',
                    estado: false,
                    size: 'xs'
                }, 'modalOpen')

            }
        }
    }

    return (
        <>
            <Box
                sx={{
                    mt: 1,
                    p: 2,
                    alignItems: 'center'
                }}
            >
                <Grid alignItems="center" container spacing={2}>
                    <Grid item xs={12} lg={12} md={12}>
                        <TextField
                            fullWidth
                            name={'fecha'}
                            type={'date'}
                            value={fecha}
                            variant="outlined"
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        <TextField
                            fullWidth
                            name={'hora'}
                            type={'time'}
                            value={hora}
                            variant="outlined"
                            onChange={(e) => setHora(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
            {!selected.paciente.selected && <Paciente handleSleccionarPaciente={handleSleccionarPaciente} />}

            <Divider />
            <Button
                variant="contained"
                onClick={handleClickGuardar}
                sx={{ float: 'right', m: 2 }}
                startIcon={<SaveIcon />}>
                Guardar
            </Button>
        </>

    )
}
