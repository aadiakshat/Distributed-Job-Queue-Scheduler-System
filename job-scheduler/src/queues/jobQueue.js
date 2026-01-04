const { Queue } = require("bullmq");
const connection = require("../config/redis");

const jobQueue = new Queue("job-queue", { connection });

module.exports = jobQueue ;
