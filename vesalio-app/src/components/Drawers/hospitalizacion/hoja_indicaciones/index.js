import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import TabsGeneral from 'src/components/Tabs'
import Historia from './Historia'
import Indicaciones from '../indicaciones'

export default function Index({ title }) {

    const [tabs, setTabs] = useState([
        { value: '01', label: 'Historial', active: true },
        { value: '02', label: 'Indicaciones', active: false },
    ])

    return (
        <>
            <Typography variant='h4'>{title}</Typography>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 },
                    mt: 1
                }}
                container
                justifyContent={"center"}
                direction="row"
                alignItems="stretch"
                spacing={2}
            >
                <Grid item lg={4} sx={{ mx: 2 }}>
                    <TabsGeneral setTabs={setTabs} tabs={tabs} />

                </Grid>

                {
                    tabs.find(x => x.active).value === '02' && <Indicaciones />
                }

                {
                    tabs.find(x => x.active).value === '01' && <Historia />
                }

            </Grid>



        </>
    )
}
