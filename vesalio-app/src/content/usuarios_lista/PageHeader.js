/* eslint-disable jsx-a11y/label-has-for */
import { useTranslation } from 'react-i18next';


import {
    Grid,
    Typography,
    Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';


function PageHeader() {
    const { t } = useTranslation();
    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h3" component="h3" gutterBottom>
                        {t('Lista de usuarios')}
                    </Typography>
                </Grid>
                <Grid item>
                   
                    <Button
                        sx={{
                            m: .5
                        }}
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
