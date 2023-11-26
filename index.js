const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const conn = require("./connection");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const router = express.Router();
app.use("/book", router);

router.get("/", async (req, res) => {
  try {
    const get = await conn.query("select * from books");
    res.status(200).json({ data: get.rows });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const get = await conn.query("select * from books where id=$1", [
      req.params.id,
    ]);
    res.status(200).json({ data: get.rows });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, author, publication_year, language, num_pages } = req.body;

    await conn.query(
      `INSERT INTO books (title, author, publication_year,language,num_pages)
          VALUES ($1, $2, $3,$4,$5)`,
      [title, author, publication_year, language, num_pages]
    );

    res.status(200).json({ message: "Successfully added" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, author, publication_year, language, num_pages } = req.body;

    await conn.query(
      `UPDATE books SET title = $1, author=$2, publication_year=$3,language=$4,num_pages=$5 WHERE id = $6`,
      [title, author, publication_year, language, num_pages, req.params.id]
    );

    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await conn.query(`DELETE FROM books WHERE id = $1`, [req.params.id]);

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
