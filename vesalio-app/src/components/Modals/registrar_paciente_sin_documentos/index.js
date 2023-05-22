import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import {
    Button,
    TextField,
    Grid,
    Zoom,
} from '@mui/material';
import axios from 'axios';
import confirmSweetAlert from 'src/utils/confirm';




export default function Register() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const [text, setText] = useState([
        { id: 'paternos', label: 'Apellido paterno', type: 'text', value: '', error: false, helperText: '', disabled: false, tipo: 'text', xs: 12, lg: 12, md: 12 },
        { id: 'maternos', label: 'Apellido materno', type: 'text', value: '', error: false, helperText: '', disabled: false, tipo: 'text', xs: 12, lg: 12, md: 12 },
        { id: 'nombres', label: 'Nombres', value: '', type: 'text', error: false, helperText: '', disabled: false, tipo: 'text', xs: 12, lg: 12, md: 12 },
    ])

    const handleChangedText = async (e) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                value: item.id === e.target.name ? e.target.value : item.value,
            })
            return arr;
        }, []))

    }
    const handleGuardarRegistro = async () => {
        let errors = []
        if (text.filter(x => x.value.length === 0).length > 0) {
            errors.push('No debe existir campos vacios')
        }
        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(t(x), {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            }))
        } else {
            let rpta = await confirmSweetAlert('Registrar usuario', '¿Seguro que desea registrar sus datos', 'warning', true)
            let envio = text.reduce((arr, item) => {
                arr.push({ id: item.id, value: item.value })
                return arr
            }, [])

            if (rpta) {
                const enviar = await axios.post('http://apis-vesalio.com.pe/registerUsuarioSin', {
                    datos: [...envio,
                    ]
                })
                let msj = {
                    msj: enviar.data.msj,
                    icon: enviar.data.rpta === 1 ? 'success' : 'error'
                }
                confirmSweetAlert('Registrar', msj.msj, msj.icon, false)
            }
        }
    }
    return (
        <>
            <>
                <Grid alignItems="center" container spacing={3} sx={{ p: 2 }}>
                    {text.map(x => <Grid item xs={x.xs} lg={x.lg} md={x.md} key={x.id}>
                        {
                            x.tipo === 'text' && <TextField
                                fullWidth
                                label={x.label}
                                name={x.id}
                                type={x.type}
                                value={x.value}
                                disabled={x.disabled}
                                variant="outlined"
                                onChange={(e) => {
                                    if (e.target.name === 'paternos' || e.target.name === 'maternos' || e.target.name === 'nombres') {
                                        let numeros = '0123456789°!"#$%&/()=?¡*¨[]_:;><'
                                        let inserta = true
                                        numeros.split('').map((x) => {
                                            if (e.target.value.includes(x)) {
                                                inserta = false
                                            }
                                            return false
                                        })
                                        if (inserta) {
                                            handleChangedText(e)
                                        }
                                    } else {
                                        handleChangedText(e)
                                    }

                                }}
                            />
                        }

                    </Grid>
                    )}
                    <Grid item xs={12} lg={12} md={12} >
                        <Button
                            sx={{
                                mt: 3
                            }}
                            color="primary"
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={handleGuardarRegistro}
                        >
                            {t('Registrar')}
                        </Button>
                    </Grid>
                </Grid>



            </>


        </>
    )
}
