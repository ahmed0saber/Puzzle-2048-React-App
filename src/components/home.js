import { useState, useEffect } from "react"

function Home() {
    const [score, setScore] = useState(0);
    const [tiles, setTiles] = useState([
        {id:0, x:0, y:0, value:0},
        {id:1, x:0, y:1, value:0},
        {id:2, x:0, y:2, value:0},
        {id:3, x:0, y:3, value:0},
        {id:4, x:1, y:0, value:0},
        {id:5, x:1, y:1, value:0},
        {id:6, x:1, y:2, value:0},
        {id:7, x:1, y:3, value:0},
        {id:8, x:2, y:0, value:0},
        {id:9, x:2, y:1, value:0},
        {id:10, x:2, y:2, value:0},
        {id:11, x:2, y:3, value:0},
        {id:12, x:3, y:0, value:0},
        {id:13, x:3, y:1, value:0},
        {id:14, x:3, y:2, value:0},
        {id:15, x:3, y:3, value:0}
    ]);
    const [game, newGame] = useState(true);
    const [value, setValue] = useState(0);

    function new_turn(){
        //get a random number from 0 to 15
        let rand=Math.floor((Math.random() * 16))
        //get a random number 2 or 4
        let num= Math.floor((Math.random() * 2) + 1)
        if(num==1){
            num=2
        }else{
            num=4
        }
        //then put number in its cell
        if(tiles[rand].value<2){
            let tempArray = tiles
            tempArray[rand].value = num
            setTiles(tempArray)
        }
        else{
            new_turn()
        }
    }

    function new_game(){
        newGame(!game)
        setScore(0)
        for(let i=0;i<16;i++){
            let tempArray = tiles
            for(let i=0; i<16; i++){
                tempArray[i].value = 0
            }
            setTiles(tempArray)
        }
        new_turn()
        new_turn()
    }

    useEffect(() => {
        if(game){
            new_game()
        }
    },[])

    function to_right(){
        var tempArray = tiles
        for(let y=0; y<4; y++){
            var merged = false
            for(let x=0; x<4; x++){
                let objIndex = tempArray.findIndex((obj => obj.x == x && obj.y == y))
                let moveIndex = tempArray.findIndex((obj => obj.x == x+1 && obj.y == y))
                if(tempArray[objIndex].x < 3 && tempArray[objIndex].value > 0 && (tempArray[moveIndex].value < 2 || tempArray[moveIndex].value == tempArray[objIndex].value)){
                    tempArray[objIndex].x = tempArray[objIndex].x + 1
                    if(tempArray[moveIndex].value == tempArray[objIndex].value && !merged){
                        tempArray[objIndex].value = tempArray[objIndex].value * 2
                        tempArray[moveIndex].value = 0
                        merged = true
                        setScore(score + tempArray[objIndex].value)
                    }
                    tempArray[moveIndex].x = tempArray[moveIndex].x - 1
                }
                
            }
        }
        setTiles(tempArray)
        new_turn()
        setValue(value + 1);
    }

    function to_left(){
        var tempArray = tiles
        for(let y=0; y<4; y++){
            var merged = false
            for(let x=3; x>0; x--){
                let objIndex = tempArray.findIndex((obj => obj.x == x && obj.y == y))
                let moveIndex = tempArray.findIndex((obj => obj.x == x-1 && obj.y == y))
                if(tempArray[objIndex].x > 0 && tempArray[objIndex].value > 0 && (tempArray[moveIndex].value < 2 || tempArray[moveIndex].value == tempArray[objIndex].value)){
                    tempArray[objIndex].x = tempArray[objIndex].x - 1
                    if(tempArray[moveIndex].value == tempArray[objIndex].value && !merged){
                        tempArray[objIndex].value = tempArray[objIndex].value * 2
                        tempArray[moveIndex].value = 0
                        merged = true
                        setScore(score + tempArray[objIndex].value)
                    }
                    tempArray[moveIndex].x = tempArray[moveIndex].x + 1
                }
                
            }
        }
        setTiles(tempArray)
        new_turn()
        setValue(value + 1);
    }

    function to_down(){
        var tempArray = tiles
        for(let x=0; x<4; x++){
            var merged = false
            for(let y=0; y<4; y++){
                let objIndex = tempArray.findIndex((obj => obj.x == x && obj.y == y))
                let moveIndex = tempArray.findIndex((obj => obj.x == x && obj.y == y+1))
                if(tempArray[objIndex].y < 3 && tempArray[objIndex].value > 0 && (tempArray[moveIndex].value < 2 || tempArray[moveIndex].value == tempArray[objIndex].value)){
                    tempArray[objIndex].y = tempArray[objIndex].y + 1
                    if(tempArray[moveIndex].value == tempArray[objIndex].value && !merged){
                        tempArray[objIndex].value = tempArray[objIndex].value * 2
                        tempArray[moveIndex].value = 0
                        merged = true
                        setScore(score + tempArray[objIndex].value)
                    }
                    tempArray[moveIndex].y = tempArray[moveIndex].y - 1
                }
                
            }
        }
        setTiles(tempArray)
        new_turn()
        setValue(value + 1);
    }

    function to_top(){
        var tempArray = tiles
        for(let x=0; x<4; x++){
            var merged = false
            for(let y=3; y>0; y--){
                let objIndex = tempArray.findIndex((obj => obj.x == x && obj.y == y))
                let moveIndex = tempArray.findIndex((obj => obj.x == x && obj.y == y-1))
                if(tempArray[objIndex].y > 0 && tempArray[objIndex].value > 0 && (tempArray[moveIndex].value < 2 || tempArray[moveIndex].value == tempArray[objIndex].value)){
                    tempArray[objIndex].y = tempArray[objIndex].y - 1
                    if(tempArray[moveIndex].value == tempArray[objIndex].value && !merged){
                        tempArray[objIndex].value = tempArray[objIndex].value * 2
                        tempArray[moveIndex].value = 0
                        merged = true
                        setScore(score + tempArray[objIndex].value)
                    }
                    tempArray[moveIndex].y = tempArray[moveIndex].y + 1
                }
                
            }
        }
        setTiles(tempArray)
        new_turn()
        setValue(value + 1);
    }

    return <main>
        <h3 className="score">Score: {score}</h3>
        <div className="game">
            {[...Array(16)].map((el, i) => (<div className="cell" key={i}></div>))}
            {[...tiles].map(el => el.value>0 ? (<div className="tile" key={el.id} Style={`--x:${el.x};--y:${el.y};--bg:${88-Math.log2(el.value)*(5+28/el.value)}%;--text:${el.value>2048 ? 100 : 0}%`}>{el.value}</div>) : null )}
        </div>

        <div className="btns">
            <button className="btn move" onClick={to_top}>Top</button>
        </div>
        <div className="btns">
            <button className="btn move" onClick={to_left}>Left</button>
            <button className="btn move" onClick={to_down}>Down</button>
            <button className="btn move" onClick={to_right}>Right</button>
        </div>

        <div className="btns">
            <button className="btn" onClick={console.log(0)}>Save</button>
            <button className="btn" onClick={console.log(0)}>Load</button>
        </div>

        <div className="btns">
            <button className="btn" onClick={new_game}>New Game</button>
            <button className="btn" onClick={console.log(0)}>Submit Score</button>
        </div>
    </main>
}

export default Home;