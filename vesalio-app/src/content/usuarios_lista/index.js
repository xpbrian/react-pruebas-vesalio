import { Card, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import PageHeader from './PageHeader'
import useLayoutContext from 'src/hooks/useAuthLayout'
import ListaCitasTabla from './ListaCitas'


export default function ListaCitas() {

    const { usuariosLista } = useLayoutContext()
    const [lista, setLista] = useState([])

    useEffect(() => {
        setLista(usuariosLista)
    }, [usuariosLista])

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
                    px: { xs: 0, md: 4 }
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                <Grid item xs={12}>
                    <Card>
                        {/* <SearchCitas handleSetfiltro={handleSetfiltro} handleSetfiltroFecha={handleSetfiltroFecha} /> */}
                        <Divider />

                        {lista.length === 0 ? (
                            <>
                                <Typography
                                    sx={{
                                        py: 10
                                    }}
                                    variant="h3"
                                    fontWeight="normal"
                                    color="text.secondary"
                                    align="center"
                                >
                                    {"No se registran Usuarios"}
                                </Typography>
                            </>
                        ) : (
                            <ListaCitasTabla lista={lista} />
                        )}
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
