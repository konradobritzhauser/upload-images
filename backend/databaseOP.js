const { Pool } = require("pg");


let poolConfig = {
  user: "postgres",
  host: "flowercards3.clzml77iek80.us-east-1.rds.amazonaws.com",
  database: "flowerCards3",
  password: "password",
  port: 5432
};


let getAllCards = () => {
  return new Promise(function(resolve, reject) {
    const pool = new Pool(poolConfig);
    let query = "select * from cards;";
    let results;

    pool.query(query, (err, res) => {

      results = res;
      pool.end();
      resolve(res);
    });
  });
};

let addCard = (id,cardName,price,numStars,posterSrc="") => {
  return new Promise(function(resolve, reject) {
    const pool = new Pool(poolConfig);
    let query = `INSERT INTO cards(id,name,price,numstars,postersrc) VALUES(${id},'${cardName}',${price},${numStars},'${posterSrc}');`;

    pool.query(query, (err, res) => {

      results = res;
      pool.end();
      resolve(res);
    });
  });
};

module.exports = { getAllCards,addCard };
