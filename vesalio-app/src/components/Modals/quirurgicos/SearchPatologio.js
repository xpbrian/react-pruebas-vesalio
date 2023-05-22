import { useState, useEffect } from 'react'
import { Autocomplete, Box, Button, Grid, TextField, Divider, Zoom } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function SearchInsumos() {
    let inputRef;

    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [valores, setValores] = useState('')
    const [array, setArray] = useState([])
    const [selected, setSelected] = useState(null)
    const [comentario, setComentario] = useState('')
    const [fecha, setFecha] = useState('')
    const { user } = useAuth()
    const { modalOpen, mostrarComponent } = useLayoutContext()



    useEffect(() => {
        if (inputRef !== undefined) {
            inputRef.focus();
        }
        const getDatos = async (query) => {
            try {
                const diagnosticos = await axios.get(`http://200.121.91.211:4001/estudios/${query}`)
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

    useEffect(() => {
        console.log(fecha);
    }, [fecha])

    const handleChanged = (value) => {
        setValores(value.label);
        setSelected(value)
    }

    const handleClickGuardar = async () => {
        let errors = []
        if (selected === null) {
            errors.push('Debe seleccionar un estudio')
        } else if (fecha.length === 0) {
            errors.push('Debe seleccionar una fecha de estudio')
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
                documento: user.datos.numero_documento,
                comentario,
                fecha: fecha,
                estudio: selected.id,
                persona: modalOpen.item.datosUsuario.Nro_DocIdenti
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertAntecedenteQuirurgico`, { ...obj })
            if (typeof response.data === 'object') {
                enqueueSnackbar(response.data.error, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
            } else {
                modalOpen.item.setDatosAntecedentes()
                enqueueSnackbar(response.data, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
                mostrarComponent({
                    contenido: '',
                    estado: false,
                    size: 'xs'
                }, 'modalOpen')

            }
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
                                    label={'Estudios'}
                                    placeholder={t('Seleccione estudio ...')}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        <TextField
                            fullWidth
                            label={''}
                            type={'date'}
                            value={fecha}
                            variant="outlined"
                            onChange={(e) => setFecha(e.target.value)}
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
