import React, { useEffect, useRef, useState } from 'react'
import { Box, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, Grid, Button } from '@mui/material'
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslation } from 'react-i18next';
// import useLayoutContext from 'src/hooks/useAuthLayout';
// import TransformIcon from '@mui/icons-material/Transform';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

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
                        <Button
                            sx={{
                                m: .5
                            }}
                            variant="outlined"
                        >
                            {t('Exportar')}
                        </Button>

                    </DownloadTableExcel>
                </Grid>
            </Grid>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Fecha y Hora')}</TableCell>
                            <TableCell>{t('Paciente')}</TableCell>
                            <TableCell>{t('Doctor')}</TableCell>
                            <TableCell>{t('Ubicación')}</TableCell>
                            <TableCell>{t('Estado')}</TableCell>
                            <TableCell>{t('Celular')}</TableCell>
                            <TableCell>{t('Observaciones')}</TableCell>
                            <TableCell>{t('Usuario crea')}</TableCell>
                            <TableCell>{t('Fecha crea')}</TableCell>

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
                                            color="text.primary"
                                        >
                                            <b>{list.fecha.split('T')[0].split('-')[2] + '-' + list.fecha.split('T')[0].split('-')[1] + '-' + list.fecha.split('T')[0].split('-')[0]}</b>
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
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.celular}</b>
                                        </Typography>

                                    </TableCell>
                                    {/* <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.Nro_TelMovil}</b>
                                        </Typography>

                                    </TableCell> */}
                                    <TableCell>
                                        {list.observacion}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            {list.nombre_usuario}
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.created_at.split('T')[0].split('-')[2] + '-' + list.created_at.split('T')[0].split('-')[1] + '-' + list.created_at.split('T')[0].split('-')[0]}</b>
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b> {((parseInt(list.created_at.split('T')[1].split('.')[0].split(':')[0]) - 5) < 0 ? (parseInt(list.created_at.split('T')[1].split('.')[0].split(':')[0]) - 5) * -1 : (parseInt(list.created_at.split('T')[1].split('.')[0].split(':')[0]) - 5)) + ':' + list.created_at.split('T')[1].split('.')[0].split(':')[1]}</b>

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
                            <TableCell>{t('Numero documento')}</TableCell>
                            <TableCell>{t('Especialidad')}</TableCell>
                            <TableCell>{t('Doctor')}</TableCell>
                            <TableCell>{t('Ubicación')}</TableCell>
                            <TableCell>{t('Nivel')}</TableCell>
                            <TableCell>{t('Estado')}</TableCell>
                            <TableCell>{t('Celular')}</TableCell>
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
                                            {list.fecha.split('T')[0].split('-')[2] + '-' + list.fecha.split('T')[0].split('-')[1] + '-' + list.fecha.split('T')[0].split('-')[0]}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.hora}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.nombre_paciente}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.documento_paciente}
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
                                            {list.lugar_nombre}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.piso_nombre}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.estado}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.celular}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            {list.nombre_usuario}
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap color="text.secondary">
                                            <b>{list.created_at.split('T')[0].split('-')[2] + '-' + list.created_at.split('T')[0].split('-')[1] + '-' + list.created_at.split('T')[0].split('-')[0]}</b>
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
