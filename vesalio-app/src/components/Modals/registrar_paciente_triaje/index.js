import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';


export default function AnularCita() {
    const { mostrarComponent, modalOpen } = useLayoutContext()

    const [text, setText] = useState([
        { id: 'documentos', label: 'Documento', value: '', tipo: 'text', type: 'number', xs: 12, lg: 12, md: 12 },
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
        setText([
            { id: 'documentos', label: 'Documento', value: modalOpen.item, tipo: 'text', type: 'number', xs: 12, lg: 12, md: 12 },
        ]);
    }, [modalOpen])


    const handleGuardarRegistro = async () => {

        let rpta = await confirmSweetAlert('Agregar observacion', '¿Seguro que desea agregar una observacion?', 'warning', true)

        if (rpta) {

            const enviar = await axios.post(`http://200.121.91.211:4001/insertPacienteTriaje`, { dni: text.find(x => x.id === 'documentos').value })

            confirmSweetAlert('Registrado', 'Paciente Registrado correctamente', 'success', false)
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
                            type={x.type}
                            value={x.value}
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
