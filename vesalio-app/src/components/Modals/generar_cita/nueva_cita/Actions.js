import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';



const Actions = ({ date, onNext, onPrevious, onToday }) => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      justifyContent="space-between"
    >
     
      <Grid
        item
        sx={{
          display: { xs: 'none', sm: 'inline-block' }
        }}
      >
        <Typography variant="h3" color="text.primary">
          {format(date, 'MMMM yyyy', { locale: es }).toString().toUpperCase()}
        </Typography>
      </Grid>
      <Grid item>
        <Tooltip arrow placement="top" title={t('Previous Day')}>
          <IconButton color="primary" onClick={onPrevious}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title={t('Today')}>
          <IconButton
            color="primary"
            sx={{
              mx: 1
            }}
            onClick={onToday}
          >
            <TodayTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title={t('Next Day')}>
          <IconButton color="primary" onClick={onNext}>
            <ArrowForwardTwoToneIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};



export default Actions;
