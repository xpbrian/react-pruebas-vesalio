
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    Grid,
    Typography,
} from '@mui/material';
import useLayoutContext from 'src/hooks/useAuthLayout';
import useAuth from 'src/hooks/useAuth';
import axios from 'axios';
import confirmSweetAlert from 'src/utils/confirm';



export default function Register() {
    const { t } = useTranslation();
    const { mostrarComponent } = useLayoutContext()
    const { user, login } = useAuth()
    const continuarSinAseguradora = async () => {
        let rpta = await confirmSweetAlert('Continuar sin seguradora', '¿Seguro que desea continuar sin aseguradora?', 'warning', true)
        if (rpta) {
            const enviar = await axios.post('http://apis-vesalio.com.pe/updateConfirmInicio', {
                datos: [{ id: '_id', value: user._id }]
            })
            let msj = {
                msj: enviar.data.msj,
                icon: enviar.data.rpta === 1 ? 'success' : 'error'
            }
            confirmSweetAlert('Registro correctamente', msj.msj, msj.icon, false)
            if (enviar.data.rpta === 1) {
                login(user._id)
                mostrarComponent({
                    contenido: '',
                    estado: false,
                    size: 'xs'
                }, 'modalOpen')
            }
        }
    }
    const continuarAseguradora = async () => {
        mostrarComponent({
            contenido: 'addCobertura',
            estado: true,
            size: 'xs',
            item: true
        }, 'modalOpen')
    }
    return (
        <>
            <>
                <Grid alignItems="center" container sx={{ p: 2 }}>
                    <Grid item xs={12} lg={12} md={12} >
                        <Box textAlign="center"> <img alt="Auth0" src={'/static/images/img/logoLogin.png'} /></Box>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} >
                        <Typography variant="h4">
                            Para continuar usted necesita seleccionar una aseguradora, si no posee una seleccione "Continuar sin aseguradora".
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} >
                        <Button
                            sx={{ mt: 3 }}
                            color="primary"
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={continuarAseguradora}
                        >
                            {t('Seleccionar aseguradora')}
                        </Button>

                    </Grid>
                    <Grid item xs={12} lg={12} md={12} >
                        <Button
                            sx={{ mt: 1 }}
                            color="secondary"
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={continuarSinAseguradora}
                        >
                            {t('Continuar sin aseguradora')}
                        </Button>
                    </Grid>
                </Grid>



            </>


        </>
    )
}
