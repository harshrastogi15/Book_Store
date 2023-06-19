
let adminKey = process.env.ADMINKEY;
let adminID = process.env.ADMINID;

const authenticate = (adminId)=>{
    if(adminID === adminId){
        return true;
    }
    return false;
}

module.exports = {authenticate}
