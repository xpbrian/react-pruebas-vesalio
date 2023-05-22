import { Grid } from '@mui/material';
import Result from './Result'

export default function Index() {
    return (
        <>
            <Grid container spacing={4}>

                <Grid item xs={12} sm={12} lg={12}>
                    <Result  />
                </Grid>
            </Grid>

        </>
    )
}
