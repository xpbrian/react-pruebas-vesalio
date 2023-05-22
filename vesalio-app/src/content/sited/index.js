import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Document,
  Page,
  // View,
  // Image,
  StyleSheet,
  PDFViewer,
  // Text
} from "@react-pdf/renderer";
import Html from 'react-pdf-html';

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
});



export default function Index() {

  const { NroAutoSiteds, CodigoIafaSited, CodigoAfiliadoSited } = useParams()
  const [datosGenerales, setDatosGenerales] = useState(null)

  const getDatos = async () => {
    const sited = await axios.post(`http://200.121.91.211:4001/getSited`, {
      Nro_AutoSiteds: NroAutoSiteds,
      CodigoIafaSited: CodigoIafaSited,
      CodigoAfiliadoSited: CodigoAfiliadoSited
    })
    if (sited.data.datosGenerales.length > 0) {
      setDatosGenerales(sited.data.datosGenerales[0]);
    }
  }

  useEffect(() => {
    getDatos()
  }, [])

  useEffect(() => {
    console.log(datosGenerales);
  }, [datosGenerales])




  return (
    <>
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <Html>
              {`  <html>
                      
                   
                  </html>`
              }
            </Html>  
          </Page>
        </Document>
      </PDFViewer>
    </>

  )
}
