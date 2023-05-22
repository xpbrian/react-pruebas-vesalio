import React, { useEffect, useState } from 'react'
import { Box, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslation } from 'react-i18next';
// import useLayoutContext from 'src/hooks/useAuthLayout';
// import TransformIcon from '@mui/icons-material/Transform';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

// import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

const applyPagination = (medicosLista, page, limit) => {
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
        console.log(datos);
    }, [datos])


    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }

    useEffect(() => {

        if (query.length === 0) {
            setLista(datos)
        } else {
            setLista(datos.filter(x => `${x.usuarioData.ape_paterno} ${x.usuarioData.ape_materno} ${x.usuarioData.nombres}`.toLowerCase().includes(query.toLowerCase()) ||
                x.nombre_doctor.toLowerCase().includes(query.toLowerCase()) ||
                x.especialidad_nombre.toLowerCase().includes(query.toLowerCase()

                )
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
                            <TableCell>{t('Doctor')}</TableCell>
                            <TableCell>{t('Ubicación')}</TableCell>
                            <TableCell>{t('Estado')}</TableCell>
                            <TableCell>{t('Celular')}</TableCell>
                            <TableCell>{t('Observaciones')}</TableCell>
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
                                            {list.hora.split(':')[0] + ':' + list.hora.split(':')[1]}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.usuarioData.ape_paterno} ${list.usuarioData.ape_materno} ${list.usuarioData.nombres}`}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.usuarioData.numero_documento}
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
                                            <b>{list.usuarioData.whatsapp}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.observacion}</b>
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
