import express from "express";
import morgan from "morgan";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "sagor7531",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello this is get method.");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM test.books";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES(?,?,?,?)";
  const valus = [req.body.title, req.body.desc, req.body.price, req.body.cover];
  db.query(q, valus, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("books has been created successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id=?";
  db.query(q, [bookId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("books has been deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id=?";
  const valus = [req.body.title, req.body.desc, req.body.price, req.body.cover];
  db.query(q, [...valus, bookId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("books has been updated successfully");
  });
});

app.listen(4000, () => {
  console.log("server running on port 4000");
});
