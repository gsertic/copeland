(this.webpackJsonptreemap=this.webpackJsonptreemap||[]).push([[0],{14:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o),l=n(7),r=n.n(l),a=(n(14),n(2)),s=n.n(a),c=n(8),u=n.n(c),d=n(9),p=n.n(d),f=n(3),m=n(1);f.client.config.configureEditorPanel([{name:"source",type:"element"},{name:"dimension",type:"column",source:"source",allowMultiple:!0},{name:"measures",type:"column",source:"source",allowMultiple:!0}]),p()(s.a);var g=function(){const e=Object(f.useConfig)(),t=Object(f.useElementData)(e.source),n=Object(o.useRef)(),i=Object(o.useMemo)((()=>{const n=e.dimension,o=e.measures;if(!n||!o)return!1;let i=[];const l="__";function r(e,t){return e>0?a(e-1,t):void 0}function a(e,o){const i=r(e,o);let a="";return i&&(a=i+l),a+=n[e]+l+t[n[e]][o],a}if(null!==t&&void 0!==t&&t[n[0]]){for(let s=0;s<n.length;s++)for(let e=0;e<t[n[s]].length;e++){const l=t[n[s]][e],c=t[o[s]][e],u=a(s,e),d=r(s,e),p={id:u,name:l,value:c,...d&&{parent:d}};i[u]=p}let e=[],l=0;for(var s in i)e[l]=i[s],l++;return{title:{text:void 0},chart:{height:window.innerHeight,backgroundColor:"transparent"},plotOptions:{series:{animation:!1}},series:[{levels:[{level:1,colorByPoint:!0,borderWidth:6,levelIsConstant:!1,dataLabels:{enabled:!0,align:"left",verticalAlign:"top",style:{fontSize:"14px",fontWeight:"bold"}}}],type:"treemap",allowDrillToNode:!0,layoutAlgorithm:"squarified",dataLabels:{enabled:!0},data:e}]}}}),[e,t]);return Object(m.jsx)("div",{children:i&&Object(m.jsx)(u.a,{highcharts:s.a,options:i,ref:n})})};var h=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((t=>{let{getCLS:n,getFID:o,getFCP:i,getLCP:l,getTTFB:r}=t;n(e),o(e),i(e),l(e),r(e)}))};r.a.render(Object(m.jsx)(i.a.StrictMode,{children:Object(m.jsx)(g,{})}),document.getElementById("root")),h()}},[[17,1,2]]]);
//# sourceMappingURL=main.49080118.chunk.js.map