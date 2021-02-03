import React from 'react'
// import { Link } from 'react-router-dom'
import UnauthorizedImage from '../images/jedi.gif'

function Unauthorized() {
    return (
        <>
            <h1>
                YOU SHALL NOT PASS!!!!!!!
            </h1>
            <h2>
                Please click on Home and Sign In
            </h2>
            <img src={UnauthorizedImage} alt=""/>

            {/* <Link to="/Login">Log in </Link> */}
        </>
    )
}

export default Unauthorized;