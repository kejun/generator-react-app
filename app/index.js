'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ReactAppGenerator = module.exports = function ReactAppGenerator() {
  yeoman.generators.Base.apply(this, arguments);
  this.on('end', function() {
    this.installDependencies();
  });
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ReactAppGenerator, yeoman.generators.Base);

ReactAppGenerator.prototype.askFor = function app() {
  var cb = this.async();
  console.log("Hi, 准备开始一个基于React的项目!");
  var appName = path.basename(process.cwd());
  var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: '应用的名字?',
        default: appName
      },
      { 
        type: 'list',
        name: 'appFramework',
        message: '选择React应用框架:',
        choices: [
          { name: 'react-touch', value: 'useReactTouch' },
          { name: '不用', value: 'onlyReact' }
        ],
        default: 1
      },
      {
        type: 'confirm',
        name: 'useFlux',
        message: '是否用Flux? (复杂应用推荐使用)'
      }
    ];
  
  this.prompt(prompts, function(e) {
    this.appName = e.appName;
    this.useLibZyngaScroller = this.useReactTouch = (e.appFramework == 'useReactTouch');
    this.useFlux = e.useFlux;
    cb();
  }.bind(this));
};

ReactAppGenerator.prototype.app = function app() {
  this.mkdir('js');
  this.mkdir('js/utils');
  this.mkdir('js/components');
  this.mkdir('css');
  this.mkdir('pics');
  this.mkdir('build');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_webpack.config.js', 'webpack.config.js');
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_gitignore', '.gitignore');
  this.copy('_gulpfile.js', 'gulpfile.js');

  if (this.useReactTouch) {
    this.mkdir('js/pages');
    this.copy('react-touch-src/js/app.js',        'js/app.js');
    this.copy('react-touch-src/js/RootPage.js',   'js/pages/RootPage.js');
    this.copy('react-touch-src/js/HomePage.js',   'js/pages/HomePage.js');
    this.copy('react-touch-src/js/Layout.js',     'js/pages/Layout.js');
    this.copy('react-touch-src/js/LaunchPage.js', 'js/pages/LaunchPage.js');
    this.copy('react-touch-src/js/ErrorPage.js',  'js/pages/ErrorPage.js');
    this.copy('react-touch-src/css/index.scss',   'css/index.scss');
  } else {
    this.copy('src/js/app.js',      'js/app.js');
    this.copy('src/css/index.scss', 'css/index.scss');
  }

  if (this.useFlux) {
    this.mkdir('js/actions');
    this.mkdir('js/dispatcher');
    this.mkdir('js/stores');
    this.copy('flux-src/js/AppActions.js',    'js/actions/AppActions.js');
    this.copy('flux-src/js/ActionType.js',    'js/actions/ActionType.js');
    this.copy('flux-src/js/AppDispatcher.js', 'js/dispatcher/AppDispatcher.js');
    this.copy('flux-src/js/Dispatcher.js',    'js/dispatcher/Dispatcher.js');
    this.copy('flux-src/js/AppStores.js',     'js/stores/AppStores.js');
  }

  this.template('_index.html', 'build/index.html');
};

ReactAppGenerator.prototype.npmInit = function npmInit() {
  var cb = this.async();
  this.spawnCommand('npm', ['init'], cb).on('exit', cb);
};
