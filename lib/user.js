'use strict';

var shell=require('shelljs');

module.exports=function user(yo){
   var name='',
       email='';
    if(shell.which('git')){
        name=shell.exec('git config --get user.name',{silent:true}).output.trim();
        email=shell.exec('git config --get user.email',{silent:true}).output.trim();
    }
    yo.log('install git first');
     return {
         name:name,
         email:email
     };
};
