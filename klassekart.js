const testClass = ["Åmund", "Erik", "Jon", "Sven", "Magnus", "Mikkel", "Anders", "Kåre", "Pål", "Kjell", "Bonsa"];

function generateClassroom(arr) {

    //   Henter strukturen klassekartet skal genereres på
    let perTable = parseInt(document.getElementById("perTable").value);
    let rows = parseInt(document.getElementById("rows").value);
    let columns = parseInt(document.getElementById("columns").value);

    document.getElementById("cr").innerHTML = "";
    let studentsArr = arr.slice(0);
    if (studentsArr.length % 2 === 1) {
        studentsArr.push(".");
    }
    studentsArr = shuffleStudents(studentsArr);
    let studentID = 0;
    // Lager flexbox-struktur

    // Først radene
    for (let i = 0; i < rows; i++) {
        let divRow = document.createElement("div");
        divRow.classList.add("row");
        divRow.id = "row" + i;
        document.getElementById("cr").appendChild(divRow);
        // Så pultene
        for (let j = 0; j < columns; j++) {
            let divTable = document.createElement("div");
            divTable.classList.add("table");
            divTable.id = "r" + i + "c" + j;
            document.getElementById("row" + i).appendChild(divTable);
            // Så elevene
            if (perTable === 1) {
                document.getElementById("r" + i + "c" + j).innerHTML = picker(studentsArr,studentID);
                studentID++
            }
            else {
                for (let k = 0; k < perTable; k++) {
                    let divStudent = document.createElement("div");
                    divStudent.classList.add("student");
                    divStudent.id = "r" + i + "c" + j + "n" + k;
                    divStudent.innerHTML = picker(studentsArr,studentID);
                    studentID++
                    document.getElementById("r" + i + "c" + j).appendChild(divStudent);
                }
            }
        }
    }
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

function picker(arr,id) {
    picked = (arr[id] !== undefined ? arr[id] : ".");
    return picked;
}
