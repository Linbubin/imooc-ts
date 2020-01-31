// declare function $(readFun: ()=>void):void
// declare function $(selector: string):{
//   html: (xml: string) => void
// }

// 可以改写成
interface Jquery{
  (readFun: () => void):void
  (selector: string) : {
    html: (xml: string) => void
  }
}

declare var $:Jquery