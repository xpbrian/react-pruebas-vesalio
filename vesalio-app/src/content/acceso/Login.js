import ContenedorLogin from './Contenedor'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
    Box,
    Button,
    TextField,
    Link,
    Typography,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Grid,
    Zoom,
    InputAdornment,
    IconButton,
    SvgIcon
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import confirmSweetAlert from 'src/utils/confirm';
import useAuth from 'src/hooks/useAuth';
import swal from 'sweetalert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';




export default function Login() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();
    const { login } = useAuth();
    const tiposRegistro = [
        { id: '02', name: 'Whatsapp' },
        { id: '01', name: 'Correo' },
        { id: '03', name: 'Vesalio' },
    ]
    const [text, setText] = useState([
        { id: 'tiporegistro', label: 'Tipo de accesso', value: '02', type: 'select', tipo: 'select', xs: 12, lg: 4, md: 4, array: tiposRegistro },
        { id: 'cuenta', label: 'Usuario', value: '', type: 'text', tipo: 'text', xs: 12, lg: 8, md: 8 },
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
    const soloNumeros = (valor) => {
        let numeros = '0123456789'
        let rpta = true
        for (let i = 0; i < valor.length; i++) {
            if (numeros.indexOf(valor.substring(i, i + 1)) === -1) {
                rpta = false
            }
        }
        return rpta
    }
    const existeCorreo = (valor) => {
        let cantidad = 0
        let arroba = '@'
        for (let i = 0; i < valor.length; i++) {
            if (arroba.indexOf(valor.substring(i, i + 1)) !== -1) {
                cantidad += 1
            }
        }
        return cantidad === 1 && true
    }
    const handleClickEnviar = async () => {
        let errors = []
        if (text.filter(x => x.value.length === 0).length > 0) {
            errors.push('No debe existir campos vacios')
        } else {
            if (text.find(x => x.id === 'tiporegistro').value === '02' && !soloNumeros(text.find(x => x.id === 'cuenta').value)) {
                errors.push('El whatsapp solo debe contener numeros')
            } else if (text.find(x => x.id === 'tiporegistro').value === '02' && soloNumeros(text.find(x => x.id === 'cuenta').value)) {
                if (text.find(x => x.id === 'cuenta').value.length !== 9) {
                    errors.push('El whatsapp solo debe contener 9 numeros')
                }
                if (text.find(x => x.id === 'cuenta').value.substring(0, 1) !== '9') {
                    errors.push('El whatsapp debe iniciar con 9')
                }
            }
            if (text.find(x => x.id === 'tiporegistro').value === '01' && !existeCorreo(text.find(x => x.id === 'cuenta').value)) {
                errors.push('Ingrese un formato de correo valido')
            }

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

            const enviar = await axios.post('http://apis-vesalio.com.pe/accessoSistema', {
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
                    navigate(`/citas/${enviar.data.ruta}`);
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
                            {
                                x.tipo === 'select' && <FormControl fullWidth variant="outlined">
                                    <InputLabel>{t(x.label)}</InputLabel>
                                    <Select
                                        value={x.value}
                                        sx={{ textAlign: "center", justifyContent: "center" }}
                                        label={x.label}
                                        name={x.id}
                                        renderValue={(value) => {
                                            console.log(value);
                                            return (
                                                <Box sx={{ display: "flex", gap: 1 }}>
                                                    <SvgIcon color="primary">
                                                        {value === '02' ? <WhatsAppIcon color='success' /> : <EmailIcon color="warning" />}
                                                    </SvgIcon>
                                                    <b style={{ marginTop: "2px" }}>{tiposRegistro.find(x => x.id === value).name}</b>
                                                </Box>
                                            );
                                        }}
                                        onChange={(e) => handleChangedText(e)}
                                    >
                                        {x.array.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.id === '02' ? <WhatsAppIcon color='success' /> : <EmailIcon color="warning" />} {option.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                        <Link component={RouterLink} to="/recuperar-contrasena">
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
                    <Box my={4}>
                        <Typography
                            component="span"
                            variant="subtitle2"
                            color="text.primary"
                            fontWeight="bold"
                        >
                            {t('¿Todavía no tienes una cuenta?')}
                        </Typography>{' '}
                        <Box display={{ xs: 'block', md: 'inline-block' }}>
                            <Link component={RouterLink} to="/registro">
                                <b>Registrate</b>
                            </Link>
                        </Box>
                    </Box>
                </>
            </ContenedorLogin>
        </>
    )
}
