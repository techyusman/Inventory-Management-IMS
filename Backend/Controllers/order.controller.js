
const pool = require('../db');
const pdfGen = require('../utils/pdfGenerator'); // placeholder
const whatsapp = require('../utils/whatsappService'); // placeholder

exports.createOrder = async (req,res) => {
  // manager can input price (not fixed) => server still validates
  const { customer, manager_id, order_type, items, total_amount } = req.body;
  // customer: {name,phone,email,nic,chassis,model_details}
  try{
    // upsert customer
    let customerId;
    const [existing] = await pool.query('SELECT id FROM customers WHERE phone=?',[customer.phone]);
    if (existing.length>0){
      customerId = existing[0].id;
      await pool.query('UPDATE customers SET name=?,email=?,nic=?,chassis=?,model_details=? WHERE id=?',[customer.name,customer.email,customer.nic,customer.chassis,customer.model_details,customerId]);
    } else {
      const [cRes] = await pool.query('INSERT INTO customers (name,phone,email,nic,chassis,model_details) VALUES (?,?,?,?,?)',[customer.name,customer.phone,customer.email,customer.nic,customer.chassis,customer.model_details]);
      customerId = cRes.insertId;
    }

    const [oRes] = await pool.query('INSERT INTO orders (customer_id,manager_id,order_type,total_amount) VALUES (?,?,?,?)',[customerId,manager_id,order_type,total_amount||0]);
    const orderId = oRes.insertId;

    for (const it of items){
      await pool.query('INSERT INTO order_items (order_id,product_name,product_type,qty,unit_price) VALUES (?,?,?,?,?)',[orderId,it.product_name,it.product_type,it.qty,it.unit_price]);
    }

    // optional: generate gatepass pdf and send whatsapp after approval step
    res.json({ ok:true, orderId });
  }catch(err){ res.status(500).json({ error: err.message }); }
};
