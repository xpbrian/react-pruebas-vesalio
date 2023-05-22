/* eslint-disable jsx-a11y/label-has-for */
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    styled,
    Card,
    CardHeader,
    Dialog,
    Divider,
    Grid,
    IconButton,
    Link,
    Tooltip,
    Typography,
} from '@mui/material';
import useLayoutContext from 'src/hooks/useAuthLayout';
import { useState } from 'react';
import pdf from 'src/pdf/pdf/LISTA_DE_PACIENTES.pdf'
import PdfItem from 'src/pdf/PidfItem'
import CloseIcon from '@mui/icons-material/Close';
import useAuth from 'src/hooks/useAuth';


const DialogWrapper = styled(Dialog)(
    () => `
         .MuiDialog-paper {
          overflow: visible;
         }
   `
);

function PageHeader() {
    const { t } = useTranslation();
    const { mostrarComponent } = useLayoutContext()
    const [modal, setModal] = useState(false)
    const { user } = useAuth()

    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h3" component="h3" gutterBottom>
                        {t('Lista de citas')}
                    </Typography>
                    <Tooltip placement='right' title="Al dar click, se visualizar el manual de usuario para el uso correcto de la vista">
                        <Link href="#" onClick={() => setModal(true)}>
                            <Typography variant="span" sx={{ mt: -1, ml: 1 }} component="span" gutterBottom>
                                {'Ver manual de usuario'}
                            </Typography>
                        </Link>
                    </Tooltip>


                </Grid>
                <Grid item>
                    {/* <Button
                        sx={{
                            m: .5
                        }}
                        color={'info'}
                        variant="outlined"
                        onClick={() => mostrarComponent({
                            contenido: 'triaje',
                            estado: true,
                            title: 'Triaje',
                            subtitle: ''
                        }, 'drawerOpen')}
                    >
                        {t('Triaje')}
                    </Button> */}
                    {
                        user.cuenta.tipo_usuario.id === '09' && <Button
                            sx={{
                                m: .5
                            }}
                            color={'error'}
                            variant="outlined"
                            onClick={() => mostrarComponent({
                                contenido: 'citaEmergenciaTriaje',
                                estado: true,
                                title: 'Emergencia',
                                subtitle: ''
                            }, 'drawerOpen')}
                        >
                            {t('Emergencia')}
                        </Button>
                    }

                    <Button
                        sx={{
                            m: .5
                        }}
                        color={'info'}
                        variant="contained"
                        onClick={() => mostrarComponent({
                            contenido: 'historiaClinica',
                            estado: true,
                            title: 'Buscar Historia clinica',
                            subtitle: ''
                        }, 'drawerOpen')}
                    >
                        <b>Historia clínica</b>
                    </Button>
                </Grid>
            </Grid>

            <DialogWrapper
                open={modal}
                maxWidth={'lg'}
                fullWidth
                keepMounted
                scroll={'body'}
                onClose={() => setModal(false)}
            >
                <Card>
                    <CardHeader title={'Manual de Usuario'} action={
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

                </Card>
            </DialogWrapper>



        </>
    );
}

export default PageHeader;
