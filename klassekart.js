const testClass = ["Åmund", "Kristoffer", "Karl Elias", "Erik", "Jon", "Sven", "Magnus", "Mikkel", "Anders", "Kåre", "Pål", "Kjell", "Bonsa", "Ramapatrikunasitata"];
var sleepVar = false;

function newClassroom() {
    //   Henter strukturen klassekartet skal genereres på
    let perTable = parseInt(document.getElementById("perTable").value);
    let rows = parseInt(document.getElementById("rows").value);
    let columns = parseInt(document.getElementById("columns").value);

    if (rows * columns * perTable < testClass.length + (testClass.length % 2 === 0 ? 0 : 1)) {
        alert("Klasserommet er for lite i forhold til antall elever.")
    }
    else {
        // Kaller funksjonen
        generateClassroom(testClass, perTable, rows, columns);
    }
}

async function generateClassroom(arr, perTable, rows, columns) {
    // Fjerner forrige klassekart
    document.getElementById("cr").style.opacity = "0";
    if (sleepVar) {
        await new Promise(r => setTimeout(r, 2000));
    }
    document.getElementById("cr").innerHTML = "";
    // Kopierer klasselista
    let studentsArr = arr.slice(0);
    // Gjør at eleven som må sitte alene er tilfeldig plassert
    if (studentsArr.length % 2 === 1) {
        studentsArr.push(".");
    }
    // Stokker elevene
    studentsArr = shuffleStudents(studentsArr);
    // Løpetall for elevene
    let studentID = 0;
    // Lager flexbox-struktur og setter inn elevene
    // Først radene
    for (let i = 0; i < rows; i++) {
        let divRow = document.createElement("div");
        divRow.classList.add("row");
        divRow.id = "row" + i;
        document.getElementById("cr").appendChild(divRow);
        // Så pultene...
        for (let j = 0; j < columns; j++) {
            let divTable = document.createElement("div");
            divTable.classList.add("table");
            divTable.id = "r" + i + "c" + j;
            divTable.style.maxWidth = (perTable === 1 ? "200px" : "300px");
            document.getElementById("row" + i).appendChild(divTable);
            // Så elevene...
            for (let k = 0; k < perTable; k++) {
                let btnStudent = document.createElement("button");
                btnStudent.classList.add("student");
                btnStudent.id = "r" + i + "c" + j + "n" + k;
                studentName = picker(studentsArr, studentID);
                btnStudent.innerHTML = studentName;
                data-toggle="tooltip"
                btnStudent.title = "" + studentName;
                btnStudent.dataToggle = "tooltip";
                btnStudent.addEventListener("click", switchPlace);
                studentID++
                btnStudent.style.width = (perTable === 1 ? "100%" : "50%");
                document.getElementById("r" + i + "c" + j).appendChild(btnStudent);
            }
        }
    }
    document.getElementById("cr").style.opacity = "1";
    sleepVar = true;
}
// Durstenfelds sorteringsalgoritme
function shuffleStudents(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
// Henter ut elev
function picker(arr, id) {
    picked = (arr[id] !== undefined ? arr[id] : ".");
    return picked;
}

var clicks = 0;
var tempID;

function switchPlace(evt) {
    if (clicks === 1) {
        let content1 = evt.target.innerHTML;
        let content2 = document.getElementById(firstElementID).innerHTML;
        document.getElementById(firstElementID).innerHTML = content1;
        document.getElementById(firstElementID).style.backgroundColor = "";
        evt.target.innerHTML = content2;
        clicks--;
    }
    else {
        firstElementID = evt.target.id;
        document.getElementById(firstElementID).style.backgroundColor = "lime";
        clicks++
    }
}