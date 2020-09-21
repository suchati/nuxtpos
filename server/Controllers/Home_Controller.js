import moment from 'moment'
import HomeModel from '../Models/Home_Model'
const year = moment().format('YYYY') // 2020
const month = moment().format('MM') // 01-12
const day = moment().format('DD') // 01-31
export default {
  chartmonth: (_req, res) => {
    HomeModel.chart_month(month, year, (err, result) => {
      if (!err) {
        res.json({ month: result, success: true })
      } else {
        res.json({ success: false })
      }
    })
  },

  chartyear: (_req, res) => {
    HomeModel.chart_year(year, (err, result) => {
      if (!err) {
        res.send({ year: result, success: true })
      } else {
        res.json({ year: [], success: false })
      }
    })
  },

  productsaletoday: (_req, res) => {
    const today = moment().format('YYYY-MM-DD') // 2020-07-31
    HomeModel.product_sale_today(today, (err, result) => {
      if (!err) {
        res.send({ today: result, success: true })
      } else {
        res.json({ success: false })
      }
    })
  },

  all_user: (_req, res) => {
    HomeModel.all_user((err, result) => {
      if (!err) {
        res.send({ user: result, success: true })
      } else {
        res.json({ success: false })
      }
    })
  },

  all_products: (_req, res) => {
    HomeModel.all_products((err, result) => {
      if (!err) {
        res.send({ product: result, success: true })
      } else {
        res.json({ success: false })
      }
    })
  },

  saletoday: (_req, res) => {
    HomeModel.sale_today(day, month, year, (err, result) => {
      if (!err) {
        res.send({ sale_d: result, success: true })
      } else {
        res.json({ success: false })
      }
    })
  },

  saletomonth: (_req, res) => {
    HomeModel.sale_tomonth(month, year, (err, result) => {
      if (!err) {
        res.send({ sale_m: result, success: true })
      } else {
        res.json({ success: false })
      }
    })
  },

  saletoyear: (_req, res) => {
    HomeModel.sale_toyear(year, (err, result) => {
      if (!err) {
        res.send({ sale_y: result, success: true })
      } else {
        res.json({ success: false })
      }
    })
  },

  notifications: (_req, res) => {
    HomeModel.notifications((err, result) => {
      if (!err) {
        res.send({ stock: result, success: true })
      } else {
        res.json({ success: false })
      }
    })
  }
}
