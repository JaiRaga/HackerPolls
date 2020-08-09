console.log("Sarvamum Krishnan Arpanam");
const express = require("express");
const userRouter = require("./routes/users");

const app = express();
app.use(express.json());
app.use("/api", userRouter);

const port = process.env.PORT || 9008;

app.listen(port, console.log(`Server is up on ${port}`));
