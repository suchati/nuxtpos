import jwt from 'jsonwebtoken'
import moment from 'moment'
import store from 'store'
import LoginModel from '../Models/Login_Model'
import FindData from '../Models/Find_Data'
import Hashpass from '../Libraries/Hashpassword'
import Random from '../Libraries/RandomInt'
import Mail from '../Libraries/Mail'
import Salt from '../Libraries/Salt'

export default {
  check_username: (req, res) => {
    const username = req.body.username
    if (username) {
      FindData(username, 'username', 'username', 'users', (err, result) => {
        if (!err) {
          if (result) {
            if (username === result.username) {
              res.json({ success: true, test: 5555 })
            } else {
              res.json({ success: false })
            }
          } else {
            res.json({ success: false })
          }
        } else {
          res.send(err)
        }
      })
    } else {
      res.json({ success: false })
    }
  },

  check_password: (req, res) => {
    const username = req.body.username
    FindData(username, '*', 'username', 'users', (err, result) => {
      if (!err) {
        if (result) {
          const password = Hashpass(req.body.password, result.salt)
          if (username === result.username && password === result.password) {
            const authUser = {
              username: result.username,
              id_card: result.id_card,
              u_name: result.u_name,
              email: result.email,
              u_phone: result.u_phone,
              u_address: result.u_address
            }
            const data = { login_at: moment().format('YYYY-MM-DD') }
            LoginModel.updatelogin(result.u_id, data, (error) => {
              if (!error) {
                const authtoken = jwt.sign(authUser, 'shhhhh')
                store.set('Auth', authUser)
                store.set('token', authtoken)
                return res.json({
                  success: true,
                  user: authUser,
                  token: authtoken
                })
              } else {
                res.send(error)
              }
            })
          } else {
            res.json({ success: false })
          }
        } else {
          res.json({ success: false })
        }
      } else {
        res.send(err)
      }
    })
  },

  forgot_password: (req, res) => {
    const email = req.body.email
    FindData(email, '*', 'email', 'users', (err, result) => {
      if (!err) {
        if (result) {
          const rand = Random(6)
          const Text = `Code Reset Password : ${rand}`
          const id = result.u_id
          LoginModel.update(id, rand, (error) => {
            if (!error) {
              Mail(email, 'Code Reset', Text)
              res.json({ success: true, id })
            } else {
              res.json({ success: false, Nosend: true })
            }
          })
        } else {
          res.json({ success: false })
        }
      } else {
        res.send(err)
      }
    })
  },

  reset_password: (req, res) => {
    const id = req.body.id
    const code = req.body.code
    const salt = Salt()
    const password = Hashpass(req.body.new_pass, salt)
    const data = {
      password,
      salt,
      code: '',
      u_updated_at: moment().format('YYYY-MM-DD')
    }
    FindData(id, '*', 'u_id', 'users', (err, result) => {
      if (!err) {
        if (result) {
          if (code === result.code) {
            LoginModel.update_password(id, data, (error) => {
              if (!error) {
                res.json({ success: true })
              } else {
                res.json({ success: false })
              }
            })
          }
        }
      }
    })
  }
}
