This is an Azure function that reads my iCal feed, looks for appointments called "MS Dev Show Block", and returns those blocks as JSON using UTC time. This is used by the [schedule page](https://github.com/ytechie/msdevshow/blob/master/src/render/schedule/index.html) on the MS Dev Show site that allows guests to pick available slots to schedule their recording.

### Setup

Set the environment variable `ICAL_PATH`, or set up a .env file. See .env.example for syntax.