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



let acc_id_session = undefined


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


    getBudget: (req, res) => {
        let { budgetName } = req.body
        console.log('controller getBudget ran')

        sequelize.query(`
        SELECT b.name, b.budget_id, bc.category_name, bc.category_budget
        FROM budgets as b
        JOIN budget_categories as bc ON b.budget_id = bc.budget_id
        WHERE name = '${budgetName}';
        `)
        .then((dbRes) => {
            console.log(dbRes[0])
            res.status(200).send(dbRes[0])
        })
        .catch((err) => (
            console.log('error in the controller getBudget function')
        ))
    },


    welcomeMessage: (req, res) => {
        sequelize.query(`
            SELECT acc_name FROM users
            WHERE acc_id = ${acc_id_session};
        `)
        .then(dbRes => res.status(200).send(dbRes[0][0]))
    },


    getAllBudgets: (req, res) => {
        sequelize.query(`
        SELECT * FROM budgets AS b
        JOIN users AS u ON u.acc_id = b.user_id
        WHERE user_id = ${acc_id_session}
        ORDER BY budget_id DESC;
        `)
        .then((dbRes) => {
            console.log(dbRes[0])
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            res.status(500).send(err)
        })
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
            WHERE email = '${req.body.email}';
        `)
        .then((dbRes) => {
           res.status(200).send(dbRes[0])
        })
        .catch((err) => console.log(err))
    },


    checkLogin: (req, res) => {
        const {email, password} = req.body

        sequelize.query(`
            SELECT password, acc_id
            FROM users
            WHERE email = '${email}'
        `)
        .then((dbRes) => {
            console.log(dbRes[0][0].password)
            if (password === dbRes[0][0].password) {
                res.status(200).send('login credentials match database')
                acc_id_session = dbRes[0][0].acc_id
                console.log(acc_id_session)
            }
        })
        .catch((err) => res.send(err))
    },


    createBudget: (req, res) => {
        let { name } = req.body

        sequelize.query(`
        INSERT INTO budgets (name, user_id)
        VALUES ('${name}', ${acc_id_session});
        `)
        .then(dbRes => {
            console.log(dbRes[0])
            res.send('all good')
        })
    },


    checkBudgetName: (req, res) => {
        sequelize.query(`
            SELECT name
            FROM budgets
            WHERE name = '${req.body.name}' AND user_id = ${acc_id_session};
        `)
        .then((dbRes) => {
            console.log(dbRes[0])
            res.status(200).send(dbRes[0])
        })
        console.log(acc_id_session)
    },


    getBudgetCategories: (req, res) => {
        sequelize.query(`
            SELECT b.name, b.budget_id, b.user_id, bc.category_name, bc.category_budget
            FROM budgets as b
            JOIN budget_categories as bc ON b.budget_id = bc.budget_id
            WHERE name = '${req.body.budget}' AND user_id = ${acc_id_session};
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })

    },


    submitSpendingForm: (req, res) => {
        console.log(req.body)
        let { budget, budgetCategory, spendingType, spendingName, amount, spendingNote, categoryId } = req.body

            console.log(spendingType)

        if (spendingType === 'Expense') {
            sequelize.query(`
                INSERT INTO expenses (category_id, name, amount, note)
                VALUES (${categoryId}, '${spendingName}', ${amount}, '${spendingNote}');
            `)
            .then((Dbres) => {
                res.send('spending inserted succesfully into database')
                })
        } else {
            sequelize.query(`
                INSERT INTO incomes (category_id, name, amount, note)
                VALUES (${categoryId}, '${spendingName}', ${amount}, '${spendingNote}');  
            `)
            .then((dbRes) => {
                res.send('spending inserted succesfully into database')
            })
        }
    },


    getCategoryId: (req, res) => {
        console.log(req.body.budgetName)
        console.log(req.body.categoryName)

        sequelize.query(`
        SELECT bc.category_id, bc.category_name, b.name
        FROM budget_categories AS bc
        JOIN budgets AS b ON bc.budget_id = b.budget_id
        WHERE category_name = '${req.body.categoryName}' AND name = '${req.body.budgetName}';
        `)
        .then((dbRes) => {
            console.log('get category id is', dbRes[0])

            res.status(200).send(dbRes[0])
        })
    }
}