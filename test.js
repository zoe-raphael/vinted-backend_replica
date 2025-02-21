// router.get('/:id/:field', function(req,res){
//     var regex = /action|protocol|ip|port|direction|dip|dport|signature/;
//       if (regex.test(req.params.field)){
//         get(req,res,function(r){
//           var field = req.params.field;
//           res.status(200).send(r[field]);
//         });
//       } else {
//           res.status(404).send("Signature Field Does Not Exist");
//       }
//   });

//   var get=function(req, res, cb){
//     MongoClient.connect(url, function(err, db) {
//       if (err){
//         console.error("Could not connect to database: %s",err);
//         res.sendStatus(500);
//       } else {
//           var _id = req.params.id
//           var collection = db.collection("signatures");
//           var uniqueID = {"_id":_id};
//           var cursor = collection.find(uniqueID);
//           cursor.hasNext(function (err, r) {
//             if (err) {console.log(err);}
//             else {
//               cursor.next(function(err,r) {
//                 if (r == null){
//                   res.status(404).send("Signature not found");
//                 } else {
//                     cb(r);
//                     db.close();
//                 }
//               });
//             }
//           });
//       }
//     });
//   }
//  module.exports.router = router
//  module.exports.get = get

//  In controller2
//  var controller1 = require("./controller1.js");
//  router.get('/', function(req,res){
//    controller1.get(req,res,cb(r){
//        res.status(200).send(r);
//    });
//  });
