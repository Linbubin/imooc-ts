// declare function $(readFun: ()=>void):void
// declare function $(selector: string):{
//   html: (xml: string) => void
// }

// 可以改写成
// interface Jquery{
//   (readFun: () => void):void
//   (selector: string) : {
//     html: (xml: string) => void
//   }
// }
// declare var $:Jquery


// 如果是引入的，就把declare放在最外部
declare module 'jquery'{
  interface Jquery{
    (readFun: () => void):void
    (selector: string) : {
      html: (xml: string) => void
    }
  }
 var $:Jquery
 export = $
}