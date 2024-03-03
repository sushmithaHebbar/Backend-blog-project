const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
var ObjectId = require("mongodb").ObjectId;
const app = express();
const port = 3000; // Set the desired port number

app.use(express.json());
app.use(cors());

// ************mongodb connect ************
mongoose.connect("mongodb+srv://sushmitham579:Maravoors@1@cluster0.00snfhj.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

// **************insert data to database ************
// AuthorSchema -> fields: { type: datatype }
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  publishedDate: { type: Date, required: true }
}, { timestamps: true });

// Model for authorSchema
const Author = mongoose.model('Author', authorSchema);

// blogSchema -> fields: { type: datatype }
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  blogContent: { type: String, required: true },
  authorName: { type: String, required: true }
}, { timestamps: true });

// Model for blogSchema
const Blog = mongoose.model('Blog', blogSchema);

// async-await dealing with databases -> createUser, getUser
const createAuthor = async function (req, res) {
  let data = req.body; // fetching req
  let result = await Author.create(data);
  res.status(200).json({ msg: "Author Created", data: result });
};

const getAuthor = async function (req, res) {
  let data1 = await Author.find();
  res.status(200).json({ msg: "Author Details", data: data1 });
};

const createBlog = async function (req, res) {
  let data = req.body; // fetching req
  let result = await Blog.create(data);
  res.status(200).json({ msg: "New Blog Created", data: result });
};

const getBlog = async function (req, res) {
  let data1 = await Blog.find();
  res.status(200).json({ msg: "Blog Details", data: data1 });
};

// Using POST and GET API
app.post('/create-author', createAuthor);
app.get('/getdata-author', getAuthor);
app.post('/create-blog', createBlog);
app.get('/getdata-blog', getBlog);

// listen functionality:
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
