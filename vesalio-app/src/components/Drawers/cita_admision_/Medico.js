import { Autocomplete, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';



export default function Medicos({ setMedicoSelected, tipo, setFechaSelected,setEspecialidadSelected }) {
    const { t } = useTranslation();
    const { medicos, especialidad } = useLayoutContext()
    const [medicosLista, setmedicosLista] = useState([]);
    const [fecha, setFecha] = useState('')

    const handleFilterMedicos = (value, newValue) => {
        setMedicoSelected(newValue === null ? null : newValue.id)
    }
    const handleFilterEspecialidad = (value, newValue) => {
        setEspecialidadSelected(newValue === null ? null : newValue.id)
        if (newValue === null) {
            setmedicosLista([])
        } else {
            let filtro = medicos.filter(x => x.especialidades.includes(parseInt(newValue.id)))
            setmedicosLista(filtro);
        }
    }
    useEffect(() => {
        setmedicosLista(medicos)
    }, [medicos])

    const handleChangedText = (e) => {
        setFechaSelected(e);
        setFecha(e)
    }

    return (
        <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} lg={tipo === '01' ? 4 : 8} md={6}>
                <Autocomplete
                    fullWidth
                    onChange={handleFilterEspecialidad}
                    options={especialidad.reduce((arr, item) => {
                        arr.push({
                            id: item.id_especialidad,
                            title: `${item.epecialidad}`
                        })
                        return arr
                    }, [])}
                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label={t('Especialidades')}
                            placeholder={t('Seleccione especialidades')}
                        />
                    )}
                />
            </Grid>
            {tipo === '01' && <Grid item xs={12} lg={8} md={6}>
                <Autocomplete
                    fullWidth
                    onChange={handleFilterMedicos}
                    options={medicosLista.reduce((arr, item) => {
                        arr.push({
                            id: item.id_usuario,
                            title: `${item.nombres}`
                        })
                        return arr
                    }, [])}
                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label={t('Medicos')}
                            placeholder={t('Seleccione medicos')}
                        />
                    )}
                />
            </Grid>}
            {tipo === '02' && <Grid item xs={12} lg={4} md={6}>
                <TextField
                    fullWidth
                    type={'date'}
                    value={fecha}
                    variant="outlined"
                    onChange={(e) => handleChangedText(e.target.value)}
                />
            </Grid>}

        </Grid>
    )
}
