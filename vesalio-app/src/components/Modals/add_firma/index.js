import React, { useState } from 'react'
import { Avatar, Box, Button, IconButton, styled, Zoom } from '@mui/material'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import axios from 'axios';
import useLayoutContext from 'src/hooks/useAuthLayout';
import { useSnackbar } from 'notistack';


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
    () => `

      position: relative;

      .MuiAvatar-root {
        width: 300px;
        height: 150px};
      }
  `
);
export default function Index() {
    const [img, setImg] = useState('')
    const { modalOpen, mostrarComponent } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const [enviar, setEnviar] = useState(null)
    const handleChanged = (e) => {
        setEnviar(e.target.files[0])

        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            setImg(reader.result); // base64encoded string
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }
    const handleEnviar = async (id) => {
        if (enviar === null) {
            enqueueSnackbar('Debe seleccionar un pdf', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
        } else {
            let rpta = await axios.postForm(`http://apis-vesalio.com.pe/cargarPdf/${id}`, { myFile: enviar })
            if (rpta.data.data === 'Enviar un archivo') {
                mostrarComponent({
                    contenido: '',
                    estado: false,
                    size: 'xs'
                }, 'modalOpen')
                enqueueSnackbar('Carga de archivo correcta', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
            }
        }


    }
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            p={4}
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
                        onChange={(e) => handleChanged(e)}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton component="span" color="primary">
                            <CloudUploadTwoToneIcon />
                        </IconButton>
                    </label>
                </ButtonUploadWrapper>
            </AvatarWrapper>

            <Button sx={{ mt: 4 }} variant='contained'
                onClick={() => handleEnviar(modalOpen.item)}

            >Grabar</Button>
        </Box>
    )
}
