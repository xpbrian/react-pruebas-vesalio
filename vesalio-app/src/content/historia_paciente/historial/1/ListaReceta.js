import React, { useEffect, useRef, useState } from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next';
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./PrintReceta";


const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ recetas: datos, datosUsuario, item, diagnosticos }) {
    const { t } = useTranslation();
    const tableRef = useRef(null);
    const componentRef = useRef();
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };

    useEffect(() => {
        setLista(datos)
    }, [datos])

    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>


            {
                datos.length > 0 && <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        m: 2

                    }}
                >
                    <ReactToPrint
                        // onAfterPrint={() => resetCarrito()}
                        trigger={() => (
                            <Button color="primary" variant="contained">
                                Imprimir
                            </Button>
                        )}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}>
                        <ComponentToPrint
                            ref={componentRef}
                            datos={datos}
                            datosUsuario={datosUsuario}
                            diagnosticos={diagnosticos}
                            item={item}
                        />
                    </div>
                </Box>
            }
            <TableContainer>
                <Table ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Medicamentos')}</TableCell>
                            <TableCell>{t('Detalle')}</TableCell>
                            <TableCell>{t('Via administracion')}</TableCell>
                            <TableCell>{t('Observación')}</TableCell>

                            {/* <TableCell align="center" /> */}
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
                                            <b>{list.nombre}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.cadaTiempo}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.via_administracion}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.comentario}</b>
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
                    count={lista.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 15]}
                />
            </Box>
        </>
    )
}
