import moment from 'moment'
import store from 'store'
import UserModel from '../Models/User_Model'
import Mail from '../Libraries/Mail'
import Salt from '../Libraries/Salt.js'
import Hashpass from '../Libraries/Hashpassword'
import FindData from '../Models/Find_Data'
import Random from '../Libraries/RandomInt'
export default {
  me: (req, res) => {
    const userData = store.get('Auth')
    const token = store.get('token')
    const head = req.headers.authorization
    const tokenhead = head && head.split(' ')[1]
    if (tokenhead === token) {
      return res.json({ user: userData })
    } else {
      return res.json({ errer: 'token error' })
    }
  },
  all_users: (_req, res) => {
    UserModel.getAll((err, result) => {
      if (err) { res.send(err) }
      res.send({ success: true, users: result })
    })
  },
  add_user: (req, res) => {
    const salt = Salt()
    const rand = Random(8)
    const msgText = 'You Password : ' + rand
    const password = Hashpass(rand, salt)
    const idcard = req.body.id_card
    const username = req.body.username
    const email = req.body.email
    const newdata = {
      id_card: idcard,
      u_name: req.body.u_name,
      username,
      salt,
      password,
      email,
      u_phone: req.body.u_phone,
      u_address: req.body.u_address,
      u_created_at: moment().format('YYYY-MM-DD')
    }
    if (newdata) {
      FindData(username, 'username', 'username', 'users', (erruser, resuser) => {
        if (erruser) { res.send(erruser) }
        if (resuser) {
          res.json({ success: false, exituser: true })
        } else {
          FindData(email, 'email', 'email', 'users', (erremail, resemail) => {
            if (erremail) { res.send(erremail) }
            if (resemail) {
              res.json({ success: false, exitemail: true })
            } else {
              FindData(idcard, 'id_card', 'id_card', 'users', (errcard, rescard) => {
                if (errcard) { res.send(errcard) }
                if (rescard) {
                  res.json({ success: false, exitcard: true })
                } else {
                  UserModel.create_user(newdata, (err) => {
                    if (!err) {
                      Mail(req.body.email, 'Password', msgText)
                      res.json({ success: true })
                    } else {
                      res.json({ success: false })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  update_user: (req, res) => {
    const id = req.params.id
    const data = {
      u_name: req.body.u_name,
      u_phone: req.body.u_phone,
      u_address: req.body.u_address,
      u_updated_at: moment().format('YYYY-MM-DD')
    }

    if (id && data) {
      UserModel.update(id, data, (err) => {
        if (err) { res.send(err) }
        res.json({ success: true })
        res.end()
      })
    } else {
      res.json({ success: false })
    }
  },
  delete_user: (req, res) => {
    UserModel.delete(req.params.id, (err) => {
      if (err) {
        res.send(err)
      } else {
        res.json({ success: true })
      }
    })
  }
}
