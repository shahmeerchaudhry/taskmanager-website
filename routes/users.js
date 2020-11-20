var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use(function(req, res, next) {

  if(!('user' in req.session)){
    res.sendStatus(403);
    return;
  }

next();
});


router.get('/checkLoggedIn', function(req, res, next) {
res.send(200); //This is for the login page to see if user is logged in - if this sends a 200 that means session exists cause middle ware checks first
});




router.post('/addTask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'INSERT INTO task ( stat, title, info, creator, due_day) VALUES (?,?,?,?,?)';
    connection.query(query, [req.body.stat, req.body.title, req.body.info,  req.session.user.id, req.body.due_day], function(err, rows, fields) {
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


router.get('/getTasksTodo', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT * FROM task WHERE stat = "todo"';
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});




router.post('/getTasksTodoUser', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT *'+
    ' FROM task INNER JOIN task_users'+
    ' ON task.id = task_users.task_id'+
    ' WHERE task_users.user_id = ? && task.stat = "todo"';
    connection.query(query, [ req.session.user.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

    res.json(rows); //send response
    });
  });

});







router.get('/getTasksDoing', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT * FROM task WHERE stat = "doing"';
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});




router.post('/getTasksDoingUser', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT *'+
    ' FROM task INNER JOIN task_users'+
    ' ON task.id = task_users.task_id'+
    ' WHERE task_users.user_id = ? && task.stat = "doing"';
    connection.query(query, [ req.session.user.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

    res.json(rows); //send response
    });
  });

});




router.post('/getTasksDoneUser', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT *'+
    ' FROM task INNER JOIN task_users'+
    ' ON task.id = task_users.task_id'+
    ' WHERE task_users.user_id = ? && task.stat = "done"';
    connection.query(query, [ req.session.user.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

    res.json(rows); //send response
    });
  });

});

router.get('/profile', function(req, res, next) {

    res.json(req.session.user);
});




router.post('/deleteTask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'DELETE FROM task WHERE id = "?"';
    connection.query(query, [req.body.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});




router.post('/uEvent', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'INSERT INTO events (event) VALUES (?)';
    connection.query(query, [req.body.event], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });

});


router.get('/gEvent', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT * from events ORDER BY id DESC LIMIT 15' ;
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});

router.post('/addAvail', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'INSERT INTO user_availability ( user_id, day_avail) VALUES (?,?)';
    connection.query(query, [ req.session.user.id, req.body.day_avail], function(err, rows, fields) {
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


router.post('/delAvail', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'DELETE FROM user_availability where user_id = ? && day_avail = ?';
    connection.query(query, [ req.session.user.id, req.body.day_avail], function(err, rows, fields) {
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



router.post('/getAvail', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT DISTINCT day_avail '+
    'FROM user_availability WHERE '+
    'user_id = ?';
    connection.query(query, [ req.session.user.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      res.json(rows); //send response

    });
  });

});


router.post('/addPref', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'INSERT INTO task_preferences ( type_id, user_id) VALUES (?,?)';
    connection.query(query, [ req.body.prefid, req.session.user.id], function(err, rows, fields) {
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


router.post('/delPref', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'DELETE FROM task_preferences WHERE type_id = ? && user_id = ?';
    connection.query(query, [ req.body.prefid, req.session.user.id], function(err, rows, fields) {
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

router.post('/getPref', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT DISTINCT typeTitle '+
    'FROM task_types INNER JOIN task_preferences '+
    'ON task_preferences.type_id = task_types.id '+
    'WHERE task_preferences.user_id = ?';

    connection.query(query, [ req.session.user.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      res.json(rows); //send response

    });
  });

});



router.post('/addType', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'INSERT INTO task_types (typeTitle) VALUES (?)';
    connection.query(query, [req.body.typeTitle], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {

        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});


router.post('/delType', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'DELETE FROM task_types WHERE id = ?';
    connection.query(query, [req.body.typeTitle], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {

        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200); //send response
    });
  });

});





router.post('/findUsers', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT DISTINCT id, first_name, last_name'+
    ' FROM users INNER JOIN task_preferences'+
    ' ON users.id = task_preferences.user_id INNER JOIN user_availability'+
    ' ON user_availability.user_id = task_preferences.user_id'+
    ' WHERE task_preferences.type_id = ? && user_availability.day_avail = ?';

    connection.query(query, [req.body.type_id, req.body.day], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {

        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});



router.post('/assignTask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'INSERT INTO task_users (task_id, user_id) VALUES (?, ?)';
    connection.query(query, [req.body.task_id, req.body.user_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {

        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});



router.post('/getassignTask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT DISTINCT first_name, last_name' +
                ' FROM users INNER JOIN task_users'+
                ' ON users.id = task_users.user_id'+
                ' WHERE task_users.task_id = ?';
    connection.query(query, [req.body.task_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {

        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});





router.get('/getTasksDone', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT * FROM task WHERE stat = "done"';
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});


router.get('/getTaskTypes', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT * FROM task_types';
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});






router.get('/getUser', function(req, res, next) {

      res.json(req.session.user); //send response

    });





router.get('/getAllUsers', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'SELECT id, username, first_name, last_name, admin FROM users';
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});


router.post('/changeTask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'UPDATE task SET stat = ? WHERE id = ?';
    connection.query(query, [req.body.stat, req.body.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });

});




router.post('/changeFirstname', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'UPDATE users SET first_name = ? WHERE id = ?';
    connection.query(query, [req.body.first_name, req.session.user.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.end();
    });
  });

});

router.post('/changeLastname', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'UPDATE users SET last_name = ? WHERE id = ?';
    connection.query(query, [req.body.last_name, req.session.user.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.end();
    });
  });

});

router.post('/changeEmail', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'UPDATE users SET email = ? WHERE id = ?';
    connection.query(query, [req.body.email, req.session.user.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.end();
    });
  });

});

router.post('/changeUsername', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = 'UPDATE users SET username = ? WHERE id = ?';
    connection.query(query, [req.body.username, req.session.user.id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.end();
    });
  });

});





module.exports = router;
