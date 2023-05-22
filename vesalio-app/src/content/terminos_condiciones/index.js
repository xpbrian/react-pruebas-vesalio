import { Box, Card, Grid } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import PageHeader from './PageHeader'
import pdf from 'src/pdf/prueba.pdf'
import PdfItem from 'src/pdf/PdfAll'
import Scrollbar from 'src/components/Scrollbar';

export default function ListaCitas() {


    return (
        <>
            <Helmet>
                <title>Términos y condiciones</title>
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
                alignItems="center"
                spacing={4}
            >
                <Grid item xs={12} lg={9}>
                    <Card>

                        <Box
                            justifyContent={'center'}
                            alignItems={'center'}
                            sx={{ height: 750, width: 'auto' }}>
                            <Scrollbar>
                                <PdfItem
                                    pdf={pdf}
                                />
                            </Scrollbar>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
