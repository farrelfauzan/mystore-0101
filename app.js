require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8081;
const { multerSetup } = require("./server/helper/multer");
const { upload } = require("./server/helper/upload");

const router = require("./server/routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const db = require("./server/models/index");
db.client.sync();

app.use(router);

app.listen(PORT, () => console.log("Server running at port", PORT));
