import React, { useEffect, useRef, useState } from 'react'
import { Box, InputAdornment, Table, TableBody, Tooltip, TableCell, Zoom, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import confirmSweetAlert from 'src/utils/confirm';
import useLayoutContext from 'src/hooks/useAuthLayout';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ lista: datos }) {
    const { t } = useTranslation();
    const tableRef = useRef(null);
    const { enqueueSnackbar } = useSnackbar();
    const { drawerOpen } = useLayoutContext()
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const { user } = useAuth()

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
            setLista(datos.filter(x => x.nombre.toUpperCase().includes(query.toUpperCase()) || x.profesional.toUpperCase().includes(query.toUpperCase())))
        } else {
            setLista(datos)
        }
    }, [query, datos])


    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }

    const handleRemove = async (id) => {
        let confirm = await confirmSweetAlert('Eliminar antecedente no patologico', '¿Esta seguro que desea remover el antecedente no patologico?', 'warning', true)
        if (confirm) {
            let obj = {
                documento: user.datos.numero_documento,
                id
            }
            const response = await axios.post(`http://200.121.91.211:4001/removeAntecedenteNoPatologico`, { ...obj })
            if (typeof response.data === 'object') {
                enqueueSnackbar(response.data.error, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
            } else {
                enqueueSnackbar(response.data, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
                drawerOpen.item.setDatosAntecedentes('noPatologicos')
            }

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

            <TableContainer>
                <Table ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Comentario')}</TableCell>
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Profesional')}</TableCell>
                            <TableCell align="center">{t('Acciones')}</TableCell>
                            {/* <TableCell align="center" /> */}
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
                                            <b>{list.comentario}</b>
                                        </Typography>

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
                                            <b>{list.profesional}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={t('Eliminar')} arrow>
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                                onClick={() => handleRemove(list.id)}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
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
