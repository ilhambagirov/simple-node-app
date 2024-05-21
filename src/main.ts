import express, { Request, Response } from "express"
import { MongoClient } from "mongodb"
import { config } from "dotenv"
import bodyParser from "body-parser";

const app = express()
config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/student/:name", async (req: Request, res: Response) => {
    const name = req.params.name;
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db(process.env.DB_NAME)
    const collection = db.collection("Samples")
    const result = await collection.findOne({ name });
    res.status(200).send(result)
})

app.get("/students", async (req: Request, res: Response) => {
    console.log(process.env.MONGODB_URI);
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db(process.env.DB_NAME)
    const collection = db.collection("Samples")
    const result = await collection.find().toArray();
    res.status(200).send(result)
})

app.post("/student/create", async (req: Request, res: Response) => {
    const body = req.body;

    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db(process.env.DB_NAME)
    const collection = db.collection("Samples")
    const result = await collection.insertOne({ name: body.name, age: body.age });

    res.status(200).send(result)
})

app.get("/classrooms", async (req: Request, res: Response) => {
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db(process.env.DB_NAME)
    const collection = db.collection("Classrooms")
    const result = await collection.find().toArray();
    res.status(200).send(result)
})

app.post("/classroom/create", async (req: Request, res: Response) => {
    const body = req.body;

    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db(process.env.DB_NAME)
    const collection = db.collection("Classrooms")
    const result = await collection.insertOne({ name: body.name, students: [...body.students] });

    res.status(200).send(result)
})

app.post("/classroom/:name", async (req: Request, res: Response) => {
    const name = req.params.name;
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db(process.env.DB_NAME)
    const collection = db.collection("Classrooms")
    const result = await collection.findOne({ name });
    res.status(200).send(result)
})


app.listen(5001, () => {
    console.log('Server is running on port 5007');
});
