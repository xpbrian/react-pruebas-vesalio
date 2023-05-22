import React, { useEffect, useState } from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaAgenda({ itemAxios }) {
    const { t } = useTranslation();
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };
    useEffect(() => {
        if (itemAxios !== null) {
            setLista(itemAxios.cabecera)
            console.log(itemAxios);
        }

    }, [itemAxios])

    const paginatedmedicosLista = applyPagination(lista, page, limit);
    const retornarNombreMes = (mes) => {
        switch (mes) {
            case '01':
                return 'Enero';
            case '02':
                return 'Febrero';
            case '03':
                return 'Marzo';
            case '04':
                return 'Abril';
            case '05':
                return 'Mayo';
            case '06':
                return 'Junio';
            case '07':
                return 'Julio';
            case '08':
                return 'Agosto';
            case '09':
                return 'Setiembre';
            case '10':
                return 'Octubre';
            case '11':
                return 'Noviembre';
            case '12':
                return 'Diciembre';
            default:
                return 'Error'
        }
    }
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Mes Creación')}</TableCell>
                            <TableCell>{t('Día')}</TableCell>
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Hora')}</TableCell>
                            <TableCell>{t('Duracion turno')}</TableCell>
                            <TableCell>{t('Consultorio')}</TableCell>
                            <TableCell>{t('Especialidad')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.map((list) => {
                            return (
                                <TableRow hover key={list.id_agenda} >
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {retornarNombreMes(list.inicio_vigencia.split('T')[0].split('-')[1])}
                                        </Typography>

                                    </TableCell>
                                    <TableCell>

                                        <Typography noWrap variant="h5">
                                            {list.dia}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.inicio_vigencia.split('T')[0].split('-')[2] + '-' + list.inicio_vigencia.split('T')[0].split('-')[1] + '-' + list.inicio_vigencia.split('T')[0].split('-')[0]}</b>
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.fin_vigencia.split('T')[0].split('-')[2] + '-' + list.fin_vigencia.split('T')[0].split('-')[1] + '-' + list.fin_vigencia.split('T')[0].split('-')[0]}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.hora_inicio}</b>
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.hora_fin}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.duracion_turno}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.Consultorio}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.especialidad}
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
