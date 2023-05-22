import React, { useEffect, useState } from 'react'
import { Card, Grid, Zoom } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import PageHeader from './PageHeader'
// import TabsGeneral from 'src/components/Tabs'
import SearchFiltro from './SearchFiltro'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import ListaCitasTabla from './Lista'
// import useLayoutContext from 'src/hooks/useAuthLayout'
import useAuth from 'src/hooks/useAuth'



export default function ListaCitas() {
    // const { medicos } = useLayoutContext()
    const { user } = useAuth()
    const [filter, setFilter] = useState({ fecha: new Date().toISOString().split('T')[0], paciente: null, tipo_paciente: 'documento_paciente', especialidad: null, doctor: null })
    const { enqueueSnackbar } = useSnackbar();
    const [datos, setDatos] = useState([])
    const handleChangedFilter = (id, value) => {
        setFilter(x => {
            return {
                ...x,
                [id]: value
            }
        })
    }
    const handleBuscarFiltro = async () => {
        let errors = [];
        if (filter.fecha === '' && filter.paciente === null && filter.especialidad === null && filter.doctor === null) {
            errors.push('Debe seleccionar como minimo un tipo de filtro')
        }

        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1000
            }))
        } else {
            enqueueSnackbar('Aplicando filtros', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1000
            })

            const rpta = await axios.post(`http://200.121.91.211:4001/turnoProgamadoListaFechaMedico`, { ...filter, doctor: user.datos.numero_documento, tipo_usuario: user.cuenta.tipo_usuario.id })
            console.log(rpta);
            setDatos(rpta.data);
        }
    }
    useEffect(() => {
        const getDatos = async () => {
            const rpta = await axios.post(`http://200.121.91.211:4001/turnoProgamadoListaFechaMedico`, { ...filter, doctor: user.datos.numero_documento, tipo_usuario: user.cuenta.tipo_usuario.id })
            console.log(rpta);
            setDatos(rpta.data);
        }

        getDatos()

    }, [user])
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
                    px: { xs: 0, md: 2 }
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                <Grid item xs={12}>
                    <Card sx={{ py: 2 }}>
                        <SearchFiltro filter={filter} handleChangedFilter={handleChangedFilter} handleBuscarFiltro={handleBuscarFiltro} />
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        {datos.length > 0 && <ListaCitasTabla datos={datos} />}

                    </Card>

                </Grid>
            </Grid>
        </>
    )
}
