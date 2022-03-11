
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

var countDownDate = new Date("April 5, 2022 15:37:25 UTC").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  if (days <10) {
    days = "0" +days;
  }
  if (hours <10) {
    hours = "0" +hours;
  }
  if (minutes <10) {
    minutes = "0" +minutes;
  }
  if (seconds <10) {
    seconds = "0" +seconds;
  }

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
  document.getElementById("daysd").innerHTML = "d";
  document.getElementById("hoursh").innerHTML = "h";
  document.getElementById("minutesm").innerHTML = "m";
  document.getElementById("secondss").innerHTML = "s";
  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);


// lets go...

// lets set how fast the cars are going

const duration = 5;

// lets grab references to red car related things

const red = { 
  line: document.querySelector('#red-line'),
  car: document.querySelector('#red-car-container'),
  circle: document.querySelector('#red-circle'),
  smoke: document.querySelector('#red-car-smoke')
}

// lets grab references to blue car related things

const blue = { 
  line: document.querySelector('#blue-line'),
  car: document.querySelector('#blue-car-container'),
  circle: document.querySelector('#blue-circle'),
  smoke: document.querySelector('#blue-car-smoke')
}

// lets make some circles to animate as tire smoke

let smokeContainers = [blue.smoke, red.smoke];
smokeContainers.map((container, i) => {
for (var y = 0; y < 20; y ++) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttributeNS(null, 'cx', 60);
    circle.setAttributeNS(null, 'cy', 30);
    circle.setAttributeNS(null, 'r', 2);
    circle.setAttributeNS(null, 'class', `smoke ${i == 0 ? 'blue' : 'red'}-smoke`);
    
    container.appendChild(circle);
}})

// lets create a timeline for the cars

const timeline = new gsap.timeline({repeat: -1});

// lets set some initial values on the cars

timeline.set(['#red-car', '#blue-car'], {transformOrigin: '90% 50%', x: '-80', y: '-25'});

// lets make the bridge road transparent to start

timeline.set('#bridge-over', {opacity: 0});

// lets tell the red car to follow the hidden red path
// you can uncomment line 25 in css to see them 

timeline.to(red.car, {
  duration: duration,
  transformOrigin: '50% 50%',
  motionPath: {
    path: '#red-path',
    autoRotate: true
  },
  ease: 'linear'
})

// lets tell the blue car to follow the blue path

timeline.to(blue.car, {
  duration: duration,
  transformOrigin: '50% 50%',
  motionPath: {
    path: '#blue-path',
    autoRotate: true,
    start: 0.05,
    end: 1.05
  },
  ease: 'linear'
}, 0)

// lets tell the bridge road to show as the cars pass under

timeline.to('#bridge-over', {duration: duration * 0.1, opacity: 1}, duration / 2)

// lets kick the back of the red car out as it goes around 2 corners
// the cars are nested in 2 groups, the first group follows the path
// the inner group is animated here to skid

timeline.to('#red-car', {duration: duration * 0.1, rotate: 30}, duration * 0.02)
timeline.to('#red-car', {duration: duration * 0.4, rotate: 0, ease: 'elastic'}, duration * 0.16)
timeline.to('#red-car', {duration: duration * 0.15, rotate: -40}, duration * 0.51)
timeline.to('#red-car', {duration: duration * 0.35, rotate: 0, ease: 'elastic'}, duration * 0.62)

// lets kick the back of blue the car out as it goes around 2 corners

timeline.to('#blue-car', {duration: duration * 0.1, rotate: 10}, duration * 0.01)
timeline.to('#blue-car', {duration: duration * 0.5, rotate: 0, ease: 'elastic'}, duration * 0.16)
timeline.to('#blue-car', {duration: duration * 0.2, rotate: -40}, duration * 0.37)
timeline.to('#blue-car', {duration: duration * 0.4, rotate: 0, ease: 'elastic'}, duration * 0.55)

// lets animate the blue cars tire smoke

timeline.fromTo('.blue-smoke', {opacity: 0.2, scale: 2, x: 'random(0, 40)', y: 0}, {
  delay: 'random(0.1, 0.4)', 
  duration: 'random(0.2, 0.4)', 
  x: 'random(-20, -50)', 
  y: 'random(0, 30)', 
  scale: 'random(0, 6)', 
  opacity: 0
}, duration * 0.01)

timeline.fromTo('.blue-smoke', {opacity: 0.4, scale: 2, x: 'random(0, 40)', y:0}, {
  delay: 'random(0.1, 0.55)', 
  duration: 'random(0.2, 0.4)', 
  x: 'random(-40, -50)', 
  y: 'random(-30, -50)', 
  scale: 'random(3, 6)', 
  opacity: 0
}, duration * 0.39)

// lets animate the red cars tire smoke

timeline.fromTo('.red-smoke', {opacity: 0.2, scale: 2, x: 'random(0, 40)', y: 0}, {
  delay: 'random(0.1, 0.4)', 
  duration: 'random(0.2, 0.4)', 
  x: 'random(-20, -50)', 
  y: 'random(0, 30)', 
  scale: 'random(0, 6)', 
  opacity: 0
}, duration * 0.05)

timeline.fromTo('.red-smoke', {opacity: 0.4, scale: 2, x: 'random(0, 40)', y:0}, {
  delay: 'random(0.1, 0.4)', 
  duration: 'random(0.2, 0.4)', 
  x: 'random(-40, -50)', 
  y: 'random(-30, -50)', 
  scale: 'random(3, 6)', 
  opacity: 0
}, duration * 0.5)


const waveMachine = {
  "#wave-1": {x:[0, 0], y: [-20, 25]},
  "#wave-2": {x:[0, 5], y: [-20, 30]},
  "#wave-3": {x:[0, -25], y: [-10, 30]},
  "#wave-4": {x:[-10, -50], y: [-10, 20]},
  "#wave-5": {x:[10, -40], y: [0, -20]},
  "#wave-6": {x:[10, -10], y: [0, -20]},
  "#wave-7": {x:[0, 40], y: [-10, -20]},
  "#wave-8": {x:[-10, 40], y: [0, 0]},
  "#wave-9": {x:[-10, 40], y: [0, 40]},
}

Object.keys(waveMachine).forEach(key => {
  let settings = waveMachine[key];
  gsap.set(key, {
    transformOrigin: 'center center',
    x: settings.x[0], 
    y: settings.y[0], 
    scale: 1, 
    opacity: 0
  })
  gsap.to(key, {
      duration: 3 + Math.random() * 2,
      delay: Math.random() * -2,
      keyframes: [
        {
          x: settings.x[0], 
          y: settings.y[0], 
          scale: 1, 
          opacity: 0
        },
        { 
          x: '+=' + (settings.x[1] / 2), 
          y: '+=' + (settings.y[1] / 2), 
          scale: 1.2,
          opacity: 0.5,
        },
        {
          x: '+=' + (settings.x[1] / 2), 
          y: '+=' + (settings.y[1] / 2),
          scale: 1.4,
          opacity: 0,
        }
      ],
      repeat: -1
    })
})

document.querySelector('#roof').addEventListener('click', () => gsap.to('#roof', {opacity: 0}))