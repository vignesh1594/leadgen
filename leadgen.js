var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken'); 
var morgan      = require('morgan');
var connection = require('./connection');
var routes = require('./routes');
var multer	=	require('multer');

var storage	=	multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './www/uploads');
	},
	filename: function (req, file, callback) {
		callback(null, 'dt-'+Date.now()+'-'+file.originalname);
	}
});

var upload = multer({ storage : storage}); //.single('file');
var app = express();
app.use(bodyparser.urlencoded({limit: "50mb", extended: true,  parameterLimit:50000}));
app.use(bodyparser.json({limit: "50mb"}));
app.use(morgan('dev'));

app.post('/uploads', upload.single('file'), function (req, res, next) {
	if(req.file=='undefined')
	{   
		var myfilename='text interaction';
	}
	else {
		if(req.file){
			var myfilename=req.file.filename;
		}
		else{
			var myfilename='';
		}
	}
	connection.acquire(function(err, con) {
		var sql = 'insert into customerinteractions(memberid,remark,filename,createdby) values ('+req.body.memberid.memberid+',"'+req.body.remark+'","'+myfilename+'",'+req.body.userid+')';
		con.query(sql, function(err, result) {
			console.log(err);
			if (err) {
				con.release();
				console.log('Image Upload failed');
			} else {
				console.log('Image Upload successfully');
			}
		})
	});
	res.end("File is uploaded");
});

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.set('tokenSecret', 'secr3t');
app.use(express.static(path.join(__dirname, './www')));

app.get('/', function(req, res) {
	res.send('Hello! The API is up and running');
});

app.post('/api/testing/', function(req, res) {
	var base64Data = req.body.sample.replace(/^data:image\/gif;base64,/, "");
	console.log(base64Data);
	require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
		console.log(err);
	});
	
});

connection.init();
routes.configure(app);

var server = app.listen(8327, function() {
   console.log('Server listening on port ' + server.address().port);
});

//=================== Socket Part ========================

	var io = require('socket.io').listen(server);
	var storedresult=[];
	
	getdatapool();
	
	function getdatapool(){
		connection.acquire(function(err,con) {
			con.query('select * from datamaster where status not in("Appointment","Not Interested","Incorrect Number") || status in("Rescheduled") || status is null', function(err, result) {
				con.release();
				if (err) {
					console.log(err);
				} else {
					connection.acquire(function(err, con1) {
						con1.query('select * from datadetails', function(err, detailresult) {
							con1.release();
							if (err) {
								console.log(err);
							} else {
								for(var i=0; i<result.length;i++){
									result[i].detaileddata=[];
									for(var j=0; j<detailresult.length;j++){
										if(detailresult[j].dataid==result[i].dataid){
											result[i].detaileddata.push(detailresult[j]);
											delete detailresult[j];
											detailresult.splice(j,1);
										}
									}
								}
								for(var i=0;i<result.length;i++){
								console.log(result);
								}
								storedresult=result;
								//io.sockets.emit('serverEvent', result);
								console.log(storedresult);
							}
						})
					});
				}
			})
		});
	}
	
	
		console.log("s"+storedresult);
	
	
	//Whenever someone connects this gets executed
	io.on('connection', function(socket){
		socket.on('adddata',function(newdata){
			console.log("Push Data");
			storedresult.push(newdata);
			console.log(storedresult);
		});
		
		socket.on('clientEvent', function(data){
			console.log(storedresult.length);
			if(data[0].usertype=="Telecaller"){
				if(storedresult.length>0){
					for(var i=0;i<storedresult.length;i++){
						var index=Math.floor(Math.random() * (storedresult.length - 0) + 0);
						console.log(index);
						storedresult[index].callerid=data[0].userid;
						var callingdata=storedresult[index];
						storedresult.splice(index,1);
						console.log(callingdata);
						io.sockets.emit('serverEvent', callingdata);
					}
				}else{
					for(var i=0;i<storedresult.length;i++){
						var index=Math.floor(Math.random() * (storedresult.length - 0) + 0);
						console.log(index);
						storedresult[index].callerid=data[0].userid;
						var callingdata=storedresult[index];
						storedresult.splice(index,1);
						console.log(callingdata);
						io.sockets.emit('serverEvent', callingdata);
					}
					io.sockets.emit('serverEvent',callingdata);
				}
			}
			
		});
		
		//Whenever someone disconnects this piece of code executed
		socket.on('disconnect', function () {
			console.log('A user disconnected');
		});
	});