import React, { useEffect, useRef, useState } from 'react'
import { Box, Table, TableBody, Tooltip, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';


const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ removeRecetas, recetas: datos }) {
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
        removeRecetas(id);
    }

    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>

            <TableContainer>
                <Table ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Medicamentos')}</TableCell>
                            <TableCell>{t('Cantidad')}</TableCell>
                            <TableCell>{t('Frecuencia')}</TableCell>
                            <TableCell>{t('Duración')}</TableCell>
                            <TableCell>{t('Dosis')}</TableCell>
                            <TableCell>{t('UM')}</TableCell>
                            <TableCell>{t('Via administracion')}</TableCell>
                            <TableCell>{t('Observación')}</TableCell>
                            <TableCell>{t('1era dosis')}</TableCell>
                            <TableCell>{t('Unica Dosis')}</TableCell>
                            <TableCell align="center">{t('Acciones')}</TableCell>
                            {/* <TableCell align="center" /> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.map((list) => {
                            return (
                                <TableRow hover key={list.medicamento.id} >
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.medicamento.label}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.cantidad}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.frecuencia}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.duracion}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.dosis}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.unidadMedida.nombre}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.viaAdministracion.title}</b>
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
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.tipoDosis.id === '1' ? list.fecha : ''}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.tipoDosis.id !== '1' ? list.fecha : ''}</b>
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
