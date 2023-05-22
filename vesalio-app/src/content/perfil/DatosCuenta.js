import React, { useEffect, useState } from 'react'
import {
    Grid,
    Typography,
    CardContent,
    Box,
    Divider,
    Button
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import useAuth from 'src/hooks/useAuth';
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function DatosCuenta() {
    const { t } = useTranslation();
    const { user } = useAuth()
    const { mostrarComponent } = useLayoutContext()
    const [ver, setVer] = useState(false)
    const [datos, setDatos] = useState(null)
    useEffect(() => {
        setDatos(user)
    }, [user])
    return (
        <>
            {datos !== null && <>
                <Box
                    p={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            {t('Datos de inicio de sesión')}
                        </Typography>
                    </Box>
                    <Button
                        variant="text"
                        onClick={() => mostrarComponent({
                            contenido: 'cambiarContrasena',
                            estado: true,
                            size: 'xs'
                        }, 'modalOpen')
                        }
                        startIcon={<EditTwoToneIcon />}>
                        {t('Cambiar contraseña')}
                    </Button>
                </Box>
                <Divider />
                <CardContent>
                    <Typography variant="subtitle2">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                <Box pr={3} pb={2}>
                                    {t('Usuario')}:
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                <Text color="black">
                                    <b>{datos.cuenta.usuario}</b>
                                </Text>
                                <Box pl={1} component="span">
                                    <Label color="success">{datos.cuenta.method_sigin.descripcion}</Label>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }} sx={{ mt: 1 }}>
                                <Box pr={3} pb={2}>
                                    {t('Contraseña')}:
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                <Text color="black">
                                    <b>{!ver ? '*******' : datos.cuenta.password}</b>
                                </Text>
                                <Box pl={1} component="span">
                                    <Button onClick={() => setVer(x => !x)}><Label color="info">Ver contraseña</Label></Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Typography>
                </CardContent>
            </>}


        </>
    )
}
