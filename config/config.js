var localDb = 'mongodb://127.0.0.1:27017/newClaime';
var mongoLab='mongodb://claime:claime@ds145148.mlab.com:45148/claim'
module.exports = {

    'secret': 'smartsolutions',
    'database': mongoLab || localDb

};