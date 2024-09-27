/* &（インターセクション型） */
// interfaceの場合は、extendsで複数指定する
type Engineer = {
    name: string;
    role: string;
}
type Blogger = {
    name: string;
    follower: number;
}
type EngineerBlogger = Engineer & Blogger;
const engineerUser: EngineerBlogger = {
    name: `engineerUser`,
    role: 'front-end',
    follower: 1000
}
type tmp = string & number; // never型になる
type NumberBoolean = number | boolean;
type StringNumber = string | number;
type Mix = NumberBoolean & StringNumber; // 両方重なっているnumber型となる

/* type guard: 条件分を使って型を絞り込む */
function toUpperCase(x: string | Number) {
    if(typeof x === 'string') {
        return x.toUpperCase();
    } else {
        return '';
    }
}
type NomadWorker = Engineer | Blogger;
function describeProfile (nomadWorker: NomadWorker) {
    // どちらの型も持っているnameにのみアクセスできる
    console.log(nomadWorker.name);
    // objectにroleが存在するか
    if ('role' in nomadWorker) {
        console.log(nomadWorker.role);
    }
    if ('follower' in nomadWorker) {
        console.log(nomadWorker.follower);
        
    }
}
class Dog {
    speak() {
        console.log('bow-wow');
    }
}
class Bird {
    speak() {
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
        
    }
}
type Pet = Dog | Bird;
function havePet(pet: Pet) {
    pet.speak();
    // classの場合はin以外に下記も使える
    if (pet instanceof Bird) {
        // Birdから作られたインスタンスのみ
        pet.fly();
    }
}
havePet(new Bird()); // flyも実行される
havePet(new Dog()); // flyは実行されない

/* タグ付きUnion */
// タグになるプロパティを入れて、型を絞り込む
// interfaceでも使用可能
class Dog_2 {
    kind: 'dog' = 'dog';
    speak() {
        console.log('bow-wow');
    }
}
class Bird_2 {
    kind: 'bird' = 'bird'
    speak() {
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
        
    }
}
type Pet_2 = Dog_2 | Bird_2;
function havePet_2(pet: Pet_2) {
    pet.speak();
    switch (pet.kind) {
        case 'bird': 
        pet.fly();
    }
}

/* as（型アサーション） */
// 手動で型を上書きする

// HTMLElement | nullが型になる
// HTMLElementの状態だと、inputのvalueを取得したりはできない（要素固有のプロパティが使えない）
const input = document.getElementById('input');

const input_2 = <HTMLInputElement>document.getElementById('input');
// JSXを使用する場合は、asの方が良い
// <>がHTMLと勘違いしやすいため
const input_3 = document.getElementById('input') as HTMLInputElement;
// (<HTMLInputElement>document.getElementById('input')).value や (document.getElementById('input') as HTMLInputElement).value も可能

/* !（non null assertion operator） */
// nullじゃないと言い切る
// 基本的には、if文での分岐の方が良いが、冗長になる場合は使うのもOK
const input_4 = document.getElementById('input')!;

/* インデックスシグネチャ */
// 柔軟なオブジェクトを作成する
// インデックスシグネチャを使用する場合は、型はインデックスシグネチャに合わせる必要がある
interface Designer {
    name: string;
    [index: string]: string;
}
const designer: Designer = {
    name: 'designer',
    role: 'role',
    fafa: 'fa'
}

/* 関数のオーバーロード */
// 戻り値の方を正しくTSに伝える
// 関数宣言でのみ使用可能（アロー関数等では使用不可）
// オーバーロードは上から適用されていく
// オーバーロードをした場合は、必要な返り値を全て指定する必要がある（実際のfunctionでの指定は考慮されない）
function toUpperCase_2(x: string): string;
function toUpperCase_2(x: number): number;
function toUpperCase_2(x: string | number): string | number {
    if(typeof x === 'string') {
        return x.toUpperCase();
    }
    return x;
}
// オーバーロードをしないと、型がstring | numberになる
const upperHello = toUpperCase_2('hello');
const upperHello_3 = toUpperCase_2(222);
// 使う度に型アサーションを記載するのは大変
const upperHello_2 = toUpperCase_2('hello') as string;

// 下記でオーバーロード時の型が見れる
const upperHelloType = toUpperCase_2;
upperHelloType('hello');
upperHelloType(32);
interface TmpFunc {
    (x: string): number;
    (x: number): number;
}
// 下記のように記載したい場合は、全部の型に対応した形にしないといけない
const upperHello_4: TmpFunc = function(x: string | number) {return 0 };

interface FuncA {
    (x: number, y: string): number;
    (x: string, y: number): number;
}
interface FuncB {
    (x: string): number;
}
// このように書くとFuncAにFuncBの内容が追加されたような形になる
let intersectionFunc: FuncA & FuncB;
// 下記の場合は、上記と逆になる
// 上から優先されるので、使用するときは考慮が必要
let intersectionFunc_2: FuncB & FuncA;
// 全ての引数に当てはまる型定義が必要
intersectionFunc_2 = function(a: number | string, b?: number | string) {return 0};

/* Optional Chaining */
interface DownloadedData {
    id: number;
    user?: {
        name?: {
            first: string;
            last: string;
        }
    }
}
const downloadedData: DownloadedData = {
    id: 1
}
// undefinedのプロパティに対してエラーが発生してしまう
console.log(downloadedData.user.name);
// エラーを防ぐために ? を使える
console.log(downloadedData.user?.name?.first);

/* Nullish Coalescing */
// undefined, nullだった場合は、他の値を入れる
// or演算子を使用すると、空文字や0もfalseとして扱われてしまう
const userData = downloadedData.user ?? 'no-user';

/* LookUp型 */
type id = DownloadedData["id"];
// Optional Chainingを使用していなければ、階層構造内も可能
// type user = DownloadedData["user"]["name"];
// ユニオン型も可能
type id_user = DownloadedData["id" | "user"];
type StringArray = string[];
type ArrayValue = string[number]; // stringが返る 数字を入れてもOK
type TupleType = [string, number, boolean];
type TupleValue = TupleType[0]; // タプル型指定されている番号のみ指定可能
type TupleValue_number = TupleType[number]; // タプル型で指定している型がユニオン型ではいる

/* 型の互換性 */
let target: string = 'hello';
let source: 'hello' = 'hello';
target = source;
source = target; // targetはsting型で'hello'以外も入るのでNG

enum Color {
    RED,
    BLUE
}
let target_2 = Color.RED;
let source_2 = 100;
target_2 = source_2; // Enumとnumberには互換性あり

let target_3 = function (a: string, b: string) {};
let source_3 = function (a: string) {}; // target_3より引数が多いとNG
target_3 = source_3;

class AdvancedPerson {
    name: string = 'peter';
    // privateやprotectedがある場合は、基本的に同じインスタンスでないとNG
    // private age: number = 35

}
class AdvancedCar {
    name: string = 'prius';
    // age: number = 5;
}
let target_4 = new AdvancedPerson(); // こっちの方が詳細度が高いとエラーとなる
let source_4 = new AdvancedCar();
target_4 = source_4; 

/* 関数型のユニオン型 */
// パラメータがインターセクション型、戻り値はユニオン型になる
interface FuncA_2 {
    (x: number): number;
}
interface FuncB_2 {
    (x: string): string;
}
let unionFunc: FuncA_2 | FuncB_2;
unionFunc(); // (x: never) => string | number となる
// FuncA_2, FuncB_2のどちらかは使用可能
// unionFunc = function (a: never) { return 'hi'}; はNG
unionFunc = function (a: string) { return 'hi'};
unionFunc('hi');
unionFunc = function (a: number) { return 0};
unionFunc(0);

/* 配列とタプルにreadonly修飾子をつける */
// 型の部分に追記する
function advanceFnc(...arg: readonly[number, string, number]) {
    arg.push(); // readonlyだから追加できなくなる
}

/* constアサーション */
const milk = 'milk' as const;
let drink = milk;
// 下記の場合は、型推論が異なる
// 基本的に定数になり、変更できなくなる
const array1 = [10, 20]; // array: number[]
const array2 = [10, 20] as const; // array: readonly [10, 20]
const peter = {
    name: 'peter',
    age: 38
} as const;

/* 型の中でtypeofを使用する */
// peter（変数）の型を取得したい場合に使用できる
type PeterType = typeof peter;