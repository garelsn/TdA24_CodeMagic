var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const passport = require('passport')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./data/db2.sqlite"); 
db.run('CREATE TABLE IF NOT EXISTS activity (activity_uuid UUID NOT NULL, activityName TEXT, description TEXT,objectives TEXT, classStructure VARCHAR(64), lengthMin INT, lengthMax INT, edLevel TEXT,tools TEXT, homePreparation TEXT,instructions TEXT, agenda TEXT, links TEXT, gallery TEXT,approve INTEGER);')

router.post("/activity", (req, res) => { 
    try {
 
        // Extract data from the request body
        const {
            uuid,
            activityName,
            description,
            objectives,
            classStructure,
            lengthMin,
            lengthMax,
            edLevel,
            tools,
            homePreparation,
            instructions,
            agenda,
            links,
            gallery
        } = req.body;
        const jsonobjectives = JSON.stringify(
            objectives
        );

        const jsonEdLEvel = JSON.stringify(
            edLevel
        );
        const jsonTools = JSON.stringify(
            tools
        );
        const jsonhomePreparation = JSON.stringify([{
            "title":homePreparation[0].title,
            "warn":homePreparation[0].warn,
            "note":homePreparation[0].note
            }
        ]);
        const jsoninstructions = JSON.stringify([{
            "title":instructions[0].title,
            "warn":instructions[0].warn,
            "note":instructions[0].note
            }
        ]);
        const jsonAgenda = JSON.stringify([{
            "duration":agenda[0].duration,
            "title":agenda[0].title,
            "description":agenda[0].description
            }
        ]);
        const jsonlinks = JSON.stringify([{
            "title":links[0].title,
            "url":links[0].url
            }
        ]);
        const jsongallery = JSON.stringify([{
            "title":gallery[0].title,
            "images":[{"lowRes":gallery[0].images[0].lowRes, "highRes":gallery[0].images[0].highRes }]
            }
        ]);



        db.run(`INSERT INTO activity (activity_uuid, activityName, description, objectives, classStructure, lengthMin, lengthMax, edLevel, tools, homePreparation, instructions, agenda, links, gallery, approve) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [uuid, activityName, description,jsonobjectives ,classStructure, lengthMin, lengthMax,jsonEdLEvel, jsonTools, jsonhomePreparation, jsoninstructions, jsonAgenda, jsonlinks, jsongallery, 0], 
                function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ success: false, message: 'Failed to insert activity data' });
            }

            // Close the database connection
            db.close();

            // Return success response
            return res.status(200).json({uuid:uuid, activityName:activityName, description:description,objectives:objectives, classStructure:classStructure,lengthMin:lengthMin,lengthMax:lengthMax,edLevel:edLevel,tools:tools, homePreparation:homePreparation,instructions:instructions, agenda:agenda, links:links, gallery:gallery});
        });
    } catch (error) {
        console.error(error);
        return res.status(599).json({message: "Error message"});
    }
});
router.get('/', (req, res) => {
  res.render("amos.pug");
})

module.exports = router;
