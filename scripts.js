// don't forget to add as a module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, get, set, ref, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAqFWPyZVYy1lCboqQcKj7LpyjyjOY9TAI",
    authDomain: "swis-4333b.firebaseapp.com",
    databaseURL: "https://swis-4333b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "swis-4333b",
    storageBucket: "swis-4333b.appspot.com",
    messagingSenderId: "749781434804",
    appId: "1:749781434804:web:00e7ca2cf21376dd0032e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

const connectedRef = ref(db, ".info/connected");
onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
        console.log("connected");
    } else {
        console.log("not connected");
    }
});

// Slider
const slider = document.getElementById('slider');
slider.addEventListener("click", () => {
    document.getElementById('speed').textContent = slider.value;
    var sliderValue = slider.value;
    writeModeData();
});

// User Config
const temperature = ref(db, 'temperature');
const moisture = ref(db, 'moisture_percentage');
const humidity = ref(db, 'humidity');
const mode = ref(db, 'write/mode');

// Read values
onValue(temperature, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    const dataContainer = document.getElementById('temperature');
    dataContainer.innerHTML = JSON.stringify(Number(data), null, 2);
});
onValue(moisture, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    const dataContainer = document.getElementById('moisture');
    dataContainer.innerHTML = JSON.stringify(Number(data), null, 2);
});
onValue(humidity, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    const dataContainer = document.getElementById('humidity');
    dataContainer.innerHTML = JSON.stringify(Number(data), null, 2);
});
onValue(mode, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    const dataContainer = document.getElementById('speed');
    dataContainer.innerHTML = JSON.stringify(Number(data), null, 2);
    slider.value = data;
});

// Write values
function writeModeData() {
    var speed = slider.value
    const db = getDatabase();
    set(ref(db, '/write'), {
        mode : speed
    });
    console.log("successfully written")
};




