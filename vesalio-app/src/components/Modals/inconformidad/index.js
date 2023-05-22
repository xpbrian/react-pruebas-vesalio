import { Button, Grid, TextField, Zoom } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';


export default function AnularCita() {
    const { enqueueSnackbar } = useSnackbar();
    const { mostrarComponent, modalOpen } = useLayoutContext()
    const [text, setText] = useState([
        { id: 'motivo', label: 'Indicar motivo', value: 'No encontre horarios disponibles', type: 'text', tipo: 'text', xs: 12, lg: 12, md: 12, enviar: false, disabled: false },
        { id: 'fecha', label: '', value: '', type: 'date', tipo: 'text', xs: 12, lg: 12, md: 12, enviar: false, disabled: false },
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
    useEffect(() => {
        console.log(modalOpen.item);
    }, [modalOpen])
    const handleGuardarRegistro = async () => {
        let errors = []
        if (text.filter(x => x.value.length === 0).length > 0) {
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
            let rpta = await confirmSweetAlert('Grabar observación', '¿Seguro que desea grabar la observación?', 'warning', true)
            if (rpta) {
                await axios.post('http://apis-vesalio.com.pe/inconformidad', {
                    motivo: text.find(x => x.id === 'motivo').value,
                    fecha: text.find(x => x.id === 'fecha').value,
                    doctor: modalOpen.item.datos,
                    usuario: modalOpen.item.cabecera

                })
                confirmSweetAlert('Observación Guardada', 'Agradecemos su observación para considerar a futuro la ampliación de horarios de la especialidad y médico', 'success', false)
                mostrarComponent({
                    contenido: '',
                    estado: false,
                    size: 'xs',
                }, 'modalOpen')
            }
        }
    }
    return (
        <>
            <Grid alignItems="center" container spacing={3} sx={{ p: 3 }}>
                {text.length > 0 && text.map(x => <Grid item xs={x.xs} lg={x.lg} md={x.md} key={x.id}>
                    {
                        x.type === 'date' && <TextField
                            fullWidth
                            label={x.label}
                            name={x.id}
                            type={x.type}
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
                        onClick={() => handleGuardarRegistro()}
                    >
                        {'Guardar cambios'}
                    </Button>
                </Grid>

            </Grid>

        </>
    )
}
