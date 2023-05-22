import React, { useEffect, useRef, useState } from 'react'
import { Button, Menu, MenuItem, Grid, TextField, Typography, Autocomplete } from '@mui/material';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import axios from 'axios';
import Label from 'src/components/Label';


export default function Index({ handleDatos }) {
    const { t } = useTranslation();
    const solucion = [{ id: 'solucion', title: 'Solución' }, { id: 'medicamento', title: 'Medicamento' }]
    const actionRef1 = useRef(null);
    const [valores, setValores] = useState('')
    const [array, setArray] = useState([])
    const [selected, setSelected] = useState(null)

    const [openPeriod, setOpenMenuPeriod] = useState(false);
    const [period, setPeriod] = useState(solucion[0]);

    useEffect(() => {

        const getDatos = async (query) => {
            try {
                const diagnosticos = await axios.get(`http://200.121.91.211:4001/medicamentos/${query}`)
                setArray(diagnosticos.data.reduce((arr, item) => {
                    arr.push({ id: item.id, label: item.label, stock: item.stock })
                    return arr
                }, []))
            } catch (e) {
                console.log(e);
            }

        }

        if (valores.length >= 3) {
            getDatos(valores)
        } else {
            setArray([])
        }

    }, [valores])

    const [value, setValue] = useState({
        cantidad: '',
        intravenosa: '',
        oral: '',
        sanguinea: '',

    })

    const handleBuscarPaciente = async () => {
        handleDatos({
            ...value,
            tipo: period.title,
            medicamento: selected.label
        })
       setValores('')
       setArray([])
         setSelected(null)
    }
    const handleChanged = (value) => {
        if (value !== null) {
            setValores(value.label);
            setSelected(value)
        } else {
            setValores('');
            setSelected(null)
        }
    }
    return (
        <>
            <Grid alignItems="center" justifyContent={"center"} container spacing={1} sx={{ pb: 3 }} >
                <Grid item lg={2.5}>
                    <Button
                        variant="outlined"
                        ref={actionRef1}
                        onClick={() => setOpenMenuPeriod(true)}
                        sx={{
                            mr: 1
                        }}
                        endIcon={<KeyboardArrowDownTwoToneIcon fontSize="small" />}
                    >
                        {period.title}
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
                        {solucion.map((_period) => (
                            <MenuItem
                                key={_period.id}
                                onClick={() => {
                                    setPeriod(_period);
                                    setOpenMenuPeriod(false);
                                }}
                            >
                                {_period.title}
                            </MenuItem>
                        ))}
                    </Menu>

                </Grid>

                <Grid item lg={8}>
                    <Autocomplete

                        inputValue={valores}
                        value={selected}
                        onChange={(_, value) => handleChanged(value)}
                        autoHighlight
                        options={array}
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                            <li {...props}>
                                <Typography variant='span' color={option.stock === 0 ? 'error' : 'primary'}>{option.label}</Typography>
                                <Label color={option.stock === 0 ? 'error' : 'primary'}>{option.stock}</Label>
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={(e) =>
                                    setValores(e.target.value)

                                }
                                fullWidth

                                variant="outlined"
                                label={'Medicamentos'}
                                placeholder={t('Seleccione medicamento ...')}
                            />
                        )}
                    /></Grid>



                <Grid item lg={1.5}>
                    <TextField
                        label={'Cantidad'}
                        name={'cantidad'}
                        type={"number"}
                        value={value.cantidad}
                        onChange={(e) => setValue(x => {
                            return {
                                ...x,
                                [e.target.name]: e.target.value
                            }
                        })}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item lg={4}>
                    <TextField
                        label={'Intravenosa'}
                        name={'intravenosa'}
                        value={value.intravenosa}
                        onChange={(e) => setValue(x => {
                            return {
                                ...x,
                                [e.target.name]: e.target.value
                            }
                        })}
                        type={"number"}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item lg={4}>
                    <TextField
                        label={'Oral'}
                        name={'oral'}
                        value={value.oral}
                        onChange={(e) => setValue(x => {
                            return {
                                ...x,
                                [e.target.name]: e.target.value
                            }
                        })}
                        type={"number"}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item lg={4}>
                    <TextField
                        label={'Sanguinea'}
                        name={'sanguinea'}
                        value={value.sanguinea}
                        onChange={(e) => setValue(x => {
                            return {
                                ...x,
                                [e.target.name]: e.target.value
                            }
                        })}
                        type={"number"}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item lg={1}>
                    <Button
                        variant='contained'
                        onClick={() => handleBuscarPaciente()}
                    >
                        Agregar
                    </Button>
                </Grid>
            </Grid>



        </>
    )
}
