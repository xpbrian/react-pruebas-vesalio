import { useEffect, useState } from 'react'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, FormControl, FormControlLabel, Radio, RadioGroup, Box, Typography, Button, Zoom } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { Markup } from 'interweave';
import useAuth from 'src/hooks/useAuth';
import axios from 'axios';
import { useSnackbar } from 'notistack'
import useLayoutContext from 'src/hooks/useAuthLayout'



export default function ListaCitasTabla({ arrayMedicion, getDatosMedicion }) {
    const { t } = useTranslation();
    const { drawerOpen } = useLayoutContext();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth()
    const [vezConsulta, setVezConsulta] = useState([{ value: '01', label: 'Axilar', active: true }, { value: '02', label: 'Oral', active: false }])
    const [datos, setDatos] = useState([])
    const [mediciones, setMediciones] = useState([{
        tension_arterial_maxima: '',
        tension_arterial_minima: '',
        peso: '',
        temperatura: '',
        f_card: '',
        f_resp: '',
        sato: '',
        hgt: '',
        comentario: ''
    }])

    const handleMediciones = (e) => {
        setMediciones(x => x.reduce((arr, item) => {
            arr.push({ ...item, [e.target.name]: e.target.value })
            return arr
        }, []))
    }
    useEffect(() => {

        if (arrayMedicion !== null) {
            setDatos(arrayMedicion.mediciones)
        }

    }, [arrayMedicion])


    const handleClickRadio = (e) => {
        setVezConsulta(x => x.reduce((arr, item) => {
            arr.push({ ...item, active: item.value === e.target.value && true })
            return arr
        }, []))
    }
    const handleGrabar = async () => {
        try {
            let error = []

            if (mediciones[0].tension_arterial_maxima.length === 0) {
                error.push('No debe dejar campos vacios en la medición')
            } else if (mediciones[0].tension_arterial_minima.length === 0) {
                error.push('No debe dejar campos vacios en la medición')
            } else if (mediciones[0].peso.length === 0) {
                error.push('No debe dejar campos vacios en la medición')
            } else if (mediciones[0].temperatura.length === 0) {
                error.push('No debe dejar campos vacios en la medición')
            } else if (mediciones[0].f_card.length === 0) {
                error.push('No debe dejar campos vacios en la medición')
            } else if (mediciones[0].f_resp.length === 0) {
                error.push('No debe dejar campos vacios en la medición')
            } else if (mediciones[0].sato.length === 0) {
                error.push('No debe dejar campos vacios en la medición')
            } else if (mediciones[0].hgt.length === 0) {
                error.push('No debe dejar campos vacios en la medición')
            }
            if (error.length > 0) {
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
                    personaInternacion: drawerOpen.item.boton.persona_internacion_id,

                }
                const response = await axios.post(`http://200.121.91.211:4001/insertBalance`, { ...obj })
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
                    getDatosMedicion()
                    enqueueSnackbar('Registrado correctamente', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        TransitionComponent: Zoom,
                        autoHideDuration: 1000
                    })
                    setMediciones([{
                        tension_arterial_maxima: '',
                        tension_arterial_minima: '',
                        peso: '',
                        temperatura: '',
                        f_card: '',
                        f_resp: '',
                        sato: '',
                        hgt: '',
                        comentario: ''
                    }])
                }
            }

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{t('Presión Arterial')}</TableCell>
                            <TableCell align="center">{t('Peso')}</TableCell>
                            <TableCell align="center">{t('Temperatura')}</TableCell>
                            <TableCell align="center">{t('F. Card')}</TableCell>
                            <TableCell align="center">{t('F. Resp')}</TableCell>
                            <TableCell align="center">{t('Sat. O2')}</TableCell>
                            <TableCell align="center">{t('HGT')}</TableCell>
                            <TableCell align="center">{t('Comentario')}</TableCell>
                            <TableCell align="center">{t('Grabar')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow hover>
                            <TableCell align="center">
                                <Grid
                                    sx={{
                                        px: { xs: 0, md: 2 }
                                    }}
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Grid item lg={6} sx={{ mx: 2 }}>
                                        <TextField
                                            label={'Sistolica'}
                                            size={"small"}
                                            name={"tension_arterial_maxima"}
                                            sx={{ width: 85 }}
                                            type={"number"}
                                            variant="outlined"
                                            onChange={(e) => handleMediciones(e)}
                                            value={mediciones[0].tension_arterial_maxima}
                                        />
                                    </Grid>
                                    <Grid item lg={6} sx={{ mx: 2 }}>
                                        <TextField
                                            label={'Diastolica'}
                                            size={"small"}
                                            sx={{ width: 85 }}
                                            type={"number"}
                                            name={"tension_arterial_minima"}
                                            variant="outlined"
                                            onChange={(e) => handleMediciones(e)}
                                            value={mediciones[0].tension_arterial_minima}
                                        />
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size={"small"}
                                    sx={{ width: 85 }}
                                    type={"number"}
                                    name={"peso"}
                                    value={mediciones[0].peso}
                                    variant="outlined"
                                    onChange={(e) => handleMediciones(e)}
                                />
                            </TableCell>
                            <TableCell align="center">
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
                                <TextField
                                    size={"small"}
                                    sx={{ width: 85 }}
                                    type={"number"}
                                    variant="outlined"
                                    name='temperatura'
                                    value={mediciones[0].temperatura}
                                    onChange={(e) => handleMediciones(e)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size={"small"}
                                    sx={{ width: 85 }}
                                    type={"number"}
                                    variant="outlined"
                                    name='f_card'
                                    onChange={(e) => handleMediciones(e)}

                                    value={mediciones[0].f_card}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size={"small"}
                                    sx={{ width: 85 }}
                                    type={"number"}
                                    variant="outlined"
                                    name='f_resp'
                                    onChange={(e) => handleMediciones(e)}
                                    value={mediciones[0].f_resp}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size={"small"}
                                    sx={{ width: 85 }}
                                    type={"number"}
                                    variant="outlined"
                                    name='sato'
                                    value={mediciones[0].sato}
                                    onChange={(e) => handleMediciones(e)}

                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size={"small"}
                                    sx={{ width: 85 }}
                                    type={"number"}
                                    variant="outlined"
                                    name='hgt'
                                    value={mediciones[0].hgt}
                                    onChange={(e) => handleMediciones(e)}

                                />
                            </TableCell>
                            <TableCell align="center" width={"100%"}>
                                <TextField
                                    size={"small"}
                                    sx={{ width: 285 }}
                                    rows={4}
                                    multiline
                                    type={"text"}
                                    variant="outlined"
                                    name='comentario'
                                    value={mediciones[0].comentario}
                                    onChange={(e) => handleMediciones(e)}

                                />
                            </TableCell>
                            <TableCell align="center">
                                <Button variant='contained' onClick={handleGrabar}>Grabar</Button>
                            </TableCell>
                        </TableRow>
                        {
                            datos.map((list, ix) => <TableRow key={ix} hover>
                                <TableCell>
                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        color="text.primary">
                                        <b>{list.tension_maxima}/{list.tension_minima}</b>
                                    </Typography>

                                </TableCell>
                                <TableCell>

                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        color="text.primary">
                                        <b>{list.peso}</b>
                                    </Typography>

                                </TableCell>
                                <TableCell>

                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        color="text.primary">
                                        <b>{list.tempaxil}</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>

                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        color="text.primary">
                                        <b>{list.fc}</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>

                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        color="text.primary">
                                        <b>{list.fr}</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        color="text.primary">
                                        <b>{list.saturacion}</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        color="text.primary">
                                        <b>{list.hgt}</b>
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Markup content={list.comentario} />

                                </TableCell>
                                <TableCell>
                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        color="text.primary">
                                        <b>{list.hora_med}</b>
                                    </Typography>
                                </TableCell>
                            </TableRow>)
                        }

                    </TableBody>
                </Table>

            </TableContainer>


        </>
    )
}
