import { useState, useRef, useEffect } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'
import listPlugin from '@fullcalendar/list';
import {
  Avatar,
  Button,
  Collapse,
  Alert,
  Grid,
  Box,
  Card,
  Divider,
  useMediaQuery,
  styled,
  useTheme,
  IconButton,
  Typography
} from '@mui/material';
import { useDispatch } from 'src/store';
import {
  updateEvent,
  selectRange,
} from 'src/slices/calendar';
import Actions from './Actions';
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';
import useAuth from 'src/hooks/useAuth';
import axios from 'axios';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';

const FullCalendarWrapper = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(3)};

    & .fc-license-message {
      display: none;
    }
    .fc {

      .fc-col-header-cell {
        padding: ${theme.spacing(1)};
        background: ${theme.colors.alpha.black[5]};
      }

      .fc-scrollgrid {
        border: 2px solid ${theme.colors.alpha.black[10]};
        border-right-width: 1px;
        border-bottom-width: 1px;
      }

      .fc-cell-shaded,
      .fc-list-day-cushion {
        background: ${theme.colors.alpha.black[5]};
      }

      .fc-list-event-graphic {
        padding-right: ${theme.spacing(1)};
      }

      .fc-theme-standard td, .fc-theme-standard th,
      .fc-col-header-cell {
        border: 1px solid ${theme.colors.alpha.black[10]};
      }

      .fc-event {
        padding: ${theme.spacing(0.1)} ${theme.spacing(0.3)};
      }

      .fc-list-day-side-text {
        font-weight: normal;
        color: ${theme.colors.alpha.black[70]};
      }

      .fc-list-event:hover td,
      td.fc-daygrid-day.fc-day-today {
        background-color: ${theme.colors.primary.lighter};
      }

      td.fc-daygrid-day:hover,
      .fc-highlight {
        background: ${theme.colors.alpha.black[10]};
      }

      .fc-daygrid-dot-event:hover, 
      .fc-daygrid-dot-event.fc-event-mirror {
        background: ${theme.colors.primary.lighter};
      }

      .fc-daygrid-day-number {
        padding: ${theme.spacing(1)};
        font-weight: bold;
      }

      .fc-list-sticky .fc-list-day > * {
        background: ${theme.colors.alpha.black[5]} !important;
      }

      .fc-cell-shaded, 
      .fc-list-day-cushion {
        background: ${theme.colors.alpha.black[10]} !important;
        color: ${theme.colors.alpha.black[70]} !important;
      }
      .fc-timegrid-slot.fc-timegrid-slot-lane{
        height : 80px;
      }
      .fc-timegrid-slot.fc-timegrid-slot-lane{
        height : 80px;
      }
     
      &.fc-theme-standard td, 
      &.fc-theme-standard th,
      &.fc-theme-standard .fc-list {
        border-color: ${theme.colors.alpha.black[30]};
      }
    }
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: ${theme.colors.shadows.success};
      top: -${theme.spacing(6)};
      position: absolute;
      left: 50%;
      margin-left: -${theme.spacing(6)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

function ApplicationsCalendar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { modalOpen, mostrarComponent, citas, addCita } = useLayoutContext()
  const { user } = useAuth()
  const calendarRef = useRef(null);
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(mobile ? 'timeGridWeek' : 'timeGridWeek');
  const [events, setEvents] = useState([]);
  const [openAlert, setOpenAlert] = useState(true);
  const [pagar, setPagar] = useState(0);

  const handleDateToday = () => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();

      calApi.today();
      setDate(calApi.getDate());
    }
  };
  const changeView = (changedView) => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();

      calApi.changeView(changedView);
      setView(changedView);
    }
  };
  const handleDatePrev = () => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();
      calApi.prev();
      /*
      let fechaInicial = date;
      let fechaRetrocedida = calApi.getDate()
      if (fechaRetrocedida < fechaInicial) {
        confirmSweetAlert('Advertencia', 'No puede mostrar horarios de fechas anterirores', 'warning', false)
        setDate(fechaInicial);
        calApi.next();
      } else {
        setDate(calApi.getDate());
      }
      */
      setDate(calApi.getDate());
    }
  };
  const handleDateNext = () => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();

      calApi.next();
      setDate(calApi.getDate());
    }
  };
  const handleRangeSelect = (arg) => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();

      calApi.unselect();
    }

    dispatch(selectRange(arg.start, arg.end));
  };
  const getDatos = async (obj) => {
    const response = await axios.post(`http://apis-vesalio.com.pe/generarCitas`, obj)
    return response.data;
  }
  const handleEventSelect = async (arg) => {
    let rpta = await confirmSweetAlert('Generar Cita', '¿Esta seguro que desea generar cita?', 'warning', true)
    if (rpta) {
      let eventsSlected = events.find(x => x.id === arg.event.id)
      if (eventsSlected.title === 'Disponible') {
        let fechaHoy = new Date()
        let fechaSlected = new Date(eventsSlected.id.split('_')[0].split('T')[0])
        if (fechaSlected > fechaHoy || fechaHoy.getTime() === fechaSlected.getTime()) {
          let filtro = citas.filter(x => parseInt(x.fecha.split('T')[0].split('-')[1]) === fechaHoy.getMonth() + 1)
          if (filtro.length >= 3) {
            confirmSweetAlert('Advertencia', 'Ya genero 3 citas en el mes', 'warning', false)
          } else {
            let rpat = await getDatos({
              id_usuario: user._id,
              agenda: eventsSlected.agenda,
              fecha: eventsSlected.id.split('_')[0].split('T')[0],
              hora: eventsSlected.id.split('_')[1],
              datos: {
                doctor: {
                  especialidad: modalOpen.item.item.cabecera[0].especialidad,
                  documento: modalOpen.item.item.cabecera[0].documento,
                  nombres: modalOpen.item.item.cabecera[0].Nombres
                },
                turno: eventsSlected.id
              }
            })
            addCita(rpat);
            setPagar(1)
          }
        } else {
          confirmSweetAlert('Advertencia', 'No puede generar una cita con fecha menor a la actual', 'warning', false)
        }
      }

    }

  };

  const handleEventResize = async ({ event }) => {
    try {
      await dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventDrop = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {

    if (modalOpen.item.item.fechas.length > 0) {
      let diasCalendario = modalOpen.item.item.fechas.reduce((arr, item) => {
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
        let arreglo = [modalOpen.item.item.cabecera.find(x => x.id_agenda === ix.id_agenda).hora_inicio]
        while (salir) {
          let dato = modalOpen.item.item.cabecera.find(x => x.id_agenda === ix.id_agenda)
          let horaConsultar = ''
          let horaMostrar = ''
          if (dato !== undefined) {
            horaConsultar = parseInt(arreglo[arreglo.length - 1].substring(3, 5)) + parseInt(dato.duracion_turno)
            if (horaConsultar >= 60) {
              let minutos = (horaConsultar-60).toString()
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
      console.log(horasGeneradas);
      setEvents(horasGeneradas.reduce((arr, item) => {
        for (let i = 0; i < item.arreglo.length - 1; i++) {
          let ocupado = modalOpen.item.item.ocupados.find(x => x.fecha.split('T')[0] === item.fecha_calendario.split('T')[0] && item.arreglo[i] === x.hora)
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
      }, []))

    }
  }, [modalOpen])

  useEffect(() => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();
      const changedView = 'timeGridWeek';

      calApi.changeView(changedView);
      setView(changedView);
    }
  }, [mobile]);

  return (
    <>
      {
        pagar === 0 && <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Card>
              <Box p={3}>
                <Actions
                  date={date}
                  onNext={handleDateNext}
                  onPrevious={handleDatePrev}
                  onToday={handleDateToday}
                  changeView={changeView}
                  view={view}
                />
              </Box>
              <Divider />
              <FullCalendarWrapper>
                <FullCalendar
                  allDayMaintainDuration
                  locale={esLocale}
                  initialDate={date}
                  initialView={view}
                  droppable
                  editable
                  eventDisplay="block"
                  eventClick={handleEventSelect}
                  eventDrop={handleEventDrop}
                  dayMaxEventRows={4}
                  eventResizableFromStart
                  eventResize={handleEventResize}
                  events={events}
                  headerToolbar={false}
                  height={660}
                  ref={calendarRef}
                  rerenderDelay={10}
                  select={handleRangeSelect}
                  selectable
                  weekends
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin
                  ]}
                />
              </FullCalendarWrapper>
            </Card>
          </Grid>
        </Grid>
      }
      {
        pagar === 1 && <Box
          sx={{
            px: 4,
            pb: 4,
            pt: 1
          }}
        >
          <AvatarSuccess>
            <CheckTwoToneIcon />
          </AvatarSuccess>

          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="info"
            >
              {t(
                'Su ticket fue enviado a su método de autentificacion, revise y confirme su solicitud'
              )}
            </Alert>
          </Collapse>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 10
            }}
            variant="h3"
          >
            {t('Cita generada correctamente')}
          </Typography>
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() => {
              mostrarComponent({
                contenido: '',
                estado: false,
                size: 'xs'
              }, 'modalOpen')
              navigate('/citas/mis-citas')
            }
            }
          >
            {t('Ver mis citas')}
          </Button>
        </Box>
      }
    </>
  );
}

export default ApplicationsCalendar;
