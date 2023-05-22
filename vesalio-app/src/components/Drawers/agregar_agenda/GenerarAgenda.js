import { Box, Card, Divider, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarioItem from './Calendario'
import axios from 'axios';

export default function CalendarioAgenda({ setDiaSelected,diaSelected }) {
    const [anio, setAnio] = useState(null)
    const [mes, setMes] = useState(null)
    const [calendario, setCalendario] = useState([])
    const [texto, setTexto] = useState('')

    useEffect(() => {
        const getDatos = async (a, m) => {
            const aniosMeses = await axios.post(`http://apis-vesalio.com.pe/fechasTotal`, { anio: a, mes: m })
            if (aniosMeses.data.length > 0) {
                setCalendario(aniosMeses.data);
                setTexto(aniosMeses.data.length === 0
                    ? '' :
                    aniosMeses.data[0].mes_nombre
                )
            }
        }
        if (anio !== null && mes !== null) {
            getDatos(anio, mes)

        }
    }, [anio, mes])

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
            <CalendarioItem calendario={calendario} setDiaSelected={setDiaSelected} diaSelected={diaSelected} />
        </Card>

    )
}
