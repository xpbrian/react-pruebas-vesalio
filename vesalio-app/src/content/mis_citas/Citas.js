import {
    CardContent,
    Avatar,
    Typography,
    ListItemAvatar,
    Card,
    ListItemText,
    ListItem,
    styled,
    Button,
    Divider
} from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useEffect, useState } from 'react';
import useLayoutContext from 'src/hooks/useAuthLayout';

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.primary.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.success};
  `
);


const AvatarDanger = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.error.main};
        color: ${theme.palette.error.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.error};
  `
);


const CardContentWrapper = styled(CardContent)(
    ({ theme }) => `
       padding: ${theme.spacing(2.5, 3, 3)};
       &:last-child {
       padding-bottom: 0;
       }
  `
);

function ActiveReferrals({ item }) {
    const [hoy, sethoy] = useState(false)
    const [nombres, setNombres] = useState('')
    const { mostrarComponent } = useLayoutContext();
    const [value, setValue] = useState(null)
    useEffect(() => {
        let existeHoy = new Date()
        if (existeHoy.toISOString().split('T')[0] === item.fecha) {
            sethoy(true)
        }
        let nombres = `${item.datos.paciente.paciente.ape_paterno} ${item.datos.paciente.paciente.ape_materno} ${item.datos.paciente.paciente.nombres}`
        setNombres(nombres)
        setValue(item)
    }, [item])

    const anularCita = async (id) => {
        mostrarComponent({
            contenido: 'anularCita',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
    }

    return (
        <>

            {
                value !== null && <Card sx={{ background: hoy ? "#bdecb6" : 'white' }}>
                    <CardContentWrapper>
                        <Typography variant="overline" color="text.primary">
                           {`${nombres}`}
                        </Typography>

                        <ListItem
                            disableGutters
                            sx={{
                                my: 1
                            }}
                            component="div"
                        >
                            <ListItemAvatar>
                                {
                                    !value.anulado.estado && <AvatarSuccess variant="rounded">
                                        <HealthAndSafetyIcon fontSize="large" />
                                    </AvatarSuccess>
                                }
                                {
                                    value.anulado.estado && <AvatarDanger variant="rounded">
                                        <HealthAndSafetyIcon fontSize="large" />
                                    </AvatarDanger>
                                }

                            </ListItemAvatar>

                            <ListItemText
                                primary={`${value.datos.doctor.especialidad} ${hoy ? "(HOY)" : ''}`}
                                primaryTypographyProps={{
                                    variant: 'h3',
                                    sx: {
                                        ml: 2
                                    },
                                    noWrap: true
                                }}
                                secondary={ 'Dr. '+value.datos.doctor.Nombres}
                                secondaryTypographyProps={{
                                    variant: 'h6',
                                    sx: {
                                        ml: 2
                                    },
                                    noWrap: true
                                }}
                            />
                        </ListItem>

                        <ListItem
                            disableGutters

                            component="div"
                        >
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="overline" color="text.primary">
                                            {value.datos.doctor.Consultorio}
                                        </Typography>
                                        <Typography variant="overline" color="text.primary" sx={{ float: 'right' }}>
                                            {value.fecha.split('-')[2] + '-' + value.fecha.split('-')[1] + '-' + value.fecha.split('-')[0] + ' ' + value.hora.split(':')[0]+':'+value.hora.split(':')[1]}
                                        </Typography>
                                    </>
                                }
                                primaryTypographyProps={{ variant: 'body2', noWrap: true }}
                            />
                        </ListItem>
                        <Divider />
                    </CardContentWrapper>
                    {
                        !value.anulado.estado &&
                        <Button
                            variant="outlined"
                            color={"error"}
                            sx={{ mx: 2, mb: 2 }}
                            onClick={() => anularCita(value.turno_programado_id)}>
                            Anular cita
                        </Button>
                    }
                    <Button
                        variant="outlined"
                        sx={{ float: 'right', mx: 2, mb: 2 }}
                        onClick={() => mostrarComponent({
                            contenido: 'citasQR',
                            estado: true,
                            size: 'xs',
                            item: value._id
                        }, 'modalOpen')}>
                        Ver QR
                    </Button>
                </Card>
            }

        </>

    );
}

export default ActiveReferrals;
