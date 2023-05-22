import React, { useState, useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'
import listPlugin from '@fullcalendar/list';
import { Grid, styled, Box, Card, Divider } from '@mui/material'
import Actions from './Actions';

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
        .fc-event-time{
          display: none;
        }
       
      }
  `
);

export default function Calendario({ fechasGeneradasHoras, eventoSelect: setEventSelected }) {
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([])
  const handleEventSelect = (arg) => {
    console.log(arg.event.id);
    setEventSelected(arg.event.id)
  }
  useEffect(() => {
    setEvents(fechasGeneradasHoras.reduce((arr, item) => {
      let found = arr.findIndex(x => x.fecha === item.id.split('_')[0].split('T')[0])
      if (found < 0) {
        let fexha = item.id.split('_')[0].split('T')[0]
        arr.push({
          ...item, fecha: fexha,
          start: new Date(`${fexha} 01:00:00`),
          end: new Date(`${fexha} 23:59:00`),
          title: 1 + ' - Disponible'
        })
      } else {
        let valor = parseInt(arr[found].title.split('-')[0]) + 1
        arr[found].title = valor + ' - Diponibles'
      }
      return arr;
    }, []))
  }, [fechasGeneradasHoras])

  const handleDatePrev = () => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();
      calApi.prev();
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
  const handleDateToday = () => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();

      calApi.today();
      setDate(calApi.getDate());
    }
  };
  return (
    <Grid
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
            />
          </Box>
          <Divider />
          <FullCalendarWrapper>
            <FullCalendar
              allDayMaintainDuration
              locale={esLocale}
              initialDate={date}
              initialView={'dayGridMonth'}
              droppable
              editable
              eventDisplay="block"
              eventClick={handleEventSelect}
              eventResizableFromStart
              events={events}
              headerToolbar={false}
              height={260}
              ref={calendarRef}
              rerenderDelay={10}
              // selectable
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
  )
}
