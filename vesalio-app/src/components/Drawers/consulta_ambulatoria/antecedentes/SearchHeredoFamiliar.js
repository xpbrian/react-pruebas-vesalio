import { useState, useEffect } from 'react'
import { Autocomplete, Box, Button, Grid, TextField, Divider, Zoom } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function SearchInsumos({ setDatos: refrescarView }) {
    let inputRef;

    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [valores, setValores] = useState('')
    const [array, setArray] = useState([])
    const [selected, setSelected] = useState(null)
    const [familiar, setFamiliar] = useState([])
    const [selectedFamiliar, setSelectedFamiliar] = useState(null)
    const [comentario, setComentario] = useState('')
    const { user } = useAuth()
    const { drawerOpen } = useLayoutContext()

    useEffect(() => {
        const getFrecuencia = async () => {
            try {
                const response = await axios.get(`http://200.121.91.211:4001/familiaRol`)
                setFamiliar(response.data)
            } catch (e) {
                setFamiliar([])
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
                const diagnosticos = await axios.get(`http://200.121.91.211:4001/diagnosticos/${query}`)
                setArray(diagnosticos.data.reduce((arr, item) => {
                    arr.push({ id: item.id, label: item.label })
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
        setValores(value === null ? '' : value.label);
        setSelected(value === null ? null : value)
    }
    const limpiarDatos = () => {
        setValores('')
        setArray([])
        setSelected(null)
        setComentario('')
        setSelectedFamiliar(null)
    }
    const handleClickGuardar = async () => {
        let errors = []
        if (selected === null) {
            errors.push('Debe seleccionar un diagnostico')
        } else if (selectedFamiliar === null) {
            errors.push('Debe seleccionar un familiar')
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
                comentario,
                diagnostico: selected.id,
                familiar: selectedFamiliar.id,
                persona: drawerOpen.item.datosUsuario.Nro_DocIdenti
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertAntecedenteHeredoFamiliar`, { ...obj })
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
    const handleChangedFamiliar = (e, newValue) => {
        if (newValue !== null) {
            setSelectedFamiliar(newValue)
        } else {
            setSelectedFamiliar(null)
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
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onChange={(e) =>
                                        setValores(e.target.value)

                                    }
                                    // onKeyDown={(e, _) => keyPressHandleAutocomplete(e.key)}
                                    fullWidth
                                    inputRef={input => {
                                        inputRef = input;
                                    }}
                                    variant="outlined"
                                    label={'Diagnosticos'}
                                    placeholder={t('Seleccione diagnostico ...')}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        <Autocomplete
                            fullWidth
                            inputValue={selectedFamiliar === null ? '' : selectedFamiliar.title}
                            onChange={handleChangedFamiliar}
                            options={familiar.reduce((arr, item) => {
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
                                    label={'Parentesco'}
                                    placeholder={'Seleccione parentesco'}
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
