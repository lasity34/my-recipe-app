import express from "express"

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
    res.send("Hello World es6 modules")
})

app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT}`)
})