const redis = require('redis');

//set REDIS config options (local vs. remote)
const REDIS_HOST = process.env.NODE_ENV === 'development' ? null : process.env.REDIS_MASTER_HOST;
const REDIS_PASSWORD = process.env.NODE_ENV === 'development' ? undefined : process.env.REDIS_PASSWORD;

//connect to REDIS
const client = redis.createClient({
  host: REDIS_HOST,
  password: REDIS_PASSWORD
});


client.on('connect', () => console.log(`Redis connected: ${REDIS_HOST || 'localhost'}.`));
client.on('error', err => console.error(err));

module.exports = function (app)
{
  /**
   * POST medication usage for patient.
   */
  app.post('/api/usages', function (req, res)
  {
    // TODO: handle error here with appropriate 4xx code

    // define user key and data
    const key = 'user:' + req.body.patientId + ':usage';
    const usageData = {timestamp: req.body.timestamp, medication: req.body.medication};

    // push data onto list
    client.lpush(key, JSON.stringify(usageData), (err, usageId) => {
      // TODO: handle redis error here (4xx or 5xx codes based on err)
      res.status(201).json({'id': usageId});
    });

  });

};

