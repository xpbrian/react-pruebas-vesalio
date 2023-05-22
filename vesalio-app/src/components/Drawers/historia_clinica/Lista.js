import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import useLayoutContext from 'src/hooks/useAuthLayout';
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './Print';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router';


const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ lista: datos }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const tableRef = useRef(null);
    const { drawerOpen } = useLayoutContext()
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [selected, setSelected] = useState(null)
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
            setLista(datos.filter(x => x.Nro_DocIdenti.toUpperCase().includes(query.toUpperCase()) || (x.DesApePaterno + ' ' + x.DesApeMaterno + ' ' + x.DesNombres).toUpperCase().includes(query.toUpperCase())))
        } else {
            setLista(datos)
        }
    }, [query, drawerOpen])



    const handleCheck = (item) => {
        if (selected === null) {
            setSelected(item)
        } else {
            setSelected(selected.Nro_Historia === item.Nro_Historia ? null : item)
        }
    }

    const handleClick = (item) => {
        navigate('/clinica/historiaEnfermeria/' + item.Nro_DocIdenti)
    }

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
            {
                selected !== null && <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mb: 2
                    }}
                >
                    <ReactToPrint
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
                            selected={selected}

                        />
                    </div>
                </Box>
            }
            <TableContainer>
                <Table ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('')}</TableCell>
                            <TableCell>{t('Apellidos y Nombres')}</TableCell>
                            <TableCell>{t('Documento')}</TableCell>
                            <TableCell>{t('Nro Historia')}</TableCell>
                            <TableCell>{t('')}</TableCell>
                            {/* <TableCell align="center" /> */}
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
                                                    checked={selected === null ? false : (selected.Nro_historia === list.Nro_historia && true)}
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
                                            <b>{(list.Des_ApePaterno + ' ' + list.Des_ApeMaterno + ' ' + list.Des_Nombres)}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.Nro_DocIdenti}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.Nro_Historia}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {list.isAlephoo && <Tooltip title={t('Ver Historia')} arrow>
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                                onClick={() => handleClick(list)}
                                            >
                                                <RemoveRedEyeIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>}

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
