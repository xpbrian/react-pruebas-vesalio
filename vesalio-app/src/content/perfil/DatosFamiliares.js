import {
    Typography,
    CardContent,
    Box,
    Divider,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Tooltip,
    IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import useLayoutContext from 'src/hooks/useAuthLayout';
import Label from 'src/components/Label';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useEffect, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import confirmSweetAlert from 'src/utils/confirm';
import axios from 'axios';

export default function DatosCuenta() {
    const { t } = useTranslation();
    const { mostrarComponent, familiares, addFamiliares } = useLayoutContext()
    const { user } = useAuth()
    const [items, setItems] = useState([])
    useEffect(() => {
        setItems(familiares.reduce((arr, item) => {
            let found = arr.findIndex(x => x.numero_documento === item.numero_documento)
            if (found < 0) {
                arr.push(item)
            }
            return arr;
        }, []));
    }, [familiares])
    const handleConfirmDelete = async (item) => {
        let rpta = await confirmSweetAlert('Eliminar familiar', '¿Seguro que desea eliminar sus datos', 'warning', true)
        if (rpta) {
            const enviar = await axios.post('http://apis-vesalio.com.pe/eliminarFamiliar', {
                datos: [
                    { id: '_id', value: user._id },
                    { id: 'documento', value: item.numero_documento },
                ]
            })
            let msj = {
                msj: enviar.data.msj,
                icon: enviar.data.rpta === 1 ? 'success' : 'error'
            }
            confirmSweetAlert('Eliminar Familiar', msj.msj, msj.icon, false)
            if (enviar.data.rpta === 1) {
                addFamiliares()
            }
        }
    }

    return (
        <>
            <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box>
                    <Typography variant="h4" gutterBottom>
                        {t('Familiares')}
                    </Typography>
                </Box>
                <Button
                    variant="text"
                    onClick={() => mostrarComponent({
                        contenido: 'addFamiliar',
                        estado: true,
                        size: 'xs'
                    }, 'modalOpen')
                    }
                    startIcon={<EditTwoToneIcon />}>
                    {t('Agregar Familiar')}
                </Button>
            </Box>
            <Divider />
            <CardContent>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('Documento')}</TableCell>
                                <TableCell>{t('Apellidos y nombres')}</TableCell>
                                <TableCell>{t('Parentesco')}</TableCell>
                                <TableCell align="center">{t('')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => {

                                return (
                                    <TableRow hover key={index}>
                                        <TableCell>
                                            <Typography variant="h5">
                                                {item.nombre_tipo_documento} <b>{item.numero_documento}</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h5">
                                                {`${item.ape_paterno} ${item.ape_materno} ${item.nombres}`}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{<Label color={'info'}>{item.parentezcodescirpcion}</Label>}</TableCell>
                                        <TableCell align="center">
                                            <Typography noWrap>
                                                <Tooltip title={t('Delete')} arrow>
                                                    <IconButton
                                                        onClick={() => handleConfirmDelete(item)}
                                                        color="primary"
                                                    >
                                                        <DeleteTwoToneIcon fontSize="small" />
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
            </CardContent>


        </>
    )
}
