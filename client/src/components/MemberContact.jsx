import React from 'react'
import { Link } from 'react-router-dom'

function MemberContact() {
    return (
        <div class="game-page">
            <h1>Contact Us.</h1>
            <h3>Joshua Lopez</h3>
            <ul>
                <li><Link  to="https://github.com/JoshuaNow">Github</Link></li>
                <li><Link to="https://www.linkedin.com/in/joshua-lopez-dev/">LinkedIn</Link></li>
            </ul>
            <h3>Ian Storms</h3>
            <ul>
                <li><Link to="https://github.com/Stormy110">Github</Link></li>
                <li><Link to="https://www.linkedin.com/in/ianstorms/">LinkedIn</Link></li>
            </ul>
            <h3>Kevin Tucker</h3>
            <ul>
                <li><Link to="https://github.com/k5tuck">Github</Link></li>
                <li><Link to="https://www.linkedin.com/in/ktuck18/">LinkedIn</Link></li>
            </ul>
            <h3>Shoel Uddin</h3>
            <ul>
                <li><Link to="https://github.com/shoel-uddin">Github</Link></li>
                <li><Link to="https://www.linkedin.com/in/shoel-uddin/">LinkedIn</Link></li>
            </ul>
        </div>
    )
}

export default MemberContact;