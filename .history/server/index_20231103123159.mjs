import express from "express"

const app = express();
const PORT = 3001;

app.use(express.json());



app.get("/api", (req, res) => {
    res.json({ message: "API is working"})
})

app.get("/api/recipes", (req, res) => {
    res.json({ message: "List of recipes"})
})

app.post("/api/recipes", (req, res) => {
    res.json({ message: "Create new recipe"})
})

app.post('api/registration', (req, res) => {
    res.json({ message: "Register a new user"})
})

app.post('api/login', (req, res) => {
    res.json({ message: "Login a user"})
})

app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT}`)
})