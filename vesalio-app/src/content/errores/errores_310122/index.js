import React, { useEffect, useState } from 'react'
import { Card, Grid, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import axios from 'axios'
import ListaCitasTabla from './Lista'


export default function ListaCitas() {
    // const [tabs, setTabs] = useState([{ value: '01', label: 'Todos', active: true }, { value: '02', label: 'Por App', active: false }])
    const [datos, setDatos] = useState([])
    useEffect(() => {
        const getDatos = async () => {
            const rpta = await axios.get(`http://apis-vesalio.com.pe/errores`)
            setDatos(rpta.data.filter(x=>x.usuarioCuenta.tipo_usuario.id ==='01'))
        }
        getDatos()
    }, [])
    return (
        <>
            <Helmet>
                <title>Lista de errores</title>
            </Helmet>
            <PageTitleWrapper>
                <Typography variant="h3" component="h3" gutterBottom>
                    {'Reporte solicitado 30-01-2023'}
                </Typography>
            </PageTitleWrapper>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 }
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                <Grid item xs={12}>
                    <Card>
                        {datos.length > 0 && <ListaCitasTabla datos={datos} />}

                    </Card>

                </Grid>
            </Grid>
        </>
    )
}
