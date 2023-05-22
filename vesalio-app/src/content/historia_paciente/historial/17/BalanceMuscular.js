import { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'

export default function ListaCitasTabla({ balanceMuscular: datos, title }) {
    const [lista, setLista] = useState([])
    const [array, setArray] = useState([])

    useEffect(() => {
        setLista(datos)
    }, [datos])

    useEffect(() => {
        if (lista.length > 0) {
            console.log(lista);
            setArray([
                { id: '1', item: lista[0].balance1, sx: { borderRight: 'solid 3px black' } },
                { id: '2', item: lista[0].balance2, sx: { borderRight: 'solid 3px black' } },
                { id: '3', item: lista[0].balance3, sx: { display: '' } },
                { id: '4', item: lista[0].balance4, sx: { borderRight: 'solid 3px black', borderTop: 'solid 3px black' } },
                { id: '5', item: lista[0].balance5, sx: { borderRight: 'solid 3px black', borderTop: 'solid 3px black' } },
                { id: '6', item: lista[0].balance6, sx: { borderTop: 'solid 3px black' } },
                { id: '7', item: lista[0].balance7, sx: { borderRight: 'solid 3px black', borderTop: 'solid 3px black' } },
                { id: '8', item: lista[0].balance8, sx: { borderRight: 'solid 3px black', borderTop: 'solid 3px black' } },
                { id: '9', item: lista[0].balance9, sx: { borderTop: 'solid 3px black' } },
            ])
        }

    }, [lista])

    return (
        <>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 },
                    mb: 2
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item lg={4}>
                    <Typography variant='h4'>{title}</Typography>
                </Grid>
            </Grid>
            {
                array.length > 0 && <Grid
                    sx={{
                        px: { xs: 0, md: 2 }
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                >
                    {
                        array.map((list, ix) => <Grid item lg={4} key={ix} sx={list.sx}>
                            <Typography variant='h4'>{list.item}</Typography>
                        </Grid>)
                    }

                </Grid>
            }


        </>
    )
}
