import {
    Box,
    Card,
    Typography,
    Container,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
// import Scrollbar from 'src/components/Scrollbar';


// const Content = styled(Box)(
//     () => `
//     display: flex;
//     flexDirection: column;
//     flex: 1;
//     width: 100%;
// `
// );

// const MainContent = styled(Box)(
//     ({ theme }) => `
//   @media (min-width: ${theme.breakpoints.values.md}px) {
//     padding-top: 0px;
//     padding-bottom: 10px;
//   }
//   width: 100%;
//   display: flex;
//   align-items: center;
// `
// );

// const SidebarWrapper = styled(Box)(
//     ({ theme }) => `
//     position: fixed;
//     left: 0;
//     top: 0;
//     height: 100%;
//     background: ${theme.colors.alpha.white[100]};
//     width: 640px;
// `
// );

// const SidebarContent = styled(Box)(
//     () => `
//   display: flex;
//   flex-direction: column;
// `
// );

// const CardImg = styled(Card)(
//     ({ theme }) => `
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     position: relative;
//     &:hover {
//       border-color: ${theme.colors.primary.main};
//     }
// `
// );



function ContenedorLogin({ children }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
            <Helmet>
                <title>Clínica Vesalio</title>
            </Helmet>
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center" }}>

                <div style={{ zIndex: "1", maxHeight: "100%",minWidth:"100%", textAlign: "center" }}>
                    <img alt="Auth0" src={'/static/images/img/loginaccessoclinica.jpg'} />
                </div>
                {
                    mobile && <Card style={{ padding: "20px", position: "absolute", zIndex: "1000000", borderRadius: "0" }}
                    >
                        <Box textAlign="center">
                            <img alt="Auth0" src={'/static/images/img/logoLogin.png'} />
                            <Typography
                                variant="h4"
                                color="text.secondary"
                                fontWeight="normal"
                            >
                                {t('El sitio que conecta ')}
                            </Typography>
                            <Typography
                                variant="h4"
                                fontWeight="normal"
                                sx={{
                                    mb: 3,
                                    color: 'green'
                                }}
                            >
                                {t('con tu salud')}
                            </Typography>
                        </Box>
                        {children}
                    </Card>
                }
                {
                    !mobile && <div style={{ position: "absolute", zIndex: "1", textAlign: "center" }}>
                        <Container
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                            maxWidth="sm"
                        >
                            <Card
                                sx={{
                                    p: 3,
                                }}
                            >
                                <Box textAlign="center">
                                    <img alt="Auth0" src={'/static/images/img/logoLogin.png'} />
                                    <Typography
                                        variant="h4"
                                        color="text.secondary"
                                        fontWeight="normal"
                                    >
                                        {t('El sitio que conecta ')}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        fontWeight="normal"
                                        sx={{
                                            mb: 3,
                                            color: 'green'
                                        }}
                                    >
                                        {t('con tu salud')}
                                    </Typography>
                                </Box>
                                {children}
                            </Card>
                        </Container>
                    </div>
                }
            </div>
        </>
    );
}

export default ContenedorLogin;