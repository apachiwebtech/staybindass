const express = require('express');
const app = express();
// const sql = require('mysql');
const cors = require('cors');

const db = require('./util/database');

const routes = require('./Routes/routes');
var corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

app.use(express.json());



app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});





app.get('/', (req, res) => {
  return res.json('from the backend side');
});

db.connect((err) => {
  if (err) {
    console.warn('err');
  } else {
    console.warn('success');
  }
});
app.listen(8081, () => {
  console.log('listening');
});

// app.get('/addproperty', (req, res) => {
//   const sql = 'SELECT a.*,c.city as cityname,s.name as statename,h.home as homename,r.room as roomname,p.pool as poolname,n.night as nightname,d.title as destinationname,d.slug as destinationslug FROM `addproperty` as a left join `home_master` as h on h.id=a.h_type left join `room_master` as r on r.id=a.r_type left join `pool_master` as p on p.id=a.pool left join `night_master` as n on n.id=a.nights left join `destination_master` as d on d.id=a.destination left join `city_master` as c on c.id=a.city left join `awt_states` as s on s.id=a.state WHERE a.deleted != "1" and a.adminApproval="1" and a.villaStatus = "0"';

//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.get('/hotelmenu', (req, res) => {
//   const sql = 'SELECT * from addproperty as ap  where ap.deleted=0;';

//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.get('/destination_master', (req, res) => {
//   const sql = 'SELECT * from destination_master as ds  where ds.deleted=0;';

//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.get('/awt_master', (req, res) => {
//   const sql = 'SELECT * from awt_master as ds  where ds.deleted=0;';

//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.post('/staybindass', (req, res) => {
//   let password = req.body.password;
//   // const hashPassword = hash.MD5(password)
//   let fullname = req.body.fullname;
//   let email = req.body.email;
//   let mobile = req.body.mobile;

//   const sql = 'INSERT INTO awt_registeruser(`fullname`,`email`,`mobile`,`password`) values(?,?,?,?)';

//   db.query(sql, [fullname, email, mobile, password], (err, data) => {
//     // if(data.length)  return res.status.json("user alredy exist");
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.post('/awt_registeruser', (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;

//   const sql = 'SELECT id, email, fullname, mobile, password  FROM awt_registeruser WHERE email = ? AND password = ?';

//   db.query(sql, [email, password], (err, data) => {
//     if (err) {
//       return res.json(err);
//     }

//     if (data.length === 1) {
//       let userId = data[0].id;
//       let email = data[0].email;
//       let fullname = data[0].fullname;
//       let mobile = data[0].mobile;
//       return res.json({ userId: userId, email: email, fullname: fullname, mobile: mobile });
//     } else {
//       return res.json({ error: 'Invalid credentials' });
//     }
//   });
// });

// app.post('/awt_registeruser_update', (req, res) => {
//   let id = req.body.id; // Make sure to have the id value
//   let fullname = req.body.fullname;
//   let gender = req.body.gender;

//   let mobile = req.body.mobile;
//   let address = req.body.address;
//   let describeYou = req.body.describeYou;

//   const sql = `UPDATE awt_registeruser SET fullname=?, gender=?, mobile=?, address=?, describeYou=? WHERE id=?`;

//   db.query(sql, [fullname, gender, mobile, address, describeYou, id], (err, data) => {
//     db.query(sql, (err, data) => {
//       if (err) {
//         return res.json(err);
//       } else {
//         return res.json(data);
//       }
//     });
//   });
// });

// app.post('/property_enquiry', (req, res) => {
//   let name = req.body.name;
//   let email = req.body.email;
//   let mobile = req.body.mobile;
//   let property_type = req.body.property_type;
//   let location = req.body.message;

//   const sql = 'INSERT INTO awt_yourpropertyform (`name`,`email`,`mobile`,`property_type`,`location`) values(?,?,?,?,?)';

//   db.query(sql, [name, email, mobile, property_type, location], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.post('/change_pass', (req, res) => {
//   let id = req.body.id;
//   let currentPassword = req.body.currentPassword;
//   let password = req.body.password;

//   const checkPasswordQuery = 'SELECT id, email, fullname, mobile, password FROM awt_registeruser WHERE id = ?';
//   const updatePasswordQuery = 'UPDATE awt_registeruser SET password = ? WHERE id = ?';

//   db.query(checkPasswordQuery, [id], (err, data) => {
//     if (err) {
//       return res.json(err);
//     }
//     if (data.length === 1) {
//       const storedPassword = data[0].password;

//       if (currentPassword === storedPassword) {
//         db.query(updatePasswordQuery, [password, id], (err, result) => {
//           if (err) {
//             return res.json(err);
//           }
//           return res.json({ message: 'Password updated successfully' });
//         });
//       } else {
//         return res.json({ error: 'Incorrect current password' });
//       }
//     } else {
//       return res.json({ error: 'User not found' });
//     }
//   });
// });

// app.post('/confirm_booking', (req, res) => {
//   const id = req.body.userID; // Retrieve the ID from the query string

 

//   const sql1 = 'SELECT * FROM confirm_booking WHERE userID = ? AND deleted = 0 ORDER BY id DESC';

//   db.query(sql1, [id], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.post('/get_wish', (req, res) => {
//   const id = req.body.userID; // Retrieve the ID from the query string

  

//   const sql = 'SELECT * FROM wishlist_tbl WHERE userID = ? AND deleted = 0 ORDER BY id DESC';

//   db.query(sql, [id], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.post('/Booking_page', (req, res) => {
//   let userID = req.body.userID;
//   let checkin = req.body.fromdate;
//   let checkout = req.body.todate;
//   let prop_slug = req.body.prop_slug;
//   let prop_name = req.body.prop_name;
//   let prop_id = req.body.prop_id;
//   let address = req.body.address;
//   let adults = req.body.adult;
//   let children = req.body.children;
//   let room = req.body.room;
//   let guest_name = req.body.guestname;
//   let guest_email = req.body.guestemail;
//   let guest_mobile = req.body.mobile;

 
//   const sql = 'INSERT INTO property_booking (`userID`,`prop_slug`,`prop_name`,`prop_id`,`address`,`adults`,`children`,`room`,`guest_name`,`guest_email`,`guest_mobile`,`checkin`,`checkout`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

//   db.query(sql, [userID, prop_slug, prop_name, prop_id, address, adults, children, room, guest_name, guest_email, guest_mobile, checkin, checkout], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.post('/payment_page', (req, res) => {
//   const id = req.body.userID; // Retrieve the ID from the query string

//   const sql = 'SELECT * FROM property_booking WHERE userID = ? AND deleted = 0 ORDER BY id DESC LIMIT 1';

//   db.query(sql, [id], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.post('/search_comp', (req, res) => {
//   let userid = req.body.userID;
//   let cityid = req.body.cityid;
//   let cityname = req.body.cityname;
//   let from_date = req.body.fromdate;
//   let to_date = req.body.todate;
//   let adults = req.body.adult;
//   let children = req.body.children;
//   let room = req.body.room;

//   let created_date = new Date().toISOString();

//   const sql = 'INSERT INTO awt_property_search(`userid`,`cityid`,`cityname`,`from_date`,`to_date`,`adults`,`children`,`rooms`,`created_date`) values(?,?,?,?,?,?,?,?,?)';

//   db.query(sql, [userid,cityid, cityname, from_date, to_date, adults, children, room, created_date], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.post('/wishlist', (req, res) => {
//   let property_id = req.body.property_id;
//   let user_id = req.body.user_id;

//   const sql = 'INSERT INTO wishlist_tbl (`property_id`,`userid`) values(?,?)';

//   db.query(sql, [property_id, user_id], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.post('/wish_delete', (req, res) => {
//   let property_id = req.body.property_id;
//   let userid = req.body.userid;

//   const sql = 'UPDATE  wishlist_tbl SET deleted = 1 WHERE userid=? AND property_id = ?';

//   db.query(sql, [userid, property_id], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });


// app.post('/wish_get', (req, res) => {
//   let user_id = req.body.user_id;

//   const sql = 'SELECT * from wishlist_tbl as wl left join addproperty as ap on wl.property_id=ap.id left join city_master as ct on ct.id=ap.city left join night_master as nm on nm.id=ap.nights WHERE userid=? AND wl.deleted != 1';

//   db.query(sql, [user_id], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
  
//       return res.json(data);
//     }
//   });
// });



// app.post('/count', (req, res) => {
//   let userid = req.body.userid;
 

//   const sql = 'SELECT COUNT(*) as count FROM wishlist_tbl WHERE userid = ? AND deleted = 0';

//   db.query(sql, [userid], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       const rowCount = data[0].count;
//       return res.json(rowCount);
//     }
//   });
// });

// app.get('/current_deal', (req, res) => {
//   const currentDate = new Date();
//   const select_date = currentDate.toISOString().split('T')[0]; // Format: "YYYY-MM-DD"
//   console.log(select_date)
//   var options = { weekday: 'long' };
//   var currentDay = currentDate.toLocaleDateString('en-US', options);
//   console.log(currentDay);
//   const sql = 'SELECT * FROM addproperty as ap left join awt_property_price as app on app.property_id=ap.id left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool  WHERE ap.sale_status = 0 and ap.deleted = 0 and  app.select_date = ?'


//   // const sql = 'SELECT * from awt_property_price as app left join addproperty as ap on app.property_id = ap.id left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool WHERE app.deleted = 0 AND select_date = ?';
//   db.query(sql,[select_date], (err, data) => {
//   if(err){
//     return res.json(err)
//   }
//   else{
//     return res.json(data)
//   }
//   });
// });

// app.get('/listing' , (req,res)=>{
  
//   const sql = 'SELECT * FROM awt_property_search WHERE deleted=0 ORDER BY id DESC LIMIT 1'


// })

// app.get('/citylist' , (req, res) => {
//   db.query('SELECT c.id, c.city, s.name as statename FROM `city_master` as c LEFT JOIN `awt_states` as s ON s.`id` = c.`state` WHERE c.`deleted` != 1', (err, rows, fields) => {
//   if (!err)
//       res.send(rows);
//   else
//       console.log(err);
//   })
// } );

// app.post('/contact' , (req,res)=>{
//   let name = req.body.name;
//   let email = req.body.email;
//   let subject = req.body.subject;
//   let message = req.body.message; 

//   const sql = 'INSERT INTO awt_contactform (`name` , `email` , `subject`, `message` ) values(?,?,?,?)'

//   db.query(sql,[name,email,subject,message], (err,data)=>{
//     if(err){
//       return res.json(err)
//     }
//     else{
//       return res.json(data)
//     }
//   })
// })

// app.post('/gallary', (req,res)=>{
//   let id = req.body.villaid; 
//   const sql = 'SELECT * FROM awt_vgallery WHERE v_id = ?';
  
//   db.query(sql, [id], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       if (data.length === 0) {
//         return res.json({ message: 'No matching data found.' });
//       }
      
//       const matchedData = data;

//       return res.json(matchedData);
//     }
//   });
// })

// app.get('/ameniti_img' ,(req,res)=>{

//   const sql ="SELECT * FROM `awt_facilities` where deleted = 0"

//   db.query(sql , (err,data)=>{
//     if(err){
//       return res.json(err);
//     }
//     else{
//       // console.log(data)
//       return res.json(data);
//     }
//   })
// })


app.use(routes);