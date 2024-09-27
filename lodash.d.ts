import _ from 'lodash';
declare module 'lodash' {
  interface LoDashStatic {
    hello: string;
  }
}