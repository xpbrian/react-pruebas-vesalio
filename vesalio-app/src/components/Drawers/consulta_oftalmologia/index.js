import React, { useState } from 'react'
import { Box, Button, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import ListaMedicion from '../consulta_ambulatoria/ListaMedicion'
import TabsGeneral from "src/components/Tabs";
import Consulta from './Consulta'


export default function Index() {
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
    const [text, setText] = useState([{ id: 'tiempo', text: '' }, { id: 'motivo', text: '' }, { id: 'enfermedad_actual', text: '' }])
    // const [text1, setText1] = useState([
    //     { id: 'avsc', label: 'AV SC',derecho: '',izquierdo: '' },
    //     { id: 'avph', label: 'AV PH',derecho: '',izquierdo: '' },
    //     { id: 'avcsc', label: 'AV CSC',derecho: '',izquierdo: '' },
    //     { id: 'avcc', label: 'AV CC',derecho: '',izquierdo: '' },
    //     { id: 'presion', label: 'Presión Intramuscular (mmHg)',derecho: '',izquierdo: '' },

    // ])


    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
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
                        handleChangedTextState={handleChangedTextState}
                        text={text}
                    />
                }    
            </Grid>


        </>
    )
}
