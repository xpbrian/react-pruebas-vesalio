import axios from "axios"
import { useEffect, useRef, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Markup } from 'interweave';
import useLayoutContext from "src/hooks/useAuthLayout";
import PrintIcon from '@mui/icons-material/Print';
import ReactToPrint from "react-to-print";
// import Prueba from "./Prueba";
// import  { Print11 } from "./Print11";
import Print from "./Print";

export default function InformacionAdicional({ item, datosUsuario, actualizarView }) {
  const [datos, setDatos] = useState(null)
  const [contenido, setContenido] = useState(null)
  const { mostrarComponent } = useLayoutContext()

  const componentRef2 = useRef();

  useEffect(() => {
    let obj = JSON.parse(item.datos)
    setDatos(obj);
  }, [item])

  useEffect(() => {
    const getDatos = async (consultaId) => {
      try {
        const citas = await axios.get(`http://200.121.91.211:4001/informacionadicional/${consultaId}`)
        console.log("estoy aqui");
        console.log(citas.data);
        setContenido(citas.data)
      } catch (e) {
        console.log(e);
      }

    }
    if (datos !== null) {
      getDatos(datos)
    }
  }, [datos])

  const handleClick = (item) => {
    mostrarComponent({
      contenido: 'informacion_adicional',
      estado: true,
      title: 'Información adicional',
      subtitle: 'Editar datos',
      item: { item, datosUsuario, actualizarView: () => actualizarView(), isEditar: true }

    }, 'drawerOpen')
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
      <Grid item lg={10} sx={{ mt: 2 }}>
        <Typography variant='h5'><b>Información adicional</b></Typography>
      </Grid>
      <Grid item lg={2} sx={{ mt: 2 }}>
        <Box display={{ dipslay: "flex" }}>

          <Box>
            <IconButton
              size="small"
              sx={{ float: 'right' }}
              color="secondary"
              onClick={() => handleClick(contenido[0])}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box>
            <div>
              <ReactToPrint style={{ textAlign: "right" }}
                trigger={() =><IconButton size="small" color="secondary"> <PrintIcon fontSize="small" /> </IconButton>}
                content={() => componentRef2.current}
              />
              <div style={{ display: "none" }}>
                {/* <Prueba 
                  ref={componentRef2}
                /> */}
                <Print
                  contenido={contenido}
                  ref={componentRef2} />

              </div>
            </div>
          </Box>

        </Box>

      </Grid>
      <Grid item lg={12}>
        {contenido !== null && <Box sx={{ my: 1 }}>

          <Markup content={contenido[0].informacion_adicional} />
        </Box>}

      </Grid>

    </Grid>
  )
}
