import cors from "cors";

import express from "express";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET POST");
    return res.status(200).json({});
  }
  next();
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

app.post("/bfhl", (req, res) => {
  console.log(req.body);
  const reqobj = req.body.data;

 
  if (!Array.isArray(reqobj)) {
    return res
      .status(400)
      .json({ is_success: false, user_id: "ommani_tripathi_17062004" });
  }
  
  const letter = reqobj.filter((item) => isNaN(item));

  const highestAlphabet = letter.reduce((highest, current) => {
    if (current > highest) {
      return current;
    }
    return highest;
  }, letter[0]);

  res.status(200).json({
    is_success: true,
    user_id: "ommani_tripathi_17062004",
    email: "mani.tripathi2020@vitbhopal.ac.in",
    roll_number: "20BCG10076",
    numbers: reqobj.filter((item) => !isNaN(item)),
    alphabets: letter,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
  });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "App Listening on port" + PORT
    );
  else console.log("Error may have occurred, server can't start", error);
});