import { useEffect, useState } from 'react'
import { Card, CardHeader, Divider, Grid, List, ListItemButton, ListItemText, Typography, styled, IconButton } from '@mui/material'
import axios from 'axios'
import ContenidoHTMLText from '../1/ContenidoHTMLText'
import ListaRecetas from '../1/ListaReceta'
import Lista from '../1/Lista'
import TablaTension from './TablaTension'
import TablaRefracciones from './TablaRefracciones'
import TablaQueratrometria from './TablaQueratrometria'
import BalanceMuscular from './BalanceMuscular'
import Label from 'src/components/Label'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


const ListItemWrapper = styled(ListItemButton)(
  () => `
  
      &.MuiButtonBase-root {
        border-radius: 0;
      }
  `
);

export default function Oftalmologia({ item }) {
  const [datos, setDatos] = useState(null)
  const [contenido, setContenido] = useState(null)
  const [diagnosticos, setDiagnosticos] = useState([])
  const [recetas, setRecetas] = useState([])
  const [mostrar, setMostrar] = useState([{ id: 'tension', value: false }, { id: 'refracciones', value: false }])
  const [queratrometia, setQueratrometia] = useState([])
  const [balanceMuscular, setBalanceMuscular] = useState([])

  useEffect(() => {
    setDatos(item.datos);
  }, [item])
  
  useEffect(() => {
    const getDatosDetalle = async (id) => {
      try {
        const response = await axios.get(`http://200.121.91.211:4001/consultaOftalomologiaDetalle/${id}`)
        setQueratrometia(response.data.queratrometia)
        setBalanceMuscular(response.data.balanceMuscular)
      } catch (e) {
        console.log(e);
      }
    }
    if (contenido !== null) {
      getDatosDetalle(contenido[0].id)
    }
  }, [contenido])

  useEffect(() => {

    const getDatos = async (consultaId) => {
      try {
        const citas = await axios.get(`http://200.121.91.211:4001/consultaOftalomologia/${consultaId}`)
        setContenido(citas.data.datos)
        setRecetas([])
        setDiagnosticos(citas.data.diagnostico)
      } catch (e) {
        console.log(e);
      }
    }
    if (datos !== null) {
      getDatos(datos)
    }

  }, [datos])


  const mostrarOcultar = (id) => {
    setMostrar(mos => mos.reduce((arr, item) => {
      arr.push({ ...item, value: item.id === id ? !item.value : item.value })
      return arr
    }, []))
  }

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

        <ContenidoHTMLText title="Motivo Consulta:" contenido={contenido[0].motivo_consulta} />
        <ContenidoHTMLText title="Ant. Enfermedad Actual / Examen físico:" contenido={contenido[0].examen_fisico} />
        <ContenidoHTMLText title="Evolución:" contenido={contenido[0].evolucion} />
        <ContenidoHTMLText title="BMCD:" contenido={contenido[0].bmcd} />
        <ContenidoHTMLText title="BMCI:" contenido={contenido[0].bmci} />
        <ContenidoHTMLText title="Fondoscopía OD:" contenido={contenido[0].fondoscopia_od} />
        <ContenidoHTMLText title="Fondoscopía OI:" contenido={contenido[0].fondoscopia_oi} />
        <ContenidoHTMLText title="Campo visual por confrontación OD:" contenido={contenido[0].campo_visual_od} />
        <ContenidoHTMLText title="Campo visual por confrontación OI:" contenido={contenido[0].campo_visual_oi} />

        <Grid item lg={3} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Diagnostico: </b></Typography>
        </Grid>
        <Grid item lg={9} sx={{ mt: 2 }}>
          <List disablePadding component="div">

            {diagnosticos.map((value, ix) => {
              return (
                <ListItemWrapper
                  sx={{
                    py: 0,
                    ml: -2
                  }}
                  key={ix}
                >
                  <ListItemText
                    primary={value.nombreLista}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                  <ListItemText
                    primary={<Label color='warning'>{value.es_confirmado === 0 ? 'Presuntivo' : 'Confirmado'}</Label>}

                  />
                </ListItemWrapper>
              );
            })}
          </List>

        </Grid>

        <Grid item lg={3} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Proxima cita</b></Typography>
        </Grid>
        <Grid item lg={9} sx={{ mt: 2 }}>
          <Typography variant='span'>{contenido[0].proxima_cita}</Typography>
        </Grid>
        <Grid item lg={9} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Agudeza ocular y/o Tensión ocular: </b></Typography>
        </Grid>
        <Grid item lg={3} sx={{ mt: 2 }}>
          <IconButton
            size="small"
            color="secondary"
            sx={{ float: 'right' }}
            onClick={() => mostrarOcultar("tension")}>
            <RemoveRedEyeIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item lg={12} sx={{ display: mostrar.find(x => x.id === 'tension').value ? '' : 'none' }}>
          <TablaTension contenido={contenido} />
        </Grid>
        <Grid item lg={9} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Refracciones: </b></Typography>
        </Grid>
        <Grid item lg={3} sx={{ mt: 2 }}>
          <IconButton
            size="small"
            color="secondary"
            sx={{ float: 'right' }}
            onClick={() => mostrarOcultar("refracciones")}>
            <RemoveRedEyeIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item lg={12} sx={{ display: mostrar.find(x => x.id === 'refracciones').value ? '' : 'none' }}>
          <TablaRefracciones contenido={contenido} />
        </Grid>
        <Grid item lg={12} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Queratrometría: </b></Typography>
        </Grid>
        <Grid item lg={12}>
          <TablaQueratrometria queratrometia={queratrometia} />
        </Grid>
        <Grid item lg={12} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Balance muscular: </b></Typography>
        </Grid>
        <Grid item lg={6}>
          <BalanceMuscular balanceMuscular={balanceMuscular.filter(x => x.ojo === 'OD')} title='OD' />
        </Grid>
        <Grid item lg={6}>
          <BalanceMuscular balanceMuscular={balanceMuscular.filter(x => x.ojo === 'OI')} title='OI' />
        </Grid>

        <Grid item lg={12} sx={{ mt: 2 }}>
          {recetas.length > 0 && <Card>
            <CardHeader title={<Typography variant='h5'>
              <b>Recetas</b>
            </Typography>} />
            <Divider />
            <ListaRecetas recetas={recetas} />
          </Card>}
        </Grid>
      </>


      }

    </Grid>
  )
}
