const express = require("express");
const crypto = require("crypto");

const app = express();
// parse json request body
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/", (req, res) => {
  console.log(req.body);
  if (!req.body.amount || !req.body.address) {
    res.status(400).send("amount & address required");
  }
  try {
    var current_date = new Date().valueOf().toString();
    var random = Math.random().toString();
    const txHash = crypto
      .createHash("sha1")
      .update(current_date + random)
      .digest("hex");
    // const txHash = crypto
    //   .createHmac("sha1", req.body.id)
    //   .update(req.body.address)
    //   .digest("hex");
    res.status(200).send(txHash);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
