/* eslint-disable jsx-a11y/label-has-for */
import { useTranslation } from 'react-i18next';


import {
    Grid,
    Typography,
} from '@mui/material';


function PageHeader() {
    const { t } = useTranslation();
    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h3" component="h3" gutterBottom>
                        {t('Lista de inconformidades')}
                    </Typography>
                </Grid>

            </Grid>
        </>
    );
}

export default PageHeader;
