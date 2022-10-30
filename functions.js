//"node functions.js" to compile
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const {Client } = require('pg')


const client = new Client({ 
    
    host: 'csce-315-db.engr.tamu.edu',
    user: 'csce315_907_garza',
    password: '630004098',
    database: 'csce315_907_74',
    port: 5432,
    ssl: true,
    
})

client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

client.query(`Select * from menuitems where itemid = 1`, (err, res)=>{ //returns name of item with id of 1
    if(!err){
        console.log(res.rows[0].itemname); //displays to console
    }
    else{
        console.log(err.message);
    }
    client.end;
})
