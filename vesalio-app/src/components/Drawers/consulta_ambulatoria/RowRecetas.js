import { Autocomplete, TextField, FormControl, Select, MenuItem, Typography, TableRow, TableCell, Zoom, Tooltip, IconButton } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Label from 'src/components/Label';
import AddIcon from '@mui/icons-material/Add';

export default function RowRecetas({ addRecetas }) {
    const { t } = useTranslation();
    const tipoDosis = [{ id: '1', nombre: '1ra Vez' }, { id: '2', nombre: 'Unica vez' }]
    const { enqueueSnackbar } = useSnackbar();
    const [valores, setValores] = useState('')
    const [values, setValues] = useState([{ id: 'dosis', value: '' }, { id: 'unidad', value: '26' }, { id: 'duracion', value: '' }, { id: 'comentario', value: '' }, { id: 'frecuencia', value: '' }, { id: 'tipo_dosis', value: '1' }, { id: 'cantidad', value: '1' }, { id: 'hora', value: '00:00' }])
    const [array, setArray] = useState([])
    const [viaAdministracion, setViaAdministracion] = useState([])
    const [unidadMedida, setunidadMedida] = useState([])
    const [selected, setSelected] = useState(null)
    const [selectedVia, setSelectedVia] = useState(null)

    const valoresxDefault = () => {
        setValores('')
        setValues([{ id: 'dosis', value: '' }, { id: 'unidad', value: '26' }, { id: 'duracion', value: '' }, { id: 'comentario', value: '' }, { id: 'frecuencia', value: '' }, { id: 'tipo_dosis', value: '1' }, { id: 'cantidad', value: '1' }, { id: 'hora', value: '00:00' }])
        setArray([])
        setSelected(null)
        setSelectedVia(null)
    }


    useEffect(() => {
        const getFrecuencia = async () => {
            try {
                const response = await axios.get(`http://200.121.91.211:4001/frecuencia_viaAdministracion`)
                setViaAdministracion(response.data.viaAdministracion)
                setunidadMedida(response.data.unidadMedida)
            } catch (e) {
                console.log(e);
            }

        }
        getFrecuencia()
    }, [])

    useEffect(() => {

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

    }, [valores])

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
        } else if (selected !== null) {
            if (selected.stock === 0) {
                errors.push('No puede agregar un medicamento con STOCK CERO')
            }
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
                // documento: user.datos.numero_documento,
                // persona: modalOpen.item.datosUsuario.Nro_DocIdenti,
                medicamento: selected,
                cantidad: values.find(x => x.id === 'cantidad').value,
                frecuencia: values.find(x => x.id === 'frecuencia').value,
                duracion: values.find(x => x.id === 'duracion').value,
                dosis: values.find(x => x.id === 'dosis').value,
                unidadMedida: unidadMedida.find(x => x.id.toString() === values.find(x => x.id === 'unidad').value.toString()),
                viaAdministracion: selectedVia,
                tipoDosis: tipoDosis.find(x => x.id === values.find(x => x.id === 'tipo_dosis').value),
                fecha: values.find(x => x.id === 'hora').value,
                comentario: values.find(x => x.id === 'comentario').value,
            }
            addRecetas(obj)
            valoresxDefault()
            enqueueSnackbar('Medicamento agregado', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1000
            })
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

        <TableRow hover>
            <TableCell>
                <Autocomplete
                    inputValue={valores}
                    sx={{
                        width: 300
                    }}
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
                            variant="outlined"
                            label={'Medicamentos'}
                            placeholder={t('Seleccione medicamento ...')}
                        />
                    )}
                />
            </TableCell>
            <TableCell>
                <TextField
                    fullWidth
                    sx={{ width: 80 }}
                    name={'cantidad'}
                    type={'number'}
                    value={values.find(x => x.id === 'cantidad').value}
                    variant="outlined"
                    onChange={(e) => setValues(x => x.reduce((arr, item) => {
                        arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                        return arr;
                    }, []))}
                />
            </TableCell>

            <TableCell>
                <TextField
                    fullWidth
                    sx={{ width: 80 }}
                    name={'dosis'}
                    type={'number'}
                    value={values.find(x => x.id === 'dosis').value}
                    variant="outlined"
                    onChange={(e) => setValues(x => x.reduce((arr, item) => {
                        arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                        return arr;
                    }, []))}
                />
            </TableCell>
            <TableCell>
                <FormControl fullWidth variant="outlined">
                    <Select
                        value={values.find(x => x.id === 'unidad').value}
                        name='unidad'
                        sx={{ width: 180 }}
                        onChange={(e) => setValues(x => x.reduce((arr, item) => {
                            arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                            return arr;
                        }, []))}
                    >
                        {unidadMedida.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell>
                <Autocomplete
                    fullWidth
                    inputValue={selectedVia === null ? '' : selectedVia.title}
                    onChange={handleChangedVia}
                    sx={{ width: 180 }}
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
            </TableCell>

            <TableCell>
                <TextField
                    fullWidth
                    sx={{ width: 80 }}
                    name={'frecuencia'}
                    type={'number'}
                    value={values.find(x => x.id === 'frecuencia').value}
                    variant="outlined"
                    onChange={(e) => setValues(x => x.reduce((arr, item) => {
                        arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                        return arr;
                    }, []))}
                />
            </TableCell>
            <TableCell>
                <TextField
                    fullWidth
                    name={'duracion'}
                    sx={{ width: 80 }}
                    type={'number'}
                    value={values.find(x => x.id === 'duracion').value}
                    variant="outlined"
                    onChange={(e) => setValues(x => x.reduce((arr, item) => {
                        arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                        return arr;
                    }, []))}
                />
            </TableCell>

            <TableCell>
                <FormControl fullWidth variant="outlined">
                    <Select
                        value={values.find(x => x.id === 'tipo_dosis').value}
                        sx={{ width: 180 }}
                        name='tipo_dosis'
                        onChange={(e) => setValues(x => x.reduce((arr, item) => {
                            arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                            return arr;
                        }, []))}
                    >
                        {tipoDosis.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell>
                <TextField
                    fullWidth
                    label={'Hora'}
                    sx={{ width: 170 }}
                    name={'hora'}
                    type={'time'}
                    value={values.find(x => x.id === 'hora').value}
                    variant="outlined"
                    onChange={(e) => setValues(x => x.reduce((arr, item) => {
                        arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                        return arr;
                    }, []))}
                />
            </TableCell>
            <TableCell>
                <TextField
                    fullWidth
                    name={'comentario'}
                    sx={{ width: 200 }}
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
            </TableCell>
            <TableCell>
                <Tooltip title={t('Agregar')} arrow>
                    <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => handleClickGuardar()}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}
