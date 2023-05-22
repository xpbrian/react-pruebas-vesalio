/* eslint-disable jsx-a11y/label-has-for */
import { useTranslation } from 'react-i18next';


import {
    Grid,
    Typography,
    Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import useLayoutContext from 'src/hooks/useAuthLayout';


function PageHeader() {
    const { t } = useTranslation();
    const { mostrarComponent } = useLayoutContext()
    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h3" component="h3" gutterBottom>
                        {t('Lista de citas')}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        sx={{
                            m: .5
                        }}
                        color={'error'}
                        variant="outlined"
                        onClick={() => mostrarComponent({
                            contenido: 'citaEmergencia',
                            estado: true,
                            title: 'Emergencia',
                            subtitle: ''
                        }, 'drawerOpen')}
                    >
                        {t('Emergencia')}
                    </Button>
                    <Button
                        sx={{
                            m: .5
                        }}
                        variant="contained"
                        onClick={() => mostrarComponent({
                            contenido: 'citaAdmision',
                            estado: true,
                            title: 'Nueva cita',
                            subtitle: ''
                        }, 'drawerOpen')}
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                        {t('Crear cita')}
                    </Button>
                    <Button
                        sx={{
                            m: .5
                        }}
                        onClick={() => mostrarComponent({
                            contenido: 'reporteAdmision',
                            estado: true,
                            title: 'Generar reporte',
                            subtitle: ''
                        }, 'drawerOpen')}
                        variant="outlined"
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                        {t('Reportes')}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default PageHeader;
