import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router';

import SuspenseLoader from 'src/components/SuspenseLoader';
import Authenticated from 'src/components/Authenticated/index';
import AuthenticatedClinica from 'src/components/AuthenticatedClinica';
import DashboardLayout from 'src/layouts/index';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Status404 = Loader(
  lazy(() => import('src/content/estados/Error404'))
);
const Perfil = Loader(
  lazy(() => import('src/content/perfil'))
);
const NuevaCita = Loader(
  lazy(() => import('src/content/nueva_cita'))
);
const MisCitas = Loader(
  lazy(() => import('src/content/mis_citas'))
);
const Register = Loader(
  lazy(() => import('src/content/acceso/registro'))
);
const RecuperarContrasena = Loader(
  lazy(() => import('src/content/acceso/RecuperarContrasena'))
);
const RecuperarContrasenaClinica = Loader(
  lazy(() => import('src/content/acceso_clinica/RecuperarContrasena'))
);
const ListaCitas = Loader(
  lazy(() => import('src/content/lista_citas'))
);
const Doctores = Loader(
  lazy(() => import('src/content/doctores'))
);
const TerminiosCondiciones = Loader(
  lazy(() => import('src/content/terminos_condiciones'))
);
const Inconformidades = Loader(
  lazy(() => import('src/content/inconformidades'))
);
const ListaUsuarios = Loader(
  lazy(() => import('src/content/usuarios_lista'))
);
const ResultadoDoctores = Loader(
  lazy(() => import('src/content/resultado_doctores'))
);
const CitasSemanales = Loader(
  lazy(() => import('src/content/citas_semanales'))
);
const Reportes3101223 = Loader(
  lazy(() => import('src/content/reportes/reporte_generados'))
);
const CitasDoctor = Loader(
  lazy(() => import('src/content/cita_doctor'))
);
const ArchivosLista = Loader(
  lazy(() => import('src/content/archivos_lista'))
);
const Dashboard = Loader(
  lazy(() => import('src/content/dashboard'))
);
const Videos = Loader(
  lazy(() => import('src/content/ayuda'))
);
const Historia = Loader(
  lazy(() => import('src/content/historia_paciente'))
);
const HistoriaEnfermeria = Loader(
  lazy(() => import('src/content/historia_enfermeria_view'))
);
const CamasLista = Loader(
  lazy(() => import('src/content/lista_camas'))
);
const Sited = Loader(
  lazy(() => import('src/content/sited'))
);
const CalendarioCitas = Loader(
  lazy(() => import('src/content/calendario_citas'))
);
const ReporteMarchino = Loader(
  lazy(() => import('src/content/reporte_marchino'))
);
const SubirArchivos = Loader(
  lazy(() => import('src/content/subir_archivos'))
);
const Reprogramacion = Loader(
  lazy(() => import('src/content/reprogramacion'))
);

const router = [
  {
    path: '/',
    element: <Navigate to="citas" replace />
  },
  {
    path: 'registro',
    element: <Register />
  },
  {
    path: 'sited/:NroAutoSiteds/:CodigoIafaSited/:CodigoAfiliadoSited',
    element: <Sited />
  },
  {
    path: 'recuperar-contrasena',
    element: <RecuperarContrasena />
  },
  {
    path: 'recuperar-contrasena-clinica',
    element: <RecuperarContrasenaClinica />
  },
  {
    path: 'clinica',
    element: <AuthenticatedClinica><DashboardLayout><CitasDoctor /></DashboardLayout></AuthenticatedClinica>,
    children: [
      {
        path: 'subir-archivos',
        element: <SubirArchivos />
      },
      {
        path: 'citas-doctor',
        element: <CitasDoctor />
      },
      {
        path: 'reportes-dra-marchino',
        element: <ReporteMarchino />
      },
      {
        path: 'archivos',
        element: <ArchivosLista />
      },
      {
        path: 'videos',
        element: <Videos />
      },
      {
        path: 'historia/:id',
        element: <Historia />
      },
      {
        path: 'historiaEnfermeria/:id',
        element: <HistoriaEnfermeria />
      },
      {
        path: 'lista-camas',
        element: <CamasLista />
      },
      {
        path: 'resultado-medicos',
        element: <ResultadoDoctores />
      },
    ]
  },
  {
    path: 'citas',
    element: <Authenticated><DashboardLayout><MisCitas /></DashboardLayout></Authenticated>,
    children: [
       
      {
        path: 'reprogramacion/:id',
        element: <Reprogramacion />
      },
      {
        path: 'agendas',
        element: <CalendarioCitas />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'perfil',
        element: <Perfil />
      },
      {
        path: 'nueva-cita',
        element: <NuevaCita />
      },
      {
        path: 'mis-citas',
        element: <MisCitas />
      },
      {
        path: 'lista-citas',
        element: <ListaCitas />
      },
      {
        path: 'mis-doctores',
        element: <Doctores />
      },
      {
        path: 'terminos-condiciones',
        element: <TerminiosCondiciones />
      },
      {
        path: 'inconformidades',
        element: <Inconformidades />
      },
      {
        path: 'usuarios-lista',
        element: <ListaUsuarios />
      },
      // {
      //   path: 'resultado-medicos',
      //   element: <ResultadoDoctores />
      // },
      {
        path: 'citas-semanales',
        element: <CitasSemanales />
      },
      {
        path: 'reportes-cantidad',
        element: <Reportes3101223 />
      },
      // {
      //   path: 'citas-doctor',
      //   element: <CitasDoctor />
      // },
      {
        path: 'archivos',
        element: <ArchivosLista />
      },
      {
        path: 'videos',
        element: <Videos />
      },
      // {
      //   path: 'historia/:id',
      //   element: <Historia />
      // },
      // {
      //   path: 'historiaEnfermeria/:id',
      //   element: <HistoriaEnfermeria />
      // },
      // {
      //   path: 'lista-camas',
      //   element: <CamasLista />
      // },
      {
        path: '*',
        element: <Status404 />
      },
    ]

  },
  {
    path: '*',
    element: <Status404 />
  },
];
export default router;