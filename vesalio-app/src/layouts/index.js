import { Box, useTheme, Dialog,
  //  Slide, 
   styled, Drawer,
    // Paper 
  } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { 
  // forwardRef, 
  useEffect } from 'react';
import useAuthLayout from 'src/hooks/useAuthLayout'
import Sidebar from './Sidebar';
import Header from './Header';
import ModalContenido from 'src/components/Modals';
import DrawerContenido from 'src/components/Drawers'
import useAuth from 'src/hooks/useAuth';
// import Draggable from 'react-draggable'


const DialogWrapper = styled(Dialog)(
  () => `
       .MuiDialog-paper {
        overflow: visible;
       }
 `
);

// function PaperComponent(props) {
//   return (
//     <Draggable>
//       <Paper {...props} />
//     </Draggable>
//   );
// }

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });
const CollapsedSidebarLayout = () => {
  const { user, isAuthenticated } = useAuth()
  const theme = useTheme();
  const {
    modalOpen,
    drawerOpen,
    mostrarComponent
  } = useAuthLayout()
  // const closeDialog = (item) => {
  //   mostrarComponent({
  //     contenido: '',
  //     estado: false,
  //     size: 'xs'
  //   }, item)
  // }
  useEffect(() => {
    if (isAuthenticated) {
      if (user.coberturas.length === 0 && user.cuenta.tipo_usuario.id === '01') {
        console.log("etoy aqui");
        mostrarComponent({
          contenido: 'addAseguradora',
          estado: true,
          size: 'xs'
        }, 'modalOpen')
      }
    }


  }, [isAuthenticated, user])
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.Mui-FixedWrapper': {
            '.MuiDrawer-root.MuiDrawer-docked': {
              '.MuiPaper-root': {
                left: 108
              }
            }
          }
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('md')]: {
              ml: theme.spacing(12)
            }
          }}
        >
          <Box display="block">
            <Outlet />
          </Box>
        </Box>
      </Box>
      <DialogWrapper
        open={modalOpen.estado}
        maxWidth={modalOpen.size}
        fullWidth
        scroll={'body'}
        // PaperComponent={PaperComponent}
        // TransitionComponent={Transition}
        // keepMounted
        // onClose={() => closeDialog("modalOpen")}
      >
        <ModalContenido />
      </DialogWrapper>
      <Drawer
        variant="temporary"
        anchor={'right'}
        // sx={{
          
        //   '& .MuiPaper-root': {
        //       width: '950px',
        //       ml: '50vh'
        //   },
        // }}
        open={drawerOpen.estado}
        // onClose={() => closeDialog("drawerOpen")}
        elevation={9}
      >
        <DrawerContenido />
      </Drawer>
    </>
  );
};

export default CollapsedSidebarLayout;
