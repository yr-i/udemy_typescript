/* ジェネリクスの考え方 */
// 関数名と()の間に<>を追加して、型を引数にして受け取る
// 引数, 返り値の型, functionの中、どこにでも使える
// 関数宣言以外のアロー関数やメソッドでも使用可能
function copy<T>(val: T): T {
    return val;
}
console.log(copy<number>(32));
// 型推論がここでも効く
console.log(copy({name: 'string'}));
console.log(copy({name: 'string'}.name));


/* extends */
// 型パラメータに制約をつける
function copy2<T extends {name: string}>(val: T): T {
    return val;
}
// extendsすることで、string型のnameが必要になる
console.log(copy2({name: 31})); // エラーとなる
console.log(copy2({name2: 'string'})); // エラーとなる

/* keyof */
// オブジェクトのキーのユニオン型を作成する
// 1階層目のキーのみ取得可能
type K = keyof {name: string; age: number;};
function copy3<T extends {name: string}, U extends keyof T>(val: T, key: U): T {
    val[key];
    return val;
}
console.log(copy3({name: 'string', age: 38}, 'age'));
console.log(copy3({name: 'string', age: 38}, 'foo')); // fooはobjectに存在しないのでエラーとなる

/* Classに対してジェネリクスを使用する */
// dataに対してユニオン型だと、ユニオン型に指定した型ならなんでも引数にできてしまって、ゆるい
class LightDatabase<T extends string | number | boolean> {
    private data: T[] = [];
    add(item: T) {
        this.data.push(item);
    }
    remove(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}
const stringLightDatabase = new LightDatabase<string>();
// string以外の方はエラーとなる
stringLightDatabase.add('apple');
stringLightDatabase.add('banana');
stringLightDatabase.add('grape');
stringLightDatabase.remove('banana');
console.log(stringLightDatabase.get());

/* Interfaceに対してジェネリクスを使用する */
interface TmpDatabase<T> {
    id: number;
    data: T[];
}
type TmpDatabase2<T> = {
    id: number;
    data: T[];
}
const tmpDatabase: TmpDatabase<number> = {
    id: 1,
    data: [32]
}

/* Utility型 */
// 内蔵されているジェネリック型
// 型のライブラリ
interface Todo {
    title: string;
    text: string;
}
// Partial: 全てオプショナルプロパティになる
type Todoable = Partial<Todo>;
// Readonly: 全てReadonlyにする
type ReadonlyTodo = Readonly<Todo>;

// : Promise<string>を指定しないと、thenで受け取るdataはunkownになる
const fetchData: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 500);
});
fetchData.then(data => {});

const vegetables: Array<string> = ['TOMATO', 'cabbage'];

/* デフォルトの型パラメーターを指定する */
// = 型とすることでデフォルトにできる
interface ResponseData<T extends {message: string} = any> {
    data: T;
    status: number;
}
let tmp: ResponseData;

/* Mapped Types */
// 型のfor文
interface Vegetables {
    tomato: string;
    pumpkin: string;
}
type MappedTypes = {
    [P in 'tomato' | 'pumpkin']: P;
    [P in 'tomato' | 'pumpkin']: string;
    // 元になっているinterfaceのreadonlyや?の設定は引き継がれる
    [P in keyof Vegetables]: string;
    readonly [P in keyof Vegetables]: string;
    // デフォルトであるreadonlyを削除できる
    -readonly [P in keyof Vegetables]: string;
    [P in keyof Vegetables]?: string;
    [P in keyof Vegetables]-?: string;
}
// [P in 'tomato' | 'pumpkin']: P; は下記になる
// type MappedTypes = {
//     tomato: "tomato";
//     pumpkin: "pumpkin";
// }

/* Conditional Types */
// 型のif文
// 三項演算子のような考え方
// tomato型のものがstring型に入れることができたらnumberとなる
type ConditionalTypes = 'tomato' extends string ? number : boolean;
// infer R: ≒any なんでもいいということ マッチしたなら、extendsの前から型推論する
// type ConditionalTypesInfer = "tomato" となる
type ConditionalTypesInfer = {tomato: 'tomato'} extends {tomato: infer R} ? R : boolean;
// ユニオン型の場合は、分配される
// 相互にどっちもOKな場合に、numberとなる
// 下記の場合は、boolean
type DistributiveConditionalTypes = ('tomato' | 'pumpkin') extends 'tomato' ? number : boolean;
// ジェネリクスを使用するとユニオン型になる
type DistributiveConditionalTypes2<T> = T extends 'tomato' ? number : boolean;
let tmp2: DistributiveConditionalTypes2<'tomato' | 'pumpkin'>;
let tmp3: NonNullable<string | null>; // stringになる

/* テンプレートリテラル */
type FirstName = 'John';
type LastName = 'Lennon';
type UserName = `${FirstName}-${LastName}`;
type FirstName2 = 'John' | 'paul';
type LastName2 = 'Lennon';
type UserName2 = `${FirstName2}-${LastName2}`;