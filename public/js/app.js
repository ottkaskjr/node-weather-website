//FETCH API
fetch('http://puzzle.mead.io/puzzle').then(res => {
  res.json().then(data => {
    console.log(data);
  });
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
//messageOne.textContent = '';

weatherForm.addEventListener('submit', e => {
  //e is short for event, preventDefeault() prevents the browser from refreshing and loosing all the written data
  e.preventDefault();
  //.value extract the input value that's typed in
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  messageThree.textContent = '';
  //removed http://localhost:3000 from the fetch address bar to be able to use with heroku
  fetch('/weather?address=' + location).then(res => {
    res.json().then(data => {
      if (data.err) {
        console.log(data.err);
        const { err } = data.err;
        messageOne.textContent = data.err;
      } else {
        console.log(data.location, data.forecast);
        messageOne.textContent = data.location;

        const {
          summary,
          temperature,
          precipProbability,
          humidity,
          uvIndex
        } = data.forecast;
        messageTwo.textContent = `${summary} It is ${temperature} degrees Celcius, with a ${precipProbability} chance of rain.`;
        messageThree.textContent = `Current humidity is ${humidity} g/m3 and for the sunbathers the UV index is ${uvIndex}. `;
      }
    });
  });
});
