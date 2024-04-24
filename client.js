const request = new XMLHttpRequest();

function addUser() {
    let user = document.querySelector("#username").value

    request.open("POST", `http://127.0.0.1:3000/addUser/${user}`, true)
    request.send();

    console.log(user)
}

function getReservation(){
    let user = document.querySelector("#usernameRetrieve").value;
    request.open("GET", `http://127.0.0.1:3000/getReservation/${user}`, true)
    request.onload = function() {
        let data = JSON.parse(this.response);
        console.log(data.user);
        if (data.reservation != null){
            document.querySelector("#reservationInfoTable").innerHTML +=
            `<tr>
            <td>${data.user}</td>
            <td>${data.reservation.date}</td>
            <td>${data.reservation.time}</td>
            <td>${data.reservation.hours}</td>
            </tr>`
        } else {
            document.querySelector("#reservationInfoTable").innerHTML +=
            `<tr>
            <td>${data.user}</td>
            <td></td>
            <td></td>
            <td></td>
            </tr>`
        }
    }
    request.send();
}

function getAll(){
    request.open("GET", `http://127.0.0.1:3000/getAll`, true)
    request.onload = function() {
        let data = JSON.parse(this.response);
        console.log(data);
        data = sortByChronologicalOrder(data);
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.reservation != null){
                document.querySelector("#allReservationsTable").innerHTML +=
                `<tr>
                <td>${element.user}</td>
                <td>${element.reservation.date}</td>
                <td>${element.reservation.time}</td>
                <td>${element.reservation.hours}</td>
                </tr>`
            } else {
                document.querySelector("#allReservationsTable").innerHTML +=
                `<tr>
                <td>${element.user}</td>
                <td></td>
                <td></td>
                <td></td>
                </tr>`
            }
        }
        
    }
    request.send();
}

function sortByChronologicalOrder(reservations) {
    function compareReservations(a, b) {
        if (a.reservation == null || b.reservation == null){

        } else {
            const dateA = a.reservation.date + ' ' + a.reservation.time;
            const dateB = b.reservation.date + ' ' + b.reservation.time;
    
            const dateObjA = new Date(dateA);
            const dateObjB = new Date(dateB);
    
            if (dateObjA < dateObjB) {
                return -1;
            } else if (dateObjA > dateObjB) {
                return 1;
            } else {
                const timeA = parseInt(a.reservation.time.split(':')[0]) * 60 + parseInt(a.reservation.time.split(':')[1]);
                const timeB = parseInt(b.reservation.time.split(':')[0]) * 60 + parseInt(b.reservation.time.split(':')[1]);
    
                return timeA - timeB;
            }
        }
    }
    reservations.sort(compareReservations);

    return reservations;
}

function addReservation() {
    let user = document.querySelector("#usernameCreate").value
    let time = document.querySelector("#startDate").value
    let date = document.querySelector("#startTime").value
    let hours = document.querySelector("#hours").value

    request.open("POST", `http://127.0.0.1:3000/createReservation/${user}/${date}/${time}/${hours}`, true)
    //request.open("POST", `http://127.0.0.1:3000/createReservation/anais/18:49/2024-04-24/4`, true)
    request.send();

}

function updateReservation() {
    let user = document.querySelector("#usernameUpdate").value
    let time = document.querySelector("#startDateUpdate").value
    let date = document.querySelector("#startTimeUpdate").value
    let hours = document.querySelector("#hoursUpdate").value

    request.open("POST", `http://127.0.0.1:3000/createReservation/${user}/${date}/${time}/${hours}`, true)
    // request.open("PUT", `http://127.0.0.1:3000/updateReservation/anais/17:49/2024-04-24/4`, true)
    request.send();

}

function deleteReservation() {
    let user = document.querySelector("#usernameDelete").value
    request.open("DELETE", `http://127.0.0.1:3000/deleteReservation/${user}`, true)
    request.send();
}
