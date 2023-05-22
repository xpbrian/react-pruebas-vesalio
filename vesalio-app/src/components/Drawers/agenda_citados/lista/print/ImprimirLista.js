
import React from 'react'
import { Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';


export const ImprimirLista = React.forwardRef((props, ref) => {
    return (
        <>
            <div ref={ref}>

                <Box style={{ display: "flex", fontSize: "10px", marginTop: "20px" }}>
                    <Box><img width={100} src={'/static/images/img/logoLogin.png'} alt='imgVesalio' /></Box>
                    <Box>
                        <Typography style={{ fontSize: "12px" }}><b>Clínica Vesalio</b></Typography>
                        <Typography style={{ fontSize: "8px" }}><b>Listado de turnos</b></Typography>
                    </Box>
                    {/* <Box style={{ textAlign: "center", marginTop: "20px", marginLeft: "20px", display: "flex" }}>
                        <Typography style={{ fontSize: "8px" }}><b>{props.list[0].fecha.split('T')[0].split('-')[2] + '-' + props.list[0].fecha.split('T')[0].split('-')[1] + '-' + props.list[0].fecha.split('T')[0].split('-')[0]}</b></Typography>
                        <Typography style={{ fontSize: "8px" }}><b>{props.list[0].especialidad_nombre}</b></Typography>
                        <Typography style={{ fontSize: "8px" }}><b>{props.list[0].nombre_doctor}</b></Typography>
                    </Box> */}
                </Box>
                <Divider />

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{('Fecha')}</TableCell>
                            <TableCell>{('Hora')}</TableCell>
                            <TableCell>{('Paciente')}</TableCell>
                            <TableCell>{('Numero documento')}</TableCell>
                            <TableCell>{('Especialidad')}</TableCell>
                            <TableCell>{('Doctor')}</TableCell>
                            <TableCell>{('Ubicación')}</TableCell>
                            <TableCell>{('Nivel')}</TableCell>
                            <TableCell>{('Estado')}</TableCell>
                            <TableCell>{('Celular')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.lista.map((list) => {
                            return (
                                <TableRow hover key={list.id} >
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.fecha.split('T')[0].split('-')[2] + '-' + list.fecha.split('T')[0].split('-')[1] + '-' + list.fecha.split('T')[0].split('-')[0]}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.hora}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.nombre_paciente}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.documento_paciente}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.especialidad_nombre}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.nombre_doctor}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.lugar_nombre}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.piso_nombre}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.estado}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.celular}
                                        </Typography>
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    )
})