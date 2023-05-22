import React, { useEffect, useState } from 'react'
import {
    Box,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next';
import SelectTipoUsuario from './SelectTipoUsuario';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import useAuth from 'src/hooks/useAuth';
import EditIcon from '@mui/icons-material/Edit';
import useLayoutContext from 'src/hooks/useAuthLayout';

// import useLayoutContext from 'src/hooks/useAuthLayout';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ lista: datos }) {
    const { user } = useAuth()
    const { t } = useTranslation();
    const { mostrarComponent } = useLayoutContext()
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [query, setQuery] = useState('')
    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };
    useEffect(() => {
        console.log(user);
    }, [user])
    useEffect(() => {
        if (query.length === 0) {
            setLista(datos)

        } else {
            setLista(datos.filter(x => x.datos.numero_documento.includes(query) || (x.datos.ape_paterno + ' ' + x.datos.ape_materno + ' ' + x.datos.nombres).toUpperCase().includes(query.toUpperCase())))

        }
    }, [datos, query])
    const handleQueryChange = (e) => {
        setQuery(e.target.value)
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
                            {
                                user.cuenta.tipo_usuario.id === '02' && <TableCell>{t('Cambiar')}</TableCell>
                            }
                            <TableCell>{t('Fecha y Hora registro')}</TableCell>
                            <TableCell>{t('Apellidos y nombres')}</TableCell>
                            <TableCell>{t('Documento')}</TableCell>
                            <TableCell>{t('Cuenta')}</TableCell>
                            <TableCell>{t('Tipo')}</TableCell>
                            <TableCell>{t('Whatsapp')}</TableCell>
                            <TableCell>{t('Correo')}</TableCell>

                            {
                                user.cuenta.tipo_usuario.id === '02' && <TableCell>{t('Tipo Usuario')}</TableCell>
                            }

                            <TableCell>{t('Firma')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.map((list) => {
                            return (
                                <TableRow hover key={list._id} >

                                    <TableCell>
                                        {
                                            user.cuenta.tipo_usuario.id === '02' && <Tooltip title={t('cambiar usuario')} arrow>
                                                <IconButton
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() => mostrarComponent({
                                                        contenido: 'cambiarUsuario',
                                                        estado: true,
                                                        title: list.datos.ape_paterno + ' ' + list.datos.ape_materno + ' ' + list.datos.nombres,
                                                        subtitle: list.datos.numero_documento,
                                                        item: { object: list }
                                                    }, 'drawerOpen')}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        }



                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.createdAt.split('T')[0]}
                                        </Typography>
                                        <Typography noWrap variant="h5">
                                            {((parseInt(list.createdAt.split('T')[1].split('.')[0].split(':')[0]) - 5) < 0 ? (parseInt(list.createdAt.split('T')[1].split('.')[0].split(':')[0]) - 5) * -1 : (parseInt(list.createdAt.split('T')[1].split('.')[0].split(':')[0]) - 5)) + ':' + list.createdAt.split('T')[1].split('.')[0].split(':')[1]}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.datos.ape_paterno + ' ' + list.datos.ape_materno + ' ' + list.datos.nombres}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.datos.nombre_tipo_documento}</b>
                                        </Typography>
                                        <Typography noWrap color="text.secondary">
                                            {list.datos.numero_documento}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.cuenta.usuario}
                                        </Typography>
                                        {
                                            user.cuenta.tipo_usuario.id === '02' && <Typography noWrap variant="h5">
                                                {list.cuenta.password}
                                            </Typography>
                                        }


                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.cuenta.tipo_usuario.descripcion}
                                        </Typography>
                                    
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.datos.whatsapp}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.datos.correo}
                                        </Typography>
                                    </TableCell>
                                    {
                                        user.cuenta.tipo_usuario.id === '02' && <TableCell>
                                            <Typography noWrap variant="h5">
                                                <SelectTipoUsuario item={list} key={list._id} />
                                            </Typography>
                                        </TableCell>
                                    }

                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            <a href={'http://localhost/vesalio/pdf/prueba2.pdf'} rel="noreferrer" target="_blank">Abrir PDF</a>
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
