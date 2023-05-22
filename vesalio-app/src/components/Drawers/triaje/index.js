import { Button, FormControl, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Typography, Zoom } from '@mui/material'
import { styled } from '@mui/system'
import { useRef, useState } from 'react'
import ComponenteHTML from '../consulta_ambulatoria/ComponenteHTML'
import ListaMedicion from '../consulta_ambulatoria/ListaMedicion'
import Medicos from './Medico'
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import useLayoutContext from 'src/hooks/useAuthLayout'
import axios from 'axios'
import useAuth from 'src/hooks/useAuth'
import { useSnackbar } from 'notistack'
import Label from 'src/components/Label'


const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
);

export default function Index() {
    const { enqueueSnackbar } = useSnackbar();

    const [mediciones, setMediciones] = useState([{
        tension_arterial_maxima: '',
        tension_arterial_minima: '',
        peso: '',
        talla: '',
        temperatura: '',
        f_card: '',
        f_resp: '',
        sato: '',
        hgt: ''
    }])
    const { mostrarComponent } = useLayoutContext()
    const [text, setText] = useState([{ id: 'detalle', text: '' }])
    const { user } = useAuth()
    const [especialidadSelected, setEspecialidadSelected] = useState(null)
    const [camaSelected, setCamaSelected] = useState(null)
    const [mostrar, setMostrar] = useState('')
    const [disabled, setDisabled] = useState(false)
    const { tipoDocumentosSistComp, drawerOpen } = useLayoutContext()
    const actionRef1 = useRef(null);
    const [openPeriod, setOpenMenuPeriod] = useState(false);
    const [period, setPeriod] = useState(tipoDocumentosSistComp[0]);

    const handleMediciones = (id, value) => {
        setMediciones(x => x.reduce((arr, item) => {
            arr.push({ ...item, [id]: value })
            return arr
        }, []))
    }
    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const handleGuardar = (E) => {
        setMostrar(E)
    }
    const handleClickBuscar = async () => {

        try {
            let error = []

            // if (mediciones[0].tension_arterial_maxima.length === 0) {
            //     error.push('No debe dejar campos vacios en la medición')
            // } else if (mediciones[0].tension_arterial_minima.length === 0) {
            //     error.push('No debe dejar campos vacios en la medición')
            // } else if (mediciones[0].temperatura.length === 0) {
            //     error.push('No debe dejar campos vacios en la medición')
            // } else if (mediciones[0].f_card.length === 0) {
            //     error.push('No debe dejar campos vacios en la medición')
            // } else if (mediciones[0].f_resp.length === 0) {
            //     error.push('No debe dejar campos vacios en la medición')
            // } else if (mediciones[0].sato.length === 0) {
            //     error.push('No debe dejar campos vacios en la medición')
            // } else if (mediciones[0].hgt.length === 0) {
            //     error.push('No debe dejar campos vacios en la medición')
            // } else
             if (mostrar.length === 0) {
                error.push('Debe seleccionar el criterio')
            } else if (especialidadSelected === null) {
                error.push('Debe seleccionar una especialidad')
            } else if (text.find(x => x.id === 'detalle').text.length === 0) {
                error.push('Debe seleccionar un comentario')
            }
            if (error.length > 0) {
                setDisabled(false)
                error.map(x => enqueueSnackbar(x, {
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
                    medicion: mediciones[0],
                    documento: user.datos.numero_documento,
                    persona: drawerOpen.item.object.documento_paciente,
                    comentario: text.find(x => x.id === 'detalle').text,
                    criterio: mostrar,
                    especialidad: especialidadSelected,
                    turno: drawerOpen.item.object.id,
                    camaSelected: camaSelected
                }
                const response = await axios.post(`http://200.121.91.211:4001/insertTriajeEmergencia`, { ...obj })
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
                    setDisabled(false)
                } else {
                    enqueueSnackbar('Registrado correctamente', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        TransitionComponent: Zoom,
                        autoHideDuration: 1000
                    })
                    mostrarComponent({
                        contenido: '',
                        estado: false,
                    }, 'drawerOpen')
                }
            }

        } catch (e) {
            console.log(e);
        }

    }
    const retornarEmergencia = () => {
        switch (mostrar) {
            case '1':
                return <><Label color='error' sx={{ p: 4 }}><Typography variant='h4'>Emergencia, prioridad I</Typography> </Label></>
            case '2':
                return <Label color='error' sx={{ p: 4 }}><Typography variant='h4'>Emergencia, prioridad II</Typography></Label>
            case '3':
                return <Label color='primary' sx={{ p: 4 }}><Typography variant='h4'>Urgencia, prioridad III</Typography></Label>
            case '4':
                return <Label color='primary' sx={{ p: 4 }}><Typography variant='h4' >Urgencia, prioridad IV</Typography></Label>
            default:
                return ''
        }
    }
    return (
        <>
            <Grid alignItems="center" justifyContent={"center"} container spacing={1} sx={{ my: 1, pb: 3 }} >

                {
                    drawerOpen.item === undefined && <Grid item lg={11}>
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInputWrapper
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                type="number"

                                placeholder={'Ingrese número de documento de identidad'}

                                startAdornment={
                                    <InputAdornment position="start">

                                        <Button
                                            variant="outlined"
                                            ref={actionRef1}
                                            onClick={() => setOpenMenuPeriod(true)}
                                            sx={{
                                                mr: 1
                                            }}
                                            endIcon={<KeyboardArrowDownTwoToneIcon fontSize="small" />}
                                        >
                                            {period.title}
                                        </Button>
                                        <Menu
                                            disableScrollLock
                                            anchorEl={actionRef1.current}
                                            onClose={() => setOpenMenuPeriod(false)}
                                            open={openPeriod}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            {tipoDocumentosSistComp.map((_period) => (
                                                <MenuItem
                                                    key={_period.id}
                                                    onClick={() => {
                                                        setPeriod(_period);
                                                        setOpenMenuPeriod(false);
                                                    }}
                                                >
                                                    {_period.title}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                }

                <Grid item lg={11}>
                    <ListaMedicion mediciones={mediciones} handleMediciones={handleMediciones} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'detalle')} handleChangedTextState={handleChangedTextState} title={'Detalle de actuación'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Grid alignItems="center" justifyContent={"center"} container spacing={1} >
                        <Grid item lg={3} >
                            <Button color={"error"} variant={"contained"} onClick={() => handleGuardar('1')} fullWidth>I</Button>
                        </Grid>
                        <Grid item lg={3} >
                            <Button sx={{ background: 'orange' }} variant={"contained"} onClick={() => handleGuardar('2')} fullWidth>II</Button>
                        </Grid>
                        <Grid item lg={3} >
                            <Button sx={{ background: 'yellow' }} variant={"contained"} onClick={() => handleGuardar('3')} fullWidth>III</Button>
                        </Grid>
                        <Grid item lg={3} >
                            <Button color={"success"} variant={"contained"} onClick={() => handleGuardar('4')} fullWidth>IV</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4} sx={{ mx: 2 }}>
                    {mostrar.length > 0 && retornarEmergencia()}
                </Grid>
                <Grid item xs={12} lg={12} md={12} >
                    <Medicos
                        setEspecialidadSelected={setEspecialidadSelected}
                        setCamaSelected={setCamaSelected}
                    />
                </Grid>
                <Grid item xs={12} lg={12} md={12} >
                    <Button variant='contained'
                        disabled={disabled}
                        onClick={() => {
                            setDisabled(true)
                            setTimeout(() => { handleClickBuscar() }, 1000)
                        }}
                        fullWidth>Guardar emergencia</Button>
                </Grid>
            </Grid>

        </>
    )
}
