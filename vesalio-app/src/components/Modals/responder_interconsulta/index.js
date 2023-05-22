import { useState } from 'react'
import { Box, Button, Grid, Divider, Zoom } from '@mui/material';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import useLayoutContext from 'src/hooks/useAuthLayout';
import ComponenteHTML from 'src/components/Drawers/consulta_ambulatoria/ComponenteHTML';

export default function SearchInsumos() {

    const { enqueueSnackbar } = useSnackbar();
    const [text, setText] = useState([{ id: 'observacion', text: '' }])
    const { user } = useAuth()
    const { modalOpen, mostrarComponent } = useLayoutContext()



    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const handleClickGuardar = async () => {
        let errors = []

        if (text.find(x => x.id === 'observacion').text.length === 0) {
            errors.push('Debe ingresar un comentario')
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
                interconsultaId: modalOpen.item.id,
                documento: user.datos.numero_documento,
                descripcionSolicitud: text.find(x => x.id === 'observacion').text,
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertInterconsultaComentarios`, { ...obj })
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
                modalOpen.item.actualizarView()
                mostrarComponent({
                    contenido: '',
                    estado: false,
                    size: 'xs'
                }, 'modalOpen')
            }
        }

    }
    return (
        <>
            <Box
                sx={{
                    mt: 1,
                    p: 2,
                    alignItems: 'center'
                }}
            >
                <Grid alignItems="center" container spacing={2}>
                    <Grid item xs={12} lg={12} md={12}>
                        <ComponenteHTML text={text.find(x => x.id === 'observacion')} handleChangedTextState={handleChangedTextState} title={'Respuesta'} />
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Button
                variant="contained"
                onClick={handleClickGuardar}
                sx={{ float: 'right', m: 2 }}
                startIcon={<SaveIcon />}>
                Guardar
            </Button>

        </>

    )
}
