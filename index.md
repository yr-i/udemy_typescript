# Udemy
TypeScriptはJavaScriptの上位互換

## なぜTypeScriptなのか
### ドキュメントとしての側面
半自動的に変数・関数の使い方までがわかる
チーム・未来の自分が見やすいコードになる
コード補完でコーディング効率UP
### Linterとしての側面
実行時ではなく、実行前（コンパイル時等）にエラーがわかる
コードが大きくなるほどエラーに気づきにくくなるが、実行前に半自動的に見てくれる
エラーが視覚的にわかるので、コーディング効率UP
"性的型システム" = 型つきのリンター
### ES5へのコンパイラとしての側面
JavaScriptの最新の仕様をすぐに取り入れることができる
"es6 compat table"でどこまで対応しているか確認できる（書けないわけではない）

## 型について
### 型注釈と型推論
型注釈: `:number`等で明示的に表す
型推論: 明示的に指定しなくても、右辺の値から推論してくれる
基本的に方推論を伝えるといい（冗長になるのを防ぐために）
型推論ができない時（初期化しないとき）や型推論が上手くいかない時に型注釈を使うと良い
### 各型について
type.tsに記載
### nullについて
一般的な方は全てnullを含む

## コンパイラについて
### watchモード
保存時に自動的にTSからJSにコンパイルする
`$ tsc index.ts -w` or `$ tsc index.ts --watch`
### 全てのファイルを一気にコンパイルするには？
下記コマンドを実行し、tsconfig.jsonを作成する
`$ tsc --init`
tsconfig.jsonが作成されると`$ tsc`で全てのファイルをコンパイルできるようになる
※`$ tsc index.ts`で実行した場合は、tsconfig.jsonを参照しない
### tsconfig.jsonの中身について
https://www.typescriptlang.org/tsconfig/
#### コンパイルするファイルを選ぶ
* exclude: 除外したいファイルの設定
  * 配列で指定する
  * パス・ワイルドカードの使用可能
  * なにか指定したい場合は、内容が記述した内容で上書きされるため、node_modulesも明示的に指定する必要がある
* include: コンパイルするファイルの指定
  * デフォルトでは、全て
  * includeしたものでも、excludeされいたら除外される
  * パス・ワイルドカードの使用可能
* files: コンパイルするファイルの指定
  * excludeに指定されていても、コンパイル可能
  * ワイルドカードの使用不可
  * 絶対パス or 相対パスのみ使用可能
#### target
コンパイルするJSのバージョン
指定しない場合は、es3
#### lib（library）
TSが用意している型の定義を指定する
コンパイル際に指定した定義を考慮してくれる
指定しないと、TSの定義ファイルが設定されないので、使用したいメソッド等でエラーが出る。('text'.toUpperCase()とか)
デフォルトはコメントアウトされていて、target設定によってlibのインストール内容が決まる
基本はデフォルト（コメントアウト）でOK
#### allowJs
JSをコンパイルの対象に含むか
JSがコンパイルされることによって、TSからコンパイルされるファイルと混合しないように、設定を考慮する必要がある（outDirとか）
#### checkJs
JSもTSのようにエラーをチェックするか
allowJsと一緒に使用する
#### jsx
Reactで使用する
#### declaration, declarationMap
型定義ファイル（.d.ts）を作成する
JSの型情報が載っている
プロジェクト（・ライブラリ）のドキュメントとなる（使い方がわかる）
#### sourceMap
TSとJSの架け橋になるファイル（.js.map）
ブラウザでTSを理解するようにするためのもの
JSからTSファイルを作り出す
#### outDir
JSの出力先を指定できる
指定した1つのディレクトリまとめてそこへ出力する
#### rootDir
出力する元ファイル（TS）のディレクトリを指定する
TSファイル全てを含んだディレクトリである必要がある
ディレクトリによって含まれないTSファイルがあると、エラーになる
指定すると、ディレクトリを保持したまま、outDirで指定したディレクトリに出力される
#### removeComments
TS内のコメント削除
#### noEmit
チェックをして、出力をしない
#### downlevelIteration
for-of等の反復処理でTSのエラーが出る可能性があるが、trueを指定すると考慮した形で出力される
targetがES3, ES5の時のみ使用できる
絵文字を処理したいとかの時にエラーが出たりする
#### noEmitOnError
エラーが発生したときに、何も出力しない
#### strict
下記設定を一括でtrueにする
詳細を記載していないが、strictFunctionTypes, useUnknownInCatchVariablesも一括で設定される
##### noImplicitAny
暗黙的なanyを許容しない
##### 　strictNullChecks
null型以外の型に対して、nullを入れられなくなる
（一般的な方は全てnullを含んでいる）
##### strictBindCallApply
call, apply, bind使用時に、functionのパラメータに対して型チェックを行う
##### strictPropertyInitialization
classで使用
##### noImplicitThis
thisが何を示しているかわからないときにエラーを出す
暗黙的にthisがanyになってしまう時など
##### alwaysStrict
"use strict"をつける
#### noUnUsedLocals
使っていないローカル変数に対してエラーを出す
#### unUsedParameters
使っていないパラメータに対してエラーを出す
#### noImplicitReturns
暗黙的なreturnはエラー
#### forceConsistentCasingInFileNames
ファイルの大文字・小文字を必ず区別するようにする
trueにしておけばOK
#### isolatedModules
TSファイルを独立した一つのファイルとして見たときに、解釈できないものがあったらエラーを出す
tsc以外の方法（バベル）等でコンパイルするときは、1ファイルのみ見てコンパイルするため
（tscは全ファイルを見てコンパイルする）
#### skibLibCheck
.d.tsファイルの型チェックをスキップする
外部のパッケージまでは見ない
（動作が軽くなる）
#### extends
別の設定ファイルを指定することができる
指定した設定ファイルの内容を引き継ぐことができる
extendsの設定 + ts.jsonの内容
文字列で記述
#### Projects
モノリポ
TSのプロジェクトを複数管理するときに使われる

## オブジェクト指向プログラミング
堅実世界のものに見立ててプログラミング
どのようにアプリケーションを作るかという方法の一つ
人間にとってわかりやすくロジックを分割する方法の一つ
### 作る方法
* オブジェクトリテラル
* Class
## Classについて
オブジェクトの設計図
Classから作られたオブジェクトはインスタントも呼ばれる
似たようなオブジェクトを複数作成するときに便利
### JSに出力されたら
es6: フィールド・型はなくなるが大体変わらない
es5: Classはないため、コンストラクタ関数に変換される

## interfaceについて
オブジェクトのみのタイプエイリアス（型の変数）

## ジェネリクス
型を引数として受け取ることができる

## デコレーター
クラスをデコレーションするもの
本質的には関数
クラスを受け取ってデコレーションする関数
= 開発者への機能
### 複数のデコレータを同時に使う
複数同時に使用可能
デコレータファクトリは上から下、
そこから得られたデコレーターは下から上に実行される

## prototypeについて
jsにて関数はobject
関数が持っているプロパティ
関数がコンストラクト関数として使われるときに、インスタンスへ引き継がれるもの

## PropertyDecoratorについて
object
ブラウザが裏側で持っているもの

## import
* 複数ファイルでimportされてもその中の処理は最初に読み込まれた1回のみ実行されている
* webpackとかを使用しない場合は、ファイルパスに`.js`が必要
  * `.js`と記載しても、ちゃんと`.ts`を見に行ってくれる
* webpackを使用する場合は、拡張子が不要
### 必要なexportされているもののみを取得
import { Foods } from "./foods.js";
### as: 別名をつける
import { Foods as FoodListable } from "./foods.js";
### *: 全てとってくる
import { * as interface } from "./interface.js";
### export defaultされているもの
import Foods from "./foods.js";
### Type-Only Imports: 型情報のみをとってくる
import type { Foodable } from "./interface.js";
import { Foods, type Foodable } from "./foods.js";

## export
### export 関数名や変数名: 名前付きexport
### export default 関数名や変数名
import時の名前の制約がなくなるのが懸念点
補完も効かない

## webpackを使う理由
* 各ファイルを一つのファイルにまとめる
* http通信を一括で行うため
  * →http通信がファイルごとに走るのを避ける
* コードの最適化のため
* いろんな種類のファイルを扱うため
* Hot Module Replacement付きのローカルサーバーを使うため
  * Hot Module Replacement: 保存時にブラウザへ反映する開発環境
### インストール
開発用のパッケージなので、--save-devで良い
### configファイル
ファイル名: webpack.config.js
```
const path = require('path');

module.exports = {
  entry: './dist/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
}
```
* entry: 開始するファイル
* output: 出力内容
  * filename: ファイル名
    * ファイル名の前に`[contenthash]`のようなhash値をつけることができる
      * = キャッシュされてアプリが更新されないことを防ぐ
  * path: 配置先
    * 絶対パスで記載する必要がある
* devtool
  * できることはいろいろある
  * inline-source-map: ソースマップの出力

### ts-loader
TypeScriptを直接webpackで扱う
ts-loaderと一緒にTypeScriptもインストールする必要がある
型チェックもしてくれる
ts.config.jsonの内容が連動している部分もある（targetとか）
```
const path = require('path');

module.exports = {
  entry: './src/food-app/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
```
* resolve: importのファイルパスに拡張子がなかった場合、左から順番に探して、解決してくれる
### webpack-dev-server
特に何も設定しないと、ファイル自体は作成しない
publicPathを指定すると、そこにファイルが出力される
```
const path = require('path');

module.exports = {
  entry: './src/food-app/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
```
### mode
各モードに分けてファイルを作成し、それぞれの設定を記載する
dev: webpack.dev.js
prod: webpack.prod.js

## index.d.ts
* .tsファイルがないと.d.tsファイルを読み込むようになる
* 型の情報のみが書かれている型定義ファイル
* tsconfig.jsonにて「declaration」をtrueにすると、自動で作成される
### .d.tsファイルファない場合
* 誰かが、packageの型定義ファイルを作っていないか調べる
  * types パッケージ名 で検索するとヒットする可能性がある
  * @types/package名にすると型定義ファイルをインストールできる
* それもなかった場合は、自分で作らないといけないけど、ほとんどそのような場合はない
