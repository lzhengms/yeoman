'use strict';

var update=require('update-notifier');
var pkg=require('../package.json');

update({
    pkg:pkg
}).notify({
    defer:false
});