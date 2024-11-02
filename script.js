let interval;
let isRunning = false;
let focusTime;
let breakTime;
let time;
let count;
let flag;

const start = () => {

    document.getElementById('start').disabled = true;
    if (isRunning) return;

    count = document.getElementById("count").value;
    focusTime = document.getElementById("focus").value * 60;
    breakTime = document.getElementById("break").value * 60;
    console.log('init:', count);

    if (count > 8) {
        alert("Please enter a number between 1 and 8.");
        document.getElementById("count").value = "";
        return;
    }
    isRunning = true;
    time = focusTime;
    startPomodoro();
};

function startPomodoro() {
    flag = 0;
    if (isRunning == true) {
        time = focusTime;
    } else {
        isRunning = true;
    }

    document.getElementById('info').innerText = "Focus";

    interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        document.getElementById("count-down").innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        time--;
        if (time < 0) {
            clearInterval(interval);
            count--;
            console.log('sent: ', count);
            if (count > 0) {
                time = breakTime;
                setBreak(count);
            } else {
                document.getElementById('start').disabled = false;
                document.getElementById('info').innerText = "Pomodoro";
                isRunning = false;
            }
        }
    }, 1000);
}

function setBreak() {
    flag = 1;
    if(isRunning == true){
        time = breakTime;
    } else {
        isRunning = true;
    }

    document.getElementById('info').innerText = "Break";

    interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        document.getElementById("count-down").innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        time--;
        if (time < 0) {
            clearInterval(interval);
            console.log('received: ', count);
            startPomodoro();
        }
    }, 1000);
}

const stopAndResume = () => {
    let element = document.getElementById("stop-and-resume")
    let status = element.innerText;
    console.log(time);
    if (status == "Stop") {
        isRunning = false;
        clearInterval(interval);
        element.innerText = "Resume";
        element.classList.add('bg-yellow-200');
        element.classList.remove('bg-red-200');
    } else {
        element.innerText = "Stop";
        element.classList.add('bg-red-200');
        element.classList.remove('bg-yellow-200');

        if(!flag){
            startPomodoro();
        } else {
            setBreak();
        }
    }
}

const reset = () => {
    clearInterval(interval);
    isRunning = false;
    document.getElementById("count-down").innerText = "00:00";
    document.getElementById('start').disabled = false;
}