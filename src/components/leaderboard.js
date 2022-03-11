import { useState } from "react"

function Leaderboard() {
    const [players, setPlayers] = useState([
        {id:0, user:"ahmed0saber", score:6400},
        {id:1, user:"Zero", score:4000},
        {id:2, user:"unkwown", score:1000},
        {id:15, user:"Ahmed Saber", score:800}
    ]);

    return <main className="leaderboard">
            {[...players].map((el, i) => el.score>0 && el.score%2==0 ? (<div className="player-card" key={el.id}>{i+1} --- {el.user} --- {el.score}</div>) : null )}
        </main>
}

export default Leaderboard;