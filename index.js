import express from "express";
import axios from "axios";
import _ from "lodash";

const app = express();
app.use(express.urlencoded({ extended: true }));

const API_KEY = "f2aad3a8cc8be271d00237fa4d164ef9";
const API_URL = "https://api.exchangeratesapi.io/v1/latest";

let data = {
  ccy: "MMK",
  exRate: "",
  amount: "",
  display: "display: none",
};

app.get("/", async (req, res) => {
  const result = await axios.get(API_URL, {
    params: {
      access_key: API_KEY,
    },
  });
  data.exRate = result.data.rates[data.ccy];
  res.render("index.ejs", { content: data });
});

app.post("/", async (req, res) => {
  data.display = "";
  data.ccy = _.upperCase(req.body.curr);
  data.amount = req.body.amt;
  const result = await axios.get(API_URL, {
    params: {
      access_key: API_KEY,
    },
  });
  const selectedExRate = result.data.rates[data.ccy];
  data.amount = selectedExRate * data.amount;
  res.redirect("/");
});

app.post("/reset", (req, res) => {
  data = {
    ccy: "MMK",
    exRate: "",
    amount: "",
    display: "display: none",
  };
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is started");
});
