// import axios from 'axios';
// axios.get('https://fooapi.com')
// import _ from 'lodash';
// console.log(_.shuffle([1, 2, 3, 4]));
var myApp;
(function (myApp) {
    var hello = 'hello in namesapce';
    myApp.name = 'Quill';
})(myApp || (myApp = {}));
var hello = myApp.name;
