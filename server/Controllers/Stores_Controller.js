import fs from 'fs'
import moment from 'moment'
import StoreModel from '../Models/Store_Model'
import Finddata from '../Models/Find_data'

export default {
  get_products: (_req, res) => {
    StoreModel.get_products((err, result) => {
      if (!err) {
        res.send({ products: result, success: true })
      } else {
        res.json({ products: [], success: false })
      }
    })
  },

  get_categorys: (_req, res) => {
    StoreModel.get_categorys((err, result) => {
      if (!err) {
        res.send({ category: result, success: true })
      } else {
        res.send({ success: false })
      }
    })
  },

  add_product: (req, res) => {
    const File = req.files.p_img
    const filename = `${Date.now()}-${File.name}`
    // console.log(req)
    const newdata = {
      p_code: req.body.p_code,
      p_name: req.body.p_name,
      cost_price: req.body.cost_price,
      sale_price: req.body.sale_price,
      unit: '',
      stock: req.body.stock,
      discontinued: 0,
      p_details: req.body.p_details,
      p_img: filename,
      category: req.body.category,
      supplier: '',
      p_created_at: moment().format('YYYY-MM-DD')
    }
    if (newdata) {
      Finddata(req.body.p_code, 'p_code', 'p_code', 'products', (error, result) => {
        if (error) { res.send(error) }
        if (result) {
          return res.json({ success: false })
        } else {
          File.mv(`assets/images/uploads/products/${filename}`, (err) => {
            if (!err) {
              StoreModel.add(newdata, (errr) => {
                if (!errr) {
                  return res.json({ success: true })
                } else {
                  return res.json({ success: false })
                }
              })
            }
          })
        }
      })
    }
  },

  update_product: (req, res) => {
    const id = req.params.id
    const data = {
      p_name: req.body.p_name,
      cost_price: req.body.cost_price,
      sale_price: req.body.sale_price,
      stock: req.body.stock,
      p_details: req.body.p_details,
      category: req.body.category,
      p_updated_at: moment().format('YYYY-MM-DD')
    }
    if (id && data) {
      StoreModel.update(id, data, (err) => {
        if (!err) {
          res.json({ success: true })
        } else {
          res.json({ success: false })
        }
      })
    } else {
      res.json({ success: false })
    }
  },

  delete_product: (req, res) => {
    StoreModel.delete(req.params.id, (err) => {
      if (!err) {
        if (fs.existsSync(`assets/images/uploads/products/${req.params.img}`)) {
          fs.unlinkSync(`assets/images/uploads/products/${req.params.img}`)
        }
        res.json({ success: true })
      } else {
        res.json({ success: false })
      }
    })
  }
}
