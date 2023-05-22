import React, { useEffect, useRef, useState } from 'react'
import { Box, Table, TableBody, Tooltip, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Markup } from 'interweave';


const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ removPlanH, planHidratacion: datos }) {
    const { t } = useTranslation();
    const tableRef = useRef(null);
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

    const handleRemove = async (id) => {
        removPlanH(id);
    }

    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>

            <TableContainer>
                <Table ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Solución')}</TableCell>
                            <TableCell>{t('Medicamentos')}</TableCell>
                            <TableCell>{t('Observación')}</TableCell>
                            <TableCell align="center">{t('Acciones')}</TableCell>
                            {/* <TableCell align="center" /> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.map((list, ix) => {
                            return (
                                <TableRow hover key={ix} >
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.solucion.label}</b>
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.cantidad}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Markup content={list.medicamento} />
                                    </TableCell>

                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.comentario}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={t('Eliminar')} arrow>
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                                onClick={() => handleRemove(list.medicamento.id)}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
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
