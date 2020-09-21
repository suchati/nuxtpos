import moment from 'moment'
import SaleModel from '../Models/Sale_Model'
import FindData from '../Models/Find_Data'
export default {
  getproducts: (_req, res) => {
    SaleModel.get_products((err, result) => {
      if (!err) {
        res.send({ products: result, success: true })
      } else {
        res.json({ products: [], success: false })
      }
    })
  },
  findbarcode: (req, res) => {
    const barcode = req.body.barcode
    FindData(barcode, '*', 'p_code', 'products', (err, result) => {
      if (!err) {
        if (result.stock > 1) {
          res.json({ success: true, outstock: false, products: result })
        } else {
          res.json({ outstock: true, msg: 'Product out for Stock' })
        }
      } else {
        res.send(err)
      }
    })
  },
  getlistsales: (_req, res) => {
    SaleModel.get_listsales((err, result) => {
      if (!err) {
        if (result) {
          res.json({ success: true, lists: result })
        } else {
          res.json({ success: false })
        }
      } else {
        res.send(err)
      }
    })
  },
  listsaleinfo: (req, res) => {
    const order = req.body.order
    SaleModel.listsale_info(order, (err, result) => {
      if (!err) {
        if (result) {
          res.json({ success: true, listsale: result })
        } else {
          res.json({ success: false })
        }
      } else {
        res.send(err)
      }
    })
  },
  savesale: (req, res) => {
    const ordersale = {
      s_order: req.body.order_no,
      s_total: req.body.total,
      s_get: req.body.cash,
      s_change: req.body.chang_money,
      customer: req.body.cus,
      payment: 1,
      s_date: moment().format('YYYY-MM-DD'),
      s_d: moment().format('DD'),
      s_m: moment().format('MM'),
      s_y: moment().format('YYYY'),
      s_user: req.body.u_id
    }
    if (ordersale) {
      SaleModel.save_sale(ordersale, (err) => {
        if (!err) {
          res.json({ success: true })
        } else {
          res.json({ success: false })
        }
      })
    }
  },
  savesalelist: (req, res) => {
    const listsale = {
      sd_order: req.body.order_no,
      sd_product: req.body.p_id,
      sd_price: req.body.price,
      qty: req.body.num,
      sd_date: moment().format('YYYY-MM-DD')
    }
    const updatenum = {
      id: req.body.p_id,
      qty: req.body.num
    }
    if (listsale) {
      SaleModel.save_sale_list(listsale, (err) => {
        if (!err) {
          SaleModel.Update_sale_product(updatenum, (error) => {
            if (!error) {
              res.json({ success: true, data: listsale })
            }
          })
        } else {
          res.json({ success: false })
        }
      })
    }
  }
}
