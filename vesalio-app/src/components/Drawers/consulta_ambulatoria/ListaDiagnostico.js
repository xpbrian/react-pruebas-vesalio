import React, { useEffect, useRef, useState } from 'react'
import { Box, Table, TableBody, Tooltip, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, IconButton, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ removeDiagnostico, changedDiagnosticoPrioridad, diagnosticos: datos, diagnosticoPrioridad }) {
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


    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>

            <TableContainer>
                <Table ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Nombre')}</TableCell>
                            <TableCell>{t('Prioridad')}</TableCell>
                            <TableCell align="center">{t('Acciones')}</TableCell>
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
                                            <b>{list.label}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Switch edge="end" color="primary" checked={diagnosticoPrioridad.find(x => x === list.id) !== undefined && true} onChange={() => changedDiagnosticoPrioridad(list.id)} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title={t('Eliminar')} arrow>
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                                onClick={() => removeDiagnostico(list.id)}
                                            >
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
