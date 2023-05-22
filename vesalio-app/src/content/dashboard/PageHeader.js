import { Grid, Typography, } from '@mui/material';
import { useTranslation } from 'react-i18next';

function PageHeader() {
    const { t } = useTranslation();

    return (
        <Grid container alignItems="center">

            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    {t('Reportes')}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
