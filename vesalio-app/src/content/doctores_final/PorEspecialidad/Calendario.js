import { Box, Card, Divider, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarioItem from './CalendarioItem'
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function CalendarioAgenda({ agignacionSelecteds }) {
    const [anio, setAnio] = useState(null)
    const [mes, setMes] = useState(null)
    const [calendario, setCalendario] = useState([])
    const [texto, setTexto] = useState('')
    const { aniosMeses } = useLayoutContext()


    useEffect(() => {

        if (anio !== null && mes !== null) {
            setCalendario(aniosMeses.filter(x => parseInt(x.anio_calendario) === anio && parseInt(x.mes_calendario) === mes));
            setTexto(aniosMeses.filter(x => parseInt(x.anio_calendario) === anio && parseInt(x.mes_calendario) === mes).length === 0
                ? '' :
                aniosMeses.filter(x => parseInt(x.anio_calendario) === anio && parseInt(x.mes_calendario) === mes)[0].mes_nombre
            )
        }

    }, [anio, mes, aniosMeses])

    useEffect(() => {

        let tzoffset = (new Date()).getTimezoneOffset() * 60000
        let hoy = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        setAnio(parseInt(hoy.split('T')[0].split('-')[0]))
        setMes(parseInt(hoy.split('T')[0].split('-')[1]))

    }, [])
    return (
        <Card >

            <Grid
                sx={{
                    px: { xs: 0, md: 4 },
                    py: 2
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                <Grid item xs={1}>
                    <IconButton
                        size="large"
                        // sx={{
                        //     float: "right",
                        //     mt: -1
                        // }}
                        color="secondary"
                        onClick={() => setMes(x => x - 1)}
                    >
                        <KeyboardArrowLeftIcon fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{ display: "flex", justifyContent: "center", justifyItems: "center" }}>
                        <Typography variant='h3'>{texto}</Typography>

                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        size="large"
                        // sx={{
                        //     float: "right",
                        //     mt: -1
                        // }}
                        color="secondary"
                        onClick={() => setMes(x => x + 1)}
                    >
                        <ChevronRightIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider />
            <CalendarioItem calendario={calendario} agignacionSelecteds={agignacionSelecteds}/>
        </Card>

    )
}
