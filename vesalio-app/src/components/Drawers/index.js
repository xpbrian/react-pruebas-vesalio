import React from 'react'
import useAuthLayout from 'src/hooks/useAuthLayout'
import { Box, Grid, CardHeader, IconButton, useTheme, Typography, Divider } from '@mui/material'
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import CitaRapida from './cita_rapida'
import Cita from './cita'
import HorasDoctor from './horas_doctor'
import IntegracionSistcomp from './integracion_sistcomp'
import CitaAdmision from './cita_admision'
import CitaSemenal from './cita_semanal'
import GenerarReporteCitas from './generar_reporte_citas'
import ResultadosMedicos from './resultados_medicos'
import GenerarPDF from './generar_pdf'
import GenerarPDF2 from './generar_pdf2'
import Patologicos from './patologicos'
import NoPatologicos from './no_patologicos'
import MedicacionHabitual from './medicacion_habitual'
import HeredoFamiliar from './heredo_familiar'
import Quirurgico from './quirurgico'
import ConsultaAmbulatoria from './consulta_ambulatoria'
import ConsultaOftalmologica from './consulta_oftalmologia'
import Emergencia from './emergencia'
import Triaje from './triaje'
import InformacionAdicional from './informacion_adicional'
import AgregarCama from './agregar_cama'
import Hospitalizacion from './hospitalizacion'
import ListaAtencionesSited from './lista_sited'
import HistoriaClinica from './historia_clinica'
import CambiarUsuario from './cambiar_usuario'
import CitaSobreturno from './cita_sobreturno'
import EmergenciaTriaje from './emergencia_triaje'
import AgendaCitados from './agenda_citados'
import AgregarAgenda from './agregar_agenda'
import CitaSobreturnoNew from './cita_sobreturno_new'
import AgendaReprogramados from './agenda_reprogramados'


export default function Index() {
    const { drawerOpen, mostrarComponent } = useAuthLayout()
    const theme = useTheme();
    const switchReturn = (value) => {

        switch (value) {
            case 'agendaReprogramados':
                return <AgendaReprogramados />
            case 'agregarAgenda':
                return <AgregarAgenda />
            case 'agendaCitados':
                return <AgendaCitados />
            case 'cambiarUsuario':
                return <CambiarUsuario />
            case 'historiaClinica':
                return <HistoriaClinica />
            case 'listaAtencionesSited':
                return <ListaAtencionesSited />
            case 'hospitalizacion':
                return <Hospitalizacion />
            case 'agregarCama':
                return <AgregarCama />
            case 'informacion_adicional':
                return <InformacionAdicional />
            case 'triaje':
                return <Triaje />
            case 'citaEmergenciaTriaje':
                return <EmergenciaTriaje />
            case 'citaEmergencia':
                return <Emergencia />
            case 'consultaOftalmologia':
                return <ConsultaOftalmologica />
            case 'consultaAmbulatoria':
                return <ConsultaAmbulatoria />
            case 'quirurgico':
                return <Quirurgico />
            case 'heredo':
                return <HeredoFamiliar />
            case 'medicamentos':
                return <MedicacionHabitual />
            case 'noPatologicos':
                return <NoPatologicos />
            case 'patologicos':
                return <Patologicos />
            case 'citaAdmision':
                return <CitaAdmision />
            case 'generarPDF':
                return <GenerarPDF />
            case 'generarPDF2':
                return <GenerarPDF2 />
            case 'citaSemanal':
                return <CitaSemenal />
            case 'citaSobreturno':
                return <CitaSobreturno />
            case 'citaSobreturnoNew':
                return <CitaSobreturnoNew />
                
            case 'citaRapida':
                return <CitaRapida />
            case 'cita':
                return <Cita />
            case 'horasDoctor':
                return <HorasDoctor />
            case 'reporteAdmision':
                return <GenerarReporteCitas />
            case 'generarHistoriaSiscomp':
                return <IntegracionSistcomp />
            case 'resultadosMedicos':
                return <ResultadosMedicos />

            default:
                return <></>
        }
    }

    return (
        <Box
            sx={{
                height: '100%',
            }}
        >
            <Grid
                sx={{
                    maxWidth: { md: 900 },
                    width: { md: 900 },
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid item lg={12} xs={12} >
                    <CardHeader
                        sx={{
                            p: 2
                        }}
                        disableTypography
                        action={
                            <IconButton
                                size="small"
                                color="secondary"
                                onClick={() => mostrarComponent({
                                    contenido: '',
                                    estado: false,
                                }, 'drawerOpen')}>
                                <ClearTwoToneIcon fontSize="small" />
                            </IconButton>
                        }
                        title={
                            <>
                                <Typography
                                    sx={{
                                        fontSize: `${theme.typography.pxToRem(17)}`
                                    }}
                                    gutterBottom
                                    variant="h3"
                                    textAlign="center"
                                >
                                    {drawerOpen.title}
                                </Typography>
                            </>
                        }
                        subheader={
                            <>
                                <Typography variant="subtitle2" textAlign="center">
                                    {drawerOpen.subtitle}
                                </Typography>
                            </>
                        }
                    />
                    <Divider />

                </Grid>
                <Grid item lg={12} xs={12}>
                    {
                        switchReturn(drawerOpen.contenido)
                    }
                </Grid>

            </Grid>



        </Box>



    )
}
