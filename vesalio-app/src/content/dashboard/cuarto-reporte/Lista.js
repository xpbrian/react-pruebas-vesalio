import React, { useEffect, useRef, useState } from 'react'
import { Box, Grid, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslation } from 'react-i18next';
// import useLayoutContext from 'src/hooks/useAuthLayout';
// import TransformIcon from '@mui/icons-material/Transform';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

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
                x.paciente.toLowerCase().includes(query.toLowerCase()) ||
                x.nombre_usuario.toLowerCase().includes(query.toLowerCase()) ||
                x.nombre_doctor.toLowerCase().includes(query.toLowerCase()) ||
                x.especialidad_nombre.toLowerCase().includes(query.toLowerCase()

                )
            ))
        }
    }, [query])





    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}>
                <Grid item xs={12} lg={6}>
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
                </Grid>
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
                            <TableCell>{t('Fecha y Hora')}</TableCell>
                            <TableCell>{t('Paciente')}</TableCell>
                            <TableCell>{t('Aseguradora')}</TableCell>
                            <TableCell>{t('Doctor')}</TableCell>
                            <TableCell>{t('Estado')}</TableCell>
                            <TableCell>{t('Usuario crea')}</TableCell>
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
                                            <b>{list.fecha}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.hora.split(':')[0] + ':' + list.hora.split(':')[1]}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.paciente.toUpperCase()}`}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.documento}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.aseguradora}`}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.nombre_doctor.toUpperCase()}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.especialidad_nombre}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {list.estado_turno}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.nombre_usuario.toUpperCase()}`}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.creado}
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
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Hora')}</TableCell>
                            <TableCell>{t('Paciente')}</TableCell>
                            <TableCell>{t('Aseguradora')}</TableCell>
                            <TableCell>{t('Especialidad')}</TableCell>
                            <TableCell>{t('Doctor')}</TableCell>
                            <TableCell>{t('Estado')}</TableCell>
                            <TableCell>{t('Usuario crea')}</TableCell>
                            <TableCell>{t('Fecha crea')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lista.map((list) => {
                            return (
                                <TableRow hover key={list.id} >
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.fecha}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.hora}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.paciente}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.aseguradora}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.especialidad_nombre}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.nombre_doctor}
                                        </Typography>
                                    </TableCell>



                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.estado_turno}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.nombre_usuario}
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            <b>{list.creado}</b>
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
