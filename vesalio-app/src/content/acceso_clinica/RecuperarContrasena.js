import { useState } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    Link,
    TextField,
    Typography,
    Container,
    Button,
    styled,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Grid,
    Zoom
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import confirmSweetAlert from 'src/utils/confirm';
import axios from 'axios';

const MainContent = styled(Box)(
    () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function RecoverPasswordBasic() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const tiposRegistro = [
        { id: '01', name: 'Correo' },
        { id: '02', name: 'Whatsapp' },
    ]
    const [text, setText] = useState([
        { id: 'tiporegistro', label: 'Tipo de registro', value: '01', type: 'select', tipo: 'select', xs: 12, lg: 4, md: 4, array: tiposRegistro },
        { id: 'cuenta', label: 'Cuenta', value: '', type: 'text', tipo: 'text', xs: 12, lg: 8, md: 8 },
    ])
    // const handleOpenDialog = () => {
    //     setOpenDialog(true);
    // };
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
            let rpta = await confirmSweetAlert('Recuperar contraseña', '¿Seguro que desea recuperar sus datos', 'warning', true)
            if (rpta) {
                const enviar = await axios.post('http://apis-vesalio.com.pe/recuperarContrasenaClinica', {
                    datos: text.reduce((arr, item) => {
                        arr.push({ id: item.id, value: item.value })
                        return arr
                    }, [])
                })
                console.log(enviar);
                let msj = {
                    msj: enviar.data.msj,
                    icon: enviar.data.rpta === 1 ? 'success' : 'error'
                }
                confirmSweetAlert('Recuperar contraseña', msj.msj, msj.icon, false)
                if (enviar.data.rpta === 1) {
                    navigate(`/citas`);
                }
            }

        }
    }
    return (
        <>
            <Helmet>
                <title>Recuperar contraseña - Clínica Vesalio</title>
            </Helmet>
            <MainContent>
                <Container maxWidth="sm">
                    <Card
                        sx={{
                            mt: 3,
                            p: 4
                        }}
                    >
                        <Box textAlign="center">
                            <img alt="Vesalio" src={'/static/images/img/logoLogin.png'} />
                            <Typography
                                variant="h2"
                                sx={{
                                    mb: 1
                                }}
                            >
                                {t('Recuperar Contraseña')}
                            </Typography>
                        </Box>
                        <>
                            <Grid alignItems="center" container spacing={3} sx={{ mt: 2 }}>
                                {text.map(x => <Grid item xs={x.xs} lg={x.lg} md={x.md} key={x.id}>
                                    {
                                        x.tipo === 'text' && <TextField
                                            fullWidth
                                            label={x.label}
                                            name={x.id}
                                            type={x.type}
                                            value={x.value}
                                            disabled={x.disabled}
                                            variant="outlined"
                                            onChange={(e) => handleChangedText(e)}
                                        />
                                    }
                                    {
                                        x.tipo === 'select' && <FormControl fullWidth variant="outlined">
                                            <InputLabel>{t(x.label)}</InputLabel>
                                            <Select
                                                value={x.value}
                                                label={x.label}
                                                name={x.id}
                                                onChange={(e) => handleChangedText(e)}
                                            >
                                                {x.array.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    }
                                </Grid>
                                )}
                            </Grid>
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
                                {t('Enviar solicitud de recuperación')}
                            </Button>
                        </>

                    </Card>
                    <Box mt={3} textAlign="right">
                        <Typography
                            component="span"
                            variant="subtitle2"
                            color="text.primary"
                            fontWeight="bold"
                        >
                            {t('¿Volver al inicio de sesión?')}
                        </Typography>{' '}
                        <Link component={RouterLink} to="/clinica">
                            <b>Click aquí</b>
                        </Link>
                    </Box>
                </Container>
            </MainContent>
        </>
    );
}

export default RecoverPasswordBasic;
