import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import TabsGeneral from 'src/components/Tabs'
import Lista from './lista'
import Detallado from './detallado'

export default function Index() {

    const [datos, setDatos] = useState([])
    const [libreSistComp, setLibreSistComp] = useState([])
    const [ocupados, setOcupados] = useState([])
    const [tabs, setTabs] = useState([
        { value: '01', label: 'Lista', active: true },
        { value: '02', label: 'Detallado', active: false },
    ])

    useEffect(() => {
        const getDatos = async () => {
            try {

                const response = await axios.get(`http://200.121.91.211:4001/habitaciones`)
                setDatos(response.data.datos);
                setOcupados(response.data.ocupados);
                setLibreSistComp(response.data.libreSistComp)
            } catch (e) {
                console.log(e);
            }
        }
        getDatos()
        return () => {
            setDatos([]);
            setOcupados([]);
        };
    }, [])


    return (
        <>

            <Helmet>
                <title>Listado de camas</title>
            </Helmet>
            <PageTitleWrapper>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item lg={10}>
                        <Typography variant="h3" component="h3" gutterBottom>
                            {'Lista de Camas'}
                        </Typography>
                    </Grid>
                </Grid>
            </PageTitleWrapper>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 },
                    mt: 1
                }}
                container
                justifyContent={"center"}
                direction="row"
                alignItems="center"
            >
                <Grid item lg={1} sx={{ mx: 2 }}>
                    <TabsGeneral setTabs={setTabs} tabs={tabs} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    {
                        tabs.find(x => x.active).value === '01' && <Lista ocupados={ocupados} datos={datos} />
                    }
                    {
                        tabs.find(x => x.active).value === '02' && <Detallado ocupados={ocupados} datos={datos} libreSistComp={libreSistComp} />
                    }
                </Grid>



            </Grid>

        </>
    )
}
