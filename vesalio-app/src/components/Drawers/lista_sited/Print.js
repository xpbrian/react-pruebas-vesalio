import React, { useEffect } from "react";




export const ComponentToPrint = React.forwardRef((props, ref) => {
    useEffect(() => {
        console.log(props);
    }, [props])

    return (
        <div ref={ref}>
            dsljvbldf b,l.dg b
        </div>
    );
});
