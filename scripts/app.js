let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let house = document.getElementById("house");
let email = document.getElementById("email");
let personalEmail = document.getElementById("personalEmail");
let randomPeerBtn = document.getElementById("randomPeerBtn");
let historyList = document.getElementById("historyList");

let history = []; 
let currentStudent = null; 

function getData() {
    return fetch("../data/data.json")
        .then(res => res.json())
        .then(data => data.students)
        .catch(err => console.error("Error fetching data:", err));
}

function randomizeData(students) {
    let randomIndex = Math.floor(Math.random() * students.length);
    return students[randomIndex];
}
// made it so both emails are displayed in history
function updateHistory() {
    historyList.innerHTML = "";

    history.forEach(student => {
        let li = document.createElement("li");
        li.innerText = `${student.firstName} ${student.lastName} - ${student.role} - ${student.email} - ${student.personalEmail}`;
        historyList.appendChild(li);
    });
}

randomPeerBtn.addEventListener("click", () => {
    getData().then((students) => {
        let randomStudent = randomizeData(students);

        // fixed issue with history showing current peer in the previous 5.
        if (currentStudent) {
            history.unshift(currentStudent);
            if (history.length > 5) {
                history.pop(); 
            }
        }

        firstName.innerText = randomStudent.firstName;
        lastName.innerText = randomStudent.lastName;
        house.innerText = randomStudent.role;
        email.innerText = randomStudent.email;
        personalEmail.innerText = randomStudent.personalEmail;

        currentStudent = {
            firstName: randomStudent.firstName,
            lastName: randomStudent.lastName,
            role: randomStudent.role,
            email: randomStudent.email,
            personalEmail: randomStudent.personalEmail
        };

        updateHistory();
    });
});
