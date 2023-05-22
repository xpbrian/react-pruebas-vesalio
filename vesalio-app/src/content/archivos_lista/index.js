import React, { useState } from 'react'
import { Card, Grid, Zoom } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import PageHeader from './PageHeader'
// import TabsGeneral from 'src/components/Tabs'
import SearchFiltro from './SearchFiltro'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import ListaCitasTabla from './Lista'



export default function ListaCitas() {
    // const [tabs, setTabs] = useState([{ value: '01', label: 'Todos', active: true }, { value: '02', label: 'Por App', active: false }])
    const [filter, setFilter] = useState({ fecha: '' })
    const { enqueueSnackbar } = useSnackbar();
    const [datos, setDatos] = useState([])

    const handleChangedFilter = (id, value) => {
        console.log(value);
        setFilter(x => {
            return {
                ...x,
                [id]: value
            }
        })
    }
    const handleBuscarFiltro = async () => {
        let errors = [];
        if (filter.fecha === '') {
            errors.push('Debe seleccionar como minimo un tipo de filtro')
        }

        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            }))
        } else {
            enqueueSnackbar('Aplicando filtros', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
            const rpta = await axios.post(`http://apis-vesalio.com.pe/turnoProgamadoListaFecha`, { fechaInicio: filter.fecha, fechaFin: filter.fecha, solaFecha: true })
            setDatos(rpta.data);
        }
    }

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
