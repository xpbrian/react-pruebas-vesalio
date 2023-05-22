import React, { useEffect, useState } from 'react'
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import TransformIcon from '@mui/icons-material/Transform';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ lista: datos }) {
    const { t } = useTranslation();
    const { mostrarComponent } = useLayoutContext()
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
        setLista(datos)
    }, [datos])



    const anularCita = async (id) => {
        mostrarComponent({
            contenido: 'anularCita',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
    }
    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Fecha y Hora')}</TableCell>
                            <TableCell>{t('Paciente')}</TableCell>
                            <TableCell>{t('Doctor')}</TableCell>
                            <TableCell>{t('Consultorio')}</TableCell>
                            <TableCell>{t('Estado')}</TableCell>
                            <TableCell align="center">{t('Acciones')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.map((list) => {
                            return (
                                <TableRow hover key={list._id} >
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.fecha}</b>
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
                                            <b>{`${list.datos.paciente.paciente.ape_paterno} ${list.datos.paciente.paciente.ape_materno} ${list.datos.paciente.paciente.nombres}`}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.datos.paciente.paciente.numero_documento}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.datos.doctor.Nombres}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.datos.doctor.especialidad}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.datos.doctor.Consultorio}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {list.anulado.estado ? 'Anulado' : list.estado}
                                    </TableCell>
                                    <TableCell align="center">
                                        {(list.anulado.estado || list.estado === 'Pagado') ? 'Sin acciones' : <Typography noWrap>
                                            <Tooltip title={t('Generar pago')} arrow>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => mostrarComponent({
                                                        contenido: 'generarHistoriaSiscomp',
                                                        estado: true,
                                                        title: `${list.datos.paciente.paciente.ape_paterno} ${list.datos.paciente.paciente.ape_materno} ${list.datos.paciente.paciente.nombres}`,
                                                        subtitle: list.datos.paciente.paciente.numero_documento,
                                                        item: {
                                                            list
                                                        }
                                                    }, 'drawerOpen')}
                                                >
                                                    <PaymentsIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={t('Transferir doctor')} arrow>
                                                <IconButton
                                                    color="primary"
                                                >
                                                    <TransformIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={t('Eliminar')} arrow >
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => anularCita(list._id)}
                                                >
                                                    <DeleteTwoToneIcon fontSize="small" />

                                                </IconButton>
                                            </Tooltip>

                                        </Typography>}


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
