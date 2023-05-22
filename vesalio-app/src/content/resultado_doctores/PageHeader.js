/* eslint-disable jsx-a11y/label-has-for */
import { useTranslation } from 'react-i18next';

import {
    Button,
    Grid,
    Typography,
} from '@mui/material';
import useLayoutContext from 'src/hooks/useAuthLayout';
import useAuth from 'src/hooks/useAuth';
import { useEffect, useState } from 'react';


function PageHeader() {
    const { mostrarComponent } = useLayoutContext()
    const { user } = useAuth()
    const { t } = useTranslation();
    const [mostrar, setMostrar] = useState(false)
    const [tipoForm, setTipoForm] = useState(1)
    useEffect(() => {
        if (user.datos.numero_documento === '10007967') {
            setMostrar(true)
            setTipoForm(1)
        }
        // if (user.datos.numero_documento === '44732805') {
        //     setMostrar(true)
        //     setTipoForm(1)
        // }
        if (user.datos.numero_documento === '43593169') {
            setMostrar(true)
            setTipoForm(2)
        }
    }, [user])
    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h3" component="h3" gutterBottom>
                        {t('Resultados Médicos')}
                    </Typography>
                </Grid>
                {
                    mostrar && <Grid item>
                        <Button variant='contained' onClick={() => mostrarComponent({
                            contenido: tipoForm === 1 ? 'generarPDF' : 'generarPDF2',
                            title: 'Generar resultado',
                            subtitle: 'Ingrese los datos necesarios para generar el pdf de resultados',
                            estado: true,
                            size: 'md',
                        }, 'drawerOpen')} >Generar archivo</Button>
                    </Grid>
                }

            </Grid>
        </>
    );
}

export default PageHeader;
