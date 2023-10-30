const url = "https://localhost:7293/api/Exercise";
let myExercises = [];

function handleOnLoad() {
    let html = `
    <h1>Welcome to TideFit</h1>
    <div id="tableBody" class="fade-in"></div>
    <form class="exercise-form" onsubmit="return false;" method="post">
        <input type="text" id="activityType" placeholder="Activity Type" required>
        <input type="text" id="distanceInMiles" placeholder="Distance In Miles" required>
        <input type="text" id="dateCompleted" placeholder="Date Completed" required>
        <button id="add-btn" onclick="handleExerciseAdd()">Add Exercise</button>
    </form>`;
    document.getElementById("app").innerHTML = html;
    populateTable();
}

async function populateTable() {
    await getAllExercises();
    myExercises.sort((a, b) => new Date(b.dateCompleted) - new Date(a.dateCompleted));
    let html = `
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Activity Type</th>
                <th>Distance In Miles</th>
                <th>Date Completed</th>
                <th>Pinned</th>
                <th>Actions</th>
            </tr>
        </thead>`;

    myExercises.forEach(function (exercise) {
        if (!exercise.deleted) {
            html += `
                <tr id="exercise-${exercise.id}">
                <td>${exercise.activityType}</td>
                <td>${exercise.distanceInMiles} Miles</td>
                <td>${exercise.dateCompleted}</td>
                <td>${exercise.pinned ? "Yes" : "No"}</td>
                <td>
                    <button id="delete-btn" onclick="handleExerciseDelete('${exercise.id}')">Delete</button>
                    <button id="pin-btn" onclick="handleExercisePin('${exercise.id}')">${exercise.pinned ? "Unpin" : "Pin"}</button>
                </td>
            </tr>`;
        }
    });

    html += `</table>`;
    document.getElementById("tableBody").innerHTML = html;
}

async function handleExerciseAdd() {
    let exercise = {
        activityType: document.getElementById("activityType").value,
        distanceInMiles: parseInt(document.getElementById("distanceInMiles").value),
        dateCompleted: document.getElementById("dateCompleted").value,
        pinned: false,
        deleted: false
    };
    await saveExercise(exercise);
    myExercises.push(exercise);
    populateTable();

    document.getElementById("activityType").value = "";
    document.getElementById("distanceInMiles").value = "";
    document.getElementById("dateCompleted").value = "";
}


async function getAllExercises() {
    let response = await fetch(url);
    myExercises = await response.json();
    console.log("myExercises:", myExercises);
}

async function saveExercise(exercise) {
    console.log("I am saving", exercise);
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(exercise),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    });
}

async function handleExercisePin(id) {
    let exercise = myExercises[id];
    console.log("I am saving",id, exercise);
    await fetch (url + "/" + id, {
        method: "PUT",
        body: JSON.stringify(exercise),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    });
    populateTable();
}

async function handleExerciseDelete(id) {
    console.log("Delete Button", id);    
    await fetch(url + "/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    });
    populateTable();
}

