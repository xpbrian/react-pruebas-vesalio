import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MedicationIcon from '@mui/icons-material/Medication';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GavelIcon from '@mui/icons-material/Gavel';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import CoPresentIcon from '@mui/icons-material/CoPresent';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import GppBadIcon from '@mui/icons-material/GppBad';
import HelpIcon from '@mui/icons-material/Help';
import BedIcon from '@mui/icons-material/Bed';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const menuItems = [
  {
    heading: 'Vesalio',
    items: [
      {
        tipo: '01',
        name: 'Perfil',
        link: '/citas/perfil',
        icon: AccountBoxIcon
      },
      {
        tipo: '01',
        name: 'Mis citas',
        link: '/citas/mis-citas',
        icon: CalendarMonthIcon
      },
      {
        tipo: '01',
        name: 'Solicitar cita',
        icon: MedicationIcon,
        link: '/citas/nueva-cita'
      },
      {
        tipo: '01',
        name: 'Terminos y condiciones',
        icon: GavelIcon,
        link: '/citas/terminos-condiciones'
      },
      {
        tipo: '01',
        name: 'Ayuda',
        icon: HelpIcon,
        link: '/citas/videos'
      },
      {
        tipo: '02',
        name: 'DashBoaard',
        icon: CalendarMonthIcon,
        link: '/citas/agendas'
      },
      {
        tipo: '02',
        name: 'DashBoaard',
        icon: HomeIcon,
        link: '/citas/dashboard'
      },
      {
        tipo: '02',
        name: 'Lista de citas',
        icon: ListAltIcon,
        link: '/citas/lista-citas'
      },

      {
        tipo: '02',
        name: 'Lista de citas',
        icon: FeaturedPlayListIcon,
        link: '/citas/citas-semanales'
      },
      {
        tipo: '02',
        name: 'Lista de doctores',
        icon: MedicalServicesIcon,
        link: '/citas/mis-doctores'
      },
      {
        tipo: '02',
        name: 'Lista de Inconformidades',
        icon: MoodBadIcon,
        link: '/citas/inconformidades'
      },
      {
        tipo: '02',
        name: 'Lista de Usuarios',
        icon: PeopleAltIcon,
        link: '/citas/usuarios-lista'
      },
      {
        tipo: '02',
        name: 'Lista de citas generadas',
        icon: GppBadIcon,
        link: '/citas/reportes-cantidad'
      },
      // {
      //   tipo: '03',
      //   name: 'Lista de citas',
      //   icon: FeaturedPlayListIcon,
      //   link: '/clinica/resultado-medicos'
      // },
      {
        tipo: '03',
        name: 'Lista de Citas',
        icon: LibraryBooksIcon,
        link: '/clinica/citas-doctor'
      },
      {
        tipo: '03',
        name: 'Lista de camas',
        icon: BedIcon,
        link: '/clinica/lista-camas'
      },
      {
        tipo: '03',
        name: 'Perfil',
        link: '/citas/perfil',
        icon: AccountBoxIcon
      },
      {
        tipo: '03',
        name: 'Mis citas',
        link: '/citas/mis-citas',
        icon: CalendarMonthIcon
      },
      {
        tipo: '03',
        name: 'Solicitar cita',
        icon: MedicationIcon,
        link: '/citas/nueva-cita'
      },
      {
        tipo: '03',
        name: 'Terminos y condiciones',
        icon: GavelIcon,
        link: '/citas/terminos-condiciones'
      },
      {
        tipo: '03',
        name: 'Ayuda',
        icon: HelpIcon,
        link: '/citas/videos'
      },
      {
        tipo: '09',
        name: 'Lista de Citas',
        icon: LibraryBooksIcon,
        link: '/clinica/citas-doctor'
      },
      {
        tipo: '09',
        name: 'Lista de camas',
        icon: BedIcon,
        link: '/clinica/lista-camas'
      },
      {
        tipo: '04',
        name: 'Archivos',
        icon: FeaturedPlayListIcon,
        link: '/citas/archivos'
      },

      {
        tipo: '05',
        name: 'Lista de citas',
        icon: ListAltIcon,
        link: '/citas/lista-citas'
      },
      {
        tipo: '05',
        name: 'Lista de citas',
        icon: FeaturedPlayListIcon,
        link: '/citas/citas-semanales'
      },
      {
        tipo: '05',
        name: 'Lista de doctores',
        icon: MedicalServicesIcon,
        link: '/citas/mis-doctores'
      },
      {
        tipo: '05',
        name: 'Lista de Usuarios',
        icon: PeopleAltIcon,
        link: '/citas/usuarios-lista'
      },
      // 
      {
        tipo: '06',
        name: 'Lista de citas',
        icon: ListAltIcon,
        link: '/citas/lista-citas'
      },
      {
        tipo: '06',
        name: 'Lista de citas',
        icon: FeaturedPlayListIcon,
        link: '/citas/citas-semanales'
      },
      {
        tipo: '06',
        name: 'Lista de Usuarios',
        icon: PeopleAltIcon,
        link: '/citas/usuarios-lista'
      },
      {
        tipo: '06',
        name: 'Lista de doctores',
        icon: MedicalServicesIcon,
        link: '/citas/mis-doctores'
      },
      //
      {
        tipo: '07',
        name: 'Lista de citas',
        icon: ListAltIcon,
        link: '/citas/lista-citas'
      },
      {
        tipo: '07',
        name: 'Lista de citas',
        icon: FeaturedPlayListIcon,
        link: '/citas/citas-semanales'
      },
      {
        tipo: '07',
        name: 'Lista de doctores',
        icon: MedicalServicesIcon,
        link: '/citas/mis-doctores'
      },
      {
        tipo: '07',
        name: 'Lista de Usuarios',
        icon: PeopleAltIcon,
        link: '/citas/usuarios-lista'
      },
      {
        tipo: '08',
        name: 'Lista de citas',
        icon: ListAltIcon,
        link: '/citas/lista-citas'
      },
      {
        tipo: '08',
        name: 'Lista de citas',
        icon: FeaturedPlayListIcon,
        link: '/citas/citas-semanales'
      },
      {
        tipo: '08',
        name: 'Lista de doctores',
        icon: MedicalServicesIcon,
        link: '/citas/mis-doctores'
      },
      {
        tipo: '08',
        name: 'Lista de Usuarios',
        icon: PeopleAltIcon,
        link: '/citas/usuarios-lista'
      },
    ]
  }
];

export default menuItems;
