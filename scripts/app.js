let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let house = document.getElementById("house");
let email = document.getElementById("email");
let personalEmail = document.getElementById("personalEmail");
let summonBtn = document.getElementById("randomPeerBtn");
let historyList = document.getElementById("historyList");

let history = [];

function getData() {
    return fetch("../data/data.json")
        .then(res => res.json())
        .then(data => data.students);
}

function randomizeData(students) {
    let randomIndex = Math.floor(Math.random() * students.length);
    return students[randomIndex];
}

function updateHistory(randomStudent) {
    history.unshift(randomStudent);

    if (history.length > 5) {
        history.pop();
    }

    historyList.innerHTML = "";

    history.forEach(student => {
        let li = document.createElement("li");
        li.innerText = `${student.firstName} ${student.lastName} - ${student.role} - ${student.email}`;
        historyList.appendChild(li);
    });
}

summonBtn.addEventListener("click", () => {
    getData().then((students) => {
        let randomStudent = randomizeData(students);

        firstName.innerText = randomStudent.firstName;
        lastName.innerText = randomStudent.lastName;
        house.innerText = randomStudent.role;

        email.innerText = randomStudent.email;
        personalEmail.innerText = randomStudent.personalEmail;

        updateHistory(randomStudent);
    });
});
