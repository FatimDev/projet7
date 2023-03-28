const express = require ("express");
const db=require("./db.js");
// const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", function(req,res){
  res.json({message:"l'api marche bien"});
});

// liste des articles
app.get("/api/articles",(req,res)=>{
    const sql="SELECT * FROM article";
    db.all(sql,(err,rows)=>{
        if (err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({message:"liste des articles",data:rows});
    });
});

// afficher par un article 
app.get("/api/articles/:id",(req,res)=>{
    const{id:articleID}=req.params
    const sql="SELECT * FROM article WHERE id=?";
    const params=[articleID]
    db.get(sql,params,(err,row)=>{
        if (err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({message:`article ${articleID} affiché`,data:row});
    });
});

// ajout d'article
app.post("/api/articles",(req,res)=>{
    const {titre, auteur,contenu ,resumé, datedecreation, dernieremisajour}=req.body;
    if(!titre || !auteur || !contenu || !resumé ||!datedecreation || !dernieremisajour){
        res.status(400).json({error:"merci de remplir tous les champs!"});
        return;
    }
    const article={titre,auteur,contenu ,resumé ,datedecreation,dernieremisajour};
    const sql='INSERT INTO article(titre,auteur,contenu ,resumé ,datedecreation,dernieremisajour)values(?,?,?,?,?,?)'
    const params=[article.titre,article.auteur,article.contenu,article.resumé,article.datedecreation,article.dernieremisajour]
    db.run(sql,params,function(err,result){
      if(err){
        res.status(400).json({error:err.message});
        return;
      }
      res
        .status(201)
        .json({message:"article créé avec succes",data:article});
    });
    
});

// modification d'article
app.put("/api/articles/:id",(req,res)=>{
    const{id:articleID}=req.params;
    const {titre, auteur,contenu ,resumé, datedecreation, dernieremisajour}=req.body;
    if(!titre || !auteur || !contenu || !resumé ||!datedecreation || !dernieremisajour){
        res.status(400).json({error:"merci de remplir tous les champs!"});
        return;
    }
    const article={titre,auteur,contenu ,resumé ,datedecreation,dernieremisajour};
    const sql="UPDATE article SET titre=?,auteur=?,contenu=? ,resumé=?,datedecreation=?,dernieremisajour=?WHERE id=?";
    const params=[article.titre,article.auteur,article.contenu,article.resumé,article.datedecreation,article.dernieremisajour,articleID];
    db.run(sql,params,function(err,result){
      if(err){
        res.status(400).json({error:err.message});
        return;
      } 
      res
        .status(201)
        .json({message:`article ${articleID} modifié`,data:article});
    }); 
});

// suppression d'un artiicle
app.delete("/api/articles/:id",(req,res)=>{
    const {id:articleID}=req.params;
    const sql="DELETE FROM article WHERE id=?"
    db.run(sql,articleID,function(err,resultat){
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message:`article ${articleID}supprimé`,
            data:this.changes,
        });
    });
});
















// // modification d'article
// app.put("/api/articles/:id",(req,res)=>{
//     const{id:articleID}=req.params;
//     const {titre, auteur,contenu ,resume, datedecreation, dernieremisajour}=req.body;
//     if(!titre || !auteur || !contenu || !resume ||!datedecreation || !dernieremisajour){
//         res.status(400).json({error:"merci de remplir tous les champs!"});
//         return;
//     }
//     const article={titre,auteur,contenu ,resume ,datedecreation,dernieremisajour};
//     const sql="UPDATE article SET titre=?,auteur=?,contenu=? ,resume=?,datedecreation=?,dernieremisajour=?WHERE id=?";
//     const params=[article.titre,article.auteur,article.contenu,article.resume,article.datedecreation,article.dernieremisajour,articleID];
//     db.run(sql,params,function(err,result){
//       if(err){
//          res.status(400).json({error:err.message});
//         return;
//       }
//       res
//         .status(201)
//         .json({message:`article ${articleID} modifié`,data:article});
//     }); 
// });

// // suppression d' artiicle
// app.delete("/api/articles/:id",(req,res)=>{
//     const {id:articleID}=req.params;
//     const sql="DELETE FROM article WHERE id=?"
//     db.run(sql,articleID,function(err,resultat){
//         if(err){
//             res.status(400).json({error:err.message});
//             return;
//         }
//         res.json({
//             message:`article ${articleID}supprimé`,
//             data:this.changes,
//         });
//     });
// });

 




























app.listen(port, () => {
    console.log('Server app listening on port ' + port);

});

