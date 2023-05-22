import { useEffect, useState } from 'react'
import { Box, Button, Grid, Divider, Zoom } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ComponenteHTML from '../consulta_ambulatoria/ComponenteHTML';
import useAuth from 'src/hooks/useAuth';
import useLayoutContext from 'src/hooks/useAuthLayout';
import { useSnackbar } from 'notistack';
import axios from 'axios';

export default function SearchInsumos() {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth()
    const { drawerOpen, mostrarComponent } = useLayoutContext()
    const [text, setText] = useState([{ id: 'detalle', text: '' }])


    useEffect(() => {
        if (drawerOpen.item.isEditar !== undefined) {
            setText(x => x.reduce((arr, item) => {
                arr.push({ ...item, text: drawerOpen.item.item.informacion_adicional })
                return arr
            }, []))
        }
    }, [drawerOpen])

    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const handleClickGuardar = async () => {
        if (text.find(x => x.id === 'detalle').text.length === 0) {
            enqueueSnackbar('Debe ingresar un comentario', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
        } else {
            let obj = {
                documento: user.datos.numero_documento,
                persona: drawerOpen.item.datosUsuario.Nro_DocIdenti,
                comentario: text.find(x => x.id === 'detalle').text,
            }

            const response = await axios.post(`http://200.121.91.211:4001/insertInformacionAdicional`, { ...obj })

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
                drawerOpen.item.actualizarView()
                mostrarComponent({
                    contenido: '',
                    estado: false,
                }, 'drawerOpen')
            }
        }

    }
    const handleClickEditar = async () => {
        if (text.find(x => x.id === 'detalle').text.length === 0) {
            enqueueSnackbar('Debe ingresar un comentario', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
        } else {
            let obj = {
                id: drawerOpen.item.item.id,
                documento: user.datos.numero_documento,
                comentario: text.find(x => x.id === 'detalle').text,
                compara: drawerOpen.item.item.creadopor_id
            }
            console.log(obj);
            const response = await axios.post(`http://200.121.91.211:4001/updateInformacionAdicional`, { ...obj })

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
                drawerOpen.item.actualizarView()
                mostrarComponent({
                    contenido: '',
                    estado: false,
                }, 'drawerOpen')
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
                        <ComponenteHTML text={text.find(x => x.id === 'detalle')} handleChangedTextState={handleChangedTextState} title={'Comentario'} />
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Button
                variant="contained"
                onClick={() => drawerOpen.item.isEditar === undefined ? handleClickGuardar() : handleClickEditar()}
                sx={{ float: 'right', m: 2 }}
                startIcon={<SaveIcon />}>
                Guardar
            </Button>

        </>

    )
}
