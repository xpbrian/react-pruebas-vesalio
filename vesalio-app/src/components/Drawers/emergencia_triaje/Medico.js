import { Autocomplete, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';



export default function Medicos({ setEspecialidadSelected }) {
    const { t } = useTranslation();
    const { especialidad } = useLayoutContext()
    const [especialidadLista, setEspecialidadLista] = useState([]);

    useEffect(() => {
        setEspecialidadLista(especialidad.filter(x => [335, 336].find(y => y === x.id_especialidad) !== undefined))
    }, [especialidad])

    const handleFilterEspecialidad = (value, newValue) => {
        setEspecialidadSelected(newValue === null ? null : newValue.id)
    }


    return (
        <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} lg={12} md={6}>
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
        </Grid>
    )
}
