import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Zoom } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import useAuth from 'src/hooks/useAuth';
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';


export default function AddCoberturas() {
    const { coberturas,mostrarComponent } = useLayoutContext();
    const { user, login } = useAuth()
    const navigate = useNavigate();
    const [aseguradora, setAseguradora] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const [text, setText] = useState([
        { id: 'cobertura', label: 'Aseguradora', value: '', tipo: 'select', xs: 12, lg: 12, md: 12, enviar: true },
    ])
    useEffect(() => {
        setAseguradora(coberturas);
        console.log(coberturas);
    }, [coberturas])

    const handleChangedText = async (e) => {

        setText(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                value: item.id === e.target.name ? e.target.value : item.value,
            })
            return arr;
        }, []))
    }
    const handleGuardar = async () => {
        let errors = []
        if (text.find(x => x.id === 'cobertura').value === '00') {
            errors.push('Debe seleccionar una aseguradora')
        }
        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            }))
        } else {
            let rpta = await confirmSweetAlert('Registrar aseguradora', '¿Seguro que desea registrar su aseguradora', 'warning', true)
            if (rpta) {
                const enviar = await axios.post('http://apis-vesalio.com.pe/registerCobertura', {
                    datos: [
                        { id: 'cobertura', value: text.find(x => x.id === 'cobertura').value },
                        { id: '_id', value: user._id },
                        { id: 'descripcionCobertura', value: aseguradora.find(y => y.id === text.find(x => x.id === 'cobertura').value).nombre },
                    ]
                })
                let msj = {
                    msj: enviar.data.msj,
                    icon: enviar.data.rpta === 1 ? 'success' : 'error'
                }
                confirmSweetAlert('Registrar Aseguradora', msj.msj, msj.icon, false)
                if (enviar.data.rpta === 1) {
                    mostrarComponent({
                        contenido: '',
                        estado: false,
                        size: 'xs'
                    }, 'modalOpen')
                    navigate('/citas/mis-citas')
                    login(user._id)
                }
            }
        }
    }
    return (
        <>
            <Grid alignItems="center" container spacing={3} sx={{ p: 3 }}>
                {text.length > 0 && text.map(x => <Grid item xs={x.xs} lg={x.lg} md={x.md} key={x.id}>

                    {
                        x.tipo === 'select' && <FormControl fullWidth variant="outlined">
                            <InputLabel>{x.label}</InputLabel>
                            <Select
                                value={x.value}
                                label={x.label}
                                name={x.id}
                                onChange={(e) => handleChangedText(e)}

                            >
                                {
                                    x.id === 'cobertura' && aseguradora.sort(function (a, b) {
                                        if (a.nombre > b.nombre) {
                                            return 1;
                                        }
                                        if (a.nombre < b.nombre) {
                                            return -1;
                                        }
                                        return 0;
                                    }).map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))
                                }


                            </Select>
                        </FormControl>
                    }
                </Grid>
                )}
                <Grid item xs={12} lg={12} md={12} >
                    <Button
                        sx={{
                            mt: 3,
                        }}
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => handleGuardar()}
                    >
                        {'Guardar cambios'}
                    </Button>
                </Grid>

            </Grid>

        </>
    )
}
