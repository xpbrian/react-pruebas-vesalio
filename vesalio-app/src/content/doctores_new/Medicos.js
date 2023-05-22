import { Autocomplete, Grid, TextField } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';



export default function Medicos({ setMedicoSelected, setMedicoLista, especialidadLista, medicoLista }) {
    const { t } = useTranslation();


    const handleFilterMedicos = (_, newValue) => {
        setMedicoSelected(newValue === null ? null : newValue.id)
    }
    const handleFilterEspecialidad = (_, newValue) => {
        if (newValue === null) {
            setMedicoLista(medicoLista)
        } else {
            let filtro = medicoLista.filter(x => x.especialidad_id === newValue.id)
            setMedicoLista(filtro);
        }
    }


    return (
        <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} lg={4} md={6}>
                <Autocomplete
                    fullWidth
                    onChange={handleFilterEspecialidad}
                    options={especialidadLista.reduce((arr, item) => {
                        arr.push({
                            id: item.especialidad_id,
                            title: `${item.nombre}`
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

            <Grid item xs={12} lg={8} md={6}>
                <Autocomplete
                    fullWidth
                    onChange={handleFilterMedicos}
                    options={medicoLista.reduce((arr, item) => {
                        arr.push({
                            id: item.personal_id,
                            title: `${item.apellidos.toUpperCase()}`
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
                            label={t('Médicos')}
                            placeholder={t('Seleccione médico')}
                        />
                    )}
                />
            </Grid>

        </Grid>
    )
}
