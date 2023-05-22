import { useState, useEffect } from 'react'
import { Autocomplete, Box, Button, Grid, TextField, Divider, Zoom, FormControl, Select, MenuItem, InputLabel, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import useLayoutContext from "src/hooks/useAuthLayout";
import Label from 'src/components/Label';

export default function SearchInsumos({ setDatos: refrescarView }) {
    let inputRef;

    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [valores, setValores] = useState('')
    const [values, setValues] = useState([{ id: 'dosis', value: '' }, { id: 'cada', value: '' }, { id: 'comentario', value: '' }, { id: 'frecuencia', value: '' }])
    const [array, setArray] = useState([])
    const [frecuencia, setFrecuencia] = useState([])
    const [viaAdministracion, setViaAdministracion] = useState([])
    const [selected, setSelected] = useState(null)
    const [selectedVia, setSelectedVia] = useState(null)
    const { drawerOpen } = useLayoutContext()

    const { user } = useAuth()
    const limpiarDatos = () => {
        setValores('')
        setValues([{ id: 'dosis', value: '' }, { id: 'cada', value: '' }, { id: 'comentario', value: '' }, { id: 'frecuencia', value: '' }])
        setArray([])
        setSelected(null)
        setSelectedVia(null)
    }
    useEffect(() => {
        const getFrecuencia = async () => {
            try {
                const response = await axios.get(`http://200.121.91.211:4001/frecuencia_viaAdministracion`)
                setFrecuencia(response.data.frecuencia)
                setViaAdministracion(response.data.viaAdministracion)
            } catch (e) {
                console.log(e);
                setFrecuencia([])
            }

        }
        getFrecuencia()
    }, [])

    useEffect(() => {
        if (inputRef !== undefined) {
            inputRef.focus();
        }
        const getDatos = async (query) => {
            try {
                const diagnosticos = await axios.get(`http://200.121.91.211:4001/medicamentos/${query}`)
                setArray(diagnosticos.data.reduce((arr, item) => {
                    arr.push({ id: item.id, label: item.label, stock: item.stock })
                    return arr
                }, []))
            } catch (e) {
                console.log(e);
            }

        }

        if (valores.length >= 3) {
            getDatos(valores)
        } else {
            setArray([])
        }

    }, [valores, inputRef])

    const handleChanged = (value) => {
        if (value !== null) {
            setValores(value.label);
            setSelected(value)
        } else {
            setValores('');
            setSelected(null)
        }

    }

    const handleClickGuardar = async () => {
        let errors = []
        if (selected === null) {
            errors.push('Debe seleccionar un medicamento')
        } else if (selectedVia === null) {
            errors.push('Debe seleccionar una via de administración')
        } else if (values.filter(x => x.id !== 'comentario' && x.value.length === 0) > 0) {
            errors.push('No debe existir campos vacios')
        }
        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1000
            }))
        } else {
            let obj = {
                documento: user.datos.numero_documento,
                persona: drawerOpen.item.datosUsuario.Nro_DocIdenti,
                medicamento: selected,
                viaAdministracion: selectedVia.id,
                frecuencia: values.find(x => x.id === 'frecuencia').value,
                dosis: values.find(x => x.id === 'dosis').value,
                cada: values.find(x => x.id === 'cada').value,
                comentario: values.find(x => x.id === 'comentario').value,
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertAntecedenteMedicamento`, { ...obj })
            if (typeof response.data === 'object') {
                enqueueSnackbar(response.data.error, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 1000
                })
            } else {
                refrescarView(drawerOpen.item.datosUsuario.Nro_DocIdenti)
                enqueueSnackbar(response.data, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 1000
                })
                limpiarDatos()

            }
        }

    }
    const handleChangedVia = (e, newValue) => {
        if (newValue !== null) {
            setSelectedVia(newValue)
        } else {
            setSelectedVia(null)
        }
    }

    return (
        <>
            <Box
                sx={{
                    mt: 4,
                    p: 2,
                    alignItems: 'center'
                }}
            >
                <Grid alignItems="center" container spacing={2}>
                    <Grid item xs={12} lg={12} md={12}>
                        <Autocomplete
                            sx={{
                                mt: -3
                            }}
                            inputValue={valores}
                            value={selected}
                            onChange={(_, value) => handleChanged(value)}
                            autoHighlight
                            options={array}
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    <Typography variant='span' color={option.stock === 0 ? 'error' : 'primary'}>{option.label}</Typography>
                                    <Label color={option.stock === 0 ? 'error' : 'primary'}>{option.stock}</Label>
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onChange={(e) =>
                                        setValores(e.target.value)

                                    }
                                    fullWidth
                                    inputRef={input => {
                                        inputRef = input;
                                    }}
                                    variant="outlined"
                                    label={'Medicamentos'}
                                    placeholder={t('Seleccione medicamento ...')}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6} lg={4} md={4}>
                        <TextField
                            fullWidth
                            label={'Dosis'}
                            name={'dosis'}
                            type={'number'}
                            value={values.find(x => x.id === 'dosis').value}
                            variant="outlined"
                            onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                return arr;
                            }, []))}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4} md={4}>
                        <TextField
                            fullWidth
                            label={'Cada'}
                            name={'cada'}
                            type={'number'}
                            value={values.find(x => x.id === 'cada').value}
                            variant="outlined"
                            onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                return arr;
                            }, []))}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Frecuencia</InputLabel>
                            <Select
                                value={values.find(x => x.id === 'frecuencia').value}
                                label="Frecuencia"
                                name='frecuencia'
                                onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                    arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                    return arr;
                                }, []))}
                            >
                                {frecuencia.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        <Autocomplete
                            fullWidth
                            onChange={handleChangedVia}
                            inputValue={selectedVia === null ? '' : selectedVia.title}
                            options={viaAdministracion.reduce((arr, item) => {
                                arr.push({
                                    id: item.id,
                                    title: `${item.nombre}`
                                })
                                return arr
                            }, [])}
                            getOptionLabel={(option) => option.title}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    variant="outlined"
                                    label={'Via de administración'}
                                    placeholder={'Seleccione via de administración'}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        <TextField
                            fullWidth
                            label={'Comentario'}
                            name={'comentario'}
                            type={'text'}
                            multiline
                            rows={3}
                            value={values.find(x => x.id === 'comentario').value}
                            variant="outlined"
                            onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                return arr;
                            }, []))}
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
