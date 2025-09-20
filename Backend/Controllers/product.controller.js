
const pool = require('../db');

exports.list = async (req,res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (err){ res.status(500).json({ error: err.message }); }
};

exports.create = async (req,res) => {
  const { name, type, price, stock } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO products (name,type,price,stock) VALUES (?,?,?,?)',[name,type,price,stock||0]);
    res.json({ id: result.insertId });
  } catch (err){ res.status(500).json({ error: err.message }); }
};

exports.update = async (req,res) => {
  const id = req.params.id;
  const { name,type,price,stock } = req.body;
  try {
    await pool.query('UPDATE products SET name=?,type=?,price=?,stock=? WHERE id=?',[name,type,price,stock,id]);
    res.json({ ok:true });
  } catch (err){ res.status(500).json({ error: err.message }); }
};

exports.remove = async (req,res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM products WHERE id=?',[id]);
    res.json({ ok:true });
  } catch (err){ res.status(500).json({ error: err.message }); }
};
