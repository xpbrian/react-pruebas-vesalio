import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Ingresos from "./Ingresos";
import Egresos from "./Egresos";
import ListaMediciones from './ListaMedicacion'
import ListaIngresos from './ListaIngresos'
import ListaEgresos from './ListaEgresos'
import useLayoutContext from "src/hooks/useAuthLayout";
import axios from "axios";

export default function index() {
    const [vezConsulta, setVezConsulta] = useState([{ value: '01', label: 'Ingresos', active: false }, { value: '02', label: 'Egresos', active: false }])
    const [lista, setLista] = useState([])
    const [listaEgresos, setListaEgresos] = useState([])
    const [total, setTotal] = useState(0)
    const { drawerOpen } = useLayoutContext()
    const [arrayMedicion, setArrayMedicion] = useState(null)

    const getDatosMedicion = async () => {
        const res = await axios.get(`http://200.121.91.211:4001/medicionEmergencia/${drawerOpen.item.boton.persona_internacion_id}`)
        setArrayMedicion(res.data)
    }

    useEffect(() => {
        getDatosMedicion()

    }, [])

    const handleClickRadio = (e) => {
        setVezConsulta(x => x.reduce((arr, item) => {
            arr.push({ ...item, active: item.value === e.target.value && true })
            return arr
        }, []))
    }
    const handleDatos = (obj) => {
        setLista(x => [...x, obj])
        let to = parseInt(obj.cantidad) + parseInt(obj.oral) + parseInt(obj.sanguinea) + parseInt(obj.intravenosa)
        setTotal(x => x + to)
    }
    const handleDatosEgresos = (obj) => {
        setListaEgresos(x => [...x, obj])
        let to = parseInt(obj.cantidad)
        setTotal(x => x - to)
    }
    const handleGuardarIngresosEgresos = () => {
        console.log(lista);
        console.log(listaEgresos);
    }
    return (
        <>

            <Grid alignItems="center" justifyContent={"center"} container spacing={1} sx={{ my: 1, pb: 3 }} >
                <Grid item lg={12}>
                    <Typography variant="h4">
                        Basicos
                    </Typography>

                    <ListaMediciones arrayMedicion={arrayMedicion} getDatosMedicion={getDatosMedicion} />
                </Grid>
                <Grid item lg={12} sx={{ mt: 1 }}>

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
                                value={vezConsulta.find(x => x.active) === undefined ? '' : vezConsulta.find(x => x.active).value}
                                onChange={(e) => handleClickRadio(e)}
                            >
                                {
                                    vezConsulta.map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio size="small" />} label={<><Typography variant="h4">
                                        {item.label}
                                    </Typography></>} />)
                                }

                            </RadioGroup>
                        </FormControl>
                    </Box>
                    {vezConsulta.find(x => x.active) !== undefined && vezConsulta.find(x => x.active).value === '01' && <Ingresos handleDatos={handleDatos} />}
                    {vezConsulta.find(x => x.active) !== undefined && vezConsulta.find(x => x.active).value === '02' && <Egresos handleDatosEgresos={handleDatosEgresos} />}

                    {
                        vezConsulta.find(x => x.active) !== undefined && <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => {
                                setVezConsulta(x => x.reduce((arr, item) => {
                                    arr.push({ ...item, active: false })
                                    return arr
                                }, []))
                            }}
                        >
                            Ocultar
                        </Button>
                    }
                </Grid>
                <Grid item lg={8} sx={{ mt: 1 }}>
                    <Typography variant="h4">
                        Ingresos
                    </Typography>
                    <ListaIngresos lista={lista} />
                </Grid>
                <Grid item lg={4} sx={{ mt: 1 }}>
                    <Typography variant="h4">
                        Egresos
                    </Typography>
                    <ListaEgresos lista={listaEgresos} />
                </Grid>
                <Grid item lg={4} sx={{ mt: 1 }}>
                    <Typography variant="h4">
                        Balance total: {total}
                    </Typography>
                </Grid>
                <Grid item lg={12} sx={{ mt: 1 }}>
                    <Button fullWidth variant="outlined" onClick={handleGuardarIngresosEgresos}>Grabar</Button>
                </Grid>
            </Grid>

        </>
    )
}
