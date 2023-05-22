import React, { useEffect, useRef, useState } from 'react'
import {
    Box, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow
    , Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ datos }) {
    const { t } = useTranslation();
    const tableRef = useRef(null);
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
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
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}>

                <Grid item xs={12} lg={2} mt={1} pr={1}>
                    <DownloadTableExcel
                        filename="users table"
                        sheet="users"
                        currentTableRef={tableRef.current}
                    >
                        <IconButton
                            size="medium"
                            color="secondary"
                        >
                            <FileDownloadIcon fontSize="small" />
                        </IconButton>

                    </DownloadTableExcel>
                </Grid>
            </Grid>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Especialidad')}</TableCell>
                            <TableCell>{t('Cantidad')}</TableCell>
                            <TableCell>{t('Generadas')}</TableCell>
                            <TableCell>{t('Desertadas')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.sort(function (a, b) {
                            if (a.nombre > b.nombre) {
                                return 1;
                            }
                            if (a.nombre < b.nombre) {
                                return -1;
                            }
                            return 0;
                        }).map((list) => {
                            return (
                                <TableRow hover key={list.especialidadId} >
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.nombre.toUpperCase()}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.generados + list.desertados}`}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.generados}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.desertados}</b>
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                            );
                        })}
                    </TableBody>
                </Table>
                <Table ref={tableRef} sx={{display: "none"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Especialidad')}</TableCell>
                            <TableCell>{t('Cantidad')}</TableCell>
                            <TableCell>{t('Generadas')}</TableCell>
                            <TableCell>{t('Desertadas')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lista.sort(function (a, b) {
                            if (a.nombre > b.nombre) {
                                return 1;
                            }
                            if (a.nombre < b.nombre) {
                                return -1;
                            }
                            return 0;
                        }).map((list) => {
                            return (
                                <TableRow hover key={list.especialidadId} >
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.nombre.toUpperCase()}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.generados + list.desertados}`}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.generados}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.desertados}</b>
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
