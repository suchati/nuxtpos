import db from '../Config/connect_database'
export default {
  get_products: (result) => {
    const sql = 'SELECT * FROM products'
    db.all(sql, (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  get_listsales: (result) => {
    const sql = `SELECT * FROM sales
      LEFT JOIN users ON users.u_id = sales.s_user
      LEFT JOIN customers ON customers.cus_id = sales.customer
      LEFT JOIN paymentmethod ON paymentmethod.pay_id = sales.payment;`
    db.get(sql, (err, res) => {
      if (err) {
        return result(null, err)
      } else {
        return result(null, res)
      }
    })
  },
  listsale_info: (order, result) => {
    const sql = `SELECT * FROM saledetails
    LEFT JOIN products ON products.p_id = saledetails.sd_product
    WHERE sd_order = ?`
    db.get(sql, order, (err, res) => {
      if (err) {
        return result(null, err)
      } else {
        return result(null, res)
      }
    })
  },
  save_sale: (data, result) => {
    const sql = 'INSERT INTO sales(s_order, s_total, s_get, s_change, customer, payment, s_date, s_d, s_m, s_y, s_user) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    db.run(sql, [data.s_order, data.s_total, data.s_get, data.s_change, data.customer, data.payment, data.s_date, data.s_d, data.s_m, data.s_y, data.s_user], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  save_sale_list: (data, result) => {
    const sql = 'INSERT INTO saledetails(sd_order, sd_product, sd_price, qty, sd_date) VALUES (?,?,?,?,?)'
    db.run(sql, [data.sd_order, data.sd_product, data.sd_price, data.qty, data.sd_date], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  },
  Update_sale_product: (data, result) => {
    const sql = 'UPDATE products SET stock = stock - ? WHERE p_id = ?'
    db.run(sql, [data.qty, data.id], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
  }
}
