export default {
  // USERS
  users: `CREATE TABLE IF NOT EXISTS users (
    u_id INTEGER,
    id_card INTEGER UNIQUE,
    u_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100),
    salt VARCHAR(100),
    u_address TEXT,
    u_phone INTEGER,
    u_type INTEGER,
    code VARCHAR(10),
    u_created_at DATETIME,
    u_updated_at DATETIME,
    login_at DATETIME,
    PRIMARY KEY(u_id AUTOINCREMENT)
  )`,

  // PRODUCTS
  products: `CREATE TABLE IF NOT EXISTS products (
    p_id INTEGER,
    p_code VARCHAR(20) UNIQUE,
    p_name VARCHAR(55),
    cost_price DECIMAL(6,2),
    sale_price DECIMAL(6,2),
    stock INTEGER,
    unit VARCHAR(55),
    discontinued INTEGER,
    p_details TEXT,
    p_img TEXT,
    category INTEGER,
    supplier INTEGER,
    p_created_at DATETIME,
    p_updated_at DATETIME,
    PRIMARY KEY(p_id AUTOINCREMENT)
  )`,

  // SALES
  sales: `CREATE TABLE IF NOT EXISTS sales (
    s_id INTEGER,
    s_order VARCHAR(20) UNIQUE,
    s_total DECIMAL(6,2),
    s_get DECIMAL(6,2),
    s_change DECIMAL(6,2),
    payment INTEGER,
    s_user INTEGER,
    customer INTEGER,
    s_date DATETIME,
    s_d VARCHAR(2),
    s_m VARCHAR(2),
    s_y VARCHAR(4),
    PRIMARY KEY(s_id AUTOINCREMENT)
  )`,

  // SALESDETAILS
  saledetails: `CREATE TABLE IF NOT EXISTS saledetails (
    sd_id INTEGER,
    sd_order VARCHAR(20),
    sd_product INTEGER,
    sd_price DECIMAL(6,2),
    qty INTEGER,
    sd_date DATE,
    PRIMARY KEY(sd_id AUTOINCREMENT)
  )`,

  // CATEGORYS
  categorys: `CREATE TABLE IF NOT EXISTS categorys (
    c_id INTEGER,
    c_name VARCHAR(55),
    c_details TEXT,
    c_created_at DATETIME,
    c_updated_at DATETIME,
    PRIMARY KEY(c_id AUTOINCREMENT)
  )`,

  // CUSTOMERS
  customers: `CREATE TABLE IF NOT EXISTS customers (
    cus_id INTEGER,
    cus_code VARCHAR(20) UNIQUE,
    cus_name VARCHAR(55),
    cus_email VARCHAR(100),
    cus_phone VARCHAR(15),
    cus_address TEXT,
    cus_type TEXT,
    cus_created_at DATETIME,
    cus_updated_at DATETIME,
    PRIMARY KEY(cus_id AUTOINCREMENT)
  )`,

  // CUSTOME_TYPE
  customertype: `CREATE TABLE IF NOT EXISTS customertype (
    ct_id INTEGER,
    ct_name VARCHAR(55),
    ct_details TEXT,
    PRIMARY KEY(ct_id AUTOINCREMENT)
  )`,

  // PAYMENTMETHOD
  paymentmethod: `CREATE TABLE IF NOT EXISTS paymentmethod (
    pay_id INTEGER,
    pay_type VARCHAR(50),
    pay_details TEXT,
    PRIMARY KEY(pay_id AUTOINCREMENT)
  )`,

  // SUPPLIERS
  suppliers: `CREATE TABLE IF NOT EXISTS suppliers (
    sup_id INTEGER,
    sup_company VARCHAR(50),
    sup_contac VARCHAR(50),
    sup_address TEXT,
    sup_phone VARCHAR(20),
    sup_email VARCHAR(100),
    sup_website VARCHAR(100),
    sup_created_at DATETIME,
    sup_updated_at DATETIME,
    PRIMARY KEY(sup_id AUTOINCREMENT)
  )`
}
