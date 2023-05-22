import { useState, useEffect } from 'react'
import { Autocomplete, Box, Button, Grid, styled, List, ListItemButton, ListItemText, TextField, Zoom, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Label from 'src/components/Label';
import useLayoutContext from 'src/hooks/useAuthLayout';
import SaveIcon from '@mui/icons-material/Save';

const ListItemWrapper = styled(ListItemButton)(
    () => `
    
        &.MuiButtonBase-root {
          border-radius: 0;
        }
    `
);

export default function SearchInsumos() {

    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [valores, setValores] = useState('')
    const [valores2, setValores2] = useState('')
    const [values, setValues] = useState([{ id: 'cantidadSolucion', value: '' }, { id: 'cantidad', value: '' }, { id: 'comentario', value: '' }])
    const [array2, setArray2] = useState([])
    const [array3, setArray3] = useState([])
    const [selected, setSelected] = useState(null)
    const [selected2, setSelected2] = useState(null)
    const [array, setArray] = useState([])
    const [newValue, setNewValue] = useState(null)
    const { modalOpen } = useLayoutContext()

    useEffect(() => {

        const getDatos2 = async (query) => {
            try {
                const diagnosticos = await axios.get(`http://200.121.91.211:4001/medicamentos/${query}`)
                setArray2(diagnosticos.data.reduce((arr, item) => {
                    arr.push({ id: item.id, label: item.label, stock: item.stock })
                    return arr
                }, []))
            } catch (e) {
                console.log(e);
            }
        }

        if (valores2.length >= 3) {
            getDatos2(valores2)
        } else {
            setArray2([])
        }

    }, [valores2])

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

    const handleChanged2 = (value) => {
        if (value !== null) {
            setValores2(value.label);
            setSelected2(value)
        } else {
            setValores2('');
            setSelected2(null)
        }
    }
    const handleChanged = (value) => {
        if (value !== null) {
            setValores(value.label);
            setSelected(value)
        } else {
            setValores('');
            setSelected(null)
        }

    }

    useEffect(() => {
        setNewValue(selected)
    }, [selected])

    // const handleClickGuardar = async () => {
    //     let errors = []
    //     if (selectedVia === null) {
    //         errors.push('Debe seleccionar una via de administración')
    //     } else if (values.filter(x => x.id !== 'comentario' && x.value.length === 0) > 0) {
    //         errors.push('No debe existir campos vacios')
    //     } else if (selected2 === null) {
    //         errors.push('No debe existir campos vacios')
    //     }
    //     if (errors.length > 0) {
    //         errors.map(x => enqueueSnackbar(x, {
    //             variant: 'error',
    //             anchorOrigin: {
    //                 vertical: 'top',
    //                 horizontal: 'right'
    //             },
    //             TransitionComponent: Zoom
    //         }))
    //     } else {
    //         let obj = {
    //             solucion: selected2,
    //             medicamento: array3.map(x => x.label).reduce((arr, item) => arr + '<hr/>' + item, ''),
    //             comentario: values.find(x => x.id === 'comentario').value,
    //         }
    //         // modalOpen.item.addRecetas(obj)
    //         valoresxDefault()
    //         enqueueSnackbar('Medicamento agregado', {
    //             variant: 'success',
    //             anchorOrigin: {
    //                 vertical: 'top',
    //                 horizontal: 'right'
    //             },
    //             TransitionComponent: Zoom
    //         })
    //     }

    // }
    const agregarMedicamento = () => {
        if (newValue !== null) {
            if (values.find(x => x.id === 'cantidad').value.length === 0) {
                enqueueSnackbar('Debe agregar una cantidad', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 1000
                })
            } else if (values.find(x => x.id === 'cantidad').value.length !== 0) {
                if (array3.find(x => x.id === newValue.id) === undefined) {
                    setArray3(x => [...x, { ...newValue, cantidad: values.find(x => x.id === 'cantidad').value }])
                }
            }
        }
    }
    const handleClickGuardar = async () => {
        let errors = []
        if (values.filter(x => x.value.length === 0) > 0) {
            errors.push('No debe existir campos vacios')
        } else if (selected2 === null) {
            errors.push('No debe existir campos vacios')
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
                solucion: selected2,
                medicamento: array3.map(x => (x.label + ' ' + x.cantidad)).reduce((arr, item) => arr + '<hr/>' + item, ''),
                comentario: values.find(x => x.id === 'comentario').value,
                cantidad: values.find(x => x.id === 'cantidadSolucion').value,
            }
            modalOpen.item.addRecetas(obj)
            enqueueSnackbar('Medicamento agregado', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
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
                    <Grid item xs={12} lg={9} md={9}>
                        <Autocomplete
                            sx={{
                                mt: -3
                            }}
                            inputValue={valores2}
                            value={selected2}
                            onChange={(_, value) => handleChanged2(value)}
                            autoHighlight
                            options={array2}
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
                                        setValores2(e.target.value)

                                    }
                                    fullWidth
                                    variant="outlined"
                                    label={'Soluciones'}
                                    placeholder={t('Seleccione solución ...')}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} lg={2} md={2} sx={{ mt: -3 }}>
                        <TextField
                            fullWidth
                            label={'Cantidad'}
                            name={'cantidadSolucion'}
                            type={'number'}
                            value={values.find(x => x.id === 'cantidadSolucion').value}
                            variant="outlined"
                            onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                return arr;
                            }, []))}
                        />
                    </Grid>
                    <Grid item xs={12} lg={8} md={8} >
                        <Autocomplete
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
                                    variant="outlined"
                                    label={'Medicamentos'}
                                    placeholder={t('Seleccione medicamento ...')}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} lg={2} md={2} >
                        <TextField
                            fullWidth
                            label={'Cantidad'}
                            name={'cantidad'}
                            type={'number'}
                            value={values.find(x => x.id === 'cantidad').value}
                            variant="outlined"
                            onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                return arr;
                            }, []))}
                        />
                    </Grid>
                    <Grid item xs={12} lg={2} md={2}>
                        <Button variant='outlined' onClick={agregarMedicamento}>
                            Agregar
                        </Button>
                    </Grid>
                    {
                        array3.length > 0 && <Grid item xs={12} lg={12} md={12}>
                            <List disablePadding component="div">
                                {array3.map((value, ix) => {
                                    return (
                                        <ListItemWrapper
                                            sx={{
                                                py: 0,
                                                ml: -2
                                            }}
                                            key={ix}
                                        >
                                            <ListItemText
                                                primary={value.label}
                                                primaryTypographyProps={{ variant: 'h5' }}
                                            />
                                            <ListItemText
                                                primary={<Label>{value.cantidad}</Label>}
                                            />
                                        </ListItemWrapper>
                                    );
                                })}
                            </List>

                        </Grid>
                    }
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
