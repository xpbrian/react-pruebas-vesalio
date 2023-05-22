import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import {
    Button,
    TextField,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Grid,
    Zoom,
} from '@mui/material';
import axios from 'axios';
import confirmSweetAlert from 'src/utils/confirm';
import useAuth from 'src/hooks/useAuth';
import useLayoutContext from 'src/hooks/useAuthLayout';



export default function Register() {
    const { t } = useTranslation();
    const { user } = useAuth()
    const { addFamiliares } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const tipos = [
        { id: '01', name: 'D.N.I.' },
        { id: '02', name: 'Carné de extranjeria' },
        { id: '03', name: 'Pasaporte' },
        { id: '04', name: 'Sin documentos' },
    ]
    const parentezco = [
        { id: '00', name: 'Seleccione parentesco' },
        { id: '01', name: 'Padre' },
        { id: '02', name: 'Madre' },
        { id: '03', name: 'Hijo(a)' },
        { id: '04', name: 'Esposo(a)' },
    ]
    const handleSelectChanged = (e) => {
        if (e.target.name === 'tipodocumento') {
            setText(x => x.reduce((arr, item) => {
                let disabled = false;
                if (e.target.value === '01' && (item.id === 'paternos' || item.id === 'maternos' || item.id === 'nombres')) {
                    disabled = true
                }
                arr.push({
                    ...item,
                    value: item.id === e.target.name ? e.target.value : item.value,
                    disabled: disabled
                })
                return arr;
            }, []))
        } else {
            setText(x => x.reduce((arr, item) => {
                arr.push({
                    ...item,
                    value: item.id === e.target.name ? e.target.value : item.value,
                })
                return arr;
            }, []))
        }
    }
    const [text, setText] = useState([
        { id: 'parentezco', label: 'Parentesco', value: '00', tipo: 'select', xs: 12, lg: 12, md: 12, array: parentezco, onchanged: (e) => handleSelectChanged(e) },
        { id: 'tipodocumento', label: 'Tipo de documento', value: '01', tipo: 'select', xs: 12, lg: 6, md: 6, array: tipos, onchanged: (e) => handleSelectChanged(e) },
        { id: 'numerodocumento', type: 'number', label: 'Número de documento', value: '', error: false, helperText: '', disabled: false, tipo: 'text', xs: 12, lg: 6, md: 6 },
        { id: 'paternos', label: 'Apellido paterno', type: 'text', value: '', error: false, helperText: '', disabled: true, tipo: 'text', xs: 12, lg: 6, md: 6 },
        { id: 'maternos', label: 'Apellido materno', type: 'text', value: '', error: false, helperText: '', disabled: true, tipo: 'text', xs: 12, lg: 6, md: 6 },
        { id: 'nombres', label: 'Nombres', value: '', type: 'text', error: false, helperText: '', disabled: true, tipo: 'text', xs: 12, lg: 12, md: 12 },
    ])
    const getDatosReniec = async (dni) => {
        const rpta = await axios.post('http://5.9.118.78:91/reniec/Controlador/consultaDNI.php?dni=' + dni)
        return rpta.data
    }
    const handleChangedText = async (e) => {
        let value = e.target.value
        if (e.target.name === 'numerodocumento') {
            if (e.target.value.length === 8 && text.find(x => x.id === 'tipodocumento').value === '01') {
                enqueueSnackbar(t('Generando búsqueda con el DNI ingresado'), {
                    variant: 'info',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                });
                let obj = await getDatosReniec(e.target.value)
                if (typeof obj === 'object') {
                    setText(x => x.reduce((arr, item) => {
                        if (item.id === 'paternos') {
                            arr.push({ ...item, value: obj.apellidoPaterno })
                        } else if (item.id === 'maternos') {
                            arr.push({ ...item, value: obj.apellidoMaterno })
                        } else if (item.id === 'nombres') {
                            arr.push({ ...item, value: obj.nombres })
                        } else {
                            arr.push({ ...item, value: item.id === e.target.name ? value : item.value, })
                        }
                        return arr
                    }, []))
                } else {
                    setText(x => x.reduce((arr, item) => {
                        if (item.id === 'numerodocumento') {
                            arr.push({ ...item, value: value })
                        } else if (item.id === 'paternos') {
                            arr.push({ ...item, value: '', disabled: false })
                        } else if (item.id === 'maternos') {
                            arr.push({ ...item, value: '', disabled: false })
                        } else if (item.id === 'nombres') {
                            arr.push({ ...item, value: '', disabled: false })
                        } else {
                            arr.push({ ...item })
                        }
                        return arr
                    }, []))
                }
            } else if (e.target.value.length > 8 && text.find(x => x.id === 'tipodocumento').value === '01') {
                enqueueSnackbar(t('El DNI solo debe contener 8 digitos'), {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                });
            } else {
                setText(x => x.reduce((arr, item) => {
                    arr.push({
                        ...item,
                        value: item.id === e.target.name ? e.target.value : item.value,
                    })
                    return arr;
                }, []))
            }
        } else {
            setText(x => x.reduce((arr, item) => {
                arr.push({
                    ...item,
                    value: item.id === e.target.name ? e.target.value : item.value,
                })
                return arr;
            }, []))
        }

    }
    const handleGuardarRegistro = async () => {
        let errors = []
        if (text.filter(x => x.id !== 'numerodocumento').filter(x => x.value.length === 0).length > 0) {
            errors.push('No debe existir campos vacios')
        } else {
            if (text.find(x => x.id === 'tipodocumento').value === '01' && text.find(x => x.id === 'numerodocumento').value.length !== 8) {
                errors.push('El dni solo debe contener 8 digitos')
            }
            if (text.find(x => x.id === 'parentezco').value === '00') {
                errors.push('Debe seleccionar un parentesco')
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
            let envio = text.reduce((arr, item) => {
                arr.push({ id: item.id, value: item.value })
                return arr
            }, [])

            if (rpta) {
                const enviar = await axios.post('http://apis-vesalio.com.pe/registerFamiliar', {
                    datos: [...envio,
                    { id: 'nombretipo', value: tipos.find(y => y.id === text.find(x => x.id === 'tipodocumento').value).name },
                    { id: '_id', value: user._id },
                    { id: 'parentezcodescirpcion', value: parentezco.find(y => y.id === text.find(x => x.id === 'parentezco').value).name },
                    ]
                })
                let msj = {
                    msj: enviar.data.msj,
                    icon: enviar.data.rpta === 1 ? 'success' : 'error'
                }
                confirmSweetAlert('Registrar Familiar', msj.msj, msj.icon, false)
                if (enviar.data.rpta === 1) {
                    addFamiliares()
                }
            }
        }
    }
    return (
        <>
            <>
                <Grid alignItems="center" container spacing={3} sx={{ p: 2 }}>
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
                                onChange={(e) => {
                                    if (e.target.name === 'paternos' || e.target.name === 'maternos' || e.target.name === 'nombres') {
                                        let numeros = '0123456789°!"#$%&/()=?¡*¨[]_:;><'
                                        let inserta = true
                                        numeros.split('').map((x) => {
                                            if (e.target.value.includes(x)) {
                                                inserta = false
                                            }
                                            return false
                                        })
                                        if (inserta) {
                                            handleChangedText(e)
                                        }
                                    } else {
                                        handleChangedText(e)
                                    }

                                }}
                            />
                        }
                        {
                            x.tipo === 'select' && <FormControl fullWidth variant="outlined">
                                <InputLabel>{t(x.label)}</InputLabel>
                                <Select
                                    value={x.value}
                                    label={x.label}
                                    name={x.id}
                                    onChange={(e) => x.onchanged(e)}
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
                    <Grid item xs={12} lg={12} md={12} >
                        <Button
                            sx={{
                                mt: 3
                            }}
                            color="primary"
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={handleGuardarRegistro}
                        >
                            {t('Registrar')}
                        </Button>
                    </Grid>
                </Grid>



            </>


        </>
    )
}
