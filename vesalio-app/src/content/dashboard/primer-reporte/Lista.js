import React, { useEffect, useRef, useState } from 'react'
import {
    Box, Grid, IconButton, Link, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow
    , Typography
} from '@mui/material'
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslation } from 'react-i18next';
// import useLayoutContext from 'src/hooks/useAuthLayout';
// import TransformIcon from '@mui/icons-material/Transform';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useLayoutContext from 'src/hooks/useAuthLayout';
// import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ alephoo, datos, tipo }) {
    const { t } = useTranslation();
    const tableRef = useRef(null);
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

    const handleClickAlephoo = () => {
        try {
            mostrarComponent({
                contenido: 'alephoo',
                estado: true,
                size: 'md',
                item: alephoo
            }, 'modalOpen')
        } catch (e) {
            console.log(e);
        }

    }

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
                            <TableCell>{t('Usuario')}</TableCell>
                            <TableCell sx={{ display: tipo === 1 ? 'none' : '' }}>{t('Tipo')}</TableCell>
                            <TableCell>{t('Cantidad')}</TableCell>
                            <TableCell>{t('Generadas')}</TableCell>
                            <TableCell>{t('Anuladas')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.sort(function (a, b) {
                            if (a.id > b.id) {
                                return 1;
                            }
                            if (a.id < b.id) {
                                return -1;
                            }
                            return 0;
                        }).map((list) => {
                            return (
                                <TableRow hover key={list.id} >
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            {list.id.trim() === 'ALEPHOO' ? <Link href="#" color="inherit" onClick={handleClickAlephoo}>
                                                <b>{list.id.toUpperCase()}</b>
                                            </Link> : <b>{list.id.toUpperCase()}</b>}
                                        </Typography>

                                    </TableCell>
                                    {tipo !== 1 ? <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.tipo}`}</b>
                                        </Typography>
                                    </TableCell> : <>{''}</>}
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.cantidad}`}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.generado}</b>
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
                                </TableRow>

                            );
                        })}
                    </TableBody>
                </Table>
                <Table ref={tableRef} sx={{ display: 'none' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Usuario')}</TableCell>

                            <TableCell sx={{ display: tipo === 1 ? 'none' : '' }}>{t('Tipo')}</TableCell>
                            <TableCell>{t('Cantidad')}</TableCell>
                            <TableCell>{t('Generadas')}</TableCell>
                            <TableCell>{t('Anuladas')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lista.map((list) => {
                            return (
                                <TableRow hover key={list.id} >
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            {list.id.trim() === 'ALEPHOO' ? <Link href="#" color="inherit" onClick={handleClickAlephoo}>
                                                <b>{list.id.toUpperCase()}</b>
                                            </Link> : <b>{list.id.toUpperCase()}</b>}
                                        </Typography>

                                    </TableCell>
                                    {tipo !== 1 ? <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.tipo}`}</b>
                                        </Typography>
                                    </TableCell> : <>{''}</>}

                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.cantidad}`}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.generado}</b>
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
