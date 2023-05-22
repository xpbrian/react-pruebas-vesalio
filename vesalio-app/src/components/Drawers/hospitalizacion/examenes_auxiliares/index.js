import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import TabsGeneral from 'src/components/Tabs'
import useLayoutContext from 'src/hooks/useAuthLayout'
import NuevoEstudio from './NuevoEstuduio'
import Lista from './Lista'

export default function Index({ title }) {
    const { drawerOpen } = useLayoutContext()
    const [lista, setLista] = useState([])

    const getDatos = async () => {
        try {
            const res = await axios.get(`http://200.121.91.211:4001/estudiosEmergencia/${drawerOpen.item.boton.persona_internacion_id}`)
            setLista(res.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getDatos()
    }, [])
    useEffect(() => { }, [lista])
    const [tabs, setTabs] = useState([
        { value: '01', label: 'Historico', active: true },
        { value: '02', label: 'Registrar nuevo', active: false },
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
                {tabs.find(x => x.active).value === '02' && <NuevoEstudio getDatos={getDatos} />}

                {tabs.find(x => x.active).value === '01' && <Grid item lg={12} sx={{ mx: 2 }}> <Lista lista={lista} /></Grid>}

            </Grid>



        </>
    )
}
