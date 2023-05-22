import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import useLayoutContext from 'src/hooks/useAuthLayout'
import DatePicker from '@mui/lab/DatePicker';


export default function SearchCitas({ handleSetfiltro, handleSetfiltroFecha }) {
    const { citasLista } = useLayoutContext()
    const [tipoBusqueda, setTipoBusqueda] = useState([
        { id: '0', value: 'Seleccione opción', active: true },
        { id: '1', value: 'Medicos', active: false },
        { id: '2', value: 'Paciente', active: false },
        { id: '3', value: 'Especialidad', active: false }])
    const [datos, setDatos] = useState([])
    const [fecha, setFecha] = useState(null)
    const handleChangedSelect = (e) => {
        handleSetfiltro({
            medico: '',
            paciente: '',
            especialidad: ''
        })
        setTipoBusqueda(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                active: e.target.value === item.id && true
            })
            return arr;
        }, []))
    }
    const handleFilter = (e, newValue) => {
        let found = tipoBusqueda.find(x => x.active).id
        let obj = {
            medico: found === '1' ? (newValue === null ? '' : newValue.id) : '',
            paciente: found === '2' ? (newValue === null ? '' : newValue.id) : '',
            especialidad: found === '3' ? (newValue === null ? '' : newValue.id) : ''
        }
        handleSetfiltro(obj)
    }
    useEffect(() => {
        let rpta = []
        switch (tipoBusqueda.find(x => x.active).id) {
            case '1':
                rpta = citasLista.reduce((arr, item) => {
                    let found = arr.findIndex(x => x.datos.doctor.documento === item.datos.doctor.documento)
                    if (found < 0) {
                        arr.push(item)
                    }
                    return arr;
                }, [])
                setDatos(rpta.reduce((arr, item) => {
                    arr.push({ id: item.datos.doctor.documento, label: item.datos.doctor.Nombres })
                    return arr
                }, []))
                break;
            case '2':
                rpta = citasLista.reduce((arr, item) => {
                    let found = arr.findIndex(x => x.datos.paciente.paciente.numero_documento === item.datos.paciente.paciente.numero_documento)
                    if (found < 0) {
                        arr.push(item)
                    }
                    return arr;
                }, [])
                setDatos(rpta.reduce((arr, item) => {
                    let nombres = `${item.datos.paciente.paciente.ape_paterno} ${item.datos.paciente.paciente.ape_materno} ${item.datos.paciente.paciente.nombres}`
                    arr.push({ id: item.datos.paciente.paciente.numero_documento, label: nombres })
                    return arr
                }, []))
                break;
            case '3':
                rpta = citasLista.reduce((arr, item) => {
                    let found = arr.findIndex(x => x.datos.doctor.especialidad === item.datos.doctor.especialidad)
                    if (found < 0) {
                        arr.push(item)
                    }
                    return arr;
                }, [])
                setDatos(rpta.reduce((arr, item) => {
                    arr.push({ id: item.datos.doctor.especialidad, label: item.datos.doctor.especialidad })
                    return arr
                }, []))
                break;
            default:
                setDatos([])
                break;
        }

    }, [citasLista, tipoBusqueda])
    return (
        <Box p={2}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
            >
                <Grid item xs={12} md={3}>
                    <DatePicker
                        value={fecha}
                        fullWidth
                        onChange={(newValue) => {
                            handleSetfiltroFecha(newValue)
                            setFecha(newValue);
                        }}
                        inputFormat="yyyy-MM-dd"
                        renderInput={(params) => (
                            <TextField
                                placeholder={'Seleccione fecha'}
                                {...params}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Buscar por</InputLabel>
                        <Select
                            value={tipoBusqueda.find(x => x.active).id}
                            label='Buscar por'
                            onChange={(e) => handleChangedSelect(e)}
                        >
                            {tipoBusqueda.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        fullWidth
                        onChange={handleFilter}
                        options={datos}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={'Paciente'}
                                placeholder={'Seleccione un item de la lista generada'}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
