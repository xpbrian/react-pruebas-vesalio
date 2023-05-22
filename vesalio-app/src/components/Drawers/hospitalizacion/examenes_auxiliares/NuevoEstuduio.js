import ComponenteHTML from 'src/components/Drawers/consulta_ambulatoria/ComponenteHTML'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Autocomplete, Button, Grid, TextField,Zoom } from '@mui/material'
import useLayoutContext from 'src/hooks/useAuthLayout'
import useAuth from 'src/hooks/useAuth'
import { useSnackbar } from 'notistack'

export default function NuevoEstuduio({getDatos}) {
    const [valores, setValores] = useState('')
    const [array, setArray] = useState([])
    const [selected, setSelected] = useState(null)
    const [text, setText] = useState([{ id: 'informacion', text: '' }])
    const { drawerOpen } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth()

    const limpiarDatos = () => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: '' })
            return arr
        }, []))
        setSelected(null)
        setArray([])
        setValores('')
    }

    useEffect(() => {

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

    }, [valores])


    const handleChanged = (value) => {
        setValores(value.label);
        setSelected(value)
    }
    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const handleGrabar = async () => {

        let errors = []
        if (selected === null) {
            errors.push('Debe ingresar un estudio')
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
                personaInternacion: drawerOpen.item.boton.persona_internacion_id,
                estudioid: selected.id,
                informacion: text.find(x => x.id === 'informacion').text,
                documento: user.datos.numero_documento,
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertEstudiosEmergencia`, { ...obj })
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
                enqueueSnackbar(response.data, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
                limpiarDatos()
                getDatos()
            }
        }
    }
    return (
        <>
            <Grid item xs={12} lg={12} md={12} sx={{ mt: -2 }}>
                <Autocomplete
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
                            fullWidth
                            variant="outlined"
                            label={'Estudios'}
                            placeholder={'Seleccione estudio ...'}
                        />
                    )}
                />
            </Grid>
            <Grid item lg={12}>
                <ComponenteHTML text={text.find(x => x.id === 'informacion')} handleChangedTextState={handleChangedTextState} title={'Información clínica'} />
            </Grid>
            <Grid item lg={12}>
                <Button fullWidth variant='outlined'
                    onClick={() => handleGrabar()}
                > Grabar</Button>
            </Grid>
        </>
    )
}
