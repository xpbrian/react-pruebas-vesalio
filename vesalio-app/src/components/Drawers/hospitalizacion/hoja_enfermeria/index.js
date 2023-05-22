import { Grid } from '@mui/material'
import { useState } from 'react'
import TabsGeneral from 'src/components/Tabs'
import Observacion from './observacion'
import ControlBalance from './control_balance'
import Indicaciones from './indicaciones'

export default function Index() {
    const [tabs, setTabs] = useState([
        { value: '01', label: 'Indicaciones', active: true },
        { value: '03', label: 'Notas de enfermeria', active: false },
        { value: '04', label: 'Control y balance', active: false },
        // { value: '05', label: 'Kardex', active: false },
    ])
    return (
        <>

            <Grid
                sx={{
                    px: { xs: 0, md: 2 }
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <TabsGeneral setTabs={setTabs} tabs={tabs} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    {tabs.find(x => x.active).value === '01' && <Indicaciones />}
                    {tabs.find(x => x.active).value === '03' && <Observacion />}
                    {tabs.find(x => x.active).value === '04' && <ControlBalance />}
                </Grid>
            </Grid>

        </>
    )
}
