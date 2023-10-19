let myExercises = JSON.parse(localStorage.getItem("myExercises")) ? JSON.parse(localStorage.getItem("myExercises")) : [];


function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function handleOnLoad() {
    console.log(myExercises);
    let html = `
    <h1>Welcome to TideFit</h1>
    <div id="tableBody" class="fade-in"></div>
    <form class="exercise-form" action="" method="post">
        <input type="text" id="activityType" placeholder="Activity Type" required>
        <input type="text" id="distanceInMiles" placeholder="Distance In Miles" required>
        <input type="text" id="dateCompleted" placeholder="Date Completed" required>
        <button id="add-btn" onclick="handleExerciseAdd()">Add Exercise</button>
    </form>`;
    document.getElementById("app").innerHTML = html;
    populateTable();

}

function populateTable() {
    myExercises.sort((a,b) => new Date(b.DateCompleted) - new Date(a.DateCompleted));
    
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

    myExercises.forEach(function(exercise) {
        if( !exercise.Deleted) {
            html += `
            <tr id="exercise-${exercise.GUID}">
                <td>${exercise.ActivityType}</td>
                <td>${exercise.DistanceInMiles} Miles</td>
                <td>${exercise.DateCompleted}</td>
                <td>${exercise.Pinned ? "Yes" : "No"}</td>
                <td>
                    <button id="delete-btn" onclick="handleExerciseDelete('${exercise.GUID}')">Delete</button>
                    <button id="pin-btn" onclick="handleExercisePin('${exercise.GUID}')">${exercise.Pinned ? "Unpin" : "Pin"}</button>
                </td>
            </tr>`;
        }
    });
    
    html += `</table>`;
    document.getElementById("tableBody").innerHTML = html;
}

function handleExerciseAdd() {
    let exercise = {
        GUID: generateGUID(),
        ActivityType: document.getElementById("activityType").value,
        DistanceInMiles: document.getElementById("distanceInMiles").value,
        DateCompleted: document.getElementById("dateCompleted").value,
        Pinned: false,
        Deleted: false
    };

    myExercises.push(exercise);
    localStorage.setItem("myExercises", JSON.stringify(myExercises));
    populateTable();
}

function handleExerciseDelete(GUID) {
    let index = myExercises.findIndex(exercise => exercise.GUID === GUID);
    if (index !== -1) {
        myExercises[index].Deleted = true;
        localStorage.setItem("myExercises", JSON.stringify(myExercises));
        populateTable();
    }
}


function handleExercisePin(GUID) {
    let index = myExercises.findIndex(exercise => exercise.GUID === GUID);
    if (index !== -1) {
        myExercises[index].Pinned = !myExercises[index].Pinned;
        localStorage.setItem("myExercises", JSON.stringify(myExercises));
        populateTable();
    }
}