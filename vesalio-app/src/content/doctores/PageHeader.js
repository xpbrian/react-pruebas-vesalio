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
                        {t('Lista de doctores')}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        sx={{
                            m: .5
                        }}
                        variant="contained"
                        onClick={() => mostrarComponent({
                            contenido: 'insertDoctor',
                            estado: true,
                            size: 'md',
                        }, 'modalOpen')}
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                        {t('Crear doctor')}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default PageHeader;
