var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

var fileModel = require('./jsonmodel');
var info = null;

var videoInfo={
    '_id':'',
    'empresa':'',
    'url':'',
    'nombre':'',
    'year':null,
    'rating':null,
    'fecha':null
};

router.get('/', function(req,res,next){
    if(!info){
        fileModel.read(function(err,fileinfo){
            if(err){
                console.log(err),
                info=[];
                return res.status(500).json({'error':'Murio'})
            }
            data = JSON.parse(fileinfo);
            return res.status(200).json(info);
        });
    }else{
        return res.status(200).json(info);
    }
});


router.post('/new',function(req,res,next){
    var _videoInfo = Object.assign({},videoInfo,req.body);
    var dateInicial = new Date();
    _videoInfo._id = uuidv4();
    _videoInfo.fecha = dateInicial;

    if(!info){
        info =[];
    }
    info.push(_videoInfo);
    fileModel.write(info, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({'error':'Murio'});
        }
        return res.status(200).json(_videoInfo);
    });
});



fileModel.read(function(err , fileinfo){
  if(err){
    console.log(err);
  } else{
    info = JSON.parse(fileinfo);
  }
});

module.exports = router;