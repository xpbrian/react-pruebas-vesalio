import { Autocomplete, Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';



export default function Search({ arrayDatosMedico, setEspecialidadSelected, handleSearch, setMedicoSelected, setMedicoLista, especialidadLista, medicoLista, tabs }) {
    const { t } = useTranslation();

    useEffect(() => { console.log(medicoLista) }, [medicoLista])
    const handleFilterMedicos = (_, newValue) => {
        setMedicoSelected(newValue === null ? null : newValue.id)
    }
    const handleFilterEspecialidad = (_, newValue) => {
        setEspecialidadSelected(newValue === null ? null : newValue.id)
        if (newValue === null) {
            setMedicoLista(arrayDatosMedico)
        } else {
            let filtro = medicoLista.filter(x => x.especialidad_id === newValue.id)
            setMedicoLista(filtro);
        }
    }
    return (

        <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} lg={10} md={10}>
                <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
                    <Grid item xs={12} lg={tabs === '02' ? 4 : 12} md={tabs === '02' ? 6 : 12}>
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
                    {
                        tabs === '02' && <Grid item xs={12} lg={8} md={6}>
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
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} lg={2} md={2}>
                <Button variant='contained' onClick={handleSearch}>
                    Buscar
                </Button>
            </Grid>
        </Grid>


    )
}
