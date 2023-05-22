import { Button, Divider, Grid, Zoom, Typography, List, ListItemText, ListItemButton, Box } from '@mui/material'
import axios from 'axios'
import { Markup } from 'interweave'
import { useSnackbar } from 'notistack'
import React, { useEffect, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import useAuth from 'src/hooks/useAuth'
import useLayoutContext from 'src/hooks/useAuthLayout'
import ComponenteHTML from '../../consulta_ambulatoria/ComponenteHTML'
import { ComponentToPrint } from './Print';

export default function Index({ title }) {
    const array = ['SINTOMAS PRINCIPALES', 'CRONOLOGIA', 'EXAMEN CLINICO', 'DIAGNOSTICO INICIAL', 'CODIGO CIE 10', 'PLAN TRABAJO', 'SELLO Y FIRMA DEL MÉDICO']
    const [text, setText] = useState([{ id: 'observacion', text: '' }])
    const [lista, setLista] = useState([])
    const [cabecera, setCabecera] = useState(null)
    const { drawerOpen } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth()
    const componentRef = useRef();

    const getDatos = async (personaInternacionId) => {
        try {
            const res = await axios.get(`http://200.121.91.211:4001/hojaNotasIngreso/${personaInternacionId}`)
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
                TransitionComponent: Zoom
            }))
        } else {
            let obj = {
                personaInternacion: drawerOpen.item.boton.persona_internacion_id,
                informacion: text.find(x => x.id === 'observacion').text,
                documento: user.datos.numero_documento,
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertHojaNotaIngreso`, { ...obj })
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
                setText(x => x.reduce((arr, item) => {
                    arr.push({ ...item, text: '' })
                    return arr
                }, []))
                getDatos(drawerOpen.item.boton.persona_internacion_id)
            }
        }
    }
    return (
        <>
            <Typography variant='h4'>{title}</Typography>
            <Divider sx={{

                mt: 1
            }} />
            {
                lista.length === 0 && <Grid
                    sx={{
                        px: { xs: 0, md: 2 },
                        mt: 2
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                >
                    <Grid item lg={12} sx={{ mx: 2 }}>
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
            }
            {
                lista.length > 0 &&
                <Grid
                    sx={{
                        px: { xs: 0, md: 2 },
                        mt: 2,
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                >
                    <Grid item lg={3} sx={{ border: '2px solid black' }}>
                        <Typography variant='h4'><b>Orden</b></Typography>

                        <List component="nav" aria-label="main mailbox folders">
                            {array.map((x, ix) => <ListItemButton key={ix}>
                                <ListItemText primary={x} />
                            </ListItemButton>)}
                        </List>
                    </Grid>
                    <Grid item lg={9} sx={{ border: '2px solid black' }}>
                        <Markup content={lista[0].descripcion} />
                    </Grid>
                    <Grid item lg={2} >
                        {
                            cabecera !== null && <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    mb: 2
                                }}
                            >
                                <ReactToPrint
                                    // onAfterPrint={() => resetCarrito()}
                                    trigger={() => (
                                        <Button color="error" variant="contained">
                                            Imprimir PDF
                                        </Button>
                                    )}
                                    content={() => componentRef.current}
                                />
                                <div style={{ display: "none" }}>
                                    <ComponentToPrint
                                        ref={componentRef}
                                        cabecera={cabecera}
                                        lista={lista[0]}
                                    />
                                </div>
                            </Box>
                        }

                    </Grid>
                </Grid>
            }


        </>
    )
}
