import { Divider, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import TabsGeneral from 'src/components/Tabs'
import PageHeader from './Pageheader'
import PrimerReporte from './Reporte1'

export default function Index() {
    const [tabs, setTabs] = useState([{ value: '01', label: 'Reporte 1', active: true }, { value: '02', label: 'Reporte 2', active: false }, { value: '03', label: 'Reporte 3', active: false }])
    const [listaPrimer, setListaPrimer] = useState([])
    useEffect(() => {
        const getDatos = async () => {
            const response = await axios.get(`http://200.121.91.211:4001/reporteMarchino`)
            setListaPrimer(response.data)
        }
        getDatos()
    }, [])

    return (
        <>
            <Helmet>
                <title>Reportes</title>
            </Helmet>
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
                <Grid item xs={12}>
                    <PageHeader />
                </Grid>
                <Grid item xs={2}>
                    <TabsGeneral setTabs={setTabs} tabs={tabs} />
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ mt: -4 }} />
                    {
                        tabs.find(x => x.active).value === '01' && <PrimerReporte listaPrimer={listaPrimer} array = {[331,32,333,334,335,336,337,338,339]} />
                    } 
                </Grid>
            </Grid>
        </>
    )
}
