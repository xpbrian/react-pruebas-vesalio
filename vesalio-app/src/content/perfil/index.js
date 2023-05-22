import { useState } from 'react'
import { Card, Grid } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import TabsGeneral from 'src/components/Tabs'
import DatosPersonales from './DatosPersonales'
import DatosCuenta from './DatosCuenta'
import DatosFamiliares from './DatosFamiliares'

export default function Index() {
  const [tabs, setTabs] = useState([
    { value: 'personales', label: 'Datos', active: true },
    { value: 'familiares', label: 'Familiares', active: false },
    { value: 'cuentas', label: 'Cuenta', active: false },
  ])
  return (
    <>
      <Helmet>
        <title>Clínica Vesalio - Perfil</title>
      </Helmet>
      <Grid
        sx={{
          px: { xs: 1, md: 4 }
        }}
        container
        direction="row"
        // justifyContent="center"
        // alignItems="stretch"
        spacing={2}
      >
        <Grid item xs={12} sx={{ mt: 3, m: 2 }}>
          <TabsGeneral setTabs={setTabs} tabs={tabs} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            {
              tabs.find(x => x.active).value === 'personales' && <DatosPersonales />
            }
            {
              tabs.find(x => x.active).value === 'familiares' && <DatosFamiliares /> // correcto
            }
            {
              tabs.find(x => x.active).value === 'cuentas' && <DatosCuenta />
            }
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
