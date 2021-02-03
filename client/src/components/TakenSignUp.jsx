import React from 'react'
// import { Link } from 'react-router-dom'
import takenImage from '../images/giphy.gif'


function TakenSignUp() {
    return (
        <div>
            <h1>
                Sorry this username is taken please choose another one.
                <img src={takenImage} alt="image"/>
            </h1>
       </div>


    
    )
}

export default TakenSignUp;