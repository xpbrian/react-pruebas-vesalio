import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla() {
    const { t } = useTranslation();
    const tableRef = useRef(null);
    const { modalOpen } = useLayoutContext()
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
        setLista(modalOpen.item)
    }, [modalOpen])


    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>
            <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
            >
                <Button
                    sx={{ m: 4 }}
                    variant="outlined"
                    size='large'
                >
                    Generar
                </Button>

            </DownloadTableExcel>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Hora')}</TableCell>
                            <TableCell>{t('Especialidad')}</TableCell>
                            <TableCell>{t('Doctor')}</TableCell>
                            <TableCell>{t('Paciente')}</TableCell>
                            <TableCell>{t('Usuario')}</TableCell>
                            <TableCell>{t('Estado turno')}</TableCell>
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
                                            <b>{list.fecha}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.hora}</b>
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
                                            <b>{list.apellidosDoctor}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.apellidosPaciente}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.apellidosCreador}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.estado}</b>
                                        </Typography>

                                    </TableCell>


                                </TableRow>

                            );
                        })}
                    </TableBody>
                </Table>
                <Table ref={tableRef} sx={{ display: 'none' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Hora')}</TableCell>
                            <TableCell>{t('Especialidad')}</TableCell>
                            <TableCell>{t('Doctor')}</TableCell>
                            <TableCell>{t('Paciente')}</TableCell>
                            <TableCell>{t('Usuario')}</TableCell>
                            <TableCell>{t('Estado turno')}</TableCell>
                            {/* <TableCell align="center" /> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lista.map((list, ix) => {
                            return (
                                <TableRow hover key={ix} >
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.fecha}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.hora}</b>
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
                                            <b>{list.apellidosDoctor}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.apellidosPaciente}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.apellidosCreador}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.estado}</b>
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
