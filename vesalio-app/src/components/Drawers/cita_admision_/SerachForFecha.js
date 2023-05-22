import { Accordion, AccordionDetails, Autocomplete, Grid, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import HorasGeneradas from '../cita_rapida/HorasGeneradas'

export default function PorFecha({ enviar, especialidadSelected, fechaSelected }) {

  const { medicos } = useLayoutContext()
  const [ddlMedicos, setddlMedicos] = useState([])
  const [itemAxios, setItemAxios] = useState(null)
  const [horas, setHoras] = useState([])
  const [horaSelected, setHoraSelected] = useState('')

  useEffect(() => {
    if (enviar !== null) {
      setddlMedicos(enviar.map(y => y.documento).reduce((arr, item) => {
        let find = medicos.find(x => x.documento === item)
        if (find !== undefined) {
          arr.push(find)
        }
        return arr
      }, []))
    }
  }, [enviar, medicos])




  const handleFilterMedicos = async (e, newValue) => {
    if (newValue !== null) {
      const response = await axios.post(`http://apis-vesalio.com.pe/medicosEspecialidadHorario`, { id_especialidad: especialidadSelected, documento: medicos.find(x => x.id_usuario === newValue.id).documento })
      setItemAxios(response.data);
    }
  }


  useEffect(() => {
    if (itemAxios !== null) {
      let datos = itemAxios;
      let diasCalendario = datos.fechas.reduce((arr, item) => {
        item.fechas.map(x => {
          arr.push({ ...x })
          return false
        })
        return arr
      }, []).sort(function (a, b) {
        if (a.dia_de_la_semana_en_anio > b.dia_de_la_semana_en_anio) {
          return 1;
        }
        if (a.dia_de_la_semana_en_anio < b.dia_de_la_semana_en_anio) {
          return -1;
        }
        return 0;
      })
      let horasGeneradas = diasCalendario.reduce((arr, ix) => {
        let salir = true;
        let arreglo = [datos.cabecera.find(x => x.id_agenda === ix.id_agenda).hora_inicio]
        while (salir) {
          let dato = datos.cabecera.find(x => x.id_agenda === ix.id_agenda)
          let horaConsultar = ''
          let horaMostrar = ''
          if (dato !== undefined) {
            horaConsultar = parseInt(arreglo[arreglo.length - 1].substring(3, 5)) + parseInt(dato.duracion_turno)
            if (horaConsultar >= 60) {
              let minutos = (60 - horaConsultar).toString()
              let horas = (parseInt(arreglo[arreglo.length - 1].substring(0, 2)) + 1).toString()
              horaMostrar = `${horas.length === 1 ? '0' + horas : horas}:${minutos.length === 1 ? '0' + minutos : minutos}:00`
            } else {
              let horas_ = parseInt(arreglo[arreglo.length - 1].substring(0, 2)).toString()
              horaMostrar = `${horas_.length === 1 ? '0' + horas_ : horas_}:${horaConsultar}:00`
            }
            if (parseInt(horaMostrar.substring(0, 2)) >= parseInt(dato.hora_fin.substring(0, 2)) && parseInt(horaMostrar.substring(3, 5)) >= parseInt(dato.hora_fin.substring(3, 5))) {
              salir = false;
            }
            arreglo.push(horaMostrar)
          } else {
            salir = false;
          }
        }

        arr.push({ ...ix, arreglo })
        return arr
      }, [])
      let horasGeneradasFiltradas = horasGeneradas.reduce((arr, item) => {
        if (item.fecha_calendario.split('T')[0] === fechaSelected) {
          arr.push(item)
        }
        return arr
      }, [])

      setHoras(horasGeneradasFiltradas.reduce((arr, item) => {
        for (let i = 0; i < item.arreglo.length - 1; i++) {
          let ocupado = datos.ocupados.find(x => x.fecha.split('T')[0] === item.fecha_calendario.split('T')[0] && item.arreglo[i] === x.hora)
          arr.push({
            agenda: item.id_agenda,
            id: item.fecha_calendario + '_' + item.arreglo[i],
            title: ocupado === undefined ? 'Disponible' : 'Ocupado',
            color: ocupado === undefined ? '#1975FF' : '#FF0000',
            start: new Date(`${item.fecha_calendario.split('T')[0]} ${item.arreglo[i]}`),
            end: new Date(`${item.fecha_calendario.split('T')[0]} ${item.arreglo[i + 1]}`)
          })
        }
        return arr
      }, []).filter(x => x.title !== 'Ocupado'));
    }
  }, [itemAxios])

  return (
    <>
      {enviar !== null && <Grid alignItems="center" justifyContent={"center"} container spacing={3} >
        <Grid item xs={12}>
          <Autocomplete
            fullWidth
            onChange={handleFilterMedicos}
            options={ddlMedicos.reduce((arr, item) => {
              arr.push({
                id: item.id_usuario,
                title: `${item.nombres}`
              })
              return arr
            }, [])}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                label={'Medicos disponibles'}
                placeholder={'Seleccione medicos'}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          {
            <Accordion
              sx={{
                p: 1
              }}
              defaultExpanded
            >
              <AccordionDetails
                sx={{
                  p: 0
                }}
              >
                <Grid container spacing={3}>
                  {horas.map(item => <Grid item xs={12} xl={3} md={4} sm={6} key={item.id}>
                    <HorasGeneradas item={item} eventSelected={horaSelected} setEventSelected={setHoraSelected} />
                  </Grid>)}
                </Grid>

              </AccordionDetails>
            </Accordion>

          }
        </Grid>



      </Grid>}



    </>
  )
}
