import { Autocomplete, Grid, TextField } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';



export default function Medicos({ setMedicoSelected,setmedicosLista,especialidad,medicosLista }) {
    const { t } = useTranslation();


    const handleFilterMedicos = (value, newValue) => {
        console.log(newValue)
        setMedicoSelected(newValue === null ? null : newValue.id)
    }
    const handleFilterEspecialidad = (value, newValue) => {
        if (newValue === null) {
            setmedicosLista([])
        } else {
            let filtro = medicosLista.filter(x => x.especialidades.includes(parseInt(newValue.id)))
            setmedicosLista(filtro);
        }
    }


    return (
        <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} lg={4} md={6}>
                <Autocomplete
                    fullWidth
                    onChange={handleFilterEspecialidad}
                    options={especialidad.reduce((arr, item) => {
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

            <Grid item xs={12} lg={8} md={6}>
                <Autocomplete
                    fullWidth
                    onChange={handleFilterMedicos}
                    options={medicosLista.reduce((arr, item) => {
                        arr.push({
                            id: item.id_usuario,
                            title: `${item.nombres}`
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
