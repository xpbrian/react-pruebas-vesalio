import {
    Typography,
    Box,
    Avatar,
    Card,
    useTheme,
    styled,
} from '@mui/material';

import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';


const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
        color:  ${theme.colors.alpha.trueWhite[100]};
        width: ${theme.spacing(5.5)};
        height: ${theme.spacing(5.5)};
  `
);

function Block3({ item }) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                px: 3,
                pb: 6,
                pt: 3
            }}
        >
            <Box display="flex" alignItems="center">
                <AvatarWrapper
                    sx={{
                        background: `${theme.colors.gradients.blue4}`
                    }}
                >
                    <ReceiptTwoToneIcon fontSize="small" />
                </AvatarWrapper>
                <Typography
                    sx={{
                        ml: 1.5,
                        fontSize: `${theme.typography.pxToRem(15)}`,
                        fontWeight: 'bold'
                    }}
                    variant="subtitle2"
                    component="div"
                >
                    {item.title}
                </Typography>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                sx={{
                    ml: -2,
                    pt: 2,
                    pb: 1.5,
                    justifyContent: 'center'
                }}
            >
                <Typography
                    sx={{
                        pl: 1,
                        fontSize: `${theme.typography.pxToRem(35)}`
                    }}
                    variant="h1"
                >
                    {item.cantidad}
                </Typography>
            </Box>
        </Card>
    );
}

export default Block3;
