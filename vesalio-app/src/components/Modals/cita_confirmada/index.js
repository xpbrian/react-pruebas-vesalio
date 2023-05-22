import { useState, useEffect } from 'react';

import {
  Avatar,
  Button,
  Collapse,
  Alert,
  Box,
  styled,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import useAuth from 'src/hooks/useAuth';


const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: ${theme.colors.shadows.success};
      top: -${theme.spacing(6)};
      position: absolute;
      left: 50%;
      margin-left: -${theme.spacing(6)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

function ApplicationsCalendar() {
  const { t } = useTranslation();
  const { user } = useAuth()
  const navigate = useNavigate();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const { modalOpen, mostrarComponent } = useLayoutContext()
  const [openAlert, setOpenAlert] = useState(true);



  useEffect(() => {

    console.log(modalOpen);
  }, [modalOpen])

  return (
    <>
      <Box
        sx={{
          px: 4,
          pb: 4,
          pt: 1
        }}
      >
        <AvatarSuccess>
          <CheckTwoToneIcon />
        </AvatarSuccess>

        <Collapse in={openAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="info"
          >
            {t(
              'Su confirmación de cita fue enviada al número celular o correo proporcionado. \nAgradecemos su preferencia.'
            )}
          </Alert>
        </Collapse>

        <Typography
          align="center"
          sx={{
            py: mobile ? 1 : 4,
            px: mobile ? 10 : 2
          }}
          variant="h3"
        >
          {t('Cita generada correctamente')}
        </Typography>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => {
            mostrarComponent({
              contenido: '',
              estado: false,
              size: 'xs'
            }, 'modalOpen')
            if(user.cuenta.tipo_usuario.id === '01'){
              navigate('/citas/mis-citas')
            }
           
          }
          }
        >
          {t('Ver mis citas')}
        </Button>
      </Box>

    </>
  );
}

export default ApplicationsCalendar;
