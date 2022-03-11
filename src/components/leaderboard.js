import { useState, useEffect } from "react"

function Leaderboard() {
    const [players, setPlayers] = useState([])
    const [opened, setOpened] = useState(false)

    const getData = () => {
        const url = "https://api-and-websockets.herokuapp.com/api/get_scores/react-puzzle/"
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setPlayers(data)
        })
    }

    useEffect(() => {
        if(!opened){
            getData()
            setOpened(true)
        }
    },[])

    return <main className="leaderboard">
            <div className="player-card"><span>Rank</span><span>Username</span><span>Score</span></div>
            {[...players].map((el, i) => el.score>0 && el.score%2==0 ? (<div className="player-card" key={el.id}><span>{i+1}</span><span>{el.name}</span><span>{el.score}</span></div>) : null )}
        </main>
}

export default Leaderboard;