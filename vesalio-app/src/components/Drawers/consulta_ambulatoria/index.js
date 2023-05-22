import { Box, Button, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Zoom } from "@mui/material";
import { useEffect, useState } from "react";
import ListaMedicion from './ListaMedicion'
import TabsGeneral from "src/components/Tabs";
import Consulta from "./Consulta";
import Antecedentes from "./Antecedentes";
import useLayoutContext from "src/hooks/useAuthLayout";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function ConsultaAmbulatoria() {
    const { enqueueSnackbar } = useSnackbar();
    const [vezConsulta, setVezConsulta] = useState([{ value: '01', label: '1° Vez', active: true }, { value: '02', label: 'Continuador', active: false }])
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
    const [mostrarMedicion, setMostrarMedicion] = useState(false)
    const [tabs, setTabs] = useState([{ value: '02', label: 'Consulta', active: true }, { value: '01', label: 'Antecedentes', active: false }])
    const { drawerOpen } = useLayoutContext()
    const [noCita, setNoCita] = useState(true)

    const [text, setText] = useState([{ id: 'tiempo', text: '' }, { id: 'motivo', text: '' }, { id: 'enfermedad_actual', text: '' }, { id: 'examen_fisico', text: '' }, { id: 'tratamiento', text: '' }])
    const [diagnosticos, setDiagnosticos] = useState([])
    const [diagnosticoPrioridad, setDiagnosticoPrioridad] = useState([])
    const [proxima, setProxima] = useState('')
    const [recetas, setRecetas] = useState([])
    const [estudios, setEstudios] = useState([])
    const [hospitaliza, setHospitaliza] = useState([{ id: 'tratamiento', text: '' }, { id: 'tiempo', text: '' }, { id: 'otros', text: '' }, { id: 'require', active: false }])
    const [selected, setSelected] = useState(null)

    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const handleSetHospitaliza = (id, val) => {
        if (id === 'require') {
            setHospitaliza(x => x.reduce((arr, item) => {
                if (item.id === 'require') {
                    arr.push({ ...item, active: val === '19' && true })
                } else {
                    arr.push(item)
                }
                return arr
            }, []))
        } else if (id === 'tratamiento') {
            setHospitaliza(x => x.reduce((arr, item) => {
                if (item.id === 'tratamiento') {
                    arr.push({ ...item, text: val.split('_')[1] })
                } else {
                    arr.push(item)
                }
                return arr
            }, []))
        } else {
            setHospitaliza(x => x.reduce((arr, item) => {
                arr.push({ ...item, text: id === item.id ? val : item.text })
                return arr
            }, []))
        }

    }

    const addEstudios = (array) => {
        let est = estudios;
        array.map(x => {
            est.push(x)
            return false
        })
        setEstudios(est)
    }
    const removeEstudios = (id) => {
        setEstudios(x => x.filter(y => y.id !== id))
    }
    const removeRecetas = (id) => {
        setRecetas(x => x.filter(y => y.medicamento.id !== id))
    }
    const addRecetas = (item) => {
        setRecetas(x => [...x, item])
    }
    const addDiagnostico = () => {
        if (selected !== null) {
            if (diagnosticos.find(x => x.id === selected.id) === undefined) {
                setDiagnosticoPrioridad([...diagnosticoPrioridad, selected.id])
                setDiagnosticos([...diagnosticos, { ...selected }])
            } else {
                enqueueSnackbar('Ya agrego un diagnosticos igual.', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
            }

        } else {
            enqueueSnackbar('Debe seleccionar un diagnóstico', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
        }
    }
    const changedDiagnosticoPrioridad = (id) => {
        let existe = diagnosticoPrioridad.findIndex(x => x === id)
        if (existe < 0) {
            setDiagnosticoPrioridad(x => [...x, id])

        } else {
            setDiagnosticoPrioridad(x => x.filter(y => y !== id))
        }
    }
    const removeDiagnostico = (id) => {
        setDiagnosticos(x => x.filter(y => y.id !== id))
        setDiagnosticoPrioridad(x => x.filter(y => y !== id))
    }
    const handleClickRadio = (e) => {
        setVezConsulta(x => x.reduce((arr, item) => {
            arr.push({ ...item, active: item.value === e.target.value && true })
            return arr
        }, []))
    }
    const handleMediciones = (id, value) => {
        setMediciones(x => x.reduce((arr, item) => {
            arr.push({ ...item, [id]: value })
            return arr
        }, []))
    }
    const getDatos = async () => {
        try {
            const res = await axios.get(`http://200.121.91.211:4001/medicionAmulatorioEmergencia/${drawerOpen.item.datosUsuario.Nro_DocIdenti}`)
            if (res.data.mediciones.length > 0) {
                setNoCita(false)
                setMediciones([{
                    tension_arterial_maxima: res.data.mediciones[0].tension_arterial_maxima === null ? '' : res.data.mediciones[0].tension_arterial_maxima,
                    tension_arterial_minima: res.data.mediciones[0].tension_arterial_minima === null ? '' : res.data.mediciones[0].tension_arterial_minima,
                    peso: res.data.mediciones[0].peso === null ? '' : res.data.mediciones[0].peso,
                    talla: res.data.mediciones[0].talla === null ? '' : res.data.mediciones[0].talla,
                    temperatura: res.data.mediciones[0].temperatura === null ? '' : res.data.mediciones[0].temperatura,
                    f_card: res.data.mediciones[0].f_card === null ? '' : res.data.mediciones[0].f_card,
                    f_resp: res.data.mediciones[0].f_resp === null ? '' : res.data.mediciones[0].f_resp,
                    sato: res.data.mediciones[0].sato === null ? '' : res.data.mediciones[0].sato,
                    hgt: res.data.mediciones[0].hgt === null ? '' : res.data.mediciones[0].hgt
                }])
            }
        } catch (e) {
            console.log(e);
        }

    }
    useEffect(() => {
        getDatos()
    }, [drawerOpen])

    return (
        <>
            <Grid alignItems="center" justifyContent={"center"} container spacing={1} sx={{ my: 1, pb: 3 }} >
                <Grid item lg={12}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                sx={{ mb: 1 }}
                                value={vezConsulta.find(x => x.active).value}
                                onChange={(e) => handleClickRadio(e)}
                            >
                                {
                                    vezConsulta.map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio size="small" />} label={item.label} />)
                                }

                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item lg={11}>
                    {
                        mostrarMedicion && <ListaMedicion mediciones={mediciones} handleMediciones={handleMediciones} />
                    }

                </Grid>
                <Grid item lg={3}>
                    <Button
                        variant="outlined"
                        fullWidth
                        color={mostrarMedicion ? 'secondary' : 'info'}
                        onClick={() => setMostrarMedicion(x => !x)}
                    >
                        {mostrarMedicion ? 'Ocultar ' : 'Mostrar '} signos vitales
                    </Button>
                </Grid>
                <Grid item lg={12}>
                    <Divider />
                </Grid>
                <Grid item lg={4} sx={{ mt: 1 }}>
                    <TabsGeneral setTabs={setTabs} tabs={tabs} />
                </Grid>
                {
                    tabs.find(x => x.active).value === '02' && <Consulta
                        diagnosticos={diagnosticos}
                        diagnosticoPrioridad={diagnosticoPrioridad}
                        selected={selected}
                        setSelected={setSelected}
                        handleChangedTextState={handleChangedTextState}
                        handleSetHospitaliza={handleSetHospitaliza}
                        addEstudios={addEstudios}
                        removeRecetas={removeRecetas}
                        addRecetas={addRecetas}
                        addDiagnostico={addDiagnostico}
                        changedDiagnosticoPrioridad={changedDiagnosticoPrioridad}
                        removeDiagnostico={removeDiagnostico}
                        text={text}
                        proxima={proxima}
                        setProxima={setProxima}
                        recetas={recetas}
                        estudios={estudios}
                        hospitaliza={hospitaliza}
                        removeEstudios={removeEstudios}
                        noCita={noCita} mediciones={mediciones} />
                }
                {
                    tabs.find(x => x.active).value === '01' && <Antecedentes />
                }
            </Grid>

        </>
    )
}
