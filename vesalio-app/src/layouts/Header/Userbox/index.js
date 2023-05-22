import { useEffect, useRef, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
);

function HeaderUserbox() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      if (user.cuenta.tipo_usuario.id === "03" || user.cuenta.tipo_usuario.id === "09") {
        handleClose();
        await logout();
        navigate('/clinica' );
      } else {
        handleClose();
        await logout();
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(user.cuenta.tipo_usuario.id)
  }, [])

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
        <Box
          component="span"
          sx={{
            display: { xs: 'none', md: 'inline-block' }
          }}
        >
          <UserBoxText>
            <UserBoxLabel variant="body1">{`${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.cuenta.tipo_usuario.descripcion}
            </UserBoxDescription>
          </UserBoxText>
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: 'none', sm: 'inline-block' }
          }}
        >
          <ExpandMoreTwoToneIcon
            sx={{
              ml: 1
            }}
          />
        </Box>
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210
          }}
          display="flex"
        >
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{`${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.cuenta.tipo_usuario.descripcion}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0
          }}
        />
        <List
          sx={{
            p: 1
          }}
          component="nav"
        >
          <ListItem
            onClick={() => {
              handleClose();
            }}
            button
            to={`/citas/perfil`}
            component={NavLink}
          >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary={t('Perfil')} />
          </ListItem>
        </List>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1
              }}
            />
            {t('Salir')}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
