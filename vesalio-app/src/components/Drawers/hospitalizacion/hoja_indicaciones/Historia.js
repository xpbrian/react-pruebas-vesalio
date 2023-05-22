import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import { Markup } from 'interweave';
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};


export default function Historia() {

    const { drawerOpen } = useLayoutContext()
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };



    const getDatos = async (personaInternacionId) => {
        try {

            const resDatos = await axios.get(`http://200.121.91.211:4001/indicacionesView/${personaInternacionId}`)
            const resExtras = await axios.get(`http://200.121.91.211:4001/indicacionesViewExtras/${personaInternacionId}`)
            setLista(resDatos.data.view.reduce((arr, item) => {
                let planHidratacion = resExtras.data.planHidratacion.filter(x => x.hoja_indicaciones_id === item.id).map((x, ix) => ('<li><b>Plan de Hidratación ' + (ix + 1) + ':</b> <br/>' + x.solucion + ' ' + x.cantidadSolucion + ' ' + x.medicamentos + ' ' + x.observacion + '</li>')).reduce((arr, item) => arr + item, '')
                arr.push({
                    ...item,
                    descripcion: [item.alergias, item.otros, item.alimentacion, item.oxigeno, '<nav>' + planHidratacion + '</nav>']
                })
                return arr
            }, []));
            /*
            setLista(res.data.datos)
            if (res.data.cabecera.length > 0) {
                setCabecera(res.data.cabecera[0])
            }
            */

        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (drawerOpen.item.boton !== undefined) {
            getDatos(drawerOpen.item.boton.persona_internacion_id)
        }
    }, [drawerOpen])

    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 },
                    mt: 2
                }}
                container
                direction="row"
                spacing={1}
            >
                <Grid item lg={12} >

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{'Fecha'}</TableCell>
                                    <TableCell>{'Profesional'}</TableCell>
                                    <TableCell>{'Especialidad'}</TableCell>
                                    <TableCell>{'Descripcion'}</TableCell>
                                    <TableCell>{''}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedmedicosLista.map((list) => {
                                    return (
                                        <TableRow hover key={list.id} >
                                            <TableCell>
                                                <Typography
                                                    noWrap
                                                    variant="subtitle1"
                                                    color="text.primary">
                                                    <b>{list.fechahora}</b>
                                                </Typography>

                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    noWrap
                                                    variant="subtitle1"
                                                    color="text.primary">
                                                    <b>{list.persona_crea}</b>
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    noWrap
                                                    variant="subtitle1"
                                                    color="text.primary">
                                                    <b>{list.nombre_especialidad}</b>
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Markup content={list.descripcion.join('<br/>')} />
                                            </TableCell>
                                            {/* <TableCell>
                                                {cabecera !== null && <BotonImprimir cabecera={cabecera} lista={list} tipo={tipo} />}
                                            </TableCell> */}
                                        </TableRow>

                                    );
                                })}
                            </TableBody>
                        </Table>

                    </TableContainer>
                    <Box p={2}>
                        <TablePagination
                            component="div"
                            count={lista.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleLimitChange}
                            page={page}
                            rowsPerPage={limit}
                            rowsPerPageOptions={[5, 10, 15]}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
