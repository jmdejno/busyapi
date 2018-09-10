const os = require('os');

module.exports = {
  apps: [{
    name: "busyapi",
    script: "./bin/www",
    instances: os.cpus().length - 1, // due to redis and ApacheBench running locally, leaving one core open.
    exec_mode: "cluster",
    env: {
      PORT: 3000,
      NODE_ENV: 'development'
    },
    env_production: {
	    PORT: 8080,
	    NODE_ENV: "production"
   }
  }]
};
