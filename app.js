const express = require("express");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

const apiKey = "5f1ef6c13f3978b7f0300fc40a4cb7ce";

async function weatherDetails(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );
    const data = await response.json();
    const temperature = Math.round(data.main.temp - 273.15);
    return temperature;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/getWeather", async (req, res) => {
  try {
    const cityName = req.body.city;
    const cityNames = cityName.split(",");

    const promises = cityNames.map(async function (city) {
      const temp = await weatherDetails(city);
      return { [city]: temp };
    });

    const tempDetailsArray = await Promise.all(promises);
    const tempDetails = Object.assign({}, ...tempDetailsArray);
    res.send(tempDetails);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("[ Server Listning at port 3000 ] . . .");
});
