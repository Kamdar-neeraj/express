const express = require("express");

const app = express();
const port =8000
const mysql_connector = require('mysql');
const connection = mysql_connector.createConnection({
    host : 'localhost',
    user : 'root',
    password  :'',
    database : 'neeraj'
  });

connection.connect(err=>{
  if(err)throw error
  console.log("connected to mysql");
})
// app.use(express.static('public'))
app.set("view engine", "ejs");

// app.set("views", path.join(__dirname, "./views"));
// app.use("/static", express.static(
//     path.join(__dirname, "public")));
 
// app.use(paginate.middleware(10, 50));
// const path = require("path");
// require("dotenv").config();
// const paginate = require("express-paginate");
// app.use(express.json());
const resultPerPage= 2

app.get('/', function(req, res) {
  let sql = `SELECT * FROM sampleresistration`;
  connection.query(sql, (err, data, fields) =>{
    if (err) throw err;
    // console.log(data);
    const numberofresult=data.length
    const numberofpages=Math.ceil(numberofresult/resultPerPage)
    let page= req.query.page ? +(req.query.page) :1;
    if (page>numberofpages){
      res.redirect('/?page='+encodeURIComponent(numberofpages))
    }
    else if(page<1){ 
      res.redirect('/?page='+encodeURIComponent(1))
    }

    const startinglimit=(page-1)*resultPerPage

    sql=`SELECT * FROM sampleresistration LIMIT ${startinglimit},${resultPerPage}`
    connection.query(sql,(err,data)=>{
      if(err)throw err;
      let iterator=(page-5)<1 ? 1:page-5
      let endinglink=(iterator+9)<= numberofpages ? (iterator+9):page-(numberofpages-page)
      if(endinglink < (page+4)){
        iterator -= (page+4)-numberofpages;
      }

      res.render(__dirname + '/views/index.ejs',{data:data ,page ,iterator,endinglink,numberofpages})
    })

 
  })
});



 app.listen(port, () => {
   console.log(`app listening at http://localhost:${port}`)
 })

