import React, { useEffect, useRef, useState } from 'react'
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslation } from 'react-i18next';
// import useLayoutContext from 'src/hooks/useAuthLayout';
// import TransformIcon from '@mui/icons-material/Transform';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import useLayoutContext from 'src/hooks/useAuthLayout';
import { DownloadTableExcel } from 'react-export-table-to-excel';
// import { Ticket } from './print/Ticket';
import ReactToPrint from 'react-to-print';
import { ImprimirLista } from './print/ImprimirLista';
// import ContenedorTicket from './ContenedorTicket';
import { Box, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, Chip, Grid } from '@mui/material'
import FilasTicket from './print/FilasTickets';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import EditIcon from '@mui/icons-material/Edit';
// import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
// import { Print, NoPrint } from "react-easy-print";
// import printJS from "print-js";
// import PrintProvider from 'react-easy-print'
// import { Ticket } from './print/Ticket';


const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ datos }) {
    const { t } = useTranslation();
    const tableRef = useRef(null);
    // const componentRef = useRef();
    const componentRef2 = useRef();

    const { mostrarComponent, estadoTurnos } = useLayoutContext()
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const [query, setQuery] = useState('')
    const [queryEstado, setQueryEstado] = useState([])
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
        if (query.length === 0 && queryEstado.length === 0) {
            setLista(datos)
        } else {
            let filtro = queryEstado.length === 0 ? datos : datos.filter(x => queryEstado.includes(x.estado_turno_id))
            setLista(filtro.filter(x => x.nombre_paciente.toLowerCase().includes(query.toLowerCase()) ||
                x.nombre_doctor.toLowerCase().includes(query.toLowerCase()) ||
                x.especialidad_nombre.toLowerCase().includes(query.toLowerCase()

                )
            ))
        }
    }, [query, queryEstado])

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


    const anularCita = (id) => {
        mostrarComponent({
            contenido: 'anularCita',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
    }
    const addObservacion = (id) => {
        mostrarComponent({
            contenido: 'addObservacion',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
    }
    const addMensajeWsp = (id) => {
        mostrarComponent({
            contenido: 'addMensajePaciente',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
    }
    const verObservacion = (id) => {
        mostrarComponent({
            contenido: 'verObservaciones',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
    }
    const onChangedEstadoturno = (e) => {
        setQueryEstado(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
    }
    // const handleClickSited = async (item) => {
    //     mostrarComponent({
    //         contenido: 'listaAtencionesSited',
    //         estado: true,
    //         title: 'Lista de Atenciones',
    //         subtitle: item.nombre_paciente,
    //         item: { documento: item.documento_paciente },
    //     }, 'drawerOpen')

    // }

    const editarPaciente = (obj) => {
        mostrarComponent({
            contenido: 'editarPaciente',
            estado: true,
            size: 'xs',
            item: obj
        }, 'modalOpen')
    }

    const addTeleconsulta = (obj) => {
        mostrarComponent({
            contenido: 'addTeleconulta',
            estado: true,
            size: 'xs',
            item: obj
        }, 'modalOpen')
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

                <Grid item xs={12} lg={2} mt={1} pr={1}>

                    <Box style={{ display: "flex" }}>
                        <Box>
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
                        </Box>

                        <Box style={{ marginTop: "3px", textAlign: "center" }}>
                            <div>
                                <ReactToPrint style={{ textAlign: "left" }}
                                    trigger={() => <Button fullWidth style={{ fontSize: "15px", width: "120px", padding: "10px" }} variant="contained">Imprimir Citas</Button>}
                                    content={() => componentRef2.current}
                                />
                                <div style={{ display: "none" }}>
                                    <ImprimirLista
                                        // pacienteLl={pacienteLl}
                                        // datosDiag={datosDiag}
                                        // descrip={descrip}
                                        // user={user}
                                        lista={lista}
                                        ref={componentRef2} />
                                </div>
                            </div>
                        </Box>
                    </Box>


                </Grid>

            </Grid>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('')}</TableCell>
                            <TableCell>{t('Fecha y Hora')}</TableCell>
                            <TableCell>{t('Paciente')}</TableCell>
                            <TableCell>{t('Doctor')}</TableCell>
                            <TableCell>{t('Prioridad de atención')}</TableCell>
                            <TableCell>{t('Ubicación')}</TableCell>
                            <TableCell>{t('Estado')}</TableCell>
                            <TableCell>{t('Celular')}</TableCell>
                            {/* <TableCell>{t('Celular Sistcomp')}</TableCell> */}
                            <TableCell>{t('Observaciones')}</TableCell>
                            <TableCell>{t('Usuario crea')}</TableCell>
                            <TableCell>{t('Fecha crea')}</TableCell>
                            {/* <TableCell align="center" >{t('')}</TableCell> */}
                            <TableCell align="center">{t('Acciones')}</TableCell>

                            <TableCell align="center" >{t('')}</TableCell>
                            {/* <TableCell align="center" /> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.map((list) => {
                            return (
                                
                                <FilasTicket  list={list} retornarGrado={retornarGrado} anularCita={anularCita} addObservacion={addObservacion} addMensajeWsp={addMensajeWsp} verObservacion={verObservacion}  editarPaciente={editarPaciente} addTeleconsulta={addTeleconsulta} />
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
