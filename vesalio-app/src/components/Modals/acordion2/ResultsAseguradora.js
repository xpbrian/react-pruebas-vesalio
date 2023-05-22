import React, { useEffect, useState } from 'react'
import { Box, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const applyPagination = (medicosLista, page, limit) => {
    console.log(medicosLista);
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ datos }) {
    const { t } = useTranslation();
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const [query, setQuery] = useState('')
    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };

    useEffect(() => {
        setLista(datos)
    }, [datos])


    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }
    useEffect(() => {
        if (query.length === 0) {
            setLista(datos)
        } else {
            setLista(datos.filter(x =>
                x.denominacion.toLowerCase().includes(query.toLowerCase())
            ))
        }
    }, [query])



    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>
            <Box p={2}>
                <TextField
                    sx={{
                        m: 0
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchTwoToneIcon />
                            </InputAdornment>
                        )
                    }}
                    onChange={handleQueryChange}
                    placeholder={t('Buscar')}
                    value={query}
                    size="small"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />

            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Aseguradora')}</TableCell>
                            <TableCell>{t('CUIT')}</TableCell>
                            <TableCell>{t('Cantidad')}</TableCell>
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
                                            color="text.primary"
                                        >
                                            <b>{list.denominacion}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.cuit}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.cantidadTotal}</b>
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
