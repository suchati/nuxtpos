import db from '../Config/connect_database'
export default {
  get_products: (result) => {
    const sql = 'SELECT * FROM products LEFT JOIN categorys ON products.category = categorys.c_id'
    db.all(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  get_categorys: (result) => {
    const sql = 'SELECT * FROM categorys'
    db.all(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  add: (newData, result) => {
    const sql = 'INSERT INTO products(p_code, p_name, cost_price, sale_price, stock, unit, discontinued, p_details, category, supplier, p_img , p_created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
    db.run(sql, [newData.p_code, newData.p_name, newData.cost_price, newData.sale_price, newData.stock, newData.unit, newData.discontinued, newData.p_details, newData.category, newData.supplier, newData.p_img], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  update: (id, pdata, result) => {
    const sql = 'UPDATE products SET p_name = ?, cost_price = ?, sale_price = ?, stock = ?, p_details = ?, category = ?, p_updated_at = ? WHERE p_id = ?'
    db.run(sql, [pdata.p_name, pdata.cost_price, pdata.sale_price, pdata.stock, pdata.p_details, pdata.category, pdata.p_updated_at, id], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  delete: (id, result) => {
    const sql = 'DELETE FROM products WHERE p_id = ?'
    db.run(sql, id, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  }
}
