let ical = require('ical');
let _ = require('lodash');

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
                  slots.push({
                      start: ev.start,
                      end: ev.end
                  });
                  //console.log(ev.summary + ', ');
                  //slots += ev.start.toString() + '\n';
              }
              /*
              console.log("Conference",
                ev.summary,
                'is in',
                ev.location,
                'on the', ev.start.getDate(), 'of', months[ev.start.getMonth()]);
            }*/
          }
        }

        /*
        JSON.parse(data).forEach(function(event) {
            if(event.summary === 'MS Dev Show Block') {
                
            }   
        });*/

        context.res = {
            body: JSON.stringify(slots)
        };
        context.done();

        /*
        */
      });

    
};