'use strict';
require('../../lib/update.js');

var generators = require('yeoman-generator');
var async = require('async');
var yosay = require('yosay');
var fs = require('fs');
var path = require('path');

var user = require('../../lib/user.js');

//extend方法到原型上
var generator = module.exports = generators.Base.extend({
    //config
    config: function () {

        //生成yo-rc.json
        this.config.save();
    },

    prompting: function () {
        var done = this.async();
        this.log(yosay('welcome'));
        var prompts = [
            {
                name: 'appname',
                message: '项目名?',
                default: this.appname
            },
            {
                name: 'version',
                message: '版本号?',
                default: '0.0.0'
            },
            {
                name: 'description',
                message: '项目简介',
                default: this.description
            }
        ];
        this.prompt(prompts, function (answers) {
            this.appname = answers.appname.replace(/\s/g, '-');
            this.version = answers.version;
            this.description = answers.description.replace(/[\\\"]/g, '\\$1');
            this.user = user(this);
            done();
        }.bind(this));
    },

    writing: function () {
        this.template('_HISTORY.md', 'HISTORY.md');
        this.template('_package.json', 'package.json');
        this.template(this.templatePath('_LICENSE-MIT'), 'LICENSE-MIT');


        this.fs.copy(this.templatePath('_editorconfig'), '.editorconfig');
        this.fs.copy(this.templatePath('_gitignore'), '.gitignore');
        this.fs.copy(this.templatePath('_jshintrc'), '.jshintrc');

    },

    end: function () {
        //var that=this;
        //this.log(that.destinationPath());
        //async([],handleFold,function(){
        //
        //});

        //this.log(that.expandFiles('**',{dot:true,cwd:that.destinationPath()}));
        this.log('文件夹创建成功了!');
    }

});