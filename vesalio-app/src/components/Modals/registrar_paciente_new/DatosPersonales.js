import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Link,
    TextField,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Grid,
    FormControlLabel,
    Checkbox,
    Typography,
    Card,
    CardHeader,
    Divider,
    styled,
    IconButton,
    Dialog,
    FormLabel,
    RadioGroup,
    Radio,
    InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import pdf from 'src/pdf/prueba.pdf'
import PdfItem from 'src/pdf/PidfItem'
import Scrollbar from 'src/components/Scrollbar';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const DialogWrapper = styled(Dialog)(
    () => `
         .MuiDialog-paper {
          overflow: visible;
         }
   `
);

export default function Register({ textPersonales, setTerms, terms }) {
    const { t } = useTranslation();
    const [modal, setModal] = useState(false)
    const [text, setText] = useState([])
    useEffect(() => {
        setText(textPersonales)
    }, [textPersonales])

    return (
        <>
            <>
                <Grid alignItems="center" justifyContent={"center"} container spacing={3} mt={1}>
                    {text.map(x => <Grid item xs={x.xs} lg={x.lg} md={x.md} key={x.id}>
                        {
                            x.tipo === 'text' && <TextField
                                fullWidth
                                label={x.label}
                                name={x.id}
                                type={x.type}
                                value={x.value}
                                disabled={x.disabled}
                                variant="outlined"
                                onChange={(e) => {
                                    if (e.target.name === 'paternos' || e.target.name === 'maternos' || e.target.name === 'nombres') {
                                        let numeros = '0123456789°!"#$%&/()=?¡*¨[]_:;><'
                                        let inserta = true
                                        numeros.split('').map((x) => {
                                            if (e.target.value.includes(x)) {
                                                inserta = false
                                            }
                                            return false
                                        })
                                        if (inserta) {
                                            x.onchanged(e)
                                        }
                                    } else {
                                        x.onchanged(e)
                                    }

                                }}
                                endAdornment={
                                  
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            color="secondary"
                                        >
                                            <RemoveRedEyeIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        }
                        {
                            x.tipo === 'select' && <FormControl fullWidth variant="outlined">
                                <InputLabel>{t(x.label)}</InputLabel>
                                <Select
                                    value={x.value}
                                    label={x.label}
                                    name={x.id}
                                    onChange={(e) => x.onchanged(e)}
                                >
                                    {x.array.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }
                        {
                            x.tipo === 'radio' && <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            ><FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">{t(x.label)}</FormLabel>
                                    <RadioGroup
                                        row
                                        name={x.id}
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        value={x.value}
                                        onChange={(e) => x.onchanged(e)}
                                    >
                                        {
                                            x.array.map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio size="small" />} label={item.label} />)
                                        }

                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        }
                    </Grid>
                    )}
                </Grid>
                {
                    terms !== undefined && <Box
                        alignItems="center"
                        display={{ xs: 'block', md: 'flex' }}
                        justifyContent="space-between"
                    >
                        <Box display={{ xs: 'block', md: 'flex' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={terms}
                                        name="terms"
                                        color="primary"
                                        onChange={(e) => setTerms(e.target.checked)}
                                    />
                                }
                                label={
                                    <>
                                        <Typography variant="body2">
                                            {t('Acepto los')}{' '}
                                            <Link component="a"
                                                href="#"
                                                onClick={() => setModal(true)}>
                                                {t('terminos y condiciones')}
                                            </Link>
                                            .
                                        </Typography>
                                    </>
                                }
                            />
                        </Box>
                    </Box>
                }
            </>
            <DialogWrapper
                open={modal}
                maxWidth={'sm'}
                fullWidth
                keepMounted
                onClose={() => setModal(false)}
            >
                <Card>
                    <CardHeader title={'Terminos y condiciones'} action={
                        <IconButton color="primary" onClick={() =>
                            setModal(false)
                        }>
                            <CloseIcon />
                        </IconButton>
                    } />
                    <Divider />
                    <Box
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{ height: 750, width: 'auto' }}>
                        <Scrollbar>
                            <PdfItem
                                pdf={pdf}
                            />
                        </Scrollbar>
                    </Box>

                </Card>
            </DialogWrapper>
        </>
    )
}
