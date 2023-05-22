import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Zoom } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import useAuth from 'src/hooks/useAuth';
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';


export default function AnularCita() {
    const { user } = useAuth()
    const tipos = [{ id: '1', nombre: 'Inasistencia paciente' }, { id: '2', nombre: 'Inasistencia médico' }, { id: '3', nombre: 'Reprogramación' }]
    const { enqueueSnackbar } = useSnackbar();
    const { modalOpen, updateCitas, mostrarComponent, updateCitasLista } = useLayoutContext()
    const [textSelectetd, setTextSelected] = useState('')

    const handleOnchanged = async (e) => {
        setTextSelected(e.target.value)

    }
    const handleGuardarRegistro = async (id) => {
        let errors = []
        if (textSelectetd.length < 0) {
            errors.push('No debe existir campos vacios')
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
            let rpta = await confirmSweetAlert('Anular cita', '¿Seguro que desea anular su cita?', 'warning', true)

            if (rpta) {
                const enviar = await axios.post('http://apis-vesalio.com.pe/anularCita', {
                    datos: [
                        { id: 'id', value: id },
                        { id: 'motivo', value: tipos.find(x => x.id === textSelectetd).nombre },
                    ],
                    isPaciente: user.cuenta.tipo_usuario.id,
                    idUser: user._id
                })
                let msj = {
                    msj: enviar.data.msj,
                    icon: enviar.data.rpta === 1 ? 'success' : 'error'
                }
                confirmSweetAlert('Mensaje', msj.msj, msj.icon, false)
                if (enviar.data.rpta === 1) {
                    updateCitas(enviar.data.cita)
                    updateCitasLista()
                    setTimeout(() => {
                        mostrarComponent({
                            contenido: '',
                            estado: false,
                            size: 'xs',
                        }, 'modalOpen')
                    }, 800)

                }
            }
        }
    }
    return (
        <>
            <Grid alignItems="center" container spacing={3} sx={{ p: 3 }}>
                <Grid item xs={12} lg={12} md={12}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>{'Motivo'}</InputLabel>
                        <Select
                            value={textSelectetd}
                            label={'Motivo'}
                            onChange={(e) => handleOnchanged(e)}
                        >
                            {tipos.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} lg={12} md={12} >
                    <Button
                        sx={{
                            mt: 3,
                        }}
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => handleGuardarRegistro(modalOpen.item)}
                    >
                        {'Guardar cambios'}
                    </Button>
                </Grid>

            </Grid>

        </>
    )
}
