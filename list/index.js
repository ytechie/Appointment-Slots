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

                    slots.push({
                        start: moment(ev.start).tz(zone).utc().format(),
                        end: moment(ev.end).tz(zone).utc().format()
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