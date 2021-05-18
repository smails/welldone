# Smailsjob project

## ОРГХИМ
#### Первый запуск

0. npm -i - Установка node_modules
0. Выполнить иниструкции ниже для создания страницы index.html
0. gulp build - Компиляция страницы, стилей, скриптов
0. gulp server - Для запуска сервера
0. gulp fileindex - Создание index.html

#### Запуск проекта для работы
gulp - Запуск проекта для работы

#### index.html

Данная страница генерируется автоматически, для ее создаения необходимо: 

0. Код в файле node_modules\gulp-fileindex\index.js заменить на код, представленный ниже
0. Вписать url сервера в переменную server
0. Проверить наличие файла со стилями, находящемся в build\css\index.css
0. Проверить наличие папки screen и находящегося в нем файла mocup.png (build\screen)

#### gulp-fileindex\index.js
```js
'use strict';

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var through = require('through2');
var path = require('path');
var fs = require('fs');
var screenshot = require('webshot');
var createHTML = require('create-html');
var extend = require('extend');


var server = 'http://192.168.1.101:9600/';
var PLUGIN_NAME = 'gulp-fileindex';
var DEFAULT_OPTIONS = {
	onlyFilenames: false,
	showExtension: true
};
var DEFAULT_PAGE = 'index.html';

module.exports = function() {
	var options = arguments[0];
	var outputFilename = DEFAULT_PAGE;
	var fileName;
	var pagesFilenames = [];

	// If filename
	if (typeof options === 'string') {
		outputFilename = options || DEFAULT_PAGE;
		options = arguments[1];
	}

	// Options
	options = extend({}, DEFAULT_OPTIONS, options);

	if (typeof outputFilename === 'string') {
		fileName = outputFilename;
	} else if (typeof outputFilename.path === 'string') {
		fileName = path.basename(outputFilename.path);
	} else {
		throw new PluginError(PLUGIN_NAME, 'Missing path file for ' + PLUGIN_NAME);
	}
	var fileTitle = function(page){
		if (page != fileName){
			var elem = fs.readFileSync(path.resolve("build", page), {
				encoding: "utf-8"
			});
			var regexp = /<title.*?>*?<\/title>/gi;
			if (elem.length) {
				elem = elem.match(regexp);
				elem = elem[0].replace(/<\/?[^>]+>/g, '');
			}
			return elem;
		}
	};
	var screenShot = function(page, index){
		var options = {
			screenSize: {
				width: 1920,
				height: 1080
			},
			shotSize: {
				width: 1920,
				height: 1080
			}
			};
		var strem = screenshot(server + page, options);
		var file = fs.createWriteStream(path.resolve('build/screen', 'file'+ index +'.png'), {
			encoding: 'binary'
		});
		strem.on('data', function (data) {
			file.write(data.toString('binary'), 'binary');
		});
	};
	// buildLinks
	var buildLinks = function(pages) {
		var arr = [];
		for(var i = 0; i < pages.length; i++){
            if (pages[i] != fileName) {
				screenShot(pages[i], i);
                var elemTilte = fileTitle(pages[i]);
                arr.push(`<a class="page-index-links__link" href="${pages[i]}" class="page-index-links__box"><p>${elemTilte}</p><div class="img"><img src="/screen/file${i}.png"></div></a>`);
            }
		}
		return arr.join('');
	};
	// bufferFile
	var bufferFile = function(file, enc, cb, ) {
		if (file.isNull()) {
			cb();
			return;
		}
		pagesFilenames.push(file.relative);
		cb();
	};
	// endStream
	var endStream = function(cb) {
		if (pagesFilenames.length === 0) {
			cb();
			return;
		}
		var html = createHTML({
				title: 'Ситикард',
				css: '/css/index.css',
				lang: 'rus',
				dir: 'rtl',
				head: '<meta name = "robots" content = "noindex, nofollow" >',
				body: '<div class="page-index-text">Страницы проекта</div><div class="page-index-links" >' + buildLinks(pagesFilenames) + '</div>',
				favicon: '/images/favicon/favicon.ico'
		});
		fs.writeFile(path.resolve('build', fileName), html, "utf8", (err) => {
				if (err) throw err;
				console.log("The file was succesfully saved!");
		});
		cb();
	};

	return through.obj(bufferFile, endStream);
};

```
