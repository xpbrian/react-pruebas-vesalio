import { Button, Divider, Grid, Zoom } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import useAuth from 'src/hooks/useAuth'
import useLayoutContext from 'src/hooks/useAuthLayout'
import ComponenteHTML from '../../../consulta_ambulatoria/ComponenteHTML'
import Lista from '../../hoja_evolucion/Lista'

export default function Index() {
    const [text, setText] = useState([{ id: 'observacion', text: '' }])
    const [lista, setLista] = useState([])
    const [cabecera, setCabecera] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const { drawerOpen } = useLayoutContext()
    const { user } = useAuth()
    const limpiarDatos = () => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: '' })
            return arr
        }, []))
    }
    const getDatos = async () => {
        try {

            const res = await axios.get(`http://200.121.91.211:4001/notasEnfermeria/${drawerOpen.item.boton.persona_internacion_id}`)
            if (res.data.cabecera.length > 0) {
                setCabecera(res.data.cabecera[0])
            }
            setLista(res.data.datos)
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {


        if (drawerOpen.item.boton !== undefined) {
            getDatos()
        }
    }, [drawerOpen])

    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const handleClickGuardar = async () => {
        let errors = []

        if (text.find(x => x.id === 'observacion').text.length === 0) {
            errors.push('Debe ingresar un estudio')
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
                personaInternacion: drawerOpen.item.boton.persona_internacion_id,
                informacion: text.find(x => x.id === 'observacion').text,
                documento: user.datos.numero_documento,
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertNotasEnfermeria`, { ...obj })
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
                getDatos()
                limpiarDatos()
            }
        }

    }

    return (
        <>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 }
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >

                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'observacion')} handleChangedTextState={handleChangedTextState} title={'Nota'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleClickGuardar}
                    >Guardar</Button>
                </Grid>
            </Grid>
            <Divider />
            {
                lista.length > 0 && <Lista lista={lista} cabecera={cabecera} tipo={'HOJA DE ENFERMERIA'} />
            }

        </>
    )
}
