import { Card, Grid } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import useLayoutContext from 'src/hooks/useAuthLayout'
import ListaCitasTabla from './Lista'
import PageHeader from './PageHeader'

export default function Index() {
    const { inconformidades } = useLayoutContext()
    const [datos, setDatos] = useState([])
    useEffect(() => {
        setDatos(inconformidades)
    }, [inconformidades])

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
                    <Card>
                        {datos.length > 0 && <ListaCitasTabla datos={datos} />}

                    </Card>

                </Grid>
            </Grid>
        </>
    )
}
