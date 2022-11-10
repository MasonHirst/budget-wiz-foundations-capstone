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

    loggedJS: (req, res) => {
        res.sendFile(path.join(__dirname, '../public-login/logged-in.js'))
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
    },

    checkEmail: (req, res) => {
        sequelize.query(`
            SELECT email
            FROM users
            WHERE email = '${req.body.email}'
        `)
        .then((dbRes) => {
           res.status(200).send(dbRes[0])
        })
        .catch((err) => console.log(err))
    },

    checkLogin: (req, res) => {
        const {email, password} = req.body

        sequelize.query(`
            SELECT password
            FROM users
            WHERE email = '${email}'
        `)
        .then((dbRes) => {
            console.log(dbRes[0][0].password)
            if (password === dbRes[0][0].password) {
                res.status(200).send('login credentials match database')
            }
        })
        .catch((err) => res.send(err))
    }
}