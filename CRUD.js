var loggedUser = "";

var actualUsername = localStorage;
var actualIdUser = localStorage;

/*This code was created just for charge data for the first time
var users = [
    { "ID": 1, "firstName": "Veronica", "lastName": "Gutierrez", "phone": "8557-7823", "username": "vgutierrez", "password": "123" },
    { "ID": 2, "firstName": "Bladimir", "lastName": "Arroyo", "phone": "8875-1861", "username": "barroyo", "password": "123" }
];*/

/*This code was created just for charge data for the first time
var userSettings = [
    { "userID": '1', fullName: 'Veronica Gutierrez', speedAverage: '60 km/h', aboutMe: 'Something about me goes here' },
    { "userID": '2', fullName: 'Bladimir Arroyo', speedAverage: '80 km/h', aboutMe: 'Something about me goes here' }
];*/

//This code was created just for charge data for the first time
var rides = [
    {
        "ID": 1, "rideName": "Brete", "startFrom": "Barrio Los Angeles, Ciudad Quesada", "end": "Mercado Municipal, Ciudad Quesada",
        "description": "This is my everyday ride, from Barrio Los Angeles to my job office in Second Floor of Coopeservidores Building",
        "departure": "6:45 AM", "estimatedArrival": "7:05 AM", "username": 'vgutierrez', "days": ["Monday", "Tuesday"]
    },

    {
        "ID": 2, "rideName": 'Aeropuerto', "startFrom": 'Barrio San Antonio, Ciudad Quesada', "end": 'AIJS, Alajuela',
        "description": 'This a ride from Ciudad Quesada to Juan Santamaria International Airport',
        "departure": '8:00 AM', "estimatedArrival": '10:00 AM', "username": 'vgutierrez',"days": ["Thursday", "Friday"]
    },

    {
        "ID": 3, "rideName": 'Aeropuerto', "startFrom": 'Terminal de Buses, Ciudad Quesada', "end": 'AIJS, Alajuela',
        "description": 'This a ride from Ciudad Quesada to Juan Santamaria International Airport',
        "departure": '12:00 MD', "estimatedArrival": '02:00 PM', "username": 'barroyo', "days": ["Saturday"]
    },

    {
        "ID": 4, "rideName": 'Brete', "startFrom": 'Barrio Los Angeles, Ciudad Quesada', "end": 'Parque Municipal, Ciudad Quesada',
        "description": 'This is my everyday ride, from Barrio Los Angeles to my job office in Municipalidad San Carlos',
        "departure": '06:30 AM', "estimatedArrival": '06:45 am', "username": 'barroyo', "days": ["Monday","Tuesday", "Wednesday", "Thursday", "Friday"]
    }
];

function loadEvents() {
    // bind the click event to login button
    jQuery('#login-button').bind('click', function (element) {
        element.preventDefault();
        validateLogIn();
    });

    jQuery('#register-button').bind('click', function (element) {
        element.preventDefault();
        registerUser();
    });

    jQuery('#searchButton').bind('click', function (element) {
        element.preventDefault();
        createGeneralTable();
    });

    jQuery('#btnSave').bind('click', function (element) {
        element.preventDefault();
        modifyUserSettings();
    });

    jQuery('#btnAddRide').bind('click', function (element) {
        element.preventDefault();
        createRide();
    });

}

function validateLogIn() {
    var inUsername = document.getElementById('username').value;
    var inPassword = document.getElementById('password').value;

    let usersCopy = JSON.parse(localStorage.getItem('users'));

    if (usersCopy.find(e => e.username == inUsername)) {
        for (var i = 0; i < usersCopy.length; i++) {

            if (inUsername == usersCopy[i].username) {
                if (inPassword == usersCopy[i].password) {
                    loggedUser = usersCopy[i];
                    actualUsername = localStorage.setItem("username", usersCopy[i].username);
                    actualIdUser = localStorage.setItem("ID", usersCopy[i].ID);
                    window.alert('Login Successfully. Welcome ' + loggedUser.firstName);
                    window.location.replace("Dashboard.html");
                } else {
                    window.alert('Username or Password incorrect, try again');
                    window.location.href = "AuthenticationPage.html";
                }
            }
        }
    } else {
        window.alert('Username does not exist, try again');
    }
}

function loadUser() {
    var actualUser = document.querySelector("#user");
    actualUser.innerHTML = localStorage.getItem("username");
}

function createTableRidesperUser() {
    localStorage.setItem('rides',JSON.stringify(rides))
    var ridesCopy = JSON.parse(localStorage.getItem("rides"));
    $(".tblMyRides").append('<tr><th>Name</th>' +
        '<th>Start</th>' +
        '<th>End</th>' +
        '<th>Actions</th><tr>');
    for (var i = 0; i < ridesCopy.length; i++) {
        if (ridesCopy[i].username == localStorage.getItem("username")) {
            $(".tblMyRides").append(
                '<tr>' +
                '<td>' + ridesCopy[i].rideName + '</td>' +
                '<td>' + ridesCopy[i].startFrom + '</td>' +
                '<td>' + ridesCopy[i].end + '</td>' +
                '<td><a href="EditRide.html">Edit</a> - <a href="">Delete</a></td>' +
                '</tr>'
            );
        }
    }
}

function createGeneralTable() {
    var ridesCopy = JSON.parse(localStorage.getItem("rides"));

    var start = document.getElementById('from').value;
    var end = document.getElementById('to').value;
    var rowCount = document.getElementById("tblAllRides").length;
    var table = document.getElementById("tblAllRides");
    var tableHeader = $(".ridesTable").append('<tr><th>User</th>' +
        '<th>Start</th>' +
        '<th>End</th>' +
        '<th></th><tr>');

    if (rowCount > 1) {
        for (var i = 0; i >= rowCount; i++) {
            table.deleteRow(i);
        }
        tableHeader;
        for (var i = 0; i < ridesCopy.length; i++) {
            if (ridesCopy[i].startFrom == start) {
                if (ridesCopy[i].end == end) {
                    $(".ridesTable").append(
                        '<tr>' +
                        '<td>' + ridesCopy[i].username + '</td>' +
                        '<td>' + ridesCopy[i].startFrom + '</td>' +
                        '<td>' + ridesCopy[i].end + '</td>' +
                        '<td><a href="ViewRide.html">View</a></td>' +
                        '</tr>'
                    );
                }
            }
        }
    } else {
        tableHeader;
        for (var i = 0; i < ridesCopy.length; i++) {
            if (ridesCopy[i].startFrom == start) {
                if (ridesCopy[i].end == end) {
                    $(".ridesTable").append(
                        '<tr>' +
                        '<td>' + ridesCopy[i].username + '</td>' +
                        '<td>' + ridesCopy[i].startFrom + '</td>' +
                        '<td>' + ridesCopy[i].end + '</td>' +
                        '<td><a href="ViewRide.html">View</a></td>' +
                        '</tr>'
                    );
                }
            }
        }

    }

}


function logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('ID');
    window.location.replace = "AuthenticationPage.html";
}


function registerUser() {
    const form = document.getElementById('registerUserForm');
    const fFirstname = form.elements['firstname'];
    const fLastname = form.elements['lastname'];
    const fPhone = form.elements['phone'];
    const fUsername = form.elements['username'];
    const fPassword = form.elements['password'];

    var firstName = fFirstname.value;
    var lastName = fLastname.value;
    var phone = fPhone.value;
    var username = fUsername.value;
    var password = fPassword.value;

    var usersCopy = JSON.parse(localStorage.getItem("users"));

    var user = { "ID": usersCopy.length + 1, "firstName": firstName, "lastName": lastName, "phone": phone, "username": username, "password": password };
    usersCopy.push(user);

    window.localStorage.setItem('users', JSON.stringify(usersCopy));


    window.alert('Register Successfully. Welcome to Tico Rides');
    window.location.href = "RegisterUser.html";
}

function fillOutSettingsForm() {

    var dbSettings = JSON.parse(localStorage.getItem('userSettings'));
    var resultado = dbSettings.find(e => e.userID == JSON.parse(localStorage.getItem('ID')));
    document.getElementById('fullname').value = resultado.fullName;
    document.getElementById('speedaverage').value = resultado.speedAverage;
    document.getElementById('aboutme').value = resultado.aboutMe;
}


function modifyUserSettings() {
    var dbUserSettings = JSON.parse(localStorage.getItem("userSettings"));

    var inFullName = document.getElementById('fullname').value;
    var inSpeedAverage = document.getElementById('speedaverage').value;
    var inAboutMe = document.getElementById('aboutme').value;

    var objIndex = dbUserSettings.findIndex((obj => obj.userID == JSON.parse(localStorage.getItem('ID'))));

    dbUserSettings[objIndex].fullName = inFullName;
    dbUserSettings[objIndex].speedAverage = inSpeedAverage;
    dbUserSettings[objIndex].aboutMe = inAboutMe;

    localStorage.setItem('userSettings', JSON.stringify(dbUserSettings));
    window.alert("Settings updated correctly");
    window.location.href = "Dashboard.html";
}

function createRide() {
    var ridesCopy = JSON.parse(localStorage.getItem("rides"));

    var inRideName = document.getElementById('ridename').value;
    var inStartFrom = document.getElementById('rideStartfrom').value;
    var inRideEnd = document.getElementById('rideEnd').value;
    var inDescription = document.getElementById('description').value;
    var inDeparture = document.getElementById('departure').value;
    var inArrival = document.getElementById('arrival').value;
    var daysArray = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    var username = localStorage.getItem('username');

    for (var i = 0; i < checkboxes.length; i++) {
        daysArray.push(checkboxes[i].value)
    }

    ride = {
        "ID": ridesCopy.length + 1, "rideName": inRideName, "startFrom": inStartFrom, "end": inRideEnd, "description": inDescription,
        "departure": inDeparture, "estimatedArrival": inArrival, "username": username, "days": daysArray
    };

    localStorage.setItem('rides', JSON.stringify(ride));
    window.alert("Ride add correctly");
}


//loadUser();
createTableRidesperUser();
//fillOutSettingsForm();
loadEvents();

