var B,v,pe,N,ne,ge,G,Z,J,K,U={},ve=[],Le=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ee=Array.isArray;function H(e,t){for(var _ in t)e[_]=t[_];return e}function ye(e){var t=e.parentNode;t&&t.removeChild(e)}function be(e,t,_){var n,o,i,a={};for(i in t)i=="key"?n=t[i]:i=="ref"?o=t[i]:a[i]=t[i];if(arguments.length>2&&(a.children=arguments.length>3?B.call(arguments,2):_),typeof e=="function"&&e.defaultProps!=null)for(i in e.defaultProps)a[i]===void 0&&(a[i]=e.defaultProps[i]);return R(e,a,n,o,null)}function R(e,t,_,n,o){var i={type:e,props:t,key:_,ref:n,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:o??++pe,__i:-1,__u:0};return o==null&&v.vnode!=null&&v.vnode(i),i}function T(e){return e.children}function W(e,t){this.props=e,this.context=t}function D(e,t){if(t==null)return e.__?D(e.__,e.__i+1):null;for(var _;t<e.__k.length;t++)if((_=e.__k[t])!=null&&_.__e!=null)return _.__e;return typeof e.type=="function"?D(e):null}function me(e){var t,_;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((_=e.__k[t])!=null&&_.__e!=null){e.__e=e.__c.base=_.__e;break}return me(e)}}function oe(e){(!e.__d&&(e.__d=!0)&&N.push(e)&&!j.__r++||ne!==v.debounceRendering)&&((ne=v.debounceRendering)||ge)(j)}function j(){var e,t,_,n,o,i,a,l;for(N.sort(G);e=N.shift();)e.__d&&(t=N.length,n=void 0,i=(o=(_=e).__v).__e,a=[],l=[],_.__P&&((n=H({},o)).__v=o.__v+1,v.vnode&&v.vnode(n),te(_.__P,n,o,_.__n,_.__P.namespaceURI,32&o.__u?[i]:null,a,i??D(o),!!(32&o.__u),l),n.__v=o.__v,n.__.__k[n.__i]=n,xe(a,n,l),n.__e!=i&&me(n)),N.length>t&&N.sort(G));j.__r=0}function ke(e,t,_,n,o,i,a,l,d,c,h){var r,g,f,y,C,m=n&&n.__k||ve,u=t.length;for(_.__d=d,Ue(_,t,m),d=_.__d,r=0;r<u;r++)(f=_.__k[r])!=null&&typeof f!="boolean"&&typeof f!="function"&&(g=f.__i===-1?U:m[f.__i]||U,f.__i=r,te(e,f,g,o,i,a,l,d,c,h),y=f.__e,f.ref&&g.ref!=f.ref&&(g.ref&&_e(g.ref,null,f),h.push(f.ref,f.__c||y,f)),C==null&&y!=null&&(C=y),65536&f.__u||g.__k===f.__k?(d&&!d.isConnected&&(d=D(g)),d=we(f,d,e)):typeof f.type=="function"&&f.__d!==void 0?d=f.__d:y&&(d=y.nextSibling),f.__d=void 0,f.__u&=-196609);_.__d=d,_.__e=C}function Ue(e,t,_){var n,o,i,a,l,d=t.length,c=_.length,h=c,r=0;for(e.__k=[],n=0;n<d;n++)a=n+r,(o=e.__k[n]=(o=t[n])==null||typeof o=="boolean"||typeof o=="function"?null:typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?R(null,o,null,null,null):ee(o)?R(T,{children:o},null,null,null):o.constructor===void 0&&o.__b>0?R(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o)!=null?(o.__=e,o.__b=e.__b+1,l=Te(o,_,a,h),o.__i=l,i=null,l!==-1&&(h--,(i=_[l])&&(i.__u|=131072)),i==null||i.__v===null?(l==-1&&r--,typeof o.type!="function"&&(o.__u|=65536)):l!==a&&(l===a+1?r++:l>a?h>d-a?r+=l-a:r--:l<a?l==a-1&&(r=l-a):r=0,l!==n+r&&(o.__u|=65536))):(i=_[a])&&i.key==null&&i.__e&&!(131072&i.__u)&&(i.__e==e.__d&&(e.__d=D(i)),Q(i,i,!1),_[a]=null,h--);if(h)for(n=0;n<c;n++)(i=_[n])!=null&&!(131072&i.__u)&&(i.__e==e.__d&&(e.__d=D(i)),Q(i,i))}function we(e,t,_){var n,o;if(typeof e.type=="function"){for(n=e.__k,o=0;n&&o<n.length;o++)n[o]&&(n[o].__=e,t=we(n[o],t,_));return t}e.__e!=t&&(_.insertBefore(e.__e,t||null),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType===8);return t}function Te(e,t,_,n){var o=e.key,i=e.type,a=_-1,l=_+1,d=t[_];if(d===null||d&&o==d.key&&i===d.type&&!(131072&d.__u))return _;if(n>(d!=null&&!(131072&d.__u)?1:0))for(;a>=0||l<t.length;){if(a>=0){if((d=t[a])&&!(131072&d.__u)&&o==d.key&&i===d.type)return a;a--}if(l<t.length){if((d=t[l])&&!(131072&d.__u)&&o==d.key&&i===d.type)return l;l++}}return-1}function re(e,t,_){t[0]==="-"?e.setProperty(t,_??""):e[t]=_==null?"":typeof _!="number"||Le.test(t)?_:_+"px"}function M(e,t,_,n,o){var i;e:if(t==="style")if(typeof _=="string")e.style.cssText=_;else{if(typeof n=="string"&&(e.style.cssText=n=""),n)for(t in n)_&&t in _||re(e.style,t,"");if(_)for(t in _)n&&_[t]===n[t]||re(e.style,t,_[t])}else if(t[0]==="o"&&t[1]==="n")i=t!==(t=t.replace(/(PointerCapture)$|Capture$/i,"$1")),t=t.toLowerCase()in e||t==="onFocusOut"||t==="onFocusIn"?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=_,_?n?_.u=n.u:(_.u=Z,e.addEventListener(t,i?K:J,i)):e.removeEventListener(t,i?K:J,i);else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t in e)try{e[t]=_??"";break e}catch{}typeof _=="function"||(_==null||_===!1&&t[4]!=="-"?e.removeAttribute(t):e.setAttribute(t,_))}}function ie(e){return function(t){if(this.l){var _=this.l[t.type+e];if(t.t==null)t.t=Z++;else if(t.t<_.u)return;return _(v.event?v.event(t):t)}}}function te(e,t,_,n,o,i,a,l,d,c){var h,r,g,f,y,C,m,u,p,b,S,$,A,E,L,P=t.type;if(t.constructor!==void 0)return null;128&_.__u&&(d=!!(32&_.__u),i=[l=t.__e=_.__e]),(h=v.__b)&&h(t);e:if(typeof P=="function")try{if(u=t.props,p=(h=P.contextType)&&n[h.__c],b=h?p?p.props.value:h.__:n,_.__c?m=(r=t.__c=_.__c).__=r.__E:("prototype"in P&&P.prototype.render?t.__c=r=new P(u,b):(t.__c=r=new W(u,b),r.constructor=P,r.render=ze),p&&p.sub(r),r.props=u,r.state||(r.state={}),r.context=b,r.__n=n,g=r.__d=!0,r.__h=[],r._sb=[]),r.__s==null&&(r.__s=r.state),P.getDerivedStateFromProps!=null&&(r.__s==r.state&&(r.__s=H({},r.__s)),H(r.__s,P.getDerivedStateFromProps(u,r.__s))),f=r.props,y=r.state,r.__v=t,g)P.getDerivedStateFromProps==null&&r.componentWillMount!=null&&r.componentWillMount(),r.componentDidMount!=null&&r.__h.push(r.componentDidMount);else{if(P.getDerivedStateFromProps==null&&u!==f&&r.componentWillReceiveProps!=null&&r.componentWillReceiveProps(u,b),!r.__e&&(r.shouldComponentUpdate!=null&&r.shouldComponentUpdate(u,r.__s,b)===!1||t.__v===_.__v)){for(t.__v!==_.__v&&(r.props=u,r.state=r.__s,r.__d=!1),t.__e=_.__e,t.__k=_.__k,t.__k.forEach(function(F){F&&(F.__=t)}),S=0;S<r._sb.length;S++)r.__h.push(r._sb[S]);r._sb=[],r.__h.length&&a.push(r);break e}r.componentWillUpdate!=null&&r.componentWillUpdate(u,r.__s,b),r.componentDidUpdate!=null&&r.__h.push(function(){r.componentDidUpdate(f,y,C)})}if(r.context=b,r.props=u,r.__P=e,r.__e=!1,$=v.__r,A=0,"prototype"in P&&P.prototype.render){for(r.state=r.__s,r.__d=!1,$&&$(t),h=r.render(r.props,r.state,r.context),E=0;E<r._sb.length;E++)r.__h.push(r._sb[E]);r._sb=[]}else do r.__d=!1,$&&$(t),h=r.render(r.props,r.state,r.context),r.state=r.__s;while(r.__d&&++A<25);r.state=r.__s,r.getChildContext!=null&&(n=H(H({},n),r.getChildContext())),g||r.getSnapshotBeforeUpdate==null||(C=r.getSnapshotBeforeUpdate(f,y)),ke(e,ee(L=h!=null&&h.type===T&&h.key==null?h.props.children:h)?L:[L],t,_,n,o,i,a,l,d,c),r.base=t.__e,t.__u&=-161,r.__h.length&&a.push(r),m&&(r.__E=r.__=null)}catch(F){t.__v=null,d||i!=null?(t.__e=l,t.__u|=d?160:32,i[i.indexOf(l)]=null):(t.__e=_.__e,t.__k=_.__k),v.__e(F,t,_)}else i==null&&t.__v===_.__v?(t.__k=_.__k,t.__e=_.__e):t.__e=Me(_.__e,t,_,n,o,i,a,d,c);(h=v.diffed)&&h(t)}function xe(e,t,_){t.__d=void 0;for(var n=0;n<_.length;n++)_e(_[n],_[++n],_[++n]);v.__c&&v.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(i){i.call(o)})}catch(i){v.__e(i,o.__v)}})}function Me(e,t,_,n,o,i,a,l,d){var c,h,r,g,f,y,C,m=_.props,u=t.props,p=t.type;if(p==="svg"?o="http://www.w3.org/2000/svg":p==="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),i!=null){for(c=0;c<i.length;c++)if((f=i[c])&&"setAttribute"in f==!!p&&(p?f.localName===p:f.nodeType===3)){e=f,i[c]=null;break}}if(e==null){if(p===null)return document.createTextNode(u);e=document.createElementNS(o,p,u.is&&u),i=null,l=!1}if(p===null)m===u||l&&e.data===u||(e.data=u);else{if(i=i&&B.call(e.childNodes),m=_.props||U,!l&&i!=null)for(m={},c=0;c<e.attributes.length;c++)m[(f=e.attributes[c]).name]=f.value;for(c in m)if(f=m[c],c!="children"){if(c=="dangerouslySetInnerHTML")r=f;else if(c!=="key"&&!(c in u)){if(c=="value"&&"defaultValue"in u||c=="checked"&&"defaultChecked"in u)continue;M(e,c,null,f,o)}}for(c in u)f=u[c],c=="children"?g=f:c=="dangerouslySetInnerHTML"?h=f:c=="value"?y=f:c=="checked"?C=f:c==="key"||l&&typeof f!="function"||m[c]===f||M(e,c,f,m[c],o);if(h)l||r&&(h.__html===r.__html||h.__html===e.innerHTML)||(e.innerHTML=h.__html),t.__k=[];else if(r&&(e.innerHTML=""),ke(e,ee(g)?g:[g],t,_,n,p==="foreignObject"?"http://www.w3.org/1999/xhtml":o,i,a,i?i[0]:_.__k&&D(_,0),l,d),i!=null)for(c=i.length;c--;)i[c]!=null&&ye(i[c]);l||(c="value",y!==void 0&&(y!==e[c]||p==="progress"&&!y||p==="option"&&y!==m[c])&&M(e,c,y,m[c],o),c="checked",C!==void 0&&C!==e[c]&&M(e,c,C,m[c],o))}return e}function _e(e,t,_){try{typeof e=="function"?e(t):e.current=t}catch(n){v.__e(n,_)}}function Q(e,t,_){var n,o;if(v.unmount&&v.unmount(e),(n=e.ref)&&(n.current&&n.current!==e.__e||_e(n,null,t)),(n=e.__c)!=null){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(i){v.__e(i,t)}n.base=n.__P=null}if(n=e.__k)for(o=0;o<n.length;o++)n[o]&&Q(n[o],t,_||typeof e.type!="function");_||e.__e==null||ye(e.__e),e.__c=e.__=e.__e=e.__d=void 0}function ze(e,t,_){return this.constructor(e,_)}function Re(e,t,_){var n,o,i,a;v.__&&v.__(e,t),o=(n=typeof _=="function")?null:t.__k,i=[],a=[],te(t,e=(!n&&_||t).__k=be(T,null,[e]),o||U,U,t.namespaceURI,!n&&_?[_]:o?null:t.firstChild?B.call(t.childNodes):null,i,!n&&_?_:o?o.__e:t.firstChild,n,a),xe(i,e,a)}B=ve.slice,v={__e:function(e,t,_,n){for(var o,i,a;t=t.__;)if((o=t.__c)&&!o.__)try{if((i=o.constructor)&&i.getDerivedStateFromError!=null&&(o.setState(i.getDerivedStateFromError(e)),a=o.__d),o.componentDidCatch!=null&&(o.componentDidCatch(e,n||{}),a=o.__d),a)return o.__E=o}catch(l){e=l}throw e}},pe=0,W.prototype.setState=function(e,t){var _;_=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=H({},this.state),typeof e=="function"&&(e=e(H({},_),this.props)),e&&H(_,e),e!=null&&this.__v&&(t&&this._sb.push(t),oe(this))},W.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),oe(this))},W.prototype.render=T,N=[],ge=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,G=function(e,t){return e.__v.__b-t.__v.__b},j.__r=0,Z=0,J=ie(!1),K=ie(!0);var q,k,O,le,X=0,Ce=[],I=[],w=v,ce=w.__b,se=w.__r,ae=w.diffed,de=w.__c,ue=w.unmount,fe=w.__;function Pe(e,t){w.__h&&w.__h(k,e,X||t),X=0;var _=k.__H||(k.__H={__:[],__h:[]});return e>=_.__.length&&_.__.push({__V:I}),_.__[e]}function We(e){return X=1,Ie($e,e)}function Ie(e,t,_){var n=Pe(q++,2);if(n.t=e,!n.__c&&(n.__=[$e(void 0,t),function(l){var d=n.__N?n.__N[0]:n.__[0],c=n.t(d,l);d!==c&&(n.__N=[c,n.__[1]],n.__c.setState({}))}],n.__c=k,!k.u)){var o=function(l,d,c){if(!n.__c.__H)return!0;var h=n.__c.__H.__.filter(function(g){return!!g.__c});if(h.every(function(g){return!g.__N}))return!i||i.call(this,l,d,c);var r=!1;return h.forEach(function(g){if(g.__N){var f=g.__[0];g.__=g.__N,g.__N=void 0,f!==g.__[0]&&(r=!0)}}),!(!r&&n.__c.props===l)&&(!i||i.call(this,l,d,c))};k.u=!0;var i=k.shouldComponentUpdate,a=k.componentWillUpdate;k.componentWillUpdate=function(l,d,c){if(this.__e){var h=i;i=void 0,o(l,d,c),i=h}a&&a.call(this,l,d,c)},k.shouldComponentUpdate=o}return n.__N||n.__}function Ve(e,t){var _=Pe(q++,3);!w.__s&&Be(_.__H,t)&&(_.__=e,_.i=t,k.__H.__h.push(_))}function je(){for(var e;e=Ce.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(V),e.__H.__h.forEach(Y),e.__H.__h=[]}catch(t){e.__H.__h=[],w.__e(t,e.__v)}}w.__b=function(e){k=null,ce&&ce(e)},w.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),fe&&fe(e,t)},w.__r=function(e){se&&se(e),q=0;var t=(k=e.__c).__H;t&&(O===k?(t.__h=[],k.__h=[],t.__.forEach(function(_){_.__N&&(_.__=_.__N),_.__V=I,_.__N=_.i=void 0})):(t.__h.forEach(V),t.__h.forEach(Y),t.__h=[],q=0)),O=k},w.diffed=function(e){ae&&ae(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Ce.push(t)!==1&&le===w.requestAnimationFrame||((le=w.requestAnimationFrame)||qe)(je)),t.__H.__.forEach(function(_){_.i&&(_.__H=_.i),_.__V!==I&&(_.__=_.__V),_.i=void 0,_.__V=I})),O=k=null},w.__c=function(e,t){t.some(function(_){try{_.__h.forEach(V),_.__h=_.__h.filter(function(n){return!n.__||Y(n)})}catch(n){t.some(function(o){o.__h&&(o.__h=[])}),t=[],w.__e(n,_.__v)}}),de&&de(e,t)},w.unmount=function(e){ue&&ue(e);var t,_=e.__c;_&&_.__H&&(_.__H.__.forEach(function(n){try{V(n)}catch(o){t=o}}),_.__H=void 0,t&&w.__e(t,_.__v))};var he=typeof requestAnimationFrame=="function";function qe(e){var t,_=function(){clearTimeout(n),he&&cancelAnimationFrame(t),setTimeout(e)},n=setTimeout(_,100);he&&(t=requestAnimationFrame(_))}function V(e){var t=k,_=e.__c;typeof _=="function"&&(e.__c=void 0,_()),k=t}function Y(e){var t=k;e.__c=e.__(),k=t}function Be(e,t){return!e||e.length!==t.length||t.some(function(_,n){return _!==e[n]})}function $e(e,t){return typeof t=="function"?t(e):t}var Oe=0;function s(e,t,_,n,o,i){t||(t={});var a,l,d=t;if("ref"in d)for(l in d={},t)l=="ref"?a=t[l]:d[l]=t[l];var c={type:e,props:d,key:_,ref:a,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--Oe,__i:-1,__u:0,__source:o,__self:i};if(typeof e=="function"&&(a=e.defaultProps))for(l in a)d[l]===void 0&&(d[l]=a[l]);return v.vnode&&v.vnode(c),c}const Ge=()=>s("div",{class:"bg-yellow-300 p-3",children:"Log Review"}),Je=()=>s("div",{class:"bg-yellow-300 p-3",children:"Log File Browser"}),Ke=(e,t=1,_=1)=>[...Array(e)].map((n,o)=>(o+t)*_),Qe=({file:{content:e="",name:t=""}={},filesChecked:_=!1,filesCheckeds:n=[],fileRead:o,message:i,loading:a,loadingList:l,reviewCheck:d=!0,doubleCheck:c=!0,deleting:h,directoryList:r=[],directoryActive:g,directoryPage:{items:f=[],page:y=1,pages:C=0,from:m=0,to:u=0,total:p=0}={},sizes:b=[10,15,20,30,40,50],size:S=15,onReviewCheck:$=()=>{},onDoubleCheck:A=()=>{},onMessageClose:E=()=>{},onPage:L=()=>{},onSize:P=()=>{},onDirectoryNext:F=()=>{},onDirectoryPrev:Se=()=>{},onDirectoryChange:He=()=>{},onSearch:Ne=()=>{},onFile:De=()=>{},onFilesCheck:Ae=()=>{},onDelete:Ee=()=>{}})=>s("div",{class:"p-3 flex-grow",children:[s("div",{class:"mb-3",children:[s("label",{children:[s("span",{class:"sr-only",children:"Directory"}),s("select",{onChange:He,value:g,class:"mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",children:[s("option",{children:"Select directory"}),r.map(x=>s("option",{value:x,children:x},x))]})]}),s("label",{class:"ms-3",children:[s("span",{class:"sr-only",children:"Search"}),s("input",{onKeyDown:Ne,placeholder:"Search file",type:"text",class:"mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"})]}),s("button",{type:"button",onClick:Ee,disabled:h||!(n!=null&&n.length),class:"ms-3 bg-red-300 hover:bg-red-400 active:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 py-2 px-5 rounded disabled:bg-red-100 disabled:text-gray-400",children:h?"Please wait...":`Delete Selected${(n==null?void 0:n.length)>0?` (${n.length})`:""}`}),s("label",{class:"ms-3 inline-flex items-center",children:[s("input",{checked:c,onClick:A,type:"checkbox",class:"rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"}),s("span",{class:"text-gray-700 ms-2",children:"Confirm before delete"})]}),s("label",{class:"ms-3 inline-flex items-center",children:[s("input",{checked:d,onClick:$,type:"checkbox",class:"rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"}),s("span",{class:"text-gray-700 ms-2",children:"Check while review"})]})]}),s("div",{class:"flex gap-3 h-full",children:[s("div",{class:"w-5/12",children:[s("table",{class:"border-collapse border border-slate-400 w-full",children:[s("thead",{children:s("tr",{children:[s("th",{class:"border border-slate-300 p-2 w-px",children:s("input",{type:"checkbox",disabled:h,checked:_,onClick:Ae})}),s("th",{class:"border border-slate-300 p-2",children:"File"}),s("th",{class:"border border-slate-300 p-2",children:"Last Modified"})]})}),s("tbody",{children:[!l&&f.map(x=>s("tr",{onClick:Fe=>De(Fe,x),children:[s("td",{class:"border border-slate-300 p-2",children:s("input",{type:"checkbox",disabled:h,checked:n==null?void 0:n.includes(x.name)})}),s("td",{class:"border border-slate-300 p-2",children:x.name}),s("td",{class:"border border-slate-300 p-2",children:x.mtime})]},x.name)),!l&&p<1&&s("tr",{children:s("td",{colspan:"3",class:"italic border border-slate-300 p-2",children:"No files"})}),l&&s("tr",{children:s("td",{colspan:"3",class:"italic border border-slate-300 p-2",children:"Please wait..."})})]})]}),s("div",{class:"flex mt-3",children:[s("div",{class:"italic",children:p>0&&s("p",{children:["Show ",m," – ",u," of ",p]})}),s("div",{class:"flex ms-auto gap-3 items-center",children:[s("label",{children:[s("span",{class:"text-gray-700 me-3",children:"Page"}),s("select",{onChange:L,value:y,class:"mt-1 py-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",children:Ke(C||y).map(x=>s("option",{value:x,children:x},x))})]}),s("label",{children:[s("span",{class:"text-gray-700 me-3",children:"Size"}),s("select",{onChange:P,value:S,class:"mt-1 py-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",children:b.map(x=>s("option",{value:x,children:x},x))})]}),s("button",{onClick:Se,disabled:y<=1,type:"button",class:"bg-slate-300 hover:bg-slate-400 active:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-300 py-1 px-3 rounded disabled:bg-slate-100 disabled:text-gray-400",children:"Prev"}),s("button",{onClick:F,disabled:y>=C,type:"button",class:"bg-slate-300 hover:bg-slate-400 active:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-300 py-1 px-3 rounded disabled:bg-slate-100 disabled:text-gray-400",children:"Next"})]})]})]}),s("div",{class:"w-7/12 bg-slate-100 p-3 rounded",children:[a&&s("p",{class:"italic my-3",children:["Loading file ",o,"..."]}),i&&s("div",{class:"bg-yellow-300 p-3 rounded mb-5",children:[s("button",{type:"button",onClick:E,class:"float-end rounded-full bg-slate-100 py-0.5 px-2",children:"x"}),s("p",{children:i})]}),s("p",{class:"italic border-b pb-1 mb-1",children:t||"Please select any file."}),e&&s("div",{class:"overflow-y-auto break-all whitespace-pre max-h-96",children:e})]})]})]}),Xe=({...e})=>s("div",{class:"flex flex-col h-screen",children:[s(Ge,{}),s(Qe,{...e}),s(Je,{})]}),z=async(e,t,_,n)=>{try{const o=new URLSearchParams({..._||{},action:e});return t&&o.set(e,t),await(await fetch(`?${o}`,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"post",body:n?JSON.stringify(n):null})).json()}catch(o){alert(`Request error: ${o.message}`)}},Ye=()=>{const[e,t]=We({page:1,size:15,sizes:[10,15,20,30,40,50],search:"",reviewCheck:!0,doubleCheck:!0,fileRead:null,filesChecked:!1,filesCheckeds:[]}),_=(u,p)=>t(b=>({...b,.../^o/.test(typeof u)?u:{[u]:p}})),n=async()=>{const{directories:u=[],size:p=e.size,sizes:b=e.sizes}=await z("init")||{};_({directoryList:u,size:p,sizes:b})},o=async u=>{_({loadingList:!0});const{directoryActive:p,size:b,page:S,search:$}={directoryActive:e.directoryActive,size:e.size,page:e.page,search:e.search,...u||{}},A=await z("directory",p,{size:b,page:S,search:$});_({...u||{},directoryPage:A,loadingList:!1})},i=u=>o({page:u.target.value}),a=u=>o({page:1,size:u.target.value}),l=u=>u.key=="Enter"&&o({page:1,search:u.target.value}),d=u=>o({page:1,directoryActive:u.target.value}),c=()=>o({page:e.page-1}),h=()=>o({page:e.page+1}),r=async(u,{name:p})=>{if(p!=e.fileRead){_({loading:!0,fileRead:p,message:""});const b=await z("file",p,{directory:e.directoryActive});_({loading:!1,file:b})}e.reviewCheck&&_({filesCheckeds:e.filesCheckeds.includes(p)?e.filesCheckeds.filter(b=>b!=p):[...e.filesCheckeds,p]})},g=async()=>{if(e.doubleCheck&&!confirm("Are you sure?"))return;_({deleting:!0,message:null});const u=await z("delete",e.directoryActive,null,{files:e.filesCheckeds});o({deleting:!1,message:(u==null?void 0:u.message)||"Unknown error",filesChecked:!1,filesCheckeds:[]})},f=u=>{var p;return _({filesCheckeds:u.target.checked?((p=e.directoryPage)==null?void 0:p.items.map(({name:b})=>b))||[]:[],filesChecked:!e.filesChecked})},y=()=>_({message:""}),C=u=>_({doubleCheck:!!u.target.checked}),m=u=>_({reviewCheck:!!u.target.checked});return Ve(()=>{n()},[]),s(T,{children:s(Xe,{...e,onDirectoryChange:d,onDirectoryPrev:c,onDirectoryNext:h,onSearch:l,onPage:i,onSize:a,onFile:r,onFilesCheck:f,onDelete:g,onMessageClose:y,onDoubleCheck:C,onReviewCheck:m})})};Re(be(Ye),document.body);