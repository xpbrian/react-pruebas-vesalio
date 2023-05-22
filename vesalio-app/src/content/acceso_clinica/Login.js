import ContenedorLogin from './Contenedor'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
    Box,
    Button,
    TextField,
    Link,
    Grid,
    Zoom,
    InputAdornment,
    IconButton
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import confirmSweetAlert from 'src/utils/confirm';
import useAuth from 'src/hooks/useAuth';
import swal from 'sweetalert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



export default function Login() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();
    const { login } = useAuth();

    const [text, setText] = useState([
        { id: 'cuenta', label: 'Usuario', value: '', type: 'text', tipo: 'text', xs: 12, lg: 12, md: 12 },
        { id: 'contrasena', label: 'Contraseña', type: 'password', value: '', tipo: 'text', xs: 12, lg: 12, md: 12 },
    ])
    const [show, setShow] = useState(false)
    useEffect(() => {

        setText(x => x.reduce((arr, item) => {
            if (item.id === 'contrasena') {
                arr.push({ ...item, type: show ? 'text' : 'password' })
            } else {
                arr.push(item)
            }
            return arr;
        }, []))
    }, [show])

    const handleChangedText = async (e) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                value: item.id === e.target.name ? e.target.value : item.value,
            })
            return arr;
        }, []))
    }


    const handleClickEnviar = async () => {
        let errors = []
        if (text.filter(x => x.value.length === 0).length > 0) {
            errors.push('No debe existir campos vacios')
        }
        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(t(x), {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            }))
        } else {
            let envio = text.reduce((arr, item) => {
                arr.push({ id: item.id, value: item.value })
                return arr
            }, [])

            const enviar = await axios.post('http://200.121.91.211:4001/accessoSistemaMedico', {
                datos: [...envio]
            })
            let msj = {
                msj: enviar.data.msj,
                icon: enviar.data.rpta === 1 ? 'success' : 'error'
            }

            swal({
                title: 'Bienvenido a Vesalio',
                text: msj.msj,
                icon: msj.icon,
                buttons: false,
                timer: 1200
            })
            if (enviar.data.rpta === 1) {
                login(enviar.data.datos)
                setTimeout(() => {
                    navigate(`/clinica/citas-doctor`);
                    // navigate(`/clinica`);
                }, 300)
            }

        }
    }

    return (
        <>
            <ContenedorLogin>
                <>
                    <Grid alignItems="center" container spacing={3}>
                        {text.map(x => <Grid item xs={x.xs} lg={x.lg} md={x.md} key={x.id}>
                            {
                                x.tipo === 'text' && <TextField
                                    fullWidth
                                    label={x.label}
                                    name={x.id}
                                    type={x.type}
                                    value={x.value}
                                    onKeyDown={(e) => {
                                        if (x.id === 'contrasena' && e.key === 'Enter') {
                                            handleClickEnviar()
                                        }
                                    }}
                                    disabled={x.disabled}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            x.id === 'contrasena' ?
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => setShow(x => !x)}
                                                    >
                                                        <RemoveRedEyeIcon fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment> : ''
                                        ),
                                    }}
                                    onChange={(e) => handleChangedText(e)}
                                />
                            }

                        </Grid>
                        )}
                    </Grid>
                    <Box
                        alignItems="center"
                        sx={{ float: 'right' }}
                        display={{ xs: 'block', md: 'flex' }}
                        justifyContent="space-between"
                    >
                        <Link component={RouterLink} to="/recuperar-contrasena-clinica">
                            <b>{t('Recuperar contraseña')}</b>
                        </Link>
                    </Box>


                    <Button
                        sx={{
                            mt: 3
                        }}
                        color="primary"
                        type="submit"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={handleClickEnviar}
                    >
                        {t('Ingresar')}
                    </Button>

                </>
            </ContenedorLogin>
        </>
    )
}
