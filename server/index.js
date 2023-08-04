const express = require("express");
const cors = require("cors");
const app = express();

const fs = require("fs").promises;
const filePath = "./data.json";

app.use(express.json());
app.use(cors());

const PORT = 5000;

app.get("/data", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (err) {
    res.status(500).send("Error reading the JSON file");
  }
});

app.post("/add", async (req, res) => {
  try {
    const newObject = req.body;

    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);

    jsonData.push(newObject);

    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8");

    res.status(201).send(newObject);
  } catch (err) {
    res.status(500).send("Error adding object");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);

    const indexToDelete = jsonData.findIndex(
      (item) => item.id == req.params.id
    );

    if (indexToDelete === -1) {
      return res.status(404).send("Object not found");
    }

    jsonData.splice(indexToDelete, 1);

    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8");

    res.status(200).send("Object deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting object");
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const updatedObject = req.body;

    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);

    const indexToUpdate = jsonData.findIndex(
      (item) => item.id == req.params.id
    );

    if (indexToUpdate === -1) {
      return res.status(404).send("Object not found");
    }

    jsonData.splice(indexToUpdate, 1, updatedObject);

    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8");

    res.status(200).send("Object updated successfully");
  } catch (err) {
    res.status(500).send("Error updating object");
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
