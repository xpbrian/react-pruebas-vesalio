import { useState } from 'react'
import { Box, Button, Grid, TextField, Divider, Zoom } from '@mui/material';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function SearchInsumos() {

    const { enqueueSnackbar } = useSnackbar();

    const [comentario, setComentario] = useState('')
    const { user } = useAuth()
    const { modalOpen, mostrarComponent } = useLayoutContext()

    const handleClickGuardar = async () => {
        let errors = []
        if (comentario.length === 0) {
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
                documento: user.datos.numero_documento,
                comentario,
                persona: modalOpen.item.datosUsuario.Nro_DocIdenti
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertAntecedenteNoPatologico`, { ...obj })
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
                modalOpen.item.setDatosAntecedentes()
                enqueueSnackbar(response.data, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
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
                        <TextField
                            fullWidth
                            label={'Comentario'}
                            name={'comentario'}
                            type={'text'}
                            multiline
                            rows={3}
                            value={comentario}
                            variant="outlined"
                            onChange={(e) => setComentario(e.target.value)}
                        />
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
