import React, { useEffect, useState } from 'react'
import { Box, Button, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import { useNavigate } from 'react-router';
import HealingIcon from '@mui/icons-material/Healing';
import Label from 'src/components/Label';
import useAuth from 'src/hooks/useAuth';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ datos }) {
    const { t } = useTranslation();
    const { user } = useAuth()
    const { estadoTurnos, mostrarComponent } = useLayoutContext()
    const navigate = useNavigate();
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [queryEstado, setQueryEstado] = useState([1])

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };
    useEffect(() => {
        setLista(datos)
    }, [datos])

    useEffect(() => {
        let filtro = queryEstado.length === 0 ? datos : datos.filter(x => queryEstado.includes(x.estado_turno_id))
        setLista(filtro)
    }, [queryEstado])

    const onChangedEstadoturno = (e) => {
        setQueryEstado(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
    }

    const paginatedmedicosLista = applyPagination(lista, page, limit);

    // const resultadosMedicos = (item) => {
    //     mostrarComponent({
    //         contenido: 'resultadosMedicos',
    //         estado: true,
    //         title: item.nombre_paciente,
    //         subtitle: '(' + item.documento_paciente + ')',
    //         item: { ...item }
    //     }, 'drawerOpen')
    // }

    const clickHistoria = (documento) => {
        navigate('/clinica/historiaEnfermeria/' + documento)
    }
    const retornarGrado = (id) => {
        switch (id) {

            case 1:
                return <Chip label="I" color={"error"} variant="contained" />
            case 2:
                return <Chip label="II" sx={{ background: "orange" }} variant="contained" />
            case 3:
                return <Chip label="III" sx={{ background: "yellow" }} variant="contained" />
            case 4:
                return <Chip label="IV" color={"success"} variant="contained" />
            default:
                return '-'
        }
    }

    return (
        <>
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}>
                <Grid item xs={12} lg={4} mt={2} pr={1}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>{'Estados'}</InputLabel>
                        <Select
                            size='small'
                            multiple
                            value={queryEstado}
                            label={'Estados'}
                            onChange={(e) => onChangedEstadoturno(e)}
                        >
                            {estadoTurnos.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Fecha y Hora')}</TableCell>
                            <TableCell>{t('Prioridad de atención')}</TableCell>
                            <TableCell>{t('Paciente')}</TableCell>
                            <TableCell>{t('Historia')}</TableCell>
                            {/* <TableCell>{t('Doctor')}</TableCell> */}
                            <TableCell>{t('Ubicación')}</TableCell>
                            <TableCell>{t('Estado')}</TableCell>
                            <TableCell>{t('Acciones')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.sort(function (a, b) {
                            if (a.hora > b.hora) {
                                return -1;
                            }
                            if (a.hora < b.hora) {
                                return 1;
                            }
                            return 0;
                        }).map((list) => {
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
                                            {
                                                retornarGrado(list.grado_emergencia)
                                            }
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.nombre_paciente.toUpperCase()}`}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.documento_paciente}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={'Ver historia clinica de ' + list.nombre_paciente} arrow>
                                            <Button color='info' variant='contained' onClick={() => clickHistoria(list.documento_paciente)}>
                                                <Typography
                                                    noWrap
                                                    variant="h5"
                                                    color="white">
                                                    <b> {list.historia}</b>
                                                </Typography>
                                            </Button>

                                        </Tooltip>


                                    </TableCell>
                                    {/* <TableCell>
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
                                    </TableCell> */}
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
                                        <Label color={list.estado === 'Pendiente' ? 'warning' : 'secondary'}>
                                            {list.estado}
                                        </Label>

                                    </TableCell>
                                    <TableCell>
                                        {/* <Tooltip title={t('Ver resultados médicos')} arrow>
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                                onClick={() => resultadosMedicos(list)}>
                                                <FeaturedPlayListIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip> */}
                                        {

                                            (list.estado_turno_id !== 5 && user.cuenta.tipo_usuario.id === "03") && (<>

                                                <Tooltip title={t('Historia clínica')} arrow>
                                                    <IconButton
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => navigate('/clinica/historia/' + list.id)}>
                                                        <img width={27} src={`data:image/png;base64,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`} alt="estetoscopio" />
                                                    </IconButton>
                                                </Tooltip>
                                            </>)
                                        }

                                        {
                                            ((list.estado_turno_id !== 5 && user.cuenta.tipo_usuario.id === "09" && (list.especialidad_id === 335 || list.especialidad_id === 336)) &&
                                                <Tooltip title={t('Triaje')} arrow>
                                                    <IconButton
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => mostrarComponent({
                                                            contenido: 'triaje',
                                                            estado: true,
                                                            title: list.nombre_paciente,
                                                            subtitle: list.historia,
                                                            item: { object: list }
                                                        }, 'drawerOpen')}>
                                                        <HealingIcon color="primary" fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )
                                        }

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
                    labelRowsPerPage={"Páginas:"}
                    count={lista.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 15]}
                    labelDisplayedRows={({ from, to, count }) => { return `${from}–${to} de ${count !== -1 ? count : `${to}`}`; }}
                />
            </Box>
        </>
    )
}
