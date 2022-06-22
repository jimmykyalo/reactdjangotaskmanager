import React from 'react'
import { Spinner } from 'react-bootstrap';


function Loader({modal}) {
    return (
        <div className={modal?'':'loader'}>
            {modal?<Spinner className='m-auto' animation="border" variant="light" />:<div className={`cube`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>}
            
        </div>
    )
}

export default Loader
