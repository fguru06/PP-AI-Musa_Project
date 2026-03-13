import{K as fl,P as gl,v as l,F as i,B as e,C as w,H as te,I as ue,E as Oe,D as X,u as E,Q as he,M as et,G as R,L as ee,q as Je,R as ml,f as P,r as z,N as ce,O as Se,x as ut,S as Nt,w as Qe,n as bl,i as Cl,U as Sl,y as ht,T as Bt,V as Tt,z as $l,p as Il,J as pl}from"./vue-core-DCl8Fgqc.js";import{u as El,d as Al}from"./vue-ecosystem-Da9kls6U.js";import{u as it,M as yl,c as Ml,a as Pl,C as Tl,A as Bl,b as Nl}from"./ConfirmActionModal-UbfCKbFp.js";import{u as at,b as zl,g as zt,C as Wt,c as Ll,n as jl,p as _l,s as Dl,m as hl,f as xl,d as kl,e as ql,h as Gt,B as Rl,i as Ol,j as Fl,k as vl,a as wl}from"./projectStore-D5W54FMq.js";import{_ as Xe}from"./index-B3OLmzyI.js";import{P as Ul,S as Vl,C as Wl,a as Gl,M as Hl,_ as Yl,b as Jl,c as Ql,F as Xl,A as Kl,T as Zl,d as ei}from"./ProgressElement-yT9XnFeK.js";import{J as ti}from"./jszip-529iNPX7.js";function oi(A){function r(u){var f,H,ie,G,V,me,N,B,a,T,L,Y,m,F,ae,oe,ke;const c=u.ctrlKey||u.metaKey,p=u.key.toLowerCase(),h=u.target.tagName.toLowerCase(),k=h==="input"||h==="textarea"||u.target.isContentEditable;k&&c&&["c","v","x","a","z","y"].includes(p)||(c&&p==="z"&&!u.shiftKey?(u.preventDefault(),(f=A.undo)==null||f.call(A)):c&&(p==="y"||p==="z"&&u.shiftKey)?(u.preventDefault(),(H=A.redo)==null||H.call(A)):c&&p==="c"?(u.preventDefault(),(ie=A.copy)==null||ie.call(A)):c&&p==="v"?(u.preventDefault(),(G=A.paste)==null||G.call(A)):c&&p==="x"?(u.preventDefault(),(V=A.cut)==null||V.call(A)):c&&p==="d"?(u.preventDefault(),(me=A.duplicate)==null||me.call(A)):c&&p==="a"?(u.preventDefault(),(N=A.selectAll)==null||N.call(A)):p==="delete"||p==="backspace"?k||(u.preventDefault(),(B=A.delete)==null||B.call(A)):p==="escape"?(a=A.escape)==null||a.call(A):c&&p==="g"?(u.preventDefault(),(T=A.toggleGrid)==null||T.call(A)):c&&p==="="||c&&p==="+"?(u.preventDefault(),(L=A.zoomIn)==null||L.call(A)):c&&p==="-"?(u.preventDefault(),(Y=A.zoomOut)==null||Y.call(A)):c&&p==="0"?(u.preventDefault(),(m=A.zoomReset)==null||m.call(A)):p==="arrowleft"?(F=A.nudge)==null||F.call(A,-1,0):p==="arrowright"?(ae=A.nudge)==null||ae.call(A,1,0):p==="arrowup"?(oe=A.nudge)==null||oe.call(A,0,-1):p==="arrowdown"&&((ke=A.nudge)==null||ke.call(A,0,1)))}fl(()=>window.addEventListener("keydown",r)),gl(()=>window.removeEventListener("keydown",r))}const ni={class:"slide-panel"},li={class:"slide-panel-header"},ii={class:"slide-count"},ai={class:"slides-list"},si=["onClick","onContextmenu","onDragstart","onDrop"],ri={class:"slide-number"},di=["viewBox"],ui=["x","y","width","height","fill"],ci=["d","stroke"],pi=["d","fill"],vi={class:"slide-footer"},fi={class:"slide-title"},gi=["onClick"],mi={__name:"SlidePanel",setup(A){const r=it(),u=at(),c=P(()=>u.getProject(r.projectId)),p=P(()=>zt(c.value)),h=P(()=>{var O,U;return((U=(O=c.value)==null?void 0:O.slides)==null?void 0:U.slice().sort((pe,be)=>pe.order-be.order))||[]}),k=z({show:!1,x:0,y:0,slideId:null});function f(O){r.setCurrentSlide(O)}function H(){const O=h.value.findIndex(pe=>pe.id===r.currentSlideId),U=u.addSlide(r.projectId,O);U&&r.setCurrentSlide(U.id)}function ie(O){var be,le;const U=h.value.findIndex(we=>we.id===O);u.deleteSlide(r.projectId,O);const pe=((be=c.value)==null?void 0:be.slides)||[];if(pe.length>0){const we=pe.slice().sort((j,D)=>j.order-D.order),C=Math.min(U,we.length-1);r.setCurrentSlide((le=we[C])==null?void 0:le.id)}}function G(O,U){O.preventDefault(),k.value={show:!0,x:O.clientX,y:O.clientY,slideId:U},setTimeout(()=>window.addEventListener("click",V,{once:!0}),0)}function V(){k.value.show=!1}function me(){const O=u.duplicateSlide(r.projectId,k.value.slideId);O&&r.setCurrentSlide(O.id),V()}function N(){ie(k.value.slideId),V()}function B(O,U){O.stopPropagation(),ie(U)}function a(){const O=h.value.findIndex(U=>U.id===k.value.slideId);O>0&&u.reorderSlides(r.projectId,O,O-1),V()}function T(){const O=h.value.findIndex(U=>U.id===k.value.slideId);O<h.value.length-1&&u.reorderSlides(r.projectId,O,O+1),V()}let L=-1;function Y(O,U){L=U,O.dataTransfer.effectAllowed="move"}function m(O,U){O.preventDefault(),L!==-1&&L!==U&&u.reorderSlides(r.projectId,L,U),L=-1}function F(O){return O.backgroundType==="gradient"&&O.backgroundGradient?{background:O.backgroundGradient}:O.backgroundType==="image"&&O.backgroundImage?{backgroundImage:`url(${O.backgroundImage})`,backgroundSize:"cover"}:{background:O.background||"#fff"}}function ae(O){return{left:O.x/p.value.width*100+"%",top:O.y/p.value.height*100+"%",width:O.width/p.value.width*100+"%",height:O.height/p.value.height*100+"%"}}function oe(O){var U,pe;return{background:O.type==="shape"?(U=O.content)==null?void 0:U.fillColor:O.type==="button"?"var(--color-primary)":"rgba(0,0,0,.1)",borderRadius:O.type==="shape"&&((pe=O.content)==null?void 0:pe.shapeType)==="circle"?"50%":void 0}}function ke(O){var U;return zl(O.content||{},O.width||420,O.height||280,((U=c.value)==null?void 0:U.theme)||{})}return(O,U)=>(l(),i("div",ni,[e("div",li,[U[2]||(U[2]=e("span",{class:"panel-section-title"},"Slides",-1)),e("span",ii,w(h.value.length),1),e("button",{class:"btn btn-icon add-slide-btn",onClick:H,"data-tooltip":"Add slide","aria-label":"Add slide"},[...U[1]||(U[1]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e("line",{x1:"5",y1:"12",x2:"19",y2:"12"})],-1)])])]),e("div",ai,[(l(!0),i(te,null,ue(h.value,(pe,be)=>(l(),i("div",{key:pe.id,class:X(["slide-thumb-item",E(r).currentSlideId===pe.id&&"active"]),draggable:"true",onClick:le=>f(pe.id),onContextmenu:le=>G(le,pe.id),onDragstart:le=>Y(le,be),onDragover:U[0]||(U[0]=Oe(()=>{},["prevent"])),onDrop:le=>m(le,be)},[e("div",ri,w(be+1),1),e("div",{class:"slide-thumb",style:he(F(pe))},[(l(!0),i(te,null,ue(pe.elements.slice(0,6),le=>{var we;return l(),i("div",{key:le.id,class:"mini-element-frame",style:he(ae(le))},[le.type==="chart"?(l(),i("svg",{key:0,class:"mini-chart-svg",viewBox:`0 0 ${le.width||420} ${le.height||280}`,preserveAspectRatio:"none"},[ke(le).type==="bar"?(l(!0),i(te,{key:0},ue(ke(le).cartesian.bars,C=>(l(),i("rect",{key:`mini-bar-${C.id}`,x:C.x,y:C.y,width:C.width,height:C.height,fill:C.color,rx:"6"},null,8,ui))),128)):ke(le).type==="line"?(l(),i("path",{key:1,d:ke(le).cartesian.linePath,stroke:((we=ke(le).cartesian.points[0])==null?void 0:we.color)||"#6c47ff","stroke-width":"10",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},null,8,ci)):(l(!0),i(te,{key:2},ue(ke(le).circle.slices,C=>(l(),i("path",{key:`mini-slice-${C.id}`,d:C.path,fill:C.color},null,8,pi))),128))],8,di)):(l(),i("div",{key:1,class:"mini-element",style:he(oe(le))},null,4))],4)}),128))],4),e("div",vi,[e("div",fi,w(pe.title||`Slide ${be+1}`),1),h.value.length>1?(l(),i("button",{key:0,class:"slide-delete-btn",title:"Delete slide","aria-label":"Delete slide",onClick:le=>B(le,pe.id)},[...U[3]||(U[3]=[et('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-30eea542><polyline points="3 6 5 6 21 6" data-v-30eea542></polyline><path d="M19 6l-1 14H6L5 6" data-v-30eea542></path><path d="M10 11v6M14 11v6" data-v-30eea542></path><path d="M9 6V4h6v2" data-v-30eea542></path></svg>',1)])],8,gi)):R("",!0)])],42,si))),128))]),e("button",{class:"add-slide-bottom",onClick:H},[...U[4]||(U[4]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e("line",{x1:"5",y1:"12",x2:"19",y2:"12"})],-1),ee(" Add Slide ",-1)])]),(l(),Je(ml,{to:"body"},[k.value.show?(l(),i("div",{key:0,class:"context-menu",style:he({left:k.value.x+"px",top:k.value.y+"px"})},[e("button",{class:"ctx-item",onClick:me},"Duplicate"),e("button",{class:"ctx-item",onClick:a},"Move Up"),e("button",{class:"ctx-item",onClick:T},"Move Down"),U[5]||(U[5]=e("div",{class:"ctx-divider"},null,-1)),e("button",{class:"ctx-item danger",onClick:N},"Delete Slide")],4)):R("",!0)]))]))}},bi=Xe(mi,[["__scopeId","data-v-30eea542"]]),yi={class:"blocks-panel"},hi={class:"blocks-panel-header"},xi={class:"blocks-toolbar"},ki={class:"blocks-categories"},wi=["onClick"],Ci={class:"blocks-panel-body"},Si={class:"blocks-save-card"},$i=["disabled"],Ii={class:"blocks-list"},Ei=["onDragstart"],Ai={class:"block-thumb-stage"},Mi={class:"block-card-body"},Pi={class:"block-card-head"},Ti={class:"block-name"},Bi={class:"block-meta"},Ni={key:0},zi={key:1},Li=["onClick"],ji={class:"block-description"},_i={key:0,class:"block-binding-note"},Di={class:"block-tags"},qi=["onClick"],Ri={class:"binding-modal-body"},Oi={class:"binding-modal-intro"},Fi=["for"],Ui=["id","onUpdate:modelValue"],Vi={__name:"BlocksPanel",setup(A){const r=it(),u=at(),c=z(""),p=z("all"),h=z(""),k=z("Custom"),f=z(!1),H=z(null),ie=z({}),G=P(()=>u.getProject(r.projectId)),V=P(()=>{var C,j;return(j=(C=G.value)==null?void 0:C.slides)==null?void 0:j.find(D=>D.id===r.currentSlideId)}),me=P(()=>u.getContentBlocks(r.projectId)),N=P(()=>{const C=new Set(["all"]);return me.value.forEach(j=>C.add(j.category||"Custom")),Array.from(C)}),B=P(()=>{var j;const C=new Set(r.selectedElementIds);return(((j=V.value)==null?void 0:j.elements)||[]).filter(D=>C.has(D.id))}),a=P(()=>{var C;return Array.isArray((C=H.value)==null?void 0:C.bindings)?H.value.bindings:[]}),T=P(()=>{const C=c.value.trim().toLowerCase();return me.value.filter(j=>p.value==="all"||(j.category||"Custom")===p.value?C?[j.name,j.description,j.category,...j.tags||[]].join(" ").toLowerCase().includes(C):!0:!1)});function L(C){const j=Array.isArray(C==null?void 0:C.elements)?C.elements:[];if(!j.length)return{minX:0,minY:0,width:1,height:1};const D=Math.min(...j.map(Ie=>Number(Ie.x||0))),K=Math.min(...j.map(Ie=>Number(Ie.y||0))),xe=Math.max(...j.map(Ie=>Number(Ie.x||0)+Number(Ie.width||0))),ze=Math.max(...j.map(Ie=>Number(Ie.y||0)+Number(Ie.height||0)));return{minX:D,minY:K,width:Math.max(1,xe-D),height:Math.max(1,ze-K)}}function Y(C,j){const D=L(C);return{left:`${(Number(j.x||0)-D.minX)/D.width*100}%`,top:`${(Number(j.y||0)-D.minY)/D.height*100}%`,width:`${Number(j.width||0)/D.width*100}%`,height:`${Number(j.height||0)/D.height*100}%`}}function m(C){var j,D,K,xe,ze,Ie,je;return C.type==="shape"?{background:((j=C.content)==null?void 0:j.fillColor)||"#cbd5e1",borderRadius:((D=C.content)==null?void 0:D.shapeType)==="circle"?"50%":`${Number(((K=C.content)==null?void 0:K.borderRadius)||10)}px`,border:`${Math.max(0,Number(((xe=C.content)==null?void 0:xe.borderWidth)||0))}px solid ${((ze=C.content)==null?void 0:ze.borderColor)||"transparent"}`}:C.type==="button"?{background:((Ie=C.content)==null?void 0:Ie.bgColor)||"#6c47ff",borderRadius:`${Number(((je=C.content)==null?void 0:je.borderRadius)||10)}px`}:C.type==="image"||C.type==="video"?{background:"linear-gradient(135deg, rgba(14,165,233,.25), rgba(108,71,255,.25))",borderRadius:"14px"}:C.type==="text"||C.type==="heading"?{background:"transparent",borderRadius:"0"}:{background:"rgba(148, 163, 184, 0.25)",borderRadius:"12px"}}function F(C,j){const D=C.type==="heading"?2:3,K=Math.max(18,100/(D+1.25));return{width:`${j===D-1?72:100}%`,height:`${C.type==="heading"?K:K-2}%`}}function ae(C){C.length&&(r.setSelection(C.map(j=>j.id)),r.focusPropertiesSection("content"),r.setActiveTool("select"))}function oe(C){return Array.isArray(C==null?void 0:C.bindings)&&C.bindings.length>0}function ke(){f.value=!1,H.value=null,ie.value={}}function O(C,j=null){const D=u.insertContentBlock(r.projectId,r.currentSlideId,C.id,j?{bindingValues:j}:{});ae(D)}function U(C){if(!oe(C)){O(C);return}H.value=C,ie.value=Object.fromEntries(C.bindings.map(j=>[j.id,j.defaultValue||""])),f.value=!0}function pe(){H.value&&(O(H.value,{...ie.value}),ke())}function be(){var D,K;const C=h.value.trim();if(!C||!B.value.length)return;u.saveSelectionAsContentBlock(r.projectId,r.currentSlideId,B.value.map(xe=>xe.id),{name:C,category:k.value.trim()||"Custom",accent:((K=(D=G.value)==null?void 0:D.theme)==null?void 0:K.primaryColor)||"#6c47ff"})&&(h.value="",p.value="Custom")}function le(C){u.deleteContentBlock(r.projectId,C)}function we(C,j){C.dataTransfer&&(C.dataTransfer.effectAllowed="copy",C.dataTransfer.setData(Wt,JSON.stringify({id:j.id})),C.dataTransfer.setData("text/plain",j.name))}return(C,j)=>(l(),i("div",yi,[e("div",hi,[j[5]||(j[5]=e("div",null,[e("div",{class:"panel-section-title"},"Blocks"),e("div",{class:"blocks-panel-subtitle"},"Drop in reusable sections for faster slide building.")],-1)),e("button",{type:"button",class:"btn btn-icon blocks-close-btn",onClick:j[0]||(j[0]=D=>E(r).toggleSlidePanel("blocks")),"aria-label":"Close blocks panel",title:"Close blocks panel"},[...j[4]||(j[4]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("path",{d:"M18 6 6 18M6 6l12 12"})],-1)])])]),e("div",xi,[ce(e("input",{"onUpdate:modelValue":j[1]||(j[1]=D=>c.value=D),class:"input blocks-search",placeholder:"Search blocks"},null,512),[[Se,c.value]]),e("div",ki,[(l(!0),i(te,null,ue(N.value,D=>(l(),i("button",{key:D,type:"button",class:X(["blocks-category-chip",p.value===D&&"active"]),onClick:K=>p.value=D},w(D==="all"?"All":D),11,wi))),128))])]),e("div",Ci,[e("div",Si,[j[6]||(j[6]=e("div",{class:"blocks-save-title"},"Save Selection",-1)),j[7]||(j[7]=e("div",{class:"field-hint"},"Turn the current selection into a reusable block for this project. Text and button labels become editable placeholders.",-1)),ce(e("input",{"onUpdate:modelValue":j[2]||(j[2]=D=>h.value=D),class:"input",placeholder:"e.g. Product intro banner"},null,512),[[Se,h.value]]),ce(e("input",{"onUpdate:modelValue":j[3]||(j[3]=D=>k.value=D),class:"input",placeholder:"Category"},null,512),[[Se,k.value]]),e("button",{type:"button",class:"btn btn-primary btn-sm w-full",disabled:!B.value.length||!h.value.trim(),onClick:be}," Save "+w(B.value.length?`${B.value.length} item${B.value.length>1?"s":""}`:"selection")+" as block ",9,$i)]),e("div",Ii,[(l(!0),i(te,null,ue(T.value,D=>(l(),i("div",{key:D.id,class:"block-card",draggable:"true",onDragstart:K=>we(K,D)},[e("div",{class:"block-thumb",style:he({"--block-accent":D.accent||"#6c47ff"})},[e("div",Ai,[(l(!0),i(te,null,ue(D.elements,K=>(l(),i("div",{key:`${D.id}-${K.type}-${K.x}-${K.y}`,class:"block-thumb-frame",style:he(Y(D,K))},[["text","heading"].includes(K.type)?(l(),i("div",{key:0,class:X(["thumb-text",K.type==="heading"&&"thumb-text-heading"])},[(l(!0),i(te,null,ue(K.type==="heading"?2:3,xe=>(l(),i("span",{key:`${D.id}-${K.type}-${K.x}-${K.y}-${xe}`,class:"thumb-text-line",style:he(F(K,xe-1))},null,4))),128))],2)):(l(),i("div",{key:1,class:"thumb-element",style:he(m(K))},null,4))],4))),128))])],4),e("div",Mi,[e("div",Pi,[e("div",null,[e("div",Ti,w(D.name),1),e("div",Bi,[ee(w(D.category),1),D.scope==="custom"?(l(),i("span",Ni," · Custom")):R("",!0),oe(D)?(l(),i("span",zi," · "+w(D.bindings.length)+" field"+w(D.bindings.length>1?"s":""),1)):R("",!0)])]),D.scope==="custom"?(l(),i("button",{key:0,type:"button",class:"block-delete-btn",onClick:K=>le(D.id),"aria-label":"Delete custom block",title:"Delete custom block"},[...j[8]||(j[8]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"3 6 5 6 21 6"}),e("path",{d:"M19 6l-1 14H6L5 6"}),e("path",{d:"M9 6V4h6v2"})],-1)])],8,Li)):R("",!0)]),e("p",ji,w(D.description||"Reusable layout block"),1),oe(D)?(l(),i("div",_i,"Editable placeholders included")):R("",!0),e("div",Di,[(l(!0),i(te,null,ue(D.tags||[],K=>(l(),i("span",{key:`${D.id}-${K}`,class:"block-tag"},"#"+w(K),1))),128))]),e("button",{type:"button",class:"btn btn-secondary btn-sm w-full",onClick:K=>U(D)},w(oe(D)?"Insert with Fields":"Insert Block"),9,qi)])],40,Ei))),128))])]),f.value?(l(),Je(yl,{key:0,title:"Fill Template Fields",size:"md",onClose:ke},{footer:ut(()=>[e("button",{type:"button",class:"btn btn-ghost",onClick:ke},"Cancel"),e("button",{type:"button",class:"btn btn-primary",onClick:pe},"Insert Block")]),default:ut(()=>{var D;return[e("div",Ri,[e("p",Oi,[j[9]||(j[9]=ee(" Customize the placeholder text before inserting ",-1)),e("strong",null,w((D=H.value)==null?void 0:D.name),1),j[10]||(j[10]=ee(". ",-1))]),(l(!0),i(te,null,ue(a.value,K=>(l(),i("div",{key:K.id,class:"binding-field"},[e("label",{class:"form-label",for:`binding-${K.id}`},w(K.label),9,Fi),ce(e("textarea",{id:`binding-${K.id}`,"onUpdate:modelValue":xe=>ie.value[K.id]=xe,class:"textarea binding-input"},null,8,Ui),[[Se,ie.value[K.id]]])]))),128))])]}),_:1})):R("",!0)]))}},Wi=Xe(Vi,[["__scopeId","data-v-aec67d0c"]]),Gi={class:"layer-panel"},Hi={class:"layer-header panel-section"},Yi={class:"panel-title",style:{"margin-bottom":"0"}},Ji={class:"layer-count"},Qi={key:0,class:"layers-empty"},Xi={key:1,class:"layers-list"},Ki=["onClick"],Zi={class:"layer-type-icon"},ea={class:"layer-name"},ta={class:"layer-actions"},oa=["onClick","data-tooltip"],na={key:0,width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},la={key:1,width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},ia=["onClick","data-tooltip"],aa={key:0,width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},sa={key:1,width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},ra=["onClick"],da=["onClick"],ua=["onClick"],ca={__name:"LayerPanel",setup(A){const r=it(),u=at(),c=P(()=>u.getProject(r.projectId)),p=P(()=>{var B,a;return(a=(B=c.value)==null?void 0:B.slides)==null?void 0:a.find(T=>T.id===r.currentSlideId)}),h=P(()=>{var B;return[...((B=p.value)==null?void 0:B.elements)||[]].sort((a,T)=>(T.zIndex||0)-(a.zIndex||0))});function k(B){r.selectElement(B)}function f(B){u.updateElement(r.projectId,r.currentSlideId,B.id,{visible:!B.visible})}function H(B){u.updateElement(r.projectId,r.currentSlideId,B.id,{locked:!B.locked})}function ie(B){u.reorderElement(r.projectId,r.currentSlideId,B,"up")}function G(B){u.reorderElement(r.projectId,r.currentSlideId,B,"down")}function V(B){u.deleteElement(r.projectId,r.currentSlideId,B),r.selectedElementId===B&&r.clearSelection()}function me(B){return{text:"T",heading:"H1",image:"🖼",shape:"■",button:"◉",hotspot:"?",video:"▶",audio:"♪",quiz:"✅",divider:"—"}[B]||"◆"}function N(B){var a,T,L;return(a=B.content)!=null&&a.text?B.content.text.slice(0,24):(T=B.content)!=null&&T.label?B.content.label:(L=B.content)!=null&&L.question?B.content.question.slice(0,24):B.type.charAt(0).toUpperCase()+B.type.slice(1)}return(B,a)=>(l(),i("div",Gi,[e("div",Hi,[e("div",Yi,[a[0]||(a[0]=ee(" Layers ",-1)),e("span",Ji,w(h.value.length),1)])]),h.value.length===0?(l(),i("div",Qi,[...a[1]||(a[1]=[e("p",null,"No elements on this slide.",-1),e("p",null,"Add elements using the toolbar above.",-1)])])):(l(),i("div",Xi,[(l(!0),i(te,null,ue(h.value,T=>(l(),i("div",{key:T.id,class:X(["layer-item",E(r).selectedElementIds.includes(T.id)&&"selected",T.locked&&"locked",!T.visible&&"hidden"]),onClick:L=>k(T.id)},[e("span",Zi,w(me(T.type)),1),e("span",ea,w(N(T)),1),e("div",ta,[e("button",{class:X(["layer-action-btn",{active:T.visible}]),onClick:Oe(L=>f(T),["stop"]),"data-tooltip":T.visible?"Hide":"Show"},[T.visible?(l(),i("svg",na,[...a[2]||(a[2]=[e("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"},null,-1),e("circle",{cx:"12",cy:"12",r:"3"},null,-1)])])):(l(),i("svg",la,[...a[3]||(a[3]=[e("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"},null,-1),e("path",{d:"M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"},null,-1),e("line",{x1:"1",y1:"1",x2:"23",y2:"23"},null,-1)])]))],10,oa),e("button",{class:X(["layer-action-btn",{active:T.locked}]),onClick:Oe(L=>H(T),["stop"]),"data-tooltip":T.locked?"Unlock":"Lock"},[T.locked?(l(),i("svg",aa,[...a[4]||(a[4]=[e("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"},null,-1),e("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"},null,-1)])])):(l(),i("svg",sa,[...a[5]||(a[5]=[e("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"},null,-1),e("path",{d:"M7 11V7a5 5 0 0 1 9.9-1"},null,-1)])]))],10,ia),e("button",{class:"layer-action-btn",onClick:Oe(L=>ie(T.id),["stop"]),"data-tooltip":"Move up"},[...a[6]||(a[6]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"18 15 12 9 6 15"})],-1)])],8,ra),e("button",{class:"layer-action-btn",onClick:Oe(L=>G(T.id),["stop"]),"data-tooltip":"Move down"},[...a[7]||(a[7]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"6 9 12 15 18 9"})],-1)])],8,da),e("button",{class:"layer-action-btn danger",onClick:Oe(L=>V(T.id),["stop"]),"data-tooltip":"Delete"},[...a[8]||(a[8]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1)])],8,ua)])],10,Ki))),128))]))]))}},pa=Xe(ca,[["__scopeId","data-v-7407acd8"]]),va={class:"panel-section"},fa={class:"preset-toolbar"},ga=["value"],ma=["value"],ba=["value"],ya={key:0,class:"preset-list",style:{"margin-top":"var(--space-3)"}},ha=["onClick"],xa={class:"preset-meta-chip muted"},ka={key:1,class:"import-review"},wa={class:"motion-scrubber-header"},Ca={class:"preset-toolbar compact"},Sa=["value"],$a=["value"],Ia={class:"import-list"},Ea=["onUpdate:modelValue"],Aa={class:"import-item-title"},Ma={class:"preset-meta-chip"},Pa={key:0,class:"preset-meta-chip muted"},Ta={__name:"MotionLibraryPanel",props:{searchQuery:{type:String,required:!0},categoryFilter:{type:String,required:!0},availableCategories:{type:Array,required:!0},recentPresets:{type:Array,required:!0},pendingImportedPresets:{type:Array,required:!0},filteredPendingImports:{type:Array,required:!0},importScopeFilter:{type:String,required:!0},importConflictMode:{type:String,required:!0}},emits:["update:searchQuery","update:categoryFilter","trigger-import","export-presets","apply-preset","clear-imports","update:importScopeFilter","update:importConflictMode","apply-imports"],setup(A,{emit:r}){const u=r;return(c,p)=>(l(),i("div",va,[p[13]||(p[13]=e("div",{class:"panel-title"},"Motion Library",-1)),e("div",fa,[e("input",{value:A.searchQuery,class:"input",placeholder:"Search presets by name, category, or tag",onInput:p[0]||(p[0]=h=>u("update:searchQuery",h.target.value))},null,40,ga),e("select",{value:A.categoryFilter,class:"select",onChange:p[1]||(p[1]=h=>u("update:categoryFilter",h.target.value))},[p[8]||(p[8]=e("option",{value:"all"},"All categories",-1)),(l(!0),i(te,null,ue(A.availableCategories,h=>(l(),i("option",{key:`library-${h}`,value:h},w(h),9,ba))),128))],40,ma),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:p[2]||(p[2]=h=>u("trigger-import"))},"Import"),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:p[3]||(p[3]=h=>u("export-presets"))},"Export")]),A.recentPresets.length?(l(),i("div",ya,[p[9]||(p[9]=e("div",{class:"field-hint"},"Recently used",-1)),(l(!0),i(te,null,ue(A.recentPresets,h=>(l(),i("div",{class:"preset-item",key:`recent-${h.id}`},[e("button",{type:"button",class:"preset-chip",onClick:k=>u("apply-preset",h)},w(h.name),9,ha),e("span",xa,"Used "+w(h.usageCount)+"x",1)]))),128))])):R("",!0),A.pendingImportedPresets.length?(l(),i("div",ka,[e("div",wa,[p[10]||(p[10]=e("span",{class:"motion-scrubber-title"},"Import Review",-1)),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:p[4]||(p[4]=h=>u("clear-imports"))},"Discard")]),e("div",Ca,[e("select",{value:A.importScopeFilter,class:"select",onChange:p[5]||(p[5]=h=>u("update:importScopeFilter",h.target.value))},[...p[11]||(p[11]=[e("option",{value:"all"},"All scopes",-1),e("option",{value:"single"},"Single presets",-1),e("option",{value:"group"},"Group presets",-1)])],40,Sa),e("select",{value:A.importConflictMode,class:"select",onChange:p[6]||(p[6]=h=>u("update:importConflictMode",h.target.value))},[...p[12]||(p[12]=[e("option",{value:"replace"},"Replace matching names",-1),e("option",{value:"copy"},"Import as copies",-1)])],40,$a),e("button",{type:"button",class:"btn btn-primary btn-sm",onClick:p[7]||(p[7]=h=>u("apply-imports"))},"Merge Selected")]),e("div",Ia,[(l(!0),i(te,null,ue(A.filteredPendingImports,h=>(l(),i("label",{key:`pending-${h.id}`,class:"import-item"},[ce(e("input",{"onUpdate:modelValue":k=>h.selected=k,type:"checkbox"},null,8,Ea),[[Nt,h.selected]]),e("span",Aa,w(h.name),1),e("span",Ma,w(h.scope),1),h.category?(l(),i("span",Pa,w(h.category),1)):R("",!0)]))),128))])])):R("",!0)]))}},Ba=Xe(Ta,[["__scopeId","data-v-61f99273"]]),Na={key:1,class:"panel-section"},za={class:"field-hint"},La={class:"motion-scrubber-shell"},ja={class:"motion-card-grid",style:{"margin-top":"var(--space-3)"}},_a=["onClick"],Da={class:"motion-preview"},qa={key:0,class:"motion-preview-dot motion-preview-dot-secondary motion-sample-stagger-in-secondary"},Ra={key:1,class:"motion-preview-dot motion-preview-dot-tertiary motion-sample-stagger-in-tertiary"},Oa={class:"motion-card-label"},Fa={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Ua={class:"form-group"},Va={class:"form-group"},Wa={class:"form-group",style:{"margin-top":"var(--space-3)"}},Ga={class:"preset-row",style:{"margin-top":"var(--space-3)"}},Ha={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-2)"}},Ya={key:0,class:"preset-list"},Ja=["onDragstart","onDragenter","onDrop"],Qa=["onClick"],Xa={key:0,class:"preset-meta-chip"},Ka=["onClick"],Za=["onClick"],es=["onClick"],ts={key:1,class:"preset-row preset-edit-row"},os=["onClick"],ns={key:1,class:"field-hint"},ls={key:2,class:"panel-section"},is={class:"slide-settings-tabs"},as={key:0,class:"slide-settings-pane"},ss={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},rs={class:"form-group"},ds={class:"bg-type-tabs"},us=["onClick"],cs={key:0,class:"color-row"},ps=["value"],vs=["value"],fs={class:"slide-settings-subsection"},gs={class:"canvas-size-grid"},ms=["onClick"],bs={class:"canvas-size-icon-shell"},ys={class:"canvas-size-name"},hs={class:"canvas-size-ratio"},xs={class:"canvas-custom-card"},ks={class:"canvas-custom-header"},ws={class:"field-hint"},Cs={class:"canvas-custom-inputs"},Ss={class:"form-group"},$s={class:"canvas-size-input-wrap"},Is=["value"],Es={class:"form-group"},As={class:"canvas-size-input-wrap"},Ms=["value"],Ps={class:"check-row canvas-size-lock"},Ts={class:"slide-settings-subsection"},Bs={key:1,class:"slide-settings-pane"},Ns=["value"],zs={class:"form-group",style:{"margin-top":"var(--space-3)"}},Ls=["value"],js={class:"check-row"},_s=["checked"],Ds={key:2,class:"slide-settings-pane"},qs={class:"check-row"},Rs=["checked"],Os={class:"check-row"},Fs=["checked"],Us={class:"check-row"},Vs=["checked"],Ws={class:"check-row"},Gs=["checked"],Hs={class:"check-row"},Ys=["checked"],Js={class:"panel-title"},Qs={class:"element-type-badge"},Xs={class:"geo-grid"},Ks={class:"form-group"},Zs=["value"],er={class:"form-group"},tr=["value"],or={class:"form-group"},nr=["value"],lr={class:"form-group"},ir=["value"],ar={class:"form-group"},sr=["value"],rr={class:"form-group"},dr=["value"],ur={class:"motion-scrubber-shell"},cr={class:"motion-card-grid"},pr=["onClick"],vr={class:"motion-preview"},fr={key:0,class:"motion-preview-dot motion-preview-dot-secondary motion-sample-stagger-in-secondary"},gr={key:1,class:"motion-preview-dot motion-preview-dot-tertiary motion-sample-stagger-in-tertiary"},mr={class:"motion-card-label"},br={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr"}},yr={class:"form-group"},hr=["value"],xr={class:"form-group"},kr=["value"],wr={class:"preset-row",style:{"margin-top":"var(--space-3)"}},Cr={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-2)"}},Sr={key:0,class:"preset-list"},$r=["onDragstart","onDragenter","onDrop"],Ir=["onClick"],Er={key:0,class:"preset-meta-chip"},Ar=["onClick"],Mr=["onClick"],Pr=["onClick"],Tr={key:1,class:"preset-row preset-edit-row"},Br=["onClick"],Nr={key:1,class:"field-hint"},zr={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Lr=["value"],jr={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr"}},_r={class:"form-group"},Dr=["value"],qr={class:"form-group"},Rr=["value"],Or={class:"form-group",style:{"margin-top":"var(--space-3)"}},Fr=["value"],Ur=["value"],Vr={class:"form-group",style:{"margin-top":"var(--space-3)"}},Wr={class:"align-btns"},Gr=["onClick"],Hr={class:"form-group",style:{"margin-top":"var(--space-3)"}},Yr={class:"style-btns"},Jr={class:"form-group",style:{"margin-top":"var(--space-3)"}},Qr={class:"color-row"},Xr=["value"],Kr=["value"],Zr={class:"form-group",style:{"margin-top":"var(--space-3)"}},ed=["value"],td={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},od={class:"form-group"},nd=["value"],ld={class:"form-group"},id=["value"],ad={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},sd=["value"],rd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},dd=["value"],ud={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},cd=["value"],pd={class:"form-group"},vd=["value"],fd={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},gd={class:"form-group"},md=["value"],bd={class:"form-group"},yd=["value"],hd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},xd=["value"],kd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},wd={class:"color-row"},Cd=["value"],Sd=["value"],$d={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Id={class:"color-row"},Ed=["value"],Ad=["value"],Md={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Pd=["value"],Td={class:"form-group"},Bd=["value"],Nd={class:"form-group",style:{"margin-top":"var(--space-3)"}},zd=["value"],Ld={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},jd=["value"],_d={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Dd=["value"],qd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Rd=["value"],Od={class:"form-group chart-import-card",style:{"margin-bottom":"var(--space-3)"}},Fd={class:"chart-data-actions"},Ud={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Vd=["value","placeholder"],Wd={class:"chart-palette-preview"},Gd={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-bottom":"var(--space-3)"}},Hd={class:"form-group"},Yd=["value"],Jd={class:"form-group"},Qd=["value"],Xd={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-bottom":"var(--space-3)"}},Kd={class:"form-group"},Zd=["value"],eu={class:"form-group"},tu=["value"],ou={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-bottom":"var(--space-3)"}},nu={class:"form-group"},lu=["value"],iu={key:0,class:"form-group"},au=["value"],su={key:1,class:"form-group"},ru=["value"],du={key:0,class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-bottom":"var(--space-3)"}},uu={class:"form-group"},cu=["value"],pu={class:"check-row",style:{"margin-top":"20px"}},vu=["checked"],fu={class:"check-row"},gu=["checked"],mu={key:1,class:"check-row"},bu=["checked"],yu={class:"check-row"},hu=["checked"],xu={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},ku=["value"],wu={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Cu=["value"],Su={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},$u=["value"],Iu={key:0,class:"form-group"},Eu=["value"],Au={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Mu={class:"form-group"},Pu=["value"],Tu={class:"form-group"},Bu=["value"],Nu={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},zu={class:"form-group"},Lu=["value"],ju={class:"form-group"},_u=["value"],Du={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},qu={class:"form-group"},Ru=["value"],Ou={class:"form-group"},Fu=["value"],Uu={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Vu={class:"form-group"},Wu=["value"],Gu=["value"],Hu={class:"form-group"},Yu=["value"],Ju={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Qu=["value"],Xu={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Ku={class:"color-row"},Zu=["value"],ec=["value"],tc={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-bottom":"var(--space-3)"}},oc={class:"form-group"},nc=["value"],lc={class:"form-group"},ic=["value"],ac={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},sc=["value"],rc={class:"form-group"},dc=["value"],uc={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},cc={class:"form-group"},pc=["value"],vc={class:"form-group"},fc=["value"],gc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},mc=["value"],bc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},yc=["value"],hc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},xc=["value"],kc={class:"check-row"},wc=["checked"],Cc={class:"check-row"},Sc=["checked"],$c={class:"check-row"},Ic=["checked"],Ec={class:"check-row"},Ac=["checked"],Mc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Pc=["value"],Tc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Bc=["value"],Nc={class:"check-row"},zc=["checked"],Lc={class:"check-row"},jc=["checked"],_c={class:"check-row"},Dc=["checked"],qc={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Rc={class:"form-group"},Oc=["value"],Fc={class:"form-group"},Uc=["value"],Vc={class:"form-group",style:{"margin-top":"var(--space-3)"}},Wc=["value"],Gc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Hc=["value"],Yc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Jc=["value"],Qc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Xc=["value"],Kc={class:"form-group"},Zc=["value"],ep={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},tp={class:"form-group"},op=["value"],np={class:"form-group"},lp=["value"],ip={class:"form-group",style:{"margin-top":"var(--space-3)"}},ap=["value"],sp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},rp=["value"],dp={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},up={class:"form-group"},cp=["value"],pp={class:"form-group"},vp=["value"],fp={class:"form-group"},gp=["value"],mp={class:"form-group"},bp=["value"],yp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},hp=["value"],xp={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},kp={class:"form-group"},wp=["value"],Cp={class:"form-group"},Sp=["value"],$p={class:"form-group"},Ip=["value"],Ep={class:"form-group"},Ap=["value"],Mp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Pp=["value"],Tp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Bp=["value"],Np={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},zp=["value"],Lp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},jp=["value"],_p={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Dp=["value"],qp={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Rp={class:"form-group"},Op=["value"],Fp={class:"form-group"},Up=["value"],Vp={class:"form-group"},Wp=["value"],Gp={class:"form-group"},Hp=["value"],Yp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Jp=["value"],Qp={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Xp={class:"form-group"},Kp=["value"],Zp={class:"form-group"},ev=["value"],tv={class:"form-group"},ov=["value"],nv={class:"form-group"},lv=["value"],iv={class:"form-group"},av=["value"],sv={class:"form-group",style:{"margin-top":"var(--space-3)"}},rv=["value"],dv={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},uv={class:"form-group"},cv=["value"],pv={class:"form-group"},vv=["value"],fv={class:"form-group",style:{"margin-top":"var(--space-3)"}},gv=["value"],mv={class:"form-group"},bv=["value"],yv={class:"form-group"},hv=["value"],xv={class:"form-group"},kv=["value"],wv={class:"form-group",style:{"margin-top":"var(--space-3)"}},Cv={style:{display:"flex","align-items":"center",gap:"8px"}},Sv=["checked"],$v={class:"form-group"},Iv=["value"],Ev={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr"}},Av={class:"form-group"},Mv=["value"],Pv={class:"form-group"},Tv=["value"],Bv={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-2)"}},Nv={class:"form-group"},zv=["value"],Lv={class:"panel-section"},jv={class:"actions-list"},_v={__name:"PropertiesPanel",setup(A){const r=it(),u=at(),c=P(()=>u.getProject(r.projectId)),p=P(()=>{var d,t;return(t=(d=c.value)==null?void 0:d.slides)==null?void 0:t.find(_=>_.id===r.currentSlideId)}),h=P(()=>{var d;return{autoPlay:!1,loop:!1,showProgress:!0,showNavControls:!0,allowKeyboardNav:!0,motionPresets:[],...((d=c.value)==null?void 0:d.settings)||{}}}),k=P(()=>zt(h.value)),f=P(()=>hl(h.value)),H=P(()=>xl(k.value.width,k.value.height)),ie=z(!0),G=z("canvas"),V=P(()=>Array.isArray(h.value.motionPresets)?h.value.motionPresets:[]),me=P(()=>V.value.filter(d=>d.scope!=="group")),N=P(()=>V.value.filter(d=>d.scope==="group")),B=P(()=>{var t;const d=new Set(r.selectedElementIds);return(((t=p.value)==null?void 0:t.elements)||[]).filter(_=>d.has(_.id))}),a=P(()=>{var d,t;return r.selectedElementId?(t=(d=p.value)==null?void 0:d.elements)==null?void 0:t.find(_=>_.id===r.selectedElementId):null}),T=P(()=>r.multiSelection||!!a.value),L=P(()=>r.multiSelection?"group":"single"),Y=P(()=>{var t,_;const d=(_=(t=a.value)==null?void 0:t.animations)==null?void 0:_[0];return{type:(d==null?void 0:d.type)||"auto",delay:Number((d==null?void 0:d.delay)||0),duration:Number((d==null?void 0:d.duration)||.64)}}),m=P(()=>{var Ne,He;const d=B.value.map(Ue=>{var yt;return((yt=Ue.animations)==null?void 0:yt[0])||null}),t=((Ne=d[0])==null?void 0:Ne.type)||"auto",_=Number(((He=d[0])==null?void 0:He.duration)||.64),ve=d.every(Ue=>((Ue==null?void 0:Ue.type)||"auto")===t),Me=d.every(Ue=>Number((Ue==null?void 0:Ue.duration)||.64)===_);return{type:ve?t:"mixed",duration:Me?_:.64}}),F=z(0),ae=z(0),oe=z(""),ke=z(""),O=z(""),U=z(""),pe=z(""),be=z(""),le=z(""),we=z(""),C=z(""),j=z(""),D=z(""),K=z(""),xe=z(""),ze=z("all"),Ie=z(null),je=z(null),ne=z([]),fe=z("all"),se=z("replace"),ge=z(""),Pe=z(null),re=z("");let I=null;const $=z({});Qe(a,d=>{d?$.value=JSON.parse(JSON.stringify(d)):$.value={},(d==null?void 0:d.type)==="chart"&&(ge.value="")},{immediate:!0,deep:!0}),Qe(()=>{var d;return[r.propertiesPanelSection,(d=a.value)==null?void 0:d.id,r.rightPanelTab]},async([d,t,_])=>{var Me;if(!d||!t||_!=="properties")return;await bl();const ve=(Me=Pe.value)==null?void 0:Me.querySelector(`[data-props-anchor="${d}"]`);ve&&(ve.scrollIntoView({behavior:"smooth",block:"start"}),re.value=d,I&&window.clearTimeout(I),I=window.setTimeout(()=>{re.value===d&&(re.value="")},1400))},{immediate:!0});function q(d){a.value&&u.updateElement(r.projectId,r.currentSlideId,a.value.id,d)}function g(d){if(!a.value)return;const t={...a.value.content,...d};q({content:t})}function _e(d,t){try{return JSON.parse(d)}catch{return t}}function qe(d,t){const _=parseFloat(t);isNaN(_)||q({[d]:_})}const Le=z({});Qe(p,d=>{d&&(Le.value={...d})},{immediate:!0});function Ce(d){p.value&&u.updateSlide(r.projectId,p.value.id,d)}function Te(d){if(!c.value)return;const t={...h.value,...d};u.updateProject(r.projectId,{settings:{...t,...jl(t)}})}function st(d){Te({slideWidth:d.width,slideHeight:d.height})}function tt(d,t){const _=Math.round(Number(t)||0);if(!_)return;const ve={[`slide${d==="width"?"Width":"Height"}`]:_};if(ie.value){const Me=k.value.width,Ne=k.value.height;d==="width"?ve.slideHeight=Math.round(_*(Ne/Me)):ve.slideWidth=Math.round(_*(Me/Ne))}Te(ve)}const ot=P(()=>{var d;return kl(((d=c.value)==null?void 0:d.theme)||{})}),wt=P(()=>{var t,_;if(((t=a.value)==null?void 0:t.type)!=="chart")return[];const d=((_=a.value.content)==null?void 0:_.paletteText)||ot.value.paletteText;return ql(d)});function rt(d){const t=_l(d,{fallbackToDefault:!1});return t.length?Dl(t):""}function De(d){var _;if(((_=a.value)==null?void 0:_.type)!=="chart")return;const t=rt(d);t&&(g({dataText:t}),ge.value="")}async function ct(d){var ve;const t=d.target,_=(ve=t==null?void 0:t.files)==null?void 0:ve[0];if(_)try{const Me=await _.text();De(Me)}finally{t&&(t.value="")}}function Ke(){var d;(d=je.value)==null||d.click()}function Ct(){var t,_;if(((t=a.value)==null?void 0:t.type)!=="chart")return;const d=rt(((_=a.value.content)==null?void 0:_.dataText)||"");d&&g({dataText:d})}function St(){var d;((d=a.value)==null?void 0:d.type)==="chart"&&g({...ot.value})}function $t(){var d;((d=a.value)==null?void 0:d.type)==="chart"&&g({paletteText:ot.value.paletteText})}function pt(d){return String(d||"").split(",").map(t=>t.trim()).filter(Boolean)}function It(d){const t=(d==null?void 0:d.scope)==="group"?"group":"single";return{id:`motion-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,scope:t,name:String((d==null?void 0:d.name)||"Imported Preset").trim()||"Imported Preset",category:String((d==null?void 0:d.category)||"").trim(),tags:Array.isArray(d==null?void 0:d.tags)?d.tags.map(_=>String(_).trim()).filter(Boolean):pt(d==null?void 0:d.tags),type:String((d==null?void 0:d.type)||"auto"),delay:Math.max(0,Number(d==null?void 0:d.delay)||0),duration:Math.max(.1,Number(d==null?void 0:d.duration)||.72),stepDelay:Math.max(0,Number(d==null?void 0:d.stepDelay)||0)}}const Et=P(()=>[...new Set(V.value.map(t=>t.category).filter(Boolean))].sort((t,_)=>t.localeCompare(_))),At=P(()=>[...V.value].filter(d=>Number(d.usageCount||0)>0).sort((d,t)=>{const _=Number(t.lastUsedAt||0)-Number(d.lastUsedAt||0);return _!==0?_:Number(t.usageCount||0)-Number(d.usageCount||0)}).slice(0,6)),y=P(()=>fe.value==="all"?ne.value:ne.value.filter(d=>d.scope===fe.value));function x(d){const t=xe.value.trim().toLowerCase(),_=ze.value;return _==="all"||(d.category||"")===_?t?[d.name,d.category,...d.tags||[]].filter(Boolean).some(Me=>String(Me).toLowerCase().includes(t)):!0:!1}const Z=P(()=>me.value.filter(x)),W=P(()=>N.value.filter(x)),Ee=P(()=>At.value.filter(d=>L.value==="group"?d.scope==="group":d.scope!=="group"));function Ae(d){const t=String(d.name||"").trim();if(!t)return;const _=V.value.findIndex(Ne=>Ne.scope===d.scope&&Ne.name.toLowerCase()===t.toLowerCase()),ve={...d,id:_>=0?V.value[_].id:`motion-${Date.now()}`,name:t,category:String(d.category||"").trim(),tags:Array.isArray(d.tags)?d.tags:pt(d.tags)},Me=[...V.value];_>=0?Me.splice(_,1,ve):Me.push(ve),Te({motionPresets:Me})}function Fe(d,t){const _=V.value.map(ve=>ve.id===d?{...ve,...t}:ve);Te({motionPresets:_})}function We(d){const t=V.value.find(_=>_.id===d);t&&Fe(d,{usageCount:Math.max(0,Number(t.usageCount||0))+1,lastUsedAt:Date.now()})}function de(d,t){const _=V.value.filter(He=>He.scope===d).map(He=>He.name.toLowerCase()),ve=String(t||"Preset").trim()||"Preset";if(!_.includes(ve.toLowerCase()))return ve;let Me=2,Ne=`${ve} Copy`;for(;_.includes(Ne.toLowerCase());)Ne=`${ve} Copy ${Me}`,Me+=1;return Ne}function $e(d){Te({motionPresets:V.value.filter(t=>t.id!==d)}),O.value===d&&(O.value="",U.value="")}function Ze(d){Ae({...d,id:void 0,name:de(d.scope,d.name)})}function Re(d){O.value=d.id,U.value=d.name,pe.value=d.category||"",be.value=Array.isArray(d.tags)?d.tags.join(", "):""}function Be(){O.value="",U.value="",pe.value="",be.value=""}function Ve(d){const t=String(U.value||"").trim();t&&(Fe(d,{name:t,category:String(pe.value||"").trim(),tags:pt(be.value)}),Be())}function gt(d,t,_){if(!t||!_||t===_)return;const ve=V.value.filter(lt=>lt.scope===d),Me=ve.findIndex(lt=>lt.id===t),Ne=ve.findIndex(lt=>lt.id===_);if(Me===-1||Ne===-1)return;const He=[...ve],[Ue]=He.splice(Me,1);He.splice(Ne,0,Ue);const yt=V.value.filter(lt=>lt.scope!==d),kt=[];V.value.forEach(lt=>{if(lt.scope===d){He.length&&kt.push(He.shift());return}const Pt=yt.shift();Pt&&kt.push(Pt)}),Te({motionPresets:kt})}function ft(d){le.value=d.id,we.value=d.id}function mt(d){le.value&&(we.value=d.id)}function Lt(d){le.value&&(gt(d.scope,le.value,d.id),le.value="",we.value="")}function bt(){le.value="",we.value=""}function jt(){F.value+=1}function Mt(){ae.value+=1}function _t(d,t){Ce({[d]:t})}function Ot(d){const t=Math.max(0,Number(d)||0);Ce({duration:t})}function xt(d){var ve;if(!a.value)return;const _={...((ve=a.value.animations)==null?void 0:ve[0])||{type:"auto",delay:0,duration:.64},...d};if(_.type==="auto"){q({animations:[]});return}q({animations:[{type:_.type||"none",delay:Math.max(0,Number(_.delay)||0),duration:Math.max(.1,Number(_.duration)||.64)}]})}const Ge=z("stagger-in"),nt=z(0),vt=z(.12),dt=z(.72);Qe(B,d=>{d.length&&(Ge.value=m.value.type==="mixed"?"stagger-in":m.value.type,dt.value=m.value.duration)},{immediate:!0,deep:!0});function Dt(){if(!B.value.length)return;[...B.value].sort((t,_)=>(t.y||0)!==(_.y||0)?(t.y||0)-(_.y||0):(t.x||0)-(_.x||0)).forEach((t,_)=>{if(Ge.value==="auto"){u.updateElement(r.projectId,r.currentSlideId,t.id,{animations:[]});return}u.updateElement(r.projectId,r.currentSlideId,t.id,{animations:[{type:Ge.value,delay:Math.max(0,Number(nt.value)||0)+_*Math.max(0,Number(vt.value)||0),duration:Math.max(.1,Number(dt.value)||.72)}]})})}function qt(d){Ge.value=d.type||"stagger-in",nt.value=Number(d.delay||0),vt.value=Number(d.stepDelay||0),dt.value=Number(d.duration||.72),We(d.id),Mt()}function Ft(){Ae({scope:"group",name:ke.value,category:D.value,tags:pt(K.value),type:Ge.value,delay:Math.max(0,Number(nt.value)||0),stepDelay:Math.max(0,Number(vt.value)||0),duration:Math.max(.1,Number(dt.value)||.72)}),ke.value="",D.value="",K.value=""}function Rt(d){xt({type:d.type||"auto",delay:Number(d.delay||0),duration:Number(d.duration||.72)}),We(d.id),jt()}function Ut(){Ae({scope:"single",name:oe.value,category:C.value,tags:pt(j.value),type:Y.value.type,delay:Math.max(0,Number(Y.value.delay)||0),stepDelay:0,duration:Math.max(.1,Number(Y.value.duration)||.72)}),oe.value="",C.value="",j.value=""}function s(){var d;(d=Ie.value)==null||d.click()}async function n(d){var ve;const t=d.target,_=(ve=t==null?void 0:t.files)==null?void 0:ve[0];if(_)try{const Me=await _.text(),Ne=JSON.parse(Me),He=Array.isArray(Ne)?Ne:Array.isArray(Ne.motionPresets)?Ne.motionPresets:[];if(!He.length)return;ne.value=He.map(Ue=>({...It(Ue),selected:!0,importName:String((Ue==null?void 0:Ue.name)||"Imported Preset").trim()||"Imported Preset"}))}catch{}finally{t&&(t.value="")}}function v(){ne.value=[]}function S(){const d=ne.value.filter(_=>_.selected);if(!d.length)return;const t=[...V.value];d.forEach(_=>{const ve=t.findIndex(Me=>Me.scope===_.scope&&Me.name.toLowerCase()===_.name.toLowerCase());if(ve>=0){se.value==="replace"?t.splice(ve,1,{...t[ve],..._,id:t[ve].id}):t.push({..._,id:`motion-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,name:de(_.scope,_.name)});return}t.push(_)}),Te({motionPresets:t}),v()}function b(){var Ne;if(!V.value.length)return;const d={version:1,exportedAt:new Date().toISOString(),motionPresets:V.value.map(({id:He,...Ue})=>Ue)},t=new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),_=URL.createObjectURL(t),ve=document.createElement("a"),Me=String(((Ne=c.value)==null?void 0:Ne.name)||"project").trim().replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"").toLowerCase()||"project";ve.href=_,ve.download=`${Me}-motion-presets.json`,document.body.appendChild(ve),ve.click(),document.body.removeChild(ve),URL.revokeObjectURL(_)}const J=P(()=>[{id:`single-${F.value}`,delay:Math.max(0,Number(Y.value.delay)||0),duration:Math.max(.1,Number(Y.value.duration)||.72),type:Y.value.type}]),ye=P(()=>Array.from({length:Math.min(Math.max(B.value.length,3),5)},(d,t)=>({id:`group-${ae.value}-${t}`,delay:Math.max(0,Number(nt.value)||0)+t*Math.max(0,Number(vt.value)||0),duration:Math.max(.1,Number(dt.value)||.72),type:Ge.value}))),Ye=[{value:"auto",label:"Auto",sampleClass:"motion-sample-auto"},{value:"none",label:"None",sampleClass:"motion-sample-none"},{value:"fade-up",label:"Fade Up",sampleClass:"motion-sample-fade-up"},{value:"fade-up-strong",label:"Fade Strong",sampleClass:"motion-sample-fade-up-strong"},{value:"fade-left",label:"Fade Left",sampleClass:"motion-sample-fade-left"},{value:"fade-right",label:"Fade Right",sampleClass:"motion-sample-fade-right"},{value:"zoom-in",label:"Zoom In",sampleClass:"motion-sample-zoom-in"},{value:"pop-in",label:"Pop In",sampleClass:"motion-sample-pop-in"},{value:"soft-pop",label:"Soft Pop",sampleClass:"motion-sample-soft-pop"},{value:"stagger-in",label:"Stagger In",sampleClass:"motion-sample-stagger-in"}],M=["Inter, sans-serif","Poppins, sans-serif","Montserrat, sans-serif","Roboto, sans-serif","Lato, sans-serif",'"Open Sans", sans-serif',"Raleway, sans-serif","Nunito, sans-serif","Arial, sans-serif",'"Trebuchet MS", sans-serif',"Tahoma, sans-serif","Georgia, serif",'"Playfair Display", serif',"Merriweather, serif",'"Times New Roman", serif',"Verdana, sans-serif",'"Courier New", monospace',"Pacifico, cursive","Caveat, cursive",'"Bebas Neue", sans-serif'];return(d,t)=>{var _,ve,Me,Ne,He,Ue,yt,kt,lt,Pt,Ht,Yt,Jt,Qt,Xt,Kt,Zt,eo,to,oo,no,lo,io,ao,so,ro,uo,co,po,vo,fo,go,mo,bo,yo,ho,xo,ko,wo,Co,So,$o,Io,Eo,Ao,Mo,Po,To,Bo,No,zo,Lo,jo,_o,Do,qo,Ro,Oo,Fo,Uo,Vo,Wo,Go,Ho,Yo,Jo,Qo,Xo,Ko,Zo,en,tn,on,nn,ln,an,sn,rn,dn,un,cn,pn,vn,fn,gn,mn,bn,yn,hn,xn,kn,wn,Cn,Sn,$n,In,En,An,Mn,Pn,Tn,Bn,Nn,zn,Ln,jn,_n,Dn,qn,Rn,On,Fn,Un,Vn,Wn,Gn,Hn,Yn,Jn,Qn,Xn,Kn,Zn,el,tl,ol,nl,ll,il,al,sl,rl,dl,ul;return l(),i("div",{ref_key:"panelRootRef",ref:Pe,class:"properties-panel"},[e("input",{ref_key:"presetImportInput",ref:Ie,type:"file",accept:"application/json,.json",style:{display:"none"},onChange:n},null,544),e("input",{ref_key:"chartImportInput",ref:je,type:"file",accept:".csv,.txt,text/csv,text/plain",style:{display:"none"},onChange:ct},null,544),t[386]||(t[386]=e("div",{class:"panel-section autosave-note"}," Changes apply instantly ",-1)),T.value?(l(),Je(Ba,{key:0,"search-query":xe.value,"category-filter":ze.value,"available-categories":Et.value,"recent-presets":Ee.value,"pending-imported-presets":ne.value,"filtered-pending-imports":y.value,"import-scope-filter":fe.value,"import-conflict-mode":se.value,"onUpdate:searchQuery":t[0]||(t[0]=o=>xe.value=o),"onUpdate:categoryFilter":t[1]||(t[1]=o=>ze.value=o),onTriggerImport:s,onExportPresets:b,onApplyPreset:t[2]||(t[2]=o=>L.value==="group"?qt(o):Rt(o)),onClearImports:v,"onUpdate:importScopeFilter":t[3]||(t[3]=o=>fe.value=o),"onUpdate:importConflictMode":t[4]||(t[4]=o=>se.value=o),onApplyImports:S},null,8,["search-query","category-filter","available-categories","recent-presets","pending-imported-presets","filtered-pending-imports","import-scope-filter","import-conflict-mode"])):R("",!0),E(r).multiSelection?(l(),i("div",Na,[t[185]||(t[185]=e("div",{class:"panel-title"},"Group Motion",-1)),e("div",za,w(B.value.length)+" elements selected. Apply one timed sequence to the whole selection.",1),e("div",La,[e("div",{class:"motion-scrubber-header"},[t[181]||(t[181]=e("span",{class:"motion-scrubber-title"},"Sequence Preview",-1)),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Mt},"Replay")]),(l(),i("div",{class:"motion-scrubber-stage",key:`group-preview-${ae.value}`},[(l(!0),i(te,null,ue(ye.value,o=>(l(),i("span",{key:o.id,class:X(["motion-scrubber-node",`motion-preview-live-${o.type==="auto"?"fade-up":o.type}`]),style:he({"--preview-delay":`${o.delay}s`,"--preview-duration":`${o.duration}s`})},null,6))),128))]))]),e("div",ja,[(l(),i(te,null,ue(Ye,o=>e("button",{key:`group-${o.value}`,type:"button",class:X(["motion-card",Ge.value===o.value&&"active"]),onClick:Q=>Ge.value=o.value},[e("span",Da,[e("span",{class:X(["motion-preview-dot",o.sampleClass])},null,2),o.value==="stagger-in"?(l(),i("span",qa)):R("",!0),o.value==="stagger-in"?(l(),i("span",Ra)):R("",!0)]),e("span",Oa,w(o.label),1)],10,_a)),64))]),e("div",Fa,[e("div",Ua,[t[182]||(t[182]=e("label",{class:"form-label"},"Start Delay (seconds)",-1)),ce(e("input",{type:"number",min:"0",step:"0.05","onUpdate:modelValue":t[5]||(t[5]=o=>nt.value=o),class:"input"},null,512),[[Se,nt.value]])]),e("div",Va,[t[183]||(t[183]=e("label",{class:"form-label"},"Step Delay (seconds)",-1)),ce(e("input",{type:"number",min:"0",step:"0.05","onUpdate:modelValue":t[6]||(t[6]=o=>vt.value=o),class:"input"},null,512),[[Se,vt.value]])])]),e("div",Wa,[t[184]||(t[184]=e("label",{class:"form-label"},"Duration (seconds)",-1)),ce(e("input",{type:"number",min:"0.1",step:"0.05","onUpdate:modelValue":t[7]||(t[7]=o=>dt.value=o),class:"input"},null,512),[[Se,dt.value]])]),e("div",Ga,[ce(e("input",{"onUpdate:modelValue":t[8]||(t[8]=o=>ke.value=o),class:"input",placeholder:"Save as preset, e.g. Three Card Cascade"},null,512),[[Se,ke.value]]),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Ft},"Save")]),e("div",Ha,[ce(e("input",{"onUpdate:modelValue":t[9]||(t[9]=o=>D.value=o),class:"input",placeholder:"Category, e.g. Sequence"},null,512),[[Se,D.value]]),ce(e("input",{"onUpdate:modelValue":t[10]||(t[10]=o=>K.value=o),class:"input",placeholder:"Tags, comma separated"},null,512),[[Se,K.value]])]),W.value.length?(l(),i("div",Ya,[(l(!0),i(te,null,ue(W.value,o=>(l(),i("div",{key:o.id,class:X(["preset-item",le.value===o.id&&"dragging",we.value===o.id&&le.value!==o.id&&"drag-over"]),draggable:"true",onDragstart:Q=>ft(o),onDragenter:Oe(Q=>mt(o),["prevent"]),onDragover:t[14]||(t[14]=Oe(()=>{},["prevent"])),onDrop:Oe(Q=>Lt(o),["prevent"]),onDragend:bt},[e("button",{type:"button",class:"preset-chip",onClick:Q=>qt(o)},w(o.name),9,Qa),o.category?(l(),i("span",Xa,w(o.category),1)):R("",!0),(l(!0),i(te,null,ue(o.tags||[],Q=>(l(),i("span",{key:`${o.id}-${Q}`,class:"preset-meta-chip muted"},"#"+w(Q),1))),128)),e("button",{type:"button",class:"preset-mini-btn",onClick:Q=>Ze(o)},"Duplicate",8,Ka),e("button",{type:"button",class:"preset-mini-btn",onClick:Q=>Re(o)},"Rename",8,Za),e("button",{type:"button",class:"preset-mini-btn danger",onClick:Q=>$e(o.id)},"Delete",8,es),O.value===o.id?(l(),i("div",ts,[ce(e("input",{"onUpdate:modelValue":t[11]||(t[11]=Q=>U.value=Q),class:"input"},null,512),[[Se,U.value]]),ce(e("input",{"onUpdate:modelValue":t[12]||(t[12]=Q=>pe.value=Q),class:"input",placeholder:"Category"},null,512),[[Se,pe.value]]),ce(e("input",{"onUpdate:modelValue":t[13]||(t[13]=Q=>be.value=Q),class:"input",placeholder:"Tags, comma separated"},null,512),[[Se,be.value]]),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Q=>Ve(o.id)},"Save",8,os),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Be},"Cancel")])):R("",!0)],42,Ja))),128))])):N.value.length?(l(),i("div",ns,"No group presets match the current search.")):R("",!0),e("button",{class:"btn btn-primary btn-sm w-full",style:{"margin-top":"var(--space-3)"},onClick:Dt}," Apply Sequence to Selection ")])):a.value?(l(),i(te,{key:3},[e("div",{class:X(["panel-section",re.value==="geometry"&&"panel-section-focused"]),"data-props-anchor":"geometry"},[e("div",Js,[t[216]||(t[216]=ee(" Position & Size ",-1)),e("span",Qs,w(a.value.type),1)]),e("div",Xs,[e("div",Ks,[t[217]||(t[217]=e("label",{class:"form-label"},"X",-1)),e("input",{type:"number",value:Math.round(a.value.x),class:"input",onChange:t[39]||(t[39]=o=>qe("x",o.target.value))},null,40,Zs)]),e("div",er,[t[218]||(t[218]=e("label",{class:"form-label"},"Y",-1)),e("input",{type:"number",value:Math.round(a.value.y),class:"input",onChange:t[40]||(t[40]=o=>qe("y",o.target.value))},null,40,tr)]),e("div",or,[t[219]||(t[219]=e("label",{class:"form-label"},"W",-1)),e("input",{type:"number",value:Math.round(a.value.width),class:"input",onChange:t[41]||(t[41]=o=>qe("width",o.target.value))},null,40,nr)]),e("div",lr,[t[220]||(t[220]=e("label",{class:"form-label"},"H",-1)),e("input",{type:"number",value:Math.round(a.value.height),class:"input",onChange:t[42]||(t[42]=o=>qe("height",o.target.value))},null,40,ir)]),e("div",ar,[t[221]||(t[221]=e("label",{class:"form-label"},"Rot °",-1)),e("input",{type:"number",value:Math.round(a.value.rotation||0),class:"input",onChange:t[43]||(t[43]=o=>qe("rotation",o.target.value))},null,40,sr)]),e("div",rr,[t[222]||(t[222]=e("label",{class:"form-label"},"Opacity",-1)),e("input",{type:"number",min:"0",max:"1",step:".05",value:a.value.opacity??1,class:"input",onChange:t[44]||(t[44]=o=>qe("opacity",o.target.value))},null,40,dr)])])],2),e("div",{class:X(["panel-section",re.value==="animation"&&"panel-section-focused"]),"data-props-anchor":"animation"},[t[226]||(t[226]=e("div",{class:"panel-title"},"Animation",-1)),e("div",ur,[e("div",{class:"motion-scrubber-header"},[t[223]||(t[223]=e("span",{class:"motion-scrubber-title"},"Live Motion Preview",-1)),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:jt},"Replay")]),(l(),i("div",{class:"motion-scrubber-stage motion-scrubber-stage-single",key:`single-preview-${F.value}`},[(l(!0),i(te,null,ue(J.value,o=>(l(),i("span",{key:o.id,class:X(["motion-scrubber-node",`motion-preview-live-${o.type==="auto"?"fade-up":o.type}`]),style:he({"--preview-delay":`${o.delay}s`,"--preview-duration":`${o.duration}s`})},null,6))),128))]))]),e("div",cr,[(l(),i(te,null,ue(Ye,o=>e("button",{key:o.value,type:"button",class:X(["motion-card",Y.value.type===o.value&&"active"]),onClick:Q=>xt({type:o.value})},[e("span",vr,[e("span",{class:X(["motion-preview-dot",o.sampleClass])},null,2),o.value==="stagger-in"?(l(),i("span",fr)):R("",!0),o.value==="stagger-in"?(l(),i("span",gr)):R("",!0)]),e("span",mr,w(o.label),1)],10,pr)),64))]),e("div",br,[e("div",yr,[t[224]||(t[224]=e("label",{class:"form-label"},"Delay (seconds)",-1)),e("input",{type:"number",min:"0",step:"0.05",value:Y.value.delay,class:"input",onChange:t[45]||(t[45]=o=>xt({delay:o.target.value}))},null,40,hr)]),e("div",xr,[t[225]||(t[225]=e("label",{class:"form-label"},"Duration (seconds)",-1)),e("input",{type:"number",min:"0.1",step:"0.05",value:Y.value.duration,class:"input",onChange:t[46]||(t[46]=o=>xt({duration:o.target.value}))},null,40,kr)])]),e("div",wr,[ce(e("input",{"onUpdate:modelValue":t[47]||(t[47]=o=>oe.value=o),class:"input",placeholder:"Save as preset, e.g. Hero Intro"},null,512),[[Se,oe.value]]),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Ut},"Save")]),e("div",Cr,[ce(e("input",{"onUpdate:modelValue":t[48]||(t[48]=o=>C.value=o),class:"input",placeholder:"Category, e.g. Presentation"},null,512),[[Se,C.value]]),ce(e("input",{"onUpdate:modelValue":t[49]||(t[49]=o=>j.value=o),class:"input",placeholder:"Tags, comma separated"},null,512),[[Se,j.value]])]),Z.value.length?(l(),i("div",Sr,[(l(!0),i(te,null,ue(Z.value,o=>(l(),i("div",{key:o.id,class:X(["preset-item",le.value===o.id&&"dragging",we.value===o.id&&le.value!==o.id&&"drag-over"]),draggable:"true",onDragstart:Q=>ft(o),onDragenter:Oe(Q=>mt(o),["prevent"]),onDragover:t[53]||(t[53]=Oe(()=>{},["prevent"])),onDrop:Oe(Q=>Lt(o),["prevent"]),onDragend:bt},[e("button",{type:"button",class:"preset-chip",onClick:Q=>Rt(o)},w(o.name),9,Ir),o.category?(l(),i("span",Er,w(o.category),1)):R("",!0),(l(!0),i(te,null,ue(o.tags||[],Q=>(l(),i("span",{key:`${o.id}-${Q}`,class:"preset-meta-chip muted"},"#"+w(Q),1))),128)),e("button",{type:"button",class:"preset-mini-btn",onClick:Q=>Ze(o)},"Duplicate",8,Ar),e("button",{type:"button",class:"preset-mini-btn",onClick:Q=>Re(o)},"Rename",8,Mr),e("button",{type:"button",class:"preset-mini-btn danger",onClick:Q=>$e(o.id)},"Delete",8,Pr),O.value===o.id?(l(),i("div",Tr,[ce(e("input",{"onUpdate:modelValue":t[50]||(t[50]=Q=>U.value=Q),class:"input"},null,512),[[Se,U.value]]),ce(e("input",{"onUpdate:modelValue":t[51]||(t[51]=Q=>pe.value=Q),class:"input",placeholder:"Category"},null,512),[[Se,pe.value]]),ce(e("input",{"onUpdate:modelValue":t[52]||(t[52]=Q=>be.value=Q),class:"input",placeholder:"Tags, comma separated"},null,512),[[Se,be.value]]),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Q=>Ve(o.id)},"Save",8,Br),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Be},"Cancel")])):R("",!0)],42,$r))),128))])):me.value.length?(l(),i("div",Nr,"No single-element presets match the current search.")):R("",!0),t[227]||(t[227]=e("div",{class:"field-hint"},"Use Auto to keep the preview defaults, or override with a specific entrance effect.",-1))],2),["text","heading"].includes(a.value.type)?(l(),i("div",{key:0,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[243]||(t[243]=e("div",{class:"panel-title"},"Text",-1)),e("div",zr,[t[228]||(t[228]=e("label",{class:"form-label"},"Content",-1)),e("textarea",{value:(kt=a.value.content)==null?void 0:kt.text,class:"textarea",style:{"min-height":"64px"},onInput:t[54]||(t[54]=o=>g({text:o.target.value}))},null,40,Lr)]),e("div",jr,[e("div",_r,[t[229]||(t[229]=e("label",{class:"form-label"},"Size",-1)),e("input",{type:"number",value:(lt=a.value.content)==null?void 0:lt.fontSize,class:"input",onChange:t[55]||(t[55]=o=>g({fontSize:+o.target.value}))},null,40,Dr)]),e("div",qr,[t[231]||(t[231]=e("label",{class:"form-label"},"Weight",-1)),e("select",{value:(Pt=a.value.content)==null?void 0:Pt.fontWeight,class:"select",onChange:t[56]||(t[56]=o=>g({fontWeight:o.target.value}))},[...t[230]||(t[230]=[e("option",{value:"normal"},"Normal",-1),e("option",{value:"bold"},"Bold",-1),e("option",{value:"600"},"Semi-bold",-1),e("option",{value:"300"},"Light",-1)])],40,Rr)])]),e("div",Or,[t[232]||(t[232]=e("label",{class:"form-label"},"Font Family",-1)),e("select",{value:(Ht=a.value.content)==null?void 0:Ht.fontFamily,class:"select",onChange:t[57]||(t[57]=o=>g({fontFamily:o.target.value}))},[(l(),i(te,null,ue(M,o=>e("option",{key:o,value:o},w(o.split(",")[0]),9,Ur)),64))],40,Fr)]),e("div",Vr,[t[233]||(t[233]=e("label",{class:"form-label"},"Align",-1)),e("div",Wr,[(l(),i(te,null,ue(["left","center","right","justify"],o=>{var Q;return e("button",{key:o,class:X(["align-btn",((Q=a.value.content)==null?void 0:Q.textAlign)===o&&"active"]),onClick:cl=>g({textAlign:o})},w(o[0].toUpperCase()),11,Gr)}),64))])]),e("div",Hr,[t[237]||(t[237]=e("label",{class:"form-label"},"Style",-1)),e("div",Yr,[e("button",{class:X(["style-btn",((Yt=a.value.content)==null?void 0:Yt.fontStyle)==="italic"&&"active"]),onClick:t[58]||(t[58]=o=>{var Q;return g({fontStyle:((Q=a.value.content)==null?void 0:Q.fontStyle)==="italic"?"normal":"italic"})})},[...t[234]||(t[234]=[e("i",null,"I",-1)])],2),e("button",{class:X(["style-btn",((Jt=a.value.content)==null?void 0:Jt.textDecoration)==="underline"&&"active"]),onClick:t[59]||(t[59]=o=>{var Q;return g({textDecoration:((Q=a.value.content)==null?void 0:Q.textDecoration)==="underline"?"none":"underline"})})},[...t[235]||(t[235]=[e("u",null,"U",-1)])],2),e("button",{class:X(["style-btn",((Qt=a.value.content)==null?void 0:Qt.textDecoration)==="line-through"&&"active"]),onClick:t[60]||(t[60]=o=>{var Q;return g({textDecoration:((Q=a.value.content)==null?void 0:Q.textDecoration)==="line-through"?"none":"line-through"})})},[...t[236]||(t[236]=[e("s",null,"S",-1)])],2)])]),e("div",Jr,[t[238]||(t[238]=e("label",{class:"form-label"},"Color",-1)),e("div",Qr,[e("input",{type:"color",value:((Xt=a.value.content)==null?void 0:Xt.color)||"#000",onInput:t[61]||(t[61]=o=>g({color:o.target.value})),class:"color-input-native"},null,40,Xr),e("input",{value:((Kt=a.value.content)==null?void 0:Kt.color)||"#000",class:"input",onInput:t[62]||(t[62]=o=>g({color:o.target.value})),style:{"font-family":"var(--font-mono)","font-size":"var(--text-xs)"}},null,40,Kr)])]),e("div",Zr,[t[239]||(t[239]=e("label",{class:"form-label"},"Line Height",-1)),e("input",{type:"number",min:".8",max:"3",step:".1",value:((Zt=a.value.content)==null?void 0:Zt.lineHeight)??1.5,class:"input",onChange:t[63]||(t[63]=o=>g({lineHeight:+o.target.value}))},null,40,ed)]),e("div",td,[e("div",od,[t[241]||(t[241]=e("label",{class:"form-label"},"Case",-1)),e("select",{value:((eo=a.value.content)==null?void 0:eo.textTransform)||"none",class:"select",onChange:t[64]||(t[64]=o=>g({textTransform:o.target.value}))},[...t[240]||(t[240]=[e("option",{value:"none"},"Normal",-1),e("option",{value:"uppercase"},"UPPERCASE",-1),e("option",{value:"lowercase"},"lowercase",-1),e("option",{value:"capitalize"},"Capitalize",-1)])],40,nd)]),e("div",ld,[t[242]||(t[242]=e("label",{class:"form-label"},"Letter Spacing",-1)),e("input",{type:"number",step:".2",value:((to=a.value.content)==null?void 0:to.letterSpacing)??0,class:"input",onChange:t[65]||(t[65]=o=>g({letterSpacing:+o.target.value}))},null,40,id)])])],2)):R("",!0),a.value.type==="image"?(l(),i("div",{key:1,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[251]||(t[251]=e("div",{class:"panel-title"},"Image",-1)),e("div",ad,[t[244]||(t[244]=e("label",{class:"form-label"},"Source URL",-1)),e("input",{value:(oo=a.value.content)==null?void 0:oo.src,class:"input",placeholder:"https://...",onInput:t[66]||(t[66]=o=>g({src:o.target.value}))},null,40,sd)]),e("div",rd,[t[245]||(t[245]=e("label",{class:"form-label"},"Alt Text",-1)),e("input",{value:(no=a.value.content)==null?void 0:no.alt,class:"input",onInput:t[67]||(t[67]=o=>g({alt:o.target.value}))},null,40,dd)]),e("div",ud,[t[247]||(t[247]=e("label",{class:"form-label"},"Object Fit",-1)),e("select",{value:((lo=a.value.content)==null?void 0:lo.objectFit)||"cover",class:"select",onChange:t[68]||(t[68]=o=>g({objectFit:o.target.value}))},[...t[246]||(t[246]=[e("option",{value:"cover"},"Cover",-1),e("option",{value:"contain"},"Contain",-1),e("option",{value:"fill"},"Fill",-1),e("option",{value:"none"},"None",-1)])],40,cd)]),e("div",pd,[t[248]||(t[248]=e("label",{class:"form-label"},"Border Radius",-1)),e("input",{type:"number",min:"0",value:((io=a.value.content)==null?void 0:io.borderRadius)||0,class:"input",onChange:t[69]||(t[69]=o=>g({borderRadius:+o.target.value}))},null,40,vd)]),e("div",fd,[e("div",gd,[t[249]||(t[249]=e("label",{class:"form-label"},"Border Width",-1)),e("input",{type:"number",min:"0",value:((ao=a.value.content)==null?void 0:ao.borderWidth)||0,class:"input",onChange:t[70]||(t[70]=o=>g({borderWidth:+o.target.value}))},null,40,md)]),e("div",bd,[t[250]||(t[250]=e("label",{class:"form-label"},"Border Color",-1)),e("input",{type:"color",value:((so=a.value.content)==null?void 0:so.borderColor)||"#e2e8f0",class:"color-input-native",onInput:t[71]||(t[71]=o=>g({borderColor:o.target.value}))},null,40,yd)])])],2)):R("",!0),a.value.type==="shape"?(l(),i("div",{key:2,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[259]||(t[259]=e("div",{class:"panel-title"},"Shape",-1)),e("div",hd,[t[253]||(t[253]=e("label",{class:"form-label"},"Type",-1)),e("select",{value:((ro=a.value.content)==null?void 0:ro.shapeType)||"rectangle",class:"select",onChange:t[72]||(t[72]=o=>g({shapeType:o.target.value}))},[...t[252]||(t[252]=[et('<option value="rectangle" data-v-daf50f54>Rectangle</option><option value="circle" data-v-daf50f54>Circle</option><option value="triangle" data-v-daf50f54>Triangle</option><option value="star" data-v-daf50f54>Star</option><option value="arrow" data-v-daf50f54>Arrow</option><option value="diamond" data-v-daf50f54>Diamond</option>',6)])],40,xd)]),e("div",kd,[t[254]||(t[254]=e("label",{class:"form-label"},"Fill Color",-1)),e("div",wd,[e("input",{type:"color",value:((uo=a.value.content)==null?void 0:uo.fillColor)||"#6c47ff",onInput:t[73]||(t[73]=o=>g({fillColor:o.target.value})),class:"color-input-native"},null,40,Cd),e("input",{value:((co=a.value.content)==null?void 0:co.fillColor)||"#6c47ff",class:"input",onInput:t[74]||(t[74]=o=>g({fillColor:o.target.value})),style:{"font-family":"var(--font-mono)","font-size":"var(--text-xs)"}},null,40,Sd)])]),e("div",$d,[t[255]||(t[255]=e("label",{class:"form-label"},"Border Color",-1)),e("div",Id,[e("input",{type:"color",value:((po=a.value.content)==null?void 0:po.borderColor)||"transparent",onInput:t[75]||(t[75]=o=>g({borderColor:o.target.value})),class:"color-input-native"},null,40,Ed),e("input",{value:((vo=a.value.content)==null?void 0:vo.borderColor)||"transparent",class:"input",onInput:t[76]||(t[76]=o=>g({borderColor:o.target.value})),style:{"font-family":"var(--font-mono)","font-size":"var(--text-xs)"}},null,40,Ad)])]),e("div",Md,[t[256]||(t[256]=e("label",{class:"form-label"},"Border Width",-1)),e("input",{type:"number",min:"0",value:((fo=a.value.content)==null?void 0:fo.borderWidth)||0,class:"input",onChange:t[77]||(t[77]=o=>g({borderWidth:+o.target.value}))},null,40,Pd)]),e("div",Td,[t[257]||(t[257]=e("label",{class:"form-label"},"Corner Radius",-1)),e("input",{type:"number",min:"0",value:((go=a.value.content)==null?void 0:go.borderRadius)||0,class:"input",onChange:t[78]||(t[78]=o=>g({borderRadius:+o.target.value}))},null,40,Bd)]),e("div",Nd,[t[258]||(t[258]=e("label",{class:"form-label"},"Fill Opacity",-1)),e("input",{type:"number",min:"0",max:"1",step:".05",value:((mo=a.value.content)==null?void 0:mo.opacity)??1,class:"input",onChange:t[79]||(t[79]=o=>g({opacity:+o.target.value}))},null,40,zd)])],2)):R("",!0),a.value.type==="chart"?(l(),i("div",{key:3,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[280]||(t[280]=e("div",{class:"panel-title"},"Chart",-1)),e("div",Ld,[t[261]||(t[261]=e("label",{class:"form-label"},"Chart Type",-1)),e("select",{value:((bo=a.value.content)==null?void 0:bo.chartType)||"bar",class:"select",onChange:t[80]||(t[80]=o=>g({chartType:o.target.value}))},[...t[260]||(t[260]=[e("option",{value:"bar"},"Bar",-1),e("option",{value:"line"},"Line",-1),e("option",{value:"circle"},"Circle",-1)])],40,jd)]),e("div",_d,[t[262]||(t[262]=e("label",{class:"form-label"},"Title",-1)),e("input",{value:((yo=a.value.content)==null?void 0:yo.title)||"",class:"input",onInput:t[81]||(t[81]=o=>g({title:o.target.value}))},null,40,Dd)]),e("div",qd,[t[263]||(t[263]=e("label",{class:"form-label"},"Data or pasted CSV/TSV",-1)),e("textarea",{value:((ho=a.value.content)==null?void 0:ho.dataText)||"",class:"textarea",style:{"min-height":"110px"},placeholder:`Q1, 120
Q2, 180
Q3, 150`,onInput:t[82]||(t[82]=o=>g({dataText:o.target.value}))},null,40,Rd),e("div",{class:"chart-data-actions"},[e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Ct},"Normalize rows"),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Ke},"Upload CSV")]),t[264]||(t[264]=e("div",{class:"field-hint"},"Use `label, value`, `label: value`, spreadsheet tab-separated rows, or a two-column CSV. Percentages and totals are calculated automatically for circle charts.",-1))]),e("div",Od,[t[265]||(t[265]=e("label",{class:"form-label"},"Paste table data",-1)),ce(e("textarea",{"onUpdate:modelValue":t[83]||(t[83]=o=>ge.value=o),class:"textarea",style:{"min-height":"84px"},placeholder:`Label,Value
North,42
South,31`},null,512),[[Se,ge.value]]),e("div",Fd,[e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:t[84]||(t[84]=o=>De(ge.value))},"Convert pasted data")])]),e("div",Ud,[t[266]||(t[266]=e("label",{class:"form-label"},"Palette",-1)),e("input",{value:((xo=a.value.content)==null?void 0:xo.paletteText)||"",class:"input",placeholder:ot.value.paletteText,onInput:t[85]||(t[85]=o=>g({paletteText:o.target.value}))},null,40,Vd),e("div",Wd,[(l(!0),i(te,null,ue(wt.value,(o,Q)=>(l(),i("span",{key:`chart-palette-${Q}`,class:"chart-palette-swatch",style:he({background:o})},null,4))),128))]),e("div",{class:"chart-data-actions"},[e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:$t},"Use theme palette"),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:St},"Apply theme colors")]),t[267]||(t[267]=e("div",{class:"field-hint"},"Separate colors with commas. Theme palette uses the project theme colors if you leave this aligned with the generated value.",-1))]),e("div",Gd,[e("div",Hd,[t[268]||(t[268]=e("label",{class:"form-label"},"Background",-1)),e("input",{type:"color",value:((ko=a.value.content)==null?void 0:ko.backgroundColor)||"#ffffff",class:"color-input-native",onInput:t[86]||(t[86]=o=>g({backgroundColor:o.target.value}))},null,40,Yd)]),e("div",Jd,[t[269]||(t[269]=e("label",{class:"form-label"},"Text",-1)),e("input",{type:"color",value:((wo=a.value.content)==null?void 0:wo.textColor)||"#1a1a2e",class:"color-input-native",onInput:t[87]||(t[87]=o=>g({textColor:o.target.value}))},null,40,Qd)])]),e("div",Xd,[e("div",Kd,[t[270]||(t[270]=e("label",{class:"form-label"},"Grid",-1)),e("input",{type:"color",value:((Co=a.value.content)==null?void 0:Co.gridColor)||"#dbe3ef",class:"color-input-native",onInput:t[88]||(t[88]=o=>g({gridColor:o.target.value}))},null,40,Zd)]),e("div",eu,[t[271]||(t[271]=e("label",{class:"form-label"},"Border",-1)),e("input",{type:"color",value:((So=a.value.content)==null?void 0:So.borderColor)||"#e2e8f0",class:"color-input-native",onInput:t[89]||(t[89]=o=>g({borderColor:o.target.value}))},null,40,tu)])]),e("div",ou,[e("div",nu,[t[272]||(t[272]=e("label",{class:"form-label"},"Border Width",-1)),e("input",{type:"number",min:"0",value:(($o=a.value.content)==null?void 0:$o.borderWidth)??1,class:"input",onChange:t[90]||(t[90]=o=>g({borderWidth:+o.target.value}))},null,40,lu)]),((Io=a.value.content)==null?void 0:Io.chartType)!=="circle"?(l(),i("div",iu,[t[273]||(t[273]=e("label",{class:"form-label"},"Max Value",-1)),e("input",{value:((Eo=a.value.content)==null?void 0:Eo.maxValue)??"",class:"input",placeholder:"Auto",onInput:t[91]||(t[91]=o=>g({maxValue:o.target.value}))},null,40,au)])):(l(),i("div",su,[t[274]||(t[274]=e("label",{class:"form-label"},"Inner Radius %",-1)),e("input",{type:"number",min:"20",max:"85",value:((Ao=a.value.content)==null?void 0:Ao.innerRadius)??62,class:"input",onChange:t[92]||(t[92]=o=>g({innerRadius:+o.target.value}))},null,40,ru)]))]),((Mo=a.value.content)==null?void 0:Mo.chartType)==="line"?(l(),i("div",du,[e("div",uu,[t[275]||(t[275]=e("label",{class:"form-label"},"Line Width",-1)),e("input",{type:"number",min:"1",max:"8",value:((Po=a.value.content)==null?void 0:Po.strokeWidth)??3,class:"input",onChange:t[93]||(t[93]=o=>g({strokeWidth:+o.target.value}))},null,40,cu)]),e("label",pu,[e("input",{type:"checkbox",checked:!!((To=a.value.content)!=null&&To.showArea),onChange:t[94]||(t[94]=o=>g({showArea:o.target.checked}))},null,40,vu),t[276]||(t[276]=ee(" Show area fill ",-1))])])):R("",!0),e("label",fu,[e("input",{type:"checkbox",checked:((Bo=a.value.content)==null?void 0:Bo.showLegend)!==!1,onChange:t[95]||(t[95]=o=>g({showLegend:o.target.checked}))},null,40,gu),t[277]||(t[277]=ee(" Show legend ",-1))]),((No=a.value.content)==null?void 0:No.chartType)!=="circle"?(l(),i("label",mu,[e("input",{type:"checkbox",checked:((zo=a.value.content)==null?void 0:zo.showGrid)!==!1,onChange:t[96]||(t[96]=o=>g({showGrid:o.target.checked}))},null,40,bu),t[278]||(t[278]=ee(" Show grid lines ",-1))])):R("",!0),e("label",yu,[e("input",{type:"checkbox",checked:((Lo=a.value.content)==null?void 0:Lo.showValues)!==!1,onChange:t[97]||(t[97]=o=>g({showValues:o.target.checked}))},null,40,hu),t[279]||(t[279]=ee(" Show values ",-1))])],2)):R("",!0),a.value.type==="button"?(l(),i("div",{key:4,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[296]||(t[296]=e("div",{class:"panel-title"},"Button",-1)),e("div",xu,[t[281]||(t[281]=e("label",{class:"form-label"},"Label",-1)),e("input",{value:(jo=a.value.content)==null?void 0:jo.label,class:"input",onInput:t[98]||(t[98]=o=>g({label:o.target.value}))},null,40,ku)]),e("div",wu,[t[283]||(t[283]=e("label",{class:"form-label"},"Style",-1)),e("select",{value:((_o=a.value.content)==null?void 0:_o.variant)||"primary",class:"select",onChange:t[99]||(t[99]=o=>g({variant:o.target.value}))},[...t[282]||(t[282]=[et('<option value="primary" data-v-daf50f54>Primary</option><option value="secondary" data-v-daf50f54>Secondary</option><option value="outline" data-v-daf50f54>Outline</option><option value="ghost" data-v-daf50f54>Ghost</option><option value="danger" data-v-daf50f54>Danger</option>',5)])],40,Cu)]),e("div",Su,[t[285]||(t[285]=e("label",{class:"form-label"},"Action",-1)),e("select",{value:((Do=a.value.content)==null?void 0:Do.action)||"none",class:"select",onChange:t[100]||(t[100]=o=>g({action:o.target.value}))},[...t[284]||(t[284]=[e("option",{value:"none"},"None",-1),e("option",{value:"navigate"},"Navigate to slide",-1),e("option",{value:"link"},"Open URL",-1),e("option",{value:"submit"},"Submit",-1)])],40,$u)]),(qo=a.value.content)!=null&&qo.action&&a.value.content.action!=="none"?(l(),i("div",Iu,[t[286]||(t[286]=e("label",{class:"form-label"},"Target (slide # or URL)",-1)),e("input",{value:(Ro=a.value.content)==null?void 0:Ro.target,class:"input",placeholder:"Slide # or https://...",onInput:t[101]||(t[101]=o=>g({target:o.target.value}))},null,40,Eu)])):R("",!0),e("div",Au,[e("div",Mu,[t[287]||(t[287]=e("label",{class:"form-label"},"Background",-1)),e("input",{type:"color",value:((Oo=a.value.content)==null?void 0:Oo.bgColor)||"#6c47ff",class:"color-input-native",onInput:t[102]||(t[102]=o=>g({bgColor:o.target.value}))},null,40,Pu)]),e("div",Tu,[t[288]||(t[288]=e("label",{class:"form-label"},"Text Color",-1)),e("input",{type:"color",value:((Fo=a.value.content)==null?void 0:Fo.textColor)||"#ffffff",class:"color-input-native",onInput:t[103]||(t[103]=o=>g({textColor:o.target.value}))},null,40,Bu)])]),e("div",Nu,[e("div",zu,[t[289]||(t[289]=e("label",{class:"form-label"},"Border Color",-1)),e("input",{type:"color",value:((Uo=a.value.content)==null?void 0:Uo.borderColor)||"#6c47ff",class:"color-input-native",onInput:t[104]||(t[104]=o=>g({borderColor:o.target.value}))},null,40,Lu)]),e("div",ju,[t[290]||(t[290]=e("label",{class:"form-label"},"Corner Radius",-1)),e("input",{type:"number",min:"0",value:((Vo=a.value.content)==null?void 0:Vo.borderRadius)??8,class:"input",onChange:t[105]||(t[105]=o=>g({borderRadius:+o.target.value}))},null,40,_u)])]),e("div",Du,[e("div",qu,[t[291]||(t[291]=e("label",{class:"form-label"},"Font Size",-1)),e("input",{type:"number",min:"10",value:((Wo=a.value.content)==null?void 0:Wo.fontSize)??15,class:"input",onChange:t[106]||(t[106]=o=>g({fontSize:+o.target.value}))},null,40,Ru)]),e("div",Ou,[t[293]||(t[293]=e("label",{class:"form-label"},"Weight",-1)),e("select",{value:String(((Go=a.value.content)==null?void 0:Go.fontWeight)??600),class:"select",onChange:t[107]||(t[107]=o=>g({fontWeight:+o.target.value}))},[...t[292]||(t[292]=[e("option",{value:"400"},"Normal",-1),e("option",{value:"500"},"Medium",-1),e("option",{value:"600"},"Semi-bold",-1),e("option",{value:"700"},"Bold",-1)])],40,Fu)])]),e("div",Uu,[e("div",Vu,[t[294]||(t[294]=e("label",{class:"form-label"},"Font Family",-1)),e("select",{value:((Ho=a.value.content)==null?void 0:Ho.fontFamily)||"Inter, sans-serif",class:"select",onChange:t[108]||(t[108]=o=>g({fontFamily:o.target.value}))},[(l(),i(te,null,ue(M,o=>e("option",{key:`btn-${o}`,value:o},w(o.split(",")[0]),9,Gu)),64))],40,Wu)]),e("div",Hu,[t[295]||(t[295]=e("label",{class:"form-label"},"Letter Spacing",-1)),e("input",{type:"number",step:".2",value:((Yo=a.value.content)==null?void 0:Yo.letterSpacing)??0,class:"input",onChange:t[109]||(t[109]=o=>g({letterSpacing:+o.target.value}))},null,40,Yu)])])],2)):R("",!0),a.value.type==="hotspot"?(l(),i("div",{key:5,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[306]||(t[306]=e("div",{class:"panel-title"},"Hotspot",-1)),e("div",Ju,[t[298]||(t[298]=e("label",{class:"form-label"},"Icon",-1)),e("select",{value:((Jo=a.value.content)==null?void 0:Jo.icon)||"?",class:"select",onChange:t[110]||(t[110]=o=>g({icon:o.target.value}))},[...t[297]||(t[297]=[et('<option value="?" data-v-daf50f54>? (Info)</option><option value="!" data-v-daf50f54>! (Alert)</option><option value="+" data-v-daf50f54>+ (Plus)</option><option value="i" data-v-daf50f54>i (Info)</option><option value="✦" data-v-daf50f54>✦ (Star)</option>',5)])],40,Qu)]),e("div",Xu,[t[299]||(t[299]=e("label",{class:"form-label"},"Background Color",-1)),e("div",Ku,[e("input",{type:"color",value:((Qo=a.value.content)==null?void 0:Qo.bgColor)||"#6c47ff",onInput:t[111]||(t[111]=o=>g({bgColor:o.target.value})),class:"color-input-native"},null,40,Zu),e("input",{value:((Xo=a.value.content)==null?void 0:Xo.bgColor)||"#6c47ff",class:"input",onInput:t[112]||(t[112]=o=>g({bgColor:o.target.value})),style:{"font-family":"var(--font-mono)","font-size":"var(--text-xs)"}},null,40,ec)])]),e("div",tc,[e("div",oc,[t[300]||(t[300]=e("label",{class:"form-label"},"Icon Color",-1)),e("input",{type:"color",value:((Ko=a.value.content)==null?void 0:Ko.iconColor)||"#ffffff",class:"color-input-native",onInput:t[113]||(t[113]=o=>g({iconColor:o.target.value}))},null,40,nc)]),e("div",lc,[t[301]||(t[301]=e("label",{class:"form-label"},"Corner Radius",-1)),e("input",{type:"number",min:"0",value:((Zo=a.value.content)==null?void 0:Zo.borderRadius)??999,class:"input",onChange:t[114]||(t[114]=o=>g({borderRadius:+o.target.value}))},null,40,ic)])]),e("div",ac,[t[302]||(t[302]=e("label",{class:"form-label"},"Popup Title",-1)),e("input",{value:(en=a.value.content)==null?void 0:en.popupTitle,class:"input",onInput:t[115]||(t[115]=o=>g({popupTitle:o.target.value}))},null,40,sc)]),e("div",rc,[t[303]||(t[303]=e("label",{class:"form-label"},"Popup Content",-1)),e("textarea",{value:(tn=a.value.content)==null?void 0:tn.popupContent,class:"textarea",onInput:t[116]||(t[116]=o=>g({popupContent:o.target.value}))},null,40,dc)]),e("div",uc,[e("div",cc,[t[304]||(t[304]=e("label",{class:"form-label"},"Popup Background",-1)),e("input",{type:"color",value:((on=a.value.content)==null?void 0:on.popupBgColor)||"#ffffff",class:"color-input-native",onInput:t[117]||(t[117]=o=>g({popupBgColor:o.target.value}))},null,40,pc)]),e("div",vc,[t[305]||(t[305]=e("label",{class:"form-label"},"Popup Text",-1)),e("input",{type:"color",value:((nn=a.value.content)==null?void 0:nn.popupTextColor)||"#1a1a2e",class:"color-input-native",onInput:t[118]||(t[118]=o=>g({popupTextColor:o.target.value}))},null,40,fc)])])],2)):R("",!0),a.value.type==="video"?(l(),i("div",{key:6,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[315]||(t[315]=e("div",{class:"panel-title"},"Video",-1)),e("div",gc,[t[307]||(t[307]=e("label",{class:"form-label"},"Video URL / Embed",-1)),e("input",{value:(ln=a.value.content)==null?void 0:ln.src,class:"input",placeholder:"YouTube, Vimeo, or direct .mp4 URL",onInput:t[119]||(t[119]=o=>g({src:o.target.value}))},null,40,mc)]),e("div",bc,[t[308]||(t[308]=e("label",{class:"form-label"},"Poster Image URL",-1)),e("input",{value:(an=a.value.content)==null?void 0:an.poster,class:"input",onInput:t[120]||(t[120]=o=>g({poster:o.target.value}))},null,40,yc)]),e("div",hc,[t[310]||(t[310]=e("label",{class:"form-label"},"Object Fit",-1)),e("select",{value:((sn=a.value.content)==null?void 0:sn.objectFit)||"cover",class:"select",onChange:t[121]||(t[121]=o=>g({objectFit:o.target.value}))},[...t[309]||(t[309]=[e("option",{value:"cover"},"Cover",-1),e("option",{value:"contain"},"Contain",-1),e("option",{value:"fill"},"Fill",-1),e("option",{value:"none"},"None",-1)])],40,xc)]),e("label",kc,[e("input",{type:"checkbox",checked:(rn=a.value.content)==null?void 0:rn.autoplay,onChange:t[122]||(t[122]=o=>g({autoplay:o.target.checked}))},null,40,wc),t[311]||(t[311]=ee(" Autoplay ",-1))]),e("label",Cc,[e("input",{type:"checkbox",checked:((dn=a.value.content)==null?void 0:dn.controls)??!0,onChange:t[123]||(t[123]=o=>g({controls:o.target.checked}))},null,40,Sc),t[312]||(t[312]=ee(" Show Controls ",-1))]),e("label",$c,[e("input",{type:"checkbox",checked:(un=a.value.content)==null?void 0:un.loop,onChange:t[124]||(t[124]=o=>g({loop:o.target.checked}))},null,40,Ic),t[313]||(t[313]=ee(" Loop ",-1))]),e("label",Ec,[e("input",{type:"checkbox",checked:(cn=a.value.content)==null?void 0:cn.muted,onChange:t[125]||(t[125]=o=>g({muted:o.target.checked}))},null,40,Ac),t[314]||(t[314]=ee(" Muted ",-1))])],2)):R("",!0),a.value.type==="audio"?(l(),i("div",{key:7,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[324]||(t[324]=e("div",{class:"panel-title"},"Audio",-1)),e("div",Mc,[t[316]||(t[316]=e("label",{class:"form-label"},"Audio URL",-1)),e("input",{value:(pn=a.value.content)==null?void 0:pn.src,class:"input",placeholder:".mp3 / .wav URL",onInput:t[126]||(t[126]=o=>g({src:o.target.value}))},null,40,Pc)]),e("div",Tc,[t[317]||(t[317]=e("label",{class:"form-label"},"Label",-1)),e("input",{value:(vn=a.value.content)==null?void 0:vn.label,class:"input",onInput:t[127]||(t[127]=o=>g({label:o.target.value}))},null,40,Bc)]),e("label",Nc,[e("input",{type:"checkbox",checked:(fn=a.value.content)==null?void 0:fn.autoplay,onChange:t[128]||(t[128]=o=>g({autoplay:o.target.checked}))},null,40,zc),t[318]||(t[318]=ee(" Autoplay ",-1))]),e("label",Lc,[e("input",{type:"checkbox",checked:((gn=a.value.content)==null?void 0:gn.controls)!==!1,onChange:t[129]||(t[129]=o=>g({controls:o.target.checked}))},null,40,jc),t[319]||(t[319]=ee(" Show Controls ",-1))]),e("label",_c,[e("input",{type:"checkbox",checked:(mn=a.value.content)==null?void 0:mn.loop,onChange:t[130]||(t[130]=o=>g({loop:o.target.checked}))},null,40,Dc),t[320]||(t[320]=ee(" Loop ",-1))]),e("div",qc,[e("div",Rc,[t[321]||(t[321]=e("label",{class:"form-label"},"Accent Color",-1)),e("input",{type:"color",value:((bn=a.value.content)==null?void 0:bn.accentColor)||"#6c47ff",class:"color-input-native",onInput:t[131]||(t[131]=o=>g({accentColor:o.target.value}))},null,40,Oc)]),e("div",Fc,[t[322]||(t[322]=e("label",{class:"form-label"},"Text Color",-1)),e("input",{type:"color",value:((yn=a.value.content)==null?void 0:yn.textColor)||"#555555",class:"color-input-native",onInput:t[132]||(t[132]=o=>g({textColor:o.target.value}))},null,40,Uc)])]),e("div",Vc,[t[323]||(t[323]=e("label",{class:"form-label"},"Background Color",-1)),e("input",{type:"color",value:((hn=a.value.content)==null?void 0:hn.bgColor)||"#ede7ff",class:"color-input-native",onInput:t[133]||(t[133]=o=>g({bgColor:o.target.value}))},null,40,Wc)])],2)):R("",!0),a.value.type==="quiz"?(l(),i("div",{key:8,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[332]||(t[332]=e("div",{class:"panel-title"},"Quiz Question",-1)),e("div",Gc,[t[325]||(t[325]=e("label",{class:"form-label"},"Question",-1)),e("textarea",{value:(xn=a.value.content)==null?void 0:xn.question,class:"textarea",style:{"min-height":"60px"},onInput:t[134]||(t[134]=o=>g({question:o.target.value}))},null,40,Hc)]),e("div",Yc,[t[326]||(t[326]=e("label",{class:"form-label"},"Options (one per line)",-1)),e("textarea",{value:(wn=(kn=a.value.content)==null?void 0:kn.options)==null?void 0:wn.join(`
`),class:"textarea",style:{"min-height":"80px"},onInput:t[135]||(t[135]=o=>g({options:o.target.value.split(`
`).filter(Boolean)}))},null,40,Jc)]),e("div",Qc,[t[327]||(t[327]=e("label",{class:"form-label"},"Correct Answer Index (0-based)",-1)),e("input",{type:"number",min:"0",value:((Cn=a.value.content)==null?void 0:Cn.correctIndex)??0,class:"input",onChange:t[136]||(t[136]=o=>g({correctIndex:+o.target.value}))},null,40,Xc)]),e("div",Kc,[t[328]||(t[328]=e("label",{class:"form-label"},"Explanation",-1)),e("textarea",{value:(Sn=a.value.content)==null?void 0:Sn.explanation,class:"textarea",onInput:t[137]||(t[137]=o=>g({explanation:o.target.value}))},null,40,Zc)]),e("div",ep,[e("div",tp,[t[329]||(t[329]=e("label",{class:"form-label"},"Card Background",-1)),e("input",{type:"color",value:(($n=a.value.content)==null?void 0:$n.cardBgColor)||"#ffffff",class:"color-input-native",onInput:t[138]||(t[138]=o=>g({cardBgColor:o.target.value}))},null,40,op)]),e("div",np,[t[330]||(t[330]=e("label",{class:"form-label"},"Question Color",-1)),e("input",{type:"color",value:((In=a.value.content)==null?void 0:In.questionColor)||"#1a1a2e",class:"color-input-native",onInput:t[139]||(t[139]=o=>g({questionColor:o.target.value}))},null,40,lp)])]),e("div",ip,[t[331]||(t[331]=e("label",{class:"form-label"},"Accent Color",-1)),e("input",{type:"color",value:((En=a.value.content)==null?void 0:En.accentColor)||"#6c47ff",class:"color-input-native",onInput:t[140]||(t[140]=o=>g({accentColor:o.target.value}))},null,40,ap)])],2)):a.value.type==="tabs"?(l(),i("div",{key:9,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[338]||(t[338]=e("div",{class:"panel-title"},"Tabs Configuration",-1)),e("div",sp,[t[333]||(t[333]=e("label",{class:"form-label"},"Tabs Data (JSON)",-1)),e("textarea",{value:JSON.stringify(((An=a.value.content)==null?void 0:An.tabs)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px","white-space":"pre"},onChange:t[141]||(t[141]=o=>{var Q;return g({tabs:_e(o.target.value,(Q=a.value.content)==null?void 0:Q.tabs)})})},null,40,rp)]),e("div",dp,[e("div",up,[t[334]||(t[334]=e("label",{class:"form-label"},"Active Tab",-1)),e("input",{type:"color",value:((Mn=a.value.content)==null?void 0:Mn.activeTabColor)||"#6c47ff",class:"color-input-native",onInput:t[142]||(t[142]=o=>g({activeTabColor:o.target.value}))},null,40,cp)]),e("div",pp,[t[335]||(t[335]=e("label",{class:"form-label"},"Inactive Tab",-1)),e("input",{type:"color",value:((Pn=a.value.content)==null?void 0:Pn.inactiveTabColor)||"#f8fafc",class:"color-input-native",onInput:t[143]||(t[143]=o=>g({inactiveTabColor:o.target.value}))},null,40,vp)]),e("div",fp,[t[336]||(t[336]=e("label",{class:"form-label"},"Content Bg",-1)),e("input",{type:"color",value:((Tn=a.value.content)==null?void 0:Tn.contentBgColor)||"#ffffff",class:"color-input-native",onInput:t[144]||(t[144]=o=>g({contentBgColor:o.target.value}))},null,40,gp)]),e("div",mp,[t[337]||(t[337]=e("label",{class:"form-label"},"Text Color",-1)),e("input",{type:"color",value:((Bn=a.value.content)==null?void 0:Bn.textColor)||"#1e293b",class:"color-input-native",onInput:t[145]||(t[145]=o=>g({textColor:o.target.value}))},null,40,bp)])])],2)):a.value.type==="accordion"?(l(),i("div",{key:10,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[344]||(t[344]=e("div",{class:"panel-title"},"Accordion Configuration",-1)),e("div",yp,[t[339]||(t[339]=e("label",{class:"form-label"},"Items Data (JSON)",-1)),e("textarea",{value:JSON.stringify(((Nn=a.value.content)==null?void 0:Nn.items)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px","white-space":"pre"},onChange:t[146]||(t[146]=o=>{var Q;return g({items:_e(o.target.value,(Q=a.value.content)==null?void 0:Q.items)})})},null,40,hp)]),e("div",xp,[e("div",kp,[t[340]||(t[340]=e("label",{class:"form-label"},"Active Bg Color",-1)),e("input",{type:"color",value:((zn=a.value.content)==null?void 0:zn.activeBgColor)||"#f8fafc",class:"color-input-native",onInput:t[147]||(t[147]=o=>g({activeBgColor:o.target.value}))},null,40,wp)]),e("div",Cp,[t[341]||(t[341]=e("label",{class:"form-label"},"Active Title Color",-1)),e("input",{type:"color",value:((Ln=a.value.content)==null?void 0:Ln.activeColor)||"#6c47ff",class:"color-input-native",onInput:t[148]||(t[148]=o=>g({activeColor:o.target.value}))},null,40,Sp)]),e("div",$p,[t[342]||(t[342]=e("label",{class:"form-label"},"Item Bg Color",-1)),e("input",{type:"color",value:((jn=a.value.content)==null?void 0:jn.itemBgColor)||"#ffffff",class:"color-input-native",onInput:t[149]||(t[149]=o=>g({itemBgColor:o.target.value}))},null,40,Ip)]),e("div",Ep,[t[343]||(t[343]=e("label",{class:"form-label"},"Text Color",-1)),e("input",{type:"color",value:((_n=a.value.content)==null?void 0:_n.textColor)||"#475569",class:"color-input-native",onInput:t[150]||(t[150]=o=>g({textColor:o.target.value}))},null,40,Ap)])])],2)):a.value.type==="flipcard"?(l(),i("div",{key:11,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[355]||(t[355]=e("div",{class:"panel-title"},"Flip Card Content",-1)),e("div",Mp,[t[346]||(t[346]=e("label",{class:"form-label"},"Direction",-1)),e("select",{value:((Dn=a.value.content)==null?void 0:Dn.flipDirection)||"horizontal",class:"select",onChange:t[151]||(t[151]=o=>g({flipDirection:o.target.value}))},[...t[345]||(t[345]=[e("option",{value:"horizontal"},"Horizontal (Y-axis)",-1),e("option",{value:"vertical"},"Vertical (X-axis)",-1)])],40,Pp)]),e("div",Tp,[t[347]||(t[347]=e("label",{class:"form-label"},"Front Title",-1)),e("input",{type:"text",value:(qn=a.value.content)==null?void 0:qn.frontTitle,class:"input",onInput:t[152]||(t[152]=o=>g({frontTitle:o.target.value}))},null,40,Bp)]),e("div",Np,[t[348]||(t[348]=e("label",{class:"form-label"},"Front Content",-1)),e("textarea",{value:(Rn=a.value.content)==null?void 0:Rn.frontContent,class:"textarea",onInput:t[153]||(t[153]=o=>g({frontContent:o.target.value}))},null,40,zp)]),e("div",Lp,[t[349]||(t[349]=e("label",{class:"form-label"},"Back Title",-1)),e("input",{type:"text",value:(On=a.value.content)==null?void 0:On.backTitle,class:"input",onInput:t[154]||(t[154]=o=>g({backTitle:o.target.value}))},null,40,jp)]),e("div",_p,[t[350]||(t[350]=e("label",{class:"form-label"},"Back Content",-1)),e("textarea",{value:(Fn=a.value.content)==null?void 0:Fn.backContent,class:"textarea",onInput:t[155]||(t[155]=o=>g({backContent:o.target.value}))},null,40,Dp)]),e("div",qp,[e("div",Rp,[t[351]||(t[351]=e("label",{class:"form-label"},"Front Bg",-1)),e("input",{type:"color",value:((Un=a.value.content)==null?void 0:Un.frontBgColor)||"#6c47ff",class:"color-input-native",onInput:t[156]||(t[156]=o=>g({frontBgColor:o.target.value}))},null,40,Op)]),e("div",Fp,[t[352]||(t[352]=e("label",{class:"form-label"},"Front Text",-1)),e("input",{type:"color",value:((Vn=a.value.content)==null?void 0:Vn.frontTextColor)||"#ffffff",class:"color-input-native",onInput:t[157]||(t[157]=o=>g({frontTextColor:o.target.value}))},null,40,Up)]),e("div",Vp,[t[353]||(t[353]=e("label",{class:"form-label"},"Back Bg",-1)),e("input",{type:"color",value:((Wn=a.value.content)==null?void 0:Wn.backBgColor)||"#ffffff",class:"color-input-native",onInput:t[158]||(t[158]=o=>g({backBgColor:o.target.value}))},null,40,Wp)]),e("div",Gp,[t[354]||(t[354]=e("label",{class:"form-label"},"Back Text",-1)),e("input",{type:"color",value:((Gn=a.value.content)==null?void 0:Gn.backTextColor)||"#1e293b",class:"color-input-native",onInput:t[159]||(t[159]=o=>g({backTextColor:o.target.value}))},null,40,Hp)])])],2)):a.value.type==="stepper"?(l(),i("div",{key:12,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[361]||(t[361]=e("div",{class:"panel-title"},"Stepper Configuration",-1)),e("div",Yp,[t[356]||(t[356]=e("label",{class:"form-label"},"Steps Data (JSON)",-1)),e("textarea",{value:JSON.stringify(((Hn=a.value.content)==null?void 0:Hn.steps)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px","white-space":"pre"},onChange:t[160]||(t[160]=o=>{var Q;return g({steps:_e(o.target.value,(Q=a.value.content)==null?void 0:Q.steps)})})},null,40,Jp)]),e("div",Qp,[e("div",Xp,[t[357]||(t[357]=e("label",{class:"form-label"},"Background",-1)),e("input",{type:"color",value:((Yn=a.value.content)==null?void 0:Yn.bgColor)||"#ffffff",class:"color-input-native",onInput:t[161]||(t[161]=o=>g({bgColor:o.target.value}))},null,40,Kp)]),e("div",Zp,[t[358]||(t[358]=e("label",{class:"form-label"},"Accent Color",-1)),e("input",{type:"color",value:((Jn=a.value.content)==null?void 0:Jn.accentColor)||"#6c47ff",class:"color-input-native",onInput:t[162]||(t[162]=o=>g({accentColor:o.target.value}))},null,40,ev)]),e("div",tv,[t[359]||(t[359]=e("label",{class:"form-label"},"Title Color",-1)),e("input",{type:"color",value:((Qn=a.value.content)==null?void 0:Qn.titleColor)||"#0f172a",class:"color-input-native",onInput:t[163]||(t[163]=o=>g({titleColor:o.target.value}))},null,40,ov)]),e("div",nv,[t[360]||(t[360]=e("label",{class:"form-label"},"Text Color",-1)),e("input",{type:"color",value:((Xn=a.value.content)==null?void 0:Xn.textColor)||"#475569",class:"color-input-native",onInput:t[164]||(t[164]=o=>g({textColor:o.target.value}))},null,40,lv)])])],2)):a.value.type==="poll"?(l(),i("div",{key:13,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[365]||(t[365]=e("div",{class:"panel-title"},"Poll Configuration",-1)),e("div",iv,[t[362]||(t[362]=e("label",{class:"form-label"},"Question",-1)),e("input",{type:"text",value:((Kn=a.value.content)==null?void 0:Kn.question)||"",class:"input",onInput:t[165]||(t[165]=o=>g({question:o.target.value}))},null,40,av)]),e("div",sv,[t[363]||(t[363]=e("label",{class:"form-label"},"Options (JSON)",-1)),e("textarea",{value:JSON.stringify(((Zn=a.value.content)==null?void 0:Zn.options)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px"},onChange:t[166]||(t[166]=o=>{var Q;return g({options:_e(o.target.value,(Q=a.value.content)==null?void 0:Q.options)})})},null,40,rv)]),e("div",dv,[e("div",uv,[t[364]||(t[364]=e("label",{class:"form-label"},"Voted Color",-1)),e("input",{type:"color",value:((el=a.value.content)==null?void 0:el.votedColor)||"#6c47ff",class:"color-input-native",onInput:t[167]||(t[167]=o=>g({votedColor:o.target.value}))},null,40,cv)])])],2)):a.value.type==="labeledimage"?(l(),i("div",{key:14,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[368]||(t[368]=e("div",{class:"panel-title"},"Labeled Image Configuration",-1)),e("div",pv,[t[366]||(t[366]=e("label",{class:"form-label"},"Image URL",-1)),e("input",{type:"text",value:((tl=a.value.content)==null?void 0:tl.imageUrl)||"",class:"input",onInput:t[168]||(t[168]=o=>g({imageUrl:o.target.value}))},null,40,vv)]),e("div",fv,[t[367]||(t[367]=e("label",{class:"form-label"},"Markers (JSON)",-1)),e("textarea",{value:JSON.stringify(((ol=a.value.content)==null?void 0:ol.markers)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px"},onChange:t[169]||(t[169]=o=>{var Q;return g({markers:_e(o.target.value,(Q=a.value.content)==null?void 0:Q.markers)})})},null,40,gv)])],2)):a.value.type==="matching"?(l(),i("div",{key:15,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[370]||(t[370]=e("div",{class:"panel-title"},"Matching Configuration",-1)),e("div",mv,[t[369]||(t[369]=e("label",{class:"form-label"},"Pairs (JSON)",-1)),e("textarea",{value:JSON.stringify(((nl=a.value.content)==null?void 0:nl.pairs)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px"},onChange:t[170]||(t[170]=o=>{var Q;return g({pairs:_e(o.target.value,(Q=a.value.content)==null?void 0:Q.pairs)})})},null,40,bv)])],2)):a.value.type==="sorting"?(l(),i("div",{key:16,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[372]||(t[372]=e("div",{class:"panel-title"},"Sorting Configuration",-1)),e("div",yv,[t[371]||(t[371]=e("label",{class:"form-label"},"Items (JSON) - Target Order",-1)),e("textarea",{value:JSON.stringify(((ll=a.value.content)==null?void 0:ll.items)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px"},onChange:t[171]||(t[171]=o=>{var Q;return g({items:_e(o.target.value,(Q=a.value.content)==null?void 0:Q.items)})})},null,40,hv)])],2)):a.value.type==="cloze"?(l(),i("div",{key:17,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[375]||(t[375]=e("div",{class:"panel-title"},"Cloze Configuration",-1)),e("div",xv,[t[373]||(t[373]=e("label",{class:"form-label"},"Text (Wrap blanks in [ ])",-1)),e("textarea",{value:((il=a.value.content)==null?void 0:il.text)||"",class:"textarea",style:{"min-height":"100px","font-family":"monospace","font-size":"12px"},onChange:t[172]||(t[172]=o=>g({text:o.target.value}))},null,40,kv)]),e("div",wv,[e("div",Cv,[e("input",{type:"checkbox",id:"showCheckBtn",checked:((al=a.value.content)==null?void 0:al.showCheckBtn)!==!1,onChange:t[173]||(t[173]=o=>g({showCheckBtn:o.target.checked}))},null,40,Sv),t[374]||(t[374]=e("label",{for:"showCheckBtn",class:"form-label mb-0"},"Show Check Answers Button",-1))])])],2)):a.value.type==="scenario"?(l(),i("div",{key:18,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[377]||(t[377]=e("div",{class:"panel-title"},"Scenario Chat",-1)),e("div",$v,[t[376]||(t[376]=e("label",{class:"form-label"},"Messages (JSON)",-1)),e("textarea",{value:JSON.stringify(((sl=a.value.content)==null?void 0:sl.messages)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px"},onChange:t[174]||(t[174]=o=>{var Q;return g({messages:_e(o.target.value,(Q=a.value.content)==null?void 0:Q.messages)})})},null,40,Iv)])],2)):a.value.type==="progress"?(l(),i("div",{key:19,class:X(["panel-section",re.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[381]||(t[381]=e("div",{class:"panel-title"},"Progress Settings",-1)),e("div",Ev,[e("div",Av,[t[378]||(t[378]=e("label",{class:"form-label"},"Mock XP",-1)),e("input",{type:"number",value:((rl=a.value.content)==null?void 0:rl.mockXP)||350,class:"input",onInput:t[175]||(t[175]=o=>g({mockXP:Number(o.target.value)}))},null,40,Mv)]),e("div",Pv,[t[379]||(t[379]=e("label",{class:"form-label"},"Mock Percent",-1)),e("input",{type:"number",value:((dl=a.value.content)==null?void 0:dl.mockPercent)||65,class:"input",onInput:t[176]||(t[176]=o=>g({mockPercent:Number(o.target.value)}))},null,40,Tv)])]),e("div",Bv,[e("div",Nv,[t[380]||(t[380]=e("label",{class:"form-label"},"Fill Color",-1)),e("input",{type:"color",value:((ul=a.value.content)==null?void 0:ul.fillColor)||"#10b981",class:"color-input-native",onInput:t[177]||(t[177]=o=>g({fillColor:o.target.value}))},null,40,zv)])])],2)):R("",!0),e("div",Lv,[t[385]||(t[385]=e("div",{class:"panel-title"},"Actions",-1)),e("div",jv,[e("button",{class:"btn btn-secondary btn-sm w-full",onClick:t[178]||(t[178]=o=>E(u).duplicateElement(E(r).projectId,E(r).currentSlideId,a.value.id))},[...t[382]||(t[382]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),e("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})],-1),ee(" Duplicate ",-1)])]),e("button",{class:"btn btn-secondary btn-sm w-full",onClick:t[179]||(t[179]=o=>{E(r).showInteractionEditor=!0,E(r).interactionElementId=a.value.id})},[...t[383]||(t[383]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})],-1),ee(" Interactions ",-1)])]),e("button",{class:"btn btn-danger btn-sm w-full",onClick:t[180]||(t[180]=o=>{E(u).deleteElement(E(r).projectId,E(r).currentSlideId,a.value.id),E(r).clearSelection()})},[...t[384]||(t[384]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"3 6 5 6 21 6"}),e("path",{d:"M19 6l-1 14H6L5 6"}),e("path",{d:"M9 6V4h6v2"})],-1),ee(" Delete Element ",-1)])])])])],64)):(l(),i("div",ls,[e("div",is,[e("button",{type:"button",class:X(["slide-settings-tab",G.value==="canvas"&&"active"]),onClick:t[15]||(t[15]=o=>G.value="canvas")},[...t[186]||(t[186]=[e("svg",{class:"slide-settings-tab-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.8"},[e("rect",{x:"3.5",y:"5",width:"17",height:"12",rx:"2"}),e("path",{d:"M8 19h8"})],-1),e("span",null,"Canvas",-1)])],2),e("button",{type:"button",class:X(["slide-settings-tab",G.value==="transitions"&&"active"]),onClick:t[16]||(t[16]=o=>G.value="transitions")},[...t[187]||(t[187]=[et('<svg class="slide-settings-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" data-v-daf50f54><path d="M5 7h5" data-v-daf50f54></path><path d="M5 12h10" data-v-daf50f54></path><path d="M5 17h14" data-v-daf50f54></path><path d="M14 7l5 5-5 5" data-v-daf50f54></path></svg><span data-v-daf50f54>Transitions</span>',2)])],2),e("button",{type:"button",class:X(["slide-settings-tab",G.value==="navigation"&&"active"]),onClick:t[17]||(t[17]=o=>G.value="navigation")},[...t[188]||(t[188]=[e("svg",{class:"slide-settings-tab-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.8"},[e("path",{d:"M12 4v16"}),e("path",{d:"M8 8l4-4 4 4"}),e("path",{d:"M16 16l-4 4-4-4"})],-1),e("span",null,"Navigation",-1)])],2)]),G.value==="canvas"?(l(),i("div",as,[t[203]||(t[203]=e("div",{class:"panel-title"},"Canvas",-1)),e("div",ss,[t[189]||(t[189]=e("label",{class:"form-label"},"Title",-1)),ce(e("input",{"onUpdate:modelValue":t[18]||(t[18]=o=>Le.value.title=o),class:"input",onInput:t[19]||(t[19]=o=>_t("title",Le.value.title))},null,544),[[Se,Le.value.title]])]),e("div",rs,[t[190]||(t[190]=e("label",{class:"form-label"},"Background",-1)),e("div",ds,[(l(),i(te,null,ue(["color","gradient","image"],o=>{var Q;return e("button",{key:o,class:X(["bg-type-btn",(((Q=p.value)==null?void 0:Q.backgroundType)||"color")===o&&"active"]),onClick:cl=>Ce({backgroundType:o})},w(o),11,us)}),64))]),(((_=p.value)==null?void 0:_.backgroundType)||"color")==="color"?(l(),i("div",cs,[e("input",{type:"color",value:((ve=p.value)==null?void 0:ve.background)||"#ffffff",onInput:t[20]||(t[20]=o=>Ce({background:o.target.value})),class:"color-input-native"},null,40,ps),e("input",{value:((Me=p.value)==null?void 0:Me.background)||"#ffffff",class:"input",onInput:t[21]||(t[21]=o=>Ce({background:o.target.value})),style:{"font-size":"var(--text-xs)","font-family":"var(--font-mono)"}},null,40,vs)])):((Ne=p.value)==null?void 0:Ne.backgroundType)==="gradient"?ce((l(),i("input",{key:1,"onUpdate:modelValue":t[22]||(t[22]=o=>Le.value.backgroundGradient=o),class:"input",placeholder:"linear-gradient(135deg, #667eea, #764ba2)",onInput:t[23]||(t[23]=o=>Ce({backgroundGradient:Le.value.backgroundGradient}))},null,544)),[[Se,Le.value.backgroundGradient]]):ce((l(),i("input",{key:2,"onUpdate:modelValue":t[24]||(t[24]=o=>Le.value.backgroundImage=o),class:"input",placeholder:"https://...",onInput:t[25]||(t[25]=o=>Ce({backgroundImage:Le.value.backgroundImage}))},null,544)),[[Se,Le.value.backgroundImage]])]),e("div",fs,[t[200]||(t[200]=e("div",{class:"panel-title"},"Select Size",-1)),e("div",gs,[(l(!0),i(te,null,ue(E(Ll),o=>{var Q;return l(),i("button",{key:o.id,type:"button",class:X(["canvas-size-card",((Q=f.value)==null?void 0:Q.id)===o.id&&"active"]),onClick:cl=>st(o)},[e("span",bs,[e("span",{class:X(["canvas-size-thumb",`canvas-size-thumb-${o.id}`]),"aria-hidden":"true"},[...t[191]||(t[191]=[e("span",{class:"canvas-size-thumb-frame"},null,-1),e("span",{class:"canvas-size-thumb-safe"},null,-1),e("span",{class:"canvas-size-thumb-line canvas-size-thumb-line-top"},null,-1),e("span",{class:"canvas-size-thumb-line canvas-size-thumb-line-bottom"},null,-1)])],2)]),e("span",ys,w(o.label),1),e("span",hs,w(o.ratioLabel),1)],10,ms)}),128))]),e("div",xs,[e("div",ks,[t[192]||(t[192]=e("span",null,"Custom",-1)),e("span",ws,"Current ratio "+w(H.value),1)]),e("div",Cs,[e("div",Ss,[t[194]||(t[194]=e("label",{class:"form-label"},"Width",-1)),e("div",$s,[e("input",{type:"number",min:"320",max:"4096",value:k.value.width,class:"input",onChange:t[26]||(t[26]=o=>tt("width",o.target.value))},null,40,Is),t[193]||(t[193]=e("span",{class:"canvas-size-unit"},"px",-1))])]),t[197]||(t[197]=e("div",{class:"canvas-size-separator"},"×",-1)),e("div",Es,[t[196]||(t[196]=e("label",{class:"form-label"},"Height",-1)),e("div",As,[e("input",{type:"number",min:"320",max:"4096",value:k.value.height,class:"input",onChange:t[27]||(t[27]=o=>tt("height",o.target.value))},null,40,Ms),t[195]||(t[195]=e("span",{class:"canvas-size-unit"},"px",-1))])])]),e("label",Ps,[ce(e("input",{type:"checkbox","onUpdate:modelValue":t[28]||(t[28]=o=>ie.value=o)},null,512),[[Nt,ie.value]]),t[198]||(t[198]=ee(" Maintain proportions ",-1))]),t[199]||(t[199]=e("div",{class:"field-hint"},"Canvas size affects the editor, preview, slide thumbnails, and exported HTML package.",-1))]),t[201]||(t[201]=et('<div class="canvas-size-callout" data-v-daf50f54><svg class="canvas-size-callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-daf50f54><circle cx="12" cy="12" r="9" data-v-daf50f54></circle><path d="M12 10v6" data-v-daf50f54></path><path d="M12 7h.01" data-v-daf50f54></path></svg><span data-v-daf50f54>Changes will be applied to all pages in the project.</span></div>',1))]),e("div",Ts,[t[202]||(t[202]=e("div",{class:"panel-title"},"Slide Notes",-1)),ce(e("textarea",{"onUpdate:modelValue":t[29]||(t[29]=o=>Le.value.notes=o),class:"textarea",placeholder:"Speaker notes…",style:{"min-height":"80px"},onInput:t[30]||(t[30]=o=>_t("notes",Le.value.notes))},null,544),[[Se,Le.value.notes]])])])):G.value==="transitions"?(l(),i("div",Bs,[t[208]||(t[208]=e("div",{class:"panel-title"},"Transitions",-1)),e("select",{value:((He=p.value)==null?void 0:He.transition)||"none",class:"select",onChange:t[31]||(t[31]=o=>Ce({transition:o.target.value}))},[...t[204]||(t[204]=[et('<option value="none" data-v-daf50f54>None</option><option value="fade" data-v-daf50f54>Fade</option><option value="slide" data-v-daf50f54>Slide</option><option value="zoom" data-v-daf50f54>Zoom</option><option value="flip" data-v-daf50f54>Flip</option>',5)])],40,Ns),e("div",zs,[t[205]||(t[205]=e("label",{class:"form-label"},"Auto-advance Duration (seconds)",-1)),e("input",{type:"number",min:"0",step:"0.5",value:((Ue=p.value)==null?void 0:Ue.duration)??0,class:"input",onChange:t[32]||(t[32]=o=>Ot(o.target.value))},null,40,Ls),t[206]||(t[206]=e("div",{class:"field-hint"},"Set to 0 to require manual navigation on this slide.",-1))]),e("label",js,[e("input",{type:"checkbox",checked:!!((yt=p.value)!=null&&yt.advanceOnMediaEnd),onChange:t[33]||(t[33]=o=>Ce({advanceOnMediaEnd:o.target.checked}))},null,40,_s),t[207]||(t[207]=ee(" Advance when slide media finishes ",-1))]),t[209]||(t[209]=e("div",{class:"field-hint"},"Uses the first playable audio or direct video on the slide. Embedded YouTube/Vimeo iframes cannot report completion here.",-1))])):(l(),i("div",Ds,[t[215]||(t[215]=e("div",{class:"panel-title"},"Navigation",-1)),e("label",qs,[e("input",{type:"checkbox",checked:h.value.autoPlay,onChange:t[34]||(t[34]=o=>Te({autoPlay:o.target.checked}))},null,40,Rs),t[210]||(t[210]=ee(" Autoplay preview and exported presentation ",-1))]),e("label",Os,[e("input",{type:"checkbox",checked:h.value.loop,onChange:t[35]||(t[35]=o=>Te({loop:o.target.checked}))},null,40,Fs),t[211]||(t[211]=ee(" Loop back to the first slide at the end ",-1))]),e("label",Us,[e("input",{type:"checkbox",checked:h.value.showProgress,onChange:t[36]||(t[36]=o=>Te({showProgress:o.target.checked}))},null,40,Vs),t[212]||(t[212]=ee(" Show progress bar in preview ",-1))]),e("label",Ws,[e("input",{type:"checkbox",checked:h.value.showNavControls,onChange:t[37]||(t[37]=o=>Te({showNavControls:o.target.checked}))},null,40,Gs),t[213]||(t[213]=ee(" Show previous/next and dot navigation ",-1))]),e("label",Hs,[e("input",{type:"checkbox",checked:h.value.allowKeyboardNav,onChange:t[38]||(t[38]=o=>Te({allowKeyboardNav:o.target.checked}))},null,40,Ys),t[214]||(t[214]=ee(" Allow arrow keys and space bar navigation ",-1))])]))]))],512)}}},Dv=Xe(_v,[["__scopeId","data-v-daf50f54"]]),qv={class:"editor-toolbar"},Rv={class:"toolbar-group"},Ov={key:0,class:"toolbar-divider"},Fv=["data-group-name"],Uv=["data-tooltip","onClick"],Vv={key:0,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Wv={key:1,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Gv={key:2,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Hv={key:3,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Yv={key:4,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Jv={key:5,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Qv={key:6,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Xv={key:7,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Kv={key:8,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Zv={key:9,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},ef={key:10,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},tf={key:11,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},of={key:12,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},nf={key:13,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},lf={key:14,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},af={key:15,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},sf={key:16,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},rf={key:17,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},df={key:18,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},uf={key:19,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},cf={key:20,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},pf={class:"tool-label"},vf={class:"toolbar-group"},ff={class:"toolbar-group"},gf={class:"toolbar-group"},mf={__name:"EditorToolbar",emits:["open-ai-project"],setup(A,{emit:r}){const u=r,c=it();at();const p=[{id:"basic",name:"Basic",tools:[{id:"text",label:"Text",tooltip:"Add text (T)",icon:"text"},{id:"heading",label:"Heading",tooltip:"Add heading",icon:"heading"},{id:"image",label:"Image",tooltip:"Add image (I)",icon:"image"},{id:"shape",label:"Shape",tooltip:"Add shape (S)",icon:"shape"}]},{id:"media",name:"Media",tools:[{id:"video",label:"Video",tooltip:"Embed video",icon:"video"},{id:"audio",label:"Audio",tooltip:"Embed audio",icon:"audio"}]},{id:"interactive",name:"Interactive",tools:[{id:"button",label:"Button",tooltip:"Add button (B)",icon:"button"},{id:"hotspot",label:"Hotspot",tooltip:"Add hotspot (H)",icon:"hotspot"},{id:"tabs",label:"Tabs",tooltip:"Add tabs",icon:"tabs"},{id:"accordion",label:"Accordion",tooltip:"Add accordion",icon:"accordion"},{id:"flipcard",label:"Flip Card",tooltip:"Add flip card",icon:"flipcard"},{id:"stepper",label:"Stepper",tooltip:"Add stepper",icon:"stepper"}]},{id:"learning",name:"Learning & Data",tools:[{id:"quiz",label:"Quiz",tooltip:"Add quiz",icon:"quiz"},{id:"chart",label:"Chart",tooltip:"Add chart",icon:"chart"},{id:"poll",label:"Poll",tooltip:"Add poll",icon:"poll"},{id:"labeledimage",label:"L-Image",tooltip:"Add labeled image",icon:"labeledimage"},{id:"matching",label:"Match",tooltip:"Add matching game",icon:"matching"},{id:"sorting",label:"Sort",tooltip:"Add sorting game",icon:"sorting"},{id:"cloze",label:"Cloze",tooltip:"Fill in blanks",icon:"cloze"},{id:"scenario",label:"Dialog",tooltip:"Scenario chat",icon:"scenario"},{id:"progress",label:"Stats",tooltip:"Track progress",icon:"progress"}]}];function h(k){c.setActiveTool(k)}return(k,f)=>(l(),i("div",qv,[e("div",Rv,[e("button",{class:X(["tool-btn",E(c).activeTool==="select"&&"active"]),onClick:f[0]||(f[0]=H=>h("select")),"data-tooltip":"Select (V)"},[...f[7]||(f[7]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M5 3l14 9-7 2-5 7V3z"})],-1),e("span",{class:"tool-label"},"Select",-1)])],2)]),f[34]||(f[34]=e("div",{class:"toolbar-divider"},null,-1)),(l(),i(te,null,ue(p,(H,ie)=>(l(),i(te,{key:H.id},[ie>0?(l(),i("div",Ov)):R("",!0),e("div",{class:"toolbar-group element-group","data-group-name":H.name},[(l(!0),i(te,null,ue(H.tools,G=>(l(),i("button",{key:G.id,class:X(["tool-btn",E(c).activeTool===G.id&&"active"]),"data-tooltip":G.tooltip,onClick:V=>h(G.id)},[G.icon==="text"?(l(),i("svg",Vv,[...f[8]||(f[8]=[e("polyline",{points:"4 7 4 4 20 4 20 7"},null,-1),e("line",{x1:"9",y1:"20",x2:"15",y2:"20"},null,-1),e("line",{x1:"12",y1:"4",x2:"12",y2:"20"},null,-1)])])):G.icon==="heading"?(l(),i("svg",Wv,[...f[9]||(f[9]=[e("path",{d:"M6 12h12M6 4v16M18 4v16","stroke-linecap":"round"},null,-1)])])):G.icon==="image"?(l(),i("svg",Gv,[...f[10]||(f[10]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"},null,-1),e("circle",{cx:"8.5",cy:"8.5",r:"1.5"},null,-1),e("polyline",{points:"21 15 16 10 5 21"},null,-1)])])):G.icon==="shape"?(l(),i("svg",Hv,[...f[11]||(f[11]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"3"},null,-1)])])):G.icon==="button"?(l(),i("svg",Yv,[...f[12]||(f[12]=[e("rect",{x:"2",y:"7",width:"20",height:"10",rx:"5"},null,-1),e("line",{x1:"8",y1:"12",x2:"16",y2:"12"},null,-1)])])):G.icon==="hotspot"?(l(),i("svg",Jv,[...f[13]||(f[13]=[e("circle",{cx:"12",cy:"12",r:"10"},null,-1),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"},null,-1),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"},null,-1)])])):G.icon==="video"?(l(),i("svg",Qv,[...f[14]||(f[14]=[e("polygon",{points:"23 7 16 12 23 17 23 7"},null,-1),e("rect",{x:"1",y:"5",width:"15",height:"14",rx:"2"},null,-1)])])):G.icon==="audio"?(l(),i("svg",Xv,[...f[15]||(f[15]=[e("path",{d:"M9 18V5l12-2v13"},null,-1),e("circle",{cx:"6",cy:"18",r:"3"},null,-1),e("circle",{cx:"18",cy:"16",r:"3"},null,-1)])])):G.icon==="quiz"?(l(),i("svg",Kv,[...f[16]||(f[16]=[e("path",{d:"M9 11l3 3L22 4"},null,-1),e("path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"},null,-1)])])):G.icon==="chart"?(l(),i("svg",Zv,[...f[17]||(f[17]=[e("path",{d:"M4 19h16"},null,-1),e("path",{d:"M7 16V9"},null,-1),e("path",{d:"M12 16V5"},null,-1),e("path",{d:"M17 16v-4"},null,-1)])])):G.icon==="tabs"?(l(),i("svg",ef,[...f[18]||(f[18]=[e("rect",{x:"2",y:"7",width:"20",height:"13",rx:"2"},null,-1),e("path",{d:"M2 11h20"},null,-1),e("path",{d:"M8 7v4"},null,-1)])])):G.icon==="accordion"?(l(),i("svg",tf,[...f[19]||(f[19]=[e("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2"},null,-1),e("path",{d:"M3 10h18"},null,-1),e("path",{d:"M3 16h18"},null,-1)])])):G.icon==="flipcard"?(l(),i("svg",of,[...f[20]||(f[20]=[e("path",{d:"M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"},null,-1),e("path",{d:"M3 12h18"},null,-1),e("path",{d:"M21 8h-4"},null,-1)])])):G.icon==="stepper"?(l(),i("svg",nf,[...f[21]||(f[21]=[e("circle",{cx:"6",cy:"12",r:"3"},null,-1),e("circle",{cx:"18",cy:"12",r:"3"},null,-1),e("path",{d:"M9 12h6"},null,-1)])])):G.icon==="poll"?(l(),i("svg",lf,[...f[22]||(f[22]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"},null,-1),e("path",{d:"M7 10h10"},null,-1),e("path",{d:"M7 14h6"},null,-1)])])):G.icon==="labeledimage"?(l(),i("svg",af,[...f[23]||(f[23]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"},null,-1),e("circle",{cx:"12",cy:"12",r:"2"},null,-1),e("line",{x1:"12",y1:"14",x2:"12",y2:"18"},null,-1)])])):G.icon==="matching"?(l(),i("svg",sf,[...f[24]||(f[24]=[et('<path d="M4 6h4" data-v-77f15107></path><path d="M4 18h4" data-v-77f15107></path><path d="M16 6h4" data-v-77f15107></path><path d="M16 18h4" data-v-77f15107></path><line x1="8" y1="6" x2="16" y2="18" data-v-77f15107></line>',5)])])):G.icon==="sorting"?(l(),i("svg",rf,[...f[25]||(f[25]=[e("path",{d:"M3 6h18"},null,-1),e("path",{d:"M7 12h10"},null,-1),e("path",{d:"M10 18h4"},null,-1)])])):G.icon==="cloze"?(l(),i("svg",df,[...f[26]||(f[26]=[e("path",{d:"M4 12h4"},null,-1),e("path",{d:"M16 12h4"},null,-1),e("rect",{x:"9",y:"9",width:"6",height:"6",rx:"1"},null,-1)])])):G.icon==="scenario"?(l(),i("svg",uf,[...f[27]||(f[27]=[e("path",{d:"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"},null,-1)])])):G.icon==="progress"?(l(),i("svg",cf,[...f[28]||(f[28]=[e("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"},null,-1)])])):R("",!0),e("span",pf,w(G.label),1)],10,Uv))),128))],8,Fv)],64))),64)),f[35]||(f[35]=e("div",{class:"toolbar-divider"},null,-1)),e("div",vf,[e("button",{class:"tool-btn tool-btn-ai-project",onClick:f[1]||(f[1]=H=>u("open-ai-project")),"data-tooltip":"Create a new AI project"},[...f[29]||(f[29]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"})],-1),e("span",{class:"tool-label"},"AI Project",-1)])])]),f[36]||(f[36]=e("div",{class:"toolbar-spacer"},null,-1)),e("div",ff,[e("button",{class:"tool-btn",onClick:f[2]||(f[2]=H=>E(c).zoomOut()),"data-tooltip":"Zoom out (Ctrl−)"},[...f[30]||(f[30]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"11",cy:"11",r:"8"}),e("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"}),e("line",{x1:"8",y1:"11",x2:"14",y2:"11"})],-1)])]),e("button",{class:"zoom-display",onClick:f[3]||(f[3]=H=>E(c).zoomReset())},w(Math.round(E(c).zoomLevel*100))+"% ",1),e("button",{class:"tool-btn",onClick:f[4]||(f[4]=H=>E(c).zoomIn()),"data-tooltip":"Zoom in (Ctrl+)"},[...f[31]||(f[31]=[et('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-77f15107><circle cx="11" cy="11" r="8" data-v-77f15107></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-v-77f15107></line><line x1="11" y1="8" x2="11" y2="14" data-v-77f15107></line><line x1="8" y1="11" x2="14" y2="11" data-v-77f15107></line></svg>',1)])])]),f[37]||(f[37]=e("div",{class:"toolbar-divider"},null,-1)),e("div",gf,[e("button",{class:X(["tool-btn",E(c).showGrid&&"active"]),onClick:f[5]||(f[5]=H=>E(c).toggleGrid()),"data-tooltip":"Toggle grid (Ctrl+G)"},[...f[32]||(f[32]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5"},[e("path",{d:"M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"})],-1)])],2),e("button",{class:X(["tool-btn",E(c).snapToGrid&&"active"]),onClick:f[6]||(f[6]=H=>E(c).toggleSnap()),"data-tooltip":"Snap to grid"},[...f[33]||(f[33]=[et('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-77f15107><circle cx="5" cy="5" r="1" data-v-77f15107></circle><circle cx="12" cy="5" r="1" data-v-77f15107></circle><circle cx="19" cy="5" r="1" data-v-77f15107></circle><circle cx="5" cy="12" r="1" data-v-77f15107></circle><circle cx="12" cy="12" r="1" data-v-77f15107></circle><circle cx="19" cy="12" r="1" data-v-77f15107></circle><circle cx="5" cy="19" r="1" data-v-77f15107></circle><circle cx="12" cy="19" r="1" data-v-77f15107></circle><circle cx="19" cy="19" r="1" data-v-77f15107></circle></svg>',1)])],2)])]))}},bf=Xe(mf,[["__scopeId","data-v-77f15107"]]),yf=["onMousedown"],hf={key:1,class:"selection-border locked-border"},xf={__name:"ElementWrapper",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=it(),c=at(),p=Cl("canvasScale",z(1)),h=P(()=>u.projectId),k=P(()=>u.currentSlideId),f=P(()=>u.selectedElementIds.includes(r.element.id)),H=P(()=>r.element.locked),ie=P(()=>r.element.visible!==!1),G=P(()=>{const ne=r.element.content||{};return!!(ne.text||ne.label||ne.question||ne.popupTitle||ne.popupContent)});let V=!1,me=0,N=0,B=new Map;function a(ne){if(!u.snapToGrid||!u.gridSize)return ne;const fe=u.gridSize;return Math.round(ne/fe)*fe}function T(ne){var ge;if(H.value||ne.target.classList.contains("resize-handle"))return;const fe=ne.ctrlKey||ne.metaKey||ne.shiftKey;f.value?fe&&u.selectElement(r.element.id,!0):u.selectElement(r.element.id,fe),u.setActiveTool("select"),V=!1,me=ne.clientX,N=ne.clientY,B.clear();const se=(ge=c.getProject(h.value))==null?void 0:ge.slides.find(Pe=>Pe.id===k.value);se&&u.selectedElementIds.forEach(Pe=>{const re=se.elements.find(I=>I.id===Pe);re&&!re.locked&&B.set(Pe,{x:re.x,y:re.y})}),window.addEventListener("mousemove",L),window.addEventListener("mouseup",Y),ne.stopPropagation()}function L(ne){const fe=(ne.clientX-me)/p.value,se=(ne.clientY-N)/p.value;!V&&(Math.abs(fe)>3||Math.abs(se)>3)&&(V=!0),V&&B.forEach((ge,Pe)=>{const re=ge.x+fe,I=ge.y+se;c.updateElement(h.value,k.value,Pe,{x:re,y:I},{persist:!1})})}function Y(ne){if(V){const fe=(ne.clientX-me)/p.value,se=(ne.clientY-N)/p.value;B.forEach((ge,Pe)=>{c.updateElement(h.value,k.value,Pe,{x:a(ge.x+fe),y:a(ge.y+se)},{persist:!1})}),c.commitProject(h.value)}V||!(ne.ctrlKey||ne.metaKey||ne.shiftKey)&&u.selectedElementIds.length>1&&u.selectElement(r.element.id,!1),V=!1,window.removeEventListener("mousemove",L),window.removeEventListener("mouseup",Y)}const m=["n","ne","e","se","s","sw","w","nw"];let F=!1,ae="",oe=0,ke=0,O=0,U=0,pe=0,be=0;function le(ne,fe){H.value||(ne.stopPropagation(),ne.preventDefault(),F=!0,ae=fe,oe=ne.clientX,ke=ne.clientY,O=r.element.width,U=r.element.height,pe=r.element.x,be=r.element.y,window.addEventListener("mousemove",we),window.addEventListener("mouseup",C))}function we(ne){if(!F)return;const fe=p.value,se=(ne.clientX-oe)/fe,ge=(ne.clientY-ke)/fe,Pe=20;let re=pe,I=be,$=O,q=U;if(ae.includes("e")&&($=Math.max(Pe,O+se)),ae.includes("s")&&(q=Math.max(Pe,U+ge)),ae.includes("w")){const g=Math.max(Pe,O-se);re=pe+(O-g),$=g}if(ae.includes("n")){const g=Math.max(Pe,U-ge);I=be+(U-g),q=g}if(u.snapToGrid&&u.gridSize){const g=u.gridSize;$=Math.round($/g)*g,q=Math.round(q/g)*g,re=Math.round(re/g)*g,I=Math.round(I/g)*g}c.updateElement(h.value,k.value,r.element.id,{x:re,y:I,width:$,height:q})}function C(){F=!1,window.removeEventListener("mousemove",we),window.removeEventListener("mouseup",C)}function j(){["text","heading"].includes(r.element.type)&&u.focusPropertiesSection("content")}const D=P(()=>({position:"absolute",left:`${r.element.x}px`,top:`${r.element.y}px`,width:`${r.element.width}px`,height:`${r.element.height}px`,transform:`rotate(${r.element.rotation||0}deg)`,opacity:r.element.opacity??1,zIndex:r.element.zIndex||1,cursor:H.value?"not-allowed":"move",visibility:ie.value?"visible":"hidden",userSelect:"none"}));function K(ne){return{n:"n-resize",ne:"ne-resize",e:"e-resize",se:"se-resize",s:"s-resize",sw:"sw-resize",w:"w-resize",nw:"nw-resize"}[ne]||"auto"}function xe(ne="content"){u.focusPropertiesSection(ne)}function ze(){const ne=G.value?"improve":r.element.type==="image"?"image":"generate";u.openAIPanel(ne)}function Ie(){const ne=c.duplicateElement(h.value,k.value,r.element.id);ne&&(u.selectElement(ne.id),u.focusPropertiesSection("geometry"))}function je(){c.deleteElement(h.value,k.value,r.element.id),u.clearSelection()}return(ne,fe)=>(l(),i("div",{class:X(["element-wrapper",f.value&&"selected",H.value&&"locked"]),style:he(D.value),onMousedown:T,onDblclick:j},[Sl(ne.$slots,"default",{},void 0),f.value&&!H.value?(l(),i(te,{key:0},[fe[6]||(fe[6]=e("div",{class:"selection-border"},null,-1)),e("div",{class:"object-quickbar",onMousedown:fe[3]||(fe[3]=Oe(()=>{},["stop"]))},[e("button",{type:"button",class:"quickbar-btn",onClick:fe[0]||(fe[0]=se=>xe("content"))},"Edit"),e("button",{type:"button",class:"quickbar-btn",onClick:fe[1]||(fe[1]=se=>xe("animation"))},"Animation"),e("button",{type:"button",class:"quickbar-btn",onClick:fe[2]||(fe[2]=se=>xe("geometry"))},"Arrange"),e("button",{type:"button",class:"quickbar-btn quickbar-btn-ai",onClick:ze},"AI"),e("button",{type:"button",class:"quickbar-icon-btn",onClick:Ie,title:"Duplicate element","aria-label":"Duplicate element"},[...fe[4]||(fe[4]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),e("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})],-1)])]),e("button",{type:"button",class:"quickbar-icon-btn quickbar-icon-btn-danger",onClick:je,title:"Delete element","aria-label":"Delete element"},[...fe[5]||(fe[5]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"3 6 5 6 21 6"}),e("path",{d:"M19 6l-1 14H6L5 6"}),e("path",{d:"M9 6V4h6v2"})],-1)])])],32),(l(),i(te,null,ue(m,se=>e("div",{key:se,class:X(["resize-handle",`handle-${se}`]),style:he({cursor:K(se)}),onMousedown:Oe(ge=>le(ge,se),["stop"])},null,46,yf)),64))],64)):R("",!0),f.value&&H.value?(l(),i("div",hf)):R("",!0)],38))}},kf=Xe(xf,[["__scopeId","data-v-d539ca8b"]]),Vt={__name:"TextElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=P(()=>r.element.content||{}),c=it(),p=at(),h=z(!1),k=z(null),f=z("");Qe(()=>u.value.text,V=>{h.value||(f.value=V||(r.element.type==="heading"?"Heading":"Click to edit text"))},{immediate:!0});function H(){c.selectedElementId===r.element.id&&(h.value=!0,bl(()=>{if(k.value)if(k.value.focus(),typeof k.value.setSelectionRange=="function"){const V=k.value.value.length;k.value.setSelectionRange(V,V)}else{const V=document.createRange();V.selectNodeContents(k.value),V.collapse(!1);const me=window.getSelection();me.removeAllRanges(),me.addRange(V)}}))}function ie(V){h.value&&V.stopPropagation()}function G(){h.value=!1;const V=f.value;p.updateElement(c.projectId,c.currentSlideId,r.element.id,{content:{...r.element.content,text:V}})}return(V,me)=>h.value?ce((l(),i("textarea",{key:0,class:"text-element-input",ref_key:"textRef",ref:k,"onUpdate:modelValue":me[0]||(me[0]=N=>f.value=N),onBlur:G,onMousedown:ie,style:he({fontSize:(u.value.fontSize||16)+"px",fontFamily:u.value.fontFamily||"Inter, sans-serif",fontWeight:u.value.fontWeight||"normal",fontStyle:u.value.fontStyle||"normal",textDecoration:u.value.textDecoration||"none",textAlign:u.value.textAlign||"left",color:u.value.color||"#1a1a2e",lineHeight:u.value.lineHeight||1.5,textTransform:u.value.textTransform||"none",letterSpacing:(u.value.letterSpacing||0)+"px",width:"100%",height:"100%",background:"transparent",border:"none",resize:"none",overflow:"hidden",whiteSpace:"pre-wrap",wordBreak:"break-word",padding:"4px",outline:"2px solid var(--color-primary)",cursor:"text",margin:0,display:"block"})},null,36)),[[Se,f.value]]):(l(),i("div",{key:1,class:"text-element",onDblclick:H,style:he({fontSize:(u.value.fontSize||16)+"px",fontFamily:u.value.fontFamily||"Inter, sans-serif",fontWeight:u.value.fontWeight||"normal",fontStyle:u.value.fontStyle||"normal",textDecoration:u.value.textDecoration||"none",textAlign:u.value.textAlign||"left",color:u.value.color||"#1a1a2e",lineHeight:u.value.lineHeight||1.5,textTransform:u.value.textTransform||"none",letterSpacing:(u.value.letterSpacing||0)+"px",width:"100%",height:"100%",overflow:"hidden",whiteSpace:"pre-wrap",wordBreak:"break-word",padding:"4px",outline:"none",cursor:"inherit",userSelect:"none"})},w(f.value),37))}},wf={key:0,class:"image-status image-loading"},Cf=["src","alt"],Sf={key:2,class:"image-placeholder"},$f={width:"36",height:"36",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{opacity:".3"}},If={__name:"ImageElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=z(""),c=z(0),p=z("idle"),h=P(()=>{var ie;return Array.isArray((ie=r.element.content)==null?void 0:ie.fallbackSrcs)?r.element.content.fallbackSrcs:[]});function k(){var ie;u.value=((ie=r.element.content)==null?void 0:ie.src)||"",c.value=0,p.value=u.value?"loading":"empty"}function f(){p.value="loaded"}function H(){const ie=h.value[c.value];if(ie){c.value+=1,u.value=ie,p.value="loading";return}p.value="error"}return Qe(()=>{var ie,G;return[(ie=r.element.content)==null?void 0:ie.src,JSON.stringify(((G=r.element.content)==null?void 0:G.fallbackSrcs)||[])]},()=>k(),{immediate:!0}),(ie,G)=>{var V,me,N;return l(),i("div",{class:"image-element",style:he({width:"100%",height:"100%",overflow:"hidden",borderRadius:(((V=A.element.content)==null?void 0:V.borderRadius)||0)+"px",border:`${((me=A.element.content)==null?void 0:me.borderWidth)||0}px solid ${((N=A.element.content)==null?void 0:N.borderColor)||"transparent"}`})},[p.value==="loading"?(l(),i("div",wf,[...G[0]||(G[0]=[e("span",{class:"image-status-spinner"},null,-1),e("span",null,"Loading image…",-1)])])):R("",!0),u.value&&p.value!=="error"?(l(),i("img",{key:1,src:u.value,alt:A.element.content.alt||"",style:he({width:"100%",height:"100%",objectFit:A.element.content.objectFit||"cover",display:p.value==="loaded"?"block":"none"}),draggable:"false",onLoad:f,onError:H},null,44,Cf)):R("",!0),p.value==="empty"||p.value==="error"?(l(),i("div",Sf,[(l(),i("svg",$f,[...G[1]||(G[1]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"},null,-1),e("circle",{cx:"8.5",cy:"8.5",r:"1.5"},null,-1),e("polyline",{points:"21 15 16 10 5 21"},null,-1)])])),e("span",null,w(p.value==="error"?"Image unavailable":"Image"),1)])):R("",!0)],4)}}},Ef=Xe(If,[["__scopeId","data-v-cd42b1c3"]]),Af={class:"shape-element",style:{width:"100%",height:"100%"}},Mf=["width","height"],Pf=["points","fill","stroke","stroke-width"],Tf={__name:"ShapeElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=P(()=>r.element.content||{}),c=P(()=>{const k=u.value.shapeType||"rectangle",f={width:"100%",height:"100%",background:u.value.fillColor||"#6c47ff",border:`${u.value.borderWidth||0}px solid ${u.value.borderColor||"transparent"}`,opacity:u.value.opacity??1};return k==="circle"?{...f,borderRadius:"50%"}:k==="rectangle"?{...f,borderRadius:(u.value.borderRadius||0)+"px"}:f}),p=P(()=>["triangle","star","arrow","diamond"].includes(u.value.shapeType)),h=P(()=>{const k=r.element.width||150,f=r.element.height||100,H=u.value.shapeType;if(H==="triangle")return`${k/2},0 ${k},${f} 0,${f}`;if(H==="diamond")return`${k/2},0 ${k},${f/2} ${k/2},${f} 0,${f/2}`;if(H==="arrow")return`0,${f*.3} ${k*.6},${f*.3} ${k*.6},0 ${k},${f/2} ${k*.6},${f} ${k*.6},${f*.7} 0,${f*.7}`;if(H==="star"){const ie=k/2,G=f/2,V=Math.min(k,f)/2,me=V*.4;let N="";for(let B=0;B<10;B++){const a=(B*36-90)*Math.PI/180,T=B%2===0?V:me;N+=`${ie+T*Math.cos(a)},${G+T*Math.sin(a)} `}return N.trim()}return""});return(k,f)=>(l(),i("div",Af,[p.value?(l(),i("svg",{key:1,width:A.element.width,height:A.element.height,style:{display:"block",overflow:"visible"}},[e("polygon",{points:h.value,fill:u.value.fillColor||"#6c47ff",stroke:u.value.borderColor||"none","stroke-width":u.value.borderWidth||0},null,8,Pf)],8,Mf)):(l(),i("div",{key:0,style:he(c.value)},null,4))]))}},Bf={__name:"ButtonElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=P(()=>r.element.content||{}),c=P(()=>{const p={primary:{background:"#6c47ff",color:"#fff",border:"none"},secondary:{background:"#f0f0f0",color:"#333",border:"1px solid #ddd"},outline:{background:"transparent",color:"#6c47ff",border:"2px solid #6c47ff"},ghost:{background:"transparent",color:"#6c47ff",border:"none"},danger:{background:"#ef4444",color:"#fff",border:"none"}},h=p[u.value.variant||"primary"]||p.primary;return{...h,background:u.value.bgColor||h.background,color:u.value.textColor||h.color,border:u.value.borderColor?`1px solid ${u.value.borderColor}`:h.border,borderRadius:(u.value.borderRadius??8)+"px"}});return(p,h)=>(l(),i("div",{class:"button-element",style:he({width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"8px",fontSize:(u.value.fontSize??15)+"px",fontWeight:u.value.fontWeight??600,letterSpacing:(u.value.letterSpacing||0)+"px",cursor:"pointer",fontFamily:u.value.fontFamily||"Inter, sans-serif",transition:"opacity .15s",...c.value})},w(u.value.label||"Button"),5))}},Nf={class:"hotspot-root",style:{width:"100%",height:"100%",position:"relative"}},zf={class:"popup-header"},Lf={class:"popup-body"},jf={__name:"HotspotElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=P(()=>r.element.content||{}),c=z(!1);function p(h){h.stopPropagation(),c.value=!c.value}return(h,k)=>(l(),i("div",Nf,[e("div",{class:"hotspot-btn",style:he({width:"100%",height:"100%",background:u.value.bgColor||"#6c47ff",borderRadius:(u.value.borderRadius??999)>=999?"50%":(u.value.borderRadius||0)+"px",display:"flex",alignItems:"center",justifyContent:"center",color:u.value.iconColor||"#fff",fontSize:"20px",fontWeight:"bold",cursor:"pointer",boxShadow:"0 2px 12px rgba(108,71,255,.4)"}),onClick:Oe(p,["stop"])},w(u.value.icon||"?"),5),ht(Bt,{name:"fade"},{default:ut(()=>[c.value?(l(),i("div",{key:0,class:"hotspot-popup",style:he({background:u.value.popupBgColor||"#ffffff",color:u.value.popupTextColor||"#1a1a2e"})},[e("div",zf,[e("strong",null,w(u.value.popupTitle||"Info"),1),e("button",{class:"popup-close",onClick:k[0]||(k[0]=Oe(f=>c.value=!1,["stop"]))},"×")]),e("div",Lf,w(u.value.popupContent||"Add your content in the properties panel."),1)],4)):R("",!0)]),_:1})]))}},_f=Xe(jf,[["__scopeId","data-v-ef5f15f6"]]),Df={class:"video-element",style:{width:"100%",height:"100%",overflow:"hidden","border-radius":"4px",background:"#000"}},qf=["src"],Rf=["src","poster","autoplay","controls","loop","muted"],Of={key:2,class:"video-placeholder"},Ff={width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{opacity:".3"}},Uf={__name:"VideoElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=P(()=>r.element.content||{}),c=P(()=>{const h=u.value.src||"";return h.includes("youtube")||h.includes("youtu.be")}),p=P(()=>{var k,f;const h=u.value.src||"";if(c.value){const H=(k=h.match(/(?:v=|youtu\.be\/)([^&?]+)/))==null?void 0:k[1];return H?`https://www.youtube.com/embed/${H}`:""}if(h.includes("vimeo.com")){const H=(f=h.match(/vimeo\.com\/(\d+)/))==null?void 0:f[1];return H?`https://player.vimeo.com/video/${H}`:""}return""});return(h,k)=>(l(),i("div",Df,[p.value?(l(),i("iframe",{key:0,src:p.value,style:{width:"100%",height:"100%",border:"none"},allowfullscreen:""},null,8,qf)):u.value.src&&!p.value?(l(),i("video",{key:1,src:u.value.src,poster:u.value.poster,autoplay:u.value.autoplay,controls:u.value.controls!==!1,loop:u.value.loop,muted:u.value.muted,style:he({width:"100%",height:"100%",objectFit:u.value.objectFit||"cover"})},null,12,Rf)):(l(),i("div",Of,[(l(),i("svg",Ff,[...k[0]||(k[0]=[e("polygon",{points:"23 7 16 12 23 17 23 7"},null,-1),e("rect",{x:"1",y:"5",width:"15",height:"14",rx:"2"},null,-1)])])),k[1]||(k[1]=e("span",{style:{"font-size":"12px",color:"#888"}},"Add video URL in Properties",-1))]))]))}},Vf=Xe(Uf,[["__scopeId","data-v-dfea1a16"]]),Wf=["stroke"],Gf=["src","controls","autoplay","loop"],Hf={key:1,style:{"font-size":"11px",color:"#aaa"}},Yf={__name:"AudioElement",props:{element:{type:Object,required:!0}},setup(A){return(r,u)=>{var c,p,h,k,f,H,ie,G,V;return l(),i("div",{class:"audio-element",style:he({width:"100%",height:"100%",display:"flex",alignItems:"center",gap:"10px",background:((c=A.element.content)==null?void 0:c.bgColor)||"#ede7ff",border:`1px solid ${((p=A.element.content)==null?void 0:p.accentColor)||"#6c47ff"}`,borderRadius:"8px",padding:"0 12px"})},[(l(),i("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:((h=A.element.content)==null?void 0:h.accentColor)||"#6c47ff","stroke-width":"2"},[...u[1]||(u[1]=[e("path",{d:"M9 18V5l12-2v13"},null,-1),e("circle",{cx:"6",cy:"18",r:"3"},null,-1),e("circle",{cx:"18",cy:"16",r:"3"},null,-1)])],8,Wf)),e("span",{style:he({fontSize:"13px",color:((k=A.element.content)==null?void 0:k.textColor)||"#555",flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"})},w(((f=A.element.content)==null?void 0:f.label)||"Audio Player"),5),(H=A.element.content)!=null&&H.src?(l(),i("audio",{key:0,src:A.element.content.src,controls:((ie=A.element.content)==null?void 0:ie.controls)!==!1,autoplay:(G=A.element.content)==null?void 0:G.autoplay,loop:(V=A.element.content)==null?void 0:V.loop,style:{height:"28px","max-width":"180px"},onMousedown:u[0]||(u[0]=Oe(()=>{},["stop"]))},null,40,Gf)):(l(),i("span",Hf,"No source"))],4)}}},Jf={class:"quiz-options"},Qf=["onClick"],Xf={class:"opt-letter"},Kf={class:"opt-text"},Zf={key:0},e1={class:"quiz-actions"},t1=["disabled"],o1={__name:"QuizElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=P(()=>r.element.content||{}),c=z(null),p=z(!1);function h(ie){p.value||(c.value=ie)}function k(){c.value!==null&&(p.value=!0)}function f(){c.value=null,p.value=!1}const H=P(()=>p.value&&c.value===(u.value.correctIndex??0));return(ie,G)=>(l(),i("div",{class:"quiz-element",style:he({width:"100%",height:"100%",background:u.value.cardBgColor||"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",padding:"16px",display:"flex",flexDirection:"column",gap:"10px",overflow:"auto",fontFamily:"Inter, sans-serif","--quiz-accent":u.value.accentColor||"#6c47ff"})},[e("p",{style:he({fontSize:"15px",fontWeight:600,color:u.value.questionColor||"#1a1a2e",lineHeight:1.4})},w(u.value.question||"Question text…"),5),e("div",Jf,[(l(!0),i(te,null,ue(u.value.options||[],(V,me)=>(l(),i("div",{key:me,class:X(["quiz-opt",c.value===me&&"selected",p.value&&me===u.value.correctIndex&&"correct",p.value&&c.value===me&&me!==u.value.correctIndex&&"wrong"]),onClick:N=>h(me)},[e("span",Xf,w(String.fromCharCode(65+me)),1),e("span",Kf,w(V),1)],10,Qf))),128))]),p.value?(l(),i("div",{key:0,class:X(["quiz-feedback",H.value?"correct":"wrong"])},[ee(w(H.value?"✓ Correct!":"✗ Incorrect.")+" ",1),!H.value&&u.value.explanation?(l(),i("span",Zf,w(u.value.explanation),1)):R("",!0)],2)):R("",!0),e("div",e1,[p.value?(l(),i("button",{key:1,class:"quiz-btn secondary",onClick:f},"Try Again")):(l(),i("button",{key:0,class:"quiz-btn primary",disabled:c.value===null,onClick:k},"Submit",8,t1))])],4))}},n1=Xe(o1,[["__scopeId","data-v-ca2bd187"]]),l1={key:0,class:"canvas-empty"},i1={width:"60",height:"60",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1",style:{opacity:".2"}},a1={key:0,class:"canvas-device-frame","aria-hidden":"true"},s1=["value"],r1={class:"canvas-guide-label"},d1={key:5,class:"drop-hint"},u1={class:"canvas-info-bar"},c1=["disabled"],p1={class:"slide-index"},v1=["disabled"],f1={key:0},g1={__name:"EditorCanvas",setup(A){const r=it(),u=at(),c=z(null),p=z(null),h=z(1),k=P(()=>h.value*r.zoomLevel);Il("canvasScale",k);const f=P(()=>u.getProject(r.projectId)),H=P(()=>zt(f.value)),ie=P(()=>hl(f.value)),G=P(()=>H.value.width),V=P(()=>H.value.height),me=P(()=>xl(G.value,V.value)),N=P(()=>{var y,x;return(x=(y=f.value)==null?void 0:y.slides)==null?void 0:x.find(Z=>Z.id===r.currentSlideId)}),B=P(()=>{var y;return[...((y=f.value)==null?void 0:y.slides)||[]].sort((x,Z)=>x.order-Z.order)}),a=P(()=>B.value.findIndex(y=>y.id===r.currentSlideId)),T=P(()=>{var y;return{autoPlay:!1,motionPresets:[],...((y=f.value)==null?void 0:y.settings)||{}}}),L=P(()=>(Array.isArray(T.value.motionPresets)?T.value.motionPresets:[]).filter(y=>y.scope==="group")),Y=P(()=>{const y=new Set(r.selectedElementIds);return ke.value.filter(x=>y.has(x.id))}),m=z(""),F=P(()=>N.value?N.value.advanceOnMediaEnd?{label:"Media Advance",tone:"media"}:T.value.autoPlay&&Number(N.value.duration||0)>0?{label:`Auto ${Number(N.value.duration).toFixed(Number(N.value.duration)%1===0?0:1)}s`,tone:"auto"}:{label:"Manual",tone:"manual"}:{label:"Manual",tone:"manual"});function ae(){const y=L.value.find(Z=>Z.id===m.value);if(!y||!Y.value.length)return;[...Y.value].sort((Z,W)=>(Z.y||0)!==(W.y||0)?(Z.y||0)-(W.y||0):(Z.x||0)-(W.x||0)).forEach((Z,W)=>{if(y.type==="auto"){u.updateElement(r.projectId,r.currentSlideId,Z.id,{animations:[]});return}u.updateElement(r.projectId,r.currentSlideId,Z.id,{animations:[{type:y.type,delay:Math.max(0,Number(y.delay)||0)+W*Math.max(0,Number(y.stepDelay)||0),duration:Math.max(.1,Number(y.duration)||.72)}]})}),u.updateProject(r.projectId,{settings:{...T.value,motionPresets:(T.value.motionPresets||[]).map(Z=>Z.id===y.id?{...Z,usageCount:Math.max(0,Number(Z.usageCount||0))+1,lastUsedAt:Date.now()}:Z)}})}function oe(){if(!L.value.length){m.value="";return}L.value.some(y=>y.id===m.value)||(m.value=L.value[0].id)}const ke=P(()=>{var y;return[...((y=N.value)==null?void 0:y.elements)||[]].sort((x,Z)=>(x.zIndex||0)-(Z.zIndex||0))}),O=P(()=>{const y=N.value;return y?y.backgroundType==="gradient"&&y.backgroundGradient?{background:y.backgroundGradient}:y.backgroundType==="image"&&y.backgroundImage?{backgroundImage:`url(${y.backgroundImage})`,backgroundSize:"cover",backgroundPosition:"center"}:{background:y.background||"#fff"}:{background:"#fff"}}),U=P(()=>`scale(${k.value})`);function pe(){if(!c.value)return;const{clientWidth:y,clientHeight:x}=c.value,Z=(y-80)/G.value,W=(x-80)/V.value;h.value=Math.min(Z,W,1)}let be=null;fl(()=>{pe(),be=new ResizeObserver(pe),c.value&&be.observe(c.value),oe()}),gl(()=>be==null?void 0:be.disconnect()),Qe(L,()=>{oe()},{deep:!0,immediate:!0}),Qe(H,()=>{pe()},{deep:!0});const le=z({x:0,y:0}),we=z({x:0,y:0}),C=z(!1),j=z(!1),D=z(!1),K=z(null),xe=P(()=>{var y,x;return((y=ie.value)==null?void 0:y.id)==="mobile"?{tone:"mobile",label:"Mobile safe area",style:{inset:"5% 8%",borderRadius:"28px"}}:((x=ie.value)==null?void 0:x.id)==="square"?{tone:"square",label:"Square composition guide",style:{inset:"8%",borderRadius:"24px"}}:null}),ze=P(()=>{if(!xe.value)return null;if(xe.value.tone==="mobile"){const Z=G.value*.08,W=V.value*.05;return{x:Z,y:W,width:G.value-Z*2,height:V.value-W*2}}const y=G.value*.08,x=V.value*.08;return{x:y,y:x,width:G.value-y*2,height:V.value-x*2}}),Ie=P(()=>{if(!ze.value)return[];const y=ze.value;return ke.value.filter(x=>x.visible!==!1).filter(x=>{const Z=Number(x.x||0),W=Number(x.y||0),Ee=Z+Number(x.width||0),Ae=W+Number(x.height||0);return Z<y.x||W<y.y||Ee>y.x+y.width||Ae>y.y+y.height}).map(x=>x.id)}),je=P(()=>r.selectedElementIds.filter(y=>Ie.value.includes(y)).length),ne=P(()=>Ie.value.length),fe=P(()=>!xe.value||!ne.value?null:je.value?`${je.value} selected ${je.value===1?"element is":"elements are"} outside the ${xe.value.label.toLowerCase()}.`:`${ne.value} ${ne.value===1?"element is":"elements are"} outside the ${xe.value.label.toLowerCase()}.`),se=P(()=>{if(!C.value)return null;const y=Math.min(le.value.x,we.value.x),x=Math.min(le.value.y,we.value.y),Z=Math.abs(we.value.x-le.value.x),W=Math.abs(we.value.y-le.value.y);return{x:y,y:x,width:Z,height:W}});function ge(y){!C.value&&(y.target===p.value||y.target===y.currentTarget)&&r.clearSelection()}function Pe(y){return y?Array.from(y.files||[]).some(x=>x.type.startsWith("image/")):!1}function re(y){return y?Array.from(y.types||[]).includes(Wt):!1}function I(y,x,Z){return Math.min(Math.max(y,x),Z)}function $(y,x,Z){const W=Gt(y),Ee=I(x-W.width/2,0,Math.max(0,G.value-W.width)),Ae=I(Z-W.height/2,0,Math.max(0,V.value-W.height));return{x:Ee,y:Ae,bounds:W}}function q(y){if(!re(y))return null;try{const x=y.getData(Wt),Z=x?JSON.parse(x):null;return Z!=null&&Z.id&&u.getContentBlocks(r.projectId).find(W=>W.id===Z.id)||null}catch{return null}}function g(y,x,Z){if(!p.value||!Z){K.value=null;return}const W=p.value.getBoundingClientRect(),Ee=(y-W.left)/k.value,Ae=(x-W.top)/k.value,Fe=$(Z,Ee,Ae);K.value={block:Z,x:Fe.x,y:Fe.y,bounds:Fe.bounds}}function _e(y,x,Z){if(!y||!y.type.startsWith("image/"))return;const W=new FileReader;W.onload=()=>{const Ee=String(W.result||"");if(!Ee)return;const Ae=new Image;Ae.onload=()=>{const Fe=p.value.getBoundingClientRect(),We=(x-Fe.left)/k.value,de=(Z-Fe.top)/k.value,Re=Math.min(420/Ae.width,280/Ae.height,1),Be=Math.max(120,Math.round(Ae.width*Re)),Ve=Math.max(80,Math.round(Ae.height*Re)),gt=Math.max(0,Math.min(G.value-Be,Math.round(We-Be/2))),ft=Math.max(0,Math.min(V.value-Ve,Math.round(de-Ve/2))),mt=u.addElement(r.projectId,r.currentSlideId,"image",{x:gt,y:ft,width:Be,height:Ve,content:{src:Ee,alt:y.name,objectFit:"cover"}});mt&&(r.selectElement(mt.id),r.setActiveTool("select"),r.setRightPanel("properties"))},Ae.src=Ee},W.readAsDataURL(y)}function qe(y){const x=Pe(y.dataTransfer),Z=re(y.dataTransfer);!x&&!Z||(y.preventDefault(),y.dataTransfer.dropEffect="copy",j.value=x,D.value=Z,Z&&g(y.clientX,y.clientY,q(y.dataTransfer)))}function Le(y){var x;(x=y.currentTarget)!=null&&x.contains(y.relatedTarget)||(j.value=!1,D.value=!1,K.value=null)}function Ce(y){const x=Pe(y.dataTransfer),Z=re(y.dataTransfer);if(!x&&!Z)return;if(y.preventDefault(),j.value=!1,D.value=!1,K.value=null,Z){try{const Ee=q(y.dataTransfer);if(!Ee)return;const Ae=p.value.getBoundingClientRect(),Fe=(y.clientX-Ae.left)/k.value,We=(y.clientY-Ae.top)/k.value,de=$(Ee,Fe,We),$e=u.insertContentBlock(r.projectId,r.currentSlideId,Ee.id,{x:de.x,y:de.y});$e.length&&(r.setSelection($e.map(Ze=>Ze.id)),r.setActiveTool("select"),r.focusPropertiesSection("content"))}catch(Ee){console.warn("Failed to drop block onto canvas.",Ee)}return}const W=Array.from(y.dataTransfer.files||[]).find(Ee=>Ee.type.startsWith("image/"));W&&_e(W,y.clientX,y.clientY)}function Te(y){if(Y.value.length<2)return;const x=[...Y.value].sort((de,$e)=>(de.zIndex||0)-($e.zIndex||0)),Z=Math.min(...x.map(de=>Number(de.x||0))),W=Math.min(...x.map(de=>Number(de.y||0))),Ee=Math.max(...x.map(de=>Number(de.x||0)+Number(de.width||0))),Ae=Math.max(...x.map(de=>Number(de.y||0)+Number(de.height||0))),Fe=Z+(Ee-Z)/2,We=W+(Ae-W)/2;if(y==="align-left"&&x.forEach(de=>u.updateElement(r.projectId,r.currentSlideId,de.id,{x:Z},{persist:!1})),y==="align-center"&&x.forEach(de=>{const $e=Number(de.width||0);u.updateElement(r.projectId,r.currentSlideId,de.id,{x:Fe-$e/2},{persist:!1})}),y==="align-right"&&x.forEach(de=>{const $e=Number(de.width||0);u.updateElement(r.projectId,r.currentSlideId,de.id,{x:Ee-$e},{persist:!1})}),y==="align-top"&&x.forEach(de=>u.updateElement(r.projectId,r.currentSlideId,de.id,{y:W},{persist:!1})),y==="align-middle"&&x.forEach(de=>{const $e=Number(de.height||0);u.updateElement(r.projectId,r.currentSlideId,de.id,{y:We-$e/2},{persist:!1})}),y==="align-bottom"&&x.forEach(de=>{const $e=Number(de.height||0);u.updateElement(r.projectId,r.currentSlideId,de.id,{y:Ae-$e},{persist:!1})}),y==="distribute-horizontal"){const de=[...x].sort((Be,Ve)=>(Be.x||0)-(Ve.x||0)),$e=de.reduce((Be,Ve)=>Be+Number(Ve.width||0),0),Ze=de.length>1?(Ee-Z-$e)/(de.length-1):0;let Re=Z;de.forEach(Be=>{u.updateElement(r.projectId,r.currentSlideId,Be.id,{x:Re},{persist:!1}),Re+=Number(Be.width||0)+Ze})}if(y==="distribute-vertical"){const de=[...x].sort((Be,Ve)=>(Be.y||0)-(Ve.y||0)),$e=de.reduce((Be,Ve)=>Be+Number(Ve.height||0),0),Ze=de.length>1?(Ae-W-$e)/(de.length-1):0;let Re=W;de.forEach(Be=>{u.updateElement(r.projectId,r.currentSlideId,Be.id,{y:Re},{persist:!1}),Re+=Number(Be.height||0)+Ze})}u.commitProject(r.projectId)}function st(y){const x=r.activeTool;if(y.target!==p.value&&y.target!==y.currentTarget)return;y.preventDefault(),y.stopPropagation();const Z=p.value.getBoundingClientRect(),W=(y.clientX-Z.left)/k.value,Ee=(y.clientY-Z.top)/k.value;if(x==="select"){C.value=!0,le.value={x:W,y:Ee},we.value={x:W,y:Ee};const We=$e=>{we.value={x:($e.clientX-Z.left)/k.value,y:($e.clientY-Z.top)/k.value}},de=()=>{window.removeEventListener("mousemove",We),window.removeEventListener("mouseup",de);const $e=se.value;if($e&&($e.width>2||$e.height>2)){const Ze=ke.value.filter(Re=>{const Be=Re.x,Ve=Re.y,gt=Re.width||100,ft=Re.height||100;return Be<$e.x+$e.width&&Be+gt>$e.x&&Ve<$e.y+$e.height&&Ve+ft>$e.y}).map(Re=>Re.id);Ze.length>0?r.setSelection(Ze):r.clearSelection()}else r.clearSelection();setTimeout(()=>{C.value=!1},0)};window.addEventListener("mousemove",We),window.addEventListener("mouseup",de);return}const Ae=We=>r.snapToGrid?Math.round(We/r.gridSize)*r.gridSize:We,Fe=u.addElement(r.projectId,r.currentSlideId,x,{x:Ae(W-75),y:Ae(Ee-40)});Fe&&(r.selectElement(Fe.id),r.setActiveTool("select"),r.setRightPanel("properties"))}const tt=P(()=>{if(!r.showGrid)return{};const y=r.gridSize;return{backgroundImage:`
      linear-gradient(to right, rgba(108,71,255,.10) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(108,71,255,.10) 1px, transparent 1px)
    `,backgroundSize:`${y}px ${y}px`}}),ot={text:Vt,heading:Vt,image:Ef,shape:Tf,button:Bf,hotspot:_f,video:Vf,audio:Yf,quiz:n1,chart:ei,tabs:Zl,accordion:Kl,flipcard:Xl,stepper:Ql,poll:Jl,labeledimage:Yl,matching:Hl,sorting:Gl,cloze:Wl,scenario:Vl,progress:Ul,divider:"div"};function wt(y){return ot[y]||Vt}function rt(y){var x,Z;return y.type!=="divider"?{}:{borderTop:`${((x=y.content)==null?void 0:x.thickness)||2}px solid ${((Z=y.content)==null?void 0:Z.color)||"#e2e8f0"}`,width:"100%",height:"100%"}}const De=z({show:!1,x:0,y:0,elId:null});function ct(y,x){y.preventDefault(),De.value={show:!0,x:y.clientX,y:y.clientY,elId:x},r.selectElement(x),setTimeout(()=>window.addEventListener("click",Ke,{once:!0}),0)}function Ke(){De.value.show=!1}function Ct(){if(De.value.elId){const y=u.duplicateElement(r.projectId,r.currentSlideId,De.value.elId);y&&r.selectElement(y.id)}Ke()}function St(){De.value.elId&&(u.deleteElement(r.projectId,r.currentSlideId,De.value.elId),r.clearSelection()),Ke()}function $t(){De.value.elId&&u.reorderElement(r.projectId,r.currentSlideId,De.value.elId,"up"),Ke()}function pt(){De.value.elId&&u.reorderElement(r.projectId,r.currentSlideId,De.value.elId,"down"),Ke()}function It(){const y=a.value,x=u.addSlide(r.projectId,y);x&&r.setCurrentSlide(x.id)}function Et(){const y=a.value;y>0&&r.setCurrentSlide(B.value[y-1].id)}function At(){const y=a.value;y<B.value.length-1&&r.setCurrentSlide(B.value[y+1].id)}return(y,x)=>{var Z;return l(),i("div",{class:"canvas-container",ref_key:"canvasContainerRef",ref:c},[N.value?(l(),i(te,{key:1},[e("div",{class:X(["canvas-zoom-wrapper",[xe.value&&`canvas-zoom-wrapper-${xe.value.tone}`]]),style:he({transform:U.value,transformOrigin:"center center",transition:"transform .15s ease"})},[e("div",{ref_key:"canvasRef",ref:p,class:"slide-canvas",style:he({width:G.value+"px",height:V.value+"px",...O.value,...tt.value}),onClick:ge,onMousedown:st,onDragover:qe,onDragleave:Le,onDrop:Ce,onContextmenu:x[3]||(x[3]=Oe(()=>{},["prevent"]))},[xe.value?(l(),i("div",a1)):R("",!0),E(r).multiSelection&&L.value.length?(l(),i("div",{key:1,class:"selection-preset-chip",onMousedown:x[1]||(x[1]=Oe(()=>{},["stop"]))},[x[15]||(x[15]=e("span",{class:"selection-preset-label"},"Sequence",-1)),ce(e("select",{"onUpdate:modelValue":x[0]||(x[0]=W=>m.value=W),class:"selection-preset-select"},[(l(!0),i(te,null,ue(L.value,W=>(l(),i("option",{key:W.id,value:W.id},w(W.name),9,s1))),128))],512),[[Tt,m.value]]),e("button",{type:"button",class:"selection-preset-apply",onClick:Oe(ae,["stop"])},"Apply")],32)):R("",!0),fe.value?(l(),i("div",{key:2,class:"canvas-guide-warning",onMousedown:x[2]||(x[2]=Oe(()=>{},["stop"]))},[x[16]||(x[16]=e("span",{class:"canvas-guide-warning-dot"},null,-1)),e("span",null,w(fe.value),1)],32)):R("",!0),K.value?(l(),i("div",{key:3,class:"block-drop-preview",style:he({left:`${K.value.x}px`,top:`${K.value.y}px`,width:`${K.value.bounds.width}px`,height:`${K.value.bounds.height}px`})},[(l(!0),i(te,null,ue(K.value.block.elements,(W,Ee)=>{var Ae,Fe,We,de;return l(),i("div",{key:`${K.value.block.id}-preview-${Ee}`,class:X(["block-drop-preview-el",`block-drop-preview-${W.type}`]),style:he({left:`${Number(W.x||0)-K.value.bounds.minX}px`,top:`${Number(W.y||0)-K.value.bounds.minY}px`,width:`${Number(W.width||0)}px`,height:`${Number(W.height||0)}px`,borderRadius:W.type==="shape"&&((Ae=W.content)==null?void 0:Ae.shapeType)==="circle"?"50%":`${Number(((Fe=W.content)==null?void 0:Fe.borderRadius)||12)}px`,background:W.type==="shape"?((We=W.content)==null?void 0:We.fillColor)||"rgba(108,71,255,.18)":W.type==="button"?((de=W.content)==null?void 0:de.bgColor)||"rgba(108,71,255,.32)":["text","heading"].includes(W.type)?"transparent":"rgba(148,163,184,.18)"})},[["text","heading"].includes(W.type)?(l(),i(te,{key:0},[x[17]||(x[17]=e("span",{class:"block-drop-preview-line"},null,-1)),x[18]||(x[18]=e("span",{class:"block-drop-preview-line short"},null,-1))],64)):R("",!0)],6)}),128))],4)):R("",!0),(l(!0),i(te,null,ue(ke.value,W=>(l(),Je(kf,{key:W.id,element:W,onContextmenu:Oe(Ee=>ct(Ee,W.id),["stop"])},{default:ut(()=>[(l(),Je($l(wt(W.type)),{element:W,style:he(W.type==="divider"?rt(W):{})},null,8,["element","style"]))]),_:2},1032,["element","onContextmenu"]))),128)),xe.value?(l(),i("div",{key:4,class:X(["canvas-guide",[`canvas-guide-${xe.value.tone}`,ne.value&&"canvas-guide-warning-state"]]),style:he(xe.value.style),"aria-hidden":"true"},[e("span",r1,w(xe.value.label)+" · "+w(me.value),1)],6)):R("",!0),E(r).activeTool!=="select"||j.value||D.value?(l(),i("div",d1,w(D.value?"Drop block to insert it here":j.value?"Drop image to insert it on this slide":`Click anywhere to add ${E(r).activeTool}`),1)):R("",!0),C.value&&se.value?(l(),i("div",{key:6,class:"selection-marquee",style:he({left:se.value.x+"px",top:se.value.y+"px",width:se.value.width+"px",height:se.value.height+"px"})},null,4)):R("",!0)],36)],6),e("div",u1,[e("button",{class:"bar-btn",onClick:It},"Add page"),e("button",{class:"bar-btn icon",onClick:Et,disabled:a.value<=0},"◀",8,c1),e("span",p1,w(a.value+1)+" / "+w(B.value.length),1),e("button",{class:"bar-btn icon",onClick:At,disabled:a.value>=B.value.length-1},"▶",8,v1),e("span",null,w(G.value)+" × "+w(V.value)+"px",1),x[19]||(x[19]=e("span",null,"·",-1)),e("span",null,w(((Z=N.value.elements)==null?void 0:Z.length)||0)+" elements",1),x[20]||(x[20]=e("span",null,"·",-1)),e("span",{class:X(["playback-badge",`playback-badge-${F.value.tone}`])},w(F.value.label),3),E(r).hasSelection?(l(),i("span",f1,"· "+w(E(r).selectedElementIds.length)+" selected",1)):R("",!0),E(r).multiSelection?(l(),i(te,{key:1},[e("button",{class:"bar-btn",onClick:x[4]||(x[4]=W=>Te("align-left"))},"Left"),e("button",{class:"bar-btn",onClick:x[5]||(x[5]=W=>Te("align-center"))},"Center"),e("button",{class:"bar-btn",onClick:x[6]||(x[6]=W=>Te("align-right"))},"Right"),e("button",{class:"bar-btn",onClick:x[7]||(x[7]=W=>Te("align-top"))},"Top"),e("button",{class:"bar-btn",onClick:x[8]||(x[8]=W=>Te("align-middle"))},"Middle"),e("button",{class:"bar-btn",onClick:x[9]||(x[9]=W=>Te("align-bottom"))},"Bottom"),e("button",{class:"bar-btn",onClick:x[10]||(x[10]=W=>Te("distribute-horizontal"))},"Space H"),e("button",{class:"bar-btn",onClick:x[11]||(x[11]=W=>Te("distribute-vertical"))},"Space V")],64)):R("",!0),e("button",{class:"bar-btn ai",onClick:x[12]||(x[12]=W=>E(r).setRightPanel("ai"))},"AI")])],64)):(l(),i("div",l1,[(l(),i("svg",i1,[...x[13]||(x[13]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"},null,-1)])])),x[14]||(x[14]=e("p",null,"Select a slide to start editing",-1))])),(l(),Je(ml,{to:"body"},[De.value.show?(l(),i("div",{key:0,class:"ctx-menu",style:he({left:De.value.x+"px",top:De.value.y+"px"})},[e("button",{class:"ctx-item",onClick:Ct},"Duplicate"),e("button",{class:"ctx-item",onClick:$t},"Bring Forward"),e("button",{class:"ctx-item",onClick:pt},"Send Backward"),x[21]||(x[21]=e("div",{class:"ctx-divider"},null,-1)),e("button",{class:"ctx-item danger",onClick:St},"Delete")],4)):R("",!0)]))],512)}}},m1=Xe(g1,[["__scopeId","data-v-f050859a"]]),b1={class:"ai-panel"},y1={class:"ai-mode-tabs"},h1=["onClick"],x1={class:"ai-content"},k1={class:"form-group"},w1={class:"output-mode-switch",role:"group","aria-label":"Slide generation scope"},C1={key:0,class:"form-group"},S1={key:1,class:"form-group"},$1={class:"layout-label-row"},I1={class:"layout-current-hint"},E1={class:"layout-preset-grid",role:"group","aria-label":"AI layout preset"},A1=["onClick"],M1={class:"layout-preset-title"},P1={class:"layout-preset-hint"},T1={key:2,class:"form-group"},B1={key:3,class:"form-group"},N1={class:"layout-label-row"},z1={class:"layout-current-hint"},L1={class:"output-mode-switch",role:"group","aria-label":"Deck layout strategy"},j1={key:4,class:"form-group"},_1={class:"layout-label-row"},D1={class:"layout-current-hint"},q1={class:"layout-preset-grid",role:"group","aria-label":"Deck layout preset"},R1=["onClick"],O1={class:"layout-preset-title"},F1={class:"layout-preset-hint"},U1={class:"form-group"},V1={class:"form-group"},W1={class:"prompt-label-row"},G1={key:1,class:"prompt-auto-badge"},H1={key:5,class:"output-mode-switch",role:"group","aria-label":"Generation output mode"},Y1={key:6,class:"selected-source-card"},J1={class:"result-header"},Q1={class:"source-count-badge"},X1={class:"selected-source-preview"},K1={class:"selected-source-actions"},Z1=["disabled"],eg=["disabled"],tg={key:0,class:"spinner"},og={key:1,width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},ng={key:7,class:"creative-options-wrap"},lg={class:"result-header"},ig={key:0,class:"ai-error",style:{"margin-top":"var(--space-2)"}},ag={key:1,class:"creative-options-list"},sg={class:"creative-title"},rg={class:"creative-angle"},dg=["onClick"],ug={class:"form-group"},cg={class:"quiz-config-row"},pg={class:"form-group",style:{flex:"1"}},vg={class:"form-group",style:{flex:"1"}},fg={class:"form-group"},gg={class:"qtype-btns"},mg=["onClick"],bg={class:"qtype-icon"},yg={class:"form-group"},hg={class:"form-group"},xg={class:"prompt-label-row"},kg={key:1,class:"prompt-auto-badge"},wg=["disabled"],Cg={key:0,class:"spinner"},Sg={key:1,width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},$g={key:0,class:"quiz-results"},Ig={class:"quiz-results-header"},Eg={class:"form-label"},Ag={class:"quiz-header-actions"},Mg={class:"regen-row"},Pg=["disabled"],Tg={key:0,class:"spinner spinner-sm"},Bg={key:1,width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},Ng=["disabled"],zg={class:"quiz-card-header"},Lg={class:"quiz-card-check"},jg=["onUpdate:modelValue"],_g={class:"q-num"},Dg={class:"q-badges"},qg={class:"badge type-badge"},Rg={class:"q-question"},Og={class:"q-options"},Fg={class:"q-option-letter"},Ug={key:0,class:"q-check-icon",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},Vg={key:0,class:"q-explanation"},Wg=["disabled"],Gg={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Hg=["disabled"],Yg={key:0,class:"spinner"},Jg={key:0,class:"selected-text-preview"},Qg={class:"text-preview"},Xg={key:1,class:"ai-hint"},Kg={class:"form-group",style:{"margin-bottom":"var(--space-3)","margin-top":"var(--space-3)"}},Zg=["disabled"],em={key:0,class:"spinner"},tm={key:0,class:"selected-text-preview"},om={class:"text-preview"},nm={key:1,class:"ai-hint"},lm={class:"form-group",style:{"margin-top":"var(--space-3)","margin-bottom":"var(--space-3)"}},im=["disabled"],am={key:0,class:"spinner"},sm={key:2,class:"improve-result-wrap",style:{"margin-top":"var(--space-4)"}},rm={class:"result-header"},dm={class:"result-actions"},um=["disabled"],cm={class:"textarea result-display"},pm={key:0,class:"demo-notice",style:{"margin-bottom":"var(--space-3)"}},vm={key:1,class:"ai-error",style:{"margin-bottom":"var(--space-3)"}},fm={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},gm=["disabled"],mm={key:0,class:"spinner"},bm={key:2,class:"improve-result-wrap",style:{"margin-top":"var(--space-4)"}},ym={class:"textarea result-display",style:{color:"var(--color-primary)"}},hm={key:6,class:"ai-settings"},xm={class:"form-group",style:{"margin-bottom":"var(--space-4)"}},km=["value"],wm={class:"form-group",style:{"margin-bottom":"var(--space-4)"}},Cm=["value","placeholder"],Sm={class:"form-hint"},$m={key:0,class:"demo-notice"},Im={key:1,class:"demo-notice"},Em={key:7,class:"result-area"},Am={class:"result-header"},Mm={class:"result-pre"},Pm={class:"result-actions"},Tm=["disabled"],Bm={key:8,class:"ai-error"},Nm={__name:"AIAssistant",setup(A){const r=[{id:"classic",label:"Classic",hint:"Title, bullets, and a takeaway.",promptHint:"Use a standard explanatory slide with a title, optional subtitle, 3-5 bullets, and one strong takeaway.",schema:'{ "layout": "classic", "title": "...", "subtitle": "...", "bullets": ["..."], "callout": "..." }'},{id:"cards",label:"Cards",hint:"Three concept or benefit cards.",promptHint:"Structure the content as three distinct cards with a short title and supporting sentence for each.",schema:'{ "layout": "cards", "title": "...", "subtitle": "...", "callout": "...", "cards": [{ "title": "...", "body": "..." }, { "title": "...", "body": "..." }, { "title": "...", "body": "..." }] }'},{id:"comparison",label:"Comparison",hint:"Side-by-side before/after or option A/B.",promptHint:"Create a two-column comparison with clear labels and 2-3 points on each side.",schema:'{ "layout": "comparison", "title": "...", "subtitle": "...", "callout": "...", "comparison": { "leftTitle": "...", "leftPoints": ["..."], "rightTitle": "...", "rightPoints": ["..."] } }'},{id:"metrics",label:"Metrics",hint:"Three KPI-style highlights.",promptHint:"Return three concise, presentation-ready metrics with realistic values and short labels.",schema:'{ "layout": "metrics", "title": "...", "subtitle": "...", "callout": "...", "metrics": [{ "value": "92%", "label": "..." }, { "value": "3.4x", "label": "..." }, { "value": "14d", "label": "..." }] }'},{id:"timeline",label:"Timeline",hint:"Four-step milestone story.",promptHint:"Turn the topic into four clear milestones that progress from start to finish.",schema:'{ "layout": "timeline", "title": "...", "subtitle": "...", "callout": "...", "timeline": [{ "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }] }'},{id:"faq",label:"FAQ",hint:"Three audience questions and answers.",promptHint:"Return three strong audience questions, each with a concise useful answer.",schema:'{ "layout": "faq", "title": "...", "subtitle": "...", "callout": "...", "faqs": [{ "question": "...", "answer": "..." }, { "question": "...", "answer": "..." }, { "question": "...", "answer": "..." }] }'},{id:"process",label:"Process",hint:"Three practical steps.",promptHint:"Break the topic into three clear steps with actionable descriptions.",schema:'{ "layout": "process", "title": "...", "subtitle": "...", "callout": "...", "process": [{ "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }] }'},{id:"cloze",label:"Fill-in-the-Blank",hint:"Interactive fill-in-the-blank text.",promptHint:"Create an interactive fill-in-the-blank activity. Provide a paragraph with a few key words wrapped in [brackets] to indicate blanks.",schema:'{ "layout": "cloze", "title": "...", "subtitle": "...", "callout": "...", "cloze": { "text": "A sentence about the topic where the [key word] is in brackets." } }'},{id:"scenario",label:"Scenario",hint:"Branching scenario with choices.",promptHint:"Create a branching scenario. Provide a starting situation from the agent, and 2-3 potential responses from the user.",schema:'{ "layout": "scenario", "title": "...", "subtitle": "...", "callout": "...", "scenario": { "agentMessage": "...", "userOptions": ["..."] } }'},{id:"progress",label:"Progress",hint:"A step-by-step progress indicator.",promptHint:"Create a progress overview representing the users current learning status. Provide realistic mock values.",schema:'{ "layout": "progress", "title": "...", "subtitle": "...", "callout": "...", "progress": { "level": 4, "xp": 350, "percent": 65 } }'},{id:"poll",label:"Poll",hint:"An interactive poll or survey.",promptHint:"Create an interactive poll question with 3-4 options. Provide realistic mock vote counts.",schema:'{ "layout": "poll", "title": "...", "subtitle": "...", "callout": "...", "poll": { "question": "...", "options": [{ "text": "...", "votes": 12 }] } }'},{id:"matching",label:"Matching",hint:"A drag-and-drop matching activity.",promptHint:"Create a matching activity with 3-4 pairs of related concepts (e.g. term and definition).",schema:'{ "layout": "matching", "title": "...", "subtitle": "...", "callout": "...", "matching": { "pairs": [{ "left": "...", "right": "..." }] } }'},{id:"sorting",label:"Sorting",hint:"A sorting activity.",promptHint:"Create an activity where items need to be sorted into correct order. Provide the items in random order.",schema:'{ "layout": "sorting", "title": "...", "subtitle": "...", "callout": "...", "sorting": { "items": [{ "text": "...", "correctOrder": 0 }] } }'},{id:"labeledimage",label:"Labeled Image",hint:"An image with interactive hotspots.",promptHint:"Define 2-3 standard hotspots (x, y percentages) with labels and descriptions over a concept.",schema:'{ "layout": "labeledimage", "title": "...", "subtitle": "...", "callout": "...", "labeledimage": { "markers": [{ "x": 25, "y": 35, "label": "1", "title": "...", "description": "..." }] } }'}],u={cards:"three-card-grid",comparison:"comparison-columns",metrics:"metric-strip",timeline:"timeline-ribbon",faq:"faq-stack",process:"process-ladder"};function c(s,n="classic"){const v=String(s||n||"classic").trim().toLowerCase();return r.some(S=>S.id===v)?v:n}function p(s,n=""){return String(s??n).replace(/^\s*[-•]\s*/,"").trim()||n}function h(s){return(Array.isArray(s)?s:typeof s=="string"?s.split(`
`):[]).map(v=>p(v)).filter(Boolean)}function k(s,n,v){const S=[...s];for(;S.length<n;)S.push(v(S.length));return S.slice(0,n)}function f(s,n){const v=Array.isArray(s)?s.map((b,J)=>({title:p(b==null?void 0:b.title,`Card ${J+1}`),body:p((b==null?void 0:b.body)||(b==null?void 0:b.text)||(b==null?void 0:b.description),"Add supporting detail.")})).filter(b=>b.title||b.body):[],S=n.map((b,J)=>({title:`Point ${J+1}`,body:b}));return k(v.length?v:S,3,b=>({title:`Point ${b+1}`,body:"Add supporting detail."}))}function H(s,n){const v=h(s==null?void 0:s.leftPoints),S=h(s==null?void 0:s.rightPoints),b=n.slice(0,Math.max(1,Math.ceil(n.length/2))),J=n.slice(Math.max(1,Math.ceil(n.length/2)));return{leftTitle:p(s==null?void 0:s.leftTitle,"Option A"),leftPoints:k(v.length?v:b,3,ye=>`Left point ${ye+1}`),rightTitle:p(s==null?void 0:s.rightTitle,"Option B"),rightPoints:k(S.length?S:J,3,ye=>`Right point ${ye+1}`)}}function ie(s,n){const v=Array.isArray(s)?s.map((b,J)=>({value:p(b==null?void 0:b.value,`${J+1}`),label:p(b==null?void 0:b.label,`Metric ${J+1}`)})).filter(b=>b.value||b.label):[],S=n.map((b,J)=>{const[ye,...Ye]=b.split(/[:\-]/);return{value:p(ye,`${J+1}`),label:p(Ye.join(" ").trim(),b)}});return k(v.length?v:S,3,b=>({value:`${b+1}`,label:`Metric ${b+1}`}))}function G(s,n){const v=Array.isArray(s)?s.map((b,J)=>({title:p(b==null?void 0:b.title,`Phase ${J+1}`),detail:p((b==null?void 0:b.detail)||(b==null?void 0:b.description),"Explain the milestone.")})).filter(b=>b.title||b.detail):[],S=n.map((b,J)=>({title:`Phase ${J+1}`,detail:b}));return k(v.length?v:S,4,b=>({title:`Phase ${b+1}`,detail:"Explain the milestone."}))}function V(s,n){const v=Array.isArray(s)?s.map((b,J)=>({question:p(b==null?void 0:b.question,`Question ${J+1}?`),answer:p(b==null?void 0:b.answer,"Add the short answer here.")})).filter(b=>b.question||b.answer):[],S=n.map((b,J)=>({question:`Question ${J+1}?`,answer:b}));return k(v.length?v:S,3,b=>({question:`Question ${b+1}?`,answer:"Add the short answer here."}))}function me(s,n){const v=Array.isArray(s)?s.map((b,J)=>({title:p(b==null?void 0:b.title,`Step ${J+1}`),detail:p((b==null?void 0:b.detail)||(b==null?void 0:b.description),"Add the step detail here.")})).filter(b=>b.title||b.detail):[],S=n.map((b,J)=>({title:`Step ${J+1}`,detail:b}));return k(v.length?v:S,3,b=>({title:`Step ${b+1}`,detail:"Add the step detail here."}))}const N=Ml(),B=it(),a=at(),T=P(()=>N.apiProvider==="gemini"?"Gemini":"OpenAI"),L=P(()=>N.apiProvider==="gemini"?"AIza...":"sk-..."),Y=P(()=>N.apiProvider==="gemini"?"Gemini API keys from Google AI Studio work for text features on the free tier. We provide free image generation via Pollinations.ai when Gemini is selected. The key is stored locally in your browser and never sent to our servers.":"Key is stored locally in your browser. It is never sent to our servers."),m=z("generate"),F=z(""),ae=z(""),oe=z("");Qe(m,()=>{oe.value=""}),Qe(()=>B.aiPanelMode,s=>{s&&(m.value=s)},{immediate:!0});const ke=z(4),O=z("general"),U=z("Spanish"),pe=z(""),be=z(""),le=z(""),we=z(!1),C=z("single"),j=z("classic"),D=z("mixed"),K=z(5),xe=z("slide"),ze=z([]),Ie=z(""),je=P(()=>r.find(s=>s.id===j.value)||r[0]),ne=P(()=>{const s=ae.value.trim()||"[your topic]";if(C.value==="deck"){let S=`Create a complete ${K.value}-slide learning deck about "${s}".`;return be.value.trim()&&(S+=`
Additional context: ${be.value.trim()}`),S+=`
Deck layout strategy: ${D.value}`,D.value==="single"?S+=`
Use the ${j.value} layout for every slide.`:S+=`
Mix layouts across the deck when appropriate.`,S+=`
Return ONLY valid JSON: { "slides": [{ "title": "...", "subtitle": "...", "callout": "...", "slideType": "...", "layout": "classic|cards|comparison|metrics|timeline|faq|process|cloze|scenario|progress|poll|matching|sorting|labeledimage" }] }`,S+=`
Make each slide distinct, logically sequenced, and specific to "${s}".`,S}let v=`Create a ${{general:"well-structured educational slide with title, key points, and a takeaway",intro:"introduction slide — purpose, motivation, and what learners will achieve",overview:"overview slide — high-level map of all topics to be covered",concept:"concept slide — definition, how it works, and why it matters",example:"example slide — real-world case study or worked example with outcome",summary:"summary slide — recap key points and reinforce the main message",callout:"callout slide — single critical insight or action item"}[O.value]||"educational slide"} about "${s}".`;return be.value.trim()&&(v+=`
Additional context: ${be.value.trim()}`),v+=`
Layout mode: ${j.value}`,v+=`
Layout instruction: ${je.value.promptHint}`,v+=`
Return ONLY valid JSON matching this shape: ${je.value.schema}`,v+=`
Make all content specific to "${s}" — no generic placeholders.`,v});Qe(ne,s=>{we.value||(le.value=s)},{immediate:!0});function fe(){le.value=ne.value,we.value=!1}const se=z(""),ge=z("intermediate"),Pe=z("multiple-choice"),re=z(""),I=z([]),$=z(""),q=z(!1),g=P(()=>{const s=se.value.trim()||"[your topic]",n={beginner:"Beginner",intermediate:"Intermediate",advanced:"Advanced"},v={"multiple-choice":"Multiple Choice","true-false":"True / False",mixed:"Mixed (MCQ + T/F)"};let S=`Generate ${ke.value} ${n[ge.value]} ${v[Pe.value]} quiz questions about "${s}".
Return ONLY a valid JSON array with no markdown, each item having: question, options (array), correctIndex (0-based), explanation, difficulty, type.`;return re.value.trim()&&(S+=`
Learning objective: ${re.value.trim()}`),S});Qe(g,s=>{q.value||($.value=s)},{immediate:!0});function _e(){$.value=g.value,q.value=!1}const qe=P(()=>a.getProject(B.projectId)),Le=P(()=>{var s,n;return(n=(s=qe.value)==null?void 0:s.slides)==null?void 0:n.find(v=>v.id===B.currentSlideId)}),Ce=P(()=>{var s,n;return B.selectedElementId?(n=(s=Le.value)==null?void 0:s.elements)==null?void 0:n.find(v=>v.id===B.selectedElementId):null}),Te=P(()=>{var n;const s=new Set(B.selectedElementIds);return(((n=Le.value)==null?void 0:n.elements)||[]).filter(v=>{var S;return s.has(v.id)&&typeof((S=v==null?void 0:v.content)==null?void 0:S.text)=="string"&&v.content.text.trim()})}),st=P(()=>Te.value.map(s=>s.content.text.trim()).filter(Boolean).join(`

`));async function tt(){if(!ae.value.trim()&&!le.value.trim())return;if(oe.value="",ze.value=[],Ie.value="",C.value==="deck"){const n=await N.generateSlideDeck(ae.value,K.value,{objective:be.value,customPrompt:le.value,layoutStrategy:D.value,layoutMode:j.value});if(n!=null&&n.length){const v=n.map(S=>ot(S));oe.value=JSON.stringify({slides:v},null,2),Be(v,{replaceGenerated:!0})}return}if(xe.value==="options"){await ft();return}const s=await N.generateSlideContent(ae.value,O.value,be.value,le.value,{layoutMode:j.value});if(s){const n=ot(s);oe.value=JSON.stringify(n,null,2),Ve(n,{replaceGenerated:!0})}}function ot(s){var b;const n=s&&typeof s=="object"?s:{},v=h(n.bullets),S=c(n.layout||((b=n.design)==null?void 0:b.layout),C.value==="deck"&&D.value==="mixed"?"classic":j.value);return{title:String(n.title||ae.value||"Untitled Slide").trim(),subtitle:String(n.subtitle||"").trim(),bullets:v,callout:String(n.callout||"").trim(),layout:S,cards:f(n.cards,v),comparison:H(n.comparison,v),metrics:ie(n.metrics,v),timeline:G(n.timeline,v),faqs:V(n.faqs,v),process:me(n.process,v),cloze:n.cloze||{text:""},scenario:n.scenario||{agentMessage:"",userOptions:[]},progress:n.progress||{level:4,xp:350,percent:65},poll:n.poll||{question:"",options:[]},matching:n.matching||{pairs:[]},sorting:n.sorting||{items:[]},labeledimage:n.labeledimage||{markers:[]}}}function wt(s,n){var b,J,ye;const v=(J=(b=a.getProject(s))==null?void 0:b.slides)==null?void 0:J.find(Ye=>Ye.id===n);if(!((ye=v==null?void 0:v.elements)!=null&&ye.length))return;v.elements.filter(Ye=>{var M;return((M=Ye.meta)==null?void 0:M.source)==="ai-content"}).map(Ye=>Ye.id).forEach(Ye=>{a.deleteElement(s,n,Ye)})}function rt(s,n,v,S){return a.addElement(s,n,v,{...S,meta:{...S.meta||{},source:"ai-content"}})}function De(s){const n=Rl.find(S=>S.id===s);if(!n)return null;const v=Ol(JSON.parse(JSON.stringify(n)),s);return v.elements=v.elements.map(S=>({...S,meta:{...S.meta||{},source:"ai-content"}})),v}function ct(s,n){n&&s.elements.push({type:"text",x:0,y:54,width:760,height:36,meta:{source:"ai-content"},content:{text:n,fontSize:16,fontWeight:"500",textAlign:"left",color:"#64748b",lineHeight:1.4,fontFamily:"Inter, sans-serif"}})}function Ke(s,n){if(!n)return;const v=Gt(s);s.elements.push({type:"text",x:0,y:v.height+18,width:Math.max(v.width,720),height:40,meta:{source:"ai-content"},content:{text:`Takeaway: ${n}`,fontSize:15,fontWeight:"600",textAlign:"left",color:"#6c47ff",lineHeight:1.4,fontFamily:"Inter, sans-serif"}})}function Ct(s){const n=Array.isArray(s)?s:[];if(!n.length)return{minX:40,minY:54,width:0,height:0};const v=Math.min(...n.map(ye=>Number(ye.x||0))),S=Math.min(...n.map(ye=>Number(ye.y||0))),b=Math.max(...n.map(ye=>Number(ye.x||0)+Number(ye.width||0))),J=Math.max(...n.map(ye=>Number(ye.y||0)+Number(ye.height||0)));return{minX:v,minY:S,width:Math.max(0,b-v),height:Math.max(0,J-S)}}function St(s,n){var J;const v=a.getProject(s),S=Gt(n),b=Number(((J=v==null?void 0:v.settings)==null?void 0:J.slideWidth)||960);return{x:Math.max(40,Math.round((b-S.width)/2)),y:54}}function $t(s){const n=De(u.cards);if(!n)return null;const v=s.cards;return n.elements[0].content.text=s.title,n.elements[1].content.text=s.subtitle||s.callout||"Use the three cards to frame the main ideas.",v.forEach((S,b)=>{n.elements[5+b].content.text=S.title,n.elements[8+b].content.text=S.body}),s.callout&&s.subtitle&&Ke(n,s.callout),n}function pt(s){const n=De(u.comparison);return n?(n.elements[0].content.text=s.title,n.elements[3].content.text=s.comparison.leftTitle,n.elements[4].content.text=s.comparison.rightTitle,n.elements[5].content={...n.elements[5].content,text:s.comparison.leftPoints.map(v=>`• ${v}`).join(`
`),fontSize:17,lineHeight:1.55},n.elements[6].content={...n.elements[6].content,text:s.comparison.rightPoints.map(v=>`• ${v}`).join(`
`),fontSize:17,lineHeight:1.55},ct(n,s.subtitle),Ke(n,s.callout),n):null}function It(s){const n=De(u.metrics);return n?(n.elements[0].content.text=s.title,s.metrics.forEach((v,S)=>{n.elements[4+S].content.text=v.value,n.elements[7+S].content.text=v.label}),ct(n,s.subtitle),Ke(n,s.callout),n):null}function Et(s){const n=De(u.timeline);return n?(n.elements[0].content.text=s.title,s.timeline.forEach((v,S)=>{n.elements[6+S].content={...n.elements[6+S].content,text:`${v.title}
${v.detail}`,fontSize:16,lineHeight:1.35}}),ct(n,s.subtitle),Ke(n,s.callout),n):null}function At(s){const n=De(u.faq);return n?(n.elements[0].content.text=s.title,s.faqs.forEach((v,S)=>{n.elements[4+S].content={...n.elements[4+S].content,text:`${v.question}
${v.answer}`,fontSize:16,lineHeight:1.35},n.elements[4+S].height=44}),ct(n,s.subtitle),Ke(n,s.callout),n):null}function y(s){const n=De(u.process);return n?(n.elements[0].content.text=s.title,s.process.forEach((v,S)=>{n.elements[8+S].content.text=v.title,n.elements[11+S].content.text=v.detail}),ct(n,s.subtitle),Ke(n,s.callout),n):null}function x(s,n,v,S,b){const J=[];s.title&&J.push({type:"heading",x:0,y:0,width:800,height:80,content:{text:s.title,fontSize:36,fontWeight:"bold",textAlign:"center",color:"#1a1a2e",fontFamily:"Inter, sans-serif",lineHeight:1.2}});let ye=s.title?100:0;s.subtitle&&(J.push({type:"text",x:0,y:ye,width:800,height:40,content:{text:s.subtitle,fontSize:16,fontWeight:"500",textAlign:"center",color:"#64748b",lineHeight:1.4,fontFamily:"Inter, sans-serif"}}),ye+=60);const Ye=Math.max(0,(800-v)/2);J.push({type:n,x:Ye,y:ye,width:v,height:S,content:b()});const M={id:`generated-${crypto.randomUUID?crypto.randomUUID():Date.now()}`,type:"group",elements:J};return s.callout&&Ke(M,s.callout),M}function Z(s){const n=s.cloze||{};return x(s,"cloze",600,240,()=>({title:"Fill in the blanks",text:n.text||"An assessment should align closely with the [learning] objectives.",bgColor:"#ffffff",textColor:"#1e293b",fontSize:16,borderRadius:8}))}function W(s){var J;const n=s.scenario||{},v=n.agentMessage||"Welcome to this scenario. What will you do first?",S=(J=n.userOptions)!=null&&J.length?n.userOptions:["I will analyze the requirements."],b=[{role:"agent",text:v}];return S.forEach(ye=>b.push({role:"user",text:typeof ye=="string"?ye:ye.text})),x(s,"scenario",600,360,()=>({bgColor:"#f8fafc",borderRadius:8,messages:b}))}function Ee(s){const n=s.progress||{};return x(s,"progress",400,200,()=>({title:"Your Progress",bgColor:"#ffffff",titleColor:"#0f172a",textColor:"#64748b",fillColor:"#10b981",borderRadius:8,mockXP:n.xp||350,mockLevel:n.level||4,mockPercent:n.percent||65}))}function Ae(s){var b;const n=s.poll||{},S=((b=n.options)!=null&&b.length?n.options:[{text:"Option A",votes:12},{text:"Option B",votes:24}]).map((J,ye)=>({id:String(ye+1),text:J.text||String(J),votes:J.votes||0}));return x(s,"poll",600,360,()=>({question:n.question||"What is your favorite topic?",options:S,showResults:!1,barColor:"#cbd5e1",barSelectedColor:"#6c47ff",trackColor:"#f1f5f9",textColor:"#1e293b",bgColor:"#ffffff"}))}function Fe(s){var b;const n=s.matching||{},S=((b=n.pairs)!=null&&b.length?n.pairs:[{left:"Concept 1",right:"Detail 1"},{left:"Concept 2",right:"Detail 2"}]).map((J,ye)=>({id:String(ye+1),left:J.left,right:J.right}));return x(s,"matching",600,360,()=>({title:"Match the concepts",bgColor:"#ffffff",titleColor:"#0f172a",accentColor:"#6c47ff",accentBgColor:"#f3f0ff",pairs:S}))}function We(s){var b;const n=s.sorting||{},S=((b=n.items)!=null&&b.length?n.items:[{text:"Step 1",correctOrder:0},{text:"Step 2",correctOrder:1}]).map((J,ye)=>({id:String(ye+1),text:J.text,correctOrder:J.correctOrder??ye}));return x(s,"sorting",500,360,()=>({title:"Sort items correctly",bgColor:"#ffffff",titleColor:"#0f172a",accentColor:"#6c47ff",items:S}))}function de(s){var b;const n=s.labeledimage||{},S=((b=n.markers)!=null&&b.length?n.markers:[{x:25,y:35,label:"1",title:"Point 1",description:"Description 1"},{x:75,y:65,label:"2",title:"Point 2",description:"Description 2"}]).map((J,ye)=>({id:String(ye+1),x:J.x||50,y:J.y||50,label:J.label||String(ye+1),title:J.title||`Point ${ye+1}`,description:J.description||""}));return x(s,"labeledimage",600,400,()=>({src:"",borderRadius:8,markerColor:"#6c47ff",markerTextColor:"#ffffff",markers:S}))}function $e(s){switch(s.layout){case"cards":return $t(s);case"comparison":return pt(s);case"metrics":return It(s);case"timeline":return Et(s);case"faq":return At(s);case"process":return y(s);case"cloze":return Z(s);case"scenario":return W(s);case"progress":return Ee(s);case"poll":return Ae(s);case"matching":return Fe(s);case"sorting":return We(s);case"labeledimage":return de(s);default:return null}}function Ze(s,n,v){var S;if(v.title&&(a.updateSlide(s,n,{title:v.title}),rt(s,n,"heading",{x:60,y:40,width:840,height:80,content:{text:v.title,fontSize:36,fontWeight:"bold",textAlign:"center",color:"#1a1a2e",fontFamily:"Inter, sans-serif",lineHeight:1.2}})),v.subtitle&&rt(s,n,"text",{x:60,y:130,width:840,height:50,content:{text:v.subtitle,fontSize:20,fontWeight:"normal",textAlign:"center",color:"#4a4a6a",fontFamily:"Inter, sans-serif",lineHeight:1.4}}),(S=v.bullets)!=null&&S.length){const b=v.bullets.map(J=>`• ${J}`).join(`
`);rt(s,n,"text",{x:60,y:v.subtitle?200:150,width:840,height:200,content:{text:b,fontSize:18,fontWeight:"normal",textAlign:"left",color:"#2d2d4e",fontFamily:"Inter, sans-serif",lineHeight:1.8}})}v.callout&&(rt(s,n,"shape",{x:60,y:420,width:840,height:60,content:{shapeType:"rectangle",fillColor:"#ede9ff",borderColor:"#6c47ff",borderWidth:2,borderRadius:8}}),rt(s,n,"text",{x:80,y:432,width:800,height:40,content:{text:`💡 ${v.callout}`,fontSize:15,fontWeight:"600",textAlign:"center",color:"#6c47ff",fontFamily:"Inter, sans-serif",lineHeight:1.4}}))}function Re(s,n,v,{replaceGenerated:S=!1,origin:b=null}={}){if(!s||!n)return;S&&wt(s,n);const J=$e(v);if(a.updateSlide(s,n,{title:v.title||"Untitled Slide"}),J){const ye=b||St(s,J);a.insertContentBlock(s,n,J,ye)}else Ze(s,n,v)}function Be(s,{replaceGenerated:n=!1}={}){if(!B.currentSlideId)return;const v=B.projectId;if(!v||!Array.isArray(s)||!s.length)return;s.map(b=>ot(b)).forEach(b=>{const J=a.addSlide(v);J&&Re(v,J.id,b,{replaceGenerated:n})})}function Ve(s=null,{replaceGenerated:n=!1}={}){if(!B.currentSlideId)return;let v=s;if(!v){if(!oe.value)return;try{v=JSON.parse(oe.value)}catch(ye){console.warn("Could not parse AI content:",ye);return}}const S=ot(v),b=B.projectId,J=B.currentSlideId;!b||!J||Re(b,J,S,{replaceGenerated:n})}function gt(){if(oe.value){if(C.value==="deck"){try{const s=JSON.parse(oe.value),n=Array.isArray(s)?s:s==null?void 0:s.slides;if(!Array.isArray(n)||!n.length)return;Be(n,{replaceGenerated:!0})}catch{return}return}Ve()}}async function ft(){const s=ae.value.trim()||"[your topic]",n=`You are an expert instructional designer.
Create exactly 3 distinct creative slide directions for a "${O.value}" slide about "${s}" using a ${j.value} layout.

Return ONLY valid JSON array:
[
  {
    "title": "Short option title",
    "angle": "What makes this approach unique in one sentence",
    "prompt": "A detailed prompt for generating that slide content as JSON with title/subtitle/bullets/callout"
  }
]

Each option must be meaningfully different in teaching style and structure.`,v=await N.generate(n,{type:"creativeOptions",topic:s,slideType:O.value});if(v)try{const S=JSON.parse(v.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim());if(!Array.isArray(S))throw new Error("Options must be an array");ze.value=S.slice(0,3).map((b,J)=>({title:String((b==null?void 0:b.title)||`Option ${J+1}`),angle:String((b==null?void 0:b.angle)||""),prompt:String((b==null?void 0:b.prompt)||"")})).filter(b=>b.prompt.trim()),ze.value.length||(Ie.value="No usable creative options were returned. Try generating again.")}catch{Ie.value="Could not parse creative options. Try again or switch to “Show on Slide”."}}async function mt(s){s!=null&&s.prompt&&(le.value=s.prompt,we.value=!0,xe.value="slide",await tt())}async function Lt(){if(!st.value.trim()||!B.projectId||!B.currentSlideId)return;const s=await N.transformSourceTextToSlideContent(st.value,{topic:ae.value,slideType:O.value,description:be.value,layoutMode:j.value,customPrompt:le.value});if(!s)return;const n=ot(s),v=Ct(Te.value),S={x:Math.max(24,Math.round(v.minX)),y:Math.max(24,Math.round(v.minY))};Te.value.forEach(b=>{a.deleteElement(B.projectId,B.currentSlideId,b.id)}),oe.value=JSON.stringify(n,null,2),Re(B.projectId,B.currentSlideId,n,{origin:S})}async function bt(s=!1){if(!se.value.trim()&&!$.value.trim())return;s||(I.value=[]);const n=await N.generateQuiz(se.value,ke.value,{difficulty:ge.value,questionType:Pe.value,objective:re.value,customPrompt:$.value});if(n)if(s){const v=new Set(I.value.map(b=>b.question)),S=n.filter(b=>!v.has(b.question)).map(b=>({...b,_selected:!0}));I.value=[...I.value,...S]}else I.value=n.map(v=>({...v,_selected:!0}))}async function jt(){const s=I.value.filter(v=>v._selected);if(!s.length)return;const n=B.projectId;s.forEach((v,S)=>{const b=a.addSlide(n);if(b){a.addElement(n,b.id,"quiz",{x:60,y:80,width:840,height:380,content:{question:v.question||"Untitled Question",options:Array.isArray(v.options)?v.options:["True","False"],correctIndex:typeof v.correctIndex=="number"?v.correctIndex:0,explanation:v.explanation||""}});const J=typeof v.question=="string"?v.question:"Quiz";a.updateSlide(n,b.id,{title:`Q${S+1}: ${J.slice(0,40)}…`})}}),I.value=[]}function Mt(s){I.value.forEach(n=>n._selected=s)}async function _t(){if(!pe.value.trim())return;const s=await N.generateVoiceoverScript(pe.value);s&&(oe.value=s)}async function Ot(){var v,S;const s=(S=(v=Ce.value)==null?void 0:v.content)==null?void 0:S.text;if(!s)return;const n=await N.generateTranslation(s,U.value);n&&(oe.value=n)}async function xt(){!oe.value||!Ce.value||a.updateElement(B.projectId,B.currentSlideId,Ce.value.id,{content:{...Ce.value.content,text:oe.value}})}const Ge=z(""),nt=z(!1);function vt(s){return String(s||"").replace(/```(json)?\n?/gi," ").replace(/```/g," ").replace(/[\r\n]+/g," ").replace(/\s+/g," ").trim().slice(0,220)}function dt(s,n){return new Promise((v,S)=>{const b=window.setTimeout(()=>{S(new Error("Timed out"))},n);Promise.resolve(s).then(J=>{window.clearTimeout(b),v(J)}).catch(J=>{window.clearTimeout(b),S(J)})})}function Dt(s){const n=String(s||"").trim(),v=n.toLowerCase(),S=T.value;return n?v.includes("billing hard limit")||v.includes("billing")||v.includes("quota")||v.includes("insufficient_quota")?N.apiProvider==="gemini"?"Gemini image generation is being rejected by Google because this project is still on the free tier. Gemini Developer API image models require a billing-enabled project, so you need to enable billing in AI Studio or switch providers for image generation.":`Your ${S} account cannot generate images right now because its billing or quota limit has been reached. Update billing or wait for quota reset, then try again.`:N.apiProvider==="gemini"&&(v.includes("resource exhausted")||v.includes("free tier")||v.includes("generativelanguage.googleapis.com"))?"Gemini image generation is not available to this free-tier project. Enable billing for the Gemini project in AI Studio to use Gemini image models.":v.includes("invalid api key")||v.includes("incorrect api key")||v.includes("unauthorized")?`The ${S} API key appears invalid for image generation. Check the key in API settings and try again.`:v.includes("rate limit")||v.includes("too many requests")?`${S} rate-limited the image request. Wait a moment and try again.`:`${S} image generation failed: ${n}`:`${S} image generation did not return an image. Try a simpler prompt or try again in a moment.`}async function qt(){if(Ge.value.trim()){nt.value=!0,oe.value="Preparing image prompt...";try{if(!N.apiKey&&N.apiProvider!=="gemini"){oe.value=`AI image generation requires a ${T.value} API key in API settings. No fallback image was inserted.`;return}let s=Ge.value;try{const v=await dt(N.generateImagePrompt(Ge.value),2200);v&&(s=v.replace(/```(json)?\n?/g,"").trim())}catch{s=Ge.value}s=vt(s)||vt(Ge.value),oe.value="Generating image and inserting it on the slide...";const n=await dt(N.generateImageAsset(s),2e4).catch(()=>null);if(!n){oe.value=Dt(N.lastError);return}a.addElement(B.projectId,B.currentSlideId,"image",{x:60,y:150,width:420,height:280,content:{src:n,fallbackSrcs:[],alt:Ge.value.trim()||"AI generated image",sourceType:`${N.apiProvider}-image`,objectFit:"cover"}}),oe.value=`AI image added to slide using ${T.value} image generation.`}catch(s){oe.value=Dt((s==null?void 0:s.message)||N.lastError)}finally{nt.value=!1}}}async function Ft(){var n,v;if(!((v=(n=Ce.value)==null?void 0:n.content)!=null&&v.text))return;const s=await N.improveText(Ce.value.content.text,F.value||"Make it clearer and more engaging");s&&(oe.value=s)}async function Rt(){!oe.value||!Ce.value||a.updateElement(B.projectId,B.currentSlideId,Ce.value.id,{content:{...Ce.value.content,text:oe.value}})}async function Ut(){if(!F.value.trim())return;const s=await N.generate(F.value);s&&(oe.value=s)}return(s,n)=>{var v,S,b,J,ye,Ye;return l(),i("div",b1,[e("div",y1,[(l(),i(te,null,ue([{id:"generate",label:"✦ Content"},{id:"quiz",label:"✅ Quiz"},{id:"voiceover",label:"🎙 Voiceover"},{id:"improve",label:"✏️ Improve"},{id:"translate",label:"🌐 Translate"},{id:"image",label:"🎨 Image"},{id:"settings",label:"⚙ API"}],M=>e("button",{key:M.id,class:X(["ai-mode-btn",m.value===M.id&&"active"]),onClick:d=>m.value=M.id},w(M.label),11,h1)),64))]),e("div",x1,[m.value==="generate"?(l(),i(te,{key:0},[e("div",k1,[n[36]||(n[36]=e("label",{class:"form-label"},[ee("Topic / Subject "),e("span",{class:"required"},"*")],-1)),ce(e("input",{"onUpdate:modelValue":n[0]||(n[0]=M=>ae.value=M),class:"input",placeholder:"e.g. Automotive Braking System, Photosynthesis…",onKeydown:pl(tt,["enter"])},null,544),[[Se,ae.value]])]),e("div",w1,[e("button",{class:X(["output-mode-btn",C.value==="single"&&"active"]),onClick:n[1]||(n[1]=M=>C.value="single")},"Single Slide",2),e("button",{class:X(["output-mode-btn",C.value==="deck"&&"active"]),onClick:n[2]||(n[2]=M=>C.value="deck")},"Slide Deck",2)]),C.value==="single"?(l(),i("div",C1,[n[38]||(n[38]=e("label",{class:"form-label"},"Slide Type",-1)),ce(e("select",{"onUpdate:modelValue":n[3]||(n[3]=M=>O.value=M),class:"select"},[...n[37]||(n[37]=[et('<option value="general" data-v-3ccdb1b2>General</option><option value="intro" data-v-3ccdb1b2>Introduction</option><option value="overview" data-v-3ccdb1b2>Overview</option><option value="concept" data-v-3ccdb1b2>Concept Explanation</option><option value="example" data-v-3ccdb1b2>Example / Case Study</option><option value="summary" data-v-3ccdb1b2>Summary</option><option value="callout" data-v-3ccdb1b2>Key Takeaway</option>',7)])],512),[[Tt,O.value]])])):R("",!0),C.value==="single"?(l(),i("div",S1,[e("div",$1,[n[39]||(n[39]=e("label",{class:"form-label"},"Layout",-1)),e("span",I1,w(je.value.hint),1)]),e("div",E1,[(l(),i(te,null,ue(r,M=>e("button",{key:M.id,class:X(["layout-preset-card",j.value===M.id&&"active"]),onClick:d=>j.value=M.id},[e("span",M1,w(M.label),1),e("span",P1,w(M.hint),1)],10,A1)),64))])])):(l(),i("div",T1,[n[40]||(n[40]=e("label",{class:"form-label"},"Number of Slides",-1)),ce(e("input",{"onUpdate:modelValue":n[4]||(n[4]=M=>K.value=M),class:"input",type:"number",min:"1",max:"20"},null,512),[[Se,K.value,void 0,{number:!0}]]),n[41]||(n[41]=e("p",{class:"form-hint"},"Generates this many slides from one full prompt.",-1))])),C.value==="deck"?(l(),i("div",B1,[e("div",N1,[n[42]||(n[42]=e("label",{class:"form-label"},"Deck Layouts",-1)),e("span",z1,w(D.value==="mixed"?"AI can vary layout by slide":`All slides use ${je.value.label}`),1)]),e("div",L1,[e("button",{class:X(["output-mode-btn",D.value==="mixed"&&"active"]),onClick:n[5]||(n[5]=M=>D.value="mixed")},"Mixed Layouts",2),e("button",{class:X(["output-mode-btn",D.value==="single"&&"active"]),onClick:n[6]||(n[6]=M=>D.value="single")},"Consistent Layout",2)])])):R("",!0),C.value==="deck"&&D.value==="single"?(l(),i("div",j1,[e("div",_1,[n[43]||(n[43]=e("label",{class:"form-label"},"Deck Layout",-1)),e("span",D1,w(je.value.hint),1)]),e("div",q1,[(l(),i(te,null,ue(r,M=>e("button",{key:`deck-${M.id}`,class:X(["layout-preset-card",j.value===M.id&&"active"]),onClick:d=>j.value=M.id},[e("span",O1,w(M.label),1),e("span",F1,w(M.hint),1)],10,R1)),64))])])):R("",!0),e("div",U1,[n[44]||(n[44]=e("label",{class:"form-label"},[ee("Description "),e("span",{class:"optional"},"(optional)")],-1)),ce(e("textarea",{"onUpdate:modelValue":n[7]||(n[7]=M=>be.value=M),class:"textarea",style:{"min-height":"64px",resize:"vertical"},placeholder:"Add context, audience level, specific subtopics, tone, or any extra detail…"},null,512),[[Se,be.value]])]),e("div",V1,[e("div",W1,[n[46]||(n[46]=e("label",{class:"form-label"},"AI Prompt",-1)),we.value?(l(),i("button",{key:0,class:"prompt-reset-btn",onClick:fe,title:"Reset to auto-generated prompt"},[...n[45]||(n[45]=[e("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),e("path",{d:"M3 3v5h5"})],-1),ee(" Reset ",-1)])])):(l(),i("span",G1,"auto"))]),ce(e("textarea",{"onUpdate:modelValue":n[8]||(n[8]=M=>le.value=M),class:"textarea prompt-textarea",placeholder:"Describe exactly what you want the AI to create…",onInput:n[9]||(n[9]=M=>we.value=!0),spellcheck:"false"},null,544),[[Se,le.value]]),n[47]||(n[47]=e("p",{class:"form-hint"},"Edit freely — the AI will follow your exact instructions.",-1))]),C.value==="single"?(l(),i("div",H1,[e("button",{class:X(["output-mode-btn",xe.value==="slide"&&"active"]),onClick:n[10]||(n[10]=M=>xe.value="slide")},"Show on Slide",2),e("button",{class:X(["output-mode-btn",xe.value==="options"&&"active"]),onClick:n[11]||(n[11]=M=>xe.value="options")},"Creative Options",2)])):R("",!0),C.value==="single"&&st.value?(l(),i("div",Y1,[e("div",J1,[n[48]||(n[48]=e("span",{class:"form-label"},"Selected Text Source",-1)),e("span",Q1,w(Te.value.length)+" selected",1)]),e("div",X1,w(st.value),1),e("div",K1,[e("button",{class:"btn btn-secondary btn-sm",disabled:E(N).isGenerating,onClick:Lt}," Transform Selection to "+w(je.value.label),9,Z1)])])):R("",!0),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:E(N).isGenerating||!ae.value.trim()&&!le.value.trim()||C.value==="deck"&&(!K.value||K.value<1||K.value>20),onClick:tt},[E(N).isGenerating?(l(),i("span",tg)):(l(),i("svg",og,[...n[49]||(n[49]=[e("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"},null,-1)])])),ee(" "+w(E(N).isGenerating?"Generating…":C.value==="deck"?oe.value?`Regenerate ${K.value} Slides`:`Generate ${K.value} Slides`:xe.value==="slide"?oe.value?"Regenerate & Apply":"Generate & Apply":"Generate Creative Options"),1)],8,eg),C.value==="single"&&xe.value==="options"&&(ze.value.length||Ie.value)?(l(),i("div",ng,[e("div",lg,[n[50]||(n[50]=e("span",{class:"form-label"},"Creative Options",-1)),e("button",{class:"btn btn-ghost btn-sm",onClick:n[12]||(n[12]=M=>{ze.value=[],Ie.value=""})},"Clear")]),Ie.value?(l(),i("div",ig,[n[51]||(n[51]=e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1)),ee(" "+w(Ie.value),1)])):(l(),i("div",ag,[(l(!0),i(te,null,ue(ze.value,(M,d)=>(l(),i("article",{key:d,class:"creative-option-card"},[e("h4",sg,w(M.title),1),e("p",rg,w(M.angle),1),e("button",{class:"btn btn-secondary btn-sm",onClick:t=>mt(M)},"Use This Option",8,dg)]))),128))]))])):R("",!0)],64)):m.value==="quiz"?(l(),i(te,{key:1},[e("div",ug,[n[52]||(n[52]=e("label",{class:"form-label"},[ee("Quiz Topic "),e("span",{class:"required"},"*")],-1)),ce(e("input",{"onUpdate:modelValue":n[13]||(n[13]=M=>se.value=M),class:"input",placeholder:"e.g. World War II Timeline, Photosynthesis, SQL Joins…",onKeydown:pl(bt,["enter"])},null,544),[[Se,se.value]])]),e("div",cg,[e("div",pg,[n[54]||(n[54]=e("label",{class:"form-label"},"Questions",-1)),ce(e("select",{"onUpdate:modelValue":n[14]||(n[14]=M=>ke.value=M),class:"select"},[...n[53]||(n[53]=[e("option",{value:2},"2",-1),e("option",{value:3},"3",-1),e("option",{value:4},"4",-1),e("option",{value:5},"5",-1),e("option",{value:6},"6",-1),e("option",{value:8},"8",-1),e("option",{value:10},"10",-1)])],512),[[Tt,ke.value,void 0,{number:!0}]])]),e("div",vg,[n[56]||(n[56]=e("label",{class:"form-label"},"Difficulty",-1)),ce(e("select",{"onUpdate:modelValue":n[15]||(n[15]=M=>ge.value=M),class:"select"},[...n[55]||(n[55]=[e("option",{value:"beginner"},"Beginner",-1),e("option",{value:"intermediate"},"Intermediate",-1),e("option",{value:"advanced"},"Advanced",-1)])],512),[[Tt,ge.value]])])]),e("div",fg,[n[57]||(n[57]=e("label",{class:"form-label"},"Question Type",-1)),e("div",gg,[(l(),i(te,null,ue([{id:"multiple-choice",label:"Multiple Choice",icon:"☑"},{id:"true-false",label:"True / False",icon:"✓✗"},{id:"mixed",label:"Mixed",icon:"⊕"}],M=>e("button",{key:M.id,class:X(["qtype-btn",Pe.value===M.id&&"active"]),onClick:d=>Pe.value=M.id},[e("span",bg,w(M.icon),1),e("span",null,w(M.label),1)],10,mg)),64))])]),e("div",yg,[n[58]||(n[58]=e("label",{class:"form-label"},[ee("Learning Objective "),e("span",{class:"optional"},"(optional)")],-1)),ce(e("input",{"onUpdate:modelValue":n[16]||(n[16]=M=>re.value=M),class:"input",placeholder:"e.g. Identify key causes of WWI"},null,512),[[Se,re.value]])]),e("div",hg,[e("div",xg,[n[60]||(n[60]=e("label",{class:"form-label"},"AI Prompt",-1)),q.value?(l(),i("button",{key:0,class:"prompt-reset-btn",onClick:_e,title:"Reset to auto-generated prompt"},[...n[59]||(n[59]=[e("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),e("path",{d:"M3 3v5h5"})],-1),ee(" Reset ",-1)])])):(l(),i("span",kg,"auto"))]),ce(e("textarea",{"onUpdate:modelValue":n[17]||(n[17]=M=>$.value=M),class:"textarea prompt-textarea",placeholder:"Describe what quiz questions you want the AI to create…",onInput:n[18]||(n[18]=M=>q.value=!0),spellcheck:"false"},null,544),[[Se,$.value]]),n[61]||(n[61]=e("p",{class:"form-hint"},"Edit this prompt freely. The AI will follow your exact instructions.",-1))]),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:E(N).isGenerating||!se.value.trim()&&!$.value.trim(),onClick:n[19]||(n[19]=M=>bt(!1))},[E(N).isGenerating?(l(),i("span",Cg)):(l(),i("svg",Sg,[...n[62]||(n[62]=[e("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"},null,-1)])])),ee(" "+w(E(N).isGenerating?"Generating…":`Generate ${ke.value} Questions`),1)],8,wg),I.value.length?(l(),i("div",$g,[e("div",Ig,[e("span",Eg,w(I.value.length)+" Questions",1),e("div",Ag,[e("button",{class:"btn btn-ghost btn-sm",onClick:n[20]||(n[20]=M=>Mt(!0))},"All"),e("button",{class:"btn btn-ghost btn-sm",onClick:n[21]||(n[21]=M=>Mt(!1))},"None"),e("button",{class:"btn btn-ghost btn-sm danger",onClick:n[22]||(n[22]=M=>I.value=[])},"Clear")])]),e("div",Mg,[e("button",{class:"btn btn-secondary regen-btn",disabled:E(N).isGenerating,onClick:n[23]||(n[23]=M=>bt(!1)),title:"Replace all questions with a new set"},[E(N).isGenerating?(l(),i("span",Tg)):(l(),i("svg",Bg,[...n[63]||(n[63]=[e("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"},null,-1),e("path",{d:"M3 3v5h5"},null,-1)])])),n[64]||(n[64]=ee(" Regenerate ",-1))],8,Pg),e("button",{class:"btn btn-ghost regen-btn",disabled:E(N).isGenerating,onClick:n[24]||(n[24]=M=>bt(!0)),title:"Generate more and append to current list"},[...n[65]||(n[65]=[e("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e("line",{x1:"5",y1:"12",x2:"19",y2:"12"})],-1),ee(" Add More ",-1)])],8,Ng)]),(l(!0),i(te,null,ue(I.value,(M,d)=>(l(),i("div",{key:d,class:X(["quiz-card",{deselected:!M._selected}])},[e("div",zg,[e("label",Lg,[ce(e("input",{type:"checkbox","onUpdate:modelValue":t=>M._selected=t},null,8,jg),[[Nt,M._selected]]),e("span",_g,"Q"+w(d+1),1)]),e("div",Dg,[e("span",{class:X(["badge difficulty-badge",M.difficulty])},w(M.difficulty),3),e("span",qg,w(M.type==="true-false"?"T/F":"MCQ"),1)])]),e("p",Rg,w(M.question),1),e("div",Og,[(l(!0),i(te,null,ue(M.options,(t,_)=>(l(),i("div",{key:_,class:X(["q-option",_===M.correctIndex&&"correct"])},[e("span",Fg,w(["A","B","C","D"][_]),1),e("span",null,w(t),1),_===M.correctIndex?(l(),i("svg",Ug,[...n[66]||(n[66]=[e("polyline",{points:"20 6 9 17 4 12"},null,-1)])])):R("",!0)],2))),128))]),M.explanation?(l(),i("div",Vg,[n[67]||(n[67]=e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})],-1)),ee(" "+w(M.explanation),1)])):R("",!0)],2))),128)),e("button",{class:"btn btn-primary w-full",disabled:!I.value.filter(M=>M._selected).length,onClick:jt},[n[68]||(n[68]=e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M12 5v14M5 12l7 7 7-7"})],-1)),ee(" Add "+w(I.value.filter(M=>M._selected).length)+" Selected as Quiz Slides ",1)],8,Wg)])):R("",!0)],64)):m.value==="voiceover"?(l(),i(te,{key:2},[e("div",Gg,[n[69]||(n[69]=e("label",{class:"form-label"},"Slide Content / Key Points",-1)),ce(e("textarea",{"onUpdate:modelValue":n[25]||(n[25]=M=>pe.value=M),class:"textarea",style:{"min-height":"100px"},placeholder:"Paste the slide content or talking points here…"},null,512),[[Se,pe.value]])]),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:E(N).isGenerating,onClick:_t},[E(N).isGenerating?(l(),i("span",Yg)):R("",!0),ee(" "+w(E(N).isGenerating?"Generating…":"Generate Script"),1)],8,Hg)],64)):m.value==="improve"?(l(),i(te,{key:3},[(S=(v=Ce.value)==null?void 0:v.content)!=null&&S.text?(l(),i("div",Jg,[n[70]||(n[70]=e("div",{class:"form-label",style:{"margin-bottom":"var(--space-1)"}},"Selected Text",-1)),e("div",Qg,w(Ce.value.content.text.slice(0,120))+w(Ce.value.content.text.length>120?"…":""),1)])):(l(),i("p",Xg,"Select a text element on the canvas to improve it.")),e("div",Kg,[n[71]||(n[71]=e("label",{class:"form-label"},"Instruction",-1)),ce(e("input",{"onUpdate:modelValue":n[26]||(n[26]=M=>F.value=M),class:"input",placeholder:"Make it more concise and engaging"},null,512),[[Se,F.value]])]),n[72]||(n[72]=e("div",{class:"tab-section-title",style:{"margin-bottom":"var(--space-3)"}},"Or send a custom prompt:",-1)),ce(e("textarea",{"onUpdate:modelValue":n[27]||(n[27]=M=>F.value=M),class:"textarea",style:{"min-height":"70px"},placeholder:"Write anything…"},null,512),[[Se,F.value]]),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:E(N).isGenerating||!Ce.value&&!F.value,onClick:n[28]||(n[28]=M=>Ce.value?Ft():Ut())},[E(N).isGenerating?(l(),i("span",em)):R("",!0),ee(" "+w(E(N).isGenerating?"Processing…":"Generate"),1)],8,Zg)],64)):m.value==="translate"?(l(),i(te,{key:4},[(J=(b=Ce.value)==null?void 0:b.content)!=null&&J.text?(l(),i("div",tm,[n[73]||(n[73]=e("div",{class:"form-label",style:{"margin-bottom":"var(--space-1)"}},"Selected Text",-1)),e("div",om,w(Ce.value.content.text.slice(0,120))+w(Ce.value.content.text.length>120?"…":""),1)])):(l(),i("p",nm,"Select a text element on the canvas to translate it.")),e("div",lm,[n[75]||(n[75]=e("label",{class:"form-label"},"Target Language",-1)),ce(e("select",{"onUpdate:modelValue":n[29]||(n[29]=M=>U.value=M),class:"select"},[...n[74]||(n[74]=[et('<option value="Spanish" data-v-3ccdb1b2>Spanish</option><option value="French" data-v-3ccdb1b2>French</option><option value="German" data-v-3ccdb1b2>German</option><option value="Italian" data-v-3ccdb1b2>Italian</option><option value="Portuguese" data-v-3ccdb1b2>Portuguese</option><option value="Chinese (Simplified)" data-v-3ccdb1b2>Chinese (Simplified)</option><option value="Japanese" data-v-3ccdb1b2>Japanese</option><option value="Arabic" data-v-3ccdb1b2>Arabic</option>',8)])],512),[[Tt,U.value]])]),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:E(N).isGenerating||!((Ye=(ye=Ce.value)==null?void 0:ye.content)!=null&&Ye.text),onClick:Ot},[E(N).isGenerating?(l(),i("span",am)):R("",!0),ee(" "+w(E(N).isGenerating?"Translating…":"Translate Text"),1)],8,im),oe.value?(l(),i("div",sm,[e("div",rm,[n[76]||(n[76]=e("span",{class:"form-label"},"Translation Result",-1)),e("div",dm,[e("button",{class:"btn btn-ghost btn-sm",onClick:n[30]||(n[30]=M=>s.navigator.clipboard.writeText(oe.value))},"Copy"),e("button",{class:"btn btn-primary btn-sm",onClick:xt,disabled:!Ce.value},"Apply",8,um)])]),e("div",cm,w(oe.value),1)])):R("",!0)],64)):m.value==="image"?(l(),i(te,{key:5},[n[81]||(n[81]=e("p",{class:"ai-hint",style:{"margin-bottom":"var(--space-3)"}},"Generate distinct educational visual assets instantly. The image will be added directly to your slide.",-1)),E(N).apiProvider==="gemini"?(l(),i("div",pm,[...n[77]||(n[77]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1),ee(" Gemini text features work on the free tier, but Gemini image generation on the Developer API usually needs billing enabled for the project. ",-1)])])):R("",!0),E(N).apiKey?R("",!0):(l(),i("div",vm,[n[78]||(n[78]=e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1)),ee(" AI image generation needs a "+w(T.value)+" API key in API settings. ",1)])),e("div",fm,[n[79]||(n[79]=e("label",{class:"form-label"},"Image Description",-1)),ce(e("textarea",{"onUpdate:modelValue":n[31]||(n[31]=M=>Ge.value=M),class:"textarea",style:{"min-height":"100px"},placeholder:"Describe the image (e.g. 'A futuristic city skyline at sunset in a vibrant retro style')"},null,512),[[Se,Ge.value]])]),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:nt.value||E(N).isGenerating||!Ge.value||!E(N).apiKey,onClick:qt},[nt.value||E(N).isGenerating?(l(),i("span",mm)):R("",!0),ee(" "+w(nt.value||E(N).isGenerating?"Generating Image…":"Generate & Insert"),1)],8,gm),oe.value?(l(),i("div",bm,[n[80]||(n[80]=e("div",{class:"result-header"},[e("span",{class:"form-label"},"Status")],-1)),e("div",ym,w(oe.value),1)])):R("",!0)],64)):m.value==="settings"?(l(),i("div",hm,[e("div",xm,[n[83]||(n[83]=e("label",{class:"form-label"},"AI Provider",-1)),e("select",{value:E(N).apiProvider,class:"select",onChange:n[32]||(n[32]=M=>E(N).setProvider(M.target.value))},[...n[82]||(n[82]=[e("option",{value:"openai"},"OpenAI (GPT-4o mini)",-1),e("option",{value:"gemini"},"Google Gemini (Free tier for text)",-1)])],40,km)]),e("div",wm,[n[84]||(n[84]=e("label",{class:"form-label"},"API Key",-1)),e("input",{type:"password",value:E(N).apiKey,class:"input",placeholder:L.value,onChange:n[33]||(n[33]=M=>E(N).setApiKey(M.target.value))},null,40,Cm),e("p",Sm,w(Y.value),1)]),E(N).apiProvider==="gemini"?(l(),i("div",$m,[...n[85]||(n[85]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1),ee(" Gemini is enabled for content, quiz, voiceover, improve, and translate in this app. Gemini image generation may still require billing on the Google project. ",-1)])])):R("",!0),E(N).apiKey?R("",!0):(l(),i("div",Im,[n[86]||(n[86]=e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1)),n[87]||(n[87]=ee(" Running in ",-1)),n[88]||(n[88]=e("strong",null,"demo mode",-1)),ee(" — sample responses only. Add your "+w(T.value)+" API key to use real AI generation. ",1)]))])):R("",!0),oe.value&&m.value!=="settings"&&m.value!=="quiz"?(l(),i("div",Em,[e("div",Am,[n[89]||(n[89]=e("span",{class:"form-label"},"Result",-1)),e("button",{class:"btn btn-ghost btn-sm",onClick:n[34]||(n[34]=M=>oe.value="")},"Clear")]),e("pre",Mm,w(oe.value),1),e("div",Pm,[m.value==="generate"?(l(),i("button",{key:0,class:"btn btn-primary btn-sm",onClick:gt},w(C.value==="deck"?"Apply as Deck":"Apply to Slide"),1)):R("",!0),m.value==="generate"?(l(),i("button",{key:1,class:"btn btn-ghost btn-sm",disabled:E(N).isGenerating,onClick:tt},[...n[90]||(n[90]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),e("path",{d:"M3 3v5h5"})],-1),ee(" Regenerate ",-1)])],8,Tm)):R("",!0),m.value==="improve"&&Ce.value?(l(),i("button",{key:2,class:"btn btn-primary btn-sm",onClick:Rt}," Apply to Element ")):R("",!0),e("button",{class:"btn btn-secondary btn-sm",onClick:n[35]||(n[35]=M=>{var d;return(d=s.navigator.clipboard)==null?void 0:d.writeText(oe.value)})}," Copy ")])])):R("",!0),E(N).lastError?(l(),i("div",Bm,[n[91]||(n[91]=e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1)),ee(" "+w(E(N).lastError),1)])):R("",!0)])])}}},zm=Xe(Nm,[["__scopeId","data-v-3ccdb1b2"]]),Lm={class:"theme-manager"},jm={class:"panel-section"},_m={class:"presets-grid"},Dm=["title","onClick"],qm={class:"preset-preview"},Rm={class:"preset-name"},Om={class:"panel-section"},Fm={class:"theme-fields"},Um={class:"form-label"},Vm={class:"color-row"},Wm=["value","onInput"],Gm=["value","onChange"],Hm={class:"panel-section"},Ym={class:"theme-field"},Jm=["value","placeholder"],Qm={class:"chart-palette-preview"},Xm={class:"panel-section"},Km={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Zm=["value"],eb=["value"],tb={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},ob=["value"],nb=["value"],lb={class:"form-group"},ib=["value"],ab={class:"panel-section"},sb={class:"tp-chart-row"},rb={key:0,class:"apply-message success"},db={key:1,class:"apply-message error"},ub={__name:"ThemeManager",setup(A){const r=it(),u=at(),c=P(()=>u.getProject(r.projectId)),p=P(()=>{var a;return((a=c.value)==null?void 0:a.theme)||{}}),h=P(()=>vl(p.value)),k=z(""),f=z("");function H(a){u.updateProject(r.projectId,{theme:{...p.value,...a}})}const ie=[{name:"Corporate Blue",primaryColor:"#1e40af",secondaryColor:"#0ea5e9",bgColor:"#f8fafc",textColor:"#0f172a",fontFamily:"Inter, sans-serif"},{name:"Vibrant Purple",primaryColor:"#6c47ff",secondaryColor:"#00c9a7",bgColor:"#ffffff",textColor:"#1a1a2e",fontFamily:"Inter, sans-serif"},{name:"Nature Green",primaryColor:"#16a34a",secondaryColor:"#84cc16",bgColor:"#f0fdf4",textColor:"#14532d",fontFamily:"Georgia, serif"},{name:"Dark Modern",primaryColor:"#818cf8",secondaryColor:"#f472b6",bgColor:"#0f172a",textColor:"#e2e8f0",fontFamily:"Inter, sans-serif"},{name:"Warm Sunset",primaryColor:"#dc2626",secondaryColor:"#f59e0b",bgColor:"#fffbeb",textColor:"#451a03",fontFamily:"Verdana, sans-serif"},{name:"Ocean Breeze",primaryColor:"#0891b2",secondaryColor:"#6366f1",bgColor:"#ecfeff",textColor:"#164e63",fontFamily:"Trebuchet MS, sans-serif"}],G=[{label:"Inter",value:"Inter, sans-serif"},{label:"Arial",value:"Arial, sans-serif"},{label:"Georgia",value:"Georgia, serif"},{label:"Verdana",value:"Verdana, sans-serif"},{label:"Times New Roman",value:'"Times New Roman", serif'},{label:"Courier New",value:'"Courier New", monospace'},{label:"Trebuchet MS",value:'"Trebuchet MS", sans-serif'},{label:"Tahoma",value:"Tahoma, sans-serif"}];function V(a){H(a)}function me(a,T){const L=a.content||{};return a.type==="text"?{content:{...L,fontFamily:T.fontFamily||L.fontFamily,color:T.textColor||L.color}}:a.type==="heading"?{content:{...L,fontFamily:T.headingFont||T.fontFamily||L.fontFamily,color:T.textColor||L.color}}:a.type==="shape"?{content:{...L,fillColor:T.secondaryColor||L.fillColor}}:a.type==="hotspot"?{content:{...L,bgColor:T.primaryColor||L.bgColor}}:a.type==="button"?{content:{...L,bgColor:T.primaryColor||L.bgColor,textColor:"#ffffff",borderColor:"transparent",fontFamily:T.fontFamily||L.fontFamily}}:a.type==="quiz"?{content:{...L,cardBgColor:T.bgColor||L.cardBgColor,questionColor:T.textColor||L.questionColor,accentColor:T.primaryColor||L.accentColor}}:a.type==="chart"?{content:{...L,...kl(T)}}:null}function N(){H({chartPalette:""})}function B(){k.value="",f.value="";const a=r.projectId,T=c.value,L=p.value;if(!a||!T){f.value="No active project to apply theme.";return}const Y=T.slides||[];let m=0;Y.forEach(F=>{(F.backgroundType||"color")==="color"&&u.updateSlide(a,F.id,{backgroundType:"color",background:L.bgColor||F.background||"#ffffff"}),(F.elements||[]).forEach(ae=>{const oe=me(ae,L);oe&&(u.updateElement(a,F.id,ae.id,oe),m+=1)})}),k.value=`Applied theme to ${Y.length} slide${Y.length===1?"":"s"} and ${m} element${m===1?"":"s"}.`}return(a,T)=>(l(),i("div",Lm,[e("div",jm,[T[4]||(T[4]=e("div",{class:"panel-title"},"Preset Themes",-1)),e("div",_m,[(l(),i(te,null,ue(ie,L=>e("div",{key:L.name,class:"preset-card",title:L.name,onClick:Y=>V(L)},[e("div",qm,[e("div",{class:"pp-header",style:he({background:L.primaryColor})},null,4),e("div",{class:"pp-body",style:he({background:L.bgColor})},[e("div",{class:"pp-line",style:he({background:L.textColor,opacity:.7})},null,4),e("div",{class:"pp-line",style:he({background:L.textColor,opacity:.4,width:"60%"})},null,4)],4),e("div",{class:"pp-accent",style:he({background:L.secondaryColor})},null,4)]),e("span",Rm,w(L.name),1)],8,Dm)),64))])]),e("div",Om,[T[5]||(T[5]=e("div",{class:"panel-title"},"Colors",-1)),e("div",Fm,[(l(),i(te,null,ue({primaryColor:"Primary Color",secondaryColor:"Secondary Color",bgColor:"Background",textColor:"Text Color"},(L,Y)=>e("div",{class:"theme-field",key:Y},[e("label",Um,w(L),1),e("div",Vm,[e("input",{type:"color",value:p.value[Y]||"#ffffff",class:"color-input-native",onInput:m=>H({[Y]:m.target.value})},null,40,Wm),e("input",{value:p.value[Y]||"",class:"input",onChange:m=>H({[Y]:m.target.value}),style:{"font-family":"var(--font-mono)","font-size":"var(--text-xs)"}},null,40,Gm)])])),64))])]),e("div",Hm,[T[8]||(T[8]=e("div",{class:"panel-title"},"Chart Palette",-1)),e("div",Ym,[T[6]||(T[6]=e("label",{class:"form-label"},"Chart Colors",-1)),e("input",{value:p.value.chartPalette||"",class:"input",placeholder:E(Fl)(E(vl)(p.value)),onChange:T[0]||(T[0]=L=>H({chartPalette:L.target.value}))},null,40,Jm),e("div",Qm,[(l(!0),i(te,null,ue(h.value,(L,Y)=>(l(),i("span",{key:`theme-chart-${Y}`,class:"chart-palette-dot",style:he({background:L})},null,4))),128))]),e("div",{class:"chart-palette-actions"},[e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:N},"Use auto palette")]),T[7]||(T[7]=e("div",{class:"field-hint"},"Leave blank to derive chart colors from the theme primary, secondary, background, and text colors.",-1))])]),e("div",Xm,[T[12]||(T[12]=e("div",{class:"panel-title"},"Typography",-1)),e("div",Km,[T[9]||(T[9]=e("label",{class:"form-label"},"Heading Font",-1)),e("select",{value:p.value.headingFont||"Inter, sans-serif",class:"select",onChange:T[1]||(T[1]=L=>H({headingFont:L.target.value}))},[(l(),i(te,null,ue(G,L=>e("option",{key:L.value,value:L.value},w(L.label),9,eb)),64))],40,Zm)]),e("div",tb,[T[10]||(T[10]=e("label",{class:"form-label"},"Body Font",-1)),e("select",{value:p.value.fontFamily||"Inter, sans-serif",class:"select",onChange:T[2]||(T[2]=L=>H({fontFamily:L.target.value}))},[(l(),i(te,null,ue(G,L=>e("option",{key:L.value,value:L.value},w(L.label),9,nb)),64))],40,ob)]),e("div",lb,[T[11]||(T[11]=e("label",{class:"form-label"},"Base Font Size",-1)),e("input",{type:"number",min:"12",max:"24",value:p.value.fontSize||16,class:"input",onChange:T[3]||(T[3]=L=>H({fontSize:+L.target.value}))},null,40,ib)])]),e("div",ab,[T[13]||(T[13]=e("div",{class:"panel-title"},"Preview",-1)),e("div",{class:"theme-preview",style:he({background:p.value.bgColor||"#fff",fontFamily:p.value.fontFamily||"Inter, sans-serif"})},[e("div",{class:"tp-heading",style:he({color:p.value.textColor,fontFamily:p.value.headingFont||p.value.fontFamily})}," Heading Text ",4),e("div",{class:"tp-body",style:he({color:p.value.textColor,opacity:.7})}," Body text looks like this. Clear, readable, and well-spaced for learners. ",4),e("div",{class:"tp-btn",style:he({background:p.value.primaryColor})},"Button",4),e("div",{class:"tp-badge",style:he({background:p.value.secondaryColor})},"Badge",4),e("div",sb,[(l(!0),i(te,null,ue(h.value.slice(0,5),(L,Y)=>(l(),i("span",{key:`preview-chart-${Y}`,class:"tp-chart-bar",style:he({background:L,height:`${22+Y*8}px`})},null,4))),128))])],4),e("button",{class:"btn btn-primary w-full apply-theme-btn",onClick:B}," Apply Theme to Slides "),k.value?(l(),i("p",rb,w(k.value),1)):R("",!0),f.value?(l(),i("p",db,w(f.value),1)):R("",!0)])]))}},cb=Xe(ub,[["__scopeId","data-v-da2b0ce4"]]),pb={key:0,class:"auth-gate",style:{"text-align":"center",padding:"40px 20px"}},vb={width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{opacity:"0.5","margin-bottom":"16px","margin-inline":"auto"}},fb={style:{display:"flex","flex-direction":"column",gap:"12px","max-width":"300px",margin:"0 auto"}},gb={class:"export-tabs tabs",style:{"overflow-x":"auto"}},mb={class:"export-content"},bb={class:"export-options",style:{"margin-bottom":"20px"}},yb={class:"form-group"},hb={class:"export-meta"},xb={class:"meta-item"},kb={class:"meta-item"},wb={class:"meta-item"},Cb={class:"export-options",style:{"margin-bottom":"20px"}},Sb={class:"form-group"},$b={style:{display:"flex","align-items":"center",gap:"8px","margin-top":"12px","font-size":"13px",cursor:"pointer"}},Ib={class:"export-options",style:{"margin-bottom":"20px"}},Eb={class:"form-group"},Ab={style:{display:"flex","align-items":"center",gap:"8px","margin-top":"12px","font-size":"13px",cursor:"pointer"}},Mb={class:"coming-soon"},Pb={width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{opacity:".4"}},Tb={key:0,class:"export-success",style:{background:"#e0f2fe",color:"#166534","border-color":"#bbf7d0"}},Bb={key:1,class:"export-success"},Nb={__name:"ExportModal",setup(A){const r=it(),u=at(),c=wl(),p=P(()=>u.getProject(r.projectId)),h=z("json"),k=z(""),f=z(""),H=z(!0);Qe(p,Y=>{Y&&!f.value&&(f.value=Y.name||"presentation")},{immediate:!0});function ie(){const Y=u.exportProject(r.projectId);if(!Y)return;const m=new Blob([Y],{type:"application/json"}),F=URL.createObjectURL(m),ae=document.createElement("a");ae.href=F,ae.download=`${f.value||"project"}.mediasurf.json`,ae.click(),URL.revokeObjectURL(F),k.value="success",setTimeout(()=>k.value="",3e3)}function G(Y,m="presentation"){return String(Y).trim().replace(/[\\/:*?"<>|]/g,"").replace(/\s+/g," ").trim()||m}function V(Y){return new Promise((m,F)=>{const ae=new FileReader;ae.onloadend=()=>m(ae.result),ae.onerror=()=>F(ae.error),ae.readAsDataURL(Y)})}function me(Y,m,F="html"){const ae=zt(m);return`
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; }
:root {
  --lf-slide-width: ${ae.width}px;
  --lf-slide-height: ${ae.height}px;
}
body {
  min-height: 100vh;
  font-family: ${(Y==null?void 0:Y.fontFamily)||"Inter, sans-serif"};
  background: ${F==="pdf"?"#f3f4f6":`
    radial-gradient(circle at 18% 18%, rgba(108, 71, 255, 0.24), transparent 22%),
    radial-gradient(circle at 82% 72%, rgba(0, 201, 167, 0.18), transparent 28%),
    linear-gradient(180deg, #08101f 0%, #050916 62%, #02050b 100%)`};
  color: ${F==="pdf"?"#111827":"#ffffff"};
  display: ${F==="pdf"?"block":"flex"};
  align-items: ${F==="pdf"?"stretch":"center"};
  justify-content: ${F==="pdf"?"flex-start":"center"};
  overflow: ${F==="pdf"?"auto":"hidden"};
  padding: ${F==="pdf"?"24px 0":"0"};
}
.lf-shell {
  width: ${F==="pdf"?"100%":"100vw"};
  min-height: ${F==="pdf"?"auto":"100vh"};
  height: ${F==="pdf"?"auto":"100vh"};
  position: relative;
  display: flex;
  align-items: ${F==="pdf"?"stretch":"center"};
  justify-content: center;
  overflow: ${F==="pdf"?"visible":"hidden"};
}
.lf-shell::before,
.lf-shell::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  filter: blur(24px);
  pointer-events: none;
}
.lf-shell::before {
  width: 420px;
  height: 420px;
  top: -120px;
  left: -80px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.18), transparent 72%);
}
.lf-shell::after {
  width: 520px;
  height: 520px;
  right: -160px;
  bottom: -200px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.22), transparent 72%);
}
.lf-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at center, rgba(0,0,0,0.65), transparent 88%);
  pointer-events: none;
}
.lf-stage-shell {
  position: relative;
  z-index: 1;
  width: ${F==="pdf"?"100%":"auto"};
  max-width: ${F==="pdf"?"none":"auto"};
  padding: ${F==="pdf"?"0":"18px"};
  border-radius: ${F==="pdf"?"0":"32px"};
  background: ${F==="pdf"?"transparent":"linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))"};
  border: ${F==="pdf"?"none":"1px solid rgba(255,255,255,0.12)"};
  box-shadow: ${F==="pdf"?"none":"0 30px 80px rgba(0,0,0,.34)"};
}
.lf-stage-shell::before {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.08);
  pointer-events: none;
}
.presentation {
  position: relative;
  width: ${F==="pdf"?"100%":"var(--lf-slide-width)"};
  height: ${F==="pdf"?"auto":"var(--lf-slide-height)"};
  border-radius: ${F==="pdf"?"0":"18px"};
  overflow: ${F==="pdf"?"visible":"hidden"};
  box-shadow: ${F==="pdf"?"none":"0 30px 90px rgba(0,0,0,.5)"};
  transform-origin: center center;
  display: ${F==="pdf"?"flex":"block"};
  flex-direction: ${F==="pdf"?"column":"row"};
  align-items: ${F==="pdf"?"center":"stretch"};
  gap: ${F==="pdf"?"24px":"0"};
}
.slide {
  position: ${F==="pdf"?"relative":"absolute"};
  inset: ${F==="pdf"?"auto":"0"};
  display: ${F==="pdf"?"block":"none"};
  overflow: hidden;
  color: ${(Y==null?void 0:Y.textColor)||"#1a1a2e"};
  width: var(--lf-slide-width);
  height: var(--lf-slide-height);
  flex: 0 0 auto;
  background-clip: padding-box;
  box-shadow: ${F==="pdf"?"0 12px 32px rgba(15, 23, 42, 0.16)":"none"};
  page-break-after: ${F==="pdf"?"always":"auto"};
  break-after: ${F==="pdf"?"page":"auto"};
}
.slide.active { display: block; }
.slide:last-child {
  page-break-after: auto;
  break-after: auto;
}
.lf-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: rgba(255,255,255,.72);
  font-size: 16px;
  background: rgba(255,255,255,.06);
}
.lf-el {
  position: absolute;
  box-sizing: border-box;
}
.lf-el-content {
  width: 100%;
  height: 100%;
}
.lf-text {
  width: 100%;
  height: 100%;
  padding: 4px;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-break: break-word;
  white-space: pre-wrap;
}
.lf-image,
.lf-video,
.lf-video iframe,
.lf-video video {
  width: 100%;
  height: 100%;
}
.lf-video {
  background: #000;
  border-radius: 10px;
  overflow: hidden;
}
.lf-button-wrap,
.lf-chart-wrap,
.lf-divider-wrap,
.lf-audio-wrap {
  width: 100%;
  height: 100%;
}
.lf-chart-wrap {
  border-radius: 16px;
  overflow: hidden;
}
.lf-chart {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 12px 10px;
  border-radius: 16px;
}
.lf-chart-title {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
}
.lf-chart-svg {
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: visible;
}
.lf-chart-axis,
.lf-chart-value,
.lf-chart-center-label,
.lf-chart-center-value {
  font-family: inherit;
}
.lf-chart-axis {
  font-size: 10px;
  opacity: .78;
}
.lf-chart-value {
  font-size: 10px;
  font-weight: 700;
}
.lf-chart-center-value {
  font-size: 18px;
  font-weight: 800;
}
.lf-chart-center-label {
  font-size: 10px;
  opacity: .72;
  text-transform: uppercase;
  letter-spacing: .08em;
}
.lf-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-top: 8px;
}
.lf-chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  font-size: 10px;
}
.lf-chart-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.lf-chart-legend-label {
  max-width: 9ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: .82;
}
.lf-chart-legend-value {
  font-weight: 700;
}
.lf-button {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 16px;
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
}
.lf-button:hover { transform: translateY(-1px); }
.lf-button:focus-visible,
.lf-hotspot-btn:focus-visible,
.nav-btn:focus-visible,
.dot:focus-visible,
.lf-quiz-submit:focus-visible,
.lf-quiz-reset:focus-visible,
.lf-quiz-option:focus-visible {
  outline: 2px solid rgba(255,255,255,.9);
  outline-offset: 2px;
}
.lf-hotspot-btn {
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(15, 23, 42, .26);
}
.lf-hotspot-popup {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 12px);
  transform: translateX(-50%) translateY(6px);
  min-width: 220px;
  max-width: 300px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, .08);
  box-shadow: 0 24px 48px rgba(15, 23, 42, .22);
  opacity: 0;
  visibility: hidden;
  transition: opacity .16s ease, transform .16s ease, visibility .16s ease;
  z-index: 20;
  overflow: hidden;
}
.lf-hotspot-popup.is-open {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
.lf-hotspot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(15, 23, 42, .08);
}
.lf-hotspot-title {
  font-size: 14px;
  font-weight: 700;
}
.lf-hotspot-close {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}
.lf-hotspot-body {
  padding: 12px 14px 14px;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
}
.lf-audio-card {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
}
.lf-audio-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}
.lf-audio-label {
  min-width: 0;
  flex: 0 0 auto;
  max-width: 180px;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lf-audio-player {
  flex: 1;
  min-width: 120px;
}
.lf-divider {
  width: 100%;
  height: 100%;
  margin: 0;
  border: none;
}
.lf-tabs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.lf-tabs-header {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
}
.lf-tab-btn {
  flex: 1;
  padding: 10px 12px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  background: transparent;
  border-top: none;border-left: none;border-right: none;
  font-family: inherit;
}
.lf-tab-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.lf-accordion {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
}
.lf-accordion-item {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}
.lf-accordion-header {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}
.lf-accordion-content {
  padding: 0 16px 16px 16px;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.lf-flipcard {
  width: 100%;
  height: 100%;
  perspective: 1000px;
  cursor: pointer;
}
.lf-flipcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.lf-flipcard-front, .lf-flipcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 12px;
}
.lf-stepper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}
.lf-stepper-header {
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.lf-step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.lf-step-line {
  width: 32px;
  height: 2px;
  transition: all 0.3s;
}
.lf-stepper-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.lf-stepper-footer {
  padding: 12px 24px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.lf-stepper-btn {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  border: 1px solid #e2e8f0;
}
.lf-stepper-btn[disabled] { opacity: 0.5; }

.lf-quiz {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid rgba(15, 23, 42, .08);
  border-radius: 14px;
  overflow: auto;
  box-shadow: 0 14px 34px rgba(15, 23, 42, .08);
}
.lf-quiz-question {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
}
.lf-quiz-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.lf-quiz-option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1.5px solid #dbe3ef;
  background: rgba(255,255,255,.92);
  text-align: left;
  cursor: pointer;
  transition: border-color .16s ease, background .16s ease, transform .16s ease;
}
.lf-quiz-option:hover:not([disabled]) {
  transform: translateY(-1px);
}
.lf-quiz-option.selected {
  background: rgba(108, 71, 255, .12);
}
.lf-quiz-option.correct {
  border-color: #16a34a;
  background: rgba(22, 163, 74, .10);
  color: #14532d;
}
.lf-quiz-option.wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, .10);
  color: #991b1b;
}
.lf-quiz-option[disabled] {
  cursor: default;
}
.lf-quiz-letter {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: rgba(15, 23, 42, .08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex: 0 0 auto;
}
.lf-quiz-text {
  flex: 1;
}
.lf-quiz-actions {
  display: flex;
  gap: 10px;
  margin-top: 2px;
}
.lf-quiz-submit,
.lf-quiz-reset {
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.lf-quiz-submit[disabled] {
  opacity: .45;
  cursor: not-allowed;
}
.lf-quiz-feedback {
  display: none;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.5;
}
.lf-quiz-feedback.show { display: block; }
.lf-quiz-feedback.correct {
  background: rgba(22, 163, 74, .12);
  color: #166534;
}
.lf-quiz-feedback.wrong {
  background: rgba(239, 68, 68, .12);
  color: #991b1b;
}
.nav {
  position: fixed;
  left: 50%;
  bottom: 22px;
  transform: translateX(-50%);
  display: ${(m==null?void 0:m.showNavControls)===!1?"none":"flex"};
  align-items: center;
  gap: 12px;
  z-index: 5;
}
.nav-btn {
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.1);
  color: #fff;
  min-width: 92px;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  backdrop-filter: blur(10px);
  transition: background .18s ease, opacity .18s ease, transform .18s ease;
}
.nav-btn:hover:not(:disabled) {
  background: rgba(255,255,255,.18);
  transform: translateY(-1px);
}
.nav-btn:disabled {
  opacity: .3;
  cursor: default;
}
.nav-counter {
  min-width: 74px;
  text-align: center;
  color: rgba(255,255,255,.76);
  font-size: 13px;
}
.dot-nav {
  position: fixed;
  left: 50%;
  bottom: 74px;
  transform: translateX(-50%);
  display: ${(m==null?void 0:m.showNavControls)===!1?"none":"flex"};
  align-items: center;
  gap: 8px;
  z-index: 5;
}
.dot {
  width: 10px;
  height: 8px;
  border-radius: 999px;
  border: none;
  padding: 0;
  background: rgba(255,255,255,.28);
  cursor: pointer;
  transition: width .18s ease, background .18s ease;
}
.dot.active {
  width: 30px;
  background: #ffffff;
}
.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: ${(Y==null?void 0:Y.primaryColor)||"#6c47ff"};
  transition: width .22s ease;
  display: ${(m==null?void 0:m.showProgress)===!1?"none":"block"};
  z-index: 6;
}
${F==="iframe"?`
body {
  background: transparent;
}
.lf-shell::before,
.lf-shell::after,
.lf-grid {
  display: none;
}
.lf-stage-shell {
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: none;
}
.lf-stage-shell::before {
  display: none;
}
.presentation {
  box-shadow: none;
}
`:""}
${F==="pdf"?`
.lf-shell::before,
.lf-shell::after,
.lf-grid,
.progress,
.dot-nav,
.nav {
  display: none !important;
}
.lf-stage-shell::before {
  display: none;
}
@page {
  size: auto;
  margin: 12mm;
}
@media print {
  html, body {
    min-height: auto;
    background: #ffffff;
  }
  body {
    padding: 0;
    overflow: visible;
  }
  .lf-shell,
  .lf-stage-shell,
  .presentation {
    width: 100%;
    min-height: auto;
    overflow: visible;
  }
  .presentation {
    gap: 0;
  }
  .slide {
    margin: 0 auto;
    box-shadow: none;
  }
}
`:""}
@media (max-width: 900px) {
  .lf-stage-shell {
    padding: 10px;
    border-radius: 20px;
  }
  .dot-nav { bottom: 66px; }
  .nav { bottom: 12px; }
  .nav-btn {
    min-width: 78px;
    padding: 9px 14px;
  }
}
`}function N(Y="html"){return`
(function () {
  var exportMode = ${JSON.stringify(Y)};
  var dataNode = document.getElementById('lf-data');
  if (!dataNode) return;

  var project;
  try {
    project = JSON.parse(dataNode.textContent || '{}');
  } catch (error) {
    console.error('MediaSurf export could not read project data.', error);
    var mountError = document.getElementById('presentation');
    if (mountError) mountError.innerHTML = '<div class="lf-empty">Unable to load exported slides.</div>';
    return;
  }

  var slides = Array.isArray(project.slides)
    ? project.slides.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); })
    : [];
  var settings = project.settings || {};
  var theme = project.theme || {};
  var state = { current: 0, timer: null, mediaCleanup: null };
  var slideLookup = {};
  var slideNodes = [];

  var mount = document.getElementById('presentation');
  var counter = document.getElementById('counter');
  var progress = document.getElementById('progress');
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  var dotNav = document.getElementById('dot-nav');

  slides.forEach(function (slide, index) {
    slideLookup[slide.id] = index;
    var node = renderSlide(slide, index);
    mount.appendChild(node);
    slideNodes.push(node);
  });

  if (!slideNodes.length) {
    mount.innerHTML = '<div class="lf-empty">This export has no slides.</div>';
    if (counter) counter.textContent = '0 / 0';
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }

  if (exportMode === 'pdf') {
    slideNodes.forEach(function (node) {
      node.classList.add('active');
      triggerLoadInteractions(node);
    });
    queuePrint();
    return;
  }

  renderDots();

  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); });

  if (settings.allowKeyboardNav !== false) {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault();
        next();
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        prev();
      }
    });
  }

  document.addEventListener('click', function (event) {
    if (event.target.closest('.lf-hotspot-btn') || event.target.closest('.lf-hotspot-popup')) return;
    document.querySelectorAll('.lf-hotspot-popup.is-open').forEach(function (popup) {
      popup.classList.remove('is-open');
    });
  });

  window.addEventListener('resize', resizeStage);
  resizeStage();
  show(0);

  function resizeStage() {
    var stage = document.getElementById('presentation');
    if (!stage) return;
    if (exportMode === 'pdf') {
      stage.style.transform = 'none';
      return;
    }
    var slideWidth = Math.max(320, Number(settings.slideWidth || 960));
    var slideHeight = Math.max(320, Number(settings.slideHeight || 540));
    var availableWidth = Math.max(240, window.innerWidth - 72);
    var availableHeight = Math.max(240, window.innerHeight - 72);
    var scale = Math.min(availableWidth / slideWidth, availableHeight / slideHeight, 1.5);
    stage.style.transform = 'scale(' + scale + ')';
  }

  function queuePrint() {
    var images = Array.prototype.filter.call(document.images || [], function (image) {
      return !image.complete;
    });
    var didPrint = false;

    function triggerPrint() {
      if (didPrint) return;
      didPrint = true;
      window.setTimeout(function () {
        window.focus();
        window.print();
      }, 300);
    }

    if (!images.length) {
      triggerPrint();
      return;
    }

    var remaining = images.length;
    images.forEach(function (image) {
      function onReady() {
        remaining -= 1;
        if (remaining <= 0) triggerPrint();
      }
      image.addEventListener('load', onReady, { once: true });
      image.addEventListener('error', onReady, { once: true });
    });

    window.setTimeout(triggerPrint, 1800);
  }

  function renderDots() {
    if (!dotNav) return;
    dotNav.innerHTML = '';
    slideNodes.forEach(function (_, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'dot';
      button.setAttribute('aria-label', 'Go to slide ' + (index + 1));
      button.addEventListener('click', function () { show(index); });
      dotNav.appendChild(button);
    });
  }

  function next() {
    if (state.current < slideNodes.length - 1) {
      show(state.current + 1);
      return;
    }
    if (settings.loop) show(0);
  }

  function prev() {
    if (state.current > 0) {
      show(state.current - 1);
      return;
    }
    if (settings.loop) show(slideNodes.length - 1);
  }

  function show(index) {
    if (!slideNodes.length) return;
    if (index < 0) index = 0;
    if (index > slideNodes.length - 1) index = slideNodes.length - 1;

    slideNodes.forEach(function (node, nodeIndex) {
      node.classList.toggle('active', nodeIndex === index);
    });

    state.current = index;
    if (counter) counter.textContent = (index + 1) + ' / ' + slideNodes.length;
    if (progress) progress.style.width = (((index + 1) / slideNodes.length) * 100) + '%';
    if (prevBtn) prevBtn.disabled = !settings.loop && index === 0;
    if (nextBtn) nextBtn.disabled = !settings.loop && index === slideNodes.length - 1;

    Array.prototype.forEach.call(dotNav ? dotNav.children : [], function (dot, dotIndex) {
      dot.classList.toggle('active', dotIndex === index);
    });

    closeHotspots();
    pauseInactiveMedia(index);
    bindMediaAdvance(index);
    triggerLoadInteractions(slideNodes[index]);
    scheduleAutoAdvance();
  }

  function scheduleAutoAdvance() {
    window.clearTimeout(state.timer);
    if (!settings.autoPlay) return;
    var currentSlide = slides[state.current] || {};
    if (currentSlide.advanceOnMediaEnd && getMediaAdvanceNode(state.current)) return;
    var duration = Number(currentSlide.duration || 0);
    if (duration > 0) {
      state.timer = window.setTimeout(function () { next(); }, duration * 1000);
    }
  }

  function bindMediaAdvance(index) {
    if (typeof state.mediaCleanup === 'function') {
      state.mediaCleanup();
      state.mediaCleanup = null;
    }

    var slide = slides[index] || {};
    if (!slide.advanceOnMediaEnd) return;

    var media = getMediaAdvanceNode(index);
    if (!media) return;

    var onEnded = function () { next(); };
    media.addEventListener('ended', onEnded);
    state.mediaCleanup = function () {
      media.removeEventListener('ended', onEnded);
    };
  }

  function getMediaAdvanceNode(index) {
    var slide = slides[index] || {};
    var node = slideNodes[index];
    if (!slide || !node || !Array.isArray(slide.elements)) return null;

    var mediaElements = slide.elements.filter(function (element) {
      if (['video', 'audio'].indexOf(element.type) === -1) return false;
      var src = String((element.content && element.content.src) || '').trim();
      if (!src) return false;
      if (element.type === 'video' && (src.indexOf('youtube') !== -1 || src.indexOf('youtu.be') !== -1 || src.indexOf('vimeo') !== -1)) {
        return false;
      }
      return true;
    });

    if (!mediaElements.length) return null;

    var preferred = mediaElements.find(function (element) {
      return Boolean(element.content && element.content.autoplay);
    }) || mediaElements[0];

    var selector = preferred.type === 'video' ? '.lf-video video' : '.lf-audio-player';
    return node.querySelector(selector);
  }

  function closeHotspots() {
    document.querySelectorAll('.lf-hotspot-popup.is-open').forEach(function (popup) {
      popup.classList.remove('is-open');
    });
  }

  function pauseInactiveMedia(activeIndex) {
    slideNodes.forEach(function (slideNode, index) {
      if (index === activeIndex) return;
      slideNode.querySelectorAll('audio, video').forEach(function (media) {
        try { media.pause(); } catch (error) {}
      });
    });
  }

  function resolveSlideTarget(value) {
    var raw = String(value == null ? '' : value).trim();
    if (!raw) return null;
    if (raw === 'next') return state.current + 1 < slideNodes.length ? state.current + 1 : null;
    if (raw === 'prev') return state.current - 1 >= 0 ? state.current - 1 : null;
    if (String(Number(raw)) === raw && Number.isInteger(Number(raw))) {
      var numericIndex = Number(raw) - 1;
      if (numericIndex >= 0 && numericIndex < slideNodes.length) return numericIndex;
    }
    if (Object.prototype.hasOwnProperty.call(slideLookup, raw)) {
      return slideLookup[raw];
    }
    var lower = raw.toLowerCase();
    var titleIndex = slides.findIndex(function (slide) {
      return String(slide.title || '').trim().toLowerCase() === lower;
    });
    return titleIndex >= 0 ? titleIndex : null;
  }

  function runAction(action, value, sourceNode) {
    if (!action || action === 'none') return;
    if (action === 'navigate') {
      var targetIndex = resolveSlideTarget(value);
      if (targetIndex !== null) show(targetIndex);
      return;
    }
    if (action === 'openUrl' || action === 'link') {
      var url = String(value || '').trim();
      if (url) window.open(url, '_blank', 'noopener');
      return;
    }
    if (action === 'showPopup') {
      var popup = sourceNode ? sourceNode.querySelector('.lf-hotspot-popup') : null;
      if (popup) {
        popup.classList.toggle('is-open');
      } else if (value) {
        window.alert(String(value));
      }
      return;
    }
    if (action === 'playAudio') {
      var audioTarget = resolveMediaNode('audio', value, sourceNode);
      if (audioTarget) audioTarget.play().catch(function () {});
      return;
    }
    if (action === 'pauseVideo') {
      var videoTarget = resolveMediaNode('video', value, sourceNode);
      if (videoTarget) videoTarget.pause();
      return;
    }
    if (action === 'submit') {
      var scope = sourceNode ? sourceNode.closest('.slide') : slideNodes[state.current];
      var submitButton = scope ? scope.querySelector('.lf-quiz-submit') : null;
      if (submitButton) submitButton.click();
      return;
    }
    if (action === 'toggleElement') {
      var scope = sourceNode ? sourceNode.closest('.slide') : slideNodes[state.current];
      var targetNode = scope ? scope.querySelector('[data-el-id="' + cssEscape(value) + '"]') : null;
      if (targetNode) {
        targetNode.style.display = targetNode.style.display === 'none' ? '' : 'none';
      }
      return;
    }
    if (action === 'completeActivity') {
      if (sourceNode) {
        var check = document.createElement('div');
        check.className = 'lf-completion-mark';
        check.textContent = '✓';
        check.style.cssText = 'position:absolute;top:-10px;right:-10px;width:24px;height:24px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:bold;z-index:99;box-shadow:0 2px 4px rgba(0,0,0,0.2)';
        sourceNode.appendChild(check);
      }
      return;
    }
  }

  function resolveMediaNode(tagName, value, sourceNode) {
    var scope = sourceNode ? sourceNode.closest('.slide') : slideNodes[state.current];
    if (!scope) return null;
    var target = String(value || '').trim();
    if (target) {
      var byElement = scope.querySelector('[data-el-id="' + cssEscape(target) + '"] ' + tagName);
      if (byElement) return byElement;
    }
    return scope.querySelector(tagName);
  }

  function triggerLoadInteractions(slideNode) {
    if (!slideNode) return;
    slideNode.querySelectorAll('.lf-el').forEach(function (node) {
      var interactions = node._lfLoadInteractions || [];
      interactions.forEach(function (interaction) {
        runAction(interaction.action, interaction.value, node);
      });
    });
  }

  function buildElementBox(el, interactive) {
    var node = document.createElement('div');
    node.className = 'lf-el lf-el-' + (el.type || 'unknown');
    node.dataset.elId = el.id || '';
    node.dataset.elType = el.type || '';
    node.style.left = (el.x || 0) + 'px';
    node.style.top = (el.y || 0) + 'px';
    node.style.width = (el.width || 0) + 'px';
    node.style.height = (el.height || 0) + 'px';
    node.style.opacity = el.opacity == null ? '1' : String(el.opacity);
    node.style.zIndex = String(el.zIndex || 1);
    node.style.transform = el.rotation ? 'rotate(' + el.rotation + 'deg)' : '';
    node.style.pointerEvents = interactive ? 'auto' : 'none';
    return node;
  }

  function renderSlide(slide, slideIndex) {
    var node = document.createElement('section');
    node.className = 'slide';
    node.dataset.slideId = slide.id || '';
    node.dataset.slideIndex = String(slideIndex);
    applySlideBackground(node, slide);

    var elements = Array.isArray(slide.elements)
      ? slide.elements.slice().sort(function (a, b) { return (a.zIndex || 0) - (b.zIndex || 0); })
      : [];

    elements.forEach(function (el) {
      if (el && el.visible !== false) {
        node.appendChild(renderElement(el));
      }
    });

    return node;
  }

  function applySlideBackground(node, slide) {
    if (slide.backgroundType === 'gradient' && slide.backgroundGradient) {
      node.style.background = slide.backgroundGradient;
      return;
    }
    if (slide.backgroundType === 'image' && slide.backgroundImage) {
      node.style.backgroundImage = 'url("' + String(slide.backgroundImage).replace(/"/g, '&quot;') + '")';
      node.style.backgroundSize = 'cover';
      node.style.backgroundPosition = 'center';
      return;
    }
    node.style.background = slide.background || theme.bgColor || '#ffffff';
  }

  function renderElement(el) {
    var interactions = Array.isArray(el.interactions) ? el.interactions.filter(Boolean) : [];
    var interactive = ['button', 'hotspot', 'quiz', 'poll', 'matching', 'sorting', 'cloze', 'scenario', 'progress', 'tabs', 'accordion', 'flipcard', 'stepper', 'labeledimage', 'audio', 'video'].includes(el.type) || interactions.length > 0;
    var wrapper = buildElementBox(el, interactive);
    var content = el.content || {};

    if (el.type === 'text' || el.type === 'heading') {
      var text = document.createElement('div');
      text.className = 'lf-text';
      text.textContent = content.text || '';
      text.style.fontSize = (content.fontSize || (el.type === 'heading' ? 36 : 18)) + 'px';
      text.style.fontFamily = content.fontFamily || theme.fontFamily || 'Inter, sans-serif';
      text.style.fontWeight = String(content.fontWeight || (el.type === 'heading' ? '700' : '400'));
      text.style.fontStyle = content.fontStyle || 'normal';
      text.style.textDecoration = content.textDecoration || 'none';
      text.style.textAlign = content.textAlign || 'left';
      text.style.color = content.color || theme.textColor || '#1a1a2e';
      text.style.lineHeight = String(content.lineHeight || (el.type === 'heading' ? 1.2 : 1.5));
      text.style.letterSpacing = (content.letterSpacing || 0) + 'px';
      text.style.textTransform = content.textTransform || 'none';
      wrapper.appendChild(text);
    } else if (el.type === 'image') {
      var image = document.createElement('img');
      image.className = 'lf-image';
      image.src = content.src || '';
      image.alt = content.alt || '';
      image.style.objectFit = content.objectFit || 'cover';
      image.style.borderRadius = (content.borderRadius || 0) + 'px';
      image.style.border = (content.borderWidth || 0) + 'px solid ' + (content.borderColor || 'transparent');
      wrapper.appendChild(image);
    } else if (el.type === 'shape') {
      wrapper.appendChild(renderShape(el));
    } else if (el.type === 'button') {
      var buttonWrap = document.createElement('div');
      buttonWrap.className = 'lf-button-wrap';
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'lf-button';
      button.textContent = content.label || 'Button';
      button.style.fontSize = (content.fontSize || 15) + 'px';
      button.style.fontWeight = String(content.fontWeight || 600);
      button.style.fontFamily = content.fontFamily || theme.fontFamily || 'Inter, sans-serif';
      button.style.letterSpacing = (content.letterSpacing || 0) + 'px';
      button.style.borderRadius = (content.borderRadius == null ? 8 : content.borderRadius) + 'px';
      applyButtonStyle(button, content, theme);
      buttonWrap.appendChild(button);
      wrapper.appendChild(buttonWrap);

      if (content.action && content.action !== 'none') {
        button.addEventListener('click', function (event) {
          event.stopPropagation();
          var action = content.action === 'link' ? 'openUrl' : content.action;
          runAction(action, content.target, wrapper);
        });
      }
    } else if (el.type === 'hotspot') {
      wrapper.appendChild(renderHotspot(content));
    } else if (el.type === 'video') {
      wrapper.appendChild(renderVideo(content));
    } else if (el.type === 'audio') {
      wrapper.appendChild(renderAudio(content));
    } else if (el.type === 'chart') {
      wrapper.appendChild(renderChart(el));
    } else if (el.type === 'quiz') {
      wrapper.appendChild(renderQuiz(content));
    } else if (el.type === 'tabs') {
      wrapper.appendChild(renderTabs(content));
    } else if (el.type === 'accordion') {
      wrapper.appendChild(renderAccordion(content));
    } else if (el.type === 'flipcard') {
      wrapper.appendChild(renderFlipCard(content));
    } else if (el.type === 'stepper') {
      wrapper.appendChild(renderStepper(content));
    } else if (el.type === 'poll') {
      wrapper.appendChild(renderPoll(content, el.id));
    } else if (el.type === 'labeledimage') {
      wrapper.appendChild(renderLabeledImage(content, el.id));
    } else if (el.type === 'matching') {
      wrapper.appendChild(renderMatching(content, el.id));
    } else if (el.type === 'sorting') {
      wrapper.appendChild(renderSorting(content, el.id));
    } else if (el.type === 'cloze') {
      wrapper.appendChild(renderCloze(content, el.id));
    } else if (el.type === 'scenario') {
      wrapper.appendChild(renderScenario(content, el.id));
    } else if (el.type === 'progress') {
      wrapper.appendChild(renderProgress(content, el.id));
    } else if (el.type === 'divider') {
      var dividerWrap = document.createElement('div');
      dividerWrap.className = 'lf-divider-wrap';
      var divider = document.createElement('hr');
      divider.className = 'lf-divider';
      divider.style.borderTop = (content.thickness || 2) + 'px solid ' + (content.color || '#e2e8f0');
      dividerWrap.appendChild(divider);
      wrapper.appendChild(dividerWrap);
    }

    bindInteractions(wrapper, interactions);
    return wrapper;
  }

  function renderShape(el) {
    var content = el.content || {};
    var type = content.shapeType || 'rectangle';
    if (['triangle', 'diamond', 'star', 'arrow'].includes(type)) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', String(el.width || 0));
      svg.setAttribute('height', String(el.height || 0));
      svg.setAttribute('viewBox', '0 0 ' + (el.width || 0) + ' ' + (el.height || 0));
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.style.width = '100%';
      svg.style.height = '100%';
      var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', getPolygonPoints(type, el.width || 0, el.height || 0));
      polygon.setAttribute('fill', content.fillColor || '#6c47ff');
      polygon.setAttribute('stroke', content.borderColor || 'transparent');
      polygon.setAttribute('stroke-width', String(content.borderWidth || 0));
      svg.appendChild(polygon);
      return svg;
    }

    var div = document.createElement('div');
    div.className = 'lf-el-content';
    div.style.background = content.fillColor || '#6c47ff';
    div.style.border = (content.borderWidth || 0) + 'px solid ' + (content.borderColor || 'transparent');
    div.style.opacity = content.opacity == null ? '1' : String(content.opacity);
    div.style.borderRadius = type === 'circle' ? '50%' : (content.borderRadius || 0) + 'px';
    return div;
  }

  function getPolygonPoints(type, width, height) {
    if (type === 'triangle') return (width / 2) + ',0 ' + width + ',' + height + ' 0,' + height;
    if (type === 'diamond') return (width / 2) + ',0 ' + width + ',' + (height / 2) + ' ' + (width / 2) + ',' + height + ' 0,' + (height / 2);
    if (type === 'arrow') {
      return '0,' + (height * 0.3) + ' ' + (width * 0.6) + ',' + (height * 0.3) + ' ' + (width * 0.6) + ',0 ' + width + ',' + (height / 2) + ' ' + (width * 0.6) + ',' + height + ' ' + (width * 0.6) + ',' + (height * 0.7) + ' 0,' + (height * 0.7);
    }
    if (type === 'star') {
      var points = [];
      var cx = width / 2;
      var cy = height / 2;
      var outerR = Math.min(width, height) / 2;
      var innerR = outerR * 0.4;
      for (var index = 0; index < 10; index++) {
        var angle = ((index * 36) - 90) * Math.PI / 180;
        var radius = index % 2 === 0 ? outerR : innerR;
        points.push((cx + radius * Math.cos(angle)) + ',' + (cy + radius * Math.sin(angle)));
      }
      return points.join(' ');
    }
    return '';
  }

  function applyButtonStyle(button, content, themeConfig) {
    var primary = themeConfig.primaryColor || '#6c47ff';
    var variants = {
      primary: { background: primary, color: '#ffffff', border: 'none' },
      secondary: { background: '#f0f0f0', color: '#333333', border: '1px solid #dbe3ef' },
      outline: { background: 'transparent', color: primary, border: '2px solid ' + primary },
      ghost: { background: 'transparent', color: primary, border: 'none' },
      danger: { background: '#ef4444', color: '#ffffff', border: 'none' },
    };
    var variant = variants[content.variant || 'primary'] || variants.primary;
    button.style.background = content.bgColor || variant.background;
    button.style.color = content.textColor || variant.color;
    button.style.border = content.borderColor ? '1px solid ' + content.borderColor : variant.border;
  }

  function renderHotspot(content) {
    var root = document.createElement('div');
    root.className = 'lf-el-content';
    root.style.position = 'relative';

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'lf-hotspot-btn';
    button.textContent = content.icon || '?';
    button.style.background = content.bgColor || '#6c47ff';
    button.style.color = content.iconColor || '#ffffff';
    button.style.borderRadius = (content.borderRadius == null ? 999 : content.borderRadius) >= 999 ? '50%' : (content.borderRadius || 0) + 'px';

    var popup = document.createElement('div');
    popup.className = 'lf-hotspot-popup';
    popup.style.background = content.popupBgColor || '#ffffff';
    popup.style.color = content.popupTextColor || '#1a1a2e';

    var header = document.createElement('div');
    header.className = 'lf-hotspot-header';
    var title = document.createElement('div');
    title.className = 'lf-hotspot-title';
    title.textContent = content.popupTitle || 'Info';
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'lf-hotspot-close';
    close.textContent = '×';
    close.addEventListener('click', function (event) {
      event.stopPropagation();
      popup.classList.remove('is-open');
    });
    header.appendChild(title);
    header.appendChild(close);

    var body = document.createElement('div');
    body.className = 'lf-hotspot-body';
    body.textContent = content.popupContent || 'Add your content in the editor.';

    popup.appendChild(header);
    popup.appendChild(body);

    button.addEventListener('click', function (event) {
      event.stopPropagation();
      popup.classList.toggle('is-open');
    });

    root.appendChild(button);
    root.appendChild(popup);
    return root;
  }

  function renderVideo(content) {
    var wrapper = document.createElement('div');
    wrapper.className = 'lf-video';
    var src = String(content.src || '').trim();
    var embed = toEmbedUrl(src);

    if (embed) {
      var frame = document.createElement('iframe');
      frame.src = embed;
      frame.setAttribute('frameborder', '0');
      frame.setAttribute('allowfullscreen', 'true');
      frame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      wrapper.appendChild(frame);
      return wrapper;
    }

    if (!src) {
      var empty = document.createElement('div');
      empty.className = 'lf-empty';
      empty.textContent = 'No video source';
      wrapper.appendChild(empty);
      return wrapper;
    }

    var video = document.createElement('video');
    video.src = src;
    if (content.poster) video.poster = content.poster;
    video.controls = content.controls !== false;
    video.autoplay = Boolean(content.autoplay);
    video.loop = Boolean(content.loop);
    video.muted = Boolean(content.muted);
    video.style.objectFit = content.objectFit || 'cover';
    wrapper.appendChild(video);
    return wrapper;
  }

  function toEmbedUrl(src) {
    if (!src) return '';
    if (src.includes('youtube.com/embed/')) return src;
    if (src.includes('youtu.be/') || src.includes('youtube.com/watch')) {
      var videoId = extractYouTubeId(src);
      return videoId ? 'https://www.youtube.com/embed/' + videoId : '';
    }
    if (src.includes('player.vimeo.com/video/')) return src;
    if (src.includes('vimeo.com/')) {
      var vimeoId = extractVimeoId(src);
      return vimeoId ? 'https://player.vimeo.com/video/' + vimeoId : '';
    }
    return '';
  }

  function extractYouTubeId(src) {
    if (src.includes('youtu.be/')) {
      var shortPart = src.split('youtu.be/')[1] || '';
      return stripAfterDelimiters(shortPart) || '';
    }
    if (src.includes('v=')) {
      var queryPart = src.split('v=')[1] || '';
      return stripAfterDelimiters(queryPart) || '';
    }
    return '';
  }

  function extractVimeoId(src) {
    var parts = src.split('/').filter(Boolean);
    for (var index = parts.length - 1; index >= 0; index--) {
      var part = stripAfterDelimiters(parts[index]);
      if (String(Number(part)) === part && Number.isInteger(Number(part))) {
        return part;
      }
    }
    return '';
  }

  function stripAfterDelimiters(value) {
    var end = value.length;
    ['?', '&', '#', '/'].forEach(function (token) {
      var index = value.indexOf(token);
      if (index !== -1 && index < end) end = index;
    });
    return value.slice(0, end);
  }

  function renderAudio(content) {
    var wrap = document.createElement('div');
    wrap.className = 'lf-audio-card';
    wrap.style.background = content.bgColor || '#ede7ff';

    var icon = document.createElement('div');
    icon.className = 'lf-audio-icon';
    icon.style.background = content.accentColor || '#6c47ff';
    icon.textContent = '♪';

    var label = document.createElement('div');
    label.className = 'lf-audio-label';
    label.style.color = content.textColor || '#555555';
    label.textContent = content.label || 'Audio Player';

    var audio = document.createElement('audio');
    audio.className = 'lf-audio-player';
    audio.src = content.src || '';
    audio.controls = content.controls !== false;
    audio.autoplay = Boolean(content.autoplay);
    audio.loop = Boolean(content.loop);

    wrap.appendChild(icon);
    wrap.appendChild(label);
    wrap.appendChild(audio);
    return wrap;
  }

  function renderChart(el) {
    var model = buildChartModel(el.content || {}, el.width || 420, el.height || 280, project.theme || {});
    var wrap = document.createElement('div');
    wrap.className = 'lf-chart-wrap';

    var root = document.createElement('div');
    root.className = 'lf-chart';
    root.style.background = model.backgroundColor;
    root.style.color = model.textColor;
    root.style.border = (model.borderWidth || 0) + 'px solid ' + (model.borderColor || '#e2e8f0');

    if (model.title) {
      var title = document.createElement('div');
      title.className = 'lf-chart-title';
      title.textContent = model.title;
      root.appendChild(title);
    }

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'lf-chart-svg');
    svg.setAttribute('viewBox', '0 0 ' + (el.width || 420) + ' ' + (el.height || 280));
    svg.setAttribute('preserveAspectRatio', 'none');

    if (model.type === 'circle') {
      model.circle.slices.forEach(function (slice) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', slice.path);
        path.setAttribute('fill', slice.color);
        svg.appendChild(path);
      });

      var inner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      inner.setAttribute('cx', model.circle.center.x);
      inner.setAttribute('cy', model.circle.center.y);
      inner.setAttribute('r', Math.max(0, model.circle.innerRadius - 2));
      inner.setAttribute('fill', model.backgroundColor);
      svg.appendChild(inner);

      var centerValue = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      centerValue.setAttribute('x', model.circle.center.x);
      centerValue.setAttribute('y', model.circle.center.y - 4);
      centerValue.setAttribute('text-anchor', 'middle');
      centerValue.setAttribute('class', 'lf-chart-center-value');
      centerValue.setAttribute('fill', model.textColor);
      centerValue.textContent = model.circle.centerValue;
      svg.appendChild(centerValue);

      var centerLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      centerLabel.setAttribute('x', model.circle.center.x);
      centerLabel.setAttribute('y', model.circle.center.y + 14);
      centerLabel.setAttribute('text-anchor', 'middle');
      centerLabel.setAttribute('class', 'lf-chart-center-label');
      centerLabel.setAttribute('fill', model.textColor);
      centerLabel.textContent = 'Total';
      svg.appendChild(centerLabel);
    } else {
      if (model.showGrid) {
        model.cartesian.ticks.forEach(function (tick) {
          var grid = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          grid.setAttribute('x1', model.cartesian.padding.left);
          grid.setAttribute('x2', model.cartesian.padding.left + model.cartesian.plotWidth);
          grid.setAttribute('y1', tick.y);
          grid.setAttribute('y2', tick.y);
          grid.setAttribute('stroke', model.gridColor);
          grid.setAttribute('stroke-width', '1');
          svg.appendChild(grid);
        });
      }

      model.cartesian.ticks.forEach(function (tick) {
        var tickLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tickLabel.setAttribute('x', model.cartesian.padding.left - 8);
        tickLabel.setAttribute('y', tick.y + 4);
        tickLabel.setAttribute('text-anchor', 'end');
        tickLabel.setAttribute('class', 'lf-chart-axis');
        tickLabel.setAttribute('fill', model.textColor);
        tickLabel.textContent = tick.label;
        svg.appendChild(tickLabel);
      });

      if (model.type === 'bar') {
        model.cartesian.bars.forEach(function (bar) {
          var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', bar.x);
          rect.setAttribute('y', bar.y);
          rect.setAttribute('width', bar.width);
          rect.setAttribute('height', bar.height);
          rect.setAttribute('fill', bar.color);
          rect.setAttribute('rx', '8');
          svg.appendChild(rect);

          if (model.showValues) {
            var valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            valueLabel.setAttribute('x', bar.x + (bar.width / 2));
            valueLabel.setAttribute('y', bar.y - 8);
            valueLabel.setAttribute('text-anchor', 'middle');
            valueLabel.setAttribute('class', 'lf-chart-value');
            valueLabel.setAttribute('fill', model.textColor);
            valueLabel.textContent = bar.valueLabel;
            svg.appendChild(valueLabel);
          }

          var barLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          barLabel.setAttribute('x', bar.x + (bar.width / 2));
          barLabel.setAttribute('y', model.cartesian.padding.top + model.cartesian.plotHeight + 18);
          barLabel.setAttribute('text-anchor', 'middle');
          barLabel.setAttribute('class', 'lf-chart-axis');
          barLabel.setAttribute('fill', model.textColor);
          barLabel.textContent = bar.label;
          svg.appendChild(barLabel);
        });
      } else {
        if (model.showArea && model.cartesian.areaPath) {
          var area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          area.setAttribute('d', model.cartesian.areaPath);
          area.setAttribute('fill', (model.cartesian.points[0] && model.cartesian.points[0].color) || '#6c47ff');
          area.setAttribute('opacity', '0.16');
          svg.appendChild(area);
        }

        var line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        line.setAttribute('d', model.cartesian.linePath);
        line.setAttribute('stroke', (model.cartesian.points[0] && model.cartesian.points[0].color) || '#6c47ff');
        line.setAttribute('stroke-width', model.strokeWidth || 3);
        line.setAttribute('fill', 'none');
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(line);

        model.cartesian.points.forEach(function (point) {
          var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('cx', point.x);
          dot.setAttribute('cy', point.y);
          dot.setAttribute('r', '4.5');
          dot.setAttribute('fill', point.color);
          svg.appendChild(dot);

          if (model.showValues) {
            var pointValue = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            pointValue.setAttribute('x', point.x);
            pointValue.setAttribute('y', point.y - 10);
            pointValue.setAttribute('text-anchor', 'middle');
            pointValue.setAttribute('class', 'lf-chart-value');
            pointValue.setAttribute('fill', model.textColor);
            pointValue.textContent = point.valueLabel;
            svg.appendChild(pointValue);
          }

          var pointLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          pointLabel.setAttribute('x', point.x);
          pointLabel.setAttribute('y', model.cartesian.padding.top + model.cartesian.plotHeight + 18);
          pointLabel.setAttribute('text-anchor', 'middle');
          pointLabel.setAttribute('class', 'lf-chart-axis');
          pointLabel.setAttribute('fill', model.textColor);
          pointLabel.textContent = point.label;
          svg.appendChild(pointLabel);
        });
      }
    }

    root.appendChild(svg);

    if (model.showLegend) {
      var legend = document.createElement('div');
      legend.className = 'lf-chart-legend';
      model.series.forEach(function (item) {
        var legendItem = document.createElement('div');
        legendItem.className = 'lf-chart-legend-item';

        var dot = document.createElement('span');
        dot.className = 'lf-chart-legend-dot';
        dot.style.background = item.color;

        var label = document.createElement('span');
        label.className = 'lf-chart-legend-label';
        label.textContent = item.label;

        var value = document.createElement('span');
        value.className = 'lf-chart-legend-value';
        value.textContent = String(item.value);

        legendItem.appendChild(dot);
        legendItem.appendChild(label);
        legendItem.appendChild(value);
        legend.appendChild(legendItem);
      });
      root.appendChild(legend);
    }

    wrap.appendChild(root);
    return wrap;
  }

  function renderQuiz(content) {
    var root = document.createElement('div');
    root.className = 'lf-quiz';
    root.style.background = content.cardBgColor || '#ffffff';
    root.style.color = content.questionColor || '#1a1a2e';
    root.style.setProperty('--quiz-accent', content.accentColor || '#6c47ff');

    var question = document.createElement('p');
    question.className = 'lf-quiz-question';
    question.style.color = content.questionColor || '#1a1a2e';
    question.textContent = content.question || 'Question';

    var optionsWrap = document.createElement('div');
    optionsWrap.className = 'lf-quiz-options';
    var optionButtons = [];
    var selectedIndex = null;
    var submitted = false;
    var correctIndex = Number(content.correctIndex || 0);

    (Array.isArray(content.options) ? content.options : []).forEach(function (option, optionIndex) {
      var optionBtn = document.createElement('button');
      optionBtn.type = 'button';
      optionBtn.className = 'lf-quiz-option';
      optionBtn.style.borderColor = '#dbe3ef';

      var letter = document.createElement('span');
      letter.className = 'lf-quiz-letter';
      letter.textContent = String.fromCharCode(65 + optionIndex);

      var text = document.createElement('span');
      text.className = 'lf-quiz-text';
      text.textContent = option;

      optionBtn.appendChild(letter);
      optionBtn.appendChild(text);
      optionBtn.addEventListener('click', function () {
        if (submitted) return;
        selectedIndex = optionIndex;
        syncQuizState();
      });
      optionsWrap.appendChild(optionBtn);
      optionButtons.push(optionBtn);
    });

    var feedback = document.createElement('div');
    feedback.className = 'lf-quiz-feedback';

    var actions = document.createElement('div');
    actions.className = 'lf-quiz-actions';

    var submit = document.createElement('button');
    submit.type = 'button';
    submit.className = 'lf-quiz-submit';
    submit.textContent = 'Submit';
    submit.style.background = content.accentColor || '#6c47ff';
    submit.style.color = '#ffffff';
    submit.disabled = true;
    submit.addEventListener('click', function () {
      if (selectedIndex == null) return;
      submitted = true;
      syncQuizState();
    });

    var reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'lf-quiz-reset';
    reset.textContent = 'Try Again';
    reset.style.background = '#f0f0f0';
    reset.style.color = '#333333';
    reset.style.display = 'none';
    reset.addEventListener('click', function () {
      selectedIndex = null;
      submitted = false;
      syncQuizState();
    });

    actions.appendChild(submit);
    actions.appendChild(reset);

    root.appendChild(question);
    root.appendChild(optionsWrap);
    root.appendChild(feedback);
    root.appendChild(actions);

    function syncQuizState() {
      optionButtons.forEach(function (button, optionIndex) {
        button.classList.remove('selected', 'correct', 'wrong');
        button.disabled = submitted;
        button.style.borderColor = optionIndex === selectedIndex ? (content.accentColor || '#6c47ff') : '#dbe3ef';
        button.style.background = optionIndex === selectedIndex ? 'rgba(108, 71, 255, .10)' : 'rgba(255,255,255,.92)';
        if (submitted) {
          if (optionIndex === correctIndex) {
            button.classList.add('correct');
          } else if (optionIndex === selectedIndex && selectedIndex !== correctIndex) {
            button.classList.add('wrong');
          }
        } else if (optionIndex === selectedIndex) {
          button.classList.add('selected');
        }
      });

      submit.disabled = selectedIndex == null || submitted;
      submit.style.display = submitted ? 'none' : 'inline-flex';
      reset.style.display = submitted ? 'inline-flex' : 'none';

      if (!submitted) {
        feedback.className = 'lf-quiz-feedback';
        feedback.textContent = '';
        return;
      }

      var correct = selectedIndex === correctIndex;
      feedback.className = 'lf-quiz-feedback show ' + (correct ? 'correct' : 'wrong');
      feedback.textContent = correct
        ? '✓ Correct!'
        : ('✗ Incorrect.' + (content.explanation ? ' ' + content.explanation : ''));
    }

    return root;
  }

  function renderTabs(content) {
    var root = document.createElement('div');
    root.className = 'lf-tabs';
    root.style.background = content.contentBgColor || '#ffffff';

    var header = document.createElement('div');
    header.className = 'lf-tabs-header';
    header.style.background = content.inactiveTabColor || '#f8fafc';

    var tabContent = document.createElement('div');
    tabContent.className = 'lf-tab-content';
    tabContent.style.color = content.textColor || '#1e293b';

    var tabs = Array.isArray(content.tabs) ? content.tabs : [];
    var activeId = tabs.length > 0 ? tabs[0].id : null;
    var tabButtons = [];

    tabs.forEach(function(tab) {
      var btn = document.createElement('button');
      btn.className = 'lf-tab-btn';
      btn.textContent = tab.label;
      btn.onclick = function() {
        activeId = tab.id;
        syncTabs();
      };
      header.appendChild(btn);
      tabButtons.push({ id: tab.id, el: btn, content: tab.content });
    });

    function syncTabs() {
      var activeContent = '';
      tabButtons.forEach(function(tabObj) {
        var isActive = tabObj.id === activeId;
        tabObj.el.style.color = isActive ? (content.activeTabColor || '#6c47ff') : '#64748b';
        tabObj.el.style.borderBottomColor = isActive ? (content.activeTabColor || '#6c47ff') : 'transparent';
        tabObj.el.style.background = isActive ? (content.contentBgColor || '#ffffff') : 'transparent';
        tabObj.el.style.fontWeight = isActive ? '600' : '400';
        if (isActive) activeContent = tabObj.content || '';
      });
      tabContent.textContent = activeContent;
    }

    if (tabs.length > 0) syncTabs();

    root.appendChild(header);
    root.appendChild(tabContent);
    return root;
  }

  function renderAccordion(content) {
    var root = document.createElement('div');
    root.className = 'lf-accordion';
    
    var items = Array.isArray(content.items) ? content.items : [];
    var openId = items.length > 0 ? items[0].id : null;
    var itemNodes = [];

    items.forEach(function(item) {
      var itemWrap = document.createElement('div');
      itemWrap.className = 'lf-accordion-item';
      itemWrap.style.background = content.itemBgColor || '#ffffff';

      var header = document.createElement('div');
      header.className = 'lf-accordion-header';
      
      var title = document.createElement('span');
      title.textContent = item.title;
      
      var icon = document.createElement('span');
      // basic chevron
      icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>';
      
      header.appendChild(title);
      header.appendChild(icon);

      var contentDiv = document.createElement('div');
      contentDiv.className = 'lf-accordion-content';
      contentDiv.textContent = item.content;

      header.onclick = function() {
        if (openId === item.id && content.allowAllClosed) {
          openId = null;
        } else {
          openId = item.id;
        }
        syncAccordion();
      };

      itemWrap.appendChild(header);
      itemWrap.appendChild(contentDiv);
      root.appendChild(itemWrap);
      
      itemNodes.push({ id: item.id, header: header, contentDiv: contentDiv, icon: icon.querySelector('svg') });
    });

    function syncAccordion() {
      itemNodes.forEach(function(node) {
        var isOpen = node.id === openId;
        node.header.style.background = isOpen ? (content.activeBgColor || '#f8fafc') : 'transparent';
        node.header.style.color = isOpen ? (content.activeColor || '#6c47ff') : (content.titleColor || '#0f172a');
        node.contentDiv.style.display = isOpen ? 'block' : 'none';
        node.contentDiv.style.background = content.activeBgColor || '#f8fafc';
        node.contentDiv.style.color = content.textColor || '#475569';
        if (node.icon) node.icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      });
    }

    syncAccordion();
    return root;
  }

  function renderFlipCard(content) {
    var root = document.createElement('div');
    root.className = 'lf-flipcard';
    
    var inner = document.createElement('div');
    inner.className = 'lf-flipcard-inner';
    
    var front = document.createElement('div');
    front.className = 'lf-flipcard-front';
    front.style.background = content.frontBgColor || '#6c47ff';
    front.style.color = content.frontTextColor || '#ffffff';
    front.style.border = '1px solid ' + (content.borderColor || 'transparent');
    
    var frontTitle = document.createElement('h3');
    frontTitle.style.fontSize = '20px'; frontTitle.style.margin = '0 0 8px 0';
    frontTitle.textContent = content.frontTitle || '';
    
    var frontContent = document.createElement('p');
    frontContent.style.fontSize = '15px'; frontContent.style.margin = '0'; frontContent.style.whiteSpace = 'pre-wrap';
    frontContent.textContent = content.frontContent || '';
    
    if (content.frontTitle) front.appendChild(frontTitle);
    if (content.frontContent) front.appendChild(frontContent);

    var back = document.createElement('div');
    back.className = 'lf-flipcard-back';
    back.style.background = content.backBgColor || '#ffffff';
    back.style.color = content.backTextColor || '#1e293b';
    back.style.border = '1px solid ' + (content.borderColor || '#e2e8f0');
    
    var backTitle = document.createElement('h3');
    backTitle.style.fontSize = '20px'; backTitle.style.margin = '0 0 8px 0';
    backTitle.textContent = content.backTitle || '';
    
    var backContent = document.createElement('p');
    backContent.style.fontSize = '15px'; backContent.style.margin = '0'; backContent.style.whiteSpace = 'pre-wrap';
    backContent.textContent = content.backContent || '';
    
    if (content.backTitle) back.appendChild(backTitle);
    if (content.backContent) back.appendChild(backContent);

    var isVertical = content.flipDirection === 'vertical';
    back.style.transform = isVertical ? 'rotateX(180deg)' : 'rotateY(180deg)';

    inner.appendChild(front);
    inner.appendChild(back);
    root.appendChild(inner);

    var flipped = false;
    root.onclick = function() {
      flipped = !flipped;
      inner.style.transform = flipped ? (isVertical ? 'rotateX(180deg)' : 'rotateY(180deg)') : 'none';
    };

    return root;
  }

  function renderStepper(content) {
    var root = document.createElement('div');
    root.className = 'lf-stepper';
    root.style.background = content.bgColor || '#ffffff';

    var header = document.createElement('div');
    header.className = 'lf-stepper-header';

    var steps = Array.isArray(content.steps) ? content.steps : [];
    var currentIndex = 0;
    var stepNodes = [];
    var lineNodes = [];

    steps.forEach(function(step, idx) {
      var wrap = document.createElement('div');
      wrap.style.display = 'flex'; wrap.style.alignItems = 'center';

      var circle = document.createElement('div');
      circle.className = 'lf-step-circle';
      circle.textContent = String(idx + 1);
      circle.onclick = function() {
        currentIndex = idx;
        syncStepper();
      };
      wrap.appendChild(circle);
      stepNodes.push(circle);

      if (idx < steps.length - 1) {
        var line = document.createElement('div');
        line.className = 'lf-step-line';
        wrap.appendChild(line);
        lineNodes.push(line);
      }
      
      header.appendChild(wrap);
    });

    var cBody = document.createElement('div');
    cBody.className = 'lf-stepper-content';
    
    var cTitle = document.createElement('h3');
    cTitle.style.fontSize = '18px'; cTitle.style.margin = '0 0 12px 0';
    cTitle.style.color = content.titleColor || '#0f172a';
    
    var cText = document.createElement('div');
    cText.style.fontSize = '15px'; cText.style.whiteSpace = 'pre-wrap';
    cText.style.color = content.textColor || '#475569';
    
    cBody.appendChild(cTitle);
    cBody.appendChild(cText);

    var footer = document.createElement('div');
    footer.className = 'lf-stepper-footer';

    var prevBtn = document.createElement('button');
    prevBtn.className = 'lf-stepper-btn';
    prevBtn.textContent = 'Previous';
    prevBtn.onclick = function() { if (currentIndex > 0) { currentIndex--; syncStepper(); } };
    
    var statusText = document.createElement('span');
    statusText.style.fontSize = '13px'; statusText.style.color = '#94a3b8';

    var nextBtn = document.createElement('button');
    nextBtn.className = 'lf-stepper-btn';
    nextBtn.textContent = 'Next';
    nextBtn.onclick = function() { if (currentIndex < steps.length - 1) { currentIndex++; syncStepper(); } };

    footer.appendChild(prevBtn);
    footer.appendChild(statusText);
    footer.appendChild(nextBtn);

    root.appendChild(header);
    root.appendChild(cBody);
    root.appendChild(footer);

    function syncStepper() {
      var activeStep = steps[currentIndex] || {};
      cTitle.textContent = activeStep.title || '';
      cText.textContent = activeStep.content || '';
      statusText.textContent = 'Step ' + (currentIndex + 1) + ' of ' + steps.length;
      
      prevBtn.disabled = currentIndex === 0;
      prevBtn.style.color = currentIndex === 0 ? '#cbd5e1' : '#475569';
      
      var isLast = currentIndex === steps.length - 1;
      nextBtn.disabled = isLast;
      nextBtn.style.background = isLast ? '#e2e8f0' : (content.accentColor || '#6c47ff');
      nextBtn.style.color = isLast ? '#94a3b8' : '#ffffff';
      nextBtn.style.border = isLast ? '1px solid #e2e8f0' : 'none';

      stepNodes.forEach(function(node, j) {
        var isActive = j <= currentIndex;
        node.style.background = isActive ? (content.accentColor || '#6c47ff') : '#f1f5f9';
        node.style.color = isActive ? '#ffffff' : '#64748b';
        node.style.borderColor = isActive ? (content.accentColor || '#6c47ff') : '#e2e8f0';
        node.style.borderStyle = 'solid';
        node.style.borderWidth = '2px';
      });

      lineNodes.forEach(function(line, j) {
        line.style.background = j < currentIndex ? (content.accentColor || '#6c47ff') : '#e2e8f0';
      });
    }

    if (steps.length > 0) syncStepper();

    return root;
  }

  function renderPoll(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.fontFamily = 'system-ui, sans-serif';
    root.style.display = 'flex'; root.style.flexDirection = 'column';
    root.style.padding = '16px'; root.style.boxSizing = 'border-box';
    root.style.background = '#ffffff'; root.style.borderRadius = '8px';
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

    var question = document.createElement('h3');
    question.style.fontSize = '18px'; question.style.margin = '0 0 16px 0';
    question.style.color = '#1e293b'; question.textContent = content.question || 'Poll Question';
    root.appendChild(question);

    var options = content.options || [];
    var totalVotes = 0;
    var votedIndex = -1;
    var optionNodes = [];

    var optsContainer = document.createElement('div');
    optsContainer.style.display = 'flex'; optsContainer.style.flexDirection = 'column'; optsContainer.style.gap = '8px';
    
    options.forEach(function(opt, idx) {
      if (opt.votes) totalVotes += opt.votes;
      var optEl = document.createElement('div');
      optEl.style.position = 'relative'; optEl.style.padding = '12px 16px';
      optEl.style.border = '1px solid #e2e8f0'; optEl.style.borderRadius = '6px';
      optEl.style.cursor = 'pointer'; optEl.style.overflow = 'hidden';
      
      var bgEl = document.createElement('div');
      bgEl.style.position = 'absolute'; bgEl.style.left = '0'; bgEl.style.top = '0'; bgEl.style.bottom = '0';
      bgEl.style.width = '0%'; bgEl.style.background = content.votedColor || '#6c47ff';
      bgEl.style.opacity = '0.15'; bgEl.style.transition = 'width 0.3s ease';
      
      var contentEl = document.createElement('div');
      contentEl.style.position = 'relative'; contentEl.style.display = 'flex'; 
      contentEl.style.justifyContent = 'space-between'; contentEl.style.zIndex = '1';
      contentEl.style.fontSize = '14px'; contentEl.style.color = '#334155';
      
      var labelEl = document.createElement('span'); labelEl.textContent = opt.label;
      var pctEl = document.createElement('span'); pctEl.style.fontWeight = '600'; pctEl.style.display = 'none';
      
      contentEl.appendChild(labelEl); contentEl.appendChild(pctEl);
      optEl.appendChild(bgEl); optEl.appendChild(contentEl);
      
      optEl.onclick = function() {
        if (votedIndex > -1) return;
        votedIndex = idx;
        totalVotes++;
        // client side faked vote
        options[idx] = options[idx] || {};
        options[idx].votes = (options[idx].votes || 0) + 1;
        
        optionNodes.forEach(function(node, j) {
          node.el.style.cursor = 'default';
          var pct = totalVotes > 0 ? Math.round(((options[j].votes || 0) / totalVotes) * 100) : 0;
          node.bg.style.width = pct + '%';
          if (j === votedIndex) {
            node.el.style.border = '1px solid ' + (content.votedColor || '#6c47ff');
          }
          node.pct.textContent = pct + '%';
          node.pct.style.display = 'inline';
        });
      };
      
      optsContainer.appendChild(optEl);
      optionNodes.push({ el: optEl, bg: bgEl, pct: pctEl });
    });
    
    root.appendChild(optsContainer);
    return root;
  }

  function renderLabeledImage(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.position = 'relative'; root.style.background = '#f8fafc';
    root.style.borderRadius = '8px'; root.style.overflow = 'hidden';

    if (content.imageUrl) {
      var img = document.createElement('img');
      img.src = content.imageUrl;
      img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'contain';
      root.appendChild(img);
    } else {
      root.style.display = 'flex'; root.style.alignItems = 'center'; root.style.justifyContent = 'center';
      root.textContent = 'No Image Provided'; root.style.color = '#94a3b8';
    }

    var markersContainer = document.createElement('div');
    markersContainer.style.position = 'absolute'; markersContainer.style.top = '0'; markersContainer.style.left = '0';
    markersContainer.style.width = '100%'; markersContainer.style.height = '100%';

    (content.markers || []).forEach(function(m) {
      var btn = document.createElement('button');
      btn.textContent = '?';
      btn.style.position = 'absolute';
      btn.style.left = Number(m.x || 50) + '%';
      btn.style.top = Number(m.y || 50) + '%';
      btn.style.transform = 'translate(-50%, -50%)';
      btn.style.width = '24px'; btn.style.height = '24px';
      btn.style.borderRadius = '50%'; btn.style.border = 'none';
      btn.style.background = m.color || '#6c47ff'; btn.style.color = '#ffffff';
      btn.style.fontSize = '12px'; btn.style.fontWeight = 'bold';
      btn.style.cursor = 'pointer'; btn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      btn.style.zIndex = '2';
      
      var popover = document.createElement('div');
      popover.style.position = 'absolute'; popover.style.display = 'none';
      popover.style.left = '50%'; popover.style.bottom = '100%';
      popover.style.transform = 'translate(-50%, -8px)';
      popover.style.background = '#1e293b'; popover.style.color = '#ffffff';
      popover.style.padding = '8px 12px'; popover.style.borderRadius = '6px';
      popover.style.fontSize = '13px'; popover.style.whiteSpace = 'nowrap';
      popover.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      popover.style.zIndex = '3';
      popover.textContent = m.label || 'Marker info';
      
      btn.appendChild(popover);
      btn.onmouseenter = function() { popover.style.display = 'block'; };
      btn.onmouseleave = function() { popover.style.display = 'none'; };
      
      markersContainer.appendChild(btn);
    });

    root.appendChild(markersContainer);
    return root;
  }

  function renderMatching(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.background = '#ffffff'; root.style.borderRadius = '8px';
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; root.style.padding = '16px';
    root.style.boxSizing = 'border-box'; root.style.fontFamily = 'system-ui, sans-serif';
    root.style.display = 'flex'; root.style.overflow = 'hidden';

    var containerStyle = 'flex: 1; display: flex; flex-direction: column; gap: 8px; overflow-y: auto;';
    var leftCol = document.createElement('div'); leftCol.style.cssText = containerStyle + ' padding-right: 8px; border-right: 1px solid #e2e8f0;';
    var rightCol = document.createElement('div'); rightCol.style.cssText = containerStyle + ' padding-left: 8px;';

    var pairs = content.pairs || [];
    var selectedLeft = null;
    var matches = {}; // leftId -> rightId
    
    // In pure JS export, we'll rough out a simple click-to-match without SVG lines for brevity
    var rightItems = [...pairs].sort(() => Math.random() - 0.5);
    
    pairs.forEach(function(p, i) {
      var leftBtn = document.createElement('div');
      leftBtn.textContent = p.left || 'A';
      leftBtn.style.padding = '8px 12px'; leftBtn.style.border = '2px solid #e2e8f0'; leftBtn.style.borderRadius = '6px';
      leftBtn.style.cursor = 'pointer'; leftBtn.style.textAlign = 'center'; leftBtn.style.background = '#f8fafc';
      leftBtn.onclick = function() {
        if (matches[i]) return;
        if (selectedLeft === leftBtn) {
           selectedLeft.style.borderColor = '#e2e8f0'; selectedLeft = null;
        } else {
           if (selectedLeft) selectedLeft.style.borderColor = '#e2e8f0';
           selectedLeft = leftBtn; selectedLeft.dataset.index = i;
           selectedLeft.style.borderColor = '#3b82f6';
        }
      };
      leftCol.appendChild(leftBtn);
    });

    rightItems.forEach(function(p, idx) {
      var rightBtn = document.createElement('div');
      rightBtn.textContent = p.right || 'B';
      rightBtn.style.padding = '8px 12px'; rightBtn.style.border = '2px solid #e2e8f0'; rightBtn.style.borderRadius = '6px';
      rightBtn.style.cursor = 'pointer'; rightBtn.style.textAlign = 'center'; rightBtn.style.background = '#f8fafc';
      
      rightBtn.onclick = function() {
        if (!selectedLeft || rightBtn.dataset.matched) return;
        var leftIndex = selectedLeft.dataset.index;
        var expectedRight = pairs[leftIndex].right;
        
        if (p.right === expectedRight) {
           selectedLeft.style.borderColor = '#22c55e'; selectedLeft.style.background = '#dcfce7'; selectedLeft.style.color = '#15803d';
           rightBtn.style.borderColor = '#22c55e'; rightBtn.style.background = '#dcfce7'; rightBtn.style.color = '#15803d';
           rightBtn.dataset.matched = "true";
           matches[leftIndex] = p.right;
           selectedLeft = null;
        } else {
           selectedLeft.style.borderColor = '#ef4444'; selectedLeft.style.background = '#fef2f2'; selectedLeft.style.color = '#b91c1c';
           setTimeout(function() {
             if (matches[leftIndex]) return;
             if (selectedLeft) { selectedLeft.style.borderColor = '#3b82f6'; selectedLeft.style.background = '#f8fafc'; selectedLeft.style.color = 'inherit'; }
           }, 800);
        }
      };
      rightCol.appendChild(rightBtn);
    });

    root.appendChild(leftCol); root.appendChild(rightCol);
    return root;
  }

  function renderSorting(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.background = '#ffffff'; root.style.borderRadius = '8px';
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; root.style.padding = '16px';
    root.style.boxSizing = 'border-box'; root.style.fontFamily = 'system-ui, sans-serif';
    root.style.display = 'flex'; root.style.flexDirection = 'column';
    
    var container = document.createElement('div');
    container.style.flex = '1'; container.style.display = 'flex'; container.style.flexDirection = 'column';
    container.style.gap = '8px'; container.style.overflowY = 'auto';

    var items = [...(content.items || [])].map((item, id) => ({ item, id })).sort(() => Math.random() - 0.5);
    
    var checkBtn = document.createElement('button');
    checkBtn.textContent = 'Check Order';
    checkBtn.style.marginTop = '12px'; checkBtn.style.padding = '8px 16px'; checkBtn.style.border = 'none';
    checkBtn.style.borderRadius = '6px'; checkBtn.style.background = '#6c47ff'; checkBtn.style.color = '#ffffff';
    checkBtn.style.cursor = 'pointer'; checkBtn.style.fontWeight = '500';

    var nodes = [];
    items.forEach(function(obj, idx) {
      var itemEl = document.createElement('div');
      itemEl.textContent = obj.item.label || 'Item';
      itemEl.dataset.originalId = obj.id;
      itemEl.style.padding = '10px 14px'; itemEl.style.background = '#f8fafc'; itemEl.style.border = '1px solid #e2e8f0';
      itemEl.style.borderRadius = '6px'; itemEl.style.cursor = 'grab'; itemEl.style.userSelect = 'none';
      
      // Basic fallback drag behavior for exported HTML
      var startY = 0; var currentY = 0; var dragIndex = -1;
      itemEl.draggable = true;
      itemEl.ondragstart = function(e) { dragIndex = Array.from(container.children).indexOf(itemEl); itemEl.style.opacity = '0.5'; };
      itemEl.ondragend = function(e) { itemEl.style.opacity = '1'; };
      itemEl.ondragover = function(e) { e.preventDefault(); };
      itemEl.ondrop = function(e) {
         e.preventDefault();
         var targetIndex = Array.from(container.children).indexOf(e.currentTarget);
         if (dragIndex === targetIndex) return;
         var draggedNode = container.children[dragIndex];
         if (targetIndex > dragIndex) container.insertBefore(draggedNode, e.currentTarget.nextSibling);
         else container.insertBefore(draggedNode, e.currentTarget);
         
         // Clear statuses
         Array.from(container.children).forEach(n => { n.style.borderColor = '#e2e8f0'; n.style.background = '#f8fafc'; n.style.color = '#0f172a'; });
      };
      
      nodes.push(itemEl);
      container.appendChild(itemEl);
    });

    checkBtn.onclick = function() {
      Array.from(container.children).forEach((node, i) => {
        var ogId = parseInt(node.dataset.originalId);
        if (ogId === i) {
          node.style.borderColor = '#22c55e'; node.style.background = '#dcfce7'; node.style.color = '#15803d';
        } else {
          node.style.borderColor = '#ef4444'; node.style.background = '#fef2f2'; node.style.color = '#b91c1c';
        }
      });
    };

    root.appendChild(container);
    root.appendChild(checkBtn);
    return root;
  }

  function renderCloze(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.background = content.bgColor || '#ffffff'; root.style.color = content.textColor || '#1e293b';
    root.style.borderRadius = (content.borderRadius || 8) + 'px';
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; root.style.padding = '16px';
    root.style.boxSizing = 'border-box'; root.style.fontFamily = 'system-ui, sans-serif';
    root.style.overflowY = 'auto';

    if (content.title) {
       var h3 = document.createElement('h3');
       h3.style.margin = '0 0 12px 0'; h3.style.fontSize = '18px'; h3.style.color = content.titleColor || '#0f172a';
       h3.textContent = content.title;
       root.appendChild(h3);
    }

    var textContainer = document.createElement('div');
    textContainer.style.lineHeight = '1.8'; textContainer.style.marginBottom = '16px';
    textContainer.style.fontSize = (content.fontSize || 16) + 'px';

    var val = content.text || '';
    var regex = /\\[([^\\]]+)\\]/g;
    var lastIdx = 0;
    var match;
    var blanks = [];

    while ((match = regex.exec(val)) !== null) {
      if (match.index > lastIdx) {
        var span = document.createElement('span'); span.textContent = val.substring(lastIdx, match.index);
        textContainer.appendChild(span);
      }
      var input = document.createElement('input');
      input.type = 'text'; input.placeholder = '?'; input.dataset.answer = match[1];
      input.style.border = '1px solid #cbd5e1'; input.style.borderRadius = '4px'; input.style.background = '#f8fafc';
      input.style.padding = '2px 6px'; input.style.fontSize = 'inherit'; input.style.fontFamily = 'inherit';
      input.style.textAlign = 'center'; input.style.color = '#334155'; input.style.margin = '0 4px';
      input.style.width = ((match[1].length * 10) + 16) + 'px';
      blanks.push(input);
      textContainer.appendChild(input);
      lastIdx = regex.lastIndex;
    }
    if (lastIdx < val.length) {
      var spanEnd = document.createElement('span'); spanEnd.textContent = val.substring(lastIdx);
      textContainer.appendChild(spanEnd);
    }
    root.appendChild(textContainer);

    if (content.showCheckBtn !== false) {
      var btn = document.createElement('button');
      btn.textContent = 'Check Answers';
      btn.style.display = 'inline-block'; btn.style.padding = '8px 16px'; btn.style.background = '#6c47ff';
      btn.style.color = 'white'; btn.style.border = 'none'; btn.style.borderRadius = '6px';
      btn.style.fontWeight = '500'; btn.style.cursor = 'pointer';
      btn.onclick = function() {
        blanks.forEach(function(b) {
          if (b.value.trim().toLowerCase() === b.dataset.answer.toLowerCase()) {
            b.style.borderColor = '#10b981'; b.style.background = '#d1fae5';
          } else {
            b.style.borderColor = '#ef4444'; b.style.background = '#fee2e2';
          }
        });
      };
      root.appendChild(btn);
    }

    return root;
  }

  function renderScenario(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.background = content.bgColor || '#f8fafc';
    root.style.borderRadius = (content.borderRadius || 8) + 'px';
    root.style.padding = '16px'; root.style.boxSizing = 'border-box';
    root.style.fontFamily = 'system-ui, sans-serif'; root.style.overflowY = 'auto';
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; root.style.display = 'flex';
    root.style.flexDirection = 'column'; root.style.gap = '12px';

    (content.messages || []).forEach(function(m) {
      var row = document.createElement('div');
      row.style.display = 'flex'; row.style.gap = '10px'; row.style.alignItems = 'flex-start';
      if (m.role === 'user') row.style.flexDirection = 'row-reverse';

      var avatar = document.createElement('div');
      avatar.style.width = '32px'; avatar.style.height = '32px'; avatar.style.borderRadius = '50%';
      avatar.style.color = 'white'; avatar.style.display = 'flex'; avatar.style.alignItems = 'center';
      avatar.style.justifyContent = 'center'; avatar.style.fontSize = '13px'; avatar.style.fontWeight = 'bold';
      avatar.style.flexShrink = '0';
      avatar.style.background = m.role === 'user' ? '#3b82f6' : '#10b981';
      avatar.textContent = m.role === 'user' ? 'U' : 'A';

      var bubble = document.createElement('div');
      bubble.style.padding = '10px 14px'; bubble.style.borderRadius = '12px'; bubble.style.border = '1px solid';
      bubble.style.fontSize = '14px'; bubble.style.color = '#334155'; bubble.style.lineHeight = '1.4';
      bubble.style.maxWidth = '80%';
      bubble.style.background = m.role === 'user' ? '#eff6ff' : '#ffffff';
      bubble.style.borderColor = m.role === 'user' ? '#bfdbfe' : '#e2e8f0';
      if (m.role === 'user') bubble.style.borderTopRightRadius = '2px';
      else bubble.style.borderTopLeftRadius = '2px';
      bubble.textContent = m.text;

      row.appendChild(avatar); row.appendChild(bubble);
      root.appendChild(row);
    });

    return root;
  }

  function renderProgress(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.background = content.bgColor || '#f8fafc';
    root.style.borderRadius = (content.borderRadius || 8) + 'px';
    root.style.padding = '16px'; root.style.boxSizing = 'border-box';
    root.style.fontFamily = 'system-ui, sans-serif'; 
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; 
    root.style.display = 'flex'; root.style.flexDirection = 'column';
    root.style.justifyContent = 'center'; root.style.gap = '8px';

    var header = document.createElement('div');
    header.style.display = 'flex'; header.style.justifyContent = 'space-between'; header.style.alignItems = 'center';
    var title = document.createElement('span');
    title.style.fontWeight = '600'; title.style.fontSize = '14px'; title.style.color = content.titleColor || '#0f172a';
    title.textContent = content.title || 'Your Progress';
    var xp = document.createElement('span');
    xp.style.fontWeight = '700'; xp.style.fontSize = '14px'; xp.style.color = '#fbbf24';
    xp.textContent = (content.mockXP || 350) + ' XP';
    header.appendChild(title); header.appendChild(xp);

    var barBg = document.createElement('div');
    barBg.style.width = '100%'; barBg.style.height = '12px'; barBg.style.background = '#e2e8f0';
    barBg.style.borderRadius = '999px'; barBg.style.overflow = 'hidden';
    var barFill = document.createElement('div');
    barFill.style.height = '100%'; barFill.style.borderRadius = '999px';
    barFill.style.background = content.fillColor || '#10b981';
    barFill.style.width = (content.mockPercent || 65) + '%';
    barBg.appendChild(barFill);

    var footer = document.createElement('div');
    footer.style.fontSize = '12px'; footer.style.textAlign = 'right'; footer.style.color = content.textColor || '#64748b';
    var p = content.mockPercent || 65;
    footer.textContent = 'Level ' + (content.mockLevel || 4) + ' · ' + (100 - p) + '% to next level';

    root.appendChild(header); root.appendChild(barBg); root.appendChild(footer);
    return root;
  }

  function bindInteractions(wrapper, interactions) {
    if (!interactions.length) return;

    wrapper._lfLoadInteractions = interactions.filter(function (interaction) {
      return interaction && interaction.trigger === 'load';
    });

    interactions.forEach(function (interaction) {
      if (!interaction || !interaction.action) return;
      if (interaction.trigger === 'click') {
        wrapper.addEventListener('click', function (event) {
          if (event.target.closest('.lf-button')) return;
          runAction(interaction.action, interaction.value, wrapper);
        });
      }
      if (interaction.trigger === 'hover') {
        wrapper.addEventListener('mouseenter', function () {
          runAction(interaction.action, interaction.value, wrapper);
        });
      }
    });
  }

  function cssEscape(value) {
    if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
      return CSS.escape(String(value));
    }
    return String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
  }
})();
`}async function B(){return L("html")}async function a(){return L("iframe")}async function T(){return L("pdf")}async function L(Y="html"){var je,ne,fe;const m=p.value;if(!m)return;k.value="processing";const F=Y==="pdf"&&typeof window<"u"?window.open("","_blank"):null;if(Y==="pdf"&&!F){k.value="error",setTimeout(()=>k.value="",3e3);return}const ae=Y==="pdf"?null:new ti,oe=ae?ae.folder("assets"):null;let ke=0;async function O(se,ge="media"){if((!se||se.startsWith("data:")||se.startsWith("http://localhost")||se.startsWith("blob:"))&&se.startsWith("data:"))return se;try{const re=await(await fetch(se)).blob();if(Y==="pdf")return await V(re);let I="bin";const $=re.type;if($.includes("image/png")?I="png":$.includes("image/jpeg")?I="jpg":$.includes("image/gif")?I="gif":$.includes("image/svg")?I="svg":$.includes("image/webp")?I="webp":$.includes("video/mp4")?I="mp4":$.includes("audio/mpeg")&&(I="mp3"),I==="bin"){const g=se.match(/\\.([a-zA-Z0-9]+)(\\?.*)?$/);g&&(I=g[1])}ke++;const q=`${ge}_${ke}.${I}`;return oe.file(q,re),`assets/${q}`}catch(Pe){return console.warn("Could not fetch asset:",se,Pe),se}}const U=JSON.parse(JSON.stringify([...m.slides||[]])).sort((se,ge)=>(se.order??0)-(ge.order??0));if(H.value)for(const se of U){se.backgroundType==="image"&&se.backgroundImage&&(se.backgroundImage=await O(se.backgroundImage,"bg"));for(const ge of se.elements||[])ge.type==="image"&&((je=ge.content)!=null&&je.src)&&(ge.content.src=await O(ge.content.src,"img")),ge.type==="video"&&((ne=ge.content)!=null&&ne.src)&&!ge.content.src.includes("youtube")&&!ge.content.src.includes("youtu.be")&&(ge.content.src=await O(ge.content.src,"vid")),ge.type==="audio"&&((fe=ge.content)!=null&&fe.src)&&(ge.content.src=await O(ge.content.src,"aud"))}const pe=G(f.value||m.name||"presentation"),be={name:m.name,theme:m.theme||{},settings:m.settings||{},slides:U},le=JSON.stringify(be).replace(/</g,"\\u003c").replace(/>/g,"\\u003e").replace(/&/g,"\\u0026"),we=me(m.theme,m.settings,Y),C=N(Y),j=`<script id="lf-data" type="application/json">${le}<\/script>`,K=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${pe}</title>
${Y==="pdf"?`<style>${we}</style>`:'<link rel="stylesheet" href="style.css">'}
</head>
<body class="${Y==="iframe"?"is-iframe":Y==="pdf"?"is-pdf":""}">
<div class="lf-shell">
<div class="progress" id="progress"></div>
<div class="lf-grid"></div>
<div class="lf-stage-shell">
  <div class="presentation" id="presentation"></div>
</div>
<div class="dot-nav" id="dot-nav"></div>
<nav class="nav">
  <button class="nav-btn" id="prev-btn" type="button">← Prev</button>
  <span class="nav-counter" id="counter">1 / ${U.length}</span>
  <button class="nav-btn" id="next-btn" type="button">Next →</button>
</nav>
</div>
${j}
${Y!=="pdf"?'<script src="script.js"><\/script>':`<script>${C}<\/script>`}
</body>
</html>`;if(Y==="pdf"){F.document.open(),F.document.write(K),F.document.close(),k.value="success",setTimeout(()=>k.value="",3e3);return}ae.file("index.html",K),ae.file("style.css",we),ae.file("script.js",C);const xe=await ae.generateAsync({type:"blob"}),ze=URL.createObjectURL(xe),Ie=document.createElement("a");Ie.href=ze,Ie.download=`${pe}.zip`,Ie.click(),URL.revokeObjectURL(ze),k.value="success",setTimeout(()=>k.value="",3e3)}return(Y,m)=>(l(),Je(yl,{title:"Export Project",size:"md",onClose:m[13]||(m[13]=F=>E(r).showExportModal=!1)},{footer:ut(()=>[e("button",{class:"btn btn-secondary",onClick:m[12]||(m[12]=F=>E(r).showExportModal=!1)},"Close")]),default:ut(()=>{var F,ae,oe,ke,O;return[E(c).user?(l(),i(te,{key:1},[e("div",gb,[e("button",{class:X(["tab-btn",h.value==="json"&&"active"]),onClick:m[2]||(m[2]=U=>h.value="json")},"JSON",2),e("button",{class:X(["tab-btn",h.value==="html"&&"active"]),onClick:m[3]||(m[3]=U=>h.value="html")},"HTML",2),e("button",{class:X(["tab-btn",h.value==="iframe"&&"active"]),onClick:m[4]||(m[4]=U=>h.value="iframe")},"Iframe",2),e("button",{class:X(["tab-btn",h.value==="pdf"&&"active"]),onClick:m[5]||(m[5]=U=>h.value="pdf")},"PDF",2),e("button",{class:X(["tab-btn",h.value==="scorm"&&"active"]),onClick:m[6]||(m[6]=U=>h.value="scorm")},"SCORM",2)]),e("div",mb,[h.value==="json"?(l(),i(te,{key:0},[m[24]||(m[24]=e("div",{class:"export-info"},[e("div",{class:"export-icon"},"📦"),e("div",null,[e("h4",null,"JSON Project File"),e("p",null,"Export your complete project as a JSON file. Use this to back up your work, share it with collaborators, or import it into another MediaSurf instance.")])],-1)),e("div",bb,[e("div",yb,[m[19]||(m[19]=e("label",{style:{display:"block","margin-bottom":"4px","font-size":"13px","font-weight":"600",color:"#333"}},"File Name",-1)),ce(e("input",{type:"text","onUpdate:modelValue":m[7]||(m[7]=U=>f.value=U),class:"inp",placeholder:"My Presentation",style:{width:"100%",padding:"8px","border-radius":"6px",border:"1px solid #ddd"}},null,512),[[Se,f.value]])])]),e("div",hb,[e("div",xb,[m[20]||(m[20]=e("span",null,"Project",-1)),e("strong",null,w((F=p.value)==null?void 0:F.name),1)]),e("div",kb,[m[21]||(m[21]=e("span",null,"Slides",-1)),e("strong",null,w(((oe=(ae=p.value)==null?void 0:ae.slides)==null?void 0:oe.length)||0),1)]),e("div",wb,[m[22]||(m[22]=e("span",null,"Elements",-1)),e("strong",null,w(((O=(ke=p.value)==null?void 0:ke.slides)==null?void 0:O.reduce((U,pe)=>{var be;return U+(((be=pe.elements)==null?void 0:be.length)||0)},0))||0),1)])]),e("button",{class:"btn btn-primary export-btn",onClick:ie},[...m[23]||(m[23]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e("polyline",{points:"7 10 12 15 17 10"}),e("line",{x1:"12",y1:"15",x2:"12",y2:"3"})],-1),ee(" Download JSON ",-1)])])],64)):h.value==="html"?(l(),i(te,{key:1},[m[28]||(m[28]=e("div",{class:"export-info"},[e("div",{class:"export-icon"},"🌐"),e("div",null,[e("h4",null,"Standalone HTML Package"),e("p",null,"Export as a self-contained HTML file that works in any browser. Includes all slides, interactions, and quiz functionality. No internet connection required.")])],-1)),e("div",Cb,[e("div",Sb,[m[25]||(m[25]=e("label",{style:{display:"block","margin-bottom":"4px","font-size":"13px","font-weight":"600",color:"#333"}},"Package Name",-1)),ce(e("input",{type:"text","onUpdate:modelValue":m[8]||(m[8]=U=>f.value=U),class:"inp",placeholder:"My Presentation",style:{width:"100%",padding:"8px","border-radius":"6px",border:"1px solid #ddd"}},null,512),[[Se,f.value]])]),e("label",$b,[ce(e("input",{type:"checkbox","onUpdate:modelValue":m[9]||(m[9]=U=>H.value=U)},null,512),[[Nt,H.value]]),m[26]||(m[26]=ee(" Download external assets (Images/Audio/Video) locally for offline use ",-1))])]),m[29]||(m[29]=e("div",{class:"export-features"},[e("div",{class:"feature-item"},"✓ Keyboard navigation (arrow keys)"),e("div",{class:"feature-item"},"✓ Click-to-reveal hotspots"),e("div",{class:"feature-item"},"✓ Interactive quizzes with feedback"),e("div",{class:"feature-item"},"✓ Progress bar"),e("div",{class:"feature-item"},"✓ Responsive scaling"),e("div",{class:"feature-item"},"✓ YouTube/Vimeo video embeds")],-1)),e("button",{class:"btn btn-primary export-btn",onClick:B},[...m[27]||(m[27]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e("polyline",{points:"7 10 12 15 17 10"}),e("line",{x1:"12",y1:"15",x2:"12",y2:"3"})],-1),ee(" Download HTML ",-1)])])],64)):h.value==="iframe"?(l(),i(te,{key:2},[m[33]||(m[33]=e("div",{class:"export-info"},[e("div",{class:"export-icon"},"???"),e("div",null,[e("h4",null,"Iframe Package"),e("p",null,"Export a lightweight package optimized for embedding in other sites via an iframe. Strips out outer backgrounds and fits precisely.")])],-1)),e("div",Ib,[e("div",Eb,[m[30]||(m[30]=e("label",{style:{display:"block","margin-bottom":"4px","font-size":"13px","font-weight":"600",color:"#333"}},"Package Name",-1)),ce(e("input",{type:"text","onUpdate:modelValue":m[10]||(m[10]=U=>f.value=U),class:"inp",placeholder:"My Presentation",style:{width:"100%",padding:"8px","border-radius":"6px",border:"1px solid #ddd"}},null,512),[[Se,f.value]])]),e("label",Ab,[ce(e("input",{type:"checkbox","onUpdate:modelValue":m[11]||(m[11]=U=>H.value=U)},null,512),[[Nt,H.value]]),m[31]||(m[31]=ee(" Download external assets locally ",-1))])]),e("button",{class:"btn btn-primary export-btn",onClick:a},[...m[32]||(m[32]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e("polyline",{points:"7 10 12 15 17 10"}),e("line",{x1:"12",y1:"15",x2:"12",y2:"3"})],-1),ee(" Download Iframe Zip ",-1)])])],64)):h.value==="pdf"?(l(),i(te,{key:3},[m[35]||(m[35]=e("div",{class:"export-info"},[e("div",{class:"export-icon"},"??"),e("div",null,[e("h4",null,"PDF Document"),e("p",null,"Generate a printable, static PDF version of all slides. Converts perfectly to a standard presentation handout.")])],-1)),m[36]||(m[36]=e("p",{style:{"margin-bottom":"20px","font-size":"13px",color:"#666"}},`This will open the presentation in a new printable window. Just use your browser's Print dialog and select "Save as PDF".`,-1)),e("button",{class:"btn btn-primary export-btn",onClick:T},[...m[34]||(m[34]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e("polyline",{points:"7 10 12 15 17 10"}),e("line",{x1:"12",y1:"15",x2:"12",y2:"3"})],-1),ee(" Generate PDF ",-1)])])],64)):h.value==="scorm"?(l(),i(te,{key:4},[m[40]||(m[40]=e("div",{class:"export-info"},[e("div",{class:"export-icon"},"🎓"),e("div",null,[e("h4",null,"SCORM Package"),e("p",null,"Export as a SCORM 1.2 / xAPI compatible package for LMS platforms like Moodle, Blackboard, and Canvas.")])],-1)),e("div",Mb,[(l(),i("svg",Pb,[...m[37]||(m[37]=[e("circle",{cx:"12",cy:"12",r:"10"},null,-1),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"},null,-1),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"},null,-1)])])),m[38]||(m[38]=e("h4",null,"Coming Soon",-1)),m[39]||(m[39]=e("p",null,"SCORM export is planned for a future release. Use the HTML export for now and embed it via iframe in your LMS.",-1))])],64)):R("",!0),ht(Bt,{name:"fade"},{default:ut(()=>[k.value==="processing"?(l(),i("div",Tb,[...m[41]||(m[41]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",class:"spin",stroke:"currentColor","stroke-width":"2.5"},[e("path",{d:"M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"})],-1),ee(" Generating package... Please wait. ",-1)])])):k.value==="success"?(l(),i("div",Bb,[...m[42]||(m[42]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("polyline",{points:"20 6 9 17 4 12"})],-1),ee(" Export successful! Check your downloads folder. ",-1)])])):R("",!0)]),_:1})])],64)):(l(),i("div",pb,[(l(),i("svg",vb,[...m[14]||(m[14]=[e("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"},null,-1),e("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"},null,-1)])])),m[17]||(m[17]=e("h3",{style:{"font-size":"20px","font-weight":"600","margin-bottom":"8px"}},"Sign up to export",-1)),m[18]||(m[18]=e("p",{style:{"font-size":"14px",color:"#64748b","margin-bottom":"32px"}},"Create a free account to export, save, and share your presentations.",-1)),e("div",fb,[e("button",{class:"btn btn-secondary",style:{width:"100%","justify-content":"center",gap:"8px"},onClick:m[0]||(m[0]=U=>E(c).loginWithGoogle())},[...m[15]||(m[15]=[e("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("path",{d:"M12 8v8m-4-4h8"})],-1),ee(" Continue with Google ",-1)])]),e("button",{class:"btn btn-secondary",style:{width:"100%","justify-content":"center",gap:"8px"},onClick:m[1]||(m[1]=U=>E(c).loginWithMicrosoft())},[...m[16]||(m[16]=[e("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("rect",{x:"3",y:"3",width:"7",height:"7"}),e("rect",{x:"14",y:"3",width:"7",height:"7"}),e("rect",{x:"14",y:"14",width:"7",height:"7"}),e("rect",{x:"3",y:"14",width:"7",height:"7"})],-1),ee(" Continue with Microsoft ",-1)])])])]))]}),_:1}))}},zb=Xe(Nb,[["__scopeId","data-v-e55467ab"]]),Lb={key:0,class:"editor-view"},jb={class:"editor-topbar"},_b={class:"topbar-left"},Db={class:"project-name-wrap"},qb=["value"],Rb={class:"save-label"},Ob={class:"topbar-center"},Fb={key:0,class:"slide-position"},Ub={class:"topbar-right"},Vb={class:"editor-body"},Wb={class:"authoring-rail"},Gb=["onClick","data-tooltip"],Hb={key:0,class:"rail-icon"},Yb={key:1,class:"rail-icon"},Jb={key:2,class:"rail-icon"},Qb={key:3,class:"rail-icon"},Xb={key:4,class:"rail-icon"},Kb={key:5,class:"rail-icon"},Zb={key:6,class:"rail-icon"},ey={key:7,class:"rail-icon"},ty={key:8,class:"rail-icon"},oy={key:9,class:"rail-icon"},ny={class:"right-panel"},ly={class:"panel-tabs"},iy=["onClick","data-tooltip"],ay={class:"tab-icon"},sy={class:"tab-label"},ry={class:"panel-content"},dy={key:1,class:"editor-not-found"},uy={__name:"EditorView",setup(A){const r=Al(),u=El(),c=it(),p=at(),h=wl(),k=P(()=>r.params.id),f=P(()=>p.getProject(k.value)),H=P(()=>zt(f.value)),ie=P(()=>{var I;return[...((I=f.value)==null?void 0:I.slides)||[]].sort(($,q)=>$.order-q.order)}),G=z(null),V=z(!1),me=z("deck"),{aiStore:N,showAIModal:B,aiMode:a,aiTopic:T,aiContext:L,aiProjectName:Y,aiSlideCount:m,aiQuestionCount:F,aiDifficulty:ae,aiQuestionType:oe,aiCreationError:ke,aiSubmitting:O,aiProjectNamePlaceholder:U,aiPrimaryActionLabel:pe,openAICreationModal:be,createAIProject:le}=Pl({onRequireAuth:()=>u.push({name:"dashboard"})});let we=!1,C=null;Qe(()=>f.value,I=>{if(I){if(we){we=!1;return}C&&clearTimeout(C),C=setTimeout(()=>{c.pushHistory(I)},600)}},{deep:!0}),Qe(()=>h.isAuthReady,async I=>{var $;if(I){if(($=h.user)!=null&&$.uid&&await p.ensureRemoteProjectsLoaded(),!f.value){u.push({name:"dashboard"});return}c.setProject(k.value),ie.value.length>0&&c.setCurrentSlide(ie.value[0].id),c.pushHistory(f.value)}},{immediate:!0});const j=P(()=>{const I=f.value;return I?`Saved ${new Date(I.updatedAt).toLocaleTimeString()}`:""}),D=P(()=>{switch(c.rightPanelTab){case"layers":return"layers";case"ai":return"ai";case"theme":return"theme";default:return"properties"}});oi({undo:()=>{if(c.canUndo()){const I=c.undo();I&&(we=!0,p.updateProject(k.value,I))}},redo:()=>{if(c.canRedo()){const I=c.redo();I&&(we=!0,p.updateProject(k.value,I))}},delete:()=>{c.selectedElementId&&(p.deleteElement(c.projectId,c.currentSlideId,c.selectedElementId),c.clearSelection())},escape:()=>{c.clearSelection(),c.setActiveTool("select")},copy:()=>{var $,q,g,_e;const I=(_e=(g=(q=($=f.value)==null?void 0:$.slides)==null?void 0:q.find(qe=>qe.id===c.currentSlideId))==null?void 0:g.elements)==null?void 0:_e.find(qe=>qe.id===c.selectedElementId);I&&c.setClipboard(I)},paste:()=>{if(c.clipboard&&c.currentSlideId){const I=c.clipboard;p.addElement(c.projectId,c.currentSlideId,I.type,{...I,x:I.x+20,y:I.y+20,id:void 0})}},duplicate:()=>{if(c.selectedElementId){const I=p.duplicateElement(c.projectId,c.currentSlideId,c.selectedElementId);I&&c.selectElement(I.id)}},zoomIn:()=>c.zoomIn(),zoomOut:()=>c.zoomOut(),zoomReset:()=>c.zoomReset(),toggleGrid:()=>c.toggleGrid(),nudge:(I,$)=>{var g,_e,qe,Le;if(!c.selectedElementId)return;const q=(Le=(qe=(_e=(g=f.value)==null?void 0:g.slides)==null?void 0:_e.find(Ce=>Ce.id===c.currentSlideId))==null?void 0:qe.elements)==null?void 0:Le.find(Ce=>Ce.id===c.selectedElementId);q&&p.updateElement(c.projectId,c.currentSlideId,c.selectedElementId,{x:q.x+I,y:q.y+$})},selectAll:()=>{var $,q,g;(((g=(q=($=f.value)==null?void 0:$.slides)==null?void 0:q.find(_e=>_e.id===c.currentSlideId))==null?void 0:g.elements)||[]).forEach((_e,qe)=>c.selectElement(_e.id,qe>0))}});function K(){u.push({name:"dashboard"})}function xe(){u.push({name:"preview",params:{id:k.value},query:{from:"editor"}})}function ze(I="deck"){me.value=I,V.value=!0}function Ie(){V.value=!1,be(me.value)}function je(I,$="Image"){if(!c.projectId||!c.currentSlideId||!I)return;const q=new Image;q.onload=()=>{const qe=Math.min(420/q.width,280/q.height,1),Le=Math.max(120,Math.round(q.width*qe)),Ce=Math.max(80,Math.round(q.height*qe)),Te=Math.max(24,Math.round((H.value.width-Le)/2)),st=Math.max(24,Math.round((H.value.height-Ce)/2)),tt=p.addElement(c.projectId,c.currentSlideId,"image",{x:Te,y:st,width:Le,height:Ce,content:{src:I,alt:$,objectFit:"cover"}});tt&&(c.selectElement(tt.id),c.setRightPanel("properties"),c.setActiveTool("select"))},q.src=I}function ne(I){const[$]=Array.from(I.target.files||[]);if(!$||!$.type.startsWith("image/"))return;const q=new FileReader;q.onload=()=>je(String(q.result||""),$.name),q.readAsDataURL($),I.target.value=""}function fe(){var I;(I=G.value)==null||I.click()}const se=[{id:"text",label:"Text"},{id:"blocks",label:"Blocks"},{id:"resources",label:"Resources"},{id:"interactive-elements",label:"Interactive elements"},{id:"interactive-questions",label:"Interactive questions"},{id:"widgets",label:"Widgets"},{id:"insert",label:"Insert"},{id:"style",label:"Style"},{id:"background",label:"Background"},{id:"pages",label:"Pages"}];function ge(I){if(I==="text"){c.setActiveTool("text");return}if(I==="blocks"){c.toggleSlidePanel("blocks");return}if(I==="resources"){c.setActiveTool("image");return}if(I==="interactive-elements"){c.setActiveTool("hotspot");return}if(I==="interactive-questions"){c.setActiveTool("quiz");return}if(I==="widgets"){c.setActiveTool("shape");return}if(I==="insert"){fe();return}if(I==="style"){c.setRightPanel("properties");return}if(I==="background"){c.clearSelection(),c.setRightPanel("properties");return}I==="pages"&&c.toggleSlidePanel("slides")}function Pe(I){return I==="text"?["text","heading"].includes(c.activeTool):I==="blocks"?c.showSlidePanel&&c.leftPanelTab==="blocks":I==="resources"?c.activeTool==="image":I==="interactive-elements"?["hotspot","button"].includes(c.activeTool):I==="interactive-questions"?c.activeTool==="quiz":I==="widgets"?["shape","video","audio","chart"].includes(c.activeTool):I==="insert"?!1:I==="style"||I==="background"?c.rightPanelTab==="properties":I==="pages"?c.showSlidePanel:!1}function re(){Nl({showProgress:!0,animate:!0,overlayColor:"rgba(15, 23, 42, 0.65)",popoverClass:"app-walkthrough-theme",steps:[{popover:{title:"Welcome to the Editor! 🎨",description:"This is where the magic happens. Let us take a quick tour so you know where everything is."}},{element:"#tour-export-btn",popover:{title:"Export Your Project",description:"When you are finished creating, hit Export to publish your work and share it with the world.",side:"bottom",align:"end"}},{element:".authoring-rail",popover:{title:"Authoring Tools",description:"Drag and drop text, interactive hotspots, quizzes, and multimedia directly onto your canvas.",side:"right",align:"start"}},{element:".topbar-center",popover:{title:"Slide Navigation",description:"Keep track of exactly which slide you are editing. You can add more from the Pages tab later.",side:"bottom",align:"center"}}],onDestroyed:()=>{localStorage.setItem("hasSeenWalkthrough","true")}}).drive()}return Qe(()=>f.value,I=>{I&&!localStorage.getItem("hasSeenWalkthrough")&&setTimeout(()=>{re()},100)},{immediate:!0}),(I,$)=>f.value?(l(),i("div",Lb,[e("input",{ref_key:"imageInputRef",ref:G,type:"file",accept:"image/*",class:"sr-only",onChange:ne},null,544),e("header",jb,[e("div",_b,[e("button",{class:"btn btn-ghost btn-sm back-btn",onClick:K,"data-tooltip":"Return to dashboard","data-tooltip-position":"bottom"},[...$[14]||($[14]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M19 12H5M12 19l-7-7 7-7"})],-1),ee(" Dashboard ",-1)])]),e("div",Db,[e("input",{value:f.value.name,class:"project-name-input",onChange:$[0]||($[0]=q=>E(p).updateProject(k.value,{name:q.target.value}))},null,40,qb)]),e("span",Rb,w(j.value),1)]),e("div",Ob,[E(c).currentSlideId?(l(),i("span",Fb," Slide "+w(ie.value.findIndex(q=>q.id===E(c).currentSlideId)+1)+" of "+w(ie.value.length),1)):R("",!0)]),e("div",Ub,[e("button",{class:"btn btn-ghost btn-sm",onClick:re,"data-tooltip":"Show Help","data-tooltip-position":"bottom"},[...$[15]||($[15]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),e("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})],-1),ee(" Help ",-1)])]),e("button",{class:X(["btn btn-ghost btn-sm",E(c).showAIPanel&&"active-btn"]),onClick:$[1]||($[1]=q=>{E(c).showAIPanel=!E(c).showAIPanel,E(c).setRightPanel("ai")}),"data-tooltip":"Open AI assistant","data-tooltip-position":"bottom"},[...$[16]||($[16]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})],-1),ee(" AI ",-1)])],2),e("button",{class:"btn btn-ghost btn-sm",onClick:$[2]||($[2]=q=>{E(c).showThemeManager=!E(c).showThemeManager,E(c).setRightPanel("theme")}),"data-tooltip":"Open theme controls","data-tooltip-position":"bottom"},[...$[17]||($[17]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("path",{d:"M12 8v4m0 4h.01"})],-1),ee(" Theme ",-1)])]),e("button",{class:"btn btn-secondary btn-sm",onClick:xe,"data-tooltip":"Preview your project","data-tooltip-position":"bottom"},[...$[18]||($[18]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polygon",{points:"5 3 19 12 5 21 5 3"})],-1),ee(" Preview ",-1)])]),e("button",{id:"tour-export-btn",class:"btn btn-primary btn-sm",onClick:$[3]||($[3]=q=>E(c).showExportModal=!0),"data-tooltip":"Export or publish","data-tooltip-position":"bottom"},[...$[19]||($[19]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e("polyline",{points:"7 10 12 15 17 10"}),e("line",{x1:"12",y1:"15",x2:"12",y2:"3"})],-1),ee(" Export ",-1)])])])]),ht(bf,{onOpenAiProject:ze}),e("div",Vb,[e("aside",Wb,[(l(),i(te,null,ue(se,q=>e("button",{key:q.id,class:X(["rail-option",Pe(q.id)&&"active"]),onClick:g=>ge(q.id),"data-tooltip":q.label,"data-tooltip-position":"right"},[q.id==="text"?(l(),i("span",Hb,"T")):q.id==="blocks"?(l(),i("span",Yb,[...$[20]||($[20]=[et('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-902e6311><rect x="3" y="4" width="8" height="7" rx="1.5" data-v-902e6311></rect><rect x="13" y="4" width="8" height="5" rx="1.5" data-v-902e6311></rect><rect x="3" y="13" width="8" height="7" rx="1.5" data-v-902e6311></rect><rect x="13" y="11" width="8" height="9" rx="1.5" data-v-902e6311></rect></svg>',1)])])):q.id==="resources"?(l(),i("span",Jb,[...$[21]||($[21]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),e("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),e("polyline",{points:"21 15 16 10 5 21"})],-1)])])):q.id==="interactive-elements"?(l(),i("span",Qb,[...$[22]||($[22]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})],-1)])])):q.id==="interactive-questions"?(l(),i("span",Xb,[...$[23]||($[23]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),e("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})],-1)])])):q.id==="widgets"?(l(),i("span",Kb,[...$[24]||($[24]=[et('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-902e6311><rect x="3" y="3" width="7" height="7" data-v-902e6311></rect><rect x="14" y="3" width="7" height="7" data-v-902e6311></rect><rect x="14" y="14" width="7" height="7" data-v-902e6311></rect><rect x="3" y="14" width="7" height="7" data-v-902e6311></rect></svg>',1)])])):q.id==="insert"?(l(),i("span",Zb,[...$[25]||($[25]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e("line",{x1:"5",y1:"12",x2:"19",y2:"12"})],-1)])])):q.id==="style"?(l(),i("span",ey,[...$[26]||($[26]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"})],-1)])])):q.id==="background"?(l(),i("span",ty,[...$[27]||($[27]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),e("line",{x1:"3",y1:"9",x2:"21",y2:"9"}),e("line",{x1:"9",y1:"21",x2:"9",y2:"9"})],-1)])])):q.id==="pages"?(l(),i("span",oy,[...$[28]||($[28]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),e("polyline",{points:"13 2 13 9 20 9"})],-1)])])):R("",!0),ee(" "+w(q.label),1)],10,Gb)),64))]),ht(Bt,{name:"side-panel-slide"},{default:ut(()=>[E(c).showSlidePanel&&E(c).leftPanelTab==="slides"?(l(),Je(bi,{key:0})):R("",!0)]),_:1}),ht(Bt,{name:"side-panel-slide"},{default:ut(()=>[E(c).showSlidePanel&&E(c).leftPanelTab==="blocks"?(l(),Je(Wi,{key:0})):R("",!0)]),_:1}),ht(m1),e("aside",ny,[e("div",ly,[(l(),i(te,null,ue([{id:"properties",label:"Props",icon:"⚙"},{id:"layers",label:"Layers",icon:"◧"},{id:"ai",label:"AI",icon:"✦"},{id:"theme",label:"Theme",icon:"🎨"}],q=>e("button",{key:q.id,class:X(["panel-tab",E(c).rightPanelTab===q.id&&"active"]),onClick:g=>E(c).setRightPanel(q.id),"data-tooltip":`Open ${q.label}`,"data-tooltip-position":"bottom"},[e("span",ay,w(q.icon),1),e("span",sy,w(q.label),1)],10,iy)),64))]),e("div",ry,[ht(Bt,{name:"editor-panel-switch",mode:"out-in"},{default:ut(()=>[(l(),i("div",{key:D.value,class:"panel-content-view"},[E(c).rightPanelTab==="properties"?(l(),Je(Dv,{key:0})):E(c).rightPanelTab==="layers"?(l(),Je(pa,{key:1})):E(c).rightPanelTab==="ai"?(l(),Je(zm,{key:2})):E(c).rightPanelTab==="theme"?(l(),Je(cb,{key:3})):R("",!0)]))]),_:1})])])]),E(c).showExportModal?(l(),Je(zb,{key:0})):R("",!0),V.value?(l(),Je(Tl,{key:1,title:"Create a New AI Project",message:"Your current project stays saved. When the AI finishes, the editor will switch to the new generated project.","confirm-label":"Continue",onClose:$[4]||($[4]=q=>V.value=!1),onConfirm:Ie})):R("",!0),E(B)?(l(),Je(Bl,{key:2,mode:E(a),topic:E(T),context:E(L),"project-name":E(Y),"slide-count":E(m),"question-count":E(F),difficulty:E(ae),"question-type":E(oe),"project-name-placeholder":E(U),"primary-action-label":E(pe),"creation-error":E(ke),"is-submitting":E(O),"is-generating":E(N).isGenerating,"has-api-key":!!E(N).apiKey,onClose:$[5]||($[5]=q=>B.value=!1),onCreate:E(le),"onUpdate:mode":$[6]||($[6]=q=>a.value=q),"onUpdate:topic":$[7]||($[7]=q=>T.value=q),"onUpdate:context":$[8]||($[8]=q=>L.value=q),"onUpdate:projectName":$[9]||($[9]=q=>Y.value=q),"onUpdate:slideCount":$[10]||($[10]=q=>m.value=q),"onUpdate:questionCount":$[11]||($[11]=q=>F.value=q),"onUpdate:difficulty":$[12]||($[12]=q=>ae.value=q),"onUpdate:questionType":$[13]||($[13]=q=>oe.value=q)},null,8,["mode","topic","context","project-name","slide-count","question-count","difficulty","question-type","project-name-placeholder","primary-action-label","creation-error","is-submitting","is-generating","has-api-key","onCreate"])):R("",!0)])):(l(),i("div",dy,[$[29]||($[29]=e("h2",null,"Project not found",-1)),$[30]||($[30]=e("p",null,"This project may have been deleted or the link is invalid.",-1)),e("button",{class:"btn btn-primary",onClick:K},"Go to Dashboard")]))}},yy=Xe(uy,[["__scopeId","data-v-902e6311"]]);export{yy as default};
