import React from 'react';
import { useBarcode } from 'react-barcodes';

function App({ value }) {
    const { inputRef } = useBarcode({
        value: value,
        options: {
            displayValue: false
        }
    });

    return (
        <div style={{ maxWidth: "250px" }}>
            <img ref={inputRef} alt="ertyui" width={245} height={30} />
        </div>
    )
};

export default App;