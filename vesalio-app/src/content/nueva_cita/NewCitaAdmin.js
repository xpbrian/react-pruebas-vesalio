import { useRef, useState } from 'react';
import {
  Popover,
  styled,
  Divider,
  Box,
  Button,
  Tooltip,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Typography
} from '@mui/material';

import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import Fab from '@mui/material/Fab';
import { useTranslation } from 'react-i18next';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import axios from 'axios';
import ResultBuscaPaciente from './ResultBuscaPaciente';
import useAuthLayout from 'src/hooks/useAuthLayout'


const ThemeSettingsButton = styled(Box)(
  ({ theme }) => `
          position: fixed;
          z-index: 9999;
          right: ${theme.spacing(4)};
          bottom: ${theme.spacing(4)};
          
          &::before {
              width: 30px;
              height: 30px;
              content: ' ';
              position: absolute;
              border-radius: 100px;
              left: 13px;
              top: 13px;
              background: ${theme.colors.primary.main};
              animation: ripple 1s infinite;
              transition: ${theme.transitions.create(['all'])};
          }

          .MuiSvgIcon-root {
            animation: pulse 1s infinite;
            transition: ${theme.transitions.create(['all'])};
          }
  `
);
const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);
const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);


const ThemeSettings = () => {
  const { t } = useTranslation();
  const { mostrarComponent } = useAuthLayout()
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [lista, setlista] = useState([]);
  const [mostrarRegistrar, setMostrarRegistrar] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuscarPaciente = async () => {
    if (text.length === 8) {
      const rpta = await axios.get(`http://apis-vesalio.com.pe/personaAlepho/${text}`)
      if (rpta.data.length === 0) {
        setMostrarRegistrar(true)
      }
      setlista(rpta.data);
    }
  }

  const handleRegistrarPersona = () => {
    setOpen(false)
    setTimeout(() => {
      mostrarComponent({
        contenido: 'registrarPaciente',
        estado: true,
        size: 'lg'
      }, 'modalOpen')
    }, 500)

  }
  return (
    <>
      <ThemeSettingsButton>
        <Tooltip arrow title={t('Agregar paciente')}>
          <Fab ref={ref} onClick={handleOpen} color="primary" aria-label="add">
            <SettingsTwoToneIcon />
          </Fab>
        </Tooltip>
        <Popover
          disableScrollLock
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Box p={2}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInputWrapper
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="number"
                placeholder={t('Ingrese numero de documento de identidad...')}
                endAdornment={
                  <InputAdornment position="end">
                    <ButtonSearch variant="contained" size="small" onClick={handleBuscarPaciente}>
                      {t('Buscar')}
                    </ButtonSearch>
                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Divider />
          {
            lista.length > 0 && <ResultBuscaPaciente lista={lista} />
          }
          {
            mostrarRegistrar && <Box my={2}
              mx={2}
              flexDirection='column'
              display="flex"
              justifyContent="center"
              alignItems="center">
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
              >
                No se encontro paciente con el documento ingresado
              </Typography>
              <br />
              <Button onClick={handleRegistrarPersona} variant="outlined">
                Registrar nuevo usuario
              </Button>
            </Box>
          }
        </Popover>
      </ThemeSettingsButton>
    </>
  );
};

export default ThemeSettings;
