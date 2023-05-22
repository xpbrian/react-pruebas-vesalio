import { useState, useEffect } from 'react';

import {
    Grid,
    Card,
    Box,
    Divider,
    Button,
} from '@mui/material';
import useLayoutContext from 'src/hooks/useAuthLayout';
import QRCode from "react-qr-code";



function ApplicationsCalendar() {
    const { modalOpen } = useLayoutContext()
    const [qr, setQR] = useState('')
    useEffect(() => {
        setQR(modalOpen.item)
    }, [modalOpen])
    const handleReenviarQR = async()=>{
        console.log("sdfñlg");
    }
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                <Grid item xs={12}>
                    <Card>
                        <Box sx={{ p: 3 }}>
                            {qr.length > 0 && <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={qr}
                                viewBox={`0 0 256 256`}
                            />}
                        </Box>
                        <Divider />
                        <Button variant="outlined" sx={{ float: 'right', m:2 }} onClick={() => handleReenviarQR}>
                           Reenviar código
                        </Button>
                    </Card>
                </Grid>
            </Grid>


        </>
    );
}

export default ApplicationsCalendar;
