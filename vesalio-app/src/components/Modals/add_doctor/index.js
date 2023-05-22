import { Autocomplete, Avatar, Box, Button, Grid, IconButton, InputAdornment, Menu, MenuItem, styled, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import useLayoutContext from 'src/hooks/useAuthLayout';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ButtonUploadWrapper = styled(Box)(
    ({ theme }) => `
      position: absolute;
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      bottom: -${theme.spacing(2)};
      right: -${theme.spacing(2)};

      .MuiIconButton-root {
        border-radius: 100%;
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};
        width: ${theme.spacing(6)};
        height: ${theme.spacing(6)};
        padding: 0;

        &:hover {
          background: ${theme.colors.primary.dark};
        }
      }
  `
);

const Input = styled('input')({
    display: 'none'
});
const AvatarWrapper = styled(Box)(
    ({ theme }) => `

      position: relative;

      .MuiAvatar-root {
        width: ${theme.spacing(16)};
        height: ${theme.spacing(16)};
      }
  `
);
const SearchInputWrapper = styled(TextField)(
    ({ theme }) => `

      .MuiSvgIcon-root {
        opacity: .7;
      }

      .MuiInputBase-input {
          font-size: ${theme.typography.pxToRem(17)};
      }

      .MuiInputBase-root {
          background: ${theme.colors.alpha.white[100]};
      }

      .MuiInputBase-adornedEnd {
        padding-right: ${theme.spacing(0.5)};
      }
    `
);

export default function Index() {
    const [img] = useState('')
    const { especialidadesRegistro, tipoDocumentos } = useLayoutContext()
    const actionRef = useRef(null);
    const [openLocation, setOpenMenuLocation] = useState(false);
    const [location, setLocation] = useState(tipoDocumentos.reduce((arr, item, ix) => {
        arr.push({ ...item, active: ix === 0 && true })
        return arr
    }, []));
    return (
        <>
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item xs={12} lg={7}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={12}>
                            <SearchInputWrapper
                                InputProps={{
                                    startAdornment: (
                                        <Button
                                            ref={actionRef}
                                            onClick={() => setOpenMenuLocation(true)}
                                            variant="contained" endIcon={
                                                <ArrowDropDownIcon />
                                            }>
                                            {location.find(x => x.active).label}
                                        </Button>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <SearchTwoToneIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder={'Ingresar documento...'}
                                fullWidth
                            />
                            <Menu
                                disableScrollLock
                                anchorEl={actionRef.current}
                                onClose={() => setOpenMenuLocation(false)}
                                open={openLocation}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center'
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center'
                                }}
                            >
                                {location.map((_location) => (
                                    <MenuItem
                                        key={_location.id}
                                        onClick={() => {
                                            setLocation(x => x.reduce((arr, item) => {
                                                arr.push({ ...item, active: _location.id === item.id && true })
                                                return arr
                                            }, []));

                                            setOpenMenuLocation(false);
                                        }}
                                    >
                                        {_location.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Grid>


                        <Grid item xs={12} lg={12}>
                            <Autocomplete
                                fullWidth
                                options={especialidadesRegistro.reduce((arr, item) => {
                                    arr.push({ id: item.id, label: item.nombre })
                                    return arr
                                }, [])}
                                value={null}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        variant="outlined"
                                        label={'Especialidad'}
                                        placeholder={'Seleccione especialidad'}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Button
                                fullWidth
                                variant="contained">
                                Agregar doctor
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={5} justifyContent="center">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        mt={3}
                    >
                        <AvatarWrapper>
                            <Avatar
                                variant="rounded"
                                alt={'Seleccione imagen'}
                                src={img}
                            />
                            <ButtonUploadWrapper>
                                <Input
                                    accept="image/*"
                                    id="icon-button-file"
                                    name="icon-button-file"
                                    type="file"
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton component="span" color="primary">
                                        <CloudUploadTwoToneIcon />
                                    </IconButton>
                                </label>
                            </ButtonUploadWrapper>
                        </AvatarWrapper>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
