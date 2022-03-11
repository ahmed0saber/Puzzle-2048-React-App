import { useState, useEffect } from "react"
import Swal from 'sweetalert2'

function Home() {
    const [score, setScore] = useState(0);
    const [tiles, setTiles] = useState([
        {id:0, x:0, y:0, value:0, merged:false},
        {id:1, x:0, y:1, value:0, merged:false},
        {id:2, x:0, y:2, value:0, merged:false},
        {id:3, x:0, y:3, value:0, merged:false},
        {id:4, x:1, y:0, value:0, merged:false},
        {id:5, x:1, y:1, value:0, merged:false},
        {id:6, x:1, y:2, value:0, merged:false},
        {id:7, x:1, y:3, value:0, merged:false},
        {id:8, x:2, y:0, value:0, merged:false},
        {id:9, x:2, y:1, value:0, merged:false},
        {id:10, x:2, y:2, value:0, merged:false},
        {id:11, x:2, y:3, value:0, merged:false},
        {id:12, x:3, y:0, value:0, merged:false},
        {id:13, x:3, y:1, value:0, merged:false},
        {id:14, x:3, y:2, value:0, merged:false},
        {id:15, x:3, y:3, value:0, merged:false}
    ])
    const [game, newGame] = useState(true)
    const [value, setValue] = useState(0)
    const [startX, setStartX] = useState()
    const [startY, setStartY] = useState()
    const [endX, setEndX] = useState()
    const [endY, setEndY] = useState()

    function new_turn(x){
        if(x){
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
            }else{
                new_turn(true)
            }
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
        new_turn(true)
        new_turn(true)
    }

    useEffect(() => {
        if(game){
            new_game()
            autoLoad()
        }
    },[])

    function to_right(){
        var tempArray = tiles
        let changed = false
        for(let y=0; y<4; y++){
            for(let x=2; x>-1; x--){
                for(let i=x; i<3; i++){
                    let objIndex = tempArray.findIndex((obj => obj.x == i && obj.y == y))
                    let moveIndex = tempArray.findIndex((obj => obj.x == i+1 && obj.y == y))
                    if(tempArray[objIndex].x < 3 && tempArray[objIndex].value > 0 && (tempArray[moveIndex].value < 2 || tempArray[moveIndex].value == tempArray[objIndex].value)){
                        if(tempArray[moveIndex].value == tempArray[objIndex].value && !tempArray[objIndex].merged && !tempArray[moveIndex].merged){
                            tempArray[objIndex].value = tempArray[objIndex].value * 2
                            tempArray[moveIndex].value = 0
                            tempArray[objIndex].merged = true
                            tempArray[moveIndex].merged = true
                            setScore(score + tempArray[objIndex].value)
                            changed = true
                        }
                        if(tempArray[moveIndex].value != tempArray[objIndex].value){
                            tempArray[objIndex].x = tempArray[objIndex].x + 1
                            tempArray[moveIndex].x = tempArray[moveIndex].x - 1
                            changed = true
                        }
                    }
                }
            }
        }
        for (let n = 0; n < tempArray.length; n++) {
            tempArray[n].merged = false
        }
        setTiles(tempArray)
        new_turn(changed)
        setValue(value + 1);
    }

    function to_left(){
        var tempArray = tiles
        let changed = false
        for(let y=0; y<4; y++){
            for(let x=1; x<4; x++){
                for(let i=x; i>0; i--){
                    let objIndex = tempArray.findIndex((obj => obj.x == i && obj.y == y))
                    let moveIndex = tempArray.findIndex((obj => obj.x == i-1 && obj.y == y))
                    if(tempArray[objIndex].x > 0 && tempArray[objIndex].value > 0 && (tempArray[moveIndex].value < 2 || tempArray[moveIndex].value == tempArray[objIndex].value)){
                        if(tempArray[moveIndex].value == tempArray[objIndex].value && !tempArray[objIndex].merged && !tempArray[moveIndex].merged){
                            tempArray[objIndex].value = tempArray[objIndex].value * 2
                            tempArray[moveIndex].value = 0
                            tempArray[objIndex].merged = true
                            tempArray[moveIndex].merged = true
                            setScore(score + tempArray[objIndex].value)
                            changed = true
                        }
                        if(tempArray[moveIndex].value != tempArray[objIndex].value){
                            tempArray[objIndex].x = tempArray[objIndex].x - 1
                            tempArray[moveIndex].x = tempArray[moveIndex].x + 1
                            changed = true
                        }
                    }
                }
            }
        }
        for (let n = 0; n < tempArray.length; n++) {
            tempArray[n].merged = false
        }
        setTiles(tempArray)
        new_turn(changed)
        setValue(value + 1)
    }

    function to_down(){
        var tempArray = tiles
        let changed = false
        for(let x=0; x<4; x++){
            for(let y=2; y>-1; y--){
                for(let i=y; i<3; i++){
                    let objIndex = tempArray.findIndex((obj => obj.x == x && obj.y == i))
                    let moveIndex = tempArray.findIndex((obj => obj.x == x && obj.y == i+1))
                    if(tempArray[objIndex].y < 3 && tempArray[objIndex].value > 0 && (tempArray[moveIndex].value < 2 || tempArray[moveIndex].value == tempArray[objIndex].value)){
                        if(tempArray[moveIndex].value == tempArray[objIndex].value && !tempArray[objIndex].merged && !tempArray[moveIndex].merged){
                            tempArray[objIndex].value = tempArray[objIndex].value * 2
                            tempArray[moveIndex].value = 0
                            tempArray[objIndex].merged = true
                            tempArray[moveIndex].merged = true
                            setScore(score + tempArray[objIndex].value)
                            changed = true
                        }
                        if(tempArray[moveIndex].value != tempArray[objIndex].value){
                            tempArray[objIndex].y = tempArray[objIndex].y + 1
                            tempArray[moveIndex].y = tempArray[moveIndex].y - 1
                            changed = true
                        }
                    }
                }
            }
        }
        for (let n = 0; n < tempArray.length; n++) {
            tempArray[n].merged = false
        }
        setTiles(tempArray)
        new_turn(changed)
        setValue(value + 1)
    }

    function to_top(){
        var tempArray = tiles
        let changed = false
        for(let x=0; x<4; x++){
            for(let y=1; y<4; y++){
                for(let i=y; i>0; i--){
                    let objIndex = tempArray.findIndex((obj => obj.x == x && obj.y == i))
                    let moveIndex = tempArray.findIndex((obj => obj.x == x && obj.y == i-1))
                    if(tempArray[objIndex].y > 0 && tempArray[objIndex].value > 0 && (tempArray[moveIndex].value < 2 || tempArray[moveIndex].value == tempArray[objIndex].value)){
                        if(tempArray[moveIndex].value == tempArray[objIndex].value && !tempArray[objIndex].merged && !tempArray[moveIndex].merged){
                            tempArray[objIndex].value = tempArray[objIndex].value * 2
                            tempArray[moveIndex].value = 0
                            tempArray[objIndex].merged = true
                            tempArray[moveIndex].merged = true
                            setScore(score + tempArray[objIndex].value)
                            changed = true
                        }
                        if(tempArray[moveIndex].value != tempArray[objIndex].value){
                            tempArray[objIndex].y = tempArray[objIndex].y - 1
                            tempArray[moveIndex].y = tempArray[moveIndex].y + 1
                            changed = true
                        }
                    }
                }
            }
        }
        for (let n = 0; n < tempArray.length; n++) {
            tempArray[n].merged = false
        }
        setTiles(tempArray)
        new_turn(changed)
        setValue(value + 1)
    }

    function handleKeyPress(event) {
        if(event.key === 'w'){
            to_top()
        }else if(event.key === 's'){
            to_down()
        }else if(event.key === 'a'){
            to_left()
        }else if(event.key === 'd'){
            to_right()
        }
    }

    useEffect(() => {
        window.addEventListener("keypress", handleKeyPress);
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [handleKeyPress]);

    function startTouch(e){
        setStartX(e.targetTouches[0].clientX)
        setStartY(e.targetTouches[0].clientY)
    }
    function moveTouch(e){
        setEndX(e.targetTouches[0].clientX)
        setEndY(e.targetTouches[0].clientY)
    }
    function endTouch(){
        let diffX = startX - endX
        let diffY = startY - endY
        if(Math.abs(diffX) < 70 && Math.abs(diffY) < 70){
            return // Ignore short touches
        }
        if(Math.abs(diffX) > Math.abs(diffY)){
            // User means to move along x axis
            if(diffX > 0){
                to_left()
            }else if(diffX < 0){
                to_right()
            }
        }else{
            // User means to move along y axis
            if(diffY > 0){
                to_top()
            }else if(diffY < 0){
                to_down()
            }
        }
    }

    function save(){
        localStorage.setItem("board", JSON.stringify(tiles))
        localStorage.setItem("score", score)
        Swal.fire({
            icon: 'success',
            title: 'Saved successfully.'
        })
    }

    function load(){
        if(localStorage.getItem("board")){
            setTiles(JSON.parse(localStorage.getItem("board")))
            setScore(parseInt(localStorage.getItem("score")))
            Swal.fire({
                icon: 'success',
                title: 'Loaded successfully.'
            })
        }else{
            Swal.fire({
                icon: 'info',
                title: 'There is no saved game.'
            })
        }
    }

    function submitScore(){
        Swal.fire({
            title: 'Enter your username',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                return fetch("https://api-and-websockets.herokuapp.com/api/save_score/" , {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        "board": "react-puzzle",
                        "password": "react-puzzle",
                        "score": score,
                        "name": login
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Submitted successfully.",
                })
            }else{
                Swal.fire({
                    title: "Canceled.",
                })
            }
        })
    }

    function autoSave(){
        localStorage.setItem("autoBoard", JSON.stringify(tiles))
        localStorage.setItem("autoScore", score)
    }
    useEffect(() => {
        autoSave()
    })

    function autoLoad(){
        if(localStorage.getItem("autoBoard")){
            setTiles(JSON.parse(localStorage.getItem("autoBoard")))
            setScore(parseInt(localStorage.getItem("autoScore")))
            Swal.fire({
                icon: 'success',
                title: 'Resume your last game, You can start a new game if you want or load a saved game.'
            })
        }
    }

    return <main>
        <p className="tip">You can play with keyboard using w, s, a and d , Swipe on a touch screen or use the buttons below.</p>
        <h3 className="score">Score: {score}</h3>
        <div className="game" onTouchStart={startTouch} onTouchMove={moveTouch} onTouchEnd={endTouch}>
            {[...Array(16)].map((el, i) => (<div className="cell" key={i}></div>))}
            {[...tiles].map(el => el.value>0 ? (<div className="tile" key={el.id} Style={`--x:${el.x};--y:${el.y};--bg:${88-Math.log2(el.value)*(5+28/el.value)}%;--text:${el.value>2048 ? 100 : 0}%`}>{el.value}</div>) : null )}
        </div>

        <div className="btns">
            <button className="btn" onClick={save}>Save</button>
            <button className="btn move" onClick={to_top}><i className="fa fa-angle-up"></i></button>
            <button className="btn" onClick={load}>Load</button>
        </div>
        <div className="btns">
            <button className="btn move" onClick={to_left}><i className="fa fa-angle-left"></i></button>
            <button className="btn move" onClick={to_down}><i className="fa fa-angle-down"></i></button>
            <button className="btn move" onClick={to_right}><i className="fa fa-angle-right"></i></button>
        </div>

        <div className="btns">
            <button className="btn" onClick={new_game}>New Game</button>
            <button className="btn" onClick={submitScore}>Submit Score</button>
        </div>
    </main>
}

export default Home;