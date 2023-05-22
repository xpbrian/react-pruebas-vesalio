import { Button, Card, CardHeader, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Endocrinologia({ handleGuardarCheck, seleccionados, selected, setSeleccionados, text, handleChangedTextState }) {

    const [lista, setLista] = useState([])
    const [checkeds, setCheckeds] = useState([])

    useEffect(() => {
        setLista(selected.componentes)
    }, [selected])

    useEffect(() => {
        setCheckeds(seleccionados)
    }, [seleccionados])


    /*
    const handleRequiereTransfusion = (e) => {
        console.log(e);
    }
    */
    const handleGuardar = (evento, codigo) => {
        if (evento.target.checked) {
            setSeleccionados(x => [...x, codigo])
        } else {
            setSeleccionados(x => x.filter(y => y !== codigo))
        }

    }

    return (
        <>

            <Grid container spacing={1} sx={{ my: 1, pb: 3, px: 2, mt: 2 }} >
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Typography variant="h3" sx={{ mb: 1 }}><b>{selected.titulo}</b></Typography>

                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Información clínica</b></Typography>
                    <TextField
                        fullWidth
                        label={''}
                        multiline
                        rows={3}
                        type={'text'}
                        value={text.find(x => x.id === 'infTomografia').text}
                        variant="outlined"
                        onChange={(e) => handleChangedTextState(e.target.value, 'infTomografia')}
                    />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Impresión diagnóstica</b></Typography>
                    <TextField
                        fullWidth
                        label={''}
                        multiline
                        rows={3}
                        type={'text'}
                        value={text.find(x => x.id === 'impTomografia').text}
                        variant="outlined"
                        onChange={(e) => handleChangedTextState(e.target.value, 'impTomografia')}
                    />
                </Grid>
            </Grid>

            <Grid alignItems="center" justifyContent={"center"} container spacing={1} sx={{ my: 1, pb: 3, px: 2, mt: 2 }} >
                {
                    lista.reduce((arr, item) => {
                        let existe = arr.findIndex(x => x.subtituloCodigo === item.subtituloCodigo)
                        if (existe < 0) {
                            arr.push({ ...item, contenido: [item] })
                        } else {
                            arr[existe].contenido.push(item)
                        }
                        return arr
                    }, []).map((value, ix) => <Grid key={ix} item xs={12} lg={12} md={12}>
                        <Card sx={{ p: 2 }}>
                            <CardHeader title={<Typography variant='h5'>{value.subtitulo.length === 0 ? 'Sin titulo' : value.subtitulo.toUpperCase()}</Typography>} />
                            <Grid container spacing={1} sx={{ my: 1, pb: 3, px: 2, mt: 2 }} >
                                {
                                    value.contenido.map((item) => <Grid item lg={4} md={4} key={item.nombreCodigo} >
                                        <FormControlLabel onChange={(e) => handleGuardar(e, item.nombreCodigo)}
                                            control={<Checkbox checked={checkeds.filter(x => x === item.nombreCodigo).length !== 0} />}
                                            label={<Typography variant="h5" sx={{ mb: 1 }}>{item.nombre.toUpperCase()} {' '}{item.nombreCodigo}</Typography>} /></Grid>)
                                }
                            </Grid>

                        </Card>

                    </Grid>)
                }
            </Grid>
            <Grid container spacing={1} sx={{ my: 1, pb: 3, px: 2, mt: 2 }} >
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Button fullWidth variant='contained' sx={{ p: 2 }}
                        onClick={handleGuardarCheck}> Grabar </Button>
                </Grid>
            </Grid>

        </>
    )
}
