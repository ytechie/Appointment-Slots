let ical = require('ical');
let _ = require('lodash');
let moment = require('moment-timezone');

if (!process.env.ICS_PATH) {
    require('dotenv').config();
    console.log(process.env);
}

module.exports = function (context, req) {
    let icsPath = process.env.ICS_PATH;

    console.log('starting');
    console.log('Using ICS Path: ' + icsPath);

    ical.fromURL(icsPath, {}, function(err, data) {
        if(err) {
            context.res = {
                status: 400,
                body: "Error getting ical feed: " + icsPath
            };
            context.done();
        }

        let slots = [];
        //console.log(data);

        for (var k in data){
            if (data.hasOwnProperty(k)) {
              var ev = data[k]
              if(ev.summary === 'MS Dev Show Block') {
                    var zone = 'America/Los_Angeles';

                    //TODO: What is the appointment isn't PT?

                    //Print time without the Z
                    var startString = moment(ev.start).format('YYYY-MM-DDTHH:mm:ss.sss');
                    var endString = moment(ev.end).format('YYYY-MM-DDTHH:mm:ss.sss');
                    
                    //Convert from LA to UTC
                    var utcStart = moment.tz(startString, 'America/Los_Angeles').toDate().toISOString();
                    var utcEnd = moment.tz(endString, 'America/Los_Angeles').toDate().toISOString();
 
                    slots.push({
                        start: utcStart,
                        end: utcEnd
                    });
              }
          }
        }

        context.res = {
            body: JSON.stringify(slots)
        };
        context.done();
      });

    
};