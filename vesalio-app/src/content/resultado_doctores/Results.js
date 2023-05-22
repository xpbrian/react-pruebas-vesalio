import React, { useEffect, useState } from 'react'
import { Box, Button, Table, CardHeader, TableBody, styled, Dialog, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Card, IconButton, Divider, Grid, TextField, InputAdornment } from '@mui/material'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import PdfItem from 'src/pdf/PdfAll'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
// import useLayoutContext from 'src/hooks/useAuthLayout';

const DialogWrapper = styled(Dialog)(
    () => `
         .MuiDialog-paper {
          overflow: visible;
         }
   `
);
const applyPagination = (medicosLista, page, limit) => {
    return medicosLista.slice(page * limit, page * limit + limit);
};

export default function ListaCitasTabla({ lista: datos }) {
    // const { mostrarComponent } = useLayoutContext()
    const { t } = useTranslation();
    const [lista, setLista] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [modal, setModal] = useState(false)
    const [pdf, setPdf] = useState(null)
    const [query, setQuery] = useState('')

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };
    useEffect(() => {
        setLista(datos)
        console.log(datos);
    }, [datos])
    useEffect(() => {
        if (query.length === 0) {
            setLista(datos)
        } else {
            setLista(datos.filter(x => x.Des_EspeMedico.toLowerCase().includes(query.toLowerCase())
            ))
        }
    }, [query])
    const getPdf = async (ruta) => {
        const enviar = await axios.post(`http://apis-vesalio.com.pe/getResultadoPDF`, { ruta })
        setModal(true)
        setPdf(enviar.data);
    }
    useEffect(() => {
        if (!modal) {
            setPdf(null)
        }
    }, [modal])
    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }
    const paginatedmedicosLista = applyPagination(lista, page, limit);

    return (
        <Card sx={{ p: 2, mx: 3, mt: 2 }}>
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}>
                <Grid item xs={12} lg={12}>
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


            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Historia')}</TableCell>
                            <TableCell>{t('Paciente')}</TableCell>
                            <TableCell>{t('Medico')}</TableCell>
                            <TableCell>{t('Especialidad')}</TableCell>
                            <TableCell>{t('Acciones')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedmedicosLista.map((list, ix) => {
                            return (
                                <TableRow hover key={ix} >

                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.Fec_Registro.split('T')[0].split('-')[2] + '-' + list.Fec_Registro.split('T')[0].split('-')[1] + '-' + list.Fec_Registro.split('T')[0].split('-')[0]}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.Nro_Historia}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.Paciente}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.Des_Medico}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            {list.Des_EspeMedico}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap variant="h5">
                                            <Button variant='contained' onClick={() => getPdf(list.Des_Ruta + list.Des_File)} >Ver</Button>
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
                    labelRowsPerPage={"Páginas:"}
                    labelDisplayedRows={({ from, to, count }) => { return `${from}–${to} de ${count !== -1 ? count : `${to}`}`; }}
                />
            </Box>
            {pdf !== null && <DialogWrapper
                open={modal}
                maxWidth={'lg'}
                scroll={'body'}
                fullWidth
                keepMounted
                onClose={() => setModal(false)}
            >
                <Card>
                    <CardHeader title={'Ver resultado'} action={
                        <IconButton color="primary" onClick={() =>
                            setModal(false)
                        }>
                            <CloseIcon />
                        </IconButton>
                    } />
                    <Divider />

                    <Box
                        justifyContent={'center'}
                        alignItems={'center'}
                    >

                        <PdfItem
                            pdf={pdf}
                        />
                    </Box>
                    <Divider />
                    <a href={pdf} rel="noreferrer" download="descarga.pdf" ><Button variant='contained' sx={{
                        float: 'right', mr: 20,
                        mb:5,
                        mt: 3
                    }}>
                        <Typography noWrap variant="h5">
                            Imprimir
                        </Typography>
                    </Button></a>
                </Card>
            </DialogWrapper>}

        </Card>
    )
}
