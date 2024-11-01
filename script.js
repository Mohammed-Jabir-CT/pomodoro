let interval;
let isRunning = false;
let focusTime;
let breakTime;
let time;

const start = () => {

    document.getElementById('start').disabled = true;
    if (isRunning) return;

    let cnt = document.getElementById("count").value;
    focusTime = document.getElementById("focus").value;
    breakTime = document.getElementById("break").value;
    console.log('init:', cnt);

    if (cnt > 8) {
        alert("Please enter a number between 1 and 8.");
        document.getElementById("count").value = "";
        return;
    }
    isRunning = true;
    startPomodoro(cnt);
};

function startPomodoro(cnt) {
    time = focusTime

    document.getElementById('info').innerText = "Focus";

    interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        document.getElementById("count-down").innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        time--;
        if (time < 0) {
            clearInterval(interval);
            cnt -= 1;
            console.log('sent: ', cnt);
            if (cnt > 0) {
                setBreak(cnt);
            } else {
                document.getElementById('start').disabled = false;
                document.getElementById('info').innerText = "Pomodoro";
                isRunning = false;
            }
        }
    }, 1000);
}

function setBreak(cnt) {

    time = breakTime;

    document.getElementById('info').innerText = "Break";

    interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        document.getElementById("count-down").innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        time--;
        if (time < 0) {
            clearInterval(interval);
            console.log('received: ', cnt);
            startPomodoro(focusTime, cnt);
        }
    }, 1000);
}

const stopAndResume = () => {
    let status = document.getElementById("stop-and-resume").innerText;
    console.log(time);
    if(status == "Stop"){
        clearInterval(interval);
        isRunning = false;    
    } else{
        
    }
}

const reset = () => {
    document.getElementById("count-down").innerText = "00:00";
    document.getElementById('start').disabled = false;
}