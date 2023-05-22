import { Card, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import PageHeader from './PageHeader'
import SearchCitas from './SearchCitas'
import { useTranslation } from 'react-i18next'
import useLayoutContext from 'src/hooks/useAuthLayout'
import ListaCitasTabla from './ListaCitas'


export default function ListaCitas() {

    const { citasLista, updateCitasLista } = useLayoutContext()
    const [lista, setLista] = useState([])
    const { t } = useTranslation();
    const [filtro, setFiltro] = useState({
        fecha: '',
        medico: '',
        paciente: '',
        especialidad: ''
    })
    const handleSetfiltro = (item) => {
        setFiltro(x => ({
            ...x,
            medico: item.medico,
            paciente: item.paciente,
            especialidad: item.especialidad
        }))
    }
    const handleSetfiltroFecha = (item) => {
        if (item !== null && item.toString() !== 'Invalid Date') {
            setFiltro(x => ({
                ...x,
                fecha: item.toISOString().split('T')[0]
            }))
        } else {
            setFiltro(x => ({
                ...x,
                fecha: ''
            }))
        }

    }
    useEffect(() => {
        let filtroFinal = filtro.fecha.length === 0 ? citasLista : citasLista.filter(x => x.fecha === filtro.fecha)
        if (filtro.medico.length > 0) {
            filtroFinal = filtroFinal.filter(x => x.datos.doctor.documento.includes(filtro.medico))
        }
        if (filtro.especialidad.length > 0) {
            filtroFinal = filtroFinal.filter(x => x.datos.doctor.especialidad.includes(filtro.especialidad))
        }
        if (filtro.paciente.length > 0) {
            filtroFinal = filtroFinal.filter(x => x.datos.paciente.paciente.numero_documento.includes(filtro.paciente))
        }


        setLista(filtroFinal)
    }, [filtro, citasLista])

    useEffect(() => {
        setLista(citasLista)
    }, [citasLista])

    useEffect(() => {
        updateCitasLista()
    }, [])

    return (
        <>
            <Helmet>
                <title>Lista de citas</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Grid
                sx={{
                    px: { xs: 0, md: 4 }
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                <Grid item xs={12}>
                    <Card>
                        <SearchCitas handleSetfiltro={handleSetfiltro} handleSetfiltroFecha={handleSetfiltroFecha} />
                        <Divider />

                        {lista.length === 0 ? (
                            <>
                                <Typography
                                    sx={{
                                        py: 10
                                    }}
                                    variant="h3"
                                    fontWeight="normal"
                                    color="text.secondary"
                                    align="center"
                                >
                                    {t("No se registran citas")}
                                </Typography>
                            </>
                        ) : (
                            <ListaCitasTabla lista={lista} />
                        )}
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
