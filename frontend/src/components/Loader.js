import React from 'react'
import { Spinner } from 'react-bootstrap';


function Loader({modal}) {
    return (
        <div className={modal?'':'loader'}>
            <Spinner className='m-auto' animation="border" variant="primary" />
        </div>
    )
}

export default Loader
