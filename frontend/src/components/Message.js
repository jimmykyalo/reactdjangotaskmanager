import React from 'react'
import { Alert } from '@mui/material'

function Message({ severity, children, width }) {
    return (
        <Alert sx={{ width: `100%`, margin:'0 auto' }} severity={severity}>
            {children}
        </Alert>
    )
}

export default Message
