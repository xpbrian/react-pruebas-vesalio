import { Box, CardContent, Card, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';
import axios from 'axios';

const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};


export default function TablaPolizas({ coberturas }) {
    const { drawerOpen, updateCitasLista,mostrarComponent } = useLayoutContext()
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
        setTabla(coberturas);
    }, [coberturas])



    const handleSeleccionar = async () => {
        const rpta = await confirmSweetAlert('Pagar cita', '¿Esta seguro que desea pagar la cita', 'warning', true)
        if (rpta) {
            await axios.get(`http://apis-vesalio.com.pe/pagarCitaSistcomp/${drawerOpen.item.list._id}`)
            updateCitasLista()
            mostrarComponent({
                contenido: '',
                estado: false,
                size: 'xs'
            }, 'drawerOpen')
            setTimeout(() => {

                confirmSweetAlert('Pagar cita', 'Integrado a sistcomp', 'success', false)
            }, 1000)
        }
    }
    const paginatedmedicosLista = applyPagination(tabla, page, limit);


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
                                    <TableCell>{t('Descripcion')}</TableCell>
                                    <TableCell>{t('S/.')}</TableCell>
                                    <TableCell>{t('%')}</TableCell>
                                    <TableCell>{t('$')}</TableCell>
                                    <TableCell>{t('Dias')}</TableCell>
                                    <TableCell>{t('Proc')}</TableCell>
                                    <TableCell>{t('Otros')}</TableCell>
                                    <TableCell>{t('Farm')}</TableCell>
                                    <TableCell align="center">{t('')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedmedicosLista.map((item, index) => {

                                    return (
                                        <TableRow hover key={index}>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Cod_Des_Cobertura}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Imp_DeduSoles}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Imp_DeduPorcen}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Imp_DeduDolar}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Nro_DiasVigencia}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Imp_CoaProcedi}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Imp_CoaOtros}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.Imp_CoaFarmacia}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography noWrap>
                                                    <Tooltip title={t('Seleccionar')}
                                                        onClick={() => handleSeleccionar()}

                                                        arrow>
                                                        <IconButton
                                                            color="primary"
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
