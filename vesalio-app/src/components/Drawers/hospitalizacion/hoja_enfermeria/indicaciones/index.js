import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import AlergiasCard from './alergias'
import CardIndicaciones from './CardIndicaciones'
import DietaCard from './dieta'
import OxigenoCard from './oxigeno'
import MovilidadCard from './movilidad'
import IndicacionesPrecaucionesCard from './indicaciones'
import PlanHidratacionCard from './plan_hidratacion'

export default function Index() {
  const { drawerOpen } = useLayoutContext()
  const [datos, setDatos] = useState([])
  const [datosExtras, setDatosExtras] = useState([])
  // const changedText = (id, value, view) => {
  //   setDatos(x => x.reduce((arr, item) => {
  //     arr.push({ ...item, view: id === item.id ? view : item.view })
  //     return arr
  //   }, []))
  // }
  useEffect(() => {
    getDatos()
  }, [])
  const getDatos = async () => {
    try {
      const res = await axios.get(`http://200.121.91.211:4001/indicacionesView/${drawerOpen.item.boton.persona_internacion_id}`)
      const resExtras = await axios.get(`http://200.121.91.211:4001/indicacionesViewExtras/${drawerOpen.item.boton.persona_internacion_id}`)
      console.log(resExtras);
      let tmp = []
      if (res.data.view.length > 0) {
        if (res.data.view[0].alergias !== null) {
          tmp.push({
            id: 'alergias',
            title: 'Alergias',
            view: <AlergiasCard item={res.data.view[0].alergias} id={'alergias'} />
          })
        }
        if (res.data.view[0].dieta_nombre.length !== 0 || res.data.view[0].alimentacion.length !== 0 || res.data.view[0].consistencia_nombre.length !== 0) {
          tmp.push({
            id: 'dieta',
            title: 'Dieta, consistencia y alimentación',
            view: <DietaCard dieta={res.data.view[0].dieta_nombre} id={'dieta'} alimentacion={res.data.view[0].alimentacion} consistencia={res.data.view[0].consistencia_nombre} />
          })
        }
        if (res.data.view[0].oxigenoterapia_nombre.length !== 0 || res.data.view[0].periodicidad_nebulizaciones_nombre.length !== 0 || res.data.view[0].textOxigenoterapia.length !== 0) {
          tmp.push({
            id: 'oxigenoterapia',
            title: 'Oxigenoterapia y nebulización',
            view: <OxigenoCard oxigeo={res.data.view[0].oxigenoterapia_nombre} id={'oxigenoterapia'} nebu={res.data.view[0].periodicidad_nebulizaciones_nombre} texto={res.data.view[0].textOxigenoterapia} />
          })
        }
        if (res.data.view[0].kinesioterapia_nombre.length !== 0 || res.data.view[0].movilidad_nombre.length !== 0) {

          tmp.push({
            id: 'movilidad',
            title: 'Kinesioterapia, movilidad y otras observaciones',
            view: <MovilidadCard kine={res.data.view[0].kinesioterapia_nombre} id={'movilidad'} otros={res.data.view[0].movilidad_nombre} />
          })
        }
        if (res.data.view[0].precauciones.length !== 0) {
          tmp.push({
            id: 'indicaciones',
            title: 'Indicaciones y precauciones',
            view: <IndicacionesPrecaucionesCard precauciones={res.data.view[0].precauciones} indicaciones={res.data.view[0].indicaciones} id={'indicaciones'} />
          })
        }
        setDatos(tmp)
      }
      let tmp2 = []
      if (resExtras.data.planHidratacion.length > 0) {
        tmp.push({
          id: 'planes',
          title: 'Plan de Hidratacion',
          view: <PlanHidratacionCard item={resExtras.data.planHidratacion} id={'planes'} />
        })
        setDatosExtras(tmp2)
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {
        datos.map((x, ix) => <CardIndicaciones key={ix} title={x.title}>
          {x.view}
        </CardIndicaciones>)
      }
      {
        datosExtras.map((x, ix) => <CardIndicaciones key={ix} title={x.title}>
          {x.view}
        </CardIndicaciones>)
      }
    </>
  )
}
