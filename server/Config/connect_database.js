import sqlite3 from 'sqlite3'
import data from './create_table'
const { Database } = sqlite3
const db = new Database('server/Config/data/database.db', (err) => {
  if (!err) {
    db.run(data.users)
    db.run(data.products)
    db.run(data.sales)
    db.run(data.saledetails)
    db.run(data.categorys)
    db.run(data.customers)
    db.run(data.customertype)
    db.run(data.paymentmethod)
    db.run(data.suppliers)
  } else {
    console.log('NO CONNECT TO DB')
  }
})
export default db
