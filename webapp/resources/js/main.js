var graphColor = "";
var graphPointColor = "";

var graphCanvas = document.getElementById('graph');
var graph = graphCanvas.getContext('2d');
var toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

var width = graphCanvas.width;
var height = graphCanvas.height;

var heightLine = 5;
var coef = 2.5;
var canvasR = width / coef;
var metrik= graphCanvas.width / 2;
var x, y = 0, r;
var x_flag = true, y_flag = true, r_flag = true;

var getCookie = name => {
    var cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim().split('=')
        if (c[0] === name) {
          return decodeURIComponent(c[1])
        }
    }
    return ''
}

function validateForm(form) {
    document.getElementById('warning').innerHTML = "";
    if (validateNumber(y, -5, 5)) {
        return true;
    } else {
        document.getElementById('warning').innerHTML = "Please, enter correct Y value";
        event.preventDefault()
        return false;
    }
}

function validateNumber(text, start, finish) {
    const numberPattern = /^[+-]?(\d*[,.])?\d+$/; //TODO

    const number = parseFloat(text);
    if (Number.isNaN(number)
        || !numberPattern.test(text)) {
        return false;
    } else {
        return start <= number && number <= finish;
    }
}

function checkTheme() {
    if (getCookie('theme') == 'dark-theme') {
        document.body.className = 'dark-theme';
        graphColor = 'white'
    } else {
        graphColor = 'blue';
        document.body.className = 'light-theme';
    }
}

function switchTheme() {
    if (getCookie('theme') == 'light-theme') {
        document.body.className = 'dark-theme';
        graphColor = 'white'
        document.cookie = 'theme=dark-theme';
    }
    else {
        document.body.className = 'light-theme';
        graphColor = 'blue';
        document.cookie = 'theme=light-theme';
    }    
    drawGraph();
}

function convertXToRadiusOf(x, r) {
    return ((x - width / 2) / canvasR) * r;
}

function convertYToRadiusOf(y, r) {
    return ((height / 2 - y) / canvasR) * r;
}

function drawLine(graph, startX, startY, endX, endY) {
    graph.moveTo(startX, startY);
    graph.lineTo(endX, endY);
    graph.stroke(); 
}

function fillText(graph, text, coordX, coordY) {
    graph.fillText(text, coordX, coordY);
}

function drawGraph() {

    graph.strokeStyle = graphColor;
    graph.fillStyle = graphColor;
    graph.clearRect(-metrik, -metrik, metrik * 2, metrik * 2);
    graph.globalAlpha = 1;
    graph.beginPath();

    // draw x and y
    drawLine(graph, -metrik, 0, metrik, 0);
    drawLine(graph, 0, -metrik, 0, metrik);
    
    // draw strokes on x
    drawLine(graph, -(canvasR), -heightLine, -(canvasR), heightLine);
    drawLine(graph, -(canvasR / 2), -heightLine, -(canvasR / 2), heightLine);
    drawLine(graph, (canvasR), -heightLine, (canvasR), heightLine);
    drawLine(graph, (canvasR / 2), -heightLine, (canvasR / 2), heightLine);
    drawLine(graph, -(canvasR * 2), -heightLine, -(canvasR * 2), heightLine);
    drawLine(graph, -(canvasR * 1.5), -heightLine, -(canvasR * 1.5), heightLine);
    drawLine(graph, (canvasR * 2), -heightLine, (canvasR * 2), heightLine);
    drawLine(graph, (canvasR * 1.5), -heightLine, (canvasR * 1.5), heightLine);
    
    // draw strokes on y
    drawLine(graph, -heightLine, -(canvasR), heightLine, -(canvasR));
    drawLine(graph, -heightLine, -(canvasR / 2), heightLine, -(canvasR / 2));
    drawLine(graph, -heightLine, (canvasR), heightLine, (canvasR));
    drawLine(graph, -heightLine, (canvasR / 2), heightLine, (canvasR / 2));
    drawLine(graph, -heightLine, -(canvasR * 2), heightLine, -(canvasR * 2));
    drawLine(graph, -heightLine, -(canvasR * 1.5), heightLine, -(canvasR * 1.5));
    drawLine(graph, -heightLine, (canvasR * 2), heightLine, (canvasR * 2));
    drawLine(graph, -heightLine, (canvasR * 1.5), heightLine, (canvasR * 1.5));
    
    //draw arrows
    drawLine(graph, metrik, 0, metrik * 0.9, -heightLine * 2);
    drawLine(graph, metrik, 0, metrik * 0.9, heightLine * 2);
    drawLine(graph, 0, -metrik, heightLine * 2, -metrik * 0.9);
    drawLine(graph, 0, -metrik, -heightLine * 2, -metrik * 0.9);
    
    graph.beginPath();
    graph.font = "16px Arial blod";
    fillText(graph, "x", (metrik * 0.9), -heightLine * 3);
    fillText(graph, "y", heightLine * 3, -(metrik * 0.9));
    
    fillText(graph, "-R", -(canvasR), heightLine * 4);
    fillText(graph, "-R/2", -(canvasR / 2), heightLine * 4);
    fillText(graph, "R", (canvasR), heightLine * 4);
    fillText(graph, "R/2", (canvasR / 2), heightLine * 4);
    
    fillText(graph, "R", -heightLine * 6, -(canvasR));
    fillText(graph, "R/2", -heightLine * 6, -(canvasR / 2));
    fillText(graph, "-R", -heightLine * 6, (canvasR));
    fillText(graph, "-R/2", -heightLine * 6, (canvasR / 2));

    // draw rectangle
    graph.beginPath();
    graph.globalAlpha = 0.3;
    graph.fillStyle = "blue";
    graph.fillRect(0, 0, -canvasR, canvasR/2);
    
    // draw sphere
    graph.arc(0, 0, canvasR / 2, 0, Math.PI/2);
    graph.lineWidth = 0;
    graph.fill();
    graph.stroke();
    
    graph.beginPath();
    graph.moveTo(0, 0);
    graph.lineTo(canvasR / 2, 0);
    graph.lineTo(0, canvasR / 2);
    graph.fill();

    // draw triangle
    graph.beginPath();
    graph.moveTo(0, 0);
    graph.lineTo(canvasR, 0);
    graph.lineTo(0, -(canvasR) / 2);
    graph.fill();

    graph.globalAlpha = 0.5;
    drawDots();
}

function convertXToCanvasCoordinate(x, r) {
    return (x / r * canvasR);
}

function convertYToCanvasCoordinate(y, r) {
    return (-y / r * canvasR);
}

function drawDots() {
    let dots = document.getElementById("results").tBodies[0];
    r = document.getElementById("form:input_r").value;
    for (let i = 0; i < dots.rows.length; i++) {
        let dot = dots.rows.item(i).cells;
        const x = convertXToCanvasCoordinate(dot.item(0).innerHTML, r);
        const y = convertYToCanvasCoordinate(dot.item(1).innerHTML, r);
        if (dot.item(3).innerHTML === "true") {
            graph.fillStyle = "#7CFC00";
            graph.strokeStyle = "#7CFC00";
        } else {
            graph.fillStyle = "#FF0000";
            graph.strokeStyle = "#FF0000";
        }    
        graph.beginPath();
        graph.arc(x, y, heightLine, 0, Math.PI * 2);
        graph.fill();
    }
}

function drawDot(x, y){
    x = convertXToCanvasCoordinate(x, r);
    y = convertYToCanvasCoordinate(y, r);
    graph.fillStyle = "#ffae00";
    graph.strokeStyle = "#ffae00";
    graph.beginPath();
    graph.arc(x, y, heightLine, 0, Math.PI * 2);
    graph.fill();
}

function setOnMouseMove() {
    graphCanvas.onmousemove = (e) => {
        drawGraph();
        graph.fillStyle = "#00BFFF";
        graph.strokeStyle = "#00BFFF";
        graph.beginPath();
        graph.arc(e.offsetX - metrik, e.offsetY - metrik, heightLine, 0, Math.PI*2);
        graph.fill();
    };

    graphCanvas.onmouseleave = (e) => {
        drawGraph();
    };

    graphCanvas.onmousedown = function(event) {
        document.getElementById('warning').innerHTML = "";
    
        let r = parseFloat(document.getElementById("form:input_r").value);
        let x = Math.round(convertXToRadiusOf(event.offsetX, r)*1000)/1000;
        let y = Math.round(convertYToRadiusOf(event.offsetY, r)*1000)/1000;

        drawDot(x, y);

        document.getElementById('form:input_x').value = x;
        document.getElementById("x_label").innerHTML = "X: " + x;
        document.getElementById("r_label").innerHTML = "R: " + r;
        document.getElementById("form:input_y").value = y;
        changeValueForY();
        document.getElementById('form:submit').click();//TODO
    };
}

function initialilzeGraph() {
    graph.translate(metrik, metrik);
    drawGraph();
    setOnMouseMove();
}

function setColors(colorGraph, colorPoint) {
    graphColor = colorGraph;
    graphPointColor = colorPoint;
    drawGraph();
}

function changeValueForR(value) {
    event.preventDefault();
    r = value;
    document.getElementById('form:input_r').value = value;
    document.cookie = "r=" + r;
    document.getElementById("r_label").innerHTML = "R: " + r;
    drawGraph();

}

function changeValueForY() {
    console.log("hi")
    let input = document.getElementById("form:input_y");
    y = input.value.replace("\,", ".");
    document.getElementById("y_label").innerHTML = "Y: " + y;
    document.cookie = "y=" + y;
    if (isNaN(y)) {
        exception("Заполните значение y")
        input.value = "";
        document.getElementById("y_label").innerHTML = "Y from -5 to 5";
        document.cookie = "y=";
        return null;
    } else {
        let input_string = input.value.replace(/,/, ".")
        if (input_string > -3 && input_string < 5) {
            if (/(-)?([,.])$/i.test(input.value)) { //TODO
                exception("Неправльное значение y")
                input.value = "";
                document.getElementById("y_label").innerHTML = "Y: ";
                document.cookie = "y=";
                return null;
            } else {
                y = input.value.replace("\,", ".");
                document.cookie = "y=" + y;
                document.getElementById("y_label").innerHTML = "Y: " + y;
                document.getElementById("form:input_y").value = y;
            }
        } else if (/(-)?([,.])$/i.test(input.value)) { //TODO
            exception("Неправльное значение y")
            input.value = "";
            document.getElementById("y_label").innerHTML = "Y: ";
            document.cookie = "y=";
            return null;
        } else {
            exception("Неправльное значение y, должно быть в пределах (-5, 5)")
            input.value = "";
            document.getElementById("y_label").innerHTML = "Y: ";
            document.cookie = "y=";
            return null;
        }
    }
}



function exception(exception_value){
    document.getElementById("warning").innerHTML = exception_value;
}

function changeValueForX(value) {
    event.preventDefault();
    x = value;
    document.getElementById("x_label").innerHTML = "X: " + x;
    document.getElementById('form:input_x').value = value;
    document.cookie = "x=" + x;
}

function changeValueForNothing() {
    console.log("changed...");
}

toggleSwitch.addEventListener('change', switchTheme, false);
document.getElementById("form").onsubmit = validateForm;

window.onload = function () {

    checkTheme();


    initialilzeGraph();
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let params = cookies[i].split("=");
        let name = params[0].trim();
        if (name === "x" && x_flag) {
            let value = Number(params[1]);
            if(!isNaN(value)) {
                x_flag = false
                x = value;
                document.getElementById('form:input_x').value = x;
                document.getElementById("x_label").innerHTML = "X: " + x;
            }
        }
        if (name === "r" && r_flag) {
            let value = Number(params[1]);
            if(!isNaN(value)) {
                r_flag = false
                r = value;
                document.getElementById("form:input_r").value = r;
                document.getElementById("r_label").innerHTML = "R: " + r;
            }
        }
        if (name === "y" && y_flag) {
            let value = Number(params[1]);
            if(value == ""){
                y_flag = false
                y = null;
                document.getElementById("y_label").innerHTML = "Y from -5 to 5";
                document.getElementById("form:input_y").value = "";
            }
            if(!isNaN(value) && value !== "") {
                y_flag = false
                y = value;
                document.getElementById("y_label").innerHTML = "Y: " + y;
                document.getElementById("form:input_y").value = y;
            }
        }
        drawGraph()
    }
}