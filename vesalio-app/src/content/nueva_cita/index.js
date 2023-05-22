import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Sidebar from './Sidebar';

import {
  Card,
  Box,
  Grid,
  IconButton,
  Autocomplete,
  TextField,
  Drawer,
  styled,
  useTheme,
  Typography,

} from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Results from './Results';
import Scrollbar from 'src/components/Scrollbar';
import useLayoutContext from 'src/hooks/useAuthLayout';
// import NewCitaAdmin from './NewCitaAdmin';

const DrawerWrapperMobile = styled(Drawer)(
  () => `
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(6)};
  height: ${theme.spacing(6)};
  position: absolute;
  background: ${theme.colors.alpha.white[100]};
  z-index: 5;
  top: calc(${theme.header.height} + ${theme.spacing(4)});
`
);

const SearchIconWrapper = styled(SearchTwoToneIcon)(
  ({ theme }) => `
         color: ${theme.colors.alpha.black[30]}
 `
);

function ApplicationsespecialidadListaPlatform() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { especialidad, medicos } = useLayoutContext()
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [especialidadLista, setespecialidadLista] = useState([]);
  const [medicosLista, setmedicosLista] = useState([]);
  const [filtroMedico, setFiltromedico] = useState('');
  const [filtroEspecialidad, setFiltroEspecialidad] = useState([]);
  const [filtroDia, setFiltroDia] = useState('');
  const [lista, setLista] = useState([])



  useEffect(() => {
    if (especialidad.length > 0) {
      setespecialidadLista(especialidad)
    }
  }, [especialidad])

  useEffect(() => {
    if (medicos.length > 0) {
      setmedicosLista(medicos)
    }
  }, [medicos])

  const handleFilterMedicos = (value, newValue) => {
    setFiltromedico(newValue === null ? '' : newValue.id)
  }

  useEffect(() => {

    if (filtroEspecialidad.length <= 0 && filtroDia.length <= 0) {
      setLista(medicosLista)
    } else {
      let filtraFecha = filtroDia.length === 0 ? [] : medicosLista.filter(x => x.dia.includes(parseInt(filtroDia)))
      let filtroEspe = filtraFecha.length === 0 ? medicosLista : filtraFecha
      let filtroAmbos = filtroEspe.reduce((arr, item) => {
        if (filtroEspecialidad.length === 0) {
          arr.push({ ...item })
        } else {
          let found = filtroEspecialidad.findIndex(x => item.especialidades.includes(x));
          if (found >= 0) {
            arr.push({ ...item })
          }
        }

        return arr
      }, [])

      setLista(filtroAmbos);
    }

  }, [filtroEspecialidad, medicosLista, filtroDia])

  return (
    <>
      <Helmet>
        <title>Clínica vesalio -  Nueva cita</title>
      </Helmet>
      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item md={12}>
          <Typography variant="h3" component="h3" gutterBottom>
            {'Generar nueva cita'}
          </Typography>
        </Grid>
        <Grid item xs={2} md={12}>
          <Box mt={4} sx={{
            display: { xs: 'none', md: 'block', lg: 'block' },
          }}>
            <PageHeader />
          </Box>
          <IconButtonToggle
            sx={{
              display: { lg: 'none', xs: 'flex' }
            }}
            color="primary"
            onClick={handleDrawerToggle}
            size="small"
          >
            <MenuTwoToneIcon />
          </IconButtonToggle>
        </Grid>
        <Grid item xs={10} md={12}>
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              mt: { xs: 4 }
            }}
          >
            <Box display={{ xs: 'none', lg: 'flex' }} >
              <SearchIconWrapper />
            </Box>

            <Autocomplete
              fullWidth
              onChange={handleFilterMedicos}
              options={lista.reduce((arr, item) => {
                arr.push({
                  id: item.id_usuario,
                  title: `${item.nombres}`
                })
                return arr
              }, [])}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  label={t('Médicos')}
                  placeholder={t('Seleccione médico')}
                />
              )}
            />

          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          sx={{
            display: { xs: 'none', lg: 'inline-block' }
          }}
        >
          <Card>
            {especialidadLista.length > 0 && <Sidebar setFiltroDia={setFiltroDia} especialidadLista={especialidadLista} setFiltroEspecialidad={setFiltroEspecialidad} />}
          </Card>
        </Grid>
        <Grid item xs={12} lg={9}>
          {medicosLista.length > 0 && <Results lista={lista} filtroMedico={filtroMedico} />}
        </Grid>
      </Grid>
      {/* <NewCitaAdmin /> */}
      <DrawerWrapperMobile
        sx={{
          display: { lg: 'none', xs: 'inline-block' }
        }}
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Scrollbar>
          <Sidebar setFiltroDia={setFiltroDia} especialidadLista={especialidadLista} setFiltroEspecialidad={setFiltroEspecialidad} />
        </Scrollbar>
      </DrawerWrapperMobile>
    </>
  );
}

export default ApplicationsespecialidadListaPlatform;


