const sqlite3=require("sqlite3").verbose();

const dbFile="db.sqlite";

let db = new sqlite3.Database(dbFile,(err)=>{
  if (err){
    console.error(err.message);
    throw err;
  }else{
    console.log("connexion à la base sqlite3...");
    const sql =`CREATE TABLE article(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre text,
        auteur text,
        contenu text,
        resumé text,
        datedecreation date,
        dernieremisajour date
    )`;
    db.run(sql,(err)=>{
        if(err){
         console.log("table déja créé");
        }
    });
  }
});

module.exports=db;