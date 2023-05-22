import React, { useEffect, useState } from 'react'
import { Box, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import PaymentsIcon from '@mui/icons-material/Payments';
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
            setLista(datos.filter(x => x.nombre_paciente.toLowerCase().includes(query.toLowerCase()) ||
                x.nombre_doctor.toLowerCase().includes(query.toLowerCase()) ||
                x.especialidad_nombre.toLowerCase().includes(query.toLowerCase())


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
                            <TableCell>{t('Fecha y Hora')}</TableCell>
                            <TableCell>{t('Paciente')}</TableCell>
                            <TableCell>{t('Historia')}</TableCell>
                            <TableCell>{t('Doctor')}</TableCell>
                            <TableCell>{t('Ubicación')}</TableCell>
                            <TableCell>{t('Estado')}</TableCell>
                         
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
                                            <b>{list.fecha.split('T')[0]}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.hora}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.nombre_paciente}`}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.documento_paciente}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {list.historia}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.nombre_doctor}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.especialidad_nombre}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.lugar_nombre}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.piso_nombre}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {list.estado}
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
