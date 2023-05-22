// import { Grid } from "@mui/material";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

export default function Index({ item }) {
  const [datos, setDatos] = useState(null)

  useEffect(() => {
    setDatos(item.datos);
  }, [item])

  useEffect(() => {

    const getDatos = async (consultaId) => {
      try {
        const citas = await axios.get(`http://200.121.91.211:4001/consultaOftalomologia/${consultaId}`)
        console.log(citas);

      } catch (e) {
        console.log(e);
      }
    }
    if (datos !== null) {
      getDatos(datos)
    }

  }, [datos])

  return (
    // <Grid
    //   sx={{
    //     px: { xs: 0, md: 2 }
    //   }}
    //   container
    //   direction="row"
    //   justifyContent="center"
    //   alignItems="stretch"
    //   spacing={1}
    // >

    // </Grid>
    <>
      <Typography variant="h4">Hospitalización</Typography>
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
        <Grid item lg={9} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth>Imprimir</Button>
        </Grid>
      </Grid>

    </>
  )
}
