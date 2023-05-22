import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Horarios({ item }) {
    const [lista, setLista] = useState([])
    useEffect(() => {
        const getDatos = async (id) => {
            const response2 = await axios.get(`http://apis-vesalio.com.pe/datosDoctoresAsignacion/${id}`)
            if (response2.status === 200) {
                setLista(response2.data)
            }
        }
        getDatos(item.personal_id)
    }, [item])
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{'Día'}</TableCell>
                        <TableCell>{'Hora'}</TableCell>
                        <TableCell>{'Duracion turno'}</TableCell>
                        <TableCell>{'Consultorio'}</TableCell>
                        <TableCell>{'Especialidad'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.sort(function (a, b) {
                        if (a.dia > b.dia) {
                            return 1;
                        }
                        if (a.dia < b.dia) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    }).map((list,ix) => {
                        return (
                            <TableRow hover key={ix} >
                                <TableCell>

                                    <Typography noWrap variant="h5">
                                        {list.diaNombre}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        color="text.primary"
                                    >
                                        <b>{list.hora_inicio}</b>
                                    </Typography>
                                    <Typography
                                        noWrap
                                        variant="subtitle1"
                                        color="text.primary"
                                    >
                                        <b>{list.hora_fin}</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography noWrap variant="h5">
                                        {list.duracion_turno}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography noWrap variant="h5">
                                        {list.lugar}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography noWrap variant="h5">
                                        {list.especialidad}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
