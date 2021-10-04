// Global Variables
let generateBtn = document.querySelector("#generate"),
  dateUI = document.querySelector("#date"),
  tempUI = document.querySelector("#temp"),
  contentUI = document.querySelector("#content"),
  cityUI = document.querySelector("#city-name"),
  ZipValue = document.querySelector("#zip"),
  content = document.querySelector("#feelings"),
  d = new Date(),
  todayDate = d.toDateString();
AppData = {};

//personal API key for openWeatherMap API
const weathersiteURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const personalApiKey = "&appid=a962b2f299e80a7fbb7a3d288ada3a48";

//   Methods
const generateMethod = () => {
  getWeatherInfo().then((x) => {
    console.log("this is temp in feh degree", x.main.temp);
    AppData = {
      date: todayDate,
      temp: `${Math.floor((x.main.temp - 32) / 1.8)} C`, // to convert from fehr into celisius
      content: content.value,
      cityName: x.name,
    };
    // post data to server function
    const postData = async () => {
      console.log("appData", AppData);
      const response = await fetch("/postAllinformation", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(AppData), // for sending data to your server you must strignfy them
      });
      console.log("this is data to be posted to server file", response);
      try {
        const resToServer = await response.json();
        console.log("what goes to server", resToServer);
        return resToServer;
      } catch (error) {
        console.log(error);
      }
    };
    postData();
    renderData();
  });

  // render data in UI
  async function renderData() {
    const req = await fetch("/getAllinformation");
    const finallInfo = await req.json();
    dateUI.innerHTML = finallInfo.date;
    tempUI.innerHTML = finallInfo.temp;
    contentUI.innerHTML = finallInfo.content;
    cityUI.innerHTML = finallInfo.cityName;
    console.log("req => ", req.body);
    console.log("final => ", finallInfo);
  }
};
// getting weather info
async function getWeatherInfo() {
  const result = await fetch(weathersiteURL + ZipValue.value + personalApiKey);
  const myData = await result.json();
  console.log(myData, "information when it comes from openweather site ");
  if (myData.cod != 200) {
    if (myData.message) {
      alert(
        "please review your zip code and try agin because " +
          myData.message +
          " ,or just remove spaces around your zip code!"
      );
    } else {
      alert("please review your zip code and try agin");
    }
  } else {
    return myData;
  }
}

// event listener to add function to existing HTML DOM element
generateBtn.addEventListener("click", generateMethod);

/* Function to GET API data */
async function gitWeatherfromAPI(zip) {
  return await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zip}${personalApiKey}`
  ).json();
}
