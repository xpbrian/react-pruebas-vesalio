import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import TabsGeneral from 'src/components/Tabs'
import Hospitalizacion from './Hospitalizacion'
import AltaEmergencia from './AltaEmergencia'

export default function Index({ title }) {

    const [tabs, setTabs] = useState([
        { value: '01', label: 'Alta', active: true },
        { value: '02', label: 'Hospitalizacion', active: false },
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
                    tabs.find(x => x.active).value === '02' && <Hospitalizacion />
                }
                {
                    tabs.find(x => x.active).value === '01' && <AltaEmergencia />
                }



            </Grid>



        </>
    )
}
