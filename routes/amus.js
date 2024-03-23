const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./data/db2.sqlite");
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY

  })

  


// Vytvoření tabulky activity
db.run(`CREATE TABLE IF NOT EXISTS activity (
    activity_uuid UUID NOT NULL,
    activityName TEXT,
    description TEXT,
    objectives TEXT,
    classStructure VARCHAR(64),
    lengthMin INT,
    lengthMax INT,
    edLevel TEXT,
    tools TEXT,
    homePreparation TEXT,
    instructions TEXT,
    agenda TEXT,
    links TEXT,
    gallery TEXT,
    approve INTEGER
)`);

// Uložení údajů administrátora
const adminName = "admin";
const adminPassword = "tda";
const admin = {
    name: adminName,
    password: adminPassword
};

// Hashování hesla pomocí bcrypt
bcrypt.hash(adminPassword, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Chyba při hashování hesla:', err);
        return;
    }

    // Vytvoření objektu admin s heslem
    admin.password = hashedPassword

    // Nyní můžete použít objekt admin dál


// Přihlášení pomocí údajů administrátora
const initializePassport = require('../passport-config');
initializePassport(passport, name => name === admin.name ? admin : null);

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
});
router.get('/', (req, res) => {

});

router.get('/addActivity', checkNotAuthenticated, (req, res) => {
    res.render('add_activity');
});


router.get('/activity', checkNotAuthenticated, (req, res) => {
    res.render('activity');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
}));

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin');
    }
    next();
}
   
});

router.post("/activity", (req, res) => { 
    try {
        // Zpracování dat z požadavku
        // ...

        // Vložení dat do databáze
        db.run(`INSERT INTO activity (activity_uuid, activityName, description, objectives, classStructure, lengthMin, lengthMax, edLevel, tools, homePreparation, instructions, agenda, links, gallery, approve) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [uuid, activityName, description,jsonobjectives ,classStructure, lengthMin, lengthMax,jsonEdLEvel, jsonTools, jsonhomePreparation, jsoninstructions, jsonAgenda, jsonlinks, jsongallery, 0], 
                function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ success: false, message: 'Failed to insert activity data' });
            }

            // Uzavřít spojení s databází
            db.close();

            // Návrat úspěšné odpovědi
            return res.status(200).json({uuid:uuid, activityName:activityName, description:description,objectives:objectives, classStructure:classStructure,lengthMin:lengthMin,lengthMax:lengthMax,edLevel:edLevel,tools:tools, homePreparation:homePreparation,instructions:instructions, agenda:agenda, links:links, gallery:gallery});
        });
    } catch (error) {
        console.error(error);
        return res.status(599).json({message: "Error message"});
    }
});
router.get('/admin', (req, res) => {
const getLecturerTag =  `SELECT * FROM activity`;
db.all(getLecturerTag, (err, row)=>{

    row.forEach((element, index) => {
        row[index].objectives= JSON.parse(element.objectives)
        row[index].edLevel= JSON.parse(element.edLevel)
        row[index].tools= JSON.parse(element.tools)
        row[index].homePreparation= JSON.parse(element.homePreparation)
        row[index].instructions= JSON.parse(element.instructions)
        row[index].agenda= JSON.parse(element.agenda)
        row[index].links= JSON.parse(element.links)
        row[index].gallery= JSON.parse(element.gallery)
        // try {
        //     JSON.parse(element);
        //     console.log(true); // Je to platný JSON
        //   } catch (error) {
        //     console.log(false); // Není to platný JSON
        //   }
    });
    console.log(row[0].gallery[0].images)
    res.render('admin', {activitys: row});
})
});

router.delete('/logout', (req, res, next) => {
  req.logOut(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
})





module.exports = router;
