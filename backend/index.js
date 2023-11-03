const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.unrqwzu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const AllUserCollection = client
      .db("tanstack_pagination")
      .collection("fake");

    app.get("/allUsers", async (req, res) => {
      const query = req.query;
      const pageNumber = parseInt(query.page);
      const perPage = 10;
      const skip = pageNumber * perPage;

      const cursor = AllUserCollection.find().skip(skip).limit(perPage);
      const result = await cursor.toArray();
      const postCount = await AllUserCollection.countDocuments();
      res.json({ result, postCount });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on post ${port}`);
});
