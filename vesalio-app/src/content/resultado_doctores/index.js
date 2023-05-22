import { Button, Card, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import PageHeader from './PageHeader'
import Result from './Results'



export default function Index() {
    const [filtro, setFiltro] = useState('')
    const [lista, setLista] = useState([])


    const handleEnviar = async () => {
        if (filtro.length > 0) {
            const enviar = await axios.post(`http://apis-vesalio.com.pe/resultadosMedicos`, { paciente: filtro })
            setLista(enviar.data);
        }

    }
   
    return (
        <>

            <Helmet>
                <title>Resultados Médicos</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Card sx={{ p: 2, mx: 3 }}>
                <Grid
                    container
                    direction="row"
                    sx={{ px: 2 }}
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                >

                    <Grid item lg={6} xs={12} >
                        <TextField

                            fullWidth
                            label={'Paciente'}
                            name={'paciente'}
                            type={'text'}
                            value={filtro}
                            variant="outlined"
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </Grid>

                    <Grid item lg={2} xs={4}>
                        <Button variant='contained' onClick={() => handleEnviar()} sx={{ mt: .5 }}>
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
            </Card>

            <Result lista={lista} />

        </>
    )
}
