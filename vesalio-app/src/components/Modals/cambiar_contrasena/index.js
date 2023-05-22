import { Button, Grid, TextField, Zoom } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import useAuth from 'src/hooks/useAuth';
import confirmSweetAlert from 'src/utils/confirm';


export default function CambiarContrasena() {
    const { enqueueSnackbar } = useSnackbar();
    const { user, login } = useAuth()
    const [text, setText] = useState([
        { id: 'contrasena', label: 'Nueva contraseña', value: '', tipo: 'text', xs: 12, lg: 12, md: 12, enviar: false, disabled: false },
        { id: 'repetir', label: 'Repita contraseña', value: '', tipo: 'text', xs: 12, lg: 12, md: 12, enviar: false, disabled: false },


    ])


    const handleChangedText = async (e) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                value: item.id === e.target.name ? e.target.value : item.value,
            })
            return arr;
        }, []))

    }
    const handleGuardarRegistro = async () => {
        let errors = []
        if (text.filter(x => x.value.length === 0).length > 0) {
            errors.push('No debe existir campos vacios')
        } else {
            if (user.cuenta.password === text.find(x => x.id === 'contrasena').value) {
                errors.push('La contraseña debe ser diferente a la anterior')
            }
            if (text.find(x => x.id === 'contrasena').value.length < 6) {
                errors.push('La contraseña debe contener 6 digitos')
            }
            if (text.find(x => x.id === 'repetir').value !== text.find(x => x.id === 'contrasena').value) {
                errors.push('La contraseña debe coincidir')
            }
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
            let rpta = await confirmSweetAlert('Registrar usuario', '¿Seguro que desea actualizar su contrasena', 'warning', true)

            if (rpta) {
                const enviar = await axios.post('http://apis-vesalio.com.pe/actualizarContrasena', {
                    datos: [
                        { id: 'id', value: user._id },
                        { id: 'contrasena', value: text.find(x => x.id === 'contrasena').value },
                    ]
                })
                let msj = {
                    msj: enviar.data.msj,
                    icon: enviar.data.rpta === 1 ? 'success' : 'error'
                }
                confirmSweetAlert('Mensaje', msj.msj, msj.icon, false)
                if (enviar.data.rpta === 1) {
                    login(user._id)
                }
            }
        }
    }
    return (
        <>
            <Grid alignItems="center" container spacing={3} sx={{ p: 3 }}>
                {text.length > 0 && text.map(x => <Grid item xs={x.xs} lg={x.lg} md={x.md} key={x.id}>
                    {
                        x.tipo === 'text' && <TextField
                            fullWidth
                            label={x.label}
                            name={x.id}
                            type={'password'}
                            value={x.value}
                            disabled={x.disabled}
                            variant="outlined"
                            onChange={(e) => handleChangedText(e)}
                        />
                    }
                </Grid>
                )}
                <Grid item xs={12} lg={12} md={12} >
                    <Button
                        sx={{
                            mt: 3,
                        }}
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={handleGuardarRegistro}
                    >
                        {'Guardar cambios'}
                    </Button>
                </Grid>

            </Grid>

        </>
    )
}
