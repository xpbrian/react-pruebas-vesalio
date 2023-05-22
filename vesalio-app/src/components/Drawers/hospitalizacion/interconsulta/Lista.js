import React, { useEffect, useState } from 'react'
import { Box, Table, Divider, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Tooltip, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { Markup } from 'interweave';
import ChatIcon from '@mui/icons-material/Chat';
import useLayoutContext from 'src/hooks/useAuthLayout';
import BotonImprimir from './BotonImprimir';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ lista: datos, getDatos, cabecera }) {
    const { t } = useTranslation();
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const { mostrarComponent } = useLayoutContext()
    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };

    useEffect(() => {
        setLista(datos)
    }, [datos])

    const handleContestar = (item) => {
        mostrarComponent({
            contenido: 'interconsultaResponder',
            estado: true,
            item: { id: item.id, actualizarView: () => getDatos() },

        }, 'modalOpen')
    }

    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Tipo')}</TableCell>
                            <TableCell>{t('Especialidad')}</TableCell>
                            <TableCell>{t('Profesional')}</TableCell>
                            <TableCell>{t('Descripcion')}</TableCell>
                            <TableCell>{t('')}</TableCell>
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
                                            <b>{list.tipoInterconsulta}</b>
                                        </Typography>
                                    </TableCell>
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
                                            <b>{list.solicitante}</b>
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="error">
                                            <b>{list.solicitado}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Markup content={list.descripcionSolicitud} />
                                        <Divider />
                                        <Markup content={list.comentario} />
                                    </TableCell>
                                    <TableCell>
                                        {list.comentario === null && <Tooltip title={t('Responder')} arrow>
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                                onClick={() => handleContestar(list)}>
                                                <ChatIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>}
                                        {list.comentario !== null &&
                                            <>{cabecera !== null && <BotonImprimir cabecera={cabecera} lista={list} />}</>
                                        }
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
