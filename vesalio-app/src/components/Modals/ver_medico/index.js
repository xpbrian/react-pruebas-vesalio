import { Box, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'

export default function Index() {
    const { modalOpen } = useLayoutContext()
    const [dato, setDato] = useState(null)

    useEffect(() => {
        const getDatos = async (id) => {
            const medico = await axios.get(`http://apis-vesalio.com.pe/medicoSeleccionado/${id}`)
            const medicoRpta = medico.data
            if (medicoRpta.error === undefined) {
                let arr = Object.keys(medicoRpta).map(key => {
                    return {
                        descripcion: medicoRpta[key],
                        id: key
                    }
                })
                setDato(arr)
            }
        }
        getDatos(modalOpen.item.documento)

    }, [modalOpen])

    return (
        <>
            {dato !== null && <Box sx={{ m: 2 }}>
                <Typography
                    variant="h4"
                    sx={{
                        mb: 1
                    }}
                >
                    {dato.find(x => x.id === 'Descripcion').descripcion}
                </Typography>
                <Grid container spacing={3} justifyContent="center" mt={1}>
                    {dato.filter(x => x.id !== 'Descripcion'   && x.id !== 'Documento' ).map((x, index) => <Grid item key={index} xs={12} sm={12} md={12}>
                        <TextField
                            fullWidth
                            label={x.id}
                            value={x.descripcion}
                            disabled
                            variant="outlined" />
                    </Grid>)}
                </Grid>

            </Box>}
        </>

    )
}
