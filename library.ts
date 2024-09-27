import axios from 'axios';
import _ from 'lodash';
axios.get('https://fooapi.com')
console.log(_.shuffle([1, 2, 3, 4]));
namespace myApp {
  const hello = 'hello in namesapce';
  export const name = 'Quill';
  export interface Nameable {
    name: string;
  }
}
let nameable: myApp.Nameable;

// let name: string;
// function name() {}
// enum name {}
// class name { }
// interface name {
//   first(): void;
// }
// interface name {
//   first(): number;
// }
// let tmp: name;
// type name = {}
namespace name {
  const first: string = 'Peter';
}
namespace name {
  const first: string = 'Peter';
}