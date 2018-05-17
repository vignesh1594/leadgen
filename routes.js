var productmaster = require('./models/productmaster');
var productdetails = require('./models/productdetails');
var usertype = require('./models/usertype');
var usermaster = require('./models/usermaster');
var datamaster = require('./models/datamaster');
var datadetails = require('./models/datadetails');
var leadmaster = require('./models/leadmaster');
var interactionmaster = require('./models/interactionmaster');
var planmaster = require('./models/planmaster');
var salesmaster = require('./models/salesmaster');
var receiptsmaster = require('./models/receiptsmaster');
var index = require('./models/index');
var routemaster = require('./models/routemaster');
var areamaster = require('./models/areamaster');
var customermaster = require('./models/customermaster');
var teledashboard = require('./models/teledashboard');

module.exports = {
    configure: function (app) {
		app.get('/api/getproductmaster/:productid', function(req, res) { productmaster.getproductmaster(req.params.productid,res); });
		app.post('/api/addproductmaster/', function(req, res) {productmaster.addproductmaster(req.body, res); });
		app.post('/api/editproductmaster/', function(req, res) {productmaster.editproductmaster(req.body, res); });
		app.delete('/api/deleteproductmaster/:productid', function(req, res) {productmaster.deleteproductmaster(req.params.productid, res); });
		app.get('/api/listproductmaster/', function(req, res) {productmaster.listproductmaster(res); });
		
		
		app.get('/api/getproductdetails/:productdetailid', function(req, res) { productdetails.getproductdetails(req.params.productdetailid,res); });
		app.post('/api/addproductdetails/', function(req, res) {productdetails.addproductdetails(req.body, res); });
		app.post('/api/editproductdetails/', function(req, res) {productdetails.editproductdetails(req.body, res); });
		app.delete('/api/deleteproductdetails/:productdetailid', function(req, res) {productdetails.deleteproductdetails(req.params.productdetailid, res); });
		app.get('/api/listproductdetails/', function(req, res) {productdetails.listproductdetails(res); });
		
		
		app.get('/api/getusertype/:usertypeid', function(req, res) { usertype.getusertype(req.params.usertypeid,res); });
		app.post('/api/addusertype/', function(req, res) {usertype.addusertype(req.body, res); });
		app.post('/api/editusertype/', function(req, res) {usertype.editusertype(req.body, res); });
		app.delete('/api/deleteusertype/:usertypeid', function(req, res) {usertype.deleteusertype(req.params.usertypeid, res); });
		app.get('/api/listusertype/', function(req, res) {usertype.listusertype(res); });
		
		app.get('/api/getusermaster/:userid', function(req, res) { usermaster.getusermaster(req.params.userid,res); });
		app.post('/api/addusermaster/', function(req, res) {usermaster.addusermaster(req.body, res); });
		app.post('/api/editusermaster/', function(req, res) {usermaster.editusermaster(req.body, res); });
		app.delete('/api/deleteusermaster/:userid', function(req, res) {usermaster.deleteusermaster(req.params.userid, res); });
		app.get('/api/listusermaster/', function(req, res) {usermaster.listusermaster(res); });
		
		app.get('/api/getcustomermaster/:userid', function(req, res) { customermaster.getusermaster(req.params.userid,res); });
		app.post('/api/addcustomermaster/', function(req, res) {customermaster.addusermaster(req.body, res); });
		app.post('/api/editcustomermaster/', function(req, res) {customermaster.editusermaster(req.body, res); });
		app.delete('/api/deletecustomermaster/:userid', function(req, res) {customermaster.deleteusermaster(req.params.userid, res); });
		app.get('/api/listcustomermaster/', function(req, res) {customermaster.listusermaster(res); });

		app.get('/api/getdatamaster/:dataid', function(req, res) { datamaster.getdatamaster(req.params.dataid,res); });
		app.post('/api/adddatamaster/', function(req, res) {datamaster.adddatamaster(req.body, res); console.log("suresh"+req.body); });
		app.post('/api/editdatamaster/', function(req, res) {datamaster.editdatamaster(req.body, res); });
		app.delete('/api/deletedatamaster/:dataid', function(req, res) {datamaster.deletedatamaster(req.params.dataid, res); });
		app.get('/api/listdatamaster/:fromdate/:todate', function(req, res) 
		{datamaster.listdatamaster(req.params.fromdate,req.params.todate,res); });


		
		app.get('/api/getdatadetails/:datadetailid', function(req, res) { datadetails.getdatadetails(req.params.datadetailid,res); });
		app.post('/api/adddatadetails/', function(req, res) {datadetails.adddatadetails(req.body, res); });
		app.post('/api/editdatadetails/', function(req, res) {datadetails.editdatadetails(req.body, res); });
		app.delete('/api/deletedatadetails/:datadetailid', function(req, res) {datadetails.deletedatadetails(req.params.datadetailid, res); });
		app.get('/api/listdatadetails/', function(req, res) {datadetails.listdatadetails(res); });

		
		
		app.get('/api/getleadmaster/:leadid', function(req, res) { leadmaster.getleadmaster(req.params.leadid,res); });
		app.get('/api/getbulkarea/:leadid', function(req, res) { leadmaster.getbulkarea(req.params.leadid,res); });
		app.post('/api/addleadmaster/', function(req, res) {leadmaster.addleadmaster(req.body, res); });
		app.post('/api/editleadmaster/', function(req, res) {leadmaster.editleadmaster(req.body, res); });
		app.post('/api/multiplesale/', function(req, res) {leadmaster.multiplesale(req.body, res); });
		app.delete('/api/deleteleadmaster/:leadid', function(req, res) {leadmaster.deleteleadmaster(req.params.leadid, res); });
		app.get('/api/listleadmaster/', function(req, res) {leadmaster.listleadmaster(res); });
		app.get('/api/listsalesuser/', function(req, res) {leadmaster.listsalesuser(res); });
		
		app.get('/api/listcitygroup/', function(req, res) {leadmaster.listcitygroup(res); });
		app.post('/api/listcitysearch/', function(req, res) { leadmaster.listcitysearch(req.body,res); console.log(req.body)  });
		
		app.get('/api/getinteractionmaster/:leadid', function(req, res) { interactionmaster.getinteractionmaster(req.params.leadid,res); });
		app.post('/api/addinteractionmaster/', function(req, res) {interactionmaster.addinteractionmaster(req.body, res); });
		app.post('/api/editinteractionmaster/', function(req, res) {interactionmaster.editinteractionmaster(req.body, res); });
		app.delete('/api/deleteinteractionmaster/:leadid', function(req, res) {interactionmaster.deleteinteractionmaster(req.params.leadid, res); });
		app.get('/api/listinteractionmaster/', function(req, res) {interactionmaster.listinteractionmaster(res); });

		
		app.get('/api/getplanmaster/:planid', function(req, res) { planmaster.getplanmaster(req.params.planid,res); });
		app.post('/api/addplanmaster/', function(req, res) {planmaster.addplanmaster(req.body, res); });
		app.post('/api/editplanmaster/', function(req, res) {planmaster.editplanmaster(req.body, res); });
		app.delete('/api/deleteplanmaster/:planid', function(req, res) {planmaster.deleteplanmaster(req.params.planid, res); });
		app.get('/api/listplanmaster/', function(req, res) {planmaster.listplanmaster(res); });

		
		app.get('/api/getsalesmaster/:salesid', function(req, res) { salesmaster.getsalesmaster(req.params.salesid,res); });
		app.get('/api/getsalesdetailsmaster/:salesid', function(req, res) { salesmaster.getsalesdetailsmaster(req.params.salesid,res); });
		app.post('/api/addsalesmaster/', function(req, res) {salesmaster.addsalesmaster(req.body, res); });
		app.post('/api/editsalesmaster/', function(req, res) {salesmaster.editsalesmaster(req.body, res); });
		app.delete('/api/deletesalesmaster/:salesid', function(req, res) {salesmaster.deletesalesmaster(req.params.salesid, res); });
		app.get('/api/listsalesmaster/', function(req, res) {salesmaster.listsalesmaster(res); });
		app.get('/api/listsalesidmaster/', function(req, res) {salesmaster.listsalesidmaster(res); });

		
		
		app.get('/api/getreceiptsmaster/:receiptid', function(req, res) { receiptsmaster.getreceiptsmaster(req.params.receiptid,res); });
		app.get('/api/getonselectsalemaster/:receiptid', function(req, res) { receiptsmaster.getonselectsalemaster(req.params.receiptid,res); });
		app.post('/api/addreceiptsmaster/', function(req, res) {receiptsmaster.addreceiptsmaster(req.body, res); });
		app.post('/api/editreceiptsmaster/', function(req, res) {receiptsmaster.editreceiptsmaster(req.body, res); });
		app.delete('/api/deletereceiptsmaster/:receiptid', function(req, res) {receiptsmaster.deletereceiptsmaster(req.params.receiptid, res); });
		app.get('/api/listreceiptsmaster/', function(req, res) {receiptsmaster.listreceiptsmaster(res); });
		app.get('/api/listsalereceipt/', function(req, res) {receiptsmaster.listsalereceipt(res); });
		app.get('/api/getparticularsaleid/:id', function(req, res) {receiptsmaster.getparticularsaleid(req.params.id,res); });
		app.get('/api/gettotalsaleid/:id', function(req, res) {receiptsmaster.gettotalsaleid(req.params.id,res); });

		//========29-Dec-2017===============
		app.post('/api/user/auth/', function (req, res) {
            index.authuser(req.body, res);
        });
		app.get('/api/getusertypes', function(req, res) {usermaster.getusertypes(res); });
		app.get('/api/getteamleaders', function(req, res) {usermaster.getteamleaders(res); });
		
		
		//========02-JAN-2018============
		app.get('/api/getproducts', function(req, res) {productdetails.getproducts(res); });
		app.get('/api/getroutemaster/:routeid', function(req, res) { routemaster.getroutemaster(req.params.routeid,res); });
		app.post('/api/addroutemaster/', function(req, res) {routemaster.addroutemaster(req.body, res); });
		app.post('/api/editroutemaster/', function(req, res) {routemaster.editroutemaster(req.body, res); });
		app.delete('/api/deleteroutemaster/:routeid', function(req, res) {routemaster.deleteroutemaster(req.params.routeid, res); });
		app.get('/api/listroutemaster/', function(req, res) {routemaster.listroutemaster(res); });

		
		app.get('/api/getareamaster/:areaid', function(req, res) { areamaster.getareamaster(req.params.areaid,res); });
		app.post('/api/addareamaster/', function(req, res) {areamaster.addareamaster(req.body, res); });
		app.post('/api/editareamaster/', function(req, res) {areamaster.editareamaster(req.body, res); });
		app.delete('/api/deleteareamaster/:areaid', function(req, res) {areamaster.deleteareamaster(req.params.areaid, res); });
		app.get('/api/listareamaster/', function(req, res) {areamaster.listareamaster(res); });
		
		
		app.get('/api/fetchproductdetails/:id', function(req, res) {datamaster.fetchproductdetails(req.params.id,res); });
		app.get('/api/getformproductdetails/', function(req, res) {teledashboard.getproductdetails(res); });
		app.get('/api/listbigdatamaster/', function(req, res) {teledashboard.listbigdatamaster(res); });
		app.get('/api/getreschedule/:id', function(req, res) {teledashboard.getreschedule(req.params.id,res); });
		 app.post('/api/adddatamaster1/', function(req, res) {teledashboard.adddatamaster(req.body, res);  console.log("suresh"+req.body);}); 
		//========04-JAN-2018========
		app.get('/api/getformdetails/:id', function(req, res) {
			datamaster.getformdetails(req.params.id,res);
		});
		
		//========14-JAN-2018===========
		
		app.post('/api/leadupdate/', function(req, res) {
			teledashboard.leadupdate(req.body,res);
		});
		
		//=============rahul.b==============
		app.get('/api/listclientforlead/', function (req, res) {
            leadmaster.listclientforlead(req,res);
        });
		
		app.get('/api/listlistplanforlead/', function (req, res) {
            salesmaster.listlistplanforlead(req,res);
        });
		
		app.get('/api/getcountry/', function (req, res) {
            salesmaster.getcountry(req,res);
        });
		
	}
};
