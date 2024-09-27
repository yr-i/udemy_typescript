/* boolean */
let hasValue: boolean = true;
// NG: let hasValue: boolean = 'string';

/* number */
let count: number = 10;
let float: number = 3.14;
let negative: number = -3.14;
// NG: let hasValue: boolean = true;

/* string */
let single: string = 'hello';
let double: string = "hello";
let back: string = `hello`;
// NG: let hasValue: boolean = 10;

/* object */
const person: {
    name: string;
    age: number;
} = {
    name: 'jack',
    age: 21
}
const person2 = {
    name: {
        first: 'jack',
        last: 'Smith'
    },
    age: 21
}
// 過不足はNG

/* array */
const fruits: string[] = ['Apple', 'Banana', 'Grape'];
// NG: 指定した型以外の値

/* tuple */
// const book = ['business', 1500, false];
// 型推論だと、string, number, boolean を全ての番号で許容する配列になってしまう
const book: [string, number, boolean] = ['business', 1500, false];
book[1] = 700;
// NG: book[1] = 'number';
// 初期値の代入には厳しいが、pushはできる（参照するときに型エラーが出る）

/* enum */
enum CoffeeSize {
    SHORT = 'SHORT',
    TALL = 'TALL',
    GRANDE = 'GRANDE',
    VENTI = 'VENTI'
}
// = ** を明示的に示さなければ、0から数字が当てられる
const coffee = {
    hot: true,
    size: CoffeeSize.TALL
}
coffee.size = CoffeeSize.GRANDE;
// objectから値を型推論する方法だとstringになってしまい、特定の文字列とまでは制限できない
// 特定のまとまったグループの値のみを扱いたい時に使える

/* any */
// なんでも値に入れられる
// any以外の型が定義されている変数にも、anyの値は代入できる
// なるべく避けたい

/* union */
// 複数の型を受け入れる
// 入っている値によって使用できるメソッドを判断してくれる
let unionType: number | string = 10;
unionType = 'string';
let unionTypes: (number | string)[] = [21, 'hello'];

/* literal */
// 特定の決まった値のみを扱える
// const を使用すると、型推論時にもリテラル型として推論してくれる
const apple: 'apple' = 'apple';
const greenApple = 'greenApple';
let mrsGreenApple = 'mrsGreenApple';
// NG: const apple: 'apple' = 'hello';
// union型と一緒に使うと便利
let clothSize: 'small' | 'medium' | 'large' = 'small';
// NG: let clothSize: 'small' | 'medium' | 'large' = 'tall';
const cloth: {
    color: string;
    size: 'small' | 'medium' | 'large';
} = {
    color: 'white',
    size: clothSize
}
// ※型指定を入れないとsizeはlargeのリテラルしか受け入れなくなる
// リテラル型 * ユニオン型で使用する方が、Enumを使用するよりライトに使える

/* typeエイリアス */
type ClothSize = 'small' | 'medium' | 'large';
const cloth2: {
    color: string;
    size: ClothSize;
} = {
    color: 'white',
    size: clothSize
}

/* 関数宣言の型定義 */
// パラメータと戻り値に型が必要
// パラメータには型推論が効かない
// 戻り値は型推論でOK, ドキュメントのためや明示的に示したい場合のみ指定で良い
function add(num1: number, num2: number): number {
    return num1 + num2;
}
add(2, 3);
// NG: add('string', 'hello');

/* 関数の返り値 void */
// 基本的には、undefinedは使用できない・しない（returnを記載した時のみ、使用はできる）
function hello(): void {
    console.log('hello');
}
// console.log(hello());をすると、undefinedとなる

/* 関数の型注釈 */
// 左辺・右辺どちらかに型注釈があれば、推論される
const anotherAdd: (n1: number, n2: number) => number = add;
const anotherAdd2: (n1: number, n2: number) => number = function (num1: number, num2: number): number {
    return num1 + num2;
}
const doubleNumber: (mum: number) => number = mum => mum * 2;
// const doubleNumber2 = (mum: number): number => mum * 2; も可能だがアロー関数の恩恵が少なくなるかも

/* callback関数の型 */
// callbackの返り値にvoidを指定した場合、使用しようとするとエラーになる
// そのため、呼び出し元での指定は、何を返しても無視する
function doubleAndHandle(num: number, cb: (num: number) => number): void {
    const doubleNum = cb(num * 2);
    console.log(doubleNum);
}
doubleAndHandle(21, doubleNum => {
    return doubleNum;
})

/* unknown */
// anyと似ていて、何でも入れることができる
// any: どんな型の変数にも値として代入することも可能
// unknown: 変数に代入では、注意が必要・型をを条件分岐等で制限する必要がある
let unknownInput: unknown;
let anyInput: any;
let text: string;
unknownInput = 'hello';
unknownInput = 21;
unknownInput = true;
text = anyInput;
if (typeof unknownInput === 'string') {
    text = unknownInput;

}

/* never */
// 決して何も返さない
// 型推論: 関数宣言の場合は、voidになる / 関数式で書いた場合は、neverになる
function err(message): never {
    throw new Error(message);
    // while(true){}; とかも使用可能
}
// console.log(err('this is error'));をすると、返り値がない（undefinedもない）
