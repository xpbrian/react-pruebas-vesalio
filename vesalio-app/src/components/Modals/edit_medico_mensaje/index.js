import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';


export default function AnularCita() {
    const { modalOpen } = useLayoutContext()
    const { mostrarComponent } = useLayoutContext()
    const [text, setText] = useState([
        { id: 'mensaje', label: 'Nuevo mensaje', value: '', type: 'text', tipo: 'text', xs: 12, lg: 12, md: 12 },
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
        setText([
            { id: 'mensaje', label: 'Nuevo mensaje', value: modalOpen.item.datos.comentario, type: 'text', tipo: 'text', xs: 12, lg: 12, md: 12 },
        ])
    }, [modalOpen])

    const handleGuardarRegistro = async () => {

        let rpta = await confirmSweetAlert('Grabar comentario', '¿Seguro que desea grabar el comentario?', 'warning', true)
        if (rpta) {
            await axios.post('http://apis-vesalio.com.pe/updateComentario', {
                comentario: text.find(x => x.id === 'mensaje').value,
                idAsignaciom: modalOpen.item.datos.asignacion_id
            })
            confirmSweetAlert('Correcto', 'Comentario grabado correctamente', 'success', false)
            mostrarComponent({
                contenido: '',
                estado: false,
                size: 'xs',
            }, 'modalOpen')
            modalOpen.item.getDatosMedicoSelected()
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
                            type={'text'}
                            value={x.value}
                            multiline
                            rows={4}
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
