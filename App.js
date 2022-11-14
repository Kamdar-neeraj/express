const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
const mysql_connector = require('mysql');
const connection = mysql_connector.createConnection({
  host : 'localhost',
  user : 'root',
  password  :'',
  database : 'neeraj'
});
app.use(express.json());      
app.use(express.urlencoded());
app.set("view engine","ejs" )
// app.use(bodyParser.urlencoded({
//     extended: false
//  }));
 
//  app.use(bodyParser.json());
var jwt_token="kjwfkjfw56ewt6tew53we35w3t543"
app.get('/', (req, res) => {
  connection.connect();
  res.sendFile(__dirname + '/index.html')
})
app.get('/list', function(req, res) {
    let sql = `SELECT * FROM sampleresistration`;
    connection.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.render(__dirname + '/views/data.ejs',{action:"get" , data:data})
    })
  });

  app.post('/login', function(req, res) {
	var lemail=req.body.Email;
	var lpassword = req.body.Password;

	var clemail = `
	SELECT * FROM sampleresistration WHERE email= "${lemail}"
	`;
	connection.query(clemail, function(err, data){
        if (err) throw err;
		if(data[0]!=null){
		
			if(data[0].password==lpassword){
				const token=jwt.sign({userID:data[0].id},jwt_token,{expiresIn:"15d"})
				res.json({
					status: 200,
					message: " login sucessful",
					"token":token

				  })
			}
			else{
				res.json({
					status: 200,
					message: "invald email or password"
				  })
			}
			}else{
				
				res.json({
					status: 200,
					message: "invald user"
				  })
			}
			
		})

  })

  app.post('/form', function(req, res) {    
    
    var firstname = req.body.firstname
    var lastname = req.body.lastname;
    var email = req.body.EMail;
	var city=req.body.City
    var state = req.body.Address;
    var password = req.body.Password;
    var image = req.body.file;
    let sql = `INSERT INTO sampleresistration(firstname,lastname,email,city,state, password,image) VALUES (?)`;
    let values = [
   firstname,lastname,email,city,state,password,image
    ];
	var cemail = `
	SELECT * FROM sampleresistration WHERE email= "${email}"
	`;
	connection.query(cemail, function(err, data){
        if (err) throw err;
		if(data[0]!=null){
			res.json({
				status: 200,
				message: " user already exist try login or sign in with another email "
			  })
			}
			else{
				connection.query(sql, [values], function(err, data, fields) {
					if (err) throw err;
					res.json({
					  status: 200,
					  message: "New user added successfully"
					})
				  })
			}
		})

   
  });
  
app.get('/edit/:id', function(req, res){

	var id = req.params.id;

	var query = `
	SELECT * FROM sampleresistration WHERE id= "${id}"
	`;

	connection.query(query, function(err, data){
        if (err) throw err;
		console.log(data);
		// res.send(data)
		res.render(__dirname + '/views/editdata.ejs',{action:"edit" ,data:data[0]})

	});

});

app.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM sampleresistration WHERE id = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/list");
		}

	});

});

app.post('/update/:id', function(req, res){

	var id = req.params.id;

	
	var firstname = req.body.firstname
    var lastname = req.body.lastname;
    var email = req.body.EMail;
	var city=req.body.City
    var state = req.body.Address;
    var password = req.body.Password;
    
	

	var query = `
	UPDATE sampleresistration 
	SET firstname = "${firstname}", 
	lastname = "${lastname}",
	state = "${state}",
	city = "${city}",
	email = "${email}",
	password = "${password}"
	
	WHERE id = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			res.redirect("/list");
		}

	});

});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})