import { useEffect, useState } from 'react'
import { Grid, styled, ListItemButton, List, ListItemText, ListSubheader, Button, Box, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import useLayoutContext from 'src/hooks/useAuthLayout'
import ListaPatologico from '../patologicos/Lista'
import ListaNoPatologico from '../no_patologicos/Lista'
import ListaMedicamentos from '../medicacion_habitual/Lista'
import ListaHerdoFamiliar from '../heredo_familiar/Lista'
import Quirurgico from '../quirurgico/Lista'
import SearchPatologico from './antecedentes/SearchPatologio'
import SearchNoPatologico from './antecedentes/SearchNoPatologico'
import SearchMedicamento from './antecedentes/SearchMedicamentos'
import SearchHeredo from './antecedentes/SearchHeredoFamiliar'
import SearchQuirurgico from './antecedentes/SeacrhQuirurgico'
import axios from 'axios';

const ListItemWrapper = styled(ListItemButton)(
    () => `
    
        &.MuiButtonBase-root {
          border-radius: 0;
        }
    `
);

export default function Antecedentes() {

    const [array, setArray] = useState(null)
    const [selected, setSelected] = useState({ id: null, lista: [] })
    const [tipoGrabar, setTipoGrabar] = useState([{ value: 'patologicos', label: 'Patologico', active: true },
    { value: 'noPatologicos', label: 'No Patologico', active: false },
    { value: 'medicamentos', label: 'Medicamentos', active: false },
    { value: 'heredo', label: 'HeredoFamiliar', active: false },
    { value: 'quirurgico', label: 'Quirurgico', active: false }])
    const [mostrar, setMostrar] = useState(false)
    const {
        drawerOpen
    } = useLayoutContext()

    const setDatos = async (dni) => {
        const citas = await axios.get(`http://200.121.91.211:4001/historiaPacienteAntecedentes/${dni}`)
        setArray([
            { id: "patologicos", lista: citas.data.antecedentes.patologicos, title: "Patológicos" },
            { id: "noPatologicos", lista: citas.data.antecedentes.noPatologicos, title: "Personales, No Patológicos" },
            { id: "medicamentos", lista: citas.data.antecedentes.medicamentos, title: "Medicación Habitual" },
            { id: "heredo", lista: citas.data.antecedentes.heredoFamiliar, title: "Heredofamiliares" },
            { id: "quirurgico", lista: citas.data.antecedentes.quirurgico, title: "Quirúrgico" },
        ])
        if (selected.id !== null) {
            if (selected.id === 'heredo') {
                setSelected(x => {
                    return {
                        ...x,
                        lista: citas.data.antecedentes.heredoFamiliar
                    }
                })
            } else {
                setSelected(x => {
                    return {
                        ...x,
                        lista: citas.data.antecedentes[x.id]
                    }
                })
            }

        }
    }

    const handleClickRadio = (e) => {
        setTipoGrabar(x => x.reduce((arr, item) => {
            arr.push({ ...item, active: item.value === e.target.value && true })
            return arr
        }, []))
    }

    useEffect(() => {
        let antecedentes = drawerOpen.item.antecedentes
        let datosUsuarios = drawerOpen.item.datosUsuario

        if (antecedentes !== null) {
            setArray([
                { id: "patologicos", lista: antecedentes.patologicos, title: "Patológicos" },
                { id: "noPatologicos", lista: antecedentes.noPatologicos, title: "Personales, No Patológicos" },
                { id: "medicamentos", lista: antecedentes.medicamentos, title: "Medicación Habitual" },
                { id: "heredo", lista: antecedentes.heredoFamiliar, title: "Heredofamiliares" },
                { id: "quirurgico", lista: antecedentes.quirurgico, title: "Quirúrgico" },
            ])
        } else {

            setDatos(datosUsuarios.Nro_DocIdenti)
        }

    }, [drawerOpen])

    const handleChangedList = (value) => {
        setSelected({ id: value.id, lista: value.lista })
    }

    return (
        <>
            {
                mostrar && <>
                    <Grid item lg={12} sx={{ mx: 2 }}>
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
                                    value={tipoGrabar.find(x => x.active).value}
                                    onChange={(e) => handleClickRadio(e)}
                                >
                                    {
                                        tipoGrabar.map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio size="small" />} label={item.label} />)
                                    }

                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid><Grid item lg={12} sx={{ mx: 2 }}>
                        {
                            tipoGrabar.find(x => x.active).value === 'patologicos' && <SearchPatologico setDatos={setDatos} />
                        }
                        {
                            tipoGrabar.find(x => x.active).value === 'noPatologicos' && <SearchNoPatologico setDatos={setDatos} />
                        }
                        {
                            tipoGrabar.find(x => x.active).value === 'medicamentos' && <SearchMedicamento setDatos={setDatos} />
                        }
                        {
                            tipoGrabar.find(x => x.active).value === 'heredo' && <SearchHeredo setDatos={setDatos} />
                        }
                        {
                            tipoGrabar.find(x => x.active).value === 'quirurgico' && <SearchQuirurgico setDatos={setDatos} />
                        }

                    </Grid></>
            }
            <Grid item lg={12} sx={{ mx: 2 }}>
                <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setMostrar(x => !x)}
                    color={mostrar ? 'secondary' : 'info'}
                >
                    {mostrar ? 'Ocultar' : 'Agregar Antecedente'}
                </Button>
            </Grid>
            <Grid item lg={12}>

                <Grid
                    sx={{
                        px: { xs: 0, md: 2 }
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                >
                    <Grid item lg={3} >
                        <List disablePadding component="div" sx={{ mt: 1 }}
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Lista de antecedentes
                                </ListSubheader>
                            }
                        >
                            {array !== null && array.map((value, ix) => {
                                return (
                                    <ListItemWrapper
                                        sx={{
                                            py: 1,
                                        }}
                                        onClick={() => handleChangedList(value)}
                                        selected={value.id === selected.id}
                                        key={ix}
                                    >
                                        <ListItemText
                                            primary={value.title}
                                            primaryTypographyProps={{ variant: 'h5' }}
                                        />
                                    </ListItemWrapper>
                                );
                            })}
                        </List>
                    </Grid>
                    <Grid item lg={8}>
                        {
                            selected.id === 'patologicos' && <ListaPatologico lista={selected.lista} />
                        }
                        {
                            selected.id === 'noPatologicos' && <ListaNoPatologico lista={selected.lista} />
                        }
                        {
                            selected.id === 'medicamentos' && <ListaMedicamentos lista={selected.lista} />
                        }
                        {
                            selected.id === 'heredo' && <ListaHerdoFamiliar lista={selected.lista} />
                        }
                        {
                            selected.id === 'quirurgico' && <Quirurgico lista={selected.lista} />
                        }
                        {
                            selected.id === null && <Box
                                sx={{ m: 8 }}
                            ><b>Seleccione un antecedente de la lista</b></Box>
                        }

                    </Grid>
                </Grid>




            </Grid>


        </>
    )
}
