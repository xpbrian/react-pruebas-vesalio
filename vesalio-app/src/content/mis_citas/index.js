
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Container, Divider, Grid, Menu, MenuItem, Typography, styled, Card, Tooltip, CardActionArea, CardContent, Avatar, useTheme, useMediaQuery } from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import useLayoutContext from 'src/hooks/useAuthLayout';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import Citas from './Citas'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const periods = [
    {
        value: 'todas',
        text: 'Citas Pendientes'
    },
    // {
    //     value: 'anuladas',
    //     text: 'Anuladas'
    // },
    // {
    //     value: 'atendidas',
    //     text: 'Atendidas'
    // },
    // {
    //     value: 'reservadas',
    //     text: 'Reservadas'
    // },
];
const CardAddAction = styled(Card)(
    ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          height: 100%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(['all'])};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
);
const AvatarAddWrapper = styled(Avatar)(
    ({ theme }) => `
          background: ${theme.colors.alpha.black[10]};
          color: ${theme.colors.primary.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
  `
);
function DashboardAnalytics() {
    const { user } = useAuth()
    const { mostrarComponent, citas } = useLayoutContext()
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation();
    const [datos, setDatos] = useState([])
    const [openPeriod, setOpenMenuPeriod] = useState(false);
    const [period, setPeriod] = useState(periods[0].text);
    const actionRef1 = useRef(null);


    useEffect(() => {
        setDatos(citas.filter(x => !x.anulado.estado));
    }, [citas])


    const generarCita = () => {
        mostrarComponent({
            contenido: 'citaRapida',
            estado: true,
            title: 'Generar cita rápida',
            subtitle: '(Se cargaran por defecto sus datos predeterminados)',
        }, 'drawerOpen')
    }

    return (
        <>
            <Helmet>
                <title>Clínica vesalio -  Mis citas</title>
            </Helmet>
            <PageTitleWrapper>
                <Grid container alignItems="center">
                    <Grid item xs={12} lg={12}>
                        <Typography variant={'h3'} component={'h3'} gutterBottom>
                            {t('Bienvenido')}, {mobile ? user.datos.nombres.split(' ')[0] : user.datos.ape_paterno + ' ' + user.datos.ape_materno + ' ' + user.datos.nombres}!
                        </Typography>
                        <Typography variant="subtitle2">
                            <b>{user.datos.nombre_tipo_documento + ': '}</b> {user.datos.numero_documento} {'  '}
                        </Typography>

                    </Grid>
                </Grid>
            </PageTitleWrapper>
            <Divider />
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    mt: 2,
                    px: 4,
                }}
            >
                <Typography variant="h3">Mis Citas</Typography>
                <Button
                    variant="outlined"
                    ref={actionRef1}
                    onClick={() => setOpenMenuPeriod(true)}
                    sx={{
                        mr: 1
                    }}
                    endIcon={<KeyboardArrowDownTwoToneIcon fontSize="small" />}
                >
                    {period}
                </Button>
                <Menu
                    disableScrollLock
                    anchorEl={actionRef1.current}
                    onClose={() => setOpenMenuPeriod(false)}
                    open={openPeriod}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    {periods.map((_period) => (
                        <MenuItem
                            key={_period.value}
                            onClick={() => {
                                setPeriod(_period.text);
                                setOpenMenuPeriod(false);
                            }}
                        >
                            {_period.text}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <Grid
                sx={{
                    px: 4,
                    mt: 1,
                    pb: 2
                }}
                container
                direction="row"

                alignItems="stretch"
                spacing={4}
            >
                <Grid item lg={12} md={12} xs={12}>
                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        alignItems="stretch"
                    >
                        <Grid xs={12} sm={2} md={2} lg={2} item>
                            <Tooltip arrow title={t('Generar cita rápida')}>
                                <CardAddAction>
                                    <CardActionArea
                                        sx={{
                                            px: 1
                                        }}
                                        onClick={generarCita}
                                    >
                                        <CardContent>
                                            <AvatarAddWrapper>
                                                <AddTwoToneIcon fontSize="large" />
                                            </AvatarAddWrapper>
                                        </CardContent>
                                    </CardActionArea>
                                </CardAddAction>
                            </Tooltip>
                        </Grid>
                        {
                            datos.length > 0 && datos.map((item, ix) => <Grid item xs={12} sm={5} md={5} lg={ix >= 2 ? 6 : 5} key={ix}>
                                <Citas item={item} />
                            </Grid>)
                        }
                        {
                            datos.length === 0 &&
                            <Grid item sm={6} xs={12}>
                                <Container maxWidth="sm" sx={{ p: 4 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            my: 2
                                        }}
                                    >
                                        {t('No existe historial de citas')}
                                    </Typography>
                                </Container>
                            </Grid>
                        }

                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default DashboardAnalytics;
