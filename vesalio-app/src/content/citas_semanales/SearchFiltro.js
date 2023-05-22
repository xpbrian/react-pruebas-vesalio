// import { DatePicker } from '@mui/lab';
import { Autocomplete, Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchFiltro({ handleChangedFilter, handleBuscarFiltro }) {
    const { t } = useTranslation();
    const { medicos, especialidad } = useLayoutContext()
    const [medicosLista, setmedicosLista] = useState([]);


    const handleFilterEspecialidad = (_, newValue) => {
        handleChangedFilter('especialidad', newValue === null ? newValue : newValue.id)
        if (newValue === null) {
            setmedicosLista(medicos)
        } else {
            let filtro = medicos.filter(x => x.especialidades.includes(parseInt(newValue.id)))
            setmedicosLista(filtro);
        }
    }
    useEffect(() => {
        setmedicosLista(medicos.sort(function (a, b) {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            // a must be equal to b
            return 0;
        }))
    }, [medicos])

    const handleFilterMedicos = (_, newValue) => {
        handleChangedFilter('doctor', newValue === null ? newValue : newValue.id);
        // aqui va el selected
    }
    return (
        <>
            <Grid
                container
                direction="row"
                sx={{ p: 2 }}
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >

                <Grid item xs={12} lg={3} md={3}>
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
                <Grid item xs={12} lg={3} md={3}>
                    <Autocomplete
                        fullWidth
                        onChange={handleFilterMedicos}
                        options={medicosLista.reduce((arr, item) => {
                            arr.push({
                                id: item.documento,
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

                <Grid item xs={12} lg={2} md={2}>
                    <Button variant='contained'
                        onClick={() => handleBuscarFiltro()}
                        fullWidth startIcon={<SearchIcon />}>Buscar</Button>
                </Grid>
            </Grid>
        </>
    )
}
