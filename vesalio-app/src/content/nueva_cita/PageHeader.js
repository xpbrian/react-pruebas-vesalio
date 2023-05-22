import { Box } from '@mui/material';

function PageHeader() {

  return (
    <>
      <Box display="flex"
        justifyContent="center"
        alignItems="center">
        <img alt="Auth0" src={'/static/images/img/logoLogin.png'} />
      </Box>
    </>
  );
}

export default PageHeader;
