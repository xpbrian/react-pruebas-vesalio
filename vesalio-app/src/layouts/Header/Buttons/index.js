import { Box } from '@mui/material';
import HeaderSearch from './Search';

function HeaderButtons() {
  return (
    <Box
      sx={{
        mr: 1.5
      }}
    >
      <HeaderSearch />
      <Box
        sx={{
          mx: 0.5
        }}
        component="span"
      >
      </Box>
      <Box
        component="span"
        sx={{
          display: { xs: 'none', sm: 'inline-block' }
        }}
      >
      </Box>
    </Box>
  );
}

export default HeaderButtons;
