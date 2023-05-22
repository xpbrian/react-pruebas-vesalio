import React from 'react'
import useAuthLayout from 'src/hooks/useAuthLayout'
import { Card, CardHeader, IconButton, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
// import SeleccionarDoctor from './nueva_cita';
import GenerarQr from './citas_qr';
import CambiarContrasena from './cambiar_contrasena';
import VerMedico from './ver_medico';
import AddFamiliar from './add_familiar';
import ConfirmarAseguradora from './mensaje_confirm';
import CitaConfirmada from './cita_confirmada';
import AnularCita from './anular_cita';
import Inconformidad from './inconformidad';
import AddDoctor from './add_doctor';
import GenerarAgenda from './generar_agenda';
import AddFirma from './add_firma';
import MostrarPdf from './mostrar_pdf';
import Acordion1 from './acordion1';
import Acordion2 from './acordion2';
import Acordion3 from './acordion3';
import Acordion4 from './acordion4';
import Acordion5 from './acordion5';
import AddObservacion from './add_observacion';
import RegistrarPaciente from './registrar_paciente_new';
import AddMensajePaciente from './add_mensaje_paciente';
import VerObservaciones from './ver_observaciones';
import AddCoberturas from './add_aseguradora';
import EditPaciente from './edit_paciente';
import SinDocumentos from './registrar_paciente_sin_documentos';
import GenerarPDF from './generar_pdf';
import AddPatologico from './patologicos';
import AddNoPatologico from './no_patologicos';
import Medicamentos from './medicacion_habitual';
import HeredoFamiliar from './heredo_familiar';
import Quirurgico from './quirurgicos';
import Receta from './receta';
import Aplephoo from './alephoo';
import MedicionAmbulatoria from './medicion_ambulatoria';
import InterconsultaResponder from './responder_interconsulta'
import RecetaMedicamentosIndicaciones from './receta_medicamentos_indicaciones'
import PlanHidratacionIndicaciones from './plan_hidratacion'
import EstudiosExternos from './estudios'
import Sobreturno from './sobreturno'
import EditarPaciente from './editar_paciente'
import AddTeleconsulta from './add_teleconsulta'
import RegistrarPacienteTriaje from './registrar_paciente_triaje'
import EditMedicoMensaje from './edit_medico_mensaje'
import HistorialAgenda from './historial_agenda'

export default function Index() {
    const { modalOpen, mostrarComponent } = useAuthLayout()
    const switchReturn = (value) => {
        switch (value) {
            case 'historialAgenda':
                return {
                    contenido: <HistorialAgenda />,
                    text: 'Historial agenda'
                }
            case 'editMedicoMensaje':
                return {
                    contenido: <EditMedicoMensaje />,
                    text: 'Editar mensaje medico'
                }
            case 'registrarPacienteAdminsionTriaje':
                return {
                    contenido: <RegistrarPacienteTriaje />,
                    text: 'Editar paciente'
                }
            case 'editarPaciente':
                return {
                    contenido: <EditarPaciente />,
                    text: 'Editar paciente'
                }
            case 'addTeleconulta':
                return {
                    contenido: <AddTeleconsulta />,
                    text: 'Agregar link de teleconsulta'
                }
            case 'sobreturno':
                return {
                    contenido: <Sobreturno />,
                    text: 'Sobreturno'
                }
            case 'estudiosExternos':
                return {
                    contenido: <EstudiosExternos />,
                    text: 'Examenes auxiliares'
                }
            case 'planHidratacionIndicaciones':
                return {
                    contenido: <PlanHidratacionIndicaciones />,
                    text: 'Plan hidratación Indicaciones'
                }
            case 'recetaMedicamentosIndicaciones':
                return {
                    contenido: <RecetaMedicamentosIndicaciones />,
                    text: 'Medicamentos Indicaciones'
                }
            case 'interconsultaResponder':
                return {
                    contenido: <InterconsultaResponder />,
                    text: 'Responder interconsulta'
                }
            case 'medicionAmbulatoria':
                return {
                    contenido: <MedicionAmbulatoria />,
                    text: 'Medición'
                }
            case 'alephoo':
                return {
                    contenido: <Aplephoo />,
                    text: 'Reporte de citas generadas por Alephoo'
                }
            case 'receta':
                return {
                    contenido: <Receta />,
                    text: 'Recetas'
                }
            case 'quirurgico':
                return {
                    contenido: <Quirurgico />,
                    text: 'Antecedentes quirurgicos'
                }
            case 'heredo':
                return {
                    contenido: <HeredoFamiliar />,
                    text: 'Heredo familiar'
                }
            case 'medicamentos':
                return {
                    contenido: <Medicamentos />,
                    text: 'Medicación Habitual'
                }
            case 'noPatologicos':
                return {
                    contenido: <AddNoPatologico />,
                    text: 'Antecedentes no patológicos'
                }
            case 'patologicos':
                return {
                    contenido: <AddPatologico />,
                    text: 'Antecedentes patológicos'
                }
            case 'registrarPacienteAdminsionSin':
                return {
                    contenido: <SinDocumentos />,
                    text: 'Resgistrar sin documentos'
                }
            case 'generarPDF':
                return {
                    contenido: <GenerarPDF />,
                    text: 'Generar PDF'
                }
            case 'verObservaciones':
                return {
                    contenido: <VerObservaciones />,
                    text: 'Lista de observaciones'
                }
            case 'acordion1':
                return {
                    contenido: <Acordion1 />,
                    text: 'Reporte de cantidad de uso'
                }
            case 'addMensajePaciente':
                return {
                    contenido: <AddMensajePaciente />,
                    text: 'Enviar mensaje'
                }
            case 'acordion2':
                return {
                    contenido: <Acordion2 />,
                    text: 'Reporte de citados por financiador'
                }
            case 'acordion3':
                return {
                    contenido: <Acordion3 />,
                    text: 'Reporte de citados anuladas'
                }
            case 'acordion4':
                return {
                    contenido: <Acordion4 />,
                    text: 'Reporte de citados reprogramadas'
                }
            case 'acordion5':
                return {
                    contenido: <Acordion5 />,
                    text: 'Reporte de Medicos citas diarias'
                }
            case 'registrarPacienteAdminsion':
                return {
                    contenido: <RegistrarPaciente />,
                    text: 'Registrar nuevo paciente'
                }
            case 'addFirma':
                return {
                    contenido: <AddFirma />,
                    text: 'Agregar firma'
                }
            case 'mostrarPdf':
                return {
                    contenido: <MostrarPdf />,
                    text: 'Agregar firma'
                }
            case 'anularCita':
                return {
                    contenido: <AnularCita />,
                    text: 'Anular Cita'
                }
            case 'inconformidad':
                return {
                    contenido: <Inconformidad />,
                    text: 'Seleccionar fecha requerida de cita'
                }
            case 'addObservacion':
                return {
                    contenido: <AddObservacion />,
                    text: 'Generar Observacion'
                }
            case 'mensajeConfirm':
                return {
                    contenido: <ConfirmarAseguradora />,
                    text: 'Confirmar aseguradora'
                }
            case 'citaRealizada':
                return {
                    contenido: <CitaConfirmada />,
                    text: ''
                }

            case 'verMedico':
                return {
                    contenido: <VerMedico />,
                    text: 'Detalle de medico'
                }
            case 'cambiarContrasena':
                return {
                    contenido: <CambiarContrasena />,
                    text: 'Cambiar contraseña'
                }
            case 'citasQR':
                return {
                    contenido: <GenerarQr />,
                    text: 'Código QR'
                }
            case 'addFamiliar':
                return {
                    contenido: <AddFamiliar />,
                    text: 'Registrar familiar'
                }
            case 'insertDoctor':
                return {
                    contenido: <AddDoctor />,
                    text: 'Agregar doctor'
                }
            case 'generarAgenda':
                return {
                    contenido: <GenerarAgenda />,
                    text: 'Registrar agenda del medico'
                }
            case 'addAseguradora':
                return {
                    contenido: <AddCoberturas />,
                    text: 'Registrar aseguradora'
                }
            case 'editCelularPaciente':
                return {
                    contenido: <EditPaciente />,
                    text: 'Cambiar Paciente'
                }

            default:
                return <></>
        }
    }
    return (
        <>
            <Card>
                <CardHeader title={switchReturn(modalOpen.contenido).text} action={
                    modalOpen.contenido !== 'mensajeConfirm' ?
                        <IconButton color="primary" onClick={() =>
                            mostrarComponent({
                                contenido: '',
                                estado: false,
                                size: 'xs'
                            }, 'modalOpen')
                        }>
                            <CloseIcon />
                        </IconButton> : null
                } />
                <Divider />
                {switchReturn(modalOpen.contenido).contenido}
            </Card>


        </>
    )
}
