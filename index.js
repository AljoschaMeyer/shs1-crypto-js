const {createMsg1, verifyMsg2, createMsg3, verifyMsg4, clientOutcome} = require('./client');
const {verifyMsg1, createMsg2, verifyMsg3, createMsg4, serverOutcome} = require('./server');

module.exports.createMsg1 = createMsg1;
module.exports.verifyMsg1 = verifyMsg1;
module.exports.createMsg2 = createMsg2;
module.exports.verifyMsg2 = verifyMsg2;
module.exports.createMsg3 = createMsg3;
module.exports.verifyMsg3 = verifyMsg3;
module.exports.createMsg4 = createMsg4;
module.exports.verifyMsg4 = verifyMsg4;
module.exports.clientOutcome = clientOutcome;
module.exports.serverOutcome = serverOutcome;
