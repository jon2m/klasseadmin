const testClass = ["Åmund", "Erik", "Jon", "Sven", "Magnus", "Mikkel", "Anders", "Kåre", "Pål", "Kjell", "Bonsa"];

function generateClassroom(arr) {
    document.getElementById("cr").innerHTML = "";
    let studentsArr = arr.slice(0);
    if (studentsArr.length % 2 === 1) {
        studentsArr.push(".");
    }
    studentsArr = shuffleStudents(studentsArr);
    studentID = 0;
    for (let i = 0; i < 5; i++) {
        let divRow = document.createElement("div");
        divRow.classList.add("row");
        divRow.id = "row" + i;
        document.getElementById("cr").appendChild(divRow);
        for (let j = 0; j < 4; j++) {
            var divPair = document.createElement("div");
            divPair.classList.add("pair");
            divPair.id = "r" + i + "c" + j;
            document.getElementById("row" + i).appendChild(divPair);
            for (let k = 0; k < 2; k++) {
                let divStudent = document.createElement("div");
                divStudent.classList.add("student");
                divStudent.id = "r" + i + "c" + j + "n" + k;
                student = (studentsArr[studentID] !== undefined ? studentsArr[studentID] : ".");
                divStudent.innerHTML = student;
                studentID++
                document.getElementById("r" + i + "c" + j).appendChild(divStudent);
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
