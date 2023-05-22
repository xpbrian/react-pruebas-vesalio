import { Autocomplete, Grid, TextField, Tabs, Tab, styled, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAuth from 'src/hooks/useAuth'
import useLayoutContext from 'src/hooks/useAuthLayout'

const TabsWrapper = styled(Tabs)(
    ({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.md}px) {
        .MuiTabs-scrollableX {
          overflow-x: auto !important;
        }
  
        .MuiTabs-indicator {
            box-shadow: none;
        }
      }
      `
);
export default function Paciente({ pacienteDocumento, setPacienteDocumento, setPacienteCobertura, pacienteCobertura, setTipoCobertura }) {
    const { familiares, misCoberturas, mostrarComponent } = useLayoutContext()
    const { user } = useAuth()
    const [datos, setDatos] = useState([])
    const [datosCoberturas, setDatosCoberturas] = useState([])
    const [tabs, setTabs] = useState([{ value: '01', label: 'Asegurado', active: true }, { value: '02', label: 'Particular', active: false }])

    const handleTabsChange = (_event, tabsValue) => {
        setTabs(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                active: item.value === tabsValue && true
            })
            return arr
        }, []))
        setTipoCobertura(tabsValue)
    };
    useEffect(() => {
        let array = []
        let nombres = `(${user.datos.numero_documento}) ${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`
        array.push({ id: user.datos.numero_documento, label: nombres })
        familiares.map(x => {
            let nombresA = `(${x.numero_documento}) ${x.ape_paterno} ${x.ape_materno} ${x.nombres}`
            array.push({ id: x.numero_documento, label: nombresA })
            return false
        })
        setDatos(array)
    }, [familiares, user])

    useEffect(() => {
        setTabs(x => x.reduce((arr, item) => {
            let estado = false
            if (item.value === '01' && user.datos.aseguradora) {
                estado = true
            } else if (item.value === '02' && !user.datos.aseguradora) {
                estado = true
            }
            arr.push({ ...item, active: estado })
            return arr
        }, []))
    }, [user])
    useEffect(() => {
        setTipoCobertura(tabs.find(x => x.active).value)
    }, [tabs])


    const handleFilter = (value, autoValue) => {
        if (autoValue !== null) {
            setPacienteDocumento(autoValue)
        } else {
            setPacienteDocumento({ id: '999', label: '' })
        }
    }
    const handleCoberturas = (value, autoValue) => {
        if (autoValue !== null) {
            setPacienteCobertura(autoValue);
        } else {
            setPacienteCobertura({ id: '999', label: '' });
        }
    }
    useEffect(() => {
        setDatosCoberturas(misCoberturas.reduce((arr, item) => {
            arr.push({ id: item.cobertura, label: item.descripcionCobertura })
            return arr
        }, []));
    }, [misCoberturas])

    const agregarNuevoFamiliar = () => {
        mostrarComponent({
            contenido: 'addFamiliar',
            estado: true,
            size: 'xs',
            item: true
        }, 'modalOpen')
    }
    const agregarNuevaCobertura = () => {
        mostrarComponent({
            contenido: 'addCobertura',
            estado: true,
            size: 'xs',
            item: true
        }, 'modalOpen')
    }
    return (
        <Grid alignItems="center" justifyContent={"center"} container spacing={3} px={2}>
            <Grid item xs={12} lg={12} md={12}>
                {pacienteDocumento !== null && <Autocomplete
                    fullWidth
                    onChange={handleFilter}
                    options={datos}
                    value={pacienteDocumento}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label={'Paciente'}
                            placeholder={'Seleccione Paciente'}
                        />
                    )}
                />}
                <Link component="a"
                    href="#"
                    onClick={agregarNuevoFamiliar}>
                    Agregar familiar
                </Link>

            </Grid>
            <Grid item xs={12} lg={12} md={12}>
                <TabsWrapper
                    onChange={handleTabsChange}
                    scrollButtons="auto"
                    textColor="secondary"
                    value={tabs.find(x => x.active).value}
                    variant="scrollable"
                >
                    {tabs.map((tab) => (
                        <Tab key={tab.value} value={tab.value} label={tab.label} />
                    ))}
                </TabsWrapper>
            </Grid>
            {tabs.find(x => x.active).value === '01' && <Grid item xs={12} lg={12} md={12}>
                {
                    pacienteCobertura !== null && <><Autocomplete
                        fullWidth
                        onChange={handleCoberturas}
                        value={pacienteCobertura}
                        options={datosCoberturas}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={'Aseguradora'}
                                placeholder={'Seleccione aseguradora'}
                            />
                        )}
                    />
                        <Link component="a"
                            href="#"
                            onClick={agregarNuevaCobertura}>
                            Agregar aseguradora
                        </Link>
                    </>
                }
                {
                    pacienteCobertura === null && <>
                        Debe tener una aseguradora asignada para utilizar esta opción {' '}
                        <Link component="a"
                            href="#"
                            onClick={agregarNuevaCobertura}>
                            Agregar aseguradora
                        </Link>
                    </>
                }

            </Grid>}



        </Grid>
    )
}
