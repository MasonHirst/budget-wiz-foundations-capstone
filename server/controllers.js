const path = require('path')
require('dotenv').config()


const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.HEROKU_DB_URI, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    //write functions here that go with different end points
    loginHTML: (req, res) => {
        res.sendFile(path.join(__dirname, '../public-login/login.html'))
    },

    loginCSS: (req, res) => {
        res.sendFile(path.join(__dirname, '../public-login/login.css'))
    },

    loginJS: (req, res) => {
        res.sendFile(path.join(__dirname, '../public-login/login.js'))
    },

    resetCSS: (req, res) => {
        res.sendFile(path.join(__dirname, '../reset.css'))
    },

    getAllBudgets: (req, res) => {
        
    },

    createAcc: (req, res) => {
        let { email, name, password } = req.body

        sequelize.query(`
        INSERT INTO users (acc_name, email, password)
        VALUES ('${name}', '${email}', '${password}');
        `)
        .then(dbRes => res.status(200).send('The sequelize query was successful'))
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }
}