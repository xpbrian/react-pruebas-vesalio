import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import useLayoutContext from 'src/hooks/useAuthLayout';
import Label from 'src/components/Label';
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './Print';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ lista: datos }) {
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
            setLista(datos.filter(x => x.Nro_AutoSiteds.toUpperCase().includes(query.toUpperCase()) || x.Nro_AutoSiteds.toUpperCase().includes(query.toUpperCase())))
        } else {
            setLista(datos)
        }
    }, [query, drawerOpen])



    const handleCheck = (item) => {
        if (selected === null) {
            setSelected(item)
        } else {
            setSelected(selected.Nro_AutoSiteds === item.Nro_AutoSiteds ? null : item)
        }
    }

    useEffect(() => {
        console.log(selected);
    }, [selected])
    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }

    const exportarNombre = (em) => {
        switch (em) {
            case 'EM':
                return <Label>Emergencia</Label>
            case 'AM':
                return <Label>Ambulatorio</Label>
            default:
                return <Label>Ambulatorio</Label>
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
                selected !== null && <Box
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
                            <TableCell>{t('O. Atenc. Med.')}</TableCell>
                            <TableCell>{t('Tipo')}</TableCell>
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Medico')}</TableCell>
                            <TableCell>{t('Empresa')}</TableCell>
                            <TableCell>{t('Cobertura')}</TableCell>
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
                                                    checked={selected === null ? false : (selected.Nro_AutoSiteds === list.Nro_AutoSiteds && true)}
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
                                            <b>{list.Nro_AutoSiteds}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {exportarNombre(list.Cod_OriAtencio)}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.fecha}</b>
                                        </Typography>
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
                                            <b>{list.Des_Medico}</b>
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.Des_EspeMedico}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.Des_Empresa}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            Seguro:<b>{list.Des_CiaSeguro}</b>
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            Cobertura:<b>{list.Des_Cobertura}</b>
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            Poliza:<b>{list.Des_Poliza}</b>
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
