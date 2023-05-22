import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Markup } from 'interweave';
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./Print";

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ lista: datos }) {
    const { t } = useTranslation();
    const tableRef = useRef(null);
    const [lista, setLista] = useState([])
    const [array, setArray] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const componentRef = useRef();
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
    const handleCheck = (item) => {
        if (array.find(x => x === item.id) === undefined) {
            setArray([...array, item.id])
        } else {
            setArray(x => x.filter(x => x !== item.id))
        }
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
            {
                array.length > 0 && <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mb: 2
                    }}
                >
                    <ReactToPrint
                        // onAfterPrint={() => resetCarrito()}
                        trigger={() => (
                            <Button color="primary" variant="contained">
                                Imprimir
                            </Button>
                        )}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}>
                        <ComponentToPrint
                            ref={componentRef}
                            datos={lista.filter(x => array.find(y => y === x.id) !== undefined)}
                        />
                    </div>
                </Box>
            }

            <TableContainer>
                <Table ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{''}</TableCell>
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Profesional')}</TableCell>
                            <TableCell>{t('Estudio')}</TableCell>
                            <TableCell>{t('Informacion')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.map((list, ix) => {
                            return (
                                <TableRow hover key={ix} >
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={array.find(x => x === list.id) !== undefined && true}
                                                    name="terms"
                                                    color="primary"
                                                    onChange={() => handleCheck(list)}
                                                />
                                            }
                                        />
                                    </TableCell>
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
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.estudioNombre}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Markup content={list.informacion} />
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
