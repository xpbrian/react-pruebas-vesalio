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
        { id: 'motivo', label: 'Nuevo numero celular', value: '', type: 'text', tipo: 'text', xs: 12, lg: 12, md: 12, enviar: false, disabled: false },
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
            let rpta = await confirmSweetAlert('Grabar inconformidad', '¿Seguro que desea grabar inconformidad?', 'warning', true)
            if (rpta) {
                await axios.post('http://apis-vesalio.com.pe/changedCelularSistecomp', {
                    celular: text.find(x => x.id === 'motivo').value,
                })
                confirmSweetAlert('Correcto', 'Celular guardado', 'success', false)
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
                        x.type === 'text' && <TextField
                            fullWidth
                            label={x.label}
                            name={x.id}
                            type={'number'}
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
