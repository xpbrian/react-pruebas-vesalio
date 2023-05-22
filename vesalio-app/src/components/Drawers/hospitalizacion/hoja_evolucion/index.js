import { Box, Button, Grid, Typography, Zoom } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import useAuth from 'src/hooks/useAuth'
import useLayoutContext from 'src/hooks/useAuthLayout'
import confirmSweetAlert from 'src/utils/confirm'
import ComponenteHTML from '../../consulta_ambulatoria/ComponenteHTML'
import Lista from './Lista'

export default function Index({ title }) {
    const [text, setText] = useState([{ id: 'observacion', text: '' }])
    const [lista, setLista] = useState([]);
    const { drawerOpen } = useLayoutContext();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth()
    const [cabecera, setCabecera] = useState(null)

    const getDatos = async (personaInternacionId) => {
        try {

            const res = await axios.get(`http://200.121.91.211:4001/hojaEvolcuion/${personaInternacionId}`)
            setLista(res.data.datos)
            if (res.data.cabecera.length > 0) {
                setCabecera(res.data.cabecera[0])
            }

        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {


        if (drawerOpen.item.boton !== undefined) {
            getDatos(drawerOpen.item.boton.persona_internacion_id)
        }
    }, [drawerOpen])

    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }

    const handleGuardar = async () => {
        //
        if (user.cuenta.tipo_usuario.id === "09" ) {
            alert("Debe ser doctor para realizar esta acción")
        } else if (user.cuenta.tipo_usuario.id === "03"){
            let errors = []
            if (text.find(x => x.id === 'observacion').text.length === 0) {
                errors.push('Debe ingresar una nota')
            } 
            if (errors.length > 0) {
                errors.map(x => enqueueSnackbar(x, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 1000
                }))
            } else {
                const rpta = await confirmSweetAlert(`${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`, `Esta seguro que desea guardar la hoja de evolución de ${drawerOpen.title}`, 'warning', true)
                if (rpta) {
                    let obj = {
                        personaInternacion: drawerOpen.item.boton.persona_internacion_id,
                        informacion: text.find(x => x.id === 'observacion').text,
                        documento: user.datos.numero_documento,
                    }
                    const response = await axios.post(`http://200.121.91.211:4001/insertHojaEvolucion`, { ...obj })
                    if (typeof response.data === 'object') {
                        enqueueSnackbar(response.data.error, {
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            },
                            TransitionComponent: Zoom,
                            autoHideDuration: 1000
                        })
                    } else {
                        enqueueSnackbar(response.data, {
                            variant: 'success',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            },
                            TransitionComponent: Zoom,
                            autoHideDuration: 1000
                        })
                        setText(x => x.reduce((arr, item) => {
                            arr.push({ ...item, text: '' })
                            return arr
                        }, []))
                        getDatos(drawerOpen.item.boton.persona_internacion_id)
                    }
                }
            }
        } else {
            alert("Debe ser doctor para realizar esta acción")
        }
        //

    }
    return (
        <>
            <Typography variant='h4'>{title}</Typography>

            <Grid
                sx={{
                    px: { xs: 0, md: 2 },
                    mt: 2,
                    mb: 2
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item lg={4} >
                    <Typography variant='h5'>
                        Datos a Registrar
                    </Typography>
                    <Box sx={{ p: 2 }}>
                        <div style={{ textAlign: "left" }}>1. Fecha y Hora</div>
                        <div style={{ textAlign: "left" }}>2. Apreciación Subjetiva</div>
                        <div style={{ textAlign: "left" }}>3. Apreciación Objetiva</div>
                        <div style={{ textAlign: "left" }}>4. Verificación del tratamiento y dieta</div>
                        <div style={{ textAlign: "left" }}>5. Interpretación de exámenes y comentario</div>
                        <div style={{ textAlign: "left" }}>6. Terapéutica y Plan de Trabajo</div>
                        <div style={{ textAlign: "left" }}>7. Firma, sello y colegiatura del médico que brinda la atención</div>
                    </Box>
                </Grid>


                <Grid item lg={8}>
                    <ComponenteHTML text={text.find(x => x.id === 'observacion')} handleChangedTextState={handleChangedTextState} title={'Observación'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleGuardar}
                    >Guardar</Button>
                </Grid>
            </Grid>
            {
                lista.length > 0 && <Lista lista={lista} cabecera={cabecera} tipo={"HOJA DE EVOLUCION"} />
            }

        </>
    )
}
