var loggedUser = "";

var actualUsername = localStorage;
var actualIdUser = localStorage;

var users = [
    { "ID": 1, "firstName": "Veronica", "lastName": "Gutierrez", "phone": "8557-7823", "username": "vgutierrez", "password": "123" },
    { "ID": 2, "firstName": "Bladimir", "lastName": "Arroyo", "phone": "8875-1861", "username": "barroyo", "password": "123" }
];



/*let userSettings = [
    { "userID": '1', fullName: 'Veronica Gutierrez', speedAverage: '60 km/h', aboutMe: 'Something about me goes here' },
    { "userID": '2', fullName: 'Bladimir Arroyo', speedAverage: '80 km/h', aboutMe: 'Something about me goes here' }
];*/

let rides = [
    {
        "ID": 1, "rideName": "Brete", "startFrom": "Barrio Los Angeles, Ciudad Quesada", "end": "Mercado Municipal, Ciudad Quesada",
        "description": "This is my everyday ride, from Barrio Los Angeles to my job office in Second Floor of Coopeservidores Building",
        "departure": "6:45 AM", "estimatedArrival": "7:05 AM", "userID": '1'
    },

    {
        "ID": 2, "rideName": 'Aeropuerto', "startFrom": 'Barrio San Antonio, Ciudad Quesada', "end": 'AIJS, Alajuela',
        "description": 'This a ride from Ciudad Quesada to Juan Santamaria International Airport',
        "departure": '8:00 AM', "estimatedArrival": '10:00 AM', "userID": '1'
    },

    {
        "ID": 3, "rideName": 'Aeropuerto', "startFrom": 'Terminal de Buses, Ciudad Quesada', "end": 'AIJS, Alajuela',
        "description": 'This a ride from Ciudad Quesada to Juan Santamaria International Airport',
        "departure": '12:00 MD', "estimatedArrival": '02:00 PM', "userID": '2'
    },

    {
        "ID": 4, "rideName": 'Brete', "startFrom": 'Barrio Los Angeles, Ciudad Quesada', "end": 'Parque Municipal, Ciudad Quesada',
        "description": 'This is my everyday ride, from Barrio Los Angeles to my job office in Municipalidad San Carlos',
        "departure": '06:30 AM', "estimatedArrival": '06:45 am', "userID": '2'
    }
];



function loadEvents() {
    // bind the click event to login button
    jQuery('#login-button').bind('click', function (element) {
        validateLogIn();
    });

    jQuery('#register-button').bind('click', function (element) {
        registerUser();
    });
    /*
            // bind the click event to all edit buttons
            for(let i = 0; i < document.getElementsByClassName('edit-button').length; i++){
              button = document.getElementsByClassName('edit-button')[i];
              button.addEventListener('click', function(e){
                editBook(e.currentTarget.dataset.bookid);
              })
            };
      
            // bind the click event to all delete buttons
            for(let i = 0; i < document.getElementsByClassName('delete-button').length; i++){
              button = document.getElementsByClassName('edit-button')[i];
              button.addEventListener('click', function(e){
                deleteBook(e.currentTarget.dataset.bookid);
              })
            };
      
            // bind the click event to the add book button
            document.getElementById('add-book-button').addEventListener('click', function(){
              const bookName = document.getElementById('title').value;
              bookId += 1;
      
              const book = {
                id: bookId,
                name: bookName,
                author: 'Tolkien'
              }
              let books = JSON.parse(localStorage.getItem("books"));
              if(!books) {
                books = [];
              }
              books.push(book);
              localStorage.setItem("books", JSON.stringify(books));
              localStorage.setItem('bookId', bookId);
              loadBooks();
              clearFields();
            });*/
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
    $(".tblMyRides").append('<tr><th>Name</th>' +
        '<th>Start</th>' +
        '<th>End</th>' +
        '<th>Actions</th><tr>');
    for (var i = 0; i < rides.length; i++) {
        if (rides[i].userID == localStorage.getItem("ID")) {
            $(".tblMyRides").append(
                '<tr>' +
                '<td>' + rides[i].rideName + '</td>' +
                '<td>' + rides[i].startFrom + '</td>' +
                '<td>' + rides[i].end + '</td>' +
                '<td><a href="EditRide.html">Edit</a> - <a href="">Delete</a></td>' +
                '</tr>'
            );
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
    
    var user = { "ID": users.length + 1, "firstName": firstName, "lastName": lastName, "phone": phone, "username": username, "password": password };
    users.push(user);
    
    window.localStorage.setItem('users', JSON.stringify(users));
    
    window.alert('Register Successfully. Welcome to Tico Rides');
    window.location.href = "RegisterUser.html";
}

/*
 function create(data) {
    this.#data.push(data);
    return this.#data.lenght;
}

function read(id) {
    return this.#data[id];
}

function readAll() {
    return this.#data;
}

function update(id, data) {
    this.#data[id] = data;
    return true;
}

function deleteRide (id) {
    this.#data.splice(id, 1);
    return true;
}

*/


loadEvents();
loadUser();
createTableRidesperUser();

