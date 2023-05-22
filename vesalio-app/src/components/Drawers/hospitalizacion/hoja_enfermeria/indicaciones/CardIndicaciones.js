import { useState } from 'react';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,

} from '@mui/material';


export default function Index({ title, children }) {
    const [display, setDisplay] = useState(true)
    return (
        <Card sx={{mb:1}}>
            <CardHeader
                action={
                    <>
                        <IconButton
                            size="medium"
                            color="secondary"
                            onClick={() => setDisplay(x => !x)}
                        >
                            <ExpandMoreTwoToneIcon fontSize="small" />
                        </IconButton>
                    </>
                }
                title={title} />
            <Divider />
            <CardContent sx={{ display: display ? '' : 'none' }}>
                {children}
            </CardContent>
            <Divider />

        </Card>
    );
}

