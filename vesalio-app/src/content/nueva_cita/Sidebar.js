import { useEffect, useState } from 'react';

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemIcon,
  Checkbox,
  List,
  ListItemButton,
  ListItemText,
  styled,
  TextField,
  Box,
  Autocomplete
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Label from 'src/components/Label';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import useLayoutContext from 'src/hooks/useAuthLayout';

const SearchIconWrapper = styled(SearchTwoToneIcon)(
  ({ theme }) => `
        color: ${theme.colors.alpha.black[30]}
`
);
const AccordionSummaryWrapper = styled(AccordionSummary)(
  () => `
      &.Mui-expanded {
        min-height: 48px;
      }

      .MuiAccordionSummary-content.Mui-expanded {
        margin: 12px 0;
      }
  `
);

const ListItemWrapper = styled(ListItemButton)(
  () => `
  
      &.MuiButtonBase-root {
        border-radius: 0;
      }
  `
);

function Sidebar({ especialidadLista, setFiltroEspecialidad, setFiltroDia }) {
  const { t } = useTranslation();
  const { dias } = useLayoutContext()
  const [checked, setChecked] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [lista, setLista] = useState(especialidadLista);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  useEffect(() => {
    setFiltroEspecialidad(checked)
  }, [checked])

  useEffect(() => {
    if (filtro.length === 0) {
      setLista(especialidadLista)
    }
    setLista(x => x.filter(x => x.epecialidad.toLowerCase().includes(filtro.toLowerCase())))
  }, [filtro, especialidadLista])

  const handleDiasActivo = (e, newValue) => {
    setFiltroDia(newValue === null ? '' : newValue.id)
  }
  return (
    <>
      <Accordion
        sx={{
          p: 1
        }}
        defaultExpanded
      >
        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">{t('Dias de Atención')}</Typography>
        </AccordionSummaryWrapper>
        <AccordionDetails
          sx={{
            p: 0
          }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2
          }} >
            <Box display={{ xs: 'none', lg: 'flex' }} >
              <SearchIconWrapper />
            </Box>
            <Autocomplete
              fullWidth
              onChange={(e, n) => handleDiasActivo(e, n)}
              options={dias.reduce((arr, item) => {
                arr.push({ id: item.id.toString(), label: item.value })
                return arr
              }, [])}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  label={t('Dias de la semana')}
                  placeholder={t('Seleccione día')}
                />
              )}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          p: 1
        }}
        defaultExpanded
      >
        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">{t('Especialidades')}</Typography>

        </AccordionSummaryWrapper>
        <AccordionDetails
          sx={{
            p: 0
          }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2
          }} >
            <Box display={{ xs: 'none', lg: 'flex' }} >
              <SearchIconWrapper />
            </Box>
            <TextField
              value={filtro}
              fullWidth
              onChange={(e) => setFiltro(e.target.value)}
              variant="outlined" />
          </Box>

          <List disablePadding component="div" sx={{ mt: 1 }}>
            {lista.sort(function (a, b) {
              if (a.epecialidad > b.epecialidad) {
                return 1;
              }
              if (a.epecialidad < b.epecialidad) {
                return -1;
              }
              // a must be equal to b
              return 0;
            }).map((value) => {
              return (
                <ListItemWrapper
                  sx={{
                    py: 0,
                    px: 2
                  }}
                  key={value.id_especialidad}
                  onClick={handleToggle(value.id_especialidad)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32
                    }}
                  >
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value.id_especialidad) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={value.epecialidad}
                    primaryTypographyProps={{ variant: 'body1' }}
                  />
                  {/* <Label color="primary">{value.cantidad}</Label> */}
                </ListItemWrapper>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default Sidebar;
