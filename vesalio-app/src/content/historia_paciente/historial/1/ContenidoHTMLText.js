import { Grid, Typography } from '@mui/material'
import { Markup } from 'interweave';


export default function ContenidoHTMLText({ title, contenido }) {
    return (
        <><Grid item lg={3} sx={{ mt: 2 }}>
            <Typography variant='span'><b>{title}</b></Typography>
        </Grid>
            <Grid item lg={9} sx={{ mt: .4 }}>
                <Markup content={contenido} />
            </Grid></>
    )
}
