import React, { useState } from 'react'
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useTranslation } from 'react-i18next';
import Label from 'src/components/Label';
import CheckIcon from '@mui/icons-material/Check';
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';
import axios from 'axios';
import useAuth from 'src/hooks/useAuth';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaAgenda({ lista, getDatos }) {
    const { t } = useTranslation();
    const { dias } = useLayoutContext()
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const { modalOpen } = useLayoutContext()
    const { user } = useAuth()
    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };

    const estadoAgenda = async (obj) => {

        let rpta = await confirmSweetAlert(obj.estado_agenda === 1 ? 'Desactivar agenda' : 'Activar agenda',
            obj.estado_agenda === 1 ? 'Esta seguro que desea desactivar la agenda' : 'Esta seguro que desea activar la agenda',
            'info',
            true
        )

        if (rpta) {
            let comentario = obj.estado_agenda === 1 ? 'La agenda fue desactivada por ' : 'La agenda fue activada por '
            let nombres = user.datos.ape_paterno + ' ' + user.datos.ape_materno + ' ' + user.datos.nombres
            await axios.post(`http://apis-vesalio.com.pe/estadoAgenda`, {
                idAgenda: obj.id,
                comentario: comentario + nombres,
                estado: obj.estado_agenda === 1 ? 0 : 1
            })
            getDatos(modalOpen.item.personalId.asignacion_id)
        }


    }


    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Día')}</TableCell>
                            <TableCell>{t('Fecha Inicio')}</TableCell>
                            <TableCell>{t('Fecha Fin')}</TableCell>
                            <TableCell>{t('Hora')}</TableCell>
                            <TableCell>{t('Duracion turno')}</TableCell>
                            <TableCell>{t('Comentario')}</TableCell>
                            <TableCell>{t('Estado')}</TableCell>
                            <TableCell>{t('Consultorio')}</TableCell>
                            <TableCell align="center">{t('Acciones')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.sort(function (a, b) {
                            if (a.dia > b.dia) {
                                return 1;
                            }
                            if (a.dia < b.dia) {
                                return -1;
                            }
                            return 0;
                        }).map((list) => {
                            return (
                                <TableRow hover key={list.id} >
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {dias.find(x => x.id === parseInt(list.dia)).value}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.inicio_vigencia.split('T')[0]}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.fin_vigencia.split('T')[0]}</b>
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
                                            {list.comentario}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            <Label color={parseInt(list.estado_agenda) === 1 ? 'success' : 'error'}>{list.estado_agenda === 1 ? 'Activo' : 'Inactivo'}</Label>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.consultorio}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography noWrap>
                                            <Tooltip title={t(list.estado_agenda === 1 ? 'Desactivar agenda' : 'Ativar agenda')} arrow>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => estadoAgenda(list)}

                                                >
                                                    {
                                                        list.estado_agenda === 1 && <DeleteTwoToneIcon fontSize="small" />
                                                    }

                                                    {
                                                        list.estado_agenda !== 1 && <CheckIcon fontSize="small" />
                                                    }



                                                </IconButton>
                                            </Tooltip>
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
