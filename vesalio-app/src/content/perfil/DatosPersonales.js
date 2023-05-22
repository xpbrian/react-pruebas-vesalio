import { Box, Button, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Zoom } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import useAuth from 'src/hooks/useAuth';
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';

export default function DatosPersonales() {

    const { user, login } = useAuth();
    const { departamentos, provincias, distritos } = useLayoutContext();
    const [text, setText] = useState([])
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        let nombre = `${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`
        if (user) {
            setText([
                { id: 'tipodocumento', label: 'Tipo de documento', value: user.datos.nombre_tipo_documento, tipo: 'text', xs: 12, lg: 3, md: 3, enviar: false, disabled: true },
                { id: 'numerodocumento', label: 'Número documento', value: user.datos.numero_documento, tipo: 'text', xs: 12, lg: 4, md: 4, enviar: false, disabled: true },
                { id: 'nombres', label: 'Apellidos y nombres', value: nombre, tipo: 'text', xs: 12, lg: 5, md: 5, enviar: false, disabled: true },
                { id: 'celular', label: 'Celular', value: user.datos.celular, tipo: 'text', xs: 12, lg: 3, md: 3, enviar: true, disabled: false, type: 'number' },
                { id: 'whatsapp', label: 'Whatsapp', value: user.datos.whatsapp, tipo: 'text', xs: 12, lg: 3, md: 3, enviar: true, disabled: true },
                { id: 'correo', label: 'Correo electrónico', value: user.datos.correo, tipo: 'text', xs: 12, lg: 6, md: 6, enviar: true, disabled: true },
                { id: 'departamento', label: 'Departamento', value: user.datos.ubigeo.length === 0 ? '' : user.datos.ubigeo.substring(0, 2), tipo: 'select', xs: 12, lg: 4, md: 4, array: departamentos, enviar: true },
                { id: 'provincia', label: 'Provincia', value: user.datos.ubigeo.length === 0 ? '' : user.datos.ubigeo.substring(0, 4), tipo: 'select', xs: 12, lg: 4, md: 4, array: provincias, enviar: true },
                { id: 'distrito', label: 'Distrito', value: user.datos.ubigeo.length === 0 ? '' : user.datos.ubigeo, tipo: 'select', xs: 12, lg: 4, md: 4, array: distritos, enviar: true },
                { id: 'direccion', label: 'Dirección', value: user.datos.direccion, tipo: 'text', xs: 12, lg: 12, md: 12, enviar: true, disabled: false, type: 'text' },
            ])
        }
    }, [user, departamentos, provincias, distritos])

    const handleChangedText = async (e) => {
        if (e.target.name === 'departamento') {
            setText(x => x.reduce((arr, item) => {
                if (item.id === 'provincia' || item.id === 'distrito') {
                    arr.push({
                        ...item,
                        value: '',
                    })
                } else {
                    arr.push({
                        ...item,
                        value: item.id === e.target.name ? e.target.value : item.value,
                    })
                }
                return arr;
            }, []))
        } else if (e.target.name === 'provincia') {
            setText(x => x.reduce((arr, item) => {
                if (item.id === 'distrito') {
                    arr.push({
                        ...item,
                        value: '',
                    })
                } else {
                    arr.push({
                        ...item,
                        value: item.id === e.target.name ? e.target.value : item.value,
                    })
                }
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
    const handleGuardar = async () => {

        let filtro = text.filter(x => !x.disabled)
        let errors = [];
        if (filtro.filter(x => x.value.length === 0).length > 0) {
            errors.push('No debe existir campos vacios')
        } else if (filtro.filter(x => x.value.length === 0).length === 0) {
            if (!soloNumeros(text.find(x => x.id === 'celular').value)) {
                errors.push('El whatsapp solo debe contener numeros')
            } else {
                if (text.find(x => x.id === 'celular').value.length !== 9) {
                    errors.push('El whatsapp solo debe contener 9 numeros')
                }
                if (text.find(x => x.id === 'celular').value.substring(0, 1) !== '9') {
                    errors.push('El whatsapp debe iniciar con 9')
                }
            }
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
            let rpta = await confirmSweetAlert('Registrar usuario', '¿Seguro que desea registrar sus datos', 'warning', true)
            let envio = text.reduce((arr, item) => {
                arr.push({ id: item.id, value: item.value })
                return arr
            }, [])
            if (rpta) {
                const enviar = await axios.post('http://apis-vesalio.com.pe/updateUsuario', {
                    datos: [
                        ...envio,
                        { id: 'id', value: user._id },
                    ]
                })
                let msj = {
                    msj: enviar.data.msj,
                    icon: enviar.data.rpta === 1 ? 'success' : 'error'
                }
                confirmSweetAlert('Registrar usuario', msj.msj, msj.icon, false)
                if (enviar.data.rpta === 1) {
                    login(user._id)
                }
            }
        }
    }
    return (
        <>
            <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Datos Personales
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <CardContent
            >
                <Grid alignItems="center" container spacing={3} sx={{ p: 1 }}>
                    {text.length > 0 && text.map(x => <Grid item xs={x.xs} lg={x.lg} md={x.md} key={x.id}>
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
                                <InputLabel>{x.label}</InputLabel>
                                <Select
                                    value={x.value}
                                    label={x.label}
                                    name={x.id}
                                    onChange={(e) => handleChangedText(e)}

                                >
                                    {
                                        x.id === 'departamento' && x.array.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                    {
                                        x.id === 'provincia' && x.array.filter(x => x.iddpto === text.find(y => y.id === 'departamento').value).map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                    {
                                        x.id === 'distrito' && x.array.filter(x => x.idprov === text.find(y => y.id === 'provincia').value).map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        }
                    </Grid>
                    )}
                    <Grid item xs={12} lg={12} md={12} >
                        <Button
                            sx={{
                                mt: 3,
                            }}
                            color="primary"
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={handleGuardar}
                        >
                            {'Guardar cambios'}
                        </Button>
                    </Grid>

                </Grid>



            </CardContent>
        </>
    )
}
