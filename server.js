const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes
require("./routes/user")(app);
require("./routes/product")(app);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
