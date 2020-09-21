// import fs from 'fs'
import express from 'express'
import Home from '../Controllers/Home_Controller'
import Users from '../Controllers/Users_Controller'
import Stores from '../Controllers/Stores_Controller'
import Sales from '../Controllers/Sales_Controller'
import Login from '../Controllers/Login_Controller'
const app = express.Router()
// HOME
app.post('/home/chartmonth', Home.chartmonth)
app.post('/home/chartyear', Home.chartyear)
app.post('/home/productsaletoday', Home.productsaletoday)
app.post('/home/all_user', Home.all_user)
app.post('/home/all_products', Home.all_products)
app.post('/home/saletoday', Home.saletoday)
app.post('/home/saletomonth', Home.saletomonth)
app.post('/home/saletoyear', Home.saletoyear)
app.post('/home/notifications', Home.notifications)

// USERS
app.get('/me', Users.me)
app.get('/users', Users.all_users)
app.post('/user/add', Users.add_user)
app.delete('/user/:id', Users.delete_user)
app.put('/user/:id', Users.update_user)

// PRODUCTS
app.get('/stores/products', Stores.get_products)
app.get('/stores/category', Stores.get_categorys)
app.post('/stores/addproduct', Stores.add_product)
app.put('/stores/update/:id', Stores.update_product)
app.delete('/stores/delete/:id/:img', Stores.delete_product)

// SALE
app.post('/sale/findbarcode', Sales.findbarcode)
app.get('/sale/products', Sales.getproducts)
app.post('/sale/getlistsales', Sales.getlistsales)
app.post('/sale/savesale', Sales.savesale)
app.post('/sale/listsaleinfo', Sales.listsaleinfo)
app.post('/sale/savesalelist', Sales.savesalelist)

// LOGIN
app.post('/login/check_username', Login.check_username)
app.post('/login/check_password', Login.check_password)
app.post('/forgot/password', Login.forgot_password)
app.post('/reset/password', Login.reset_password)

/* app.post('/login', (req, res) => {
  const { username, password } = req.body

  const authdata = { username, password }
  const token = jwt.sign(authdata, 'shhhhh')
  if (username === 'Admin' && password === '12345678') {
    store.set('Auth', authdata)
    store.set('token', token)
    return res.status(200).json({ success: true, user: authdata, token })
  } else {
    return res.json({ errer: 'User error' })
  }
}) */
/* app.get('/me', (req, res) => {
  const userData = store.get('Auth')
  const token = store.get('token')
  const head = req.headers.authorization
  const tokenhead = head && head.split(' ')[1]
  if (tokenhead === token) {
    return res.json({ user: userData })
  } else {
    return res.json({ errer: 'token error' })
  }
}) */

export default app
