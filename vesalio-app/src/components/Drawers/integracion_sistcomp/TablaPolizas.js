import { Box, CardContent, Card, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};
export default function TablaPolizas({ empresaSelected, handleCoberturas }) {
    const { t } = useTranslation();
    const [tabla, setTabla] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };
    useEffect(() => {
        const getDatos = async (codEmpresa) => {
            const data = await axios.get(`http://apis-vesalio.com.pe/polizas/${codEmpresa}`)
            setTabla(data.data);
        }
        getDatos(empresaSelected)
    }, [empresaSelected])
    const paginatedmedicosLista = applyPagination(tabla, page, limit);

    const handleClickSeleccionar = async (item) => {
        const rpta = await axios.post(`http://apis-vesalio.com.pe/polizasCoberturas`, {
            datos: [
                { id: 'Cod_Empresa', value: item.Cod_Empresa },
                { id: 'Nro_Correla', value: item.Nro_Correla },
            ]
        })
        handleCoberturas(rpta.data)
    }
    return (
        <>
            {tabla.length === 0 && 'Sin polizas'}
            {tabla.length > 0 && <Card>
                <CardContent>
                    Lista de polizas
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('N')}</TableCell>
                                    <TableCell>{t('Tipo')}</TableCell>
                                    <TableCell>{t('Descripcion')}</TableCell>
                                    <TableCell align="center">{t('')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedmedicosLista.sort(function (a, b) {
                                    if (a.Nro_Correla > b.Nro_Correla) {
                                        return 1;
                                    }
                                    if (a.Nro_Correla < b.Nro_Correla) {
                                        return -1;
                                    }
                                    return 0;
                                }).map((item, index) => {

                                    return (
                                        <TableRow hover key={index}>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Nro_Correla}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Nro_Poliza}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Des_Poliza}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography noWrap>
                                                    <Tooltip title={t('Seleccionar')} arrow>
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => handleClickSeleccionar(item)}
                                                        >
                                                            <EditIcon fontSize="small" />
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
                </CardContent> <Box p={2}>
                    <TablePagination
                        component="div"
                        count={tabla.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 15]}
                    />
                </Box></Card>}

        </>
    )
}
