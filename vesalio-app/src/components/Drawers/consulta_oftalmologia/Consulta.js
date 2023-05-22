import { Grid, TextField, Typography } from '@mui/material'
import ComponenteHTML from '../consulta_ambulatoria/ComponenteHTML'
import React from 'react'

export default function Consulta({
    text,handleChangedTextState
}) {
    return (
        <>
            <Grid item lg={12} sx={{ mx: 2 }}>
                <Typography variant="h5" sx={{ mb: 1 }}><b>Tiempo de enfermedad</b></Typography>
                <TextField value={text.find(x => x.id === 'tiempo').text} onChange={(e) => handleChangedTextState(e.target.value, 'tiempo')} />
            </Grid>
            <Grid item lg={12} sx={{ mx: 2 }}>
                <ComponenteHTML text={text.find(x => x.id === 'motivo')} handleChangedTextState={handleChangedTextState} title={'Motivo de consulta'} />
            </Grid>
            <Grid item lg={12} sx={{ mx: 2 }}>
                <ComponenteHTML text={text.find(x => x.id === 'enfermedad_actual')} handleChangedTextState={handleChangedTextState} title={'Enfermedad actual'} />
            </Grid>
        </>
    )
}
