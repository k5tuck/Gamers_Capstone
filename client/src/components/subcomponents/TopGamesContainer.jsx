import React, { useEffect, useState } from 'react'
import axios from 'axios'


function TopGamesContainer() {
    const [games, setGames] = useState([])
    async function getGame(){
        const resp = await axios.get('/api/maintopfive')
        setGames(...games, resp.data)

    }
    useEffect(() => {
        getGame()
    }, [])
    return (
        <div>
            <ul>
                This is the Top 5 game spot
                {/* {games.map(g => {
                    return <Link to={"/member/game/" + g.id}><li>{g.title}</li></Link>
                })} */}
            </ul>
        </div>
        

    )
}
export default TopGamesContainer;