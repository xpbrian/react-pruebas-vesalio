import React, { useEffect, useState,useRef } from 'react'
import { Box,  InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Markup } from 'interweave';


const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ lista: datos }) {
    const { t } = useTranslation();
    const tableRef = useRef(null);
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
        console.log(datos);
    }, [datos])

    useEffect(() => {
        if (query.length > 0) {
            setLista(datos.filter(x => x.informadoPor.toUpperCase().includes(query.toUpperCase())))
        } else {
            setLista(datos)
        }
    }, [query, datos])


    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }


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
                    value={query}
                    placeholder={t('Buscar')}
                    size="small"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            </Box>


            <TableContainer>
                <Table ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Profesional')}</TableCell>
                            <TableCell>{t('Nota')}</TableCell>
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
                                            <b>{list.fechahora}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.informadoPor}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Markup content={list.nota} />
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
