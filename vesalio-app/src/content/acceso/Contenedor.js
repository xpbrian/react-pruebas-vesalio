import {
    Box,
    Card,
    Typography,
    Container,
    styled,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Scrollbar from 'src/components/Scrollbar';


const Content = styled(Box)(
    () => `
    display: flex;
    flex: 1;
    width: 100%;
`
);

const MainContent = styled(Box)(
    ({ theme }) => `
  @media (min-width: ${theme.breakpoints.values.md}px) {
    padding: 0 0 0 640px;
  }
  width: 100%;
  display: flex;
  align-items: center;
`
);

const SidebarWrapper = styled(Box)(
    ({ theme }) => `
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background: ${theme.colors.alpha.white[100]};
    width: 640px;
`
);

const SidebarContent = styled(Box)(
    () => `
  display: flex;
  flex-direction: column;
`
);

const CardImg = styled(Card)(
    ({ theme }) => `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: ${theme.transitions.create(['border'])};
    position: absolute;

    &:hover {
      border-color: ${theme.colors.primary.main};
    }
`
);



function ContenedorLogin({ children }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
            <Helmet>
                <title>Clínica Vesalio</title>
            </Helmet>
            <Content>
                <SidebarWrapper
                    sx={{
                        display: { xs: 'none', md: 'flex' }
                    }}
                >
                    <Scrollbar>
                        <SidebarContent>
                            <CardImg>
                                <img alt="Auth0" src={'/static/images/img/imagen1.jpg'} />
                            </CardImg>
                        </SidebarContent>
                    </Scrollbar>
                </SidebarWrapper>
                {
                    mobile && <Card
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
                }
                {
                    !mobile && <MainContent>
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
                                    my: 3
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
                    </MainContent>
                }

            </Content>
        </>
    );
}

export default ContenedorLogin;
