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
    const [limit, setLimit] = useState(10);
    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };
    useEffect(() => {
        setLista(datos.reduce((arr, item) => {
            let find = arr.findIndex(x => x.id === item.id)
            if (find < 0) {
                arr.push({ ...item })
            } else {
                arr[find].generado += item.generado
                arr[find].anulado += item.anulado
                arr[find].cantidad += item.cantidad
            }
            return arr
        }, []))
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
                            <TableCell>{t('Apellidos')}</TableCell>
                            <TableCell>{t('Documento')}</TableCell>
                            <TableCell>{t('Tipo')}</TableCell>
                            <TableCell>{t('No Realizada')}</TableCell>
                            <TableCell>{t('Realizada')}</TableCell>
                            <TableCell>{t('Anulado')}</TableCell>
                            <TableCell>{t('Total')}</TableCell>

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
                                            color="text.primary"
                                        >
                                            <b>{`${list.id}`}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.documento}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.tipo}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.pendiente}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.realizada}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.anulado}</b>
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
                <Table ref={tableRef} sx={{ display: 'none' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Apellidos')}</TableCell>
                            <TableCell>{t('Documento')}</TableCell>
                            <TableCell>{t('Tipo')}</TableCell>
                            <TableCell>{t('No Realizada')}</TableCell>
                            <TableCell>{t('Realizada')}</TableCell>
                            <TableCell>{t('Anulado')}</TableCell>
                            <TableCell>{t('Total')}</TableCell>
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
                                            color="text.primary"
                                        >
                                            <b>{`${list.id}`}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.documento}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.tipo}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.pendiente}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.realizada}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.anulado}</b>
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
