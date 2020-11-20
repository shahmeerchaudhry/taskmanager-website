var express = require('express');
var router = express.Router();
var argon2 = require('argon2');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login', function(req, res, next) {
  // { user: 'name', pass: 'pass'}

  console.log(req.session);


  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    //var query = "SELECT id,username,name_given,name_family,date_added,email,privileges FROM user WHERE username = ? AND password = ?";
    var query = "SELECT * FROM users WHERE username = ?";
    connection.query(query, [req.body.username,req.body.password], async function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }

      if(rows.length > 0){


        try {
          if (await argon2.verify(rows[0].password, req.body.password)) {
            delete rows[0].password;
            req.session.user = rows[0];
            res.end();
            return;
          }
        } catch (err) {
          console.log(err);
        }

      }


      console.log(req.session.user);
      res.sendStatus(403);

    });

  });

});






router.post('/signup', async function(req, res, next) {


  var hpassword = '';

   try {
         hpassword  =  await argon2.hash(req.body.password);
      } catch (err) {
      console.log(err);
      }


  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }


    var query = "INSERT INTO users (username, first_name, last_name, email, password, admin) VALUES (?,?,?,?,?,?)";

    connection.query(query, [req.body.username, req.body.first_name, req.body.last_name, req.body.email, hpassword, req.body.admin], async function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }


      console.log(req.session);
      res.end();

    });

  });

});




router.post('/logout', function(req, res, next) {
  // { user: 'name', pass: 'pass'}

  console.log(req.session);

  delete req.session.user;

  res.end();


});



















router.post('/createAcc', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'INSERT INTO users ( username, password, email ) VALUES (?,?,?)';
    connection.query(query, [req.body.username, req.body.password, req.body.email], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      res.end();

    });
  });

});





router.post('/addTaskType', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'INSERT INTO task_types(typeTitle) VALUES (?)';
    connection.query(query, [req.body.type], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      res.end();

    });
  });
});



router.get('/result', function(req, res, next) {
  //Connect to the database
  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;    }
      var query = "SHOW TABLES;";
      connection.query(query, function(err, rows, fields) {
        connection.release();
        // release connection
        if (err) {
          res.sendStatus(500);
        return;
          }
        res.json(rows);
        //send response
        });
    });
});



module.exports = router;