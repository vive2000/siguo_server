var express = require('express');
var router = express.Router();
var user=require('../database/db').user;
var match=require('../database/db').match;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res,next){
    console.log('login');
    res.render('login',{title:'login'});
});

router.post('/ucenter',function(req,res,next){
    console.log("hello");
    var query={name:req.body.name,password:req.body.password};
    (function(){
        user.count(query,function(err,doc){
            console.log(doc);
            if (doc==1){
                console.log(query.name+":login sucessfully"+new Date());
                res.render("ucenter",{title:'ucenter'});
            }else{
                console.log(query.name+":login failed"+new Date());
                res.redirect("/");
            }
        });
    })(query);
});

router.post('/ucenter.json',function(req,res,next){
    console.log("return json");
    console.log("req.body:"+req.body);
    for (var key in req.body){
        console.log("key:"+key);
        console.log("value:"+req.body[key]);
    }
    console.log("req.body.name:"+req.body.name);
    var query={name:req.body.name,password:req.body.password};

    (function(){
        user.findOne(query,function(err,doc){
            console.log(doc);
            if (doc!=null){
                console.log(query.name+":login sucessfully"+new Date());
                req.session.user_id=doc._id;
                req.session.save();
                console.log("=====session.user_id:"+req.session.user_id);
                res.jsonp({login:'suceed',success:true});
            }else{
                console.log(query.name+":login failed"+new Date());
                res.jsonp({login:'failed',success:false});
            }
        });
    })(query);
});

router.post('/match_save_formation.json',function(req,res,next){
    console.log("-------------------------------");
    console.log("request:"+req);
    var distString=req.body.pieces;
    console.log("request.body:"+JSON.stringify(distString));
    try{
        var distribution=JSON.parse(distString);
    }catch(e){
        console.log(e.message);
        console.log(e.stack);
    }
    console.log("distribution:"+distribution);
    res.jsonp({submit:'successfully'});
    return;
    var query={name:req.body.name,password:req.body.password};
    user.find({},function(err,doc){
        console.log("---------:"+doc);
    });
    
    (function(){
        user.count(query,function(err,doc){
            console.log(doc);
            if (doc==1){
                console.log(query.name+":login sucessfully"+new Date());
                res.jsonp({login:'suceed',success:true});
            }else{
                console.log(query.name+":login failed"+new Date());
                res.jsonp({login:'failed',success:false});
            }
        });
    })(query);

});

router.get('/giveMeOneMatch.json',function(req,res,next){
    console.log("----------------------");
    console.log("give me one match");
    match.findOne({},function(err,doc){
            console.log('err:'+err);
            console.log('doc:'+doc);
            if (doc==null){
                doc=new match({formation:'hello'});
                doc.save(function(err1,doc1){
                        res.jsonp({match:doc1,info:'created a new one'});
                    }
                );
            }else{
                res.jsonp({match:doc});
            }
    });
});

router.get('/matchesList.json',function(req,res,next){
    console.log('get matchesList.json');
    console.log("--------------------------------------");
    console.log('|||===session user_id:'+req.session.user_id);
    res.jsonp({'matchesList':[]});
});

module.exports = router;
