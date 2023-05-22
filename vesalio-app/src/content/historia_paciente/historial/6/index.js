import { Box, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function CambioAntecedentesPatologicos({ item }) {
  const [datos, setDatos] = useState(null)
  const [title, setTitle] = useState('')
  const [contenido, setContenido] = useState(null)
  useEffect(() => {
    let obj = JSON.parse(item.datos)
    setDatos(obj);
  }, [item])

  useEffect(() => {
    const getDatos = async (antheredfamid) => {
      try {
        const citas = await axios.get(`http://200.121.91.211:4001/antecedenteHeredoFamiliar/${antheredfamid}`)
        setContenido(citas.data)
      } catch (e) {
        console.log(e);
      }

    }
    if (datos !== null) {
      setTitle(datos[0].accion === 'agregado' ? 'Agrego correctamente su antecedente patologico heredado de familiar' : 'Borro correctamente su antecedente patologico heredado de familiar')
      getDatos(datos[0].antheredfamid)
    }

  }, [datos])

  return (
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
      <Grid item lg={12} sx={{ mt: 2 }}>
        <Typography variant='h5'><b>{title}</b></Typography>
      </Grid>
      <Grid item lg={12}>
        {contenido !== null && <Box sx={{ my: 1 }}>
          <Typography variant='h6'>{contenido[0].nombre}</Typography>
          <br />
          <Typography variant='p'>{contenido[0].comentario}</Typography>
        </Box>}

      </Grid>

    </Grid>
  )
}
