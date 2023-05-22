import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';


export default function AnularCita() {
    const { modalOpen, updateCitas, mostrarComponent, updateCitasLista } = useLayoutContext()
    const [text, setText] = useState([
        { id: 'motivo', label: 'Indicar motivo', value: '', tipo: 'text', xs: 12, lg: 12, md: 12, enviar: false, disabled: false },
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
    const handleGuardarRegistro = async (id) => {

        let rpta = await confirmSweetAlert('Agregar observacion', '¿Seguro que desea agregar una observacion?', 'warning', true)

        if (rpta) {
            const enviar = await axios.post('http://apis-vesalio.com.pe/addOservacion', {
                datos: [
                    { id: 'id', value: id },
                    { id: 'motivo', value: text.find(x => x.id === 'motivo').value },
                ]
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
    return (
        <>
            <Grid alignItems="center" container spacing={3} sx={{ p: 3 }}>
                {text.length > 0 && text.map(x => <Grid item xs={x.xs} lg={x.lg} md={x.md} key={x.id}>
                    {
                        x.tipo === 'text' && <TextField
                            fullWidth
                            label={x.label}
                            name={x.id}
                            type={'text'}
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
                        onClick={() => handleGuardarRegistro(modalOpen.item)}
                    >
                        {'Guardar cambios'}
                    </Button>
                </Grid>

            </Grid>

        </>
    )
}
