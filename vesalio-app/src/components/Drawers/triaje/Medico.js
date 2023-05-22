import { Autocomplete, Grid, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';



export default function Medicos({ setEspecialidadSelected,setCamaSelected }) {
    const { t } = useTranslation();
    const { especialidad } = useLayoutContext()
    const [especialidadLista, setEspecialidadLista] = useState([]);
    const [camas, setCamas] = useState([]);
    useEffect(() => {
        setEspecialidadLista(especialidad.filter(x => [331, 332, 333, 334, 339].find(y => y === x.id_especialidad) !== undefined))
    }, [especialidad])

    const handleFilterEspecialidad = (value, newValue) => {
        setEspecialidadSelected(newValue === null ? null : newValue.id)
    }
    const handleFilterCama = (value, newValue) => {
        setCamaSelected(newValue === null ? null : newValue.id)
    }
    useEffect(() => {
        const getDatos = async () => {
            try {

                const response = await axios.get(`http://200.121.91.211:4001/habitaciones`)
                let arrayC = response.data.datos.filter(x => x.codigoSala === 67).filter(x => response.data.ocupados.find(y => y.id === x.camaId) === undefined)
                setCamas(arrayC.reduce((arr, item) => {
                    arr.push({ id: item.camaId, title: item.nombreSala + '/' + item.nombreHabitacion + '/' + item.nombreCama })
                    return arr
                }, []))
            } catch (e) {
                console.log(e);
            }
        }
        getDatos()

    }, [])

    return (
        <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} lg={6} md={6}>
                <Autocomplete
                    fullWidth
                    onChange={handleFilterEspecialidad}
                    options={especialidadLista.reduce((arr, item) => {
                        arr.push({
                            id: item.id_especialidad,
                            title: `${item.epecialidad}`
                        })
                        return arr
                    }, []).sort(function (a, b) {
                        if (a.title > b.title) {
                            return 1;
                        }
                        if (a.title < b.title) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    })}
                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label={t('Especialidades')}
                            placeholder={t('Seleccione especialidad')}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
                <Autocomplete
                    fullWidth
                    onChange={handleFilterCama}
                    options={camas}
                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label={t('Camas')}
                            placeholder={t('Seleccione cama')}
                        />
                    )}
                />
            </Grid>
        </Grid>
    )
}
