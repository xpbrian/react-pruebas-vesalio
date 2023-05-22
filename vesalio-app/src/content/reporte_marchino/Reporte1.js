import { Autocomplete, Box, Button, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Reporte1({ listaPrimer, array }) {
    const [lista, setLista] = useState([])
    const [meses, setMeses] = useState([])
    const [dias, setDias] = useState([])
    const [datos, setDatos] = useState([])
    const [diagnosticos, setDiagnosticos] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };
    useEffect(() => {
        setLista(listaPrimer.reduce((arr, item) => {
            if (array.find(x => x === item.especialidad_id) === undefined) {
                arr.push(item)
            }
            return arr
        }, []))
    }, [listaPrimer, array])
    useEffect(() => {
        if (lista.length > 0) {
            setMeses(lista.reduce((arr, item) => {
                let existe = arr.findIndex(x => x.id === item.mes_calendario)
                if (existe < 0) {
                    arr.push({
                        title: item.mes_nombre,
                        id: item.mes_calendario,
                    })
                }
                return arr
            }, []));

        }
    }, [lista])
    const handleFilter = (_, newValue) => {
        if (newValue === null) {
            setDias([])
        } else {
            setDias(lista.reduce((arr, item) => {
                let existe = arr.findIndex(x => x.id === item.fecha.split('T')[0])
                if (existe < 0) {
                    arr.push({
                        title: item.fecha.split('T')[0],
                        id: item.fecha.split('T')[0],
                        mesCalendario: item.mes_calendario
                    })
                }
                return arr
            }, []).filter(x => x.mesCalendario === newValue.id));
            setDatos(lista.filter(x => x.mes_calendario === newValue.id).reduce((arr, item) => {
                let existe = arr.findIndex(x => x.id === item.especialidad_id)
                if (existe < 0) {
                    arr.push({
                        id: item.especialidad_id,
                        title: item.nombre,
                        cantidad: 1,
                        dia_nombre: item.dia_nombre,
                        mes_calendario: item.mes_calendario,
                        dia_de_la_semana: item.dia_de_la_semana,
                        mes_nombre: item.mes_nombre,
                        envio: 'meses'
                    })
                } else {
                    arr[existe].cantidad += 1
                }
                return arr
            }, []))

        }
    }
    const handleFilterDia = (_, newValue) => {
        if (newValue !== null) {
            setDatos(lista.filter(x => x.fecha.split('T')[0] === newValue.id).reduce((arr, item) => {
                let existe = arr.findIndex(x => x.id === item.especialidad_id)
                if (existe < 0) {
                    arr.push({
                        id: item.especialidad_id,
                        title: item.nombre,
                        cantidad: 1,
                        mes_calendario: item.mes_calendario,
                        dia_de_la_semana: item.dia_de_la_semana,
                        dia_nombre: item.dia_nombre,
                        mes_nombre: item.mes_nombre,
                        envio: 'dias'
                    })
                } else {
                    arr[existe].cantidad += 1
                }
                return arr
            }, []))
        }
    }
    const handleObtenerDiagnosticos = async (obj) => {
        const getDatos = async () => {
            const response = await axios.post(`http://200.121.91.211:4001/reporteMarchinoDiagnosticos`, { tipo: obj.envio, mes: obj.mes_calendario, dia: obj.dia_de_la_semana, especialidad: obj.id })
            console.log(response.data);
            setDiagnosticos(response.data)
        }
        getDatos()
    }
    return (
        <>
            <Card>
                <Grid container
                    direction="row"
                    sx={{ p: 2 }}
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Box>
                            {meses.length > 0 && <Autocomplete
                                fullWidth
                                onChange={handleFilter}
                                options={meses.sort(function (a, b) {
                                    if (a.mes_calendario > b.mes_calendario) {
                                        return 1;
                                    }
                                    if (a.mes_calendario < b.mes_calendario) {
                                        return -1;
                                    }
                                    // a must be equal to b
                                    return 0;
                                })}
                                getOptionLabel={(option) => option.title}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        variant="outlined"
                                        label={'Meses'}
                                        placeholder={'Seleccione mes'}
                                    />
                                )}
                            />}
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box>
                            {dias.length > 0 && <Autocomplete
                                fullWidth
                                onChange={handleFilterDia}
                                options={dias.sort(function (a, b) {
                                    if (a.fecha > b.fecha) {
                                        return 1;
                                    }
                                    if (a.fecha < b.fecha) {
                                        return -1;
                                    }
                                    // a must be equal to b
                                    return 0;
                                })}
                                getOptionLabel={(option) => option.title}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        variant="outlined"
                                        label={'Dias'}
                                        placeholder={'Seleccione dia'}
                                    />
                                )}
                            />}
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{'Mes'}</TableCell>
                                        <TableCell>{'Dia'}</TableCell>
                                        <TableCell>{'Especialidad'}</TableCell>
                                        <TableCell>{'Cantidad'}</TableCell>
                                        <TableCell align="center">{'Acciones'}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {datos.map((list) => {
                                        return (
                                            <TableRow hover key={list.id} >
                                                <TableCell>
                                                    <Typography
                                                        noWrap
                                                        variant="subtitle1"
                                                        color="text.primary"
                                                    >
                                                        <b>{`${list.mes_nombre}`}</b>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        noWrap
                                                        variant="subtitle1"
                                                        color="text.primary"
                                                    >
                                                        <b>{list.dia_nombre}</b>
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        noWrap
                                                        variant="subtitle1"
                                                        color="text.primary"
                                                    >
                                                        <b>{list.title}</b>
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        noWrap
                                                        variant="subtitle1"
                                                        color="text.primary"
                                                    >
                                                        <b>{list.cantidad}</b>
                                                    </Typography>

                                                </TableCell>
                                                <TableCell>
                                                    <Button variant='text' onClick={() => handleObtenerDiagnosticos(list)} >Diagnosticos</Button>
                                                </TableCell>
                                            </TableRow>

                                        );
                                    })}
                                </TableBody>
                            </Table>

                        </TableContainer>
                        <Box p={2}>
                            <TablePagination
                                component="div"
                                count={datos.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleLimitChange}
                                page={page}
                                rowsPerPage={limit}
                                rowsPerPageOptions={[5, 10, datos.length]}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{'Nombre'}</TableCell>
                                        <TableCell>{'Cantidad'}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {diagnosticos.map((list) => {
                                        return (
                                            <TableRow hover key={list.codigocie10} >
                                                <TableCell>
                                                    <Typography
                                                        noWrap
                                                        variant="subtitle1"
                                                        color="text.primary"
                                                    >
                                                        <b>{`${list.nombreLista}`}</b>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        noWrap
                                                        variant="subtitle1"
                                                        color="text.primary"
                                                    >
                                                        <b>{list.cantidad}</b>
                                                    </Typography>

                                                </TableCell>

                                            </TableRow>

                                        );
                                    })}
                                </TableBody>
                            </Table>

                        </TableContainer>
                        <Box p={2}>
                            <TablePagination
                                component="div"
                                count={datos.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleLimitChange}
                                page={page}
                                rowsPerPage={limit}
                                rowsPerPageOptions={[5, 10, datos.length]}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Card>

        </>
    )
}
