import { useEffect, useState } from 'react'
import { Grid, List, ListItemButton, Typography, styled, ListItemText } from '@mui/material';
import axios from 'axios';
import Lista from '../1/Lista'
import ContenidoHTMLText from '../1/ContenidoHTMLText';

const ListItemWrapper = styled(ListItemButton)(
  () => `
  
      &.MuiButtonBase-root {
        border-radius: 0;
      }
  `
);

export default function Enfermeria({ item }) {
  const [datos, setDatos] = useState(null)
  const [contenido, setContenido] = useState(null)
  const [prestaciones, setPrestaciones] = useState([])

  useEffect(() => {
    setDatos(item.datos);
  }, [item])
  useEffect(() => {
    const getDatos = async (consultaId) => {
      try {
        
        const citas = await axios.get(`http://200.121.91.211:4001/enfermeria/${consultaId}`)
        setContenido(citas.data.datos.length > 0 ? citas.data.datos : null)
        setPrestaciones(citas.data.prestaciones)

      } catch (e) {
        console.log(e);
      }
    }
    if (datos !== null) {
      getDatos(datos)
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
      {contenido !== null && <>
        <Grid item lg={12} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Consulta {' '}{contenido[0].tipovezqueconsulta}</b></Typography>
        </Grid>
        {
          contenido[0].mostrarMedidcion === 'SI' && <Grid item lg={12} sx={{ mt: 2 }}>
            <Lista contenido={contenido} />
          </Grid>
        }

        <Grid item lg={3} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Diagnostico: </b></Typography>
        </Grid>
        <Grid item lg={9} sx={{ mt: 2 }}>
          <List disablePadding component="div">

            {prestaciones.map((value, ix) => {
              return (
                <ListItemWrapper
                  sx={{
                    py: 0,
                    ml: -2
                  }}
                  key={ix}
                >
                  <ListItemText
                    primary={value.nombre}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItemWrapper>
              );
            })}
          </List>

        </Grid>
        <ContenidoHTMLText title="Detallede actuación" contenido={contenido[0].detalle_actuacion} />
        <Grid item lg={12} >
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
            <Grid item lg={4}> <Typography variant='span'><b>Clasificación de turno </b></Typography></Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Especialidad de derivada: </b></Typography>
        </Grid>
        <Grid item lg={3} sx={{ mt: 2 }}>
          <Typography variant='span'>{contenido[0].especialidadNombre}</Typography>
        </Grid>
        <Grid item lg={3} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Clasificación de riesgo: </b></Typography>
        </Grid>
        <Grid item lg={3} sx={{ mt: 2 }}>
          <Typography variant='span'>{contenido[0].criterioTurno}</Typography>
        </Grid>





      </>


      }

    </Grid>
  )
}
