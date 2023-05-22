import { Grid } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import PageHeader from './PageHeader'
// import SegundoReporte from './segundo-reporte'
// import CuartoReporte from './cuarto-reporte'
// import QuintoReporte from './quinto-reporte'
import PrimerReporte from './primer-reporte'
import CantidadDeserciones from './cantidad_derserciones'
import CantidadCitasPaciente from './cantidad_citas_paciente'
import MedicosSemanas from './medicos_semanas'
import ReporteQuinto from './reporte_quinto'

export default function Index() {
    return (
        <>

            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Grid
                sx={{
                    px: 4
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                <Grid item lg={12}>
                    <MedicosSemanas />
                </Grid>
                <Grid item lg={12}>
                    <ReporteQuinto />
                </Grid>
                <Grid item lg={12}>
                    <PrimerReporte />
                </Grid>
                <Grid item lg={12}>
                    <CantidadCitasPaciente />
                </Grid>
                <Grid item lg={12}>
                    <CantidadDeserciones />
                </Grid>

                {/* <Grid item lg={12}>
                    <QuintoReporte />
                </Grid>
                <Grid item xs={12}>
                    <SegundoReporte />
                </Grid>
                <Grid item xs={12}>
                    <CuartoReporte />
                </Grid> */}

            </Grid>
        </>
    )
}
