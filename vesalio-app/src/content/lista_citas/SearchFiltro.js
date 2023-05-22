// import { DatePicker } from '@mui/lab';
import { Autocomplete, Button, FormControl, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, styled, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import SearchIcon from '@mui/icons-material/Search';

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
);


export default function SearchFiltro({ filter, handleChangedFilter, handleBuscarFiltro }) {
    const tipos = [{ id: 'documento_paciente', nombre: '#Documento' }, { id: 'nombre_paciente', nombre: 'Apellidos' }]
    const { t } = useTranslation();
    const { medicos, especialidad } = useLayoutContext()
    const [medicosLista, setmedicosLista] = useState([]);
    const actionRef1 = useRef(null);
    const [openPeriod, setOpenMenuPeriod] = useState(false);
    const [period, setPeriod] = useState(tipos[0]);
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
                sx={{ px: 2 }}
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={12} lg={2} md={2}>
                    {/* <DatePicker
                        value={filter.fecha}
                        fullWidth
                        onChange={(newValue) => {
                            handleChangedFilter('fecha', newValue)
                        }}
                        inputFormat="yyyy-MM-dd"
                        renderInput={(params) => (
                            <TextField
                                placeholder={'Seleccione fecha'}
                                {...params}
                            />
                        )}
                    /> */}
                    <TextField fullWidth
                        type={'date'}
                        onChange={(e) => {
                            handleChangedFilter('fecha', e.target.value)
                        }}
                        value={filter.fecha}
                        variant="outlined" />
                </Grid>
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
                <Grid item xs={12} lg={4} md={3}>
                    <FormControl variant="outlined" fullWidth>
                        <OutlinedInputWrapper
                            value={filter.paciente === null ? '' : filter.paciente}
                            onChange={(e) => handleChangedFilter('paciente', e.target.value)}
                            type="text"
                            placeholder={t('Ingrese datos del paciente...')}
                            startAdornment={
                                <InputAdornment position="start">

                                    <Button
                                        variant="outlined"
                                        ref={actionRef1}
                                        onClick={() => setOpenMenuPeriod(true)}
                                        sx={{
                                            mr: 1
                                        }}
                                        endIcon={<KeyboardArrowDownTwoToneIcon fontSize="small" />}
                                    >
                                        {period.nombre}
                                    </Button>
                                    <Menu
                                        disableScrollLock
                                        anchorEl={actionRef1.current}
                                        onClose={() => setOpenMenuPeriod(false)}
                                        open={openPeriod}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                    >
                                        {tipos.map((_period) => (
                                            <MenuItem
                                                key={_period.id}
                                                onClick={() => {
                                                    setPeriod(_period);
                                                    setOpenMenuPeriod(false);
                                                    handleChangedFilter('tipo_paciente', _period.id)
                                                }}
                                            >
                                                {_period.nombre}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
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
