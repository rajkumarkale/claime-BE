mongoose.connect('mongodb://127.0.0.1:27017/bookstore');
Users=require('./Book-model');

app.get('/api/gener', function (req, res) {
  Users.getUsers(function (err, users) {
        if (err) {
            throw err
        }
        res.json(users);
    })
})



app.post('/api/gener', function (req, res) {
  var gener=req.body;
  Users.addUsers(gener,function (err, genersd) {
        if (err) {
            throw err
        }
        res.json(genersd);
    })
})

app.get('/api/gener/:_id', function (req, res) {
  Users.getUsersById(req.params._id,function (err, genersd) {
        if (err) {
            throw err
        }
        
        res.json(genersd);
    })
})

