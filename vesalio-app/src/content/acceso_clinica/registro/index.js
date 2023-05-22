import React, { useEffect, useState } from 'react'
import { Box, Button, Step, StepLabel, Stepper, styled, Zoom, Avatar, Collapse, Alert, IconButton, Typography, Container, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContenedorLogin from '../Contenedor'
import DatosPersonales from './DatosPersonales'
import axios from 'axios';
import { useSnackbar } from 'notistack';
import confirmSweetAlert from 'src/utils/confirm';
import CloseIcon from '@mui/icons-material/Close';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import DatosPersonalesApi from './DatosBuscarApi'
import { ports } from 'src/config';

const BoxActions = styled(Box)(
    ({ theme }) => `
      background: ${theme.colors.alpha.black[5]}
  `
);
const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
        box-shadow: ${theme.colors.shadows.success};
        margin-left: auto;
        margin-right: auto;
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
);

export default function Index() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const steps = ['Datos personales', 'Datos cuenta', 'Completado']
    const [step, setStep] = useState(0)
    const [completed, setCompleted] = useState(false);
    const [terms, setTerms] = useState(false)
    const [openAlert, setOpenAlert] = useState(true);
    const [busca, setBusca] = useState({
        tipodocumento: '01',
        numerodocumento: '',
        rptaApi: null,
    })
    const tipos = [
        { id: '01', name: 'D.N.I.' },
        { id: '02', name: 'Carné de extranjeria' },
        { id: '03', name: 'Pasaporte' },
    ]
    const radios = [
        { value: 'wsp', label: 'Whatsapp', step: 1 },
        { value: 'correo', label: 'Correo electrónico', step: 1 },
    ]

    const [textPersonales, setTextPersonales] = useState([
        { id: 'paternos', label: 'Apellido paterno', value: '', type: 'text', disabled: false, tipo: 'text', xs: 12, lg: 6, md: 6, onchanged: (e) => handleChangedText(e), step: 0 },
        { id: 'maternos', label: 'Apellido materno', value: '', type: 'text', disabled: false, tipo: 'text', xs: 12, lg: 6, md: 6, onchanged: (e) => handleChangedText(e), step: 0 },
        { id: 'nombres', label: 'Nombres', value: '', type: 'text', disabled: false, tipo: 'text', xs: 12, lg: 12, md: 12, onchanged: (e) => handleChangedText(e), step: 0 },
        { id: 'direccion', label: 'Dirección', value: '', type: 'text', disabled: false, tipo: 'text', xs: 12, lg: 12, md: 12, onchanged: (e) => handleChangedText(e), step: 0 },

        { id: 'correo', label: 'Correo electrónico', value: '', type: 'email', disabled: false, tipo: 'text', xs: 12, lg: 12, md: 12, onchanged: (e) => handleChangedText(e), step: 1 },
        { id: 'celular', label: 'Whatsapp', value: '', type: 'number', disabled: false, tipo: 'text', xs: 12, lg: 12, md: 12, onchanged: (e) => handleChangedText(e), step: 1 },
        { id: 'contrasena', label: 'Crear contraseña', type: 'password', value: '', disabled: false, tipo: 'text', xs: 12, lg: 6, md: 6, onchanged: (e) => handleChangedText(e), step: 1 },
        { id: 'repetir', label: 'Repetir contraseña', type: 'password', value: '', disabled: false, tipo: 'text', xs: 12, lg: 6, md: 6, onchanged: (e) => handleChangedText(e), step: 1 },
        { id: 'metodo', label: 'Método de comunicación y acceso al sistema', value: 'wsp', type: '', tipo: 'radio', xs: 12, lg: 12, md: 12, onchanged: (e) => handleChangedText(e), step: 1, array: radios.filter(x => x.step === 1) },


    ]);
    const handleChangedText = async (e) => {
        setTextPersonales(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                value: item.id === e.target.name ? e.target.value : item.value,
            })
            return arr;
        }, []))
    }
    const handleChangedApi = (e) => {
        setBusca(x => {
            return {
                ...x,
                [e.target.name]: e.target.value
            }
        })
    }


    useEffect(() => {
        const getDatosReniec = async (dni) => {
            let config = {
                method: 'get',
                url: `https://apiperu.net/api/dni/${dni}`,
                headers: {
                    'Authorization': `Bearer ${ports.reniecApi}`,
                }
            };
            const rpta = await axios(config)
            if (rpta.data.success) {
                setTextPersonales(tex => tex.reduce((arr, item) => {
                    if (item.id === 'paternos') {
                        arr.push({ ...item, disabled: true, value: rpta.data.data.apellido_paterno })
                    } else if (item.id === 'maternos') {
                        arr.push({ ...item, disabled: true, value: rpta.data.data.apellido_materno })
                    } else if (item.id === 'nombres') {
                        arr.push({ ...item, disabled: true, value: rpta.data.data.nombres })
                    } else if (item.id === 'direccion') {
                        arr.push({ ...item, disabled: true, value: rpta.data.data.direccion })
                    } else {
                        arr.push({ ...item })
                    }
                    return arr
                }, []))
            }
        }
        if (busca.tipodocumento === '01' && busca.numerodocumento.length === 8) {
            enqueueSnackbar(t('Generando búsqueda espere un momento'), {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
            getDatosReniec(busca.numerodocumento)
        }
        if (busca.tipodocumento !== '01') {
            setTextPersonales(tex => tex.reduce((arr, item) => {
                arr.push({ ...item, disabled: false })
                return arr
            }, []))
        }
    }, [busca])


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
    const datosPersonalesSiguiente = async () => {
        let errors = []
        if (textPersonales.filter(x => x.value.length === 0 && x.step === step).length > 0 && busca.numerodocumento.length === 0) {
            errors.push('No debe existir campos vacios')
        } else {
            if (busca.tipodocumento === '01' && busca.numerodocumento.length !== 8) {
                errors.push('El DNI solo debe contener 8 digitos')
            }
            if (busca.tipodocumento === '02' && busca.numerodocumento.length !== 9) {
                errors.push('El Carné de extranjeria solo debe contener como minimo 9 dígitos')
            }
            if (busca.tipodocumento === '04' && busca.numerodocumento.length !== 15) {
                errors.push('El dni solo debe contener 8 digitos')
            }
            if (!terms) {
                errors.push('Debe aceptar los términos y condiciones')
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
            setStep((s) => s + 1)
        }
    }
    const datosCuentaSiguiente = async () => {
        let errors = []
        if (textPersonales.filter(x => x.id !== 'correo' && x.value.length === 0 && x.step === step).length > 0) {
            errors.push('No debe existir campos vacios')
        } else {
            if (!soloNumeros(textPersonales.find(x => x.id === 'celular').value)) {
                errors.push('El whatsapp solo debe contener numeros')
            } else {
                if (textPersonales.find(x => x.id === 'celular').value.length !== 9) {
                    errors.push('El whatsapp solo debe contener 9 numeros')
                }
                if (textPersonales.find(x => x.id === 'celular').value.substring(0, 1) !== '9') {
                    errors.push('El whatsapp debe iniciar con 9')
                }
            }
            if (textPersonales.find(x => x.id === 'correo').value.length > 0) {
                if (!existeCorreo(textPersonales.find(x => x.id === 'correo').value)) {
                    errors.push('Ingrese un formato de correo valido')
                }
            }
            if (textPersonales.find(x => x.id === 'contrasena').value.length < 6) {
                errors.push('La contraseña debe contener como minimo 6 digitos')
            }
            if (textPersonales.find(x => x.id === 'contrasena').value !== textPersonales.find(x => x.id === 'repetir').value) {
                errors.push('Las contraseñas no coinciden')
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
            let rpta = await confirmSweetAlert('Registrar usuario', '¿Seguro que desea registrar sus datos', 'warning', true)
            let envio = textPersonales.reduce((arr, item) => {
                arr.push({ id: item.id, value: item.value })
                return arr
            }, [])
            if (rpta) {
                const enviar = await axios.post('http://apis-vesalio.com.pe/registroDatos', {
                    datos: [...envio,
                    { id: 'tipodocumento', value: busca.tipodocumento },
                    { id: 'numerodocumento', value: busca.numerodocumento },
                    { id: 'nombretipo', value: tipos.find(y => y.id === busca.tipodocumento).name },
                    { id: 'nombreregistro', value: textPersonales.find(x => x.id === 'metodo').value === 'wsp' ? 'Whatsapp' : 'Correo electronico' },
                    { id: 'tiporegistro', value: textPersonales.find(x => x.id === 'metodo').value === 'wsp' ? '02' : '01' },
                    { id: 'cuenta', value: textPersonales.find(x => x.id === 'metodo').value === 'wsp' ? textPersonales.find(x => x.id === 'celular').value : textPersonales.find(x => x.id === 'correo').value },
                    ]
                })
                let msj = {
                    msj: enviar.data.msj,
                    icon: enviar.data.rpta === 1 ? 'success' : 'error'
                }
                confirmSweetAlert('Registrar usuario', msj.msj, msj.icon, false)
                if (enviar.data.rpta === 1) {
                    setStep((s) => s + 1)
                }
            }
        }
    }


    function isLastStep() {
        return step === steps.length - 2;
    }

    useEffect(() => {
        if (step === 2) {
            setCompleted(true)
        }
    }, [step])

    const handleSiguiente = () => {
        switch (step) {
            case 0:
                datosPersonalesSiguiente()
                break;
            case 1:
                datosCuentaSiguiente()
                break;
            default:
                console.log("wepoigfn")
                break;
        }
    }
    return (
        <>
            <ContenedorLogin>
                <Stepper alternativeLabel activeStep={step}>
                    {steps.map((child, index) => (
                        <Step
                            key={child}
                            completed={step > index || completed}
                        >
                            <StepLabel>{child}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {
                    step === 0 && <>
                        <DatosPersonalesApi tipos={tipos} handleChangedApi={handleChangedApi} busca={busca} />
                        <DatosPersonales textPersonales={textPersonales.filter(x => x.step === step)} setTerms={setTerms} terms={terms} />
                    </>
                }
                {
                    step === 1 && <DatosPersonales textPersonales={textPersonales.filter(x => x.step === step)} />
                }
                {
                    step === 2 && <Box px={4} py={8}>
                        <Container maxWidth="sm">
                            <AvatarSuccess>
                                <CheckTwoToneIcon />
                            </AvatarSuccess>
                            <Collapse in={openAlert}>
                                <Alert
                                    sx={{
                                        mt: 5
                                    }}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpenAlert(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    severity="info"
                                >
                                    {t(
                                        'Las credenciales de acceso se les enviara al método de autentificación que selecciono'
                                    )}
                                </Alert>
                            </Collapse>

                            <Typography
                                align="center"
                                sx={{
                                    pt: 5,
                                    pb: 4,
                                    lineHeight: 1.5,
                                    px: 10
                                }}
                                variant="h2"
                            >
                                {t(
                                    'Registro completo'
                                )}
                            </Typography>

                            <Button
                                fullWidth
                                variant="contained"
                                href="/citas"
                            >
                                Inicio de sessión
                            </Button>
                        </Container>
                    </Box>
                }

                {!completed ? (
                    <BoxActions
                        p={4}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Button
                            disabled={step === 0 && true}
                            variant="outlined"
                            color="primary"
                            type="button"
                            onClick={() => setStep((s) => s - 1)}
                        >
                            {t('Anterior')}
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={handleSiguiente}
                        >
                            {isLastStep()
                                ? t('Finalizar')
                                : t('Siguiente')}
                        </Button>
                    </BoxActions>
                ) : null}
                <Box my={2} display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Link component={RouterLink} to="/citas">
                        <b>Volver al inicio de sesión</b>
                    </Link>
                </Box>
            </ContenedorLogin>
        </>
    )
}
