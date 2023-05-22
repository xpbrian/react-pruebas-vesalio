import { Button, Divider, Grid, TextField, Typography, Zoom } from "@mui/material";
import axios from "axios";
import { Markup } from 'interweave';
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ComponenteHTML from "src/components/Drawers/consulta_ambulatoria/ComponenteHTML";
import useAuth from "src/hooks/useAuth";
import useLayoutContext from "src/hooks/useAuthLayout";
import Lista from '../alergias/Lista'

export default function AlergiasCard({ kine, otros, id }) {
    const [text, setText] = useState([{ id: 'nota', text: '' }])
    const { drawerOpen } = useLayoutContext()
    const [mostrar, setMostrar] = useState(false)
    const [lista, setLista] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth()

    const getDatos = async () => {
        try {
            const res = await axios.get(`http://200.121.91.211:4001/indicacionesEnfermeriaView/${drawerOpen.item.boton.persona_internacion_id}`)
            console.log(res.data.view);
            setLista(res.data.view.filter(x => x.codigo === id));
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getDatos()
    }, [])

    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const handleGuardar = async () => {
        let errors = []
        if (text.find(x => x.id === 'nota').text.length === 0) {
            errors.push('Debe ingresar una Nota')
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
                nota: text.find(x => x.id === 'nota').text,
                documento: user.datos.numero_documento,
                tipo: id
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertIndicacionesEnfermeria`, { ...obj })
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
                getDatos()
            }
        }
    }
    return (
        <Grid
            sx={{
                px: { xs: 0, md: 2 }
            }}
            container
            direction="row"
            alignItems="stretch"
            spacing={1}
        >
            <Grid item lg={6} sx={{ mt: .4 }}>
                <TextField variant="outlined" label={"Oxigenoterapia"} disabled fullWidth value={kine} />
            </Grid>

            <Grid item lg={12} sx={{ mt: .4 }}>
                <Typography variant="h4">Movilidad y otras observaciones</Typography>
                <Markup content={otros} />
            </Grid>


            <Grid item lg={12}>
                <Divider />
            </Grid>
            <Grid item lg={12}>
                <Button variant="outlined"
                    sx={{ float: "right" }}
                    onClick={() => setMostrar(x => !x)}>Mostrar / Ocultar</Button>
            </Grid>
            {mostrar && <> <Grid item lg={12}>
                <ComponenteHTML text={text.find(x => x.id === 'nota')} handleChangedTextState={handleChangedTextState} title={'Nota'} />
            </Grid>
                <Grid item lg={12}>
                    <Button variant="contained"
                        onClick={handleGuardar}
                    >Agregar nota enfermeria</Button>
                </Grid></>}
            <Grid item lg={12}>
                <Lista lista={lista} />
            </Grid>

        </Grid >
    )
}
