import { Autocomplete, Button, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';



export default function Medicos({ handleDatosEgresos }) {
    const { t } = useTranslation();
    const [egreso, setEgreso] = useState('')
    const [cantidad, setCantidad] = useState('')
    const handleChanged = (_, newValue) => {
        if (newValue !== null) {
            setEgreso(newValue.title)
        }
    }

    return (
        <Grid alignItems="center" justifyContent={"center"} container spacing={1} sx={{ pb: 3 }} >
            <Grid item xs={12} lg={9} md={6}>
                <Autocomplete
                    fullWidth
                    onChange={handleChanged}
                    options={[
                        { id: 'orina', title: 'Orina' },
                        { id: 'diuresis', title: 'Diuresis' },
                        { id: 'deposiciones', title: 'Deposiciones' },
                        { id: 'sng', title: 'SNG Y vomitos' },
                        { id: 'mediastrial', title: 'DJE mediastrial' },
                        { id: 'plueral_izq', title: 'DJE plueral izq.' },
                        { id: 'plueral_drc', title: 'DJE plueral drc.' },
                        { id: 'abdominal', title: 'DJE abdominal' },
                        { id: 'biliar', title: 'DJE biliar' },
                        { id: 'Otros', title: 'Otros' },
                    ]}

                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label={t('Egresos')}
                            placeholder={t('Seleccione egreso')}
                        />
                    )}
                />
            </Grid>
            <Grid item lg={1.5}>
                <TextField
                    label={'Cantidad'}
                    type={"number"}
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    fullWidth
                    variant="outlined"
                />
            </Grid>
            <Grid item lg={1}>
                <Button
                    variant='contained'
                    onClick={() => handleDatosEgresos({ egreso, cantidad })}
                >
                    Agregar
                </Button>
            </Grid>
        </Grid>
    )
}
