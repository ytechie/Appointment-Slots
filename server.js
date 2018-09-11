const express = require('express')
const app = express()
let ical = require('ical');
let _ = require('lodash');
let moment = require('moment-timezone');
const cors = require('cors');

if (!process.env.ICS_PATH) {
    require('dotenv').config();
    console.log(process.env);
}

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(8080, () => console.log('Example app listening on port 8080!'))

app.use(cors());

app.get('/api/list', (req, res) => {
    let icsPath = process.env.ICS_PATH;

    console.log('starting');
    console.log('Using ICS Path: ' + icsPath);

    ical.fromURL(icsPath, {}, function(err, data) {
        if(err) {
            //YOU WERE HERE - REPLACE with expressy stuff
            res.status(400).send("Error getting ical feed: " + icsPath);
        }

        let slots = [];
        //console.log(data);

        for (var k in data){
            if (data.hasOwnProperty(k)) {
              var ev = data[k]
              if(ev.summary === 'MS Dev Show Block') {
                    var zone = 'America/Chicago';

                    //TODO: What is the appointment isn't CT?

                    //Print time without the Z
                    var startString = moment(ev.start).format('YYYY-MM-DDTHH:mm:ss.sss');
                    var endString = moment(ev.end).format('YYYY-MM-DDTHH:mm:ss.sss');
                    
                    //Convert from LA to UTC
                    var utcStart = moment.tz(startString, 'America/Chicago').toDate().toISOString();
                    var utcEnd = moment.tz(endString, 'America/Chicago').toDate().toISOString();
 
                    slots.push({
                        start: utcStart,
                        end: utcEnd
                    });
              }
          }
        }

        res.send(JSON.stringify(slots));
      });
    });