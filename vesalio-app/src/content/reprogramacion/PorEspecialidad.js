import { Box, List, ListItemButton, ListItemText, styled } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Label from 'src/components/Label';
import useLayoutContext from 'src/hooks/useAuthLayout';

const ListItemWrapper = styled(ListItemButton)(
    () => `

        &.MuiButtonBase-root {
          border-radius: 0;
        }
    `
);
export default function ContenidoCalendario({ item, agignacionSelecteds, recividoPrincipal }) {

    const [lista, setLista] = useState([])
    const { mostrarComponent } = useLayoutContext()

    useEffect(() => {
        const getDatos = async (fecha, asignaciones) => {
            let response = await axios.post(`http://200.121.91.211:4001/datosCalendarioAsignacion`, {
                fecha: fecha.fecha_calendario,
                dia: fecha.dia_de_la_semana,
                asignaciones: asignaciones.reduce((arr, item) => {
                    arr.push(item.asignacion_id)
                    return arr
                }, [])
            })
            setLista(response.data.reduce((arr, item) => {
                arr.push({
                    ...item,
                    nombreMedico: asignaciones.find(x => x.asignacion_id === item.asignacion_id).datosDoctor,
                    mostrar: item.horas.horasDisponibles.filter(x => !x.turno_tomado).length

                })
                return arr
            }, []));
        }
        if (agignacionSelecteds.length > 0) {
            getDatos(item, agignacionSelecteds)
        }
    }, [item, agignacionSelecteds])

    const hanldeClick = (item, value) => {

       let datos = agignacionSelecteds.find(x => x.asignacion_id === value.asignacion_id)
        console.log(recividoPrincipal);
        mostrarComponent({
            contenido: 'agendaReprogramados',
            estado: true,
            subtitle: (item.dia_nombre + ' ' + item.dia_calendario + ' de ' + item.mes_nombre + ' del ' + item.anio_calendario),
            title: value.nombreMedico,
            item: {
                item,
                agenda: value,
                personalId: datos.personal_id,
                asignacionId: datos.asignacion_id,
                recividoPrincipal:recividoPrincipal
            }
        }, 'drawerOpen')

    }
    return (
        <>
            <Box style={{ maxHeight: "200px", overflowY: "scroll" }} >
                <List style={{ overflowY: "visible", maxHeight: "200px" }} disablePadding component="div" sx={{ mt: 1 }}

                >
                    {lista.filter(x => x.mostrar > 0).map((value, ix) => {
                        return (
                            <ListItemWrapper
                                sx={{
                                    py: 1,
                                }}
                                key={ix}
                                onClick={() => hanldeClick(item, value)}
                            >
                                <ListItemText
                                    primary={value.nombreMedico}
                                    primaryTypographyProps={{ variant: 'h5' }}
                                />
                                <Label>{value.mostrar}</Label>
                            </ListItemWrapper>
                        );
                    })}
                </List>
            </Box>

        </>
    )
}
