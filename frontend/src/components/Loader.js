import React from 'react'
import { Spinner } from 'react-bootstrap';


function Loader({width}) {
    return (
        <div className='loader'>
            <Spinner className='m-auto' animation="border" variant="primary" />
        </div>
    )
}

export default Loader
