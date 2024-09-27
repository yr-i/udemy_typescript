type HumanType = {
    name: string;
    age: number;
}
// typeとほとんど変わらない
// interfaceはObjectのみ（一番のメリットでもある）
interface Human {
    name: string;
    age: number;
    // 下記二つの書き方は同等
    // メソッドのみに適用できる
    // greeting: (message: string) => void;
    greeting(message: string):void;
}
const human: Human= {
    name: 'name',
    age: 38,
    greeting(message: string) {
        console.log(message);
        
    }
}
// let tmpFunc(message: string):void; はできない

/* implements */
// クラスに対してinterfaceの条件を適用される
// 複数のinterface, type（objectのみ）を指定できる
// staticプロパティ, メソッドに対しては指定できない
// あくまでクラスが生成するインスタンスが持っているオブジェクトの形を表している
// abstractとの違いは？: interfaceは一切実装されていない（処理等）
// extendsとの違いは？: extendsはクラスを対象とする & extendsは一つしか指定できない
class Developer implements Human {
    // Humanで指定されているプロパティはprivateにはできない
    // このクラスで使用するプロパティの追加は可能
    constructor(public name: string, public age: number, experience: number) {}
    greeting(message: string): void {
        console.log(message);
    }
}

/* 構造的部分型 */
// 左辺の内容を含んでいれば、右辺の項目が多くても問題ない
const user: Human = new Developer('user', 37, 3);
const tmpDeveloper = {
    name: 'tmp',
    age: 38,
    experience: 3,
    greeting(message: string): void {
        console.log(message);
    }
}
const user_2: Human = tmpDeveloper;
// 直接指定の場合はexperienceにエラーが出る
const user_3: Human = {
    name: 'tmp',
    age: 38,
    experience: 3,
    greeting(message: string): void {
        console.log(message);
    }
}

/* readonly */
// interface や typeには readonlyの使用が可能
// interfaceをimplementsしたときのclassはinterface側のreadonlyを無視する

/* extends */
// interfaceを継承する
// interfaceへのextendsは複数可能
// typeをinterfaceに継承することも可能
interface Nameable {
    name: string;
}
interface Human_2 extends Nameable {
    // 継承したinterfaceと同じプロパティがあった場合、条件によっては上書きされる
    // 型に対して型を代入できない場合はエラー(name: number;等)
    name: string; 
    age: number;
    greeting(message: string):void;
}
class Developer_2 implements Human_2 {
    // 継承したNameableのプロパティ（name）がないとエラーとなる
    constructor(public name: string, public age: number, experience: number) {}
    greeting(message: string): void {
        console.log(message);
    }
}

/* 関数型の表現 */
// わかりやすい・読みやすいため、基本的にはtypeの方がいい
// なんで書けるの?: 関数はobjectなので、interfaceでも書ける
// type addFunc = (num1: number, num2: number) => number;
// コールシグネチャと呼ぶ
interface addFunc {
    (num1: number, num2: number):number;
    // プロパティの追加も可能
    foo: string;
}
let addF: addFunc;
addF = (n1, n2) => {
    return n1 + n2;
};

interface addFunc_2 {
    // コンストラクタシグネチャ
    // コンストラクタ関数として使用できる
    new(num1: number, num2: number):number;
    foo: string;
}
function ex(func: addFunc_2) {
    new func(1,2);
}

/* オプショナルプロパティ・オプショナルパラメーター */
// ? をつけることであってもなくてもいいプロパティとなる
// typeでも使用可能
interface Nameable_2 {
    name?: string;
    nickName?: string;
}
const anameable: Nameable_2 = {
    name: 'human',
    // nickNameはあってもなくてもいい
    nickName: 'nuuuu'
}
// extends, implementsしたときも同様
interface Human_3 extends Nameable_2 {
    age: number;
    greeting(message: string):void;
}
class Developer_3 implements Human_3 {
    // 初期化の必要がなくなる
    name?: string;
    constructor(public age: number, experience: number, initName?: string) {
        if(initName) {
            this.name = initName;
        }
    }
    // コンストラクター内にも記載可能
    // constructor(public age: number, experience: number, public name?: string) {}
    // ? をつけることであってもなくてもいいパラメーターとなる
    greeting(message?: string): void {
        if (message) {
            message.toUpperCase();
        }
        console.log(message);
    }
}