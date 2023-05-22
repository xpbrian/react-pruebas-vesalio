import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';


export default function AnularCita() {
    const { modalOpen, mostrarComponent } = useLayoutContext()
    const [text, setText] = useState([
        { id: 'extras', label: 'Link de consulta', value: '', tipo: 'text', xs: 12, lg: 12, md: 12 },
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
    const handleGuardarRegistro = async (obj) => {
        console.log(obj);
        let rpta = await confirmSweetAlert('Agregar Teleconsulta', '¿Seguro que desea agregar un link al turno?', 'warning', true)

        if (rpta) {
            const enviar = await axios.post('http://apis-vesalio.com.pe/addTeleconsulta', {
                text,
                turnoProgramado :  obj.id
            })

            confirmSweetAlert('Agregado', 'Teleconsulta agregada con exito', 'success', false)
            if (enviar.data.rpta === 1) {
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
