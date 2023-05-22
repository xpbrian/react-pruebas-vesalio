import { Card, CardHeader, Divider, Grid, List, ListItemButton, ListItemText, Typography, styled } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Lista from './Lista'
import ContenidoHTMLText from './ContenidoHTMLText'
import ListaRecetas from './ListaReceta'
import Label from 'src/components/Label'
import ListaGinecologia from './ListaGinecologia'
import ListaEstudios from './ListaEstudios'
import ListaEstudiosNew from './ListaEstudiosNew'


const ListItemWrapper = styled(ListItemButton)(
  () => `
  
      &.MuiButtonBase-root {
        border-radius: 0;
      }
  `
);

export default function ConsultaBasica({ item, datosUsuario }) {
  const [datos, setDatos] = useState(null)
  const [contenido, setContenido] = useState(null)
  const [recetas, setRecetas] = useState([])
  const [estudios, setEstudios] = useState([])
  const [estudiosNew, setEstudiosNew] = useState([])
  const [diagnosticos, setDiagnosticos] = useState([])
  const [ginecologia, setGinecologia] = useState([])
  const [interviniente, setInterviniente] = useState([])

  useEffect(() => {
    setDatos(item.datos);
  }, [item])

  useEffect(() => {
    const getDatos = async (consultaId) => {
      try {
        console.log(consultaId);
        const citas = await axios.get(`http://200.121.91.211:4001/consultaBasica/${consultaId}`)
        setContenido(citas.data.datos)
        if (citas.data.datos[0].mostrarGinecologica === 'SI') {
          const gine = await axios.get(`http://200.121.91.211:4001/consultaBasicaGinecologia/${consultaId}`)
          setGinecologia(gine.data.datos)
        }
        setRecetas(citas.data.recetas)
        setDiagnosticos(citas.data.diagnostico)
        setEstudios(citas.data.estudios)
        setInterviniente(citas.data.interviniente)
        setEstudiosNew(citas.data.estudiosNew.reduce((arr, item) => {
          let existe = arr.findIndex(x => x.id === item.tituloCodigo)
          if (existe < 0) {

            arr.push({ id: item.tituloCodigo, titulo: item.titulo, componentes: [item], informacion: item.informacion, impresion: item.impresion })
          } else {
            arr[existe].componentes.push(item)
          }
          return arr
        }, []))
      } catch (e) {
        console.log(e);
      }

    }
    if (datos !== null) {
      getDatos(datos)
    }

  }, [datos])

  useEffect(() => {
    console.log(contenido)
  }, [contenido])


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
        {
          contenido[0].mostrarGinecologica === 'SI' && <Grid item lg={12} sx={{ mt: 2 }}>
            <ListaGinecologia ginecologia={ginecologia} />
          </Grid>
        }
        <ContenidoHTMLText title="Tiempo de enfermedad:" contenido={contenido[0].tiempoEvolucion} />
        <ContenidoHTMLText title="Motivo Consulta:" contenido={contenido[0].motivo_consulta} />
        <ContenidoHTMLText title="Ant. Enfermedad Actual:" contenido={contenido[0].antecedenteActual} />
        <ContenidoHTMLText title="Examen físico:" contenido={contenido[0].examenfisico} />
        <Grid item lg={3} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Diagnostico: </b></Typography>
        </Grid>
        <Grid item lg={9} sx={{ mt: 2 }}>
          <List disablePadding component="div">

            {diagnosticos.filter(x => parseInt(x.orden) === 1).map((value, ix) => {
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
        {
          diagnosticos.filter(x => parseInt(x.orden) === 2).length > 0 && <>
            <Grid item lg={3} sx={{ mt: 2 }}>
              <Typography variant='span'><b>Otros diagnosticos: </b></Typography>
            </Grid>
            <Grid item lg={9} sx={{ mt: 2 }}>
              <List disablePadding component="div">

                {diagnosticos.filter(x => parseInt(x.orden) === 2).map((value, ix) => {
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

          </>
        }
        <Grid item lg={3} sx={{ mt: 2 }}>
          <Typography variant='span'><b>Proxima cita</b></Typography>
        </Grid>
        <Grid item lg={9} sx={{ mt: 2 }}>
          <Typography variant='span'>{contenido[0].proxima_cita}</Typography>
        </Grid>
        <ContenidoHTMLText title="Tratamiento / Plan:" contenido={contenido[0].evoluciontto} />
        <Grid item lg={12} sx={{ mt: 2 }}>
          {recetas.length > 0 && <Card>
            <CardHeader title={<Typography variant='h5'>
              <b>Recetas</b>
            </Typography>} />
            <Divider />
            <ListaRecetas recetas={recetas} datosUsuario={datosUsuario} item={item} diagnosticos={diagnosticos.filter(x => parseInt(x.orden) === 1)} />
          </Card>}
        </Grid>
        <Grid item lg={12} sx={{ mt: 2 }}>
          {estudios.length > 0 && <Card>
            <CardHeader title={<Typography variant='h5'>
              <b>Exámenes auxiliares</b>
            </Typography>} />
            <Divider />
            <ListaEstudios estudios={estudios} datosUsuario={datosUsuario} item={item} diagnosticos={diagnosticos.filter(x => parseInt(x.orden) === 1)} />
          </Card>}
          {estudiosNew.length > 0 && <Card>
            <CardHeader title={<Typography variant='h5'>
              <b>Exámenes auxiliares</b>
            </Typography>} />
            <Divider />
            <ListaEstudiosNew estudios={estudiosNew} datosUsuario={datosUsuario} item={item} diagnosticos={diagnosticos.filter(x => parseInt(x.orden) === 1)} />
          </Card>}
        </Grid>
        {
          interviniente.length > 0 && <>

            <Grid item lg={3} sx={{ mt: 2 }}>
              <Typography variant='span'><b>Personal Interviniente</b></Typography>
            </Grid>
            <Grid item lg={9} sx={{ mt: 2 }}>
              <List disablePadding component="div">

                {interviniente.map((value, ix) => {
                  return (
                    <ListItemWrapper
                      sx={{
                        py: 0,
                        ml: -2
                      }}
                      key={ix}
                    >
                      <ListItemText
                        primary={value.interviniente}
                        primaryTypographyProps={{ variant: 'h5' }}
                      />

                    </ListItemWrapper>
                  );
                })}
              </List>

            </Grid>
          </>
        }
       
      </>


      }

    </Grid>
  )
}
