import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ComponenteHTML from './ComponenteHTML'

export default function Hospitalizacion({ handleSetHospitaliza }) {
    const [tiempo, setTiempo] = useState('')
    const [vezConsulta] = useState([
        { value: '01', label: 'SOP', fila: 1 },
        { value: '02', label: 'Tópico', fila: 1 },
        { value: '03', label: 'Anestesia local/ regional', fila: 1 },
        { value: '04', label: 'Anestesia general', fila: 1 },
        { value: '05', label: 'Recuperación', fila: 1 },
        { value: '06', label: 'Sala de procedimientos', fila: 1 },
        { value: '07', label: 'Cirujano', fila: 2 },
        { value: '08', label: '1° Ayudante', fila: 2 },
        { value: '09', label: '2° Ayudante', fila: 2 },
        { value: '10', label: 'Anestesiólogo', fila: 2 },
        { value: '11', label: '1 Instumentista', fila: 2 },
        { value: '12', label: '2 Instumentista', fila: 2 },
        { value: '13', label: 'Patología', fila: 3 },
        { value: '14', label: 'Analisis pre Operativo', fila: 3 },
        { value: '15', label: 'Riesgo quirurgico', fila: 3 },
        { value: '16', label: 'RX toráx', fila: 3 },
        { value: '17', label: 'Ecografia', fila: 3 },
        { value: '18', label: 'Otros', fila: 3 },
        { value: '19', label: 'Si', fila: 4 },
        { value: '20', label: 'No', fila: 4 },
        { value: '21_1', label: 'Médico', fila: 5 },
        { value: '22_2', label: 'Quirúrgico', fila: 5 }
    ])
    const [text, setText] = useState([{ id: 'observacion', text: '' }])
    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
        handleSetHospitaliza('otros', t)
    }
    const handleRequiereTransfusion = (val) => {
        handleSetHospitaliza('require', val)
        console.log(val)
    }
    const handleRequiereTratamiento = (val) => {
        handleSetHospitaliza('tratamiento', val)
    }

    useEffect(() => {
        handleSetHospitaliza('tiempo', tiempo)
    }, [tiempo])
    return (
        <Grid item lg={12} sx={{ mx: 2 }}>

            <Grid container spacing={1} sx={{ my: 1 }} >
                <Grid item lg={2} sx={{ mx: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Tratamiento</b></Typography>

                </Grid>
                <Grid item lg={2} sx={{ mx: 2 }}>
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
                            // value={vezConsulta.find(x => x.active).value}
                            // onChange={(e) => handleClickRadio(e)}
                            >
                                {
                                    vezConsulta.filter(x => x.fila === 5).map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio size="small" onChange={(e) => handleRequiereTratamiento(e.target.value)} />} label={item.label} />)
                                }

                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Grid>




            </Grid>
            <Grid alignItems="center" justifyContent={"center"} container spacing={1} sx={{ my: 1 }} >
                <Grid item lg={2} sx={{ mx: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Tiempo aproximado de hospitalización</b></Typography>

                </Grid>
                <Grid item lg={2} sx={{ mx: 2 }}>
                    <TextField
                        fullWidth
                        label={''}
                        type={'number'}
                        value={tiempo}
                        variant="outlined"
                        onChange={(e) => setTiempo(e.target.value)}
                    />
                </Grid>

                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Divider />
                </Grid>
                <Grid item lg={4}>
                    <FormGroup>

                        {
                            vezConsulta.filter(x => x.fila === 1).map((x) => <FormControlLabel key={x.value} control={<Checkbox />} label={<Typography variant="h5" sx={{ mb: 1 }}>{x.label}</Typography>} />)
                        }

                    </FormGroup>
                </Grid>
                <Grid item lg={4}>
                    <FormGroup>

                        {
                            vezConsulta.filter(x => x.fila === 2).map((x) => <FormControlLabel key={x.value} control={<Checkbox />} label={<Typography variant="h5" sx={{ mb: 1 }}>{x.label}</Typography>} />)
                        }

                    </FormGroup>
                </Grid>
                <Grid item lg={4}>
                    <FormGroup>

                        {
                            vezConsulta.filter(x => x.fila === 3).map((x) => <FormControlLabel key={x.value} control={<Checkbox />} label={<Typography variant="h5" sx={{ mb: 1 }}>{x.label}</Typography>} />)
                        }

                    </FormGroup>
                </Grid>
                <Grid item lg={2} sx={{ mx: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Requiere transfusión sanguinea</b></Typography>
                </Grid>
                <Grid item lg={4}>
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
                            // value={vezConsulta.find(x => x.active).value}
                            // onChange={(e) => handleClickRadio(e)}
                            >
                                {
                                    vezConsulta.filter(x => x.fila === 4).map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio size="small" onChange={(e) => handleRequiereTransfusion(e.target.value)} />} label={item.label} />)
                                }

                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'observacion')} handleChangedTextState={handleChangedTextState} title={'Observación'} />
                </Grid>
            </Grid>

        </Grid >
    )
}
