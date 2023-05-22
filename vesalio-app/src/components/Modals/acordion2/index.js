import { Grid } from '@mui/material';
import { useState } from 'react';
import TabsGeneral from 'src/components/Tabs';
import useLayoutContext from 'src/hooks/useAuthLayout'
import Result from './block'
import ResultsAseguradora from './ResultsAseguradora'

export default function Index() {
    const { modalOpen } = useLayoutContext()
    const [tabs, setTabs] = useState([{ value: '01', label: 'Por aseguradora', active: true }, { value: '02', label: 'Por Paciente', active: false }])
    return (
        <>
            <TabsGeneral tabs={tabs} setTabs={setTabs} />
            <Grid container spacing={4}>

                <Grid item xs={12} sm={12} lg={12}>
                    {
                        tabs.find(x => x.active).value === '02' && <Result datos={modalOpen.item.datos} />
                    }
                    {
                        tabs.find(x => x.active).value === '01' && <ResultsAseguradora datos={modalOpen.item.datos.reduce((arr, item) => {
                            let found = arr.findIndex(x => x.id_obra === item.id_obra)
                            if (found < 0) {
                                arr.push({ ...item, cantidadTotal: 1 })
                            } else {
                                arr[found].cantidadTotal += 1
                            }
                            return arr
                        }, [])} />
                    }
                </Grid>
            </Grid>

        </>
    )
}
