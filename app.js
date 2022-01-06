const express = require("express");
const { transection } = require("./transection");

const app = express();
// parse json request body
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/", async (req, res) => {
  if (!req.body.address || !req.body.amount) {
    res.status(200).send({ message: "fromAddress and amount required" });
    // res.end();
  } else {
    try {
      const tx = await transection(req.body.address, req.body.amount);
      res.status(200).send({ tx: tx.hash.hash.transactionHash });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Only post method allowed with (address and amount)");
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
