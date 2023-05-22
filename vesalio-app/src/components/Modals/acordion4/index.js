import { Grid } from '@mui/material';
import useLayoutContext from 'src/hooks/useAuthLayout'
import Result from './block'

export default function Index() {
    const { modalOpen } = useLayoutContext()
    return (
        <>
            <Grid container spacing={4}>

                <Grid item xs={12} sm={12} lg={12}>
                    <Result datos={modalOpen.item.datos} />
                </Grid>
            </Grid>

        </>
    )
}
