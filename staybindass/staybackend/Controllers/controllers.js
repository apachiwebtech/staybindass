const db = require("../util/database");

exports.getAddProperty = (req, res, next) => {
  const sql =
    'SELECT a.*,c.city as cityname,s.name as statename,h.home as homename,r.room as roomname,p.pool as poolname,n.night as nightname,d.title as destinationname,d.slug as destinationslug FROM `addproperty` as a left join `home_master` as h on h.id=a.h_type left join `room_master` as r on r.id=a.r_type left join `pool_master` as p on p.id=a.pool left join `night_master` as n on n.id=a.nights left join `destination_master` as d on d.id=a.destination left join `city_master` as c on c.id=a.city left join `awt_states` as s on s.id=a.state WHERE a.deleted != "1" and a.adminApproval="1" and a.villaStatus = "0"';

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.getHotelMenu = (req, res, next) => {
  const sql = "SELECT * from addproperty as ap  where ap.deleted=0;";

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.GetDestinationMaster = (req, res, next) => {
  const sql = "SELECT * from destination_master as ds  where ds.deleted=0;";

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.GetAwtMaster = (req, res, next) => {
  const sql = "SELECT * from awt_master as ds  where ds.deleted=0;";

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.PostStayBindass = (req, res, next) => {
  let password = req.body.password;
  // const hashPassword = hash.MD5(password)
  let fullname = req.body.fullname;
  let email = req.body.email;
  let mobile = req.body.mobile;

  const sql =
    "INSERT INTO awt_registeruser(`fullname`,`email`,`mobile`,`password`) values(?,?,?,?)";

  db.query(sql, [fullname, email, mobile, password], (err, data) => {
    // if(data.length)  return res.status.json("user alredy exist");
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.PostRegisterUser = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  const sql =
    "SELECT id, email, fullname, mobile, password  FROM awt_registeruser WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, data) => {
    if (err) {
      return res.json(err);
    }

    if (data.length === 1) {
      let userId = data[0].id;
      let email = data[0].email;
      let fullname = data[0].fullname;
      let mobile = data[0].mobile;
      return res.json({
        userId: userId,
        email: email,
        fullname: fullname,
        mobile: mobile,
      });
    } else {
      return res.json({ error: "Invalid credentials" });
    }
  });
};

exports.PostUpdateRegisteredUser = (req, res, next) => {
  let id = req.body.id; // Make sure to have the id value
  let fullname = req.body.fullname;
  let gender = req.body.gender;

  let mobile = req.body.mobile;
  let address = req.body.address;
  let describeYou = req.body.describeYou;

  const sql = `UPDATE awt_registeruser SET fullname=?, gender=?, mobile=?, address=?, describeYou=? WHERE id=?`;

  db.query(
    sql,
    [fullname, gender, mobile, address, describeYou, id],
    (err, data) => {
      db.query(sql, (err, data) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(data);
        }
      });
    }
  );
};

exports.PostPropertyEnquiry = (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let property_type = req.body.property_type;
  let location = req.body.message;

  const sql =
    "INSERT INTO awt_yourpropertyform (`name`,`email`,`mobile`,`property_type`,`location`) values(?,?,?,?,?)";

  db.query(sql, [name, email, mobile, property_type, location], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};
exports.UpdatePassword = (req, res, next) => {
  let id = req.body.id;
  let currentPassword = req.body.currentPassword;
  let password = req.body.password;

  const checkPasswordQuery =
    "SELECT id, email, fullname, mobile, password FROM awt_registeruser WHERE id = ?";
  const updatePasswordQuery =
    "UPDATE awt_registeruser SET password = ? WHERE id = ?";

  db.query(checkPasswordQuery, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length === 1) {
      const storedPassword = data[0].password;

      if (currentPassword === storedPassword) {
        db.query(updatePasswordQuery, [password, id], (err, result) => {
          if (err) {
            return res.json(err);
          }
          return res.json({ message: "Password updated successfully" });
        });
      } else {
        return res.json({ error: "Incorrect current password" });
      }
    } else {
      return res.json({ error: "User not found" });
    }
  });
};

exports.ConfirmBooking = (req, res, next) => {
  const id = req.body.userID; // Retrieve the ID from the query string

  const sql1 =
    "SELECT * FROM confirm_booking WHERE userID = ? AND deleted = 0 ORDER BY id DESC";

  db.query(sql1, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.PostGetWish = (req, res, next) => {
  const id = req.body.userID; // Retrieve the ID from the query string

  const sql =
    "SELECT * FROM wishlist_tbl WHERE userID = ? AND deleted = 0 ORDER BY id DESC";

  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.PostBookingPage = (req, res, next) => {
  let userID = req.body.userID;
  let checkin = req.body.fromdate;
  let checkout = req.body.todate;
  let prop_slug = req.body.prop_slug;
  let prop_name = req.body.prop_name;
  let prop_id = req.body.prop_id;
  let address = req.body.address;
  let adults = req.body.adult;
  let children = req.body.children;
  let room = req.body.room;
  let guest_name = req.body.guestname;
  let guest_email = req.body.guestemail;
  let guest_mobile = req.body.mobile;

  const sql =
    "INSERT INTO property_booking (`userID`,`prop_slug`,`prop_name`,`prop_id`,`address`,`adults`,`children`,`room`,`guest_name`,`guest_email`,`guest_mobile`,`checkin`,`checkout`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

  db.query(
    sql,
    [
      userID,
      prop_slug,
      prop_name,
      prop_id,
      address,
      adults,
      children,
      room,
      guest_name,
      guest_email,
      guest_mobile,
      checkin,
      checkout,
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    }
  );
};

exports.PostSearchComp = (req, res, next) => {
  let userid = req.body.userID;
  let cityid = req.body.cityid;
  let cityname = req.body.cityname;
  let from_date = req.body.fromdate;
  let to_date = req.body.todate;
  let adults = req.body.adult;
  let children = req.body.children;
  let room = req.body.room;

  let created_date = new Date().toISOString();

  const sql =
    "INSERT INTO awt_property_search(`userid`,`cityid`,`cityname`,`from_date`,`to_date`,`adults`,`children`,`rooms`,`created_date`) values(?,?,?,?,?,?,?,?,?)";

  db.query(
    sql,
    [
      userid,
      cityid,
      cityname,
      from_date,
      to_date,
      adults,
      children,
      room,
      created_date,
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        console.log(data);
        return res.json(data);
      }
    }
  );
};

exports.PostPaymentPage = (req, res, next) => {
  const id = req.body.userID; // Retrieve the ID from the query string

  const sql =
    "SELECT * FROM property_booking WHERE userID = ? AND deleted = 0 ORDER BY id DESC LIMIT 1";

  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.PostWishList = (req, res, next) => {
  let property_id = req.body.property_id;
  let user_id = req.body.user_id;

  const sql = "INSERT INTO wishlist_tbl (`property_id`,`userid`) values(?,?)";

  db.query(sql, [property_id, user_id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.PostWishDelete = (req, res, next) => {
  let property_id = req.body.property_id;
  let user_id = req.body.userid;

  const sql =
    "UPDATE  wishlist_tbl SET deleted = 1 WHERE userid=? AND property_id = ?";

  db.query(sql, [user_id, property_id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.PostWishGet = (req, res, next) => {
  let user_id = req.body.user_id;

  const sql =
    "SELECT * from wishlist_tbl as wl left join addproperty as ap on wl.property_id=ap.id left join city_master as ct on ct.id=ap.city left join night_master as nm on nm.id=ap.nights WHERE userid=? AND wl.deleted != 1";

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.GetWishData = (req, res, next) => {
  let user_id = req.body.user_id;

  const sql =
    "SELECT property_id from wishlist_tbl where userid=? AND deleted != 1";

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};
exports.PostCount = (req, res, next) => {
  let userid = req.body.userid;

  const sql =
    "SELECT COUNT(*) as count FROM wishlist_tbl WHERE userid = ? AND deleted = 0";

  db.query(sql, [userid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const rowCount = data[0].count;
      return res.json(rowCount);
    }
  });
};

exports.GetCurrentDeal = (req, res, next) => {
  const currentDate = new Date();
  const select_date = currentDate.toISOString().split("T")[0]; // Format: "YYYY-MM-DD"
  console.log(select_date);
  var options = { weekday: "long" };
  var currentDay = currentDate.toLocaleDateString("en-US", options);
  console.log(currentDay);
  // const sql = 'SELECT ap.id,ap.title,ap.slug,app.property_price,night,pm.pool,cm.city,uploadimage,villaQuantity,minguest,maxguest,address,slug,r_type,minguest FROM addproperty as ap left join awt_property_price as app on app.property_id=ap.id  left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool  WHERE ap.sale_status = 0 and ap.deleted = 0 and  app.select_date = ?'
  const sql =
    "SELECT * FROM addproperty as ap left join awt_property_price as app on app.property_id=ap.id left join awt_default_property_price as adp on adp.property_id = ap.id  left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool  WHERE ap.sale_status = 1 and ap.deleted = 0 and  app.select_date = ?";
  // const sql = 'SELECT * from awt_property_price as app left join addproperty as ap on app.property_id = ap.id left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool WHERE app.deleted = 0 AND select_date = ?';
  db.query(sql, [select_date], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      console.log(data, "current deal data");
      return res.json(data);
    }
  });
};

exports.GetListing = (req, res, next) => {
  const sql =
    "SELECT * FROM awt_property_search WHERE deleted=0 ORDER BY id DESC LIMIT 1";
};

exports.GetCityList = (req, res, next) => {
  db.query(
    "SELECT c.id, c.city, s.name as statename FROM `city_master` as c LEFT JOIN `awt_states` as s ON s.`id` = c.`state` WHERE c.`deleted` != 1",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.PostContact = (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let subject = req.body.subject;
  let message = req.body.message;

  const sql =
    "INSERT INTO awt_contactform (`name` , `email` , `subject`, `message` ) values(?,?,?,?)";

  db.query(sql, [name, email, subject, message], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.getAmenitiImages = (req, res, next) => {
  const sql = "SELECT * FROM `awt_facilities` where deleted = 0";

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      // console.log(data)
      return res.json(data);
    }
  });
};

exports.getGallery = (req, res, next) => {
  let id = req.body.villaid;
  const sql = "SELECT * FROM awt_vgallery WHERE v_id = ?";

  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.length === 0) {
        return res.json({ message: "No matching data found." });
      }

      const matchedData = data;

      return res.json(matchedData);
    }
  });
};

// exports.GetDefaultPrice =(req, res, next)=>{

//   const id = req.params.property_id;

//   console.log(id);
//   const sql = `SELECT property_id, property_price
//   FROM awt_property_price
//   WHERE property_id = ? AND deleted = 0
//   ORDER BY property_price DESC
//   LIMIT 1`;

//   db.query(sql, [id], (err, data)=>{
//     if(err){
//      return res.json(err);
//     }else{
//       return res.json(data)
//     }
//   })
// }

// //workinggg
// exports.GetDefaultPrice =(req, res, next)=>{

//   const id = req.body.property_id;
//   const currentDate = new Date();
//   const select_date = currentDate.toISOString().split('T')[0]; // Format: "YYYY-MM-DD";
//   console.log(select_date);
//   var options = { weekday: 'long' };
//   var currentDay = currentDate.toLocaleDateString('en-US', options);
//   console.log(currentDay);
//   console.log(id);

//   let array = [];
//   // const sql = 'SELECT ap.id,ap.title,ap.slug,app.property_price,night,pm.pool,cm.city,uploadimage,villaQuantity,minguest,maxguest,address,slug,r_type,minguest FROM addproperty as ap left join awt_property_price as app on app.property_id=ap.id  left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool  WHERE ap.sale_status = 0 and ap.deleted = 0 and  app.select_date = ?';
//   const sql = 'SELECT * FROM addproperty as ap left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool left join awt_property_price as app on app.property_id=ap.id WHERE ap.sale_status = 1 and ap.deleted = 0 and app.select_date = ?';

//   db.query(sql, [ select_date], (err, data)=>{
//     if(err){
//      return res.json(err);
//     }
//     let property_price = data.length;

//     console.log(data, "property_price");
//     if(property_price > 0 ){

//       console.log(property_price, "property price regular");
//       // array[...data]
//       return res.json(data);
//     }
//     else{
//       const defaultPriceQuery = 'SELECT * FROM addproperty as ap left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool left join awt_default_property_price as adp on adp.property_id = ap.id WHERE ap.sale_status = 1 and ap.deleted = 0 '

//     db.query(defaultPriceQuery,(err, data)=>{
//       if(err){
//         return res.json(err);
//       }else{
//         return res.json(data);
//       }
//     })
//     }
//   })
// }

// exports.GetDefaultPrice =(req, res, next)=>{

//   const id = req.body.property_id;
//   const currentDate = new Date();
//   const select_date = currentDate.toISOString().split('T')[0]; // Format: "YYYY-MM-DD";
//   console.log(select_date);
//   var options = { weekday: 'long' };
//   var currentDay = currentDate.toLocaleDateString('en-US', options).toLocaleLowerCase();
//   console.log(currentDay);
//   console.log(id);
//  let availablePice ;
//  let defaultPrice ;

//   const sql = 'SELECT * FROM addproperty as ap left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool left join awt_property_price as app on app.property_id=ap.id WHERE ap.sale_status = 1 and ap.deleted = 0 and app.select_date = ?';

//   db.query(sql, [ select_date], (err, data)=>{
//     if(err){
//      return res.json(err);
//     }
//     let property_price = data.length;

//     console.log(data, "property_price");
//     if(property_price > 0 ){

//       console.log(property_price, "property price regular");
//       // array[...data]
//        availablePice = res.json(data);
//       return availablePice;
//     }

//       const defaultPriceQuery = 'SELECT * FROM addproperty as ap left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool left join awt_default_property_price as adp on adp.property_id = ap.id WHERE ap.sale_status = 1 and ap.deleted = 0 '

//     db.query(defaultPriceQuery,(err, defaultdata)=>{
//       if(err){
//         return res.json(err);
//       }else{
//         defaultPrice = res.json(defaultdata)
//         return defaultPrice;
//       }
//     })

//   })
//   console.log(defaultPrice + "default ", availablePice + "available");
// }

exports.GetDefaultPrice = (req, res, next) => {
  const currentDate = new Date();
  const select_date = currentDate.toISOString().split("T")[0]; // Format: "YYYY-MM-DD";

  const sql =
    "SELECT ap.id , app.property_price FROM addproperty as ap left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool left join awt_property_price as app on app.property_id=ap.id WHERE ap.sale_status = 1 and ap.deleted = 0 and app.select_date = ?";

  db.query(sql, [select_date], (err, dataWithPrice) => {
    if (err) {
      return res.json(err);
    }

    if (dataWithPrice.length > 0) {
      const defaultPriceQuery =
        "SELECT * FROM addproperty as ap left join city_master as cm on ap.city = cm.id left join night_master as nm on nm.id = ap.nights left join awt_states as dm on dm.id=ap.state left join pool_master as pm on pm.id=ap.pool left join awt_default_property_price as adp on adp.property_id = ap.id WHERE ap.sale_status = 1 and ap.deleted = 0 ";

      db.query(defaultPriceQuery, (err, dataWithDefaultPrice) => {
        if (err) {
          return res.json(err);
        }

        const combinedResult = mergeArrays(dataWithPrice, dataWithDefaultPrice, 'id');
        return res.json(combinedResult);
      });
    }
  });
  function mergeArrays(arr1, arr2, uniqueField) {
    // Combine the two arrays
    const combined = [...arr2, ...arr1];
  
    // Create a map to store unique objects based on the uniqueField
    const uniqueMap = new Map();
  
    for (const item of combined) {
      uniqueMap.set(item[uniqueField], item);
    }
  
    // Convert the uniqueMap values back to an array
    const uniqueArray = Array.from(uniqueMap.values());
  
    return uniqueArray;
  }
};
