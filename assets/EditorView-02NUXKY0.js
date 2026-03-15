import{L as fl,Q as gl,v as l,x as i,y as e,A as w,I as ee,J as de,H as Oe,z as Q,u as E,R as ce,N as et,E as q,M as Z,D as Je,S as ml,f as M,r as L,O as ue,P as Se,C as ut,U as Nt,w as Qe,B as ft,n as bl,i as Cl,V as Sl,T as Bt,W as Pt,F as $l,p as Il,K as pl,X as El}from"./vue-core-Bt_JLBcX.js";import{d as Al,u as Tl}from"./vue-ecosystem-ClgoPW63.js";import{u as it,M as yl,c as Ml,a as Pl,C as Bl,A as Nl,b as zl}from"./ConfirmActionModal-ALoO9Oow.js";import{u as at,b as Ll,g as zt,C as Wt,c as jl,n as _l,p as Dl,s as ql,m as hl,f as xl,d as kl,e as Rl,h as Gt,B as Ol,i as Fl,j as Ul,k as vl,a as wl}from"./projectStore-9jB_d_g1.js";import{_ as Xe,T as Vl}from"./index-D_RUPCS8.js";import{P as Wl,S as Gl,C as Hl,a as Yl,M as Jl,_ as Ql,b as Xl,c as Kl,F as Zl,A as ei,T as ti,d as oi}from"./ProgressElement-D_COqVAV.js";import{J as ni}from"./jszip-529iNPX7.js";function li(A){function r(u){var g,G,le,W,U,me,z,B,a,P,N,H,m,O,ie,te,ke;const p=u.ctrlKey||u.metaKey,v=u.key.toLowerCase(),h=u.target.tagName.toLowerCase(),k=h==="input"||h==="textarea"||u.target.isContentEditable;k&&p&&["c","v","x","a","z","y"].includes(v)||(p&&v==="z"&&!u.shiftKey?(u.preventDefault(),(g=A.undo)==null||g.call(A)):p&&(v==="y"||v==="z"&&u.shiftKey)?(u.preventDefault(),(G=A.redo)==null||G.call(A)):p&&v==="c"?(u.preventDefault(),(le=A.copy)==null||le.call(A)):p&&v==="v"?(u.preventDefault(),(W=A.paste)==null||W.call(A)):p&&v==="x"?(u.preventDefault(),(U=A.cut)==null||U.call(A)):p&&v==="d"?(u.preventDefault(),(me=A.duplicate)==null||me.call(A)):p&&v==="a"?(u.preventDefault(),(z=A.selectAll)==null||z.call(A)):v==="delete"||v==="backspace"?k||(u.preventDefault(),(B=A.delete)==null||B.call(A)):v==="escape"?(a=A.escape)==null||a.call(A):p&&v==="g"?(u.preventDefault(),(P=A.toggleGrid)==null||P.call(A)):p&&v==="="||p&&v==="+"?(u.preventDefault(),(N=A.zoomIn)==null||N.call(A)):p&&v==="-"?(u.preventDefault(),(H=A.zoomOut)==null||H.call(A)):p&&v==="0"?(u.preventDefault(),(m=A.zoomReset)==null||m.call(A)):v==="arrowleft"?(O=A.nudge)==null||O.call(A,-1,0):v==="arrowright"?(ie=A.nudge)==null||ie.call(A,1,0):v==="arrowup"?(te=A.nudge)==null||te.call(A,0,-1):v==="arrowdown"&&((ke=A.nudge)==null||ke.call(A,0,1)))}fl(()=>window.addEventListener("keydown",r)),gl(()=>window.removeEventListener("keydown",r))}const ii={class:"slide-panel"},ai={class:"slide-panel-header"},si={class:"slide-count"},ri={class:"slides-list"},di=["onClick","onContextmenu","onDragstart","onDrop"],ui={class:"slide-number"},ci=["viewBox"],pi=["x","y","width","height","fill"],vi=["d","stroke"],fi=["d","fill"],gi={class:"slide-footer"},mi={class:"slide-title"},bi=["onClick"],yi={__name:"SlidePanel",setup(A){const r=it(),u=at(),p=M(()=>u.getProject(r.projectId)),v=M(()=>zt(p.value)),h=M(()=>{var R,F;return((F=(R=p.value)==null?void 0:R.slides)==null?void 0:F.slice().sort((pe,be)=>pe.order-be.order))||[]}),k=L({show:!1,x:0,y:0,slideId:null});function g(R){r.setCurrentSlide(R)}function G(){const R=h.value.findIndex(pe=>pe.id===r.currentSlideId),F=u.addSlide(r.projectId,R);F&&r.setCurrentSlide(F.id)}function le(R){var be,ne;const F=h.value.findIndex(we=>we.id===R);u.deleteSlide(r.projectId,R);const pe=((be=p.value)==null?void 0:be.slides)||[];if(pe.length>0){const we=pe.slice().sort((j,D)=>j.order-D.order),C=Math.min(F,we.length-1);r.setCurrentSlide((ne=we[C])==null?void 0:ne.id)}}function W(R,F){R.preventDefault(),k.value={show:!0,x:R.clientX,y:R.clientY,slideId:F},setTimeout(()=>window.addEventListener("click",U,{once:!0}),0)}function U(){k.value.show=!1}function me(){const R=u.duplicateSlide(r.projectId,k.value.slideId);R&&r.setCurrentSlide(R.id),U()}function z(){le(k.value.slideId),U()}function B(R,F){R.stopPropagation(),le(F)}function a(){const R=h.value.findIndex(F=>F.id===k.value.slideId);R>0&&u.reorderSlides(r.projectId,R,R-1),U()}function P(){const R=h.value.findIndex(F=>F.id===k.value.slideId);R<h.value.length-1&&u.reorderSlides(r.projectId,R,R+1),U()}let N=-1;function H(R,F){N=F,R.dataTransfer.effectAllowed="move"}function m(R,F){R.preventDefault(),N!==-1&&N!==F&&u.reorderSlides(r.projectId,N,F),N=-1}function O(R){return R.backgroundType==="gradient"&&R.backgroundGradient?{background:R.backgroundGradient}:R.backgroundType==="image"&&R.backgroundImage?{backgroundImage:`url(${R.backgroundImage})`,backgroundSize:"cover"}:{background:R.background||"#fff"}}function ie(R){return{left:R.x/v.value.width*100+"%",top:R.y/v.value.height*100+"%",width:R.width/v.value.width*100+"%",height:R.height/v.value.height*100+"%"}}function te(R){var F,pe;return{background:R.type==="shape"?(F=R.content)==null?void 0:F.fillColor:R.type==="button"?"var(--color-primary)":"rgba(0,0,0,.1)",borderRadius:R.type==="shape"&&((pe=R.content)==null?void 0:pe.shapeType)==="circle"?"50%":void 0}}function ke(R){var F;return Ll(R.content||{},R.width||420,R.height||280,((F=p.value)==null?void 0:F.theme)||{})}return(R,F)=>(l(),i("div",ii,[e("div",ai,[F[2]||(F[2]=e("span",{class:"panel-section-title"},"Slides",-1)),e("span",si,w(h.value.length),1),e("button",{class:"btn btn-icon add-slide-btn",onClick:G,"data-tooltip":"Add slide","aria-label":"Add slide"},[...F[1]||(F[1]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e("line",{x1:"5",y1:"12",x2:"19",y2:"12"})],-1)])])]),e("div",ri,[(l(!0),i(ee,null,de(h.value,(pe,be)=>(l(),i("div",{key:pe.id,class:Q(["slide-thumb-item",E(r).currentSlideId===pe.id&&"active"]),draggable:"true",onClick:ne=>g(pe.id),onContextmenu:ne=>W(ne,pe.id),onDragstart:ne=>H(ne,be),onDragover:F[0]||(F[0]=Oe(()=>{},["prevent"])),onDrop:ne=>m(ne,be)},[e("div",ui,w(be+1),1),e("div",{class:"slide-thumb",style:ce(O(pe))},[(l(!0),i(ee,null,de(pe.elements.slice(0,6),ne=>{var we;return l(),i("div",{key:ne.id,class:"mini-element-frame",style:ce(ie(ne))},[ne.type==="chart"?(l(),i("svg",{key:0,class:"mini-chart-svg",viewBox:`0 0 ${ne.width||420} ${ne.height||280}`,preserveAspectRatio:"none"},[ke(ne).type==="bar"?(l(!0),i(ee,{key:0},de(ke(ne).cartesian.bars,C=>(l(),i("rect",{key:`mini-bar-${C.id}`,x:C.x,y:C.y,width:C.width,height:C.height,fill:C.color,rx:"6"},null,8,pi))),128)):ke(ne).type==="line"?(l(),i("path",{key:1,d:ke(ne).cartesian.linePath,stroke:((we=ke(ne).cartesian.points[0])==null?void 0:we.color)||"#6c47ff","stroke-width":"10",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},null,8,vi)):(l(!0),i(ee,{key:2},de(ke(ne).circle.slices,C=>(l(),i("path",{key:`mini-slice-${C.id}`,d:C.path,fill:C.color},null,8,fi))),128))],8,ci)):(l(),i("div",{key:1,class:"mini-element",style:ce(te(ne))},null,4))],4)}),128))],4),e("div",gi,[e("div",mi,w(pe.title||`Slide ${be+1}`),1),h.value.length>1?(l(),i("button",{key:0,class:"slide-delete-btn",title:"Delete slide","aria-label":"Delete slide",onClick:ne=>B(ne,pe.id)},[...F[3]||(F[3]=[et('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-30eea542><polyline points="3 6 5 6 21 6" data-v-30eea542></polyline><path d="M19 6l-1 14H6L5 6" data-v-30eea542></path><path d="M10 11v6M14 11v6" data-v-30eea542></path><path d="M9 6V4h6v2" data-v-30eea542></path></svg>',1)])],8,bi)):q("",!0)])],42,di))),128))]),e("button",{class:"add-slide-bottom",onClick:G},[...F[4]||(F[4]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e("line",{x1:"5",y1:"12",x2:"19",y2:"12"})],-1),Z(" Add Slide ",-1)])]),(l(),Je(ml,{to:"body"},[k.value.show?(l(),i("div",{key:0,class:"context-menu",style:ce({left:k.value.x+"px",top:k.value.y+"px"})},[e("button",{class:"ctx-item",onClick:me},"Duplicate"),e("button",{class:"ctx-item",onClick:a},"Move Up"),e("button",{class:"ctx-item",onClick:P},"Move Down"),F[5]||(F[5]=e("div",{class:"ctx-divider"},null,-1)),e("button",{class:"ctx-item danger",onClick:z},"Delete Slide")],4)):q("",!0)]))]))}},hi=Xe(yi,[["__scopeId","data-v-30eea542"]]),xi={class:"blocks-panel"},ki={class:"blocks-panel-header"},wi={class:"blocks-toolbar"},Ci={class:"blocks-categories"},Si=["onClick"],$i={class:"blocks-panel-body"},Ii={class:"blocks-save-card"},Ei=["disabled"],Ai={class:"blocks-list"},Ti=["onDragstart"],Mi={class:"block-thumb-stage"},Pi={class:"block-card-body"},Bi={class:"block-card-head"},Ni={class:"block-name"},zi={class:"block-meta"},Li={key:0},ji={key:1},_i=["onClick"],Di={class:"block-description"},qi={key:0,class:"block-binding-note"},Ri={class:"block-tags"},Oi=["onClick"],Fi={class:"binding-modal-body"},Ui={class:"binding-modal-intro"},Vi=["for"],Wi=["id","onUpdate:modelValue"],Gi={__name:"BlocksPanel",setup(A){const r=it(),u=at(),p=L(""),v=L("all"),h=L(""),k=L("Custom"),g=L(!1),G=L(null),le=L({}),W=M(()=>u.getProject(r.projectId)),U=M(()=>{var C,j;return(j=(C=W.value)==null?void 0:C.slides)==null?void 0:j.find(D=>D.id===r.currentSlideId)}),me=M(()=>u.getContentBlocks(r.projectId)),z=M(()=>{const C=new Set(["all"]);return me.value.forEach(j=>C.add(j.category||"Custom")),Array.from(C)}),B=M(()=>{var j;const C=new Set(r.selectedElementIds);return(((j=U.value)==null?void 0:j.elements)||[]).filter(D=>C.has(D.id))}),a=M(()=>{var C;return Array.isArray((C=G.value)==null?void 0:C.bindings)?G.value.bindings:[]}),P=M(()=>{const C=p.value.trim().toLowerCase();return me.value.filter(j=>v.value==="all"||(j.category||"Custom")===v.value?C?[j.name,j.description,j.category,...j.tags||[]].join(" ").toLowerCase().includes(C):!0:!1)});function N(C){const j=Array.isArray(C==null?void 0:C.elements)?C.elements:[];if(!j.length)return{minX:0,minY:0,width:1,height:1};const D=Math.min(...j.map(Ie=>Number(Ie.x||0))),X=Math.min(...j.map(Ie=>Number(Ie.y||0))),xe=Math.max(...j.map(Ie=>Number(Ie.x||0)+Number(Ie.width||0))),ze=Math.max(...j.map(Ie=>Number(Ie.y||0)+Number(Ie.height||0)));return{minX:D,minY:X,width:Math.max(1,xe-D),height:Math.max(1,ze-X)}}function H(C,j){const D=N(C);return{left:`${(Number(j.x||0)-D.minX)/D.width*100}%`,top:`${(Number(j.y||0)-D.minY)/D.height*100}%`,width:`${Number(j.width||0)/D.width*100}%`,height:`${Number(j.height||0)/D.height*100}%`}}function m(C){var j,D,X,xe,ze,Ie,_e;return C.type==="shape"?{background:((j=C.content)==null?void 0:j.fillColor)||"#cbd5e1",borderRadius:((D=C.content)==null?void 0:D.shapeType)==="circle"?"50%":`${Number(((X=C.content)==null?void 0:X.borderRadius)||10)}px`,border:`${Math.max(0,Number(((xe=C.content)==null?void 0:xe.borderWidth)||0))}px solid ${((ze=C.content)==null?void 0:ze.borderColor)||"transparent"}`}:C.type==="button"?{background:((Ie=C.content)==null?void 0:Ie.bgColor)||"#6c47ff",borderRadius:`${Number(((_e=C.content)==null?void 0:_e.borderRadius)||10)}px`}:C.type==="image"||C.type==="video"?{background:"linear-gradient(135deg, rgba(14,165,233,.25), rgba(108,71,255,.25))",borderRadius:"14px"}:C.type==="text"||C.type==="heading"?{background:"transparent",borderRadius:"0"}:{background:"rgba(148, 163, 184, 0.25)",borderRadius:"12px"}}function O(C,j){const D=C.type==="heading"?2:3,X=Math.max(18,100/(D+1.25));return{width:`${j===D-1?72:100}%`,height:`${C.type==="heading"?X:X-2}%`}}function ie(C){C.length&&(r.setSelection(C.map(j=>j.id)),r.focusPropertiesSection("content"),r.setActiveTool("select"))}function te(C){return Array.isArray(C==null?void 0:C.bindings)&&C.bindings.length>0}function ke(){g.value=!1,G.value=null,le.value={}}function R(C,j=null){const D=u.insertContentBlock(r.projectId,r.currentSlideId,C.id,j?{bindingValues:j}:{});ie(D)}function F(C){if(!te(C)){R(C);return}G.value=C,le.value=Object.fromEntries(C.bindings.map(j=>[j.id,j.defaultValue||""])),g.value=!0}function pe(){G.value&&(R(G.value,{...le.value}),ke())}function be(){var D,X;const C=h.value.trim();if(!C||!B.value.length)return;u.saveSelectionAsContentBlock(r.projectId,r.currentSlideId,B.value.map(xe=>xe.id),{name:C,category:k.value.trim()||"Custom",accent:((X=(D=W.value)==null?void 0:D.theme)==null?void 0:X.primaryColor)||"#6c47ff"})&&(h.value="",v.value="Custom")}function ne(C){u.deleteContentBlock(r.projectId,C)}function we(C,j){C.dataTransfer&&(C.dataTransfer.effectAllowed="copy",C.dataTransfer.setData(Wt,JSON.stringify({id:j.id})),C.dataTransfer.setData("text/plain",j.name))}return(C,j)=>(l(),i("div",xi,[e("div",ki,[j[5]||(j[5]=e("div",null,[e("div",{class:"panel-section-title"},"Blocks"),e("div",{class:"blocks-panel-subtitle"},"Drop in reusable sections for faster slide building.")],-1)),e("button",{type:"button",class:"btn btn-icon blocks-close-btn",onClick:j[0]||(j[0]=D=>E(r).toggleSlidePanel("blocks")),"aria-label":"Close blocks panel",title:"Close blocks panel"},[...j[4]||(j[4]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("path",{d:"M18 6 6 18M6 6l12 12"})],-1)])])]),e("div",wi,[ue(e("input",{"onUpdate:modelValue":j[1]||(j[1]=D=>p.value=D),class:"input blocks-search",placeholder:"Search blocks"},null,512),[[Se,p.value]]),e("div",Ci,[(l(!0),i(ee,null,de(z.value,D=>(l(),i("button",{key:D,type:"button",class:Q(["blocks-category-chip",v.value===D&&"active"]),onClick:X=>v.value=D},w(D==="all"?"All":D),11,Si))),128))])]),e("div",$i,[e("div",Ii,[j[6]||(j[6]=e("div",{class:"blocks-save-title"},"Save Selection",-1)),j[7]||(j[7]=e("div",{class:"field-hint"},"Turn the current selection into a reusable block for this project. Text and button labels become editable placeholders.",-1)),ue(e("input",{"onUpdate:modelValue":j[2]||(j[2]=D=>h.value=D),class:"input",placeholder:"e.g. Product intro banner"},null,512),[[Se,h.value]]),ue(e("input",{"onUpdate:modelValue":j[3]||(j[3]=D=>k.value=D),class:"input",placeholder:"Category"},null,512),[[Se,k.value]]),e("button",{type:"button",class:"btn btn-primary btn-sm w-full",disabled:!B.value.length||!h.value.trim(),onClick:be}," Save "+w(B.value.length?`${B.value.length} item${B.value.length>1?"s":""}`:"selection")+" as block ",9,Ei)]),e("div",Ai,[(l(!0),i(ee,null,de(P.value,D=>(l(),i("div",{key:D.id,class:"block-card",draggable:"true",onDragstart:X=>we(X,D)},[e("div",{class:"block-thumb",style:ce({"--block-accent":D.accent||"#6c47ff"})},[e("div",Mi,[(l(!0),i(ee,null,de(D.elements,X=>(l(),i("div",{key:`${D.id}-${X.type}-${X.x}-${X.y}`,class:"block-thumb-frame",style:ce(H(D,X))},[["text","heading"].includes(X.type)?(l(),i("div",{key:0,class:Q(["thumb-text",X.type==="heading"&&"thumb-text-heading"])},[(l(!0),i(ee,null,de(X.type==="heading"?2:3,xe=>(l(),i("span",{key:`${D.id}-${X.type}-${X.x}-${X.y}-${xe}`,class:"thumb-text-line",style:ce(O(X,xe-1))},null,4))),128))],2)):(l(),i("div",{key:1,class:"thumb-element",style:ce(m(X))},null,4))],4))),128))])],4),e("div",Pi,[e("div",Bi,[e("div",null,[e("div",Ni,w(D.name),1),e("div",zi,[Z(w(D.category),1),D.scope==="custom"?(l(),i("span",Li," · Custom")):q("",!0),te(D)?(l(),i("span",ji," · "+w(D.bindings.length)+" field"+w(D.bindings.length>1?"s":""),1)):q("",!0)])]),D.scope==="custom"?(l(),i("button",{key:0,type:"button",class:"block-delete-btn",onClick:X=>ne(D.id),"aria-label":"Delete custom block",title:"Delete custom block"},[...j[8]||(j[8]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"3 6 5 6 21 6"}),e("path",{d:"M19 6l-1 14H6L5 6"}),e("path",{d:"M9 6V4h6v2"})],-1)])],8,_i)):q("",!0)]),e("p",Di,w(D.description||"Reusable layout block"),1),te(D)?(l(),i("div",qi,"Editable placeholders included")):q("",!0),e("div",Ri,[(l(!0),i(ee,null,de(D.tags||[],X=>(l(),i("span",{key:`${D.id}-${X}`,class:"block-tag"},"#"+w(X),1))),128))]),e("button",{type:"button",class:"btn btn-secondary btn-sm w-full",onClick:X=>F(D)},w(te(D)?"Insert with Fields":"Insert Block"),9,Oi)])],40,Ti))),128))])]),g.value?(l(),Je(yl,{key:0,title:"Fill Template Fields",size:"md",onClose:ke},{footer:ut(()=>[e("button",{type:"button",class:"btn btn-ghost",onClick:ke},"Cancel"),e("button",{type:"button",class:"btn btn-primary",onClick:pe},"Insert Block")]),default:ut(()=>{var D;return[e("div",Fi,[e("p",Ui,[j[9]||(j[9]=Z(" Customize the placeholder text before inserting ",-1)),e("strong",null,w((D=G.value)==null?void 0:D.name),1),j[10]||(j[10]=Z(". ",-1))]),(l(!0),i(ee,null,de(a.value,X=>(l(),i("div",{key:X.id,class:"binding-field"},[e("label",{class:"form-label",for:`binding-${X.id}`},w(X.label),9,Vi),ue(e("textarea",{id:`binding-${X.id}`,"onUpdate:modelValue":xe=>le.value[X.id]=xe,class:"textarea binding-input"},null,8,Wi),[[Se,le.value[X.id]]])]))),128))])]}),_:1})):q("",!0)]))}},Hi=Xe(Gi,[["__scopeId","data-v-aec67d0c"]]),Yi={class:"layer-panel"},Ji={class:"layer-header panel-section"},Qi={class:"panel-title",style:{"margin-bottom":"0"}},Xi={class:"layer-count"},Ki={key:0,class:"layers-empty"},Zi={key:1,class:"layers-list"},ea=["onClick"],ta={class:"layer-type-icon"},oa={class:"layer-name"},na={class:"layer-actions"},la=["onClick","data-tooltip"],ia={key:0,width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},aa={key:1,width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},sa=["onClick","data-tooltip"],ra={key:0,width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},da={key:1,width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},ua=["onClick"],ca=["onClick"],pa=["onClick"],va={__name:"LayerPanel",setup(A){const r=it(),u=at(),p=M(()=>u.getProject(r.projectId)),v=M(()=>{var B,a;return(a=(B=p.value)==null?void 0:B.slides)==null?void 0:a.find(P=>P.id===r.currentSlideId)}),h=M(()=>{var B;return[...((B=v.value)==null?void 0:B.elements)||[]].sort((a,P)=>(P.zIndex||0)-(a.zIndex||0))});function k(B){r.selectElement(B)}function g(B){u.updateElement(r.projectId,r.currentSlideId,B.id,{visible:!B.visible})}function G(B){u.updateElement(r.projectId,r.currentSlideId,B.id,{locked:!B.locked})}function le(B){u.reorderElement(r.projectId,r.currentSlideId,B,"up")}function W(B){u.reorderElement(r.projectId,r.currentSlideId,B,"down")}function U(B){u.deleteElement(r.projectId,r.currentSlideId,B),r.selectedElementId===B&&r.clearSelection()}function me(B){return{text:"T",heading:"H1",image:"🖼",shape:"■",button:"◉",hotspot:"?",video:"▶",audio:"♪",quiz:"✅",divider:"—"}[B]||"◆"}function z(B){var a,P,N;return(a=B.content)!=null&&a.text?B.content.text.slice(0,24):(P=B.content)!=null&&P.label?B.content.label:(N=B.content)!=null&&N.question?B.content.question.slice(0,24):B.type.charAt(0).toUpperCase()+B.type.slice(1)}return(B,a)=>(l(),i("div",Yi,[e("div",Ji,[e("div",Qi,[a[0]||(a[0]=Z(" Layers ",-1)),e("span",Xi,w(h.value.length),1)])]),h.value.length===0?(l(),i("div",Ki,[...a[1]||(a[1]=[e("p",null,"No elements on this slide.",-1),e("p",null,"Add elements using the toolbar above.",-1)])])):(l(),i("div",Zi,[(l(!0),i(ee,null,de(h.value,P=>(l(),i("div",{key:P.id,class:Q(["layer-item",E(r).selectedElementIds.includes(P.id)&&"selected",P.locked&&"locked",!P.visible&&"hidden"]),onClick:N=>k(P.id)},[e("span",ta,w(me(P.type)),1),e("span",oa,w(z(P)),1),e("div",na,[e("button",{class:Q(["layer-action-btn",{active:P.visible}]),onClick:Oe(N=>g(P),["stop"]),"data-tooltip":P.visible?"Hide":"Show"},[P.visible?(l(),i("svg",ia,[...a[2]||(a[2]=[e("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"},null,-1),e("circle",{cx:"12",cy:"12",r:"3"},null,-1)])])):(l(),i("svg",aa,[...a[3]||(a[3]=[e("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"},null,-1),e("path",{d:"M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"},null,-1),e("line",{x1:"1",y1:"1",x2:"23",y2:"23"},null,-1)])]))],10,la),e("button",{class:Q(["layer-action-btn",{active:P.locked}]),onClick:Oe(N=>G(P),["stop"]),"data-tooltip":P.locked?"Unlock":"Lock"},[P.locked?(l(),i("svg",ra,[...a[4]||(a[4]=[e("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"},null,-1),e("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"},null,-1)])])):(l(),i("svg",da,[...a[5]||(a[5]=[e("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"},null,-1),e("path",{d:"M7 11V7a5 5 0 0 1 9.9-1"},null,-1)])]))],10,sa),e("button",{class:"layer-action-btn",onClick:Oe(N=>le(P.id),["stop"]),"data-tooltip":"Move up"},[...a[6]||(a[6]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"18 15 12 9 6 15"})],-1)])],8,ua),e("button",{class:"layer-action-btn",onClick:Oe(N=>W(P.id),["stop"]),"data-tooltip":"Move down"},[...a[7]||(a[7]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"6 9 12 15 18 9"})],-1)])],8,ca),e("button",{class:"layer-action-btn danger",onClick:Oe(N=>U(P.id),["stop"]),"data-tooltip":"Delete"},[...a[8]||(a[8]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1)])],8,pa)])],10,ea))),128))]))]))}},fa=Xe(va,[["__scopeId","data-v-7407acd8"]]),ga={class:"panel-section"},ma={class:"preset-toolbar"},ba=["value"],ya=["value"],ha=["value"],xa={key:0,class:"preset-list",style:{"margin-top":"var(--space-3)"}},ka=["onClick"],wa={class:"preset-meta-chip muted"},Ca={key:1,class:"import-review"},Sa={class:"motion-scrubber-header"},$a={class:"preset-toolbar compact"},Ia=["value"],Ea=["value"],Aa={class:"import-list"},Ta=["onUpdate:modelValue"],Ma={class:"import-item-title"},Pa={class:"preset-meta-chip"},Ba={key:0,class:"preset-meta-chip muted"},Na={__name:"MotionLibraryPanel",props:{searchQuery:{type:String,required:!0},categoryFilter:{type:String,required:!0},availableCategories:{type:Array,required:!0},recentPresets:{type:Array,required:!0},pendingImportedPresets:{type:Array,required:!0},filteredPendingImports:{type:Array,required:!0},importScopeFilter:{type:String,required:!0},importConflictMode:{type:String,required:!0}},emits:["update:searchQuery","update:categoryFilter","trigger-import","export-presets","apply-preset","clear-imports","update:importScopeFilter","update:importConflictMode","apply-imports"],setup(A,{emit:r}){const u=r;return(p,v)=>(l(),i("div",ga,[v[13]||(v[13]=e("div",{class:"panel-title"},"Motion Library",-1)),e("div",ma,[e("input",{value:A.searchQuery,class:"input",placeholder:"Search presets by name, category, or tag",onInput:v[0]||(v[0]=h=>u("update:searchQuery",h.target.value))},null,40,ba),e("select",{value:A.categoryFilter,class:"select",onChange:v[1]||(v[1]=h=>u("update:categoryFilter",h.target.value))},[v[8]||(v[8]=e("option",{value:"all"},"All categories",-1)),(l(!0),i(ee,null,de(A.availableCategories,h=>(l(),i("option",{key:`library-${h}`,value:h},w(h),9,ha))),128))],40,ya),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:v[2]||(v[2]=h=>u("trigger-import"))},"Import"),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:v[3]||(v[3]=h=>u("export-presets"))},"Export")]),A.recentPresets.length?(l(),i("div",xa,[v[9]||(v[9]=e("div",{class:"field-hint"},"Recently used",-1)),(l(!0),i(ee,null,de(A.recentPresets,h=>(l(),i("div",{class:"preset-item",key:`recent-${h.id}`},[e("button",{type:"button",class:"preset-chip",onClick:k=>u("apply-preset",h)},w(h.name),9,ka),e("span",wa,"Used "+w(h.usageCount)+"x",1)]))),128))])):q("",!0),A.pendingImportedPresets.length?(l(),i("div",Ca,[e("div",Sa,[v[10]||(v[10]=e("span",{class:"motion-scrubber-title"},"Import Review",-1)),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:v[4]||(v[4]=h=>u("clear-imports"))},"Discard")]),e("div",$a,[e("select",{value:A.importScopeFilter,class:"select",onChange:v[5]||(v[5]=h=>u("update:importScopeFilter",h.target.value))},[...v[11]||(v[11]=[e("option",{value:"all"},"All scopes",-1),e("option",{value:"single"},"Single presets",-1),e("option",{value:"group"},"Group presets",-1)])],40,Ia),e("select",{value:A.importConflictMode,class:"select",onChange:v[6]||(v[6]=h=>u("update:importConflictMode",h.target.value))},[...v[12]||(v[12]=[e("option",{value:"replace"},"Replace matching names",-1),e("option",{value:"copy"},"Import as copies",-1)])],40,Ea),e("button",{type:"button",class:"btn btn-primary btn-sm",onClick:v[7]||(v[7]=h=>u("apply-imports"))},"Merge Selected")]),e("div",Aa,[(l(!0),i(ee,null,de(A.filteredPendingImports,h=>(l(),i("label",{key:`pending-${h.id}`,class:"import-item"},[ue(e("input",{"onUpdate:modelValue":k=>h.selected=k,type:"checkbox"},null,8,Ta),[[Nt,h.selected]]),e("span",Ma,w(h.name),1),e("span",Pa,w(h.scope),1),h.category?(l(),i("span",Ba,w(h.category),1)):q("",!0)]))),128))])])):q("",!0)]))}},za=Xe(Na,[["__scopeId","data-v-61f99273"]]),La={style:{display:"flex","justify-content":"flex-end","margin-bottom":"12px"}},ja={key:1,class:"panel-section"},_a={class:"field-hint"},Da={class:"motion-scrubber-shell"},qa={class:"motion-card-grid",style:{"margin-top":"var(--space-3)"}},Ra=["onClick"],Oa={class:"motion-preview"},Fa={key:0,class:"motion-preview-dot motion-preview-dot-secondary motion-sample-stagger-in-secondary"},Ua={key:1,class:"motion-preview-dot motion-preview-dot-tertiary motion-sample-stagger-in-tertiary"},Va={class:"motion-card-label"},Wa={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Ga={class:"form-group"},Ha={class:"form-group"},Ya={class:"form-group",style:{"margin-top":"var(--space-3)"}},Ja={class:"preset-row",style:{"margin-top":"var(--space-3)"}},Qa={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-2)"}},Xa={key:0,class:"preset-list"},Ka=["onDragstart","onDragenter","onDrop"],Za=["onClick"],es={key:0,class:"preset-meta-chip"},ts=["onClick"],os=["onClick"],ns=["onClick"],ls={key:1,class:"preset-row preset-edit-row"},is=["onClick"],as={key:1,class:"field-hint"},ss={key:2,class:"panel-section"},rs={class:"slide-settings-tabs"},ds={key:0,class:"slide-settings-pane"},us={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},cs={class:"form-group"},ps={class:"bg-type-tabs"},vs=["onClick"],fs={key:0,class:"color-row"},gs=["value"],ms=["value"],bs={class:"slide-settings-subsection"},ys={class:"canvas-size-grid"},hs=["onClick"],xs={class:"canvas-size-icon-shell"},ks={class:"canvas-size-name"},ws={class:"canvas-size-ratio"},Cs={class:"canvas-custom-card"},Ss={class:"canvas-custom-header"},$s={class:"field-hint"},Is={class:"canvas-custom-inputs"},Es={class:"form-group"},As={class:"canvas-size-input-wrap"},Ts=["value"],Ms={class:"form-group"},Ps={class:"canvas-size-input-wrap"},Bs=["value"],Ns={class:"check-row canvas-size-lock"},zs={class:"slide-settings-subsection"},Ls={key:1,class:"slide-settings-pane"},js=["value"],_s={class:"form-group",style:{"margin-top":"var(--space-3)"}},Ds=["value"],qs={class:"check-row"},Rs=["checked"],Os={key:2,class:"slide-settings-pane"},Fs={class:"check-row"},Us=["checked"],Vs={class:"check-row"},Ws=["checked"],Gs={class:"check-row"},Hs=["checked"],Ys={class:"check-row"},Js=["checked"],Qs={class:"check-row"},Xs=["checked"],Ks={class:"panel-title"},Zs={class:"element-type-badge"},er={class:"geo-grid"},tr={class:"form-group"},or=["value"],nr={class:"form-group"},lr=["value"],ir={class:"form-group"},ar=["value"],sr={class:"form-group"},rr=["value"],dr={class:"form-group"},ur=["value"],cr={class:"form-group"},pr=["value"],vr={class:"motion-scrubber-shell"},fr={class:"motion-card-grid"},gr=["onClick"],mr={class:"motion-preview"},br={key:0,class:"motion-preview-dot motion-preview-dot-secondary motion-sample-stagger-in-secondary"},yr={key:1,class:"motion-preview-dot motion-preview-dot-tertiary motion-sample-stagger-in-tertiary"},hr={class:"motion-card-label"},xr={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr"}},kr={class:"form-group"},wr=["value"],Cr={class:"form-group"},Sr=["value"],$r={class:"preset-row",style:{"margin-top":"var(--space-3)"}},Ir={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-2)"}},Er={key:0,class:"preset-list"},Ar=["onDragstart","onDragenter","onDrop"],Tr=["onClick"],Mr={key:0,class:"preset-meta-chip"},Pr=["onClick"],Br=["onClick"],Nr=["onClick"],zr={key:1,class:"preset-row preset-edit-row"},Lr=["onClick"],jr={key:1,class:"field-hint"},_r={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Dr=["value"],qr={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr"}},Rr={class:"form-group"},Or=["value"],Fr={class:"form-group"},Ur=["value"],Vr={class:"form-group",style:{"margin-top":"var(--space-3)"}},Wr=["value"],Gr=["value"],Hr={class:"form-group",style:{"margin-top":"var(--space-3)"}},Yr={class:"align-btns"},Jr=["onClick"],Qr={class:"form-group",style:{"margin-top":"var(--space-3)"}},Xr={class:"style-btns"},Kr={class:"form-group",style:{"margin-top":"var(--space-3)"}},Zr={class:"color-row"},ed=["value"],td=["value"],od={class:"form-group",style:{"margin-top":"var(--space-3)"}},nd=["value"],ld={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},id={class:"form-group"},ad=["value"],sd={class:"form-group"},rd=["value"],dd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},ud=["value"],cd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},pd=["value"],vd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},fd=["value"],gd={class:"form-group"},md=["value"],bd={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},yd={class:"form-group"},hd=["value"],xd={class:"form-group"},kd=["value"],wd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Cd=["value"],Sd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},$d={class:"color-row"},Id=["value"],Ed=["value"],Ad={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Td={class:"color-row"},Md=["value"],Pd=["value"],Bd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Nd=["value"],zd={class:"form-group"},Ld=["value"],jd={class:"form-group",style:{"margin-top":"var(--space-3)"}},_d=["value"],Dd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},qd=["value"],Rd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Od=["value"],Fd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Ud=["value"],Vd={class:"form-group chart-import-card",style:{"margin-bottom":"var(--space-3)"}},Wd={class:"chart-data-actions"},Gd={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Hd=["value","placeholder"],Yd={class:"chart-palette-preview"},Jd={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-bottom":"var(--space-3)"}},Qd={class:"form-group"},Xd=["value"],Kd={class:"form-group"},Zd=["value"],eu={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-bottom":"var(--space-3)"}},tu={class:"form-group"},ou=["value"],nu={class:"form-group"},lu=["value"],iu={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-bottom":"var(--space-3)"}},au={class:"form-group"},su=["value"],ru={key:0,class:"form-group"},du=["value"],uu={key:1,class:"form-group"},cu=["value"],pu={key:0,class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-bottom":"var(--space-3)"}},vu={class:"form-group"},fu=["value"],gu={class:"check-row",style:{"margin-top":"20px"}},mu=["checked"],bu={class:"check-row"},yu=["checked"],hu={key:1,class:"check-row"},xu=["checked"],ku={class:"check-row"},wu=["checked"],Cu={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Su=["value"],$u={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Iu=["value"],Eu={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Au=["value"],Tu={key:0,class:"form-group"},Mu=["value"],Pu={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Bu={class:"form-group"},Nu=["value"],zu={class:"form-group"},Lu=["value"],ju={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},_u={class:"form-group"},Du=["value"],qu={class:"form-group"},Ru=["value"],Ou={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Fu={class:"form-group"},Uu=["value"],Vu={class:"form-group"},Wu=["value"],Gu={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Hu={class:"form-group"},Yu=["value"],Ju=["value"],Qu={class:"form-group"},Xu=["value"],Ku={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Zu=["value"],ec={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},tc={class:"color-row"},oc=["value"],nc=["value"],lc={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-bottom":"var(--space-3)"}},ic={class:"form-group"},ac=["value"],sc={class:"form-group"},rc=["value"],dc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},uc=["value"],cc={class:"form-group"},pc=["value"],vc={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},fc={class:"form-group"},gc=["value"],mc={class:"form-group"},bc=["value"],yc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},hc=["value"],xc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},kc=["value"],wc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Cc=["value"],Sc={class:"check-row"},$c=["checked"],Ic={class:"check-row"},Ec=["checked"],Ac={class:"check-row"},Tc=["checked"],Mc={class:"check-row"},Pc=["checked"],Bc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Nc=["value"],zc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Lc=["value"],jc={class:"check-row"},_c=["checked"],Dc={class:"check-row"},qc=["checked"],Rc={class:"check-row"},Oc=["checked"],Fc={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Uc={class:"form-group"},Vc=["value"],Wc={class:"form-group"},Gc=["value"],Hc={class:"form-group",style:{"margin-top":"var(--space-3)"}},Yc=["value"],Jc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Qc=["value"],Xc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Kc=["value"],Zc={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},ep=["value"],tp={class:"form-group"},op=["value"],np={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},lp={class:"form-group"},ip=["value"],ap={class:"form-group"},sp=["value"],rp={class:"form-group",style:{"margin-top":"var(--space-3)"}},dp=["value"],up={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},cp=["value"],pp={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},vp={class:"form-group"},fp=["value"],gp={class:"form-group"},mp=["value"],bp={class:"form-group"},yp=["value"],hp={class:"form-group"},xp=["value"],kp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},wp=["value"],Cp={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Sp={class:"form-group"},$p=["value"],Ip={class:"form-group"},Ep=["value"],Ap={class:"form-group"},Tp=["value"],Mp={class:"form-group"},Pp=["value"],Bp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Np=["value"],zp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Lp=["value"],jp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},_p=["value"],Dp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},qp=["value"],Rp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Op=["value"],Fp={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},Up={class:"form-group"},Vp=["value"],Wp={class:"form-group"},Gp=["value"],Hp={class:"form-group"},Yp=["value"],Jp={class:"form-group"},Qp=["value"],Xp={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Kp=["value"],Zp={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},ev={class:"form-group"},tv=["value"],ov={class:"form-group"},nv=["value"],lv={class:"form-group"},iv=["value"],av={class:"form-group"},sv=["value"],rv={class:"form-group"},dv=["value"],uv={class:"form-group",style:{"margin-top":"var(--space-3)"}},cv=["value"],pv={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-3)"}},vv={class:"form-group"},fv=["value"],gv={class:"form-group"},mv=["value"],bv={class:"form-group",style:{"margin-top":"var(--space-3)"}},yv=["value"],hv={class:"form-group"},xv=["value"],kv={class:"form-group"},wv=["value"],Cv={class:"form-group"},Sv=["value"],$v={class:"form-group",style:{"margin-top":"var(--space-3)"}},Iv={style:{display:"flex","align-items":"center",gap:"8px"}},Ev=["checked"],Av={class:"form-group"},Tv=["value"],Mv={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr"}},Pv={class:"form-group"},Bv=["value"],Nv={class:"form-group"},zv=["value"],Lv={class:"geo-grid",style:{"grid-template-columns":"1fr 1fr","margin-top":"var(--space-2)"}},jv={class:"form-group"},_v=["value"],Dv={class:"panel-section"},qv={class:"actions-list"},Rv={__name:"PropertiesPanel",setup(A){const r=it(),u=at(),p=M(()=>u.getProject(r.projectId)),v=M(()=>{var d,t;return(t=(d=p.value)==null?void 0:d.slides)==null?void 0:t.find(_=>_.id===r.currentSlideId)}),h=M(()=>{var d;return{autoPlay:!1,loop:!1,showProgress:!0,showNavControls:!0,allowKeyboardNav:!0,motionPresets:[],...((d=p.value)==null?void 0:d.settings)||{}}}),k=M(()=>zt(h.value)),g=M(()=>hl(h.value)),G=M(()=>xl(k.value.width,k.value.height)),le=L(!0),W=L("canvas"),U=M(()=>Array.isArray(h.value.motionPresets)?h.value.motionPresets:[]),me=M(()=>U.value.filter(d=>d.scope!=="group")),z=M(()=>U.value.filter(d=>d.scope==="group")),B=M(()=>{var t;const d=new Set(r.selectedElementIds);return(((t=v.value)==null?void 0:t.elements)||[]).filter(_=>d.has(_.id))}),a=M(()=>{var d,t;return r.selectedElementId?(t=(d=v.value)==null?void 0:d.elements)==null?void 0:t.find(_=>_.id===r.selectedElementId):null}),P=M(()=>r.multiSelection||!!a.value),N=M(()=>r.multiSelection?"group":"single"),H=M(()=>{var t,_;const d=(_=(t=a.value)==null?void 0:t.animations)==null?void 0:_[0];return{type:(d==null?void 0:d.type)||"auto",delay:Number((d==null?void 0:d.delay)||0),duration:Number((d==null?void 0:d.duration)||.64)}}),m=M(()=>{var Ne,He;const d=B.value.map(Ue=>{var ht;return((ht=Ue.animations)==null?void 0:ht[0])||null}),t=((Ne=d[0])==null?void 0:Ne.type)||"auto",_=Number(((He=d[0])==null?void 0:He.duration)||.64),ve=d.every(Ue=>((Ue==null?void 0:Ue.type)||"auto")===t),Te=d.every(Ue=>Number((Ue==null?void 0:Ue.duration)||.64)===_);return{type:ve?t:"mixed",duration:Te?_:.64}}),O=L(0),ie=L(0),te=L(""),ke=L(""),R=L(""),F=L(""),pe=L(""),be=L(""),ne=L(""),we=L(""),C=L(""),j=L(""),D=L(""),X=L(""),xe=L(""),ze=L("all"),Ie=L(null),_e=L(null),oe=L([]),fe=L("all"),ae=L("replace"),ge=L(""),Me=L(null),se=L("");let I=null;const S=L({});Qe(a,d=>{d?S.value=JSON.parse(JSON.stringify(d)):S.value={},(d==null?void 0:d.type)==="chart"&&(ge.value="")},{immediate:!0,deep:!0}),Qe(()=>{var d;return[r.propertiesPanelSection,(d=a.value)==null?void 0:d.id,r.rightPanelTab]},async([d,t,_])=>{var Te;if(!d||!t||_!=="properties")return;await bl();const ve=(Te=Me.value)==null?void 0:Te.querySelector(`[data-props-anchor="${d}"]`);ve&&(ve.scrollIntoView({behavior:"smooth",block:"start"}),se.value=d,I&&window.clearTimeout(I),I=window.setTimeout(()=>{se.value===d&&(se.value="")},1400))},{immediate:!0});function ye(d){a.value&&u.updateElement(r.projectId,r.currentSlideId,a.value.id,d)}function c(d){if(!a.value)return;const t={...a.value.content,...d};ye({content:t})}function Le(d,t){try{return JSON.parse(d)}catch{return t}}function qe(d,t){const _=parseFloat(t);isNaN(_)||ye({[d]:_})}const je=L({});Qe(v,d=>{d&&(je.value={...d})},{immediate:!0});function Ce(d){v.value&&u.updateSlide(r.projectId,v.value.id,d)}function Pe(d){if(!p.value)return;const t={...h.value,...d};u.updateProject(r.projectId,{settings:{...t,..._l(t)}})}function st(d){Pe({slideWidth:d.width,slideHeight:d.height})}function tt(d,t){const _=Math.round(Number(t)||0);if(!_)return;const ve={[`slide${d==="width"?"Width":"Height"}`]:_};if(le.value){const Te=k.value.width,Ne=k.value.height;d==="width"?ve.slideHeight=Math.round(_*(Ne/Te)):ve.slideWidth=Math.round(_*(Te/Ne))}Pe(ve)}const ot=M(()=>{var d;return kl(((d=p.value)==null?void 0:d.theme)||{})}),wt=M(()=>{var t,_;if(((t=a.value)==null?void 0:t.type)!=="chart")return[];const d=((_=a.value.content)==null?void 0:_.paletteText)||ot.value.paletteText;return Rl(d)});function rt(d){const t=Dl(d,{fallbackToDefault:!1});return t.length?ql(t):""}function De(d){var _;if(((_=a.value)==null?void 0:_.type)!=="chart")return;const t=rt(d);t&&(c({dataText:t}),ge.value="")}async function ct(d){var ve;const t=d.target,_=(ve=t==null?void 0:t.files)==null?void 0:ve[0];if(_)try{const Te=await _.text();De(Te)}finally{t&&(t.value="")}}function Ke(){var d;(d=_e.value)==null||d.click()}function Ct(){var t,_;if(((t=a.value)==null?void 0:t.type)!=="chart")return;const d=rt(((_=a.value.content)==null?void 0:_.dataText)||"");d&&c({dataText:d})}function St(){var d;((d=a.value)==null?void 0:d.type)==="chart"&&c({...ot.value})}function $t(){var d;((d=a.value)==null?void 0:d.type)==="chart"&&c({paletteText:ot.value.paletteText})}function pt(d){return String(d||"").split(",").map(t=>t.trim()).filter(Boolean)}function It(d){const t=(d==null?void 0:d.scope)==="group"?"group":"single";return{id:`motion-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,scope:t,name:String((d==null?void 0:d.name)||"Imported Preset").trim()||"Imported Preset",category:String((d==null?void 0:d.category)||"").trim(),tags:Array.isArray(d==null?void 0:d.tags)?d.tags.map(_=>String(_).trim()).filter(Boolean):pt(d==null?void 0:d.tags),type:String((d==null?void 0:d.type)||"auto"),delay:Math.max(0,Number(d==null?void 0:d.delay)||0),duration:Math.max(.1,Number(d==null?void 0:d.duration)||.72),stepDelay:Math.max(0,Number(d==null?void 0:d.stepDelay)||0)}}const Et=M(()=>[...new Set(U.value.map(t=>t.category).filter(Boolean))].sort((t,_)=>t.localeCompare(_))),At=M(()=>[...U.value].filter(d=>Number(d.usageCount||0)>0).sort((d,t)=>{const _=Number(t.lastUsedAt||0)-Number(d.lastUsedAt||0);return _!==0?_:Number(t.usageCount||0)-Number(d.usageCount||0)}).slice(0,6)),y=M(()=>fe.value==="all"?oe.value:oe.value.filter(d=>d.scope===fe.value));function x(d){const t=xe.value.trim().toLowerCase(),_=ze.value;return _==="all"||(d.category||"")===_?t?[d.name,d.category,...d.tags||[]].filter(Boolean).some(Te=>String(Te).toLowerCase().includes(t)):!0:!1}const K=M(()=>me.value.filter(x)),V=M(()=>z.value.filter(x)),Ee=M(()=>At.value.filter(d=>N.value==="group"?d.scope==="group":d.scope!=="group"));function Ae(d){const t=String(d.name||"").trim();if(!t)return;const _=U.value.findIndex(Ne=>Ne.scope===d.scope&&Ne.name.toLowerCase()===t.toLowerCase()),ve={...d,id:_>=0?U.value[_].id:`motion-${Date.now()}`,name:t,category:String(d.category||"").trim(),tags:Array.isArray(d.tags)?d.tags:pt(d.tags)},Te=[...U.value];_>=0?Te.splice(_,1,ve):Te.push(ve),Pe({motionPresets:Te})}function Fe(d,t){const _=U.value.map(ve=>ve.id===d?{...ve,...t}:ve);Pe({motionPresets:_})}function We(d){const t=U.value.find(_=>_.id===d);t&&Fe(d,{usageCount:Math.max(0,Number(t.usageCount||0))+1,lastUsedAt:Date.now()})}function re(d,t){const _=U.value.filter(He=>He.scope===d).map(He=>He.name.toLowerCase()),ve=String(t||"Preset").trim()||"Preset";if(!_.includes(ve.toLowerCase()))return ve;let Te=2,Ne=`${ve} Copy`;for(;_.includes(Ne.toLowerCase());)Ne=`${ve} Copy ${Te}`,Te+=1;return Ne}function $e(d){Pe({motionPresets:U.value.filter(t=>t.id!==d)}),R.value===d&&(R.value="",F.value="")}function Ze(d){Ae({...d,id:void 0,name:re(d.scope,d.name)})}function Re(d){R.value=d.id,F.value=d.name,pe.value=d.category||"",be.value=Array.isArray(d.tags)?d.tags.join(", "):""}function Be(){R.value="",F.value="",pe.value="",be.value=""}function Ve(d){const t=String(F.value||"").trim();t&&(Fe(d,{name:t,category:String(pe.value||"").trim(),tags:pt(be.value)}),Be())}function mt(d,t,_){if(!t||!_||t===_)return;const ve=U.value.filter(lt=>lt.scope===d),Te=ve.findIndex(lt=>lt.id===t),Ne=ve.findIndex(lt=>lt.id===_);if(Te===-1||Ne===-1)return;const He=[...ve],[Ue]=He.splice(Te,1);He.splice(Ne,0,Ue);const ht=U.value.filter(lt=>lt.scope!==d),kt=[];U.value.forEach(lt=>{if(lt.scope===d){He.length&&kt.push(He.shift());return}const Mt=ht.shift();Mt&&kt.push(Mt)}),Pe({motionPresets:kt})}function gt(d){ne.value=d.id,we.value=d.id}function bt(d){ne.value&&(we.value=d.id)}function Lt(d){ne.value&&(mt(d.scope,ne.value,d.id),ne.value="",we.value="")}function yt(){ne.value="",we.value=""}function jt(){O.value+=1}function Tt(){ie.value+=1}function _t(d,t){Ce({[d]:t})}function Ot(d){const t=Math.max(0,Number(d)||0);Ce({duration:t})}function xt(d){var ve;if(!a.value)return;const _={...((ve=a.value.animations)==null?void 0:ve[0])||{type:"auto",delay:0,duration:.64},...d};if(_.type==="auto"){ye({animations:[]});return}ye({animations:[{type:_.type||"none",delay:Math.max(0,Number(_.delay)||0),duration:Math.max(.1,Number(_.duration)||.64)}]})}const Ge=L("stagger-in"),nt=L(0),vt=L(.12),dt=L(.72);Qe(B,d=>{d.length&&(Ge.value=m.value.type==="mixed"?"stagger-in":m.value.type,dt.value=m.value.duration)},{immediate:!0,deep:!0});function Dt(){if(!B.value.length)return;[...B.value].sort((t,_)=>(t.y||0)!==(_.y||0)?(t.y||0)-(_.y||0):(t.x||0)-(_.x||0)).forEach((t,_)=>{if(Ge.value==="auto"){u.updateElement(r.projectId,r.currentSlideId,t.id,{animations:[]});return}u.updateElement(r.projectId,r.currentSlideId,t.id,{animations:[{type:Ge.value,delay:Math.max(0,Number(nt.value)||0)+_*Math.max(0,Number(vt.value)||0),duration:Math.max(.1,Number(dt.value)||.72)}]})})}function qt(d){Ge.value=d.type||"stagger-in",nt.value=Number(d.delay||0),vt.value=Number(d.stepDelay||0),dt.value=Number(d.duration||.72),We(d.id),Tt()}function Ft(){Ae({scope:"group",name:ke.value,category:D.value,tags:pt(X.value),type:Ge.value,delay:Math.max(0,Number(nt.value)||0),stepDelay:Math.max(0,Number(vt.value)||0),duration:Math.max(.1,Number(dt.value)||.72)}),ke.value="",D.value="",X.value=""}function Rt(d){xt({type:d.type||"auto",delay:Number(d.delay||0),duration:Number(d.duration||.72)}),We(d.id),jt()}function Ut(){Ae({scope:"single",name:te.value,category:C.value,tags:pt(j.value),type:H.value.type,delay:Math.max(0,Number(H.value.delay)||0),stepDelay:0,duration:Math.max(.1,Number(H.value.duration)||.72)}),te.value="",C.value="",j.value=""}function s(){var d;(d=Ie.value)==null||d.click()}async function n(d){var ve;const t=d.target,_=(ve=t==null?void 0:t.files)==null?void 0:ve[0];if(_)try{const Te=await _.text(),Ne=JSON.parse(Te),He=Array.isArray(Ne)?Ne:Array.isArray(Ne.motionPresets)?Ne.motionPresets:[];if(!He.length)return;oe.value=He.map(Ue=>({...It(Ue),selected:!0,importName:String((Ue==null?void 0:Ue.name)||"Imported Preset").trim()||"Imported Preset"}))}catch{}finally{t&&(t.value="")}}function f(){oe.value=[]}function $(){const d=oe.value.filter(_=>_.selected);if(!d.length)return;const t=[...U.value];d.forEach(_=>{const ve=t.findIndex(Te=>Te.scope===_.scope&&Te.name.toLowerCase()===_.name.toLowerCase());if(ve>=0){ae.value==="replace"?t.splice(ve,1,{...t[ve],..._,id:t[ve].id}):t.push({..._,id:`motion-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,name:re(_.scope,_.name)});return}t.push(_)}),Pe({motionPresets:t}),f()}function b(){var Ne;if(!U.value.length)return;const d={version:1,exportedAt:new Date().toISOString(),motionPresets:U.value.map(({id:He,...Ue})=>Ue)},t=new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),_=URL.createObjectURL(t),ve=document.createElement("a"),Te=String(((Ne=p.value)==null?void 0:Ne.name)||"project").trim().replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"").toLowerCase()||"project";ve.href=_,ve.download=`${Te}-motion-presets.json`,document.body.appendChild(ve),ve.click(),document.body.removeChild(ve),URL.revokeObjectURL(_)}const Y=M(()=>[{id:`single-${O.value}`,delay:Math.max(0,Number(H.value.delay)||0),duration:Math.max(.1,Number(H.value.duration)||.72),type:H.value.type}]),he=M(()=>Array.from({length:Math.min(Math.max(B.value.length,3),5)},(d,t)=>({id:`group-${ie.value}-${t}`,delay:Math.max(0,Number(nt.value)||0)+t*Math.max(0,Number(vt.value)||0),duration:Math.max(.1,Number(dt.value)||.72),type:Ge.value}))),Ye=[{value:"auto",label:"Auto",sampleClass:"motion-sample-auto"},{value:"none",label:"None",sampleClass:"motion-sample-none"},{value:"fade-up",label:"Fade Up",sampleClass:"motion-sample-fade-up"},{value:"fade-up-strong",label:"Fade Strong",sampleClass:"motion-sample-fade-up-strong"},{value:"fade-left",label:"Fade Left",sampleClass:"motion-sample-fade-left"},{value:"fade-right",label:"Fade Right",sampleClass:"motion-sample-fade-right"},{value:"zoom-in",label:"Zoom In",sampleClass:"motion-sample-zoom-in"},{value:"pop-in",label:"Pop In",sampleClass:"motion-sample-pop-in"},{value:"soft-pop",label:"Soft Pop",sampleClass:"motion-sample-soft-pop"},{value:"stagger-in",label:"Stagger In",sampleClass:"motion-sample-stagger-in"}],T=["Arial, sans-serif",'"Trebuchet MS", sans-serif',"Tahoma, sans-serif","Georgia, serif",'"Playfair Display", serif',"Verdana, sans-serif","Caveat, cursive"];return(d,t)=>{var _,ve,Te,Ne,He,Ue,ht,kt,lt,Mt,Ht,Yt,Jt,Qt,Xt,Kt,Zt,eo,to,oo,no,lo,io,ao,so,ro,uo,co,po,vo,fo,go,mo,bo,yo,ho,xo,ko,wo,Co,So,$o,Io,Eo,Ao,To,Mo,Po,Bo,No,zo,Lo,jo,_o,Do,qo,Ro,Oo,Fo,Uo,Vo,Wo,Go,Ho,Yo,Jo,Qo,Xo,Ko,Zo,en,tn,on,nn,ln,an,sn,rn,dn,un,cn,pn,vn,fn,gn,mn,bn,yn,hn,xn,kn,wn,Cn,Sn,$n,In,En,An,Tn,Mn,Pn,Bn,Nn,zn,Ln,jn,_n,Dn,qn,Rn,On,Fn,Un,Vn,Wn,Gn,Hn,Yn,Jn,Qn,Xn,Kn,Zn,el,tl,ol,nl,ll,il,al,sl,rl,dl,ul;return l(),i("div",{ref_key:"panelRootRef",ref:Me,class:"properties-panel"},[e("input",{ref_key:"presetImportInput",ref:Ie,type:"file",accept:"application/json,.json",style:{display:"none"},onChange:n},null,544),e("input",{ref_key:"chartImportInput",ref:_e,type:"file",accept:".csv,.txt,text/csv,text/plain",style:{display:"none"},onChange:ct},null,544),t[386]||(t[386]=e("div",{class:"panel-section autosave-note"}," Changes apply instantly ",-1)),e("div",La,[ft(Vl)]),P.value?(l(),Je(za,{key:0,"search-query":xe.value,"category-filter":ze.value,"available-categories":Et.value,"recent-presets":Ee.value,"pending-imported-presets":oe.value,"filtered-pending-imports":y.value,"import-scope-filter":fe.value,"import-conflict-mode":ae.value,"onUpdate:searchQuery":t[0]||(t[0]=o=>xe.value=o),"onUpdate:categoryFilter":t[1]||(t[1]=o=>ze.value=o),onTriggerImport:s,onExportPresets:b,onApplyPreset:t[2]||(t[2]=o=>N.value==="group"?qt(o):Rt(o)),onClearImports:f,"onUpdate:importScopeFilter":t[3]||(t[3]=o=>fe.value=o),"onUpdate:importConflictMode":t[4]||(t[4]=o=>ae.value=o),onApplyImports:$},null,8,["search-query","category-filter","available-categories","recent-presets","pending-imported-presets","filtered-pending-imports","import-scope-filter","import-conflict-mode"])):q("",!0),E(r).multiSelection?(l(),i("div",ja,[t[185]||(t[185]=e("div",{class:"panel-title"},"Group Motion",-1)),e("div",_a,w(B.value.length)+" elements selected. Apply one timed sequence to the whole selection.",1),e("div",Da,[e("div",{class:"motion-scrubber-header"},[t[181]||(t[181]=e("span",{class:"motion-scrubber-title"},"Sequence Preview",-1)),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Tt},"Replay")]),(l(),i("div",{class:"motion-scrubber-stage",key:`group-preview-${ie.value}`},[(l(!0),i(ee,null,de(he.value,o=>(l(),i("span",{key:o.id,class:Q(["motion-scrubber-node",`motion-preview-live-${o.type==="auto"?"fade-up":o.type}`]),style:ce({"--preview-delay":`${o.delay}s`,"--preview-duration":`${o.duration}s`})},null,6))),128))]))]),e("div",qa,[(l(),i(ee,null,de(Ye,o=>e("button",{key:`group-${o.value}`,type:"button",class:Q(["motion-card",Ge.value===o.value&&"active"]),onClick:J=>Ge.value=o.value},[e("span",Oa,[e("span",{class:Q(["motion-preview-dot",o.sampleClass])},null,2),o.value==="stagger-in"?(l(),i("span",Fa)):q("",!0),o.value==="stagger-in"?(l(),i("span",Ua)):q("",!0)]),e("span",Va,w(o.label),1)],10,Ra)),64))]),e("div",Wa,[e("div",Ga,[t[182]||(t[182]=e("label",{class:"form-label"},"Start Delay (seconds)",-1)),ue(e("input",{type:"number",min:"0",step:"0.05","onUpdate:modelValue":t[5]||(t[5]=o=>nt.value=o),class:"input"},null,512),[[Se,nt.value]])]),e("div",Ha,[t[183]||(t[183]=e("label",{class:"form-label"},"Step Delay (seconds)",-1)),ue(e("input",{type:"number",min:"0",step:"0.05","onUpdate:modelValue":t[6]||(t[6]=o=>vt.value=o),class:"input"},null,512),[[Se,vt.value]])])]),e("div",Ya,[t[184]||(t[184]=e("label",{class:"form-label"},"Duration (seconds)",-1)),ue(e("input",{type:"number",min:"0.1",step:"0.05","onUpdate:modelValue":t[7]||(t[7]=o=>dt.value=o),class:"input"},null,512),[[Se,dt.value]])]),e("div",Ja,[ue(e("input",{"onUpdate:modelValue":t[8]||(t[8]=o=>ke.value=o),class:"input",placeholder:"Save as preset, e.g. Three Card Cascade"},null,512),[[Se,ke.value]]),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Ft},"Save")]),e("div",Qa,[ue(e("input",{"onUpdate:modelValue":t[9]||(t[9]=o=>D.value=o),class:"input",placeholder:"Category, e.g. Sequence"},null,512),[[Se,D.value]]),ue(e("input",{"onUpdate:modelValue":t[10]||(t[10]=o=>X.value=o),class:"input",placeholder:"Tags, comma separated"},null,512),[[Se,X.value]])]),V.value.length?(l(),i("div",Xa,[(l(!0),i(ee,null,de(V.value,o=>(l(),i("div",{key:o.id,class:Q(["preset-item",ne.value===o.id&&"dragging",we.value===o.id&&ne.value!==o.id&&"drag-over"]),draggable:"true",onDragstart:J=>gt(o),onDragenter:Oe(J=>bt(o),["prevent"]),onDragover:t[14]||(t[14]=Oe(()=>{},["prevent"])),onDrop:Oe(J=>Lt(o),["prevent"]),onDragend:yt},[e("button",{type:"button",class:"preset-chip",onClick:J=>qt(o)},w(o.name),9,Za),o.category?(l(),i("span",es,w(o.category),1)):q("",!0),(l(!0),i(ee,null,de(o.tags||[],J=>(l(),i("span",{key:`${o.id}-${J}`,class:"preset-meta-chip muted"},"#"+w(J),1))),128)),e("button",{type:"button",class:"preset-mini-btn",onClick:J=>Ze(o)},"Duplicate",8,ts),e("button",{type:"button",class:"preset-mini-btn",onClick:J=>Re(o)},"Rename",8,os),e("button",{type:"button",class:"preset-mini-btn danger",onClick:J=>$e(o.id)},"Delete",8,ns),R.value===o.id?(l(),i("div",ls,[ue(e("input",{"onUpdate:modelValue":t[11]||(t[11]=J=>F.value=J),class:"input"},null,512),[[Se,F.value]]),ue(e("input",{"onUpdate:modelValue":t[12]||(t[12]=J=>pe.value=J),class:"input",placeholder:"Category"},null,512),[[Se,pe.value]]),ue(e("input",{"onUpdate:modelValue":t[13]||(t[13]=J=>be.value=J),class:"input",placeholder:"Tags, comma separated"},null,512),[[Se,be.value]]),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:J=>Ve(o.id)},"Save",8,is),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Be},"Cancel")])):q("",!0)],42,Ka))),128))])):z.value.length?(l(),i("div",as,"No group presets match the current search.")):q("",!0),e("button",{class:"btn btn-primary btn-sm w-full",style:{"margin-top":"var(--space-3)"},onClick:Dt}," Apply Sequence to Selection ")])):a.value?(l(),i(ee,{key:3},[e("div",{class:Q(["panel-section",se.value==="geometry"&&"panel-section-focused"]),"data-props-anchor":"geometry"},[e("div",Ks,[t[216]||(t[216]=Z(" Position & Size ",-1)),e("span",Zs,w(a.value.type),1)]),e("div",er,[e("div",tr,[t[217]||(t[217]=e("label",{class:"form-label"},"X",-1)),e("input",{type:"number",value:Math.round(a.value.x),class:"input",onChange:t[39]||(t[39]=o=>qe("x",o.target.value))},null,40,or)]),e("div",nr,[t[218]||(t[218]=e("label",{class:"form-label"},"Y",-1)),e("input",{type:"number",value:Math.round(a.value.y),class:"input",onChange:t[40]||(t[40]=o=>qe("y",o.target.value))},null,40,lr)]),e("div",ir,[t[219]||(t[219]=e("label",{class:"form-label"},"W",-1)),e("input",{type:"number",value:Math.round(a.value.width),class:"input",onChange:t[41]||(t[41]=o=>qe("width",o.target.value))},null,40,ar)]),e("div",sr,[t[220]||(t[220]=e("label",{class:"form-label"},"H",-1)),e("input",{type:"number",value:Math.round(a.value.height),class:"input",onChange:t[42]||(t[42]=o=>qe("height",o.target.value))},null,40,rr)]),e("div",dr,[t[221]||(t[221]=e("label",{class:"form-label"},"Rot °",-1)),e("input",{type:"number",value:Math.round(a.value.rotation||0),class:"input",onChange:t[43]||(t[43]=o=>qe("rotation",o.target.value))},null,40,ur)]),e("div",cr,[t[222]||(t[222]=e("label",{class:"form-label"},"Opacity",-1)),e("input",{type:"number",min:"0",max:"1",step:".05",value:a.value.opacity??1,class:"input",onChange:t[44]||(t[44]=o=>qe("opacity",o.target.value))},null,40,pr)])])],2),e("div",{class:Q(["panel-section",se.value==="animation"&&"panel-section-focused"]),"data-props-anchor":"animation"},[t[226]||(t[226]=e("div",{class:"panel-title"},"Animation",-1)),e("div",vr,[e("div",{class:"motion-scrubber-header"},[t[223]||(t[223]=e("span",{class:"motion-scrubber-title"},"Live Motion Preview",-1)),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:jt},"Replay")]),(l(),i("div",{class:"motion-scrubber-stage motion-scrubber-stage-single",key:`single-preview-${O.value}`},[(l(!0),i(ee,null,de(Y.value,o=>(l(),i("span",{key:o.id,class:Q(["motion-scrubber-node",`motion-preview-live-${o.type==="auto"?"fade-up":o.type}`]),style:ce({"--preview-delay":`${o.delay}s`,"--preview-duration":`${o.duration}s`})},null,6))),128))]))]),e("div",fr,[(l(),i(ee,null,de(Ye,o=>e("button",{key:o.value,type:"button",class:Q(["motion-card",H.value.type===o.value&&"active"]),onClick:J=>xt({type:o.value})},[e("span",mr,[e("span",{class:Q(["motion-preview-dot",o.sampleClass])},null,2),o.value==="stagger-in"?(l(),i("span",br)):q("",!0),o.value==="stagger-in"?(l(),i("span",yr)):q("",!0)]),e("span",hr,w(o.label),1)],10,gr)),64))]),e("div",xr,[e("div",kr,[t[224]||(t[224]=e("label",{class:"form-label"},"Delay (seconds)",-1)),e("input",{type:"number",min:"0",step:"0.05",value:H.value.delay,class:"input",onChange:t[45]||(t[45]=o=>xt({delay:o.target.value}))},null,40,wr)]),e("div",Cr,[t[225]||(t[225]=e("label",{class:"form-label"},"Duration (seconds)",-1)),e("input",{type:"number",min:"0.1",step:"0.05",value:H.value.duration,class:"input",onChange:t[46]||(t[46]=o=>xt({duration:o.target.value}))},null,40,Sr)])]),e("div",$r,[ue(e("input",{"onUpdate:modelValue":t[47]||(t[47]=o=>te.value=o),class:"input",placeholder:"Save as preset, e.g. Hero Intro"},null,512),[[Se,te.value]]),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Ut},"Save")]),e("div",Ir,[ue(e("input",{"onUpdate:modelValue":t[48]||(t[48]=o=>C.value=o),class:"input",placeholder:"Category, e.g. Presentation"},null,512),[[Se,C.value]]),ue(e("input",{"onUpdate:modelValue":t[49]||(t[49]=o=>j.value=o),class:"input",placeholder:"Tags, comma separated"},null,512),[[Se,j.value]])]),K.value.length?(l(),i("div",Er,[(l(!0),i(ee,null,de(K.value,o=>(l(),i("div",{key:o.id,class:Q(["preset-item",ne.value===o.id&&"dragging",we.value===o.id&&ne.value!==o.id&&"drag-over"]),draggable:"true",onDragstart:J=>gt(o),onDragenter:Oe(J=>bt(o),["prevent"]),onDragover:t[53]||(t[53]=Oe(()=>{},["prevent"])),onDrop:Oe(J=>Lt(o),["prevent"]),onDragend:yt},[e("button",{type:"button",class:"preset-chip",onClick:J=>Rt(o)},w(o.name),9,Tr),o.category?(l(),i("span",Mr,w(o.category),1)):q("",!0),(l(!0),i(ee,null,de(o.tags||[],J=>(l(),i("span",{key:`${o.id}-${J}`,class:"preset-meta-chip muted"},"#"+w(J),1))),128)),e("button",{type:"button",class:"preset-mini-btn",onClick:J=>Ze(o)},"Duplicate",8,Pr),e("button",{type:"button",class:"preset-mini-btn",onClick:J=>Re(o)},"Rename",8,Br),e("button",{type:"button",class:"preset-mini-btn danger",onClick:J=>$e(o.id)},"Delete",8,Nr),R.value===o.id?(l(),i("div",zr,[ue(e("input",{"onUpdate:modelValue":t[50]||(t[50]=J=>F.value=J),class:"input"},null,512),[[Se,F.value]]),ue(e("input",{"onUpdate:modelValue":t[51]||(t[51]=J=>pe.value=J),class:"input",placeholder:"Category"},null,512),[[Se,pe.value]]),ue(e("input",{"onUpdate:modelValue":t[52]||(t[52]=J=>be.value=J),class:"input",placeholder:"Tags, comma separated"},null,512),[[Se,be.value]]),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:J=>Ve(o.id)},"Save",8,Lr),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Be},"Cancel")])):q("",!0)],42,Ar))),128))])):me.value.length?(l(),i("div",jr,"No single-element presets match the current search.")):q("",!0),t[227]||(t[227]=e("div",{class:"field-hint"},"Use Auto to keep the preview defaults, or override with a specific entrance effect.",-1))],2),["text","heading"].includes(a.value.type)?(l(),i("div",{key:0,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[243]||(t[243]=e("div",{class:"panel-title"},"Text",-1)),e("div",_r,[t[228]||(t[228]=e("label",{class:"form-label"},"Content",-1)),e("textarea",{value:(kt=a.value.content)==null?void 0:kt.text,class:"textarea",style:{"min-height":"64px"},onInput:t[54]||(t[54]=o=>c({text:o.target.value}))},null,40,Dr)]),e("div",qr,[e("div",Rr,[t[229]||(t[229]=e("label",{class:"form-label"},"Size",-1)),e("input",{type:"number",value:(lt=a.value.content)==null?void 0:lt.fontSize,class:"input",onChange:t[55]||(t[55]=o=>c({fontSize:+o.target.value}))},null,40,Or)]),e("div",Fr,[t[231]||(t[231]=e("label",{class:"form-label"},"Weight",-1)),e("select",{value:(Mt=a.value.content)==null?void 0:Mt.fontWeight,class:"select",onChange:t[56]||(t[56]=o=>c({fontWeight:o.target.value}))},[...t[230]||(t[230]=[e("option",{value:"normal"},"Normal",-1),e("option",{value:"bold"},"Bold",-1),e("option",{value:"600"},"Semi-bold",-1),e("option",{value:"300"},"Light",-1)])],40,Ur)])]),e("div",Vr,[t[232]||(t[232]=e("label",{class:"form-label"},"Font Family",-1)),e("select",{value:(Ht=a.value.content)==null?void 0:Ht.fontFamily,class:"select",onChange:t[57]||(t[57]=o=>c({fontFamily:o.target.value}))},[(l(),i(ee,null,de(T,o=>e("option",{key:o,value:o,style:ce({fontFamily:o})},w(o.split(",")[0].replace(/\"/g,"")),13,Gr)),64))],40,Wr)]),e("div",Hr,[t[233]||(t[233]=e("label",{class:"form-label"},"Align",-1)),e("div",Yr,[(l(),i(ee,null,de(["left","center","right","justify"],o=>{var J;return e("button",{key:o,class:Q(["align-btn",((J=a.value.content)==null?void 0:J.textAlign)===o&&"active"]),onClick:cl=>c({textAlign:o})},w(o[0].toUpperCase()),11,Jr)}),64))])]),e("div",Qr,[t[237]||(t[237]=e("label",{class:"form-label"},"Style",-1)),e("div",Xr,[e("button",{class:Q(["style-btn",((Yt=a.value.content)==null?void 0:Yt.fontStyle)==="italic"&&"active"]),onClick:t[58]||(t[58]=o=>{var J;return c({fontStyle:((J=a.value.content)==null?void 0:J.fontStyle)==="italic"?"normal":"italic"})})},[...t[234]||(t[234]=[e("i",null,"I",-1)])],2),e("button",{class:Q(["style-btn",((Jt=a.value.content)==null?void 0:Jt.textDecoration)==="underline"&&"active"]),onClick:t[59]||(t[59]=o=>{var J;return c({textDecoration:((J=a.value.content)==null?void 0:J.textDecoration)==="underline"?"none":"underline"})})},[...t[235]||(t[235]=[e("u",null,"U",-1)])],2),e("button",{class:Q(["style-btn",((Qt=a.value.content)==null?void 0:Qt.textDecoration)==="line-through"&&"active"]),onClick:t[60]||(t[60]=o=>{var J;return c({textDecoration:((J=a.value.content)==null?void 0:J.textDecoration)==="line-through"?"none":"line-through"})})},[...t[236]||(t[236]=[e("s",null,"S",-1)])],2)])]),e("div",Kr,[t[238]||(t[238]=e("label",{class:"form-label"},"Color",-1)),e("div",Zr,[e("input",{type:"color",value:((Xt=a.value.content)==null?void 0:Xt.color)||"#000",onInput:t[61]||(t[61]=o=>c({color:o.target.value})),class:"color-input-native"},null,40,ed),e("input",{value:((Kt=a.value.content)==null?void 0:Kt.color)||"#000",class:"input",onInput:t[62]||(t[62]=o=>c({color:o.target.value})),style:{"font-family":"var(--font-mono)","font-size":"var(--text-xs)"}},null,40,td)])]),e("div",od,[t[239]||(t[239]=e("label",{class:"form-label"},"Line Height",-1)),e("input",{type:"number",min:".8",max:"3",step:".1",value:((Zt=a.value.content)==null?void 0:Zt.lineHeight)??1.5,class:"input",onChange:t[63]||(t[63]=o=>c({lineHeight:+o.target.value}))},null,40,nd)]),e("div",ld,[e("div",id,[t[241]||(t[241]=e("label",{class:"form-label"},"Case",-1)),e("select",{value:((eo=a.value.content)==null?void 0:eo.textTransform)||"none",class:"select",onChange:t[64]||(t[64]=o=>c({textTransform:o.target.value}))},[...t[240]||(t[240]=[e("option",{value:"none"},"Normal",-1),e("option",{value:"uppercase"},"UPPERCASE",-1),e("option",{value:"lowercase"},"lowercase",-1),e("option",{value:"capitalize"},"Capitalize",-1)])],40,ad)]),e("div",sd,[t[242]||(t[242]=e("label",{class:"form-label"},"Letter Spacing",-1)),e("input",{type:"number",step:".2",value:((to=a.value.content)==null?void 0:to.letterSpacing)??0,class:"input",onChange:t[65]||(t[65]=o=>c({letterSpacing:+o.target.value}))},null,40,rd)])])],2)):q("",!0),a.value.type==="image"?(l(),i("div",{key:1,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[251]||(t[251]=e("div",{class:"panel-title"},"Image",-1)),e("div",dd,[t[244]||(t[244]=e("label",{class:"form-label"},"Source URL",-1)),e("input",{value:(oo=a.value.content)==null?void 0:oo.src,class:"input",placeholder:"https://...",onInput:t[66]||(t[66]=o=>c({src:o.target.value}))},null,40,ud)]),e("div",cd,[t[245]||(t[245]=e("label",{class:"form-label"},"Alt Text",-1)),e("input",{value:(no=a.value.content)==null?void 0:no.alt,class:"input",onInput:t[67]||(t[67]=o=>c({alt:o.target.value}))},null,40,pd)]),e("div",vd,[t[247]||(t[247]=e("label",{class:"form-label"},"Object Fit",-1)),e("select",{value:((lo=a.value.content)==null?void 0:lo.objectFit)||"cover",class:"select",onChange:t[68]||(t[68]=o=>c({objectFit:o.target.value}))},[...t[246]||(t[246]=[e("option",{value:"cover"},"Cover",-1),e("option",{value:"contain"},"Contain",-1),e("option",{value:"fill"},"Fill",-1),e("option",{value:"none"},"None",-1)])],40,fd)]),e("div",gd,[t[248]||(t[248]=e("label",{class:"form-label"},"Border Radius",-1)),e("input",{type:"number",min:"0",value:((io=a.value.content)==null?void 0:io.borderRadius)||0,class:"input",onChange:t[69]||(t[69]=o=>c({borderRadius:+o.target.value}))},null,40,md)]),e("div",bd,[e("div",yd,[t[249]||(t[249]=e("label",{class:"form-label"},"Border Width",-1)),e("input",{type:"number",min:"0",value:((ao=a.value.content)==null?void 0:ao.borderWidth)||0,class:"input",onChange:t[70]||(t[70]=o=>c({borderWidth:+o.target.value}))},null,40,hd)]),e("div",xd,[t[250]||(t[250]=e("label",{class:"form-label"},"Border Color",-1)),e("input",{type:"color",value:((so=a.value.content)==null?void 0:so.borderColor)||"#e2e8f0",class:"color-input-native",onInput:t[71]||(t[71]=o=>c({borderColor:o.target.value}))},null,40,kd)])])],2)):q("",!0),a.value.type==="shape"?(l(),i("div",{key:2,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[259]||(t[259]=e("div",{class:"panel-title"},"Shape",-1)),e("div",wd,[t[253]||(t[253]=e("label",{class:"form-label"},"Type",-1)),e("select",{value:((ro=a.value.content)==null?void 0:ro.shapeType)||"rectangle",class:"select",onChange:t[72]||(t[72]=o=>c({shapeType:o.target.value}))},[...t[252]||(t[252]=[et('<option value="rectangle" data-v-617e31e2>Rectangle</option><option value="circle" data-v-617e31e2>Circle</option><option value="triangle" data-v-617e31e2>Triangle</option><option value="star" data-v-617e31e2>Star</option><option value="arrow" data-v-617e31e2>Arrow</option><option value="diamond" data-v-617e31e2>Diamond</option>',6)])],40,Cd)]),e("div",Sd,[t[254]||(t[254]=e("label",{class:"form-label"},"Fill Color",-1)),e("div",$d,[e("input",{type:"color",value:((uo=a.value.content)==null?void 0:uo.fillColor)||"#6c47ff",onInput:t[73]||(t[73]=o=>c({fillColor:o.target.value})),class:"color-input-native"},null,40,Id),e("input",{value:((co=a.value.content)==null?void 0:co.fillColor)||"#6c47ff",class:"input",onInput:t[74]||(t[74]=o=>c({fillColor:o.target.value})),style:{"font-family":"var(--font-mono)","font-size":"var(--text-xs)"}},null,40,Ed)])]),e("div",Ad,[t[255]||(t[255]=e("label",{class:"form-label"},"Border Color",-1)),e("div",Td,[e("input",{type:"color",value:((po=a.value.content)==null?void 0:po.borderColor)||"transparent",onInput:t[75]||(t[75]=o=>c({borderColor:o.target.value})),class:"color-input-native"},null,40,Md),e("input",{value:((vo=a.value.content)==null?void 0:vo.borderColor)||"transparent",class:"input",onInput:t[76]||(t[76]=o=>c({borderColor:o.target.value})),style:{"font-family":"var(--font-mono)","font-size":"var(--text-xs)"}},null,40,Pd)])]),e("div",Bd,[t[256]||(t[256]=e("label",{class:"form-label"},"Border Width",-1)),e("input",{type:"number",min:"0",value:((fo=a.value.content)==null?void 0:fo.borderWidth)||0,class:"input",onChange:t[77]||(t[77]=o=>c({borderWidth:+o.target.value}))},null,40,Nd)]),e("div",zd,[t[257]||(t[257]=e("label",{class:"form-label"},"Corner Radius",-1)),e("input",{type:"number",min:"0",value:((go=a.value.content)==null?void 0:go.borderRadius)||0,class:"input",onChange:t[78]||(t[78]=o=>c({borderRadius:+o.target.value}))},null,40,Ld)]),e("div",jd,[t[258]||(t[258]=e("label",{class:"form-label"},"Fill Opacity",-1)),e("input",{type:"number",min:"0",max:"1",step:".05",value:((mo=a.value.content)==null?void 0:mo.opacity)??1,class:"input",onChange:t[79]||(t[79]=o=>c({opacity:+o.target.value}))},null,40,_d)])],2)):q("",!0),a.value.type==="chart"?(l(),i("div",{key:3,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[280]||(t[280]=e("div",{class:"panel-title"},"Chart",-1)),e("div",Dd,[t[261]||(t[261]=e("label",{class:"form-label"},"Chart Type",-1)),e("select",{value:((bo=a.value.content)==null?void 0:bo.chartType)||"bar",class:"select",onChange:t[80]||(t[80]=o=>c({chartType:o.target.value}))},[...t[260]||(t[260]=[e("option",{value:"bar"},"Bar",-1),e("option",{value:"line"},"Line",-1),e("option",{value:"circle"},"Circle",-1)])],40,qd)]),e("div",Rd,[t[262]||(t[262]=e("label",{class:"form-label"},"Title",-1)),e("input",{value:((yo=a.value.content)==null?void 0:yo.title)||"",class:"input",onInput:t[81]||(t[81]=o=>c({title:o.target.value}))},null,40,Od)]),e("div",Fd,[t[263]||(t[263]=e("label",{class:"form-label"},"Data or pasted CSV/TSV",-1)),e("textarea",{value:((ho=a.value.content)==null?void 0:ho.dataText)||"",class:"textarea",style:{"min-height":"110px"},placeholder:`Q1, 120
Q2, 180
Q3, 150`,onInput:t[82]||(t[82]=o=>c({dataText:o.target.value}))},null,40,Ud),e("div",{class:"chart-data-actions"},[e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Ct},"Normalize rows"),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:Ke},"Upload CSV")]),t[264]||(t[264]=e("div",{class:"field-hint"},"Use `label, value`, `label: value`, spreadsheet tab-separated rows, or a two-column CSV. Percentages and totals are calculated automatically for circle charts.",-1))]),e("div",Vd,[t[265]||(t[265]=e("label",{class:"form-label"},"Paste table data",-1)),ue(e("textarea",{"onUpdate:modelValue":t[83]||(t[83]=o=>ge.value=o),class:"textarea",style:{"min-height":"84px"},placeholder:`Label,Value
North,42
South,31`},null,512),[[Se,ge.value]]),e("div",Wd,[e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:t[84]||(t[84]=o=>De(ge.value))},"Convert pasted data")])]),e("div",Gd,[t[266]||(t[266]=e("label",{class:"form-label"},"Palette",-1)),e("input",{value:((xo=a.value.content)==null?void 0:xo.paletteText)||"",class:"input",placeholder:ot.value.paletteText,onInput:t[85]||(t[85]=o=>c({paletteText:o.target.value}))},null,40,Hd),e("div",Yd,[(l(!0),i(ee,null,de(wt.value,(o,J)=>(l(),i("span",{key:`chart-palette-${J}`,class:"chart-palette-swatch",style:ce({background:o})},null,4))),128))]),e("div",{class:"chart-data-actions"},[e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:$t},"Use theme palette"),e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:St},"Apply theme colors")]),t[267]||(t[267]=e("div",{class:"field-hint"},"Separate colors with commas. Theme palette uses the project theme colors if you leave this aligned with the generated value.",-1))]),e("div",Jd,[e("div",Qd,[t[268]||(t[268]=e("label",{class:"form-label"},"Background",-1)),e("input",{type:"color",value:((ko=a.value.content)==null?void 0:ko.backgroundColor)||"#ffffff",class:"color-input-native",onInput:t[86]||(t[86]=o=>c({backgroundColor:o.target.value}))},null,40,Xd)]),e("div",Kd,[t[269]||(t[269]=e("label",{class:"form-label"},"Text",-1)),e("input",{type:"color",value:((wo=a.value.content)==null?void 0:wo.textColor)||"#1a1a2e",class:"color-input-native",onInput:t[87]||(t[87]=o=>c({textColor:o.target.value}))},null,40,Zd)])]),e("div",eu,[e("div",tu,[t[270]||(t[270]=e("label",{class:"form-label"},"Grid",-1)),e("input",{type:"color",value:((Co=a.value.content)==null?void 0:Co.gridColor)||"#dbe3ef",class:"color-input-native",onInput:t[88]||(t[88]=o=>c({gridColor:o.target.value}))},null,40,ou)]),e("div",nu,[t[271]||(t[271]=e("label",{class:"form-label"},"Border",-1)),e("input",{type:"color",value:((So=a.value.content)==null?void 0:So.borderColor)||"#e2e8f0",class:"color-input-native",onInput:t[89]||(t[89]=o=>c({borderColor:o.target.value}))},null,40,lu)])]),e("div",iu,[e("div",au,[t[272]||(t[272]=e("label",{class:"form-label"},"Border Width",-1)),e("input",{type:"number",min:"0",value:(($o=a.value.content)==null?void 0:$o.borderWidth)??1,class:"input",onChange:t[90]||(t[90]=o=>c({borderWidth:+o.target.value}))},null,40,su)]),((Io=a.value.content)==null?void 0:Io.chartType)!=="circle"?(l(),i("div",ru,[t[273]||(t[273]=e("label",{class:"form-label"},"Max Value",-1)),e("input",{value:((Eo=a.value.content)==null?void 0:Eo.maxValue)??"",class:"input",placeholder:"Auto",onInput:t[91]||(t[91]=o=>c({maxValue:o.target.value}))},null,40,du)])):(l(),i("div",uu,[t[274]||(t[274]=e("label",{class:"form-label"},"Inner Radius %",-1)),e("input",{type:"number",min:"20",max:"85",value:((Ao=a.value.content)==null?void 0:Ao.innerRadius)??62,class:"input",onChange:t[92]||(t[92]=o=>c({innerRadius:+o.target.value}))},null,40,cu)]))]),((To=a.value.content)==null?void 0:To.chartType)==="line"?(l(),i("div",pu,[e("div",vu,[t[275]||(t[275]=e("label",{class:"form-label"},"Line Width",-1)),e("input",{type:"number",min:"1",max:"8",value:((Mo=a.value.content)==null?void 0:Mo.strokeWidth)??3,class:"input",onChange:t[93]||(t[93]=o=>c({strokeWidth:+o.target.value}))},null,40,fu)]),e("label",gu,[e("input",{type:"checkbox",checked:!!((Po=a.value.content)!=null&&Po.showArea),onChange:t[94]||(t[94]=o=>c({showArea:o.target.checked}))},null,40,mu),t[276]||(t[276]=Z(" Show area fill ",-1))])])):q("",!0),e("label",bu,[e("input",{type:"checkbox",checked:((Bo=a.value.content)==null?void 0:Bo.showLegend)!==!1,onChange:t[95]||(t[95]=o=>c({showLegend:o.target.checked}))},null,40,yu),t[277]||(t[277]=Z(" Show legend ",-1))]),((No=a.value.content)==null?void 0:No.chartType)!=="circle"?(l(),i("label",hu,[e("input",{type:"checkbox",checked:((zo=a.value.content)==null?void 0:zo.showGrid)!==!1,onChange:t[96]||(t[96]=o=>c({showGrid:o.target.checked}))},null,40,xu),t[278]||(t[278]=Z(" Show grid lines ",-1))])):q("",!0),e("label",ku,[e("input",{type:"checkbox",checked:((Lo=a.value.content)==null?void 0:Lo.showValues)!==!1,onChange:t[97]||(t[97]=o=>c({showValues:o.target.checked}))},null,40,wu),t[279]||(t[279]=Z(" Show values ",-1))])],2)):q("",!0),a.value.type==="button"?(l(),i("div",{key:4,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[296]||(t[296]=e("div",{class:"panel-title"},"Button",-1)),e("div",Cu,[t[281]||(t[281]=e("label",{class:"form-label"},"Label",-1)),e("input",{value:(jo=a.value.content)==null?void 0:jo.label,class:"input",onInput:t[98]||(t[98]=o=>c({label:o.target.value}))},null,40,Su)]),e("div",$u,[t[283]||(t[283]=e("label",{class:"form-label"},"Style",-1)),e("select",{value:((_o=a.value.content)==null?void 0:_o.variant)||"primary",class:"select",onChange:t[99]||(t[99]=o=>c({variant:o.target.value}))},[...t[282]||(t[282]=[et('<option value="primary" data-v-617e31e2>Primary</option><option value="secondary" data-v-617e31e2>Secondary</option><option value="outline" data-v-617e31e2>Outline</option><option value="ghost" data-v-617e31e2>Ghost</option><option value="danger" data-v-617e31e2>Danger</option>',5)])],40,Iu)]),e("div",Eu,[t[285]||(t[285]=e("label",{class:"form-label"},"Action",-1)),e("select",{value:((Do=a.value.content)==null?void 0:Do.action)||"none",class:"select",onChange:t[100]||(t[100]=o=>c({action:o.target.value}))},[...t[284]||(t[284]=[e("option",{value:"none"},"None",-1),e("option",{value:"navigate"},"Navigate to slide",-1),e("option",{value:"link"},"Open URL",-1),e("option",{value:"submit"},"Submit",-1)])],40,Au)]),(qo=a.value.content)!=null&&qo.action&&a.value.content.action!=="none"?(l(),i("div",Tu,[t[286]||(t[286]=e("label",{class:"form-label"},"Target (slide # or URL)",-1)),e("input",{value:(Ro=a.value.content)==null?void 0:Ro.target,class:"input",placeholder:"Slide # or https://...",onInput:t[101]||(t[101]=o=>c({target:o.target.value}))},null,40,Mu)])):q("",!0),e("div",Pu,[e("div",Bu,[t[287]||(t[287]=e("label",{class:"form-label"},"Background",-1)),e("input",{type:"color",value:((Oo=a.value.content)==null?void 0:Oo.bgColor)||"#6c47ff",class:"color-input-native",onInput:t[102]||(t[102]=o=>c({bgColor:o.target.value}))},null,40,Nu)]),e("div",zu,[t[288]||(t[288]=e("label",{class:"form-label"},"Text Color",-1)),e("input",{type:"color",value:((Fo=a.value.content)==null?void 0:Fo.textColor)||"#ffffff",class:"color-input-native",onInput:t[103]||(t[103]=o=>c({textColor:o.target.value}))},null,40,Lu)])]),e("div",ju,[e("div",_u,[t[289]||(t[289]=e("label",{class:"form-label"},"Border Color",-1)),e("input",{type:"color",value:((Uo=a.value.content)==null?void 0:Uo.borderColor)||"#6c47ff",class:"color-input-native",onInput:t[104]||(t[104]=o=>c({borderColor:o.target.value}))},null,40,Du)]),e("div",qu,[t[290]||(t[290]=e("label",{class:"form-label"},"Corner Radius",-1)),e("input",{type:"number",min:"0",value:((Vo=a.value.content)==null?void 0:Vo.borderRadius)??8,class:"input",onChange:t[105]||(t[105]=o=>c({borderRadius:+o.target.value}))},null,40,Ru)])]),e("div",Ou,[e("div",Fu,[t[291]||(t[291]=e("label",{class:"form-label"},"Font Size",-1)),e("input",{type:"number",min:"10",value:((Wo=a.value.content)==null?void 0:Wo.fontSize)??15,class:"input",onChange:t[106]||(t[106]=o=>c({fontSize:+o.target.value}))},null,40,Uu)]),e("div",Vu,[t[293]||(t[293]=e("label",{class:"form-label"},"Weight",-1)),e("select",{value:String(((Go=a.value.content)==null?void 0:Go.fontWeight)??600),class:"select",onChange:t[107]||(t[107]=o=>c({fontWeight:+o.target.value}))},[...t[292]||(t[292]=[e("option",{value:"400"},"Normal",-1),e("option",{value:"500"},"Medium",-1),e("option",{value:"600"},"Semi-bold",-1),e("option",{value:"700"},"Bold",-1)])],40,Wu)])]),e("div",Gu,[e("div",Hu,[t[294]||(t[294]=e("label",{class:"form-label"},"Font Family",-1)),e("select",{value:((Ho=a.value.content)==null?void 0:Ho.fontFamily)||"Inter, sans-serif",class:"select",onChange:t[108]||(t[108]=o=>c({fontFamily:o.target.value}))},[(l(),i(ee,null,de(T,o=>e("option",{key:`btn-${o}`,value:o},w(o.split(",")[0]),9,Ju)),64))],40,Yu)]),e("div",Qu,[t[295]||(t[295]=e("label",{class:"form-label"},"Letter Spacing",-1)),e("input",{type:"number",step:".2",value:((Yo=a.value.content)==null?void 0:Yo.letterSpacing)??0,class:"input",onChange:t[109]||(t[109]=o=>c({letterSpacing:+o.target.value}))},null,40,Xu)])])],2)):q("",!0),a.value.type==="hotspot"?(l(),i("div",{key:5,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[306]||(t[306]=e("div",{class:"panel-title"},"Hotspot",-1)),e("div",Ku,[t[298]||(t[298]=e("label",{class:"form-label"},"Icon",-1)),e("select",{value:((Jo=a.value.content)==null?void 0:Jo.icon)||"?",class:"select",onChange:t[110]||(t[110]=o=>c({icon:o.target.value}))},[...t[297]||(t[297]=[et('<option value="?" data-v-617e31e2>? (Info)</option><option value="!" data-v-617e31e2>! (Alert)</option><option value="+" data-v-617e31e2>+ (Plus)</option><option value="i" data-v-617e31e2>i (Info)</option><option value="✦" data-v-617e31e2>✦ (Star)</option>',5)])],40,Zu)]),e("div",ec,[t[299]||(t[299]=e("label",{class:"form-label"},"Background Color",-1)),e("div",tc,[e("input",{type:"color",value:((Qo=a.value.content)==null?void 0:Qo.bgColor)||"#6c47ff",onInput:t[111]||(t[111]=o=>c({bgColor:o.target.value})),class:"color-input-native"},null,40,oc),e("input",{value:((Xo=a.value.content)==null?void 0:Xo.bgColor)||"#6c47ff",class:"input",onInput:t[112]||(t[112]=o=>c({bgColor:o.target.value})),style:{"font-family":"var(--font-mono)","font-size":"var(--text-xs)"}},null,40,nc)])]),e("div",lc,[e("div",ic,[t[300]||(t[300]=e("label",{class:"form-label"},"Icon Color",-1)),e("input",{type:"color",value:((Ko=a.value.content)==null?void 0:Ko.iconColor)||"#ffffff",class:"color-input-native",onInput:t[113]||(t[113]=o=>c({iconColor:o.target.value}))},null,40,ac)]),e("div",sc,[t[301]||(t[301]=e("label",{class:"form-label"},"Corner Radius",-1)),e("input",{type:"number",min:"0",value:((Zo=a.value.content)==null?void 0:Zo.borderRadius)??999,class:"input",onChange:t[114]||(t[114]=o=>c({borderRadius:+o.target.value}))},null,40,rc)])]),e("div",dc,[t[302]||(t[302]=e("label",{class:"form-label"},"Popup Title",-1)),e("input",{value:(en=a.value.content)==null?void 0:en.popupTitle,class:"input",onInput:t[115]||(t[115]=o=>c({popupTitle:o.target.value}))},null,40,uc)]),e("div",cc,[t[303]||(t[303]=e("label",{class:"form-label"},"Popup Content",-1)),e("textarea",{value:(tn=a.value.content)==null?void 0:tn.popupContent,class:"textarea",onInput:t[116]||(t[116]=o=>c({popupContent:o.target.value}))},null,40,pc)]),e("div",vc,[e("div",fc,[t[304]||(t[304]=e("label",{class:"form-label"},"Popup Background",-1)),e("input",{type:"color",value:((on=a.value.content)==null?void 0:on.popupBgColor)||"#ffffff",class:"color-input-native",onInput:t[117]||(t[117]=o=>c({popupBgColor:o.target.value}))},null,40,gc)]),e("div",mc,[t[305]||(t[305]=e("label",{class:"form-label"},"Popup Text",-1)),e("input",{type:"color",value:((nn=a.value.content)==null?void 0:nn.popupTextColor)||"#1a1a2e",class:"color-input-native",onInput:t[118]||(t[118]=o=>c({popupTextColor:o.target.value}))},null,40,bc)])])],2)):q("",!0),a.value.type==="video"?(l(),i("div",{key:6,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[315]||(t[315]=e("div",{class:"panel-title"},"Video",-1)),e("div",yc,[t[307]||(t[307]=e("label",{class:"form-label"},"Video URL / Embed",-1)),e("input",{value:(ln=a.value.content)==null?void 0:ln.src,class:"input",placeholder:"YouTube, Vimeo, or direct .mp4 URL",onInput:t[119]||(t[119]=o=>c({src:o.target.value}))},null,40,hc)]),e("div",xc,[t[308]||(t[308]=e("label",{class:"form-label"},"Poster Image URL",-1)),e("input",{value:(an=a.value.content)==null?void 0:an.poster,class:"input",onInput:t[120]||(t[120]=o=>c({poster:o.target.value}))},null,40,kc)]),e("div",wc,[t[310]||(t[310]=e("label",{class:"form-label"},"Object Fit",-1)),e("select",{value:((sn=a.value.content)==null?void 0:sn.objectFit)||"cover",class:"select",onChange:t[121]||(t[121]=o=>c({objectFit:o.target.value}))},[...t[309]||(t[309]=[e("option",{value:"cover"},"Cover",-1),e("option",{value:"contain"},"Contain",-1),e("option",{value:"fill"},"Fill",-1),e("option",{value:"none"},"None",-1)])],40,Cc)]),e("label",Sc,[e("input",{type:"checkbox",checked:(rn=a.value.content)==null?void 0:rn.autoplay,onChange:t[122]||(t[122]=o=>c({autoplay:o.target.checked}))},null,40,$c),t[311]||(t[311]=Z(" Autoplay ",-1))]),e("label",Ic,[e("input",{type:"checkbox",checked:((dn=a.value.content)==null?void 0:dn.controls)??!0,onChange:t[123]||(t[123]=o=>c({controls:o.target.checked}))},null,40,Ec),t[312]||(t[312]=Z(" Show Controls ",-1))]),e("label",Ac,[e("input",{type:"checkbox",checked:(un=a.value.content)==null?void 0:un.loop,onChange:t[124]||(t[124]=o=>c({loop:o.target.checked}))},null,40,Tc),t[313]||(t[313]=Z(" Loop ",-1))]),e("label",Mc,[e("input",{type:"checkbox",checked:(cn=a.value.content)==null?void 0:cn.muted,onChange:t[125]||(t[125]=o=>c({muted:o.target.checked}))},null,40,Pc),t[314]||(t[314]=Z(" Muted ",-1))])],2)):q("",!0),a.value.type==="audio"?(l(),i("div",{key:7,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[324]||(t[324]=e("div",{class:"panel-title"},"Audio",-1)),e("div",Bc,[t[316]||(t[316]=e("label",{class:"form-label"},"Audio URL",-1)),e("input",{value:(pn=a.value.content)==null?void 0:pn.src,class:"input",placeholder:".mp3 / .wav URL",onInput:t[126]||(t[126]=o=>c({src:o.target.value}))},null,40,Nc)]),e("div",zc,[t[317]||(t[317]=e("label",{class:"form-label"},"Label",-1)),e("input",{value:(vn=a.value.content)==null?void 0:vn.label,class:"input",onInput:t[127]||(t[127]=o=>c({label:o.target.value}))},null,40,Lc)]),e("label",jc,[e("input",{type:"checkbox",checked:(fn=a.value.content)==null?void 0:fn.autoplay,onChange:t[128]||(t[128]=o=>c({autoplay:o.target.checked}))},null,40,_c),t[318]||(t[318]=Z(" Autoplay ",-1))]),e("label",Dc,[e("input",{type:"checkbox",checked:((gn=a.value.content)==null?void 0:gn.controls)!==!1,onChange:t[129]||(t[129]=o=>c({controls:o.target.checked}))},null,40,qc),t[319]||(t[319]=Z(" Show Controls ",-1))]),e("label",Rc,[e("input",{type:"checkbox",checked:(mn=a.value.content)==null?void 0:mn.loop,onChange:t[130]||(t[130]=o=>c({loop:o.target.checked}))},null,40,Oc),t[320]||(t[320]=Z(" Loop ",-1))]),e("div",Fc,[e("div",Uc,[t[321]||(t[321]=e("label",{class:"form-label"},"Accent Color",-1)),e("input",{type:"color",value:((bn=a.value.content)==null?void 0:bn.accentColor)||"#6c47ff",class:"color-input-native",onInput:t[131]||(t[131]=o=>c({accentColor:o.target.value}))},null,40,Vc)]),e("div",Wc,[t[322]||(t[322]=e("label",{class:"form-label"},"Text Color",-1)),e("input",{type:"color",value:((yn=a.value.content)==null?void 0:yn.textColor)||"#555555",class:"color-input-native",onInput:t[132]||(t[132]=o=>c({textColor:o.target.value}))},null,40,Gc)])]),e("div",Hc,[t[323]||(t[323]=e("label",{class:"form-label"},"Background Color",-1)),e("input",{type:"color",value:((hn=a.value.content)==null?void 0:hn.bgColor)||"#ede7ff",class:"color-input-native",onInput:t[133]||(t[133]=o=>c({bgColor:o.target.value}))},null,40,Yc)])],2)):q("",!0),a.value.type==="quiz"?(l(),i("div",{key:8,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[332]||(t[332]=e("div",{class:"panel-title"},"Quiz Question",-1)),e("div",Jc,[t[325]||(t[325]=e("label",{class:"form-label"},"Question",-1)),e("textarea",{value:(xn=a.value.content)==null?void 0:xn.question,class:"textarea",style:{"min-height":"60px"},onInput:t[134]||(t[134]=o=>c({question:o.target.value}))},null,40,Qc)]),e("div",Xc,[t[326]||(t[326]=e("label",{class:"form-label"},"Options (one per line)",-1)),e("textarea",{value:(wn=(kn=a.value.content)==null?void 0:kn.options)==null?void 0:wn.join(`
`),class:"textarea",style:{"min-height":"80px"},onInput:t[135]||(t[135]=o=>c({options:o.target.value.split(`
`).filter(Boolean)}))},null,40,Kc)]),e("div",Zc,[t[327]||(t[327]=e("label",{class:"form-label"},"Correct Answer Index (0-based)",-1)),e("input",{type:"number",min:"0",value:((Cn=a.value.content)==null?void 0:Cn.correctIndex)??0,class:"input",onChange:t[136]||(t[136]=o=>c({correctIndex:+o.target.value}))},null,40,ep)]),e("div",tp,[t[328]||(t[328]=e("label",{class:"form-label"},"Explanation",-1)),e("textarea",{value:(Sn=a.value.content)==null?void 0:Sn.explanation,class:"textarea",onInput:t[137]||(t[137]=o=>c({explanation:o.target.value}))},null,40,op)]),e("div",np,[e("div",lp,[t[329]||(t[329]=e("label",{class:"form-label"},"Card Background",-1)),e("input",{type:"color",value:(($n=a.value.content)==null?void 0:$n.cardBgColor)||"#ffffff",class:"color-input-native",onInput:t[138]||(t[138]=o=>c({cardBgColor:o.target.value}))},null,40,ip)]),e("div",ap,[t[330]||(t[330]=e("label",{class:"form-label"},"Question Color",-1)),e("input",{type:"color",value:((In=a.value.content)==null?void 0:In.questionColor)||"#1a1a2e",class:"color-input-native",onInput:t[139]||(t[139]=o=>c({questionColor:o.target.value}))},null,40,sp)])]),e("div",rp,[t[331]||(t[331]=e("label",{class:"form-label"},"Accent Color",-1)),e("input",{type:"color",value:((En=a.value.content)==null?void 0:En.accentColor)||"#6c47ff",class:"color-input-native",onInput:t[140]||(t[140]=o=>c({accentColor:o.target.value}))},null,40,dp)])],2)):a.value.type==="tabs"?(l(),i("div",{key:9,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[338]||(t[338]=e("div",{class:"panel-title"},"Tabs Configuration",-1)),e("div",up,[t[333]||(t[333]=e("label",{class:"form-label"},"Tabs Data (JSON)",-1)),e("textarea",{value:JSON.stringify(((An=a.value.content)==null?void 0:An.tabs)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px","white-space":"pre"},onChange:t[141]||(t[141]=o=>{var J;return c({tabs:Le(o.target.value,(J=a.value.content)==null?void 0:J.tabs)})})},null,40,cp)]),e("div",pp,[e("div",vp,[t[334]||(t[334]=e("label",{class:"form-label"},"Active Tab",-1)),e("input",{type:"color",value:((Tn=a.value.content)==null?void 0:Tn.activeTabColor)||"#6c47ff",class:"color-input-native",onInput:t[142]||(t[142]=o=>c({activeTabColor:o.target.value}))},null,40,fp)]),e("div",gp,[t[335]||(t[335]=e("label",{class:"form-label"},"Inactive Tab",-1)),e("input",{type:"color",value:((Mn=a.value.content)==null?void 0:Mn.inactiveTabColor)||"#f8fafc",class:"color-input-native",onInput:t[143]||(t[143]=o=>c({inactiveTabColor:o.target.value}))},null,40,mp)]),e("div",bp,[t[336]||(t[336]=e("label",{class:"form-label"},"Content Bg",-1)),e("input",{type:"color",value:((Pn=a.value.content)==null?void 0:Pn.contentBgColor)||"#ffffff",class:"color-input-native",onInput:t[144]||(t[144]=o=>c({contentBgColor:o.target.value}))},null,40,yp)]),e("div",hp,[t[337]||(t[337]=e("label",{class:"form-label"},"Text Color",-1)),e("input",{type:"color",value:((Bn=a.value.content)==null?void 0:Bn.textColor)||"#1e293b",class:"color-input-native",onInput:t[145]||(t[145]=o=>c({textColor:o.target.value}))},null,40,xp)])])],2)):a.value.type==="accordion"?(l(),i("div",{key:10,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[344]||(t[344]=e("div",{class:"panel-title"},"Accordion Configuration",-1)),e("div",kp,[t[339]||(t[339]=e("label",{class:"form-label"},"Items Data (JSON)",-1)),e("textarea",{value:JSON.stringify(((Nn=a.value.content)==null?void 0:Nn.items)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px","white-space":"pre"},onChange:t[146]||(t[146]=o=>{var J;return c({items:Le(o.target.value,(J=a.value.content)==null?void 0:J.items)})})},null,40,wp)]),e("div",Cp,[e("div",Sp,[t[340]||(t[340]=e("label",{class:"form-label"},"Active Bg Color",-1)),e("input",{type:"color",value:((zn=a.value.content)==null?void 0:zn.activeBgColor)||"#f8fafc",class:"color-input-native",onInput:t[147]||(t[147]=o=>c({activeBgColor:o.target.value}))},null,40,$p)]),e("div",Ip,[t[341]||(t[341]=e("label",{class:"form-label"},"Active Title Color",-1)),e("input",{type:"color",value:((Ln=a.value.content)==null?void 0:Ln.activeColor)||"#6c47ff",class:"color-input-native",onInput:t[148]||(t[148]=o=>c({activeColor:o.target.value}))},null,40,Ep)]),e("div",Ap,[t[342]||(t[342]=e("label",{class:"form-label"},"Item Bg Color",-1)),e("input",{type:"color",value:((jn=a.value.content)==null?void 0:jn.itemBgColor)||"#ffffff",class:"color-input-native",onInput:t[149]||(t[149]=o=>c({itemBgColor:o.target.value}))},null,40,Tp)]),e("div",Mp,[t[343]||(t[343]=e("label",{class:"form-label"},"Text Color",-1)),e("input",{type:"color",value:((_n=a.value.content)==null?void 0:_n.textColor)||"#475569",class:"color-input-native",onInput:t[150]||(t[150]=o=>c({textColor:o.target.value}))},null,40,Pp)])])],2)):a.value.type==="flipcard"?(l(),i("div",{key:11,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[355]||(t[355]=e("div",{class:"panel-title"},"Flip Card Content",-1)),e("div",Bp,[t[346]||(t[346]=e("label",{class:"form-label"},"Direction",-1)),e("select",{value:((Dn=a.value.content)==null?void 0:Dn.flipDirection)||"horizontal",class:"select",onChange:t[151]||(t[151]=o=>c({flipDirection:o.target.value}))},[...t[345]||(t[345]=[e("option",{value:"horizontal"},"Horizontal (Y-axis)",-1),e("option",{value:"vertical"},"Vertical (X-axis)",-1)])],40,Np)]),e("div",zp,[t[347]||(t[347]=e("label",{class:"form-label"},"Front Title",-1)),e("input",{type:"text",value:(qn=a.value.content)==null?void 0:qn.frontTitle,class:"input",onInput:t[152]||(t[152]=o=>c({frontTitle:o.target.value}))},null,40,Lp)]),e("div",jp,[t[348]||(t[348]=e("label",{class:"form-label"},"Front Content",-1)),e("textarea",{value:(Rn=a.value.content)==null?void 0:Rn.frontContent,class:"textarea",onInput:t[153]||(t[153]=o=>c({frontContent:o.target.value}))},null,40,_p)]),e("div",Dp,[t[349]||(t[349]=e("label",{class:"form-label"},"Back Title",-1)),e("input",{type:"text",value:(On=a.value.content)==null?void 0:On.backTitle,class:"input",onInput:t[154]||(t[154]=o=>c({backTitle:o.target.value}))},null,40,qp)]),e("div",Rp,[t[350]||(t[350]=e("label",{class:"form-label"},"Back Content",-1)),e("textarea",{value:(Fn=a.value.content)==null?void 0:Fn.backContent,class:"textarea",onInput:t[155]||(t[155]=o=>c({backContent:o.target.value}))},null,40,Op)]),e("div",Fp,[e("div",Up,[t[351]||(t[351]=e("label",{class:"form-label"},"Front Bg",-1)),e("input",{type:"color",value:((Un=a.value.content)==null?void 0:Un.frontBgColor)||"#6c47ff",class:"color-input-native",onInput:t[156]||(t[156]=o=>c({frontBgColor:o.target.value}))},null,40,Vp)]),e("div",Wp,[t[352]||(t[352]=e("label",{class:"form-label"},"Front Text",-1)),e("input",{type:"color",value:((Vn=a.value.content)==null?void 0:Vn.frontTextColor)||"#ffffff",class:"color-input-native",onInput:t[157]||(t[157]=o=>c({frontTextColor:o.target.value}))},null,40,Gp)]),e("div",Hp,[t[353]||(t[353]=e("label",{class:"form-label"},"Back Bg",-1)),e("input",{type:"color",value:((Wn=a.value.content)==null?void 0:Wn.backBgColor)||"#ffffff",class:"color-input-native",onInput:t[158]||(t[158]=o=>c({backBgColor:o.target.value}))},null,40,Yp)]),e("div",Jp,[t[354]||(t[354]=e("label",{class:"form-label"},"Back Text",-1)),e("input",{type:"color",value:((Gn=a.value.content)==null?void 0:Gn.backTextColor)||"#1e293b",class:"color-input-native",onInput:t[159]||(t[159]=o=>c({backTextColor:o.target.value}))},null,40,Qp)])])],2)):a.value.type==="stepper"?(l(),i("div",{key:12,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[361]||(t[361]=e("div",{class:"panel-title"},"Stepper Configuration",-1)),e("div",Xp,[t[356]||(t[356]=e("label",{class:"form-label"},"Steps Data (JSON)",-1)),e("textarea",{value:JSON.stringify(((Hn=a.value.content)==null?void 0:Hn.steps)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px","white-space":"pre"},onChange:t[160]||(t[160]=o=>{var J;return c({steps:Le(o.target.value,(J=a.value.content)==null?void 0:J.steps)})})},null,40,Kp)]),e("div",Zp,[e("div",ev,[t[357]||(t[357]=e("label",{class:"form-label"},"Background",-1)),e("input",{type:"color",value:((Yn=a.value.content)==null?void 0:Yn.bgColor)||"#ffffff",class:"color-input-native",onInput:t[161]||(t[161]=o=>c({bgColor:o.target.value}))},null,40,tv)]),e("div",ov,[t[358]||(t[358]=e("label",{class:"form-label"},"Accent Color",-1)),e("input",{type:"color",value:((Jn=a.value.content)==null?void 0:Jn.accentColor)||"#6c47ff",class:"color-input-native",onInput:t[162]||(t[162]=o=>c({accentColor:o.target.value}))},null,40,nv)]),e("div",lv,[t[359]||(t[359]=e("label",{class:"form-label"},"Title Color",-1)),e("input",{type:"color",value:((Qn=a.value.content)==null?void 0:Qn.titleColor)||"#0f172a",class:"color-input-native",onInput:t[163]||(t[163]=o=>c({titleColor:o.target.value}))},null,40,iv)]),e("div",av,[t[360]||(t[360]=e("label",{class:"form-label"},"Text Color",-1)),e("input",{type:"color",value:((Xn=a.value.content)==null?void 0:Xn.textColor)||"#475569",class:"color-input-native",onInput:t[164]||(t[164]=o=>c({textColor:o.target.value}))},null,40,sv)])])],2)):a.value.type==="poll"?(l(),i("div",{key:13,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[365]||(t[365]=e("div",{class:"panel-title"},"Poll Configuration",-1)),e("div",rv,[t[362]||(t[362]=e("label",{class:"form-label"},"Question",-1)),e("input",{type:"text",value:((Kn=a.value.content)==null?void 0:Kn.question)||"",class:"input",onInput:t[165]||(t[165]=o=>c({question:o.target.value}))},null,40,dv)]),e("div",uv,[t[363]||(t[363]=e("label",{class:"form-label"},"Options (JSON)",-1)),e("textarea",{value:JSON.stringify(((Zn=a.value.content)==null?void 0:Zn.options)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px"},onChange:t[166]||(t[166]=o=>{var J;return c({options:Le(o.target.value,(J=a.value.content)==null?void 0:J.options)})})},null,40,cv)]),e("div",pv,[e("div",vv,[t[364]||(t[364]=e("label",{class:"form-label"},"Voted Color",-1)),e("input",{type:"color",value:((el=a.value.content)==null?void 0:el.votedColor)||"#6c47ff",class:"color-input-native",onInput:t[167]||(t[167]=o=>c({votedColor:o.target.value}))},null,40,fv)])])],2)):a.value.type==="labeledimage"?(l(),i("div",{key:14,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[368]||(t[368]=e("div",{class:"panel-title"},"Labeled Image Configuration",-1)),e("div",gv,[t[366]||(t[366]=e("label",{class:"form-label"},"Image URL",-1)),e("input",{type:"text",value:((tl=a.value.content)==null?void 0:tl.imageUrl)||"",class:"input",onInput:t[168]||(t[168]=o=>c({imageUrl:o.target.value}))},null,40,mv)]),e("div",bv,[t[367]||(t[367]=e("label",{class:"form-label"},"Markers (JSON)",-1)),e("textarea",{value:JSON.stringify(((ol=a.value.content)==null?void 0:ol.markers)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px"},onChange:t[169]||(t[169]=o=>{var J;return c({markers:Le(o.target.value,(J=a.value.content)==null?void 0:J.markers)})})},null,40,yv)])],2)):a.value.type==="matching"?(l(),i("div",{key:15,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[370]||(t[370]=e("div",{class:"panel-title"},"Matching Configuration",-1)),e("div",hv,[t[369]||(t[369]=e("label",{class:"form-label"},"Pairs (JSON)",-1)),e("textarea",{value:JSON.stringify(((nl=a.value.content)==null?void 0:nl.pairs)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px"},onChange:t[170]||(t[170]=o=>{var J;return c({pairs:Le(o.target.value,(J=a.value.content)==null?void 0:J.pairs)})})},null,40,xv)])],2)):a.value.type==="sorting"?(l(),i("div",{key:16,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[372]||(t[372]=e("div",{class:"panel-title"},"Sorting Configuration",-1)),e("div",kv,[t[371]||(t[371]=e("label",{class:"form-label"},"Items (JSON) - Target Order",-1)),e("textarea",{value:JSON.stringify(((ll=a.value.content)==null?void 0:ll.items)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px"},onChange:t[171]||(t[171]=o=>{var J;return c({items:Le(o.target.value,(J=a.value.content)==null?void 0:J.items)})})},null,40,wv)])],2)):a.value.type==="cloze"?(l(),i("div",{key:17,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[375]||(t[375]=e("div",{class:"panel-title"},"Cloze Configuration",-1)),e("div",Cv,[t[373]||(t[373]=e("label",{class:"form-label"},"Text (Wrap blanks in [ ])",-1)),e("textarea",{value:((il=a.value.content)==null?void 0:il.text)||"",class:"textarea",style:{"min-height":"100px","font-family":"monospace","font-size":"12px"},onChange:t[172]||(t[172]=o=>c({text:o.target.value}))},null,40,Sv)]),e("div",$v,[e("div",Iv,[e("input",{type:"checkbox",id:"showCheckBtn",checked:((al=a.value.content)==null?void 0:al.showCheckBtn)!==!1,onChange:t[173]||(t[173]=o=>c({showCheckBtn:o.target.checked}))},null,40,Ev),t[374]||(t[374]=e("label",{for:"showCheckBtn",class:"form-label mb-0"},"Show Check Answers Button",-1))])])],2)):a.value.type==="scenario"?(l(),i("div",{key:18,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[377]||(t[377]=e("div",{class:"panel-title"},"Scenario Chat",-1)),e("div",Av,[t[376]||(t[376]=e("label",{class:"form-label"},"Messages (JSON)",-1)),e("textarea",{value:JSON.stringify(((sl=a.value.content)==null?void 0:sl.messages)||[],null,2),class:"textarea",style:{"min-height":"160px","font-family":"monospace","font-size":"11px"},onChange:t[174]||(t[174]=o=>{var J;return c({messages:Le(o.target.value,(J=a.value.content)==null?void 0:J.messages)})})},null,40,Tv)])],2)):a.value.type==="progress"?(l(),i("div",{key:19,class:Q(["panel-section",se.value==="content"&&"panel-section-focused"]),"data-props-anchor":"content"},[t[381]||(t[381]=e("div",{class:"panel-title"},"Progress Settings",-1)),e("div",Mv,[e("div",Pv,[t[378]||(t[378]=e("label",{class:"form-label"},"Mock XP",-1)),e("input",{type:"number",value:((rl=a.value.content)==null?void 0:rl.mockXP)||350,class:"input",onInput:t[175]||(t[175]=o=>c({mockXP:Number(o.target.value)}))},null,40,Bv)]),e("div",Nv,[t[379]||(t[379]=e("label",{class:"form-label"},"Mock Percent",-1)),e("input",{type:"number",value:((dl=a.value.content)==null?void 0:dl.mockPercent)||65,class:"input",onInput:t[176]||(t[176]=o=>c({mockPercent:Number(o.target.value)}))},null,40,zv)])]),e("div",Lv,[e("div",jv,[t[380]||(t[380]=e("label",{class:"form-label"},"Fill Color",-1)),e("input",{type:"color",value:((ul=a.value.content)==null?void 0:ul.fillColor)||"#10b981",class:"color-input-native",onInput:t[177]||(t[177]=o=>c({fillColor:o.target.value}))},null,40,_v)])])],2)):q("",!0),e("div",Dv,[t[385]||(t[385]=e("div",{class:"panel-title"},"Actions",-1)),e("div",qv,[e("button",{class:"btn btn-secondary btn-sm w-full",onClick:t[178]||(t[178]=o=>E(u).duplicateElement(E(r).projectId,E(r).currentSlideId,a.value.id))},[...t[382]||(t[382]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),e("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})],-1),Z(" Duplicate ",-1)])]),e("button",{class:"btn btn-secondary btn-sm w-full",onClick:t[179]||(t[179]=o=>{E(r).showInteractionEditor=!0,E(r).interactionElementId=a.value.id})},[...t[383]||(t[383]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})],-1),Z(" Interactions ",-1)])]),e("button",{class:"btn btn-danger btn-sm w-full",onClick:t[180]||(t[180]=o=>{E(u).deleteElement(E(r).projectId,E(r).currentSlideId,a.value.id),E(r).clearSelection()})},[...t[384]||(t[384]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"3 6 5 6 21 6"}),e("path",{d:"M19 6l-1 14H6L5 6"}),e("path",{d:"M9 6V4h6v2"})],-1),Z(" Delete Element ",-1)])])])])],64)):(l(),i("div",ss,[e("div",rs,[e("button",{type:"button",class:Q(["slide-settings-tab",W.value==="canvas"&&"active"]),onClick:t[15]||(t[15]=o=>W.value="canvas")},[...t[186]||(t[186]=[e("svg",{class:"slide-settings-tab-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.8"},[e("rect",{x:"3.5",y:"5",width:"17",height:"12",rx:"2"}),e("path",{d:"M8 19h8"})],-1),e("span",null,"Canvas",-1)])],2),e("button",{type:"button",class:Q(["slide-settings-tab",W.value==="transitions"&&"active"]),onClick:t[16]||(t[16]=o=>W.value="transitions")},[...t[187]||(t[187]=[et('<svg class="slide-settings-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" data-v-617e31e2><path d="M5 7h5" data-v-617e31e2></path><path d="M5 12h10" data-v-617e31e2></path><path d="M5 17h14" data-v-617e31e2></path><path d="M14 7l5 5-5 5" data-v-617e31e2></path></svg><span data-v-617e31e2>Transitions</span>',2)])],2),e("button",{type:"button",class:Q(["slide-settings-tab",W.value==="navigation"&&"active"]),onClick:t[17]||(t[17]=o=>W.value="navigation")},[...t[188]||(t[188]=[e("svg",{class:"slide-settings-tab-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.8"},[e("path",{d:"M12 4v16"}),e("path",{d:"M8 8l4-4 4 4"}),e("path",{d:"M16 16l-4 4-4-4"})],-1),e("span",null,"Navigation",-1)])],2)]),W.value==="canvas"?(l(),i("div",ds,[t[203]||(t[203]=e("div",{class:"panel-title"},"Canvas",-1)),e("div",us,[t[189]||(t[189]=e("label",{class:"form-label"},"Title",-1)),ue(e("input",{"onUpdate:modelValue":t[18]||(t[18]=o=>je.value.title=o),class:"input",onInput:t[19]||(t[19]=o=>_t("title",je.value.title))},null,544),[[Se,je.value.title]])]),e("div",cs,[t[190]||(t[190]=e("label",{class:"form-label"},"Background",-1)),e("div",ps,[(l(),i(ee,null,de(["color","gradient","image"],o=>{var J;return e("button",{key:o,class:Q(["bg-type-btn",(((J=v.value)==null?void 0:J.backgroundType)||"color")===o&&"active"]),onClick:cl=>Ce({backgroundType:o})},w(o),11,vs)}),64))]),(((_=v.value)==null?void 0:_.backgroundType)||"color")==="color"?(l(),i("div",fs,[e("input",{type:"color",value:((ve=v.value)==null?void 0:ve.background)||"#ffffff",onInput:t[20]||(t[20]=o=>Ce({background:o.target.value})),class:"color-input-native"},null,40,gs),e("input",{value:((Te=v.value)==null?void 0:Te.background)||"#ffffff",class:"input",onInput:t[21]||(t[21]=o=>Ce({background:o.target.value})),style:{"font-size":"var(--text-xs)","font-family":"var(--font-mono)"}},null,40,ms)])):((Ne=v.value)==null?void 0:Ne.backgroundType)==="gradient"?ue((l(),i("input",{key:1,"onUpdate:modelValue":t[22]||(t[22]=o=>je.value.backgroundGradient=o),class:"input",placeholder:"linear-gradient(135deg, #667eea, #764ba2)",onInput:t[23]||(t[23]=o=>Ce({backgroundGradient:je.value.backgroundGradient}))},null,544)),[[Se,je.value.backgroundGradient]]):ue((l(),i("input",{key:2,"onUpdate:modelValue":t[24]||(t[24]=o=>je.value.backgroundImage=o),class:"input",placeholder:"https://...",onInput:t[25]||(t[25]=o=>Ce({backgroundImage:je.value.backgroundImage}))},null,544)),[[Se,je.value.backgroundImage]])]),e("div",bs,[t[200]||(t[200]=e("div",{class:"panel-title"},"Select Size",-1)),e("div",ys,[(l(!0),i(ee,null,de(E(jl),o=>{var J;return l(),i("button",{key:o.id,type:"button",class:Q(["canvas-size-card",((J=g.value)==null?void 0:J.id)===o.id&&"active"]),onClick:cl=>st(o)},[e("span",xs,[e("span",{class:Q(["canvas-size-thumb",`canvas-size-thumb-${o.id}`]),"aria-hidden":"true"},[...t[191]||(t[191]=[e("span",{class:"canvas-size-thumb-frame"},null,-1),e("span",{class:"canvas-size-thumb-safe"},null,-1),e("span",{class:"canvas-size-thumb-line canvas-size-thumb-line-top"},null,-1),e("span",{class:"canvas-size-thumb-line canvas-size-thumb-line-bottom"},null,-1)])],2)]),e("span",ks,w(o.label),1),e("span",ws,w(o.ratioLabel),1)],10,hs)}),128))]),e("div",Cs,[e("div",Ss,[t[192]||(t[192]=e("span",null,"Custom",-1)),e("span",$s,"Current ratio "+w(G.value),1)]),e("div",Is,[e("div",Es,[t[194]||(t[194]=e("label",{class:"form-label"},"Width",-1)),e("div",As,[e("input",{type:"number",min:"320",max:"4096",value:k.value.width,class:"input",onChange:t[26]||(t[26]=o=>tt("width",o.target.value))},null,40,Ts),t[193]||(t[193]=e("span",{class:"canvas-size-unit"},"px",-1))])]),t[197]||(t[197]=e("div",{class:"canvas-size-separator"},"×",-1)),e("div",Ms,[t[196]||(t[196]=e("label",{class:"form-label"},"Height",-1)),e("div",Ps,[e("input",{type:"number",min:"320",max:"4096",value:k.value.height,class:"input",onChange:t[27]||(t[27]=o=>tt("height",o.target.value))},null,40,Bs),t[195]||(t[195]=e("span",{class:"canvas-size-unit"},"px",-1))])])]),e("label",Ns,[ue(e("input",{type:"checkbox","onUpdate:modelValue":t[28]||(t[28]=o=>le.value=o)},null,512),[[Nt,le.value]]),t[198]||(t[198]=Z(" Maintain proportions ",-1))]),t[199]||(t[199]=e("div",{class:"field-hint"},"Canvas size affects the editor, preview, slide thumbnails, and exported HTML package.",-1))]),t[201]||(t[201]=et('<div class="canvas-size-callout" data-v-617e31e2><svg class="canvas-size-callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-617e31e2><circle cx="12" cy="12" r="9" data-v-617e31e2></circle><path d="M12 10v6" data-v-617e31e2></path><path d="M12 7h.01" data-v-617e31e2></path></svg><span data-v-617e31e2>Changes will be applied to all pages in the project.</span></div>',1))]),e("div",zs,[t[202]||(t[202]=e("div",{class:"panel-title"},"Slide Notes",-1)),ue(e("textarea",{"onUpdate:modelValue":t[29]||(t[29]=o=>je.value.notes=o),class:"textarea",placeholder:"Speaker notes…",style:{"min-height":"80px"},onInput:t[30]||(t[30]=o=>_t("notes",je.value.notes))},null,544),[[Se,je.value.notes]])])])):W.value==="transitions"?(l(),i("div",Ls,[t[208]||(t[208]=e("div",{class:"panel-title"},"Transitions",-1)),e("select",{value:((He=v.value)==null?void 0:He.transition)||"none",class:"select",onChange:t[31]||(t[31]=o=>Ce({transition:o.target.value}))},[...t[204]||(t[204]=[et('<option value="none" data-v-617e31e2>None</option><option value="fade" data-v-617e31e2>Fade</option><option value="slide" data-v-617e31e2>Slide</option><option value="zoom" data-v-617e31e2>Zoom</option><option value="flip" data-v-617e31e2>Flip</option>',5)])],40,js),e("div",_s,[t[205]||(t[205]=e("label",{class:"form-label"},"Auto-advance Duration (seconds)",-1)),e("input",{type:"number",min:"0",step:"0.5",value:((Ue=v.value)==null?void 0:Ue.duration)??0,class:"input",onChange:t[32]||(t[32]=o=>Ot(o.target.value))},null,40,Ds),t[206]||(t[206]=e("div",{class:"field-hint"},"Set to 0 to require manual navigation on this slide.",-1))]),e("label",qs,[e("input",{type:"checkbox",checked:!!((ht=v.value)!=null&&ht.advanceOnMediaEnd),onChange:t[33]||(t[33]=o=>Ce({advanceOnMediaEnd:o.target.checked}))},null,40,Rs),t[207]||(t[207]=Z(" Advance when slide media finishes ",-1))]),t[209]||(t[209]=e("div",{class:"field-hint"},"Uses the first playable audio or direct video on the slide. Embedded YouTube/Vimeo iframes cannot report completion here.",-1))])):(l(),i("div",Os,[t[215]||(t[215]=e("div",{class:"panel-title"},"Navigation",-1)),e("label",Fs,[e("input",{type:"checkbox",checked:h.value.autoPlay,onChange:t[34]||(t[34]=o=>Pe({autoPlay:o.target.checked}))},null,40,Us),t[210]||(t[210]=Z(" Autoplay preview and exported presentation ",-1))]),e("label",Vs,[e("input",{type:"checkbox",checked:h.value.loop,onChange:t[35]||(t[35]=o=>Pe({loop:o.target.checked}))},null,40,Ws),t[211]||(t[211]=Z(" Loop back to the first slide at the end ",-1))]),e("label",Gs,[e("input",{type:"checkbox",checked:h.value.showProgress,onChange:t[36]||(t[36]=o=>Pe({showProgress:o.target.checked}))},null,40,Hs),t[212]||(t[212]=Z(" Show progress bar in preview ",-1))]),e("label",Ys,[e("input",{type:"checkbox",checked:h.value.showNavControls,onChange:t[37]||(t[37]=o=>Pe({showNavControls:o.target.checked}))},null,40,Js),t[213]||(t[213]=Z(" Show previous/next and dot navigation ",-1))]),e("label",Qs,[e("input",{type:"checkbox",checked:h.value.allowKeyboardNav,onChange:t[38]||(t[38]=o=>Pe({allowKeyboardNav:o.target.checked}))},null,40,Xs),t[214]||(t[214]=Z(" Allow arrow keys and space bar navigation ",-1))])]))]))],512)}}},Ov=Xe(Rv,[["__scopeId","data-v-617e31e2"]]),Fv={class:"editor-toolbar"},Uv={class:"toolbar-group"},Vv={key:0,class:"toolbar-divider"},Wv=["data-group-name"],Gv=["data-tooltip","onClick"],Hv={key:0,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Yv={key:1,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Jv={key:2,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Qv={key:3,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Xv={key:4,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Kv={key:5,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Zv={key:6,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},ef={key:7,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},tf={key:8,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},of={key:9,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},nf={key:10,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},lf={key:11,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},af={key:12,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},sf={key:13,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},rf={key:14,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},df={key:15,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},uf={key:16,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},cf={key:17,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},pf={key:18,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},vf={key:19,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},ff={key:20,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},gf={class:"tool-label"},mf={class:"toolbar-group"},bf={class:"toolbar-group"},yf={class:"toolbar-group"},hf={__name:"EditorToolbar",emits:["open-ai-project"],setup(A,{emit:r}){const u=r,p=it();at();const v=[{id:"basic",name:"Basic",tools:[{id:"text",label:"Text",tooltip:"Add text (T)",icon:"text"},{id:"heading",label:"Heading",tooltip:"Add heading",icon:"heading"},{id:"image",label:"Image",tooltip:"Add image (I)",icon:"image"},{id:"shape",label:"Shape",tooltip:"Add shape (S)",icon:"shape"}]},{id:"media",name:"Media",tools:[{id:"video",label:"Video",tooltip:"Embed video",icon:"video"},{id:"audio",label:"Audio",tooltip:"Embed audio",icon:"audio"}]},{id:"interactive",name:"Interactive",tools:[{id:"button",label:"Button",tooltip:"Add button (B)",icon:"button"},{id:"hotspot",label:"Hotspot",tooltip:"Add hotspot (H)",icon:"hotspot"},{id:"tabs",label:"Tabs",tooltip:"Add tabs",icon:"tabs"},{id:"accordion",label:"Accordion",tooltip:"Add accordion",icon:"accordion"},{id:"flipcard",label:"Flip Card",tooltip:"Add flip card",icon:"flipcard"},{id:"stepper",label:"Stepper",tooltip:"Add stepper",icon:"stepper"}]},{id:"learning",name:"Learning & Data",tools:[{id:"quiz",label:"Quiz",tooltip:"Add quiz",icon:"quiz"},{id:"chart",label:"Chart",tooltip:"Add chart",icon:"chart"},{id:"poll",label:"Poll",tooltip:"Add poll",icon:"poll"},{id:"labeledimage",label:"L-Image",tooltip:"Add labeled image",icon:"labeledimage"},{id:"matching",label:"Match",tooltip:"Add matching game",icon:"matching"},{id:"sorting",label:"Sort",tooltip:"Add sorting game",icon:"sorting"},{id:"cloze",label:"Cloze",tooltip:"Fill in blanks",icon:"cloze"},{id:"scenario",label:"Dialog",tooltip:"Scenario chat",icon:"scenario"},{id:"progress",label:"Stats",tooltip:"Track progress",icon:"progress"}]}];function h(k){p.setActiveTool(k)}return(k,g)=>(l(),i("div",Fv,[e("div",Uv,[e("button",{class:Q(["tool-btn",E(p).activeTool==="select"&&"active"]),onClick:g[0]||(g[0]=G=>h("select")),"data-tooltip":"Select (V)"},[...g[7]||(g[7]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M5 3l14 9-7 2-5 7V3z"})],-1),e("span",{class:"tool-label"},"Select",-1)])],2)]),g[34]||(g[34]=e("div",{class:"toolbar-divider"},null,-1)),(l(),i(ee,null,de(v,(G,le)=>(l(),i(ee,{key:G.id},[le>0?(l(),i("div",Vv)):q("",!0),e("div",{class:"toolbar-group element-group","data-group-name":G.name},[(l(!0),i(ee,null,de(G.tools,W=>(l(),i("button",{key:W.id,class:Q(["tool-btn",E(p).activeTool===W.id&&"active"]),"data-tooltip":W.tooltip,onClick:U=>h(W.id)},[W.icon==="text"?(l(),i("svg",Hv,[...g[8]||(g[8]=[e("polyline",{points:"4 7 4 4 20 4 20 7"},null,-1),e("line",{x1:"9",y1:"20",x2:"15",y2:"20"},null,-1),e("line",{x1:"12",y1:"4",x2:"12",y2:"20"},null,-1)])])):W.icon==="heading"?(l(),i("svg",Yv,[...g[9]||(g[9]=[e("path",{d:"M6 12h12M6 4v16M18 4v16","stroke-linecap":"round"},null,-1)])])):W.icon==="image"?(l(),i("svg",Jv,[...g[10]||(g[10]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"},null,-1),e("circle",{cx:"8.5",cy:"8.5",r:"1.5"},null,-1),e("polyline",{points:"21 15 16 10 5 21"},null,-1)])])):W.icon==="shape"?(l(),i("svg",Qv,[...g[11]||(g[11]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"3"},null,-1)])])):W.icon==="button"?(l(),i("svg",Xv,[...g[12]||(g[12]=[e("rect",{x:"2",y:"7",width:"20",height:"10",rx:"5"},null,-1),e("line",{x1:"8",y1:"12",x2:"16",y2:"12"},null,-1)])])):W.icon==="hotspot"?(l(),i("svg",Kv,[...g[13]||(g[13]=[e("circle",{cx:"12",cy:"12",r:"10"},null,-1),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"},null,-1),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"},null,-1)])])):W.icon==="video"?(l(),i("svg",Zv,[...g[14]||(g[14]=[e("polygon",{points:"23 7 16 12 23 17 23 7"},null,-1),e("rect",{x:"1",y:"5",width:"15",height:"14",rx:"2"},null,-1)])])):W.icon==="audio"?(l(),i("svg",ef,[...g[15]||(g[15]=[e("path",{d:"M9 18V5l12-2v13"},null,-1),e("circle",{cx:"6",cy:"18",r:"3"},null,-1),e("circle",{cx:"18",cy:"16",r:"3"},null,-1)])])):W.icon==="quiz"?(l(),i("svg",tf,[...g[16]||(g[16]=[e("path",{d:"M9 11l3 3L22 4"},null,-1),e("path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"},null,-1)])])):W.icon==="chart"?(l(),i("svg",of,[...g[17]||(g[17]=[e("path",{d:"M4 19h16"},null,-1),e("path",{d:"M7 16V9"},null,-1),e("path",{d:"M12 16V5"},null,-1),e("path",{d:"M17 16v-4"},null,-1)])])):W.icon==="tabs"?(l(),i("svg",nf,[...g[18]||(g[18]=[e("rect",{x:"2",y:"7",width:"20",height:"13",rx:"2"},null,-1),e("path",{d:"M2 11h20"},null,-1),e("path",{d:"M8 7v4"},null,-1)])])):W.icon==="accordion"?(l(),i("svg",lf,[...g[19]||(g[19]=[e("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2"},null,-1),e("path",{d:"M3 10h18"},null,-1),e("path",{d:"M3 16h18"},null,-1)])])):W.icon==="flipcard"?(l(),i("svg",af,[...g[20]||(g[20]=[e("path",{d:"M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"},null,-1),e("path",{d:"M3 12h18"},null,-1),e("path",{d:"M21 8h-4"},null,-1)])])):W.icon==="stepper"?(l(),i("svg",sf,[...g[21]||(g[21]=[e("circle",{cx:"6",cy:"12",r:"3"},null,-1),e("circle",{cx:"18",cy:"12",r:"3"},null,-1),e("path",{d:"M9 12h6"},null,-1)])])):W.icon==="poll"?(l(),i("svg",rf,[...g[22]||(g[22]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"},null,-1),e("path",{d:"M7 10h10"},null,-1),e("path",{d:"M7 14h6"},null,-1)])])):W.icon==="labeledimage"?(l(),i("svg",df,[...g[23]||(g[23]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"},null,-1),e("circle",{cx:"12",cy:"12",r:"2"},null,-1),e("line",{x1:"12",y1:"14",x2:"12",y2:"18"},null,-1)])])):W.icon==="matching"?(l(),i("svg",uf,[...g[24]||(g[24]=[et('<path d="M4 6h4" data-v-2224d8c6></path><path d="M4 18h4" data-v-2224d8c6></path><path d="M16 6h4" data-v-2224d8c6></path><path d="M16 18h4" data-v-2224d8c6></path><line x1="8" y1="6" x2="16" y2="18" data-v-2224d8c6></line>',5)])])):W.icon==="sorting"?(l(),i("svg",cf,[...g[25]||(g[25]=[e("path",{d:"M3 6h18"},null,-1),e("path",{d:"M7 12h10"},null,-1),e("path",{d:"M10 18h4"},null,-1)])])):W.icon==="cloze"?(l(),i("svg",pf,[...g[26]||(g[26]=[e("path",{d:"M4 12h4"},null,-1),e("path",{d:"M16 12h4"},null,-1),e("rect",{x:"9",y:"9",width:"6",height:"6",rx:"1"},null,-1)])])):W.icon==="scenario"?(l(),i("svg",vf,[...g[27]||(g[27]=[e("path",{d:"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"},null,-1)])])):W.icon==="progress"?(l(),i("svg",ff,[...g[28]||(g[28]=[e("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"},null,-1)])])):q("",!0),e("span",gf,w(W.label),1)],10,Gv))),128))],8,Wv)],64))),64)),g[35]||(g[35]=e("div",{class:"toolbar-divider"},null,-1)),e("div",mf,[e("button",{class:"tool-btn tool-btn-ai-project",onClick:g[1]||(g[1]=G=>u("open-ai-project")),"data-tooltip":"Create a new AI project"},[...g[29]||(g[29]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"})],-1),e("span",{class:"tool-label"},"AI Project",-1)])])]),g[36]||(g[36]=e("div",{class:"toolbar-spacer"},null,-1)),e("div",bf,[e("button",{class:"tool-btn",onClick:g[2]||(g[2]=G=>E(p).zoomOut()),"data-tooltip":"Zoom out (Ctrl−)"},[...g[30]||(g[30]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"11",cy:"11",r:"8"}),e("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"}),e("line",{x1:"8",y1:"11",x2:"14",y2:"11"})],-1)])]),e("button",{class:"zoom-display",onClick:g[3]||(g[3]=G=>E(p).zoomReset())},w(Math.round(E(p).zoomLevel*100))+"% ",1),e("button",{class:"tool-btn",onClick:g[4]||(g[4]=G=>E(p).zoomIn()),"data-tooltip":"Zoom in (Ctrl+)"},[...g[31]||(g[31]=[et('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2224d8c6><circle cx="11" cy="11" r="8" data-v-2224d8c6></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-v-2224d8c6></line><line x1="11" y1="8" x2="11" y2="14" data-v-2224d8c6></line><line x1="8" y1="11" x2="14" y2="11" data-v-2224d8c6></line></svg>',1)])])]),g[37]||(g[37]=e("div",{class:"toolbar-divider"},null,-1)),e("div",yf,[e("button",{class:Q(["tool-btn",E(p).showGrid&&"active"]),onClick:g[5]||(g[5]=G=>E(p).toggleGrid()),"data-tooltip":"Toggle grid (Ctrl+G)"},[...g[32]||(g[32]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5"},[e("path",{d:"M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"})],-1)])],2),e("button",{class:Q(["tool-btn",E(p).snapToGrid&&"active"]),onClick:g[6]||(g[6]=G=>E(p).toggleSnap()),"data-tooltip":"Snap to grid"},[...g[33]||(g[33]=[et('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2224d8c6><circle cx="5" cy="5" r="1" data-v-2224d8c6></circle><circle cx="12" cy="5" r="1" data-v-2224d8c6></circle><circle cx="19" cy="5" r="1" data-v-2224d8c6></circle><circle cx="5" cy="12" r="1" data-v-2224d8c6></circle><circle cx="12" cy="12" r="1" data-v-2224d8c6></circle><circle cx="19" cy="12" r="1" data-v-2224d8c6></circle><circle cx="5" cy="19" r="1" data-v-2224d8c6></circle><circle cx="12" cy="19" r="1" data-v-2224d8c6></circle><circle cx="19" cy="19" r="1" data-v-2224d8c6></circle></svg>',1)])],2)])]))}},xf=Xe(hf,[["__scopeId","data-v-2224d8c6"]]),kf=["onMousedown"],wf={key:1,class:"selection-border locked-border"},Cf={__name:"ElementWrapper",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=it(),p=at(),v=Cl("canvasScale",L(1)),h=M(()=>u.projectId),k=M(()=>u.currentSlideId),g=M(()=>u.selectedElementIds.includes(r.element.id)),G=M(()=>r.element.locked),le=M(()=>r.element.visible!==!1),W=M(()=>{const oe=r.element.content||{};return!!(oe.text||oe.label||oe.question||oe.popupTitle||oe.popupContent)});let U=!1,me=0,z=0,B=new Map;function a(oe){if(!u.snapToGrid||!u.gridSize)return oe;const fe=u.gridSize;return Math.round(oe/fe)*fe}function P(oe){var ge;if(G.value||oe.target.classList.contains("resize-handle"))return;const fe=oe.ctrlKey||oe.metaKey||oe.shiftKey;g.value?fe&&u.selectElement(r.element.id,!0):u.selectElement(r.element.id,fe),u.setActiveTool("select"),U=!1,me=oe.clientX,z=oe.clientY,B.clear();const ae=(ge=p.getProject(h.value))==null?void 0:ge.slides.find(Me=>Me.id===k.value);ae&&u.selectedElementIds.forEach(Me=>{const se=ae.elements.find(I=>I.id===Me);se&&!se.locked&&B.set(Me,{x:se.x,y:se.y})}),window.addEventListener("mousemove",N),window.addEventListener("mouseup",H),oe.stopPropagation()}function N(oe){const fe=(oe.clientX-me)/v.value,ae=(oe.clientY-z)/v.value;!U&&(Math.abs(fe)>3||Math.abs(ae)>3)&&(U=!0),U&&B.forEach((ge,Me)=>{const se=ge.x+fe,I=ge.y+ae;p.updateElement(h.value,k.value,Me,{x:se,y:I},{persist:!1})})}function H(oe){if(U){const fe=(oe.clientX-me)/v.value,ae=(oe.clientY-z)/v.value;B.forEach((ge,Me)=>{p.updateElement(h.value,k.value,Me,{x:a(ge.x+fe),y:a(ge.y+ae)},{persist:!1})}),p.commitProject(h.value)}U||!(oe.ctrlKey||oe.metaKey||oe.shiftKey)&&u.selectedElementIds.length>1&&u.selectElement(r.element.id,!1),U=!1,window.removeEventListener("mousemove",N),window.removeEventListener("mouseup",H)}const m=["n","ne","e","se","s","sw","w","nw"];let O=!1,ie="",te=0,ke=0,R=0,F=0,pe=0,be=0;function ne(oe,fe){G.value||(oe.stopPropagation(),oe.preventDefault(),O=!0,ie=fe,te=oe.clientX,ke=oe.clientY,R=r.element.width,F=r.element.height,pe=r.element.x,be=r.element.y,window.addEventListener("mousemove",we),window.addEventListener("mouseup",C))}function we(oe){if(!O)return;const fe=v.value,ae=(oe.clientX-te)/fe,ge=(oe.clientY-ke)/fe,Me=20;let se=pe,I=be,S=R,ye=F;if(ie.includes("e")&&(S=Math.max(Me,R+ae)),ie.includes("s")&&(ye=Math.max(Me,F+ge)),ie.includes("w")){const c=Math.max(Me,R-ae);se=pe+(R-c),S=c}if(ie.includes("n")){const c=Math.max(Me,F-ge);I=be+(F-c),ye=c}if(u.snapToGrid&&u.gridSize){const c=u.gridSize;S=Math.round(S/c)*c,ye=Math.round(ye/c)*c,se=Math.round(se/c)*c,I=Math.round(I/c)*c}p.updateElement(h.value,k.value,r.element.id,{x:se,y:I,width:S,height:ye})}function C(){O=!1,window.removeEventListener("mousemove",we),window.removeEventListener("mouseup",C)}function j(){["text","heading"].includes(r.element.type)&&u.focusPropertiesSection("content")}const D=M(()=>({position:"absolute",left:`${r.element.x}px`,top:`${r.element.y}px`,width:`${r.element.width}px`,height:`${r.element.height}px`,transform:`rotate(${r.element.rotation||0}deg)`,opacity:r.element.opacity??1,zIndex:r.element.zIndex||1,cursor:G.value?"not-allowed":"move",visibility:le.value?"visible":"hidden",userSelect:"none"}));function X(oe){return{n:"n-resize",ne:"ne-resize",e:"e-resize",se:"se-resize",s:"s-resize",sw:"sw-resize",w:"w-resize",nw:"nw-resize"}[oe]||"auto"}function xe(oe="content"){u.focusPropertiesSection(oe)}function ze(){const oe=W.value?"improve":r.element.type==="image"?"image":"generate";u.openAIPanel(oe)}function Ie(){const oe=p.duplicateElement(h.value,k.value,r.element.id);oe&&(u.selectElement(oe.id),u.focusPropertiesSection("geometry"))}function _e(){p.deleteElement(h.value,k.value,r.element.id),u.clearSelection()}return(oe,fe)=>(l(),i("div",{class:Q(["element-wrapper",g.value&&"selected",G.value&&"locked"]),style:ce(D.value),onMousedown:P,onDblclick:j},[Sl(oe.$slots,"default",{},void 0),g.value&&!G.value?(l(),i(ee,{key:0},[fe[6]||(fe[6]=e("div",{class:"selection-border"},null,-1)),e("div",{class:"object-quickbar",onMousedown:fe[3]||(fe[3]=Oe(()=>{},["stop"]))},[e("button",{type:"button",class:"quickbar-btn",onClick:fe[0]||(fe[0]=ae=>xe("content"))},"Edit"),e("button",{type:"button",class:"quickbar-btn",onClick:fe[1]||(fe[1]=ae=>xe("animation"))},"Animation"),e("button",{type:"button",class:"quickbar-btn",onClick:fe[2]||(fe[2]=ae=>xe("geometry"))},"Arrange"),e("button",{type:"button",class:"quickbar-btn quickbar-btn-ai",onClick:ze},"AI"),e("button",{type:"button",class:"quickbar-icon-btn",onClick:Ie,title:"Duplicate element","aria-label":"Duplicate element"},[...fe[4]||(fe[4]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),e("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})],-1)])]),e("button",{type:"button",class:"quickbar-icon-btn quickbar-icon-btn-danger",onClick:_e,title:"Delete element","aria-label":"Delete element"},[...fe[5]||(fe[5]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"3 6 5 6 21 6"}),e("path",{d:"M19 6l-1 14H6L5 6"}),e("path",{d:"M9 6V4h6v2"})],-1)])])],32),(l(),i(ee,null,de(m,ae=>e("div",{key:ae,class:Q(["resize-handle",`handle-${ae}`]),style:ce({cursor:X(ae)}),onMousedown:Oe(ge=>ne(ge,ae),["stop"])},null,46,kf)),64))],64)):q("",!0),g.value&&G.value?(l(),i("div",wf)):q("",!0)],38))}},Sf=Xe(Cf,[["__scopeId","data-v-6df2b2af"]]),Vt={__name:"TextElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=M(()=>r.element.content||{}),p=it(),v=at(),h=L(!1),k=L(null),g=L("");Qe(()=>u.value.text,U=>{h.value||(g.value=U||(r.element.type==="heading"?"Heading":"Click to edit text"))},{immediate:!0});function G(){p.selectedElementId===r.element.id&&(h.value=!0,bl(()=>{if(k.value)if(k.value.focus(),typeof k.value.setSelectionRange=="function"){const U=k.value.value.length;k.value.setSelectionRange(U,U)}else{const U=document.createRange();U.selectNodeContents(k.value),U.collapse(!1);const me=window.getSelection();me.removeAllRanges(),me.addRange(U)}}))}function le(U){h.value&&U.stopPropagation()}function W(){h.value=!1;const U=g.value;v.updateElement(p.projectId,p.currentSlideId,r.element.id,{content:{...r.element.content,text:U}})}return(U,me)=>h.value?ue((l(),i("textarea",{key:0,class:"text-element-input",ref_key:"textRef",ref:k,"onUpdate:modelValue":me[0]||(me[0]=z=>g.value=z),onBlur:W,onMousedown:le,style:ce({fontSize:(u.value.fontSize||16)+"px",fontFamily:u.value.fontFamily||"Inter, sans-serif",fontWeight:u.value.fontWeight||"normal",fontStyle:u.value.fontStyle||"normal",textDecoration:u.value.textDecoration||"none",textAlign:u.value.textAlign||"left",color:u.value.color||"#1a1a2e",lineHeight:u.value.lineHeight||1.5,textTransform:u.value.textTransform||"none",letterSpacing:(u.value.letterSpacing||0)+"px",width:"100%",height:"100%",background:"transparent",border:"none",resize:"none",overflow:"hidden",whiteSpace:"pre-wrap",wordBreak:"break-word",padding:"4px",outline:"2px solid var(--color-primary)",cursor:"text",margin:0,display:"block"})},null,36)),[[Se,g.value]]):(l(),i("div",{key:1,class:"text-element",onDblclick:G,style:ce({fontSize:(u.value.fontSize||16)+"px",fontFamily:u.value.fontFamily||"Inter, sans-serif",fontWeight:u.value.fontWeight||"normal",fontStyle:u.value.fontStyle||"normal",textDecoration:u.value.textDecoration||"none",textAlign:u.value.textAlign||"left",color:u.value.color||"#1a1a2e",lineHeight:u.value.lineHeight||1.5,textTransform:u.value.textTransform||"none",letterSpacing:(u.value.letterSpacing||0)+"px",width:"100%",height:"100%",overflow:"hidden",whiteSpace:"pre-wrap",wordBreak:"break-word",padding:"4px",outline:"none",cursor:"inherit",userSelect:"none"})},w(g.value),37))}},$f={key:0,class:"image-status image-loading"},If=["src","alt"],Ef={key:2,class:"image-placeholder"},Af={width:"36",height:"36",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{opacity:".3"}},Tf={__name:"ImageElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=L(""),p=L(0),v=L("idle"),h=M(()=>{var le;return Array.isArray((le=r.element.content)==null?void 0:le.fallbackSrcs)?r.element.content.fallbackSrcs:[]});function k(){var le;u.value=((le=r.element.content)==null?void 0:le.src)||"",p.value=0,v.value=u.value?"loading":"empty"}function g(){v.value="loaded"}function G(){const le=h.value[p.value];if(le){p.value+=1,u.value=le,v.value="loading";return}v.value="error"}return Qe(()=>{var le,W;return[(le=r.element.content)==null?void 0:le.src,JSON.stringify(((W=r.element.content)==null?void 0:W.fallbackSrcs)||[])]},()=>k(),{immediate:!0}),(le,W)=>{var U,me,z;return l(),i("div",{class:"image-element",style:ce({width:"100%",height:"100%",overflow:"hidden",borderRadius:(((U=A.element.content)==null?void 0:U.borderRadius)||0)+"px",border:`${((me=A.element.content)==null?void 0:me.borderWidth)||0}px solid ${((z=A.element.content)==null?void 0:z.borderColor)||"transparent"}`})},[v.value==="loading"?(l(),i("div",$f,[...W[0]||(W[0]=[e("span",{class:"image-status-spinner"},null,-1),e("span",null,"Loading image…",-1)])])):q("",!0),u.value&&v.value!=="error"?(l(),i("img",{key:1,src:u.value,alt:A.element.content.alt||"",style:ce({width:"100%",height:"100%",objectFit:A.element.content.objectFit||"cover",display:v.value==="loaded"?"block":"none"}),draggable:"false",onLoad:g,onError:G},null,44,If)):q("",!0),v.value==="empty"||v.value==="error"?(l(),i("div",Ef,[(l(),i("svg",Af,[...W[1]||(W[1]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"},null,-1),e("circle",{cx:"8.5",cy:"8.5",r:"1.5"},null,-1),e("polyline",{points:"21 15 16 10 5 21"},null,-1)])])),e("span",null,w(v.value==="error"?"Image unavailable":"Image"),1)])):q("",!0)],4)}}},Mf=Xe(Tf,[["__scopeId","data-v-cd42b1c3"]]),Pf={class:"shape-element",style:{width:"100%",height:"100%"}},Bf=["width","height"],Nf=["points","fill","stroke","stroke-width"],zf={__name:"ShapeElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=M(()=>r.element.content||{}),p=M(()=>{const k=u.value.shapeType||"rectangle",g={width:"100%",height:"100%",background:u.value.fillColor||"#6c47ff",border:`${u.value.borderWidth||0}px solid ${u.value.borderColor||"transparent"}`,opacity:u.value.opacity??1};return k==="circle"?{...g,borderRadius:"50%"}:k==="rectangle"?{...g,borderRadius:(u.value.borderRadius||0)+"px"}:g}),v=M(()=>["triangle","star","arrow","diamond"].includes(u.value.shapeType)),h=M(()=>{const k=r.element.width||150,g=r.element.height||100,G=u.value.shapeType;if(G==="triangle")return`${k/2},0 ${k},${g} 0,${g}`;if(G==="diamond")return`${k/2},0 ${k},${g/2} ${k/2},${g} 0,${g/2}`;if(G==="arrow")return`0,${g*.3} ${k*.6},${g*.3} ${k*.6},0 ${k},${g/2} ${k*.6},${g} ${k*.6},${g*.7} 0,${g*.7}`;if(G==="star"){const le=k/2,W=g/2,U=Math.min(k,g)/2,me=U*.4;let z="";for(let B=0;B<10;B++){const a=(B*36-90)*Math.PI/180,P=B%2===0?U:me;z+=`${le+P*Math.cos(a)},${W+P*Math.sin(a)} `}return z.trim()}return""});return(k,g)=>(l(),i("div",Pf,[v.value?(l(),i("svg",{key:1,width:A.element.width,height:A.element.height,style:{display:"block",overflow:"visible"}},[e("polygon",{points:h.value,fill:u.value.fillColor||"#6c47ff",stroke:u.value.borderColor||"none","stroke-width":u.value.borderWidth||0},null,8,Nf)],8,Bf)):(l(),i("div",{key:0,style:ce(p.value)},null,4))]))}},Lf={__name:"ButtonElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=M(()=>r.element.content||{}),p=M(()=>{const v={primary:{background:"#6c47ff",color:"#fff",border:"none"},secondary:{background:"#f0f0f0",color:"#333",border:"1px solid #ddd"},outline:{background:"transparent",color:"#6c47ff",border:"2px solid #6c47ff"},ghost:{background:"transparent",color:"#6c47ff",border:"none"},danger:{background:"#ef4444",color:"#fff",border:"none"}},h=v[u.value.variant||"primary"]||v.primary;return{...h,background:u.value.bgColor||h.background,color:u.value.textColor||h.color,border:u.value.borderColor?`1px solid ${u.value.borderColor}`:h.border,borderRadius:(u.value.borderRadius??8)+"px"}});return(v,h)=>(l(),i("div",{class:"button-element",style:ce({width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"8px",fontSize:(u.value.fontSize??15)+"px",fontWeight:u.value.fontWeight??600,letterSpacing:(u.value.letterSpacing||0)+"px",cursor:"pointer",fontFamily:u.value.fontFamily||"Inter, sans-serif",transition:"opacity .15s",...p.value})},w(u.value.label||"Button"),5))}},jf={class:"hotspot-root",style:{width:"100%",height:"100%",position:"relative"}},_f={class:"popup-header"},Df={class:"popup-body"},qf={__name:"HotspotElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=M(()=>r.element.content||{}),p=L(!1);function v(h){h.stopPropagation(),p.value=!p.value}return(h,k)=>(l(),i("div",jf,[e("div",{class:"hotspot-btn",style:ce({width:"100%",height:"100%",background:u.value.bgColor||"#6c47ff",borderRadius:(u.value.borderRadius??999)>=999?"50%":(u.value.borderRadius||0)+"px",display:"flex",alignItems:"center",justifyContent:"center",color:u.value.iconColor||"#fff",fontSize:"20px",fontWeight:"bold",cursor:"pointer",boxShadow:"0 2px 12px rgba(108,71,255,.4)"}),onClick:Oe(v,["stop"])},w(u.value.icon||"?"),5),ft(Bt,{name:"fade"},{default:ut(()=>[p.value?(l(),i("div",{key:0,class:"hotspot-popup",style:ce({background:u.value.popupBgColor||"#ffffff",color:u.value.popupTextColor||"#1a1a2e"})},[e("div",_f,[e("strong",null,w(u.value.popupTitle||"Info"),1),e("button",{class:"popup-close",onClick:k[0]||(k[0]=Oe(g=>p.value=!1,["stop"]))},"×")]),e("div",Df,w(u.value.popupContent||"Add your content in the properties panel."),1)],4)):q("",!0)]),_:1})]))}},Rf=Xe(qf,[["__scopeId","data-v-ef5f15f6"]]),Of={class:"video-element",style:{width:"100%",height:"100%",overflow:"hidden","border-radius":"4px",background:"#000"}},Ff=["src"],Uf=["src","poster","autoplay","controls","loop","muted"],Vf={key:2,class:"video-placeholder"},Wf={width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{opacity:".3"}},Gf={__name:"VideoElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=M(()=>r.element.content||{}),p=M(()=>{const h=u.value.src||"";return h.includes("youtube")||h.includes("youtu.be")}),v=M(()=>{var k,g;const h=u.value.src||"";if(p.value){const G=(k=h.match(/(?:v=|youtu\.be\/)([^&?]+)/))==null?void 0:k[1];return G?`https://www.youtube.com/embed/${G}`:""}if(h.includes("vimeo.com")){const G=(g=h.match(/vimeo\.com\/(\d+)/))==null?void 0:g[1];return G?`https://player.vimeo.com/video/${G}`:""}return""});return(h,k)=>(l(),i("div",Of,[v.value?(l(),i("iframe",{key:0,src:v.value,style:{width:"100%",height:"100%",border:"none"},allowfullscreen:""},null,8,Ff)):u.value.src&&!v.value?(l(),i("video",{key:1,src:u.value.src,poster:u.value.poster,autoplay:u.value.autoplay,controls:u.value.controls!==!1,loop:u.value.loop,muted:u.value.muted,style:ce({width:"100%",height:"100%",objectFit:u.value.objectFit||"cover"})},null,12,Uf)):(l(),i("div",Vf,[(l(),i("svg",Wf,[...k[0]||(k[0]=[e("polygon",{points:"23 7 16 12 23 17 23 7"},null,-1),e("rect",{x:"1",y:"5",width:"15",height:"14",rx:"2"},null,-1)])])),k[1]||(k[1]=e("span",{style:{"font-size":"12px",color:"#888"}},"Add video URL in Properties",-1))]))]))}},Hf=Xe(Gf,[["__scopeId","data-v-dfea1a16"]]),Yf=["stroke"],Jf=["src","controls","autoplay","loop"],Qf={key:1,style:{"font-size":"11px",color:"#aaa"}},Xf={__name:"AudioElement",props:{element:{type:Object,required:!0}},setup(A){return(r,u)=>{var p,v,h,k,g,G,le,W,U;return l(),i("div",{class:"audio-element",style:ce({width:"100%",height:"100%",display:"flex",alignItems:"center",gap:"10px",background:((p=A.element.content)==null?void 0:p.bgColor)||"#ede7ff",border:`1px solid ${((v=A.element.content)==null?void 0:v.accentColor)||"#6c47ff"}`,borderRadius:"8px",padding:"0 12px"})},[(l(),i("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:((h=A.element.content)==null?void 0:h.accentColor)||"#6c47ff","stroke-width":"2"},[...u[1]||(u[1]=[e("path",{d:"M9 18V5l12-2v13"},null,-1),e("circle",{cx:"6",cy:"18",r:"3"},null,-1),e("circle",{cx:"18",cy:"16",r:"3"},null,-1)])],8,Yf)),e("span",{style:ce({fontSize:"13px",color:((k=A.element.content)==null?void 0:k.textColor)||"#555",flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"})},w(((g=A.element.content)==null?void 0:g.label)||"Audio Player"),5),(G=A.element.content)!=null&&G.src?(l(),i("audio",{key:0,src:A.element.content.src,controls:((le=A.element.content)==null?void 0:le.controls)!==!1,autoplay:(W=A.element.content)==null?void 0:W.autoplay,loop:(U=A.element.content)==null?void 0:U.loop,style:{height:"28px","max-width":"180px"},onMousedown:u[0]||(u[0]=Oe(()=>{},["stop"]))},null,40,Jf)):(l(),i("span",Qf,"No source"))],4)}}},Kf={class:"quiz-options"},Zf=["onClick"],e1={class:"opt-letter"},t1={class:"opt-text"},o1={key:0},n1={class:"quiz-actions"},l1=["disabled"],i1={__name:"QuizElement",props:{element:{type:Object,required:!0}},setup(A){const r=A,u=M(()=>r.element.content||{}),p=L(null),v=L(!1);function h(le){v.value||(p.value=le)}function k(){p.value!==null&&(v.value=!0)}function g(){p.value=null,v.value=!1}const G=M(()=>v.value&&p.value===(u.value.correctIndex??0));return(le,W)=>(l(),i("div",{class:"quiz-element",style:ce({width:"100%",height:"100%",background:u.value.cardBgColor||"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",padding:"16px",display:"flex",flexDirection:"column",gap:"10px",overflow:"auto",fontFamily:"Inter, sans-serif","--quiz-accent":u.value.accentColor||"#6c47ff"})},[e("p",{style:ce({fontSize:"15px",fontWeight:600,color:u.value.questionColor||"#1a1a2e",lineHeight:1.4})},w(u.value.question||"Question text…"),5),e("div",Kf,[(l(!0),i(ee,null,de(u.value.options||[],(U,me)=>(l(),i("div",{key:me,class:Q(["quiz-opt",p.value===me&&"selected",v.value&&me===u.value.correctIndex&&"correct",v.value&&p.value===me&&me!==u.value.correctIndex&&"wrong"]),onClick:z=>h(me)},[e("span",e1,w(String.fromCharCode(65+me)),1),e("span",t1,w(U),1)],10,Zf))),128))]),v.value?(l(),i("div",{key:0,class:Q(["quiz-feedback",G.value?"correct":"wrong"])},[Z(w(G.value?"✓ Correct!":"✗ Incorrect.")+" ",1),!G.value&&u.value.explanation?(l(),i("span",o1,w(u.value.explanation),1)):q("",!0)],2)):q("",!0),e("div",n1,[v.value?(l(),i("button",{key:1,class:"quiz-btn secondary",onClick:g},"Try Again")):(l(),i("button",{key:0,class:"quiz-btn primary",disabled:p.value===null,onClick:k},"Submit",8,l1))])],4))}},a1=Xe(i1,[["__scopeId","data-v-ca2bd187"]]),s1={key:0,class:"canvas-empty"},r1={width:"60",height:"60",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1",style:{opacity:".2"}},d1={key:0,class:"canvas-device-frame","aria-hidden":"true"},u1=["value"],c1={class:"canvas-guide-label"},p1={key:5,class:"drop-hint"},v1={class:"canvas-info-bar"},f1=["disabled"],g1={class:"slide-index"},m1=["disabled"],b1={key:0},y1={__name:"EditorCanvas",setup(A){const r=it(),u=at(),p=L(null),v=L(null),h=L(1),k=M(()=>h.value*r.zoomLevel);Il("canvasScale",k);const g=M(()=>u.getProject(r.projectId)),G=M(()=>zt(g.value)),le=M(()=>hl(g.value)),W=M(()=>G.value.width),U=M(()=>G.value.height),me=M(()=>xl(W.value,U.value)),z=M(()=>{var y,x;return(x=(y=g.value)==null?void 0:y.slides)==null?void 0:x.find(K=>K.id===r.currentSlideId)}),B=M(()=>{var y;return[...((y=g.value)==null?void 0:y.slides)||[]].sort((x,K)=>x.order-K.order)}),a=M(()=>B.value.findIndex(y=>y.id===r.currentSlideId)),P=M(()=>{var y;return{autoPlay:!1,motionPresets:[],...((y=g.value)==null?void 0:y.settings)||{}}}),N=M(()=>(Array.isArray(P.value.motionPresets)?P.value.motionPresets:[]).filter(y=>y.scope==="group")),H=M(()=>{const y=new Set(r.selectedElementIds);return ke.value.filter(x=>y.has(x.id))}),m=L(""),O=M(()=>z.value?z.value.advanceOnMediaEnd?{label:"Media Advance",tone:"media"}:P.value.autoPlay&&Number(z.value.duration||0)>0?{label:`Auto ${Number(z.value.duration).toFixed(Number(z.value.duration)%1===0?0:1)}s`,tone:"auto"}:{label:"Manual",tone:"manual"}:{label:"Manual",tone:"manual"});function ie(){const y=N.value.find(K=>K.id===m.value);if(!y||!H.value.length)return;[...H.value].sort((K,V)=>(K.y||0)!==(V.y||0)?(K.y||0)-(V.y||0):(K.x||0)-(V.x||0)).forEach((K,V)=>{if(y.type==="auto"){u.updateElement(r.projectId,r.currentSlideId,K.id,{animations:[]});return}u.updateElement(r.projectId,r.currentSlideId,K.id,{animations:[{type:y.type,delay:Math.max(0,Number(y.delay)||0)+V*Math.max(0,Number(y.stepDelay)||0),duration:Math.max(.1,Number(y.duration)||.72)}]})}),u.updateProject(r.projectId,{settings:{...P.value,motionPresets:(P.value.motionPresets||[]).map(K=>K.id===y.id?{...K,usageCount:Math.max(0,Number(K.usageCount||0))+1,lastUsedAt:Date.now()}:K)}})}function te(){if(!N.value.length){m.value="";return}N.value.some(y=>y.id===m.value)||(m.value=N.value[0].id)}const ke=M(()=>{var y;return[...((y=z.value)==null?void 0:y.elements)||[]].sort((x,K)=>(x.zIndex||0)-(K.zIndex||0))}),R=M(()=>{const y=z.value;return y?y.backgroundType==="gradient"&&y.backgroundGradient?{background:y.backgroundGradient}:y.backgroundType==="image"&&y.backgroundImage?{backgroundImage:`url(${y.backgroundImage})`,backgroundSize:"cover",backgroundPosition:"center"}:{background:y.background||"#fff"}:{background:"#fff"}}),F=M(()=>`scale(${k.value})`);function pe(){if(!p.value)return;const{clientWidth:y,clientHeight:x}=p.value,K=(y-80)/W.value,V=(x-80)/U.value;h.value=Math.min(K,V,1)}let be=null;fl(()=>{pe(),be=new ResizeObserver(pe),p.value&&be.observe(p.value),te()}),gl(()=>be==null?void 0:be.disconnect()),Qe(N,()=>{te()},{deep:!0,immediate:!0}),Qe(G,()=>{pe()},{deep:!0});const ne=L({x:0,y:0}),we=L({x:0,y:0}),C=L(!1),j=L(!1),D=L(!1),X=L(null),xe=M(()=>{var y,x;return((y=le.value)==null?void 0:y.id)==="mobile"?{tone:"mobile",label:"Mobile safe area",style:{inset:"5% 8%",borderRadius:"28px"}}:((x=le.value)==null?void 0:x.id)==="square"?{tone:"square",label:"Square composition guide",style:{inset:"8%",borderRadius:"24px"}}:null}),ze=M(()=>{if(!xe.value)return null;if(xe.value.tone==="mobile"){const K=W.value*.08,V=U.value*.05;return{x:K,y:V,width:W.value-K*2,height:U.value-V*2}}const y=W.value*.08,x=U.value*.08;return{x:y,y:x,width:W.value-y*2,height:U.value-x*2}}),Ie=M(()=>{if(!ze.value)return[];const y=ze.value;return ke.value.filter(x=>x.visible!==!1).filter(x=>{const K=Number(x.x||0),V=Number(x.y||0),Ee=K+Number(x.width||0),Ae=V+Number(x.height||0);return K<y.x||V<y.y||Ee>y.x+y.width||Ae>y.y+y.height}).map(x=>x.id)}),_e=M(()=>r.selectedElementIds.filter(y=>Ie.value.includes(y)).length),oe=M(()=>Ie.value.length),fe=M(()=>!xe.value||!oe.value?null:_e.value?`${_e.value} selected ${_e.value===1?"element is":"elements are"} outside the ${xe.value.label.toLowerCase()}.`:`${oe.value} ${oe.value===1?"element is":"elements are"} outside the ${xe.value.label.toLowerCase()}.`),ae=M(()=>{if(!C.value)return null;const y=Math.min(ne.value.x,we.value.x),x=Math.min(ne.value.y,we.value.y),K=Math.abs(we.value.x-ne.value.x),V=Math.abs(we.value.y-ne.value.y);return{x:y,y:x,width:K,height:V}});function ge(y){!C.value&&(y.target===v.value||y.target===y.currentTarget)&&r.clearSelection()}function Me(y){return y?Array.from(y.files||[]).some(x=>x.type.startsWith("image/")):!1}function se(y){return y?Array.from(y.types||[]).includes(Wt):!1}function I(y,x,K){return Math.min(Math.max(y,x),K)}function S(y,x,K){const V=Gt(y),Ee=I(x-V.width/2,0,Math.max(0,W.value-V.width)),Ae=I(K-V.height/2,0,Math.max(0,U.value-V.height));return{x:Ee,y:Ae,bounds:V}}function ye(y){if(!se(y))return null;try{const x=y.getData(Wt),K=x?JSON.parse(x):null;return K!=null&&K.id&&u.getContentBlocks(r.projectId).find(V=>V.id===K.id)||null}catch{return null}}function c(y,x,K){if(!v.value||!K){X.value=null;return}const V=v.value.getBoundingClientRect(),Ee=(y-V.left)/k.value,Ae=(x-V.top)/k.value,Fe=S(K,Ee,Ae);X.value={block:K,x:Fe.x,y:Fe.y,bounds:Fe.bounds}}function Le(y,x,K){if(!y||!y.type.startsWith("image/"))return;const V=new FileReader;V.onload=()=>{const Ee=String(V.result||"");if(!Ee)return;const Ae=new Image;Ae.onload=()=>{const Fe=v.value.getBoundingClientRect(),We=(x-Fe.left)/k.value,re=(K-Fe.top)/k.value,Re=Math.min(420/Ae.width,280/Ae.height,1),Be=Math.max(120,Math.round(Ae.width*Re)),Ve=Math.max(80,Math.round(Ae.height*Re)),mt=Math.max(0,Math.min(W.value-Be,Math.round(We-Be/2))),gt=Math.max(0,Math.min(U.value-Ve,Math.round(re-Ve/2))),bt=u.addElement(r.projectId,r.currentSlideId,"image",{x:mt,y:gt,width:Be,height:Ve,content:{src:Ee,alt:y.name,objectFit:"cover"}});bt&&(r.selectElement(bt.id),r.setActiveTool("select"),r.setRightPanel("properties"))},Ae.src=Ee},V.readAsDataURL(y)}function qe(y){const x=Me(y.dataTransfer),K=se(y.dataTransfer);!x&&!K||(y.preventDefault(),y.dataTransfer.dropEffect="copy",j.value=x,D.value=K,K&&c(y.clientX,y.clientY,ye(y.dataTransfer)))}function je(y){var x;(x=y.currentTarget)!=null&&x.contains(y.relatedTarget)||(j.value=!1,D.value=!1,X.value=null)}function Ce(y){const x=Me(y.dataTransfer),K=se(y.dataTransfer);if(!x&&!K)return;if(y.preventDefault(),j.value=!1,D.value=!1,X.value=null,K){try{const Ee=ye(y.dataTransfer);if(!Ee)return;const Ae=v.value.getBoundingClientRect(),Fe=(y.clientX-Ae.left)/k.value,We=(y.clientY-Ae.top)/k.value,re=S(Ee,Fe,We),$e=u.insertContentBlock(r.projectId,r.currentSlideId,Ee.id,{x:re.x,y:re.y});$e.length&&(r.setSelection($e.map(Ze=>Ze.id)),r.setActiveTool("select"),r.focusPropertiesSection("content"))}catch(Ee){console.warn("Failed to drop block onto canvas.",Ee)}return}const V=Array.from(y.dataTransfer.files||[]).find(Ee=>Ee.type.startsWith("image/"));V&&Le(V,y.clientX,y.clientY)}function Pe(y){if(H.value.length<2)return;const x=[...H.value].sort((re,$e)=>(re.zIndex||0)-($e.zIndex||0)),K=Math.min(...x.map(re=>Number(re.x||0))),V=Math.min(...x.map(re=>Number(re.y||0))),Ee=Math.max(...x.map(re=>Number(re.x||0)+Number(re.width||0))),Ae=Math.max(...x.map(re=>Number(re.y||0)+Number(re.height||0))),Fe=K+(Ee-K)/2,We=V+(Ae-V)/2;if(y==="align-left"&&x.forEach(re=>u.updateElement(r.projectId,r.currentSlideId,re.id,{x:K},{persist:!1})),y==="align-center"&&x.forEach(re=>{const $e=Number(re.width||0);u.updateElement(r.projectId,r.currentSlideId,re.id,{x:Fe-$e/2},{persist:!1})}),y==="align-right"&&x.forEach(re=>{const $e=Number(re.width||0);u.updateElement(r.projectId,r.currentSlideId,re.id,{x:Ee-$e},{persist:!1})}),y==="align-top"&&x.forEach(re=>u.updateElement(r.projectId,r.currentSlideId,re.id,{y:V},{persist:!1})),y==="align-middle"&&x.forEach(re=>{const $e=Number(re.height||0);u.updateElement(r.projectId,r.currentSlideId,re.id,{y:We-$e/2},{persist:!1})}),y==="align-bottom"&&x.forEach(re=>{const $e=Number(re.height||0);u.updateElement(r.projectId,r.currentSlideId,re.id,{y:Ae-$e},{persist:!1})}),y==="distribute-horizontal"){const re=[...x].sort((Be,Ve)=>(Be.x||0)-(Ve.x||0)),$e=re.reduce((Be,Ve)=>Be+Number(Ve.width||0),0),Ze=re.length>1?(Ee-K-$e)/(re.length-1):0;let Re=K;re.forEach(Be=>{u.updateElement(r.projectId,r.currentSlideId,Be.id,{x:Re},{persist:!1}),Re+=Number(Be.width||0)+Ze})}if(y==="distribute-vertical"){const re=[...x].sort((Be,Ve)=>(Be.y||0)-(Ve.y||0)),$e=re.reduce((Be,Ve)=>Be+Number(Ve.height||0),0),Ze=re.length>1?(Ae-V-$e)/(re.length-1):0;let Re=V;re.forEach(Be=>{u.updateElement(r.projectId,r.currentSlideId,Be.id,{y:Re},{persist:!1}),Re+=Number(Be.height||0)+Ze})}u.commitProject(r.projectId)}function st(y){const x=r.activeTool;if(y.target!==v.value&&y.target!==y.currentTarget)return;y.preventDefault(),y.stopPropagation();const K=v.value.getBoundingClientRect(),V=(y.clientX-K.left)/k.value,Ee=(y.clientY-K.top)/k.value;if(x==="select"){C.value=!0,ne.value={x:V,y:Ee},we.value={x:V,y:Ee};const We=$e=>{we.value={x:($e.clientX-K.left)/k.value,y:($e.clientY-K.top)/k.value}},re=()=>{window.removeEventListener("mousemove",We),window.removeEventListener("mouseup",re);const $e=ae.value;if($e&&($e.width>2||$e.height>2)){const Ze=ke.value.filter(Re=>{const Be=Re.x,Ve=Re.y,mt=Re.width||100,gt=Re.height||100;return Be<$e.x+$e.width&&Be+mt>$e.x&&Ve<$e.y+$e.height&&Ve+gt>$e.y}).map(Re=>Re.id);Ze.length>0?r.setSelection(Ze):r.clearSelection()}else r.clearSelection();setTimeout(()=>{C.value=!1},0)};window.addEventListener("mousemove",We),window.addEventListener("mouseup",re);return}const Ae=We=>r.snapToGrid?Math.round(We/r.gridSize)*r.gridSize:We,Fe=u.addElement(r.projectId,r.currentSlideId,x,{x:Ae(V-75),y:Ae(Ee-40)});Fe&&(r.selectElement(Fe.id),r.setActiveTool("select"),r.setRightPanel("properties"))}const tt=M(()=>{if(!r.showGrid)return{};const y=r.gridSize;return{backgroundImage:`
      linear-gradient(to right, rgba(108,71,255,.10) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(108,71,255,.10) 1px, transparent 1px)
    `,backgroundSize:`${y}px ${y}px`}}),ot={text:Vt,heading:Vt,image:Mf,shape:zf,button:Lf,hotspot:Rf,video:Hf,audio:Xf,quiz:a1,chart:oi,tabs:ti,accordion:ei,flipcard:Zl,stepper:Kl,poll:Xl,labeledimage:Ql,matching:Jl,sorting:Yl,cloze:Hl,scenario:Gl,progress:Wl,divider:"div"};function wt(y){return ot[y]||Vt}function rt(y){var x,K;return y.type!=="divider"?{}:{borderTop:`${((x=y.content)==null?void 0:x.thickness)||2}px solid ${((K=y.content)==null?void 0:K.color)||"#e2e8f0"}`,width:"100%",height:"100%"}}const De=L({show:!1,x:0,y:0,elId:null});function ct(y,x){y.preventDefault(),De.value={show:!0,x:y.clientX,y:y.clientY,elId:x},r.selectElement(x),setTimeout(()=>window.addEventListener("click",Ke,{once:!0}),0)}function Ke(){De.value.show=!1}function Ct(){if(De.value.elId){const y=u.duplicateElement(r.projectId,r.currentSlideId,De.value.elId);y&&r.selectElement(y.id)}Ke()}function St(){De.value.elId&&(u.deleteElement(r.projectId,r.currentSlideId,De.value.elId),r.clearSelection()),Ke()}function $t(){De.value.elId&&u.reorderElement(r.projectId,r.currentSlideId,De.value.elId,"up"),Ke()}function pt(){De.value.elId&&u.reorderElement(r.projectId,r.currentSlideId,De.value.elId,"down"),Ke()}function It(){const y=a.value,x=u.addSlide(r.projectId,y);x&&r.setCurrentSlide(x.id)}function Et(){const y=a.value;y>0&&r.setCurrentSlide(B.value[y-1].id)}function At(){const y=a.value;y<B.value.length-1&&r.setCurrentSlide(B.value[y+1].id)}return(y,x)=>{var K;return l(),i("div",{class:"canvas-container",ref_key:"canvasContainerRef",ref:p},[z.value?(l(),i(ee,{key:1},[e("div",{class:Q(["canvas-zoom-wrapper",[xe.value&&`canvas-zoom-wrapper-${xe.value.tone}`]]),style:ce({transform:F.value,transformOrigin:"center center",transition:"transform .15s ease"})},[e("div",{ref_key:"canvasRef",ref:v,class:"slide-canvas",style:ce({width:W.value+"px",height:U.value+"px",...R.value,...tt.value}),onClick:ge,onMousedown:st,onDragover:qe,onDragleave:je,onDrop:Ce,onContextmenu:x[3]||(x[3]=Oe(()=>{},["prevent"]))},[xe.value?(l(),i("div",d1)):q("",!0),E(r).multiSelection&&N.value.length?(l(),i("div",{key:1,class:"selection-preset-chip",onMousedown:x[1]||(x[1]=Oe(()=>{},["stop"]))},[x[15]||(x[15]=e("span",{class:"selection-preset-label"},"Sequence",-1)),ue(e("select",{"onUpdate:modelValue":x[0]||(x[0]=V=>m.value=V),class:"selection-preset-select"},[(l(!0),i(ee,null,de(N.value,V=>(l(),i("option",{key:V.id,value:V.id},w(V.name),9,u1))),128))],512),[[Pt,m.value]]),e("button",{type:"button",class:"selection-preset-apply",onClick:Oe(ie,["stop"])},"Apply")],32)):q("",!0),fe.value?(l(),i("div",{key:2,class:"canvas-guide-warning",onMousedown:x[2]||(x[2]=Oe(()=>{},["stop"]))},[x[16]||(x[16]=e("span",{class:"canvas-guide-warning-dot"},null,-1)),e("span",null,w(fe.value),1)],32)):q("",!0),X.value?(l(),i("div",{key:3,class:"block-drop-preview",style:ce({left:`${X.value.x}px`,top:`${X.value.y}px`,width:`${X.value.bounds.width}px`,height:`${X.value.bounds.height}px`})},[(l(!0),i(ee,null,de(X.value.block.elements,(V,Ee)=>{var Ae,Fe,We,re;return l(),i("div",{key:`${X.value.block.id}-preview-${Ee}`,class:Q(["block-drop-preview-el",`block-drop-preview-${V.type}`]),style:ce({left:`${Number(V.x||0)-X.value.bounds.minX}px`,top:`${Number(V.y||0)-X.value.bounds.minY}px`,width:`${Number(V.width||0)}px`,height:`${Number(V.height||0)}px`,borderRadius:V.type==="shape"&&((Ae=V.content)==null?void 0:Ae.shapeType)==="circle"?"50%":`${Number(((Fe=V.content)==null?void 0:Fe.borderRadius)||12)}px`,background:V.type==="shape"?((We=V.content)==null?void 0:We.fillColor)||"rgba(108,71,255,.18)":V.type==="button"?((re=V.content)==null?void 0:re.bgColor)||"rgba(108,71,255,.32)":["text","heading"].includes(V.type)?"transparent":"rgba(148,163,184,.18)"})},[["text","heading"].includes(V.type)?(l(),i(ee,{key:0},[x[17]||(x[17]=e("span",{class:"block-drop-preview-line"},null,-1)),x[18]||(x[18]=e("span",{class:"block-drop-preview-line short"},null,-1))],64)):q("",!0)],6)}),128))],4)):q("",!0),(l(!0),i(ee,null,de(ke.value,V=>(l(),Je(Sf,{key:V.id,element:V,onContextmenu:Oe(Ee=>ct(Ee,V.id),["stop"])},{default:ut(()=>[(l(),Je($l(wt(V.type)),{element:V,style:ce(V.type==="divider"?rt(V):{})},null,8,["element","style"]))]),_:2},1032,["element","onContextmenu"]))),128)),xe.value?(l(),i("div",{key:4,class:Q(["canvas-guide",[`canvas-guide-${xe.value.tone}`,oe.value&&"canvas-guide-warning-state"]]),style:ce(xe.value.style),"aria-hidden":"true"},[e("span",c1,w(xe.value.label)+" · "+w(me.value),1)],6)):q("",!0),E(r).activeTool!=="select"||j.value||D.value?(l(),i("div",p1,w(D.value?"Drop block to insert it here":j.value?"Drop image to insert it on this slide":`Click anywhere to add ${E(r).activeTool}`),1)):q("",!0),C.value&&ae.value?(l(),i("div",{key:6,class:"selection-marquee",style:ce({left:ae.value.x+"px",top:ae.value.y+"px",width:ae.value.width+"px",height:ae.value.height+"px"})},null,4)):q("",!0)],36)],6),e("div",v1,[e("button",{class:"bar-btn",onClick:It},"Add page"),e("button",{class:"bar-btn icon",onClick:Et,disabled:a.value<=0},"◀",8,f1),e("span",g1,w(a.value+1)+" / "+w(B.value.length),1),e("button",{class:"bar-btn icon",onClick:At,disabled:a.value>=B.value.length-1},"▶",8,m1),e("span",null,w(W.value)+" × "+w(U.value)+"px",1),x[19]||(x[19]=e("span",null,"·",-1)),e("span",null,w(((K=z.value.elements)==null?void 0:K.length)||0)+" elements",1),x[20]||(x[20]=e("span",null,"·",-1)),e("span",{class:Q(["playback-badge",`playback-badge-${O.value.tone}`])},w(O.value.label),3),E(r).hasSelection?(l(),i("span",b1,"· "+w(E(r).selectedElementIds.length)+" selected",1)):q("",!0),E(r).multiSelection?(l(),i(ee,{key:1},[e("button",{class:"bar-btn",onClick:x[4]||(x[4]=V=>Pe("align-left"))},"Left"),e("button",{class:"bar-btn",onClick:x[5]||(x[5]=V=>Pe("align-center"))},"Center"),e("button",{class:"bar-btn",onClick:x[6]||(x[6]=V=>Pe("align-right"))},"Right"),e("button",{class:"bar-btn",onClick:x[7]||(x[7]=V=>Pe("align-top"))},"Top"),e("button",{class:"bar-btn",onClick:x[8]||(x[8]=V=>Pe("align-middle"))},"Middle"),e("button",{class:"bar-btn",onClick:x[9]||(x[9]=V=>Pe("align-bottom"))},"Bottom"),e("button",{class:"bar-btn",onClick:x[10]||(x[10]=V=>Pe("distribute-horizontal"))},"Space H"),e("button",{class:"bar-btn",onClick:x[11]||(x[11]=V=>Pe("distribute-vertical"))},"Space V")],64)):q("",!0),e("button",{class:"bar-btn ai",onClick:x[12]||(x[12]=V=>E(r).setRightPanel("ai"))},"AI")])],64)):(l(),i("div",s1,[(l(),i("svg",r1,[...x[13]||(x[13]=[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"},null,-1)])])),x[14]||(x[14]=e("p",null,"Select a slide to start editing",-1))])),(l(),Je(ml,{to:"body"},[De.value.show?(l(),i("div",{key:0,class:"ctx-menu",style:ce({left:De.value.x+"px",top:De.value.y+"px"})},[e("button",{class:"ctx-item",onClick:Ct},"Duplicate"),e("button",{class:"ctx-item",onClick:$t},"Bring Forward"),e("button",{class:"ctx-item",onClick:pt},"Send Backward"),x[21]||(x[21]=e("div",{class:"ctx-divider"},null,-1)),e("button",{class:"ctx-item danger",onClick:St},"Delete")],4)):q("",!0)]))],512)}}},h1=Xe(y1,[["__scopeId","data-v-f050859a"]]),x1={class:"ai-panel"},k1={class:"ai-mode-tabs"},w1=["onClick"],C1={class:"ai-content"},S1={class:"form-group"},$1={class:"output-mode-switch",role:"group","aria-label":"Slide generation scope"},I1={key:0,class:"form-group"},E1={key:1,class:"form-group"},A1={class:"layout-label-row"},T1={class:"layout-current-hint"},M1={class:"layout-preset-grid",role:"group","aria-label":"AI layout preset"},P1=["onClick"],B1={class:"layout-preset-title"},N1={class:"layout-preset-hint"},z1={key:2,class:"form-group"},L1={key:3,class:"form-group"},j1={class:"layout-label-row"},_1={class:"layout-current-hint"},D1={class:"output-mode-switch",role:"group","aria-label":"Deck layout strategy"},q1={key:4,class:"form-group"},R1={class:"layout-label-row"},O1={class:"layout-current-hint"},F1={class:"layout-preset-grid",role:"group","aria-label":"Deck layout preset"},U1=["onClick"],V1={class:"layout-preset-title"},W1={class:"layout-preset-hint"},G1={class:"form-group"},H1={class:"form-group"},Y1={class:"prompt-label-row"},J1={key:1,class:"prompt-auto-badge"},Q1={key:5,class:"output-mode-switch",role:"group","aria-label":"Generation output mode"},X1={key:6,class:"selected-source-card"},K1={class:"result-header"},Z1={class:"source-count-badge"},eg={class:"selected-source-preview"},tg={class:"selected-source-actions"},og=["disabled"],ng=["disabled"],lg={key:0,class:"spinner"},ig={key:1,width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},ag={key:7,class:"creative-options-wrap"},sg={class:"result-header"},rg={key:0,class:"ai-error",style:{"margin-top":"var(--space-2)"}},dg={key:1,class:"creative-options-list"},ug={class:"creative-title"},cg={class:"creative-angle"},pg=["onClick"],vg={class:"form-group"},fg={class:"quiz-config-row"},gg={class:"form-group",style:{flex:"1"}},mg={class:"form-group",style:{flex:"1"}},bg={class:"form-group"},yg={class:"qtype-btns"},hg=["onClick"],xg={class:"qtype-icon"},kg={class:"form-group"},wg={class:"form-group"},Cg={class:"prompt-label-row"},Sg={key:1,class:"prompt-auto-badge"},$g=["disabled"],Ig={key:0,class:"spinner"},Eg={key:1,width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Ag={key:0,class:"quiz-results"},Tg={class:"quiz-results-header"},Mg={class:"form-label"},Pg={class:"quiz-header-actions"},Bg={class:"regen-row"},Ng=["disabled"],zg={key:0,class:"spinner spinner-sm"},Lg={key:1,width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},jg=["disabled"],_g={class:"quiz-card-header"},Dg={class:"quiz-card-check"},qg=["onUpdate:modelValue"],Rg={class:"q-num"},Og={class:"q-badges"},Fg={class:"badge type-badge"},Ug={class:"q-question"},Vg={class:"q-options"},Wg={class:"q-option-letter"},Gg={key:0,class:"q-check-icon",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},Hg={key:0,class:"q-explanation"},Yg=["disabled"],Jg={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},Qg=["disabled"],Xg={key:0,class:"spinner"},Kg={key:0,class:"selected-text-preview"},Zg={class:"text-preview"},em={key:1,class:"ai-hint"},tm={class:"form-group",style:{"margin-bottom":"var(--space-3)","margin-top":"var(--space-3)"}},om=["disabled"],nm={key:0,class:"spinner"},lm={key:0,class:"selected-text-preview"},im={class:"text-preview"},am={key:1,class:"ai-hint"},sm={class:"form-group",style:{"margin-top":"var(--space-3)","margin-bottom":"var(--space-3)"}},rm=["disabled"],dm={key:0,class:"spinner"},um={key:2,class:"improve-result-wrap",style:{"margin-top":"var(--space-4)"}},cm={class:"result-header"},pm={class:"result-actions"},vm=["disabled"],fm={class:"textarea result-display"},gm={key:0,class:"demo-notice",style:{"margin-bottom":"var(--space-3)"}},mm={key:1,class:"ai-error",style:{"margin-bottom":"var(--space-3)"}},bm={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},ym=["disabled"],hm={key:0,class:"spinner"},xm={key:2,class:"improve-result-wrap",style:{"margin-top":"var(--space-4)"}},km={class:"textarea result-display",style:{color:"var(--color-primary)"}},wm={key:6,class:"ai-settings"},Cm={class:"form-group",style:{"margin-bottom":"var(--space-4)"}},Sm=["value"],$m={class:"form-group",style:{"margin-bottom":"var(--space-4)"}},Im=["value","placeholder"],Em={class:"form-hint"},Am={key:0,class:"demo-notice"},Tm={key:1,class:"demo-notice"},Mm={key:7,class:"result-area"},Pm={class:"result-header"},Bm={class:"result-pre"},Nm={class:"result-actions"},zm=["disabled"],Lm={key:8,class:"ai-error"},jm={__name:"AIAssistant",setup(A){const r=[{id:"classic",label:"Classic",hint:"Title, bullets, and a takeaway.",promptHint:"Use a standard explanatory slide with a title, optional subtitle, 3-5 bullets, and one strong takeaway.",schema:'{ "layout": "classic", "title": "...", "subtitle": "...", "bullets": ["..."], "callout": "..." }'},{id:"cards",label:"Cards",hint:"Three concept or benefit cards.",promptHint:"Structure the content as three distinct cards with a short title and supporting sentence for each.",schema:'{ "layout": "cards", "title": "...", "subtitle": "...", "callout": "...", "cards": [{ "title": "...", "body": "..." }, { "title": "...", "body": "..." }, { "title": "...", "body": "..." }] }'},{id:"comparison",label:"Comparison",hint:"Side-by-side before/after or option A/B.",promptHint:"Create a two-column comparison with clear labels and 2-3 points on each side.",schema:'{ "layout": "comparison", "title": "...", "subtitle": "...", "callout": "...", "comparison": { "leftTitle": "...", "leftPoints": ["..."], "rightTitle": "...", "rightPoints": ["..."] } }'},{id:"metrics",label:"Metrics",hint:"Three KPI-style highlights.",promptHint:"Return three concise, presentation-ready metrics with realistic values and short labels.",schema:'{ "layout": "metrics", "title": "...", "subtitle": "...", "callout": "...", "metrics": [{ "value": "92%", "label": "..." }, { "value": "3.4x", "label": "..." }, { "value": "14d", "label": "..." }] }'},{id:"timeline",label:"Timeline",hint:"Four-step milestone story.",promptHint:"Turn the topic into four clear milestones that progress from start to finish.",schema:'{ "layout": "timeline", "title": "...", "subtitle": "...", "callout": "...", "timeline": [{ "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }] }'},{id:"faq",label:"FAQ",hint:"Three audience questions and answers.",promptHint:"Return three strong audience questions, each with a concise useful answer.",schema:'{ "layout": "faq", "title": "...", "subtitle": "...", "callout": "...", "faqs": [{ "question": "...", "answer": "..." }, { "question": "...", "answer": "..." }, { "question": "...", "answer": "..." }] }'},{id:"process",label:"Process",hint:"Three practical steps.",promptHint:"Break the topic into three clear steps with actionable descriptions.",schema:'{ "layout": "process", "title": "...", "subtitle": "...", "callout": "...", "process": [{ "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }] }'},{id:"cloze",label:"Fill-in-the-Blank",hint:"Interactive fill-in-the-blank text.",promptHint:"Create an interactive fill-in-the-blank activity. Provide a paragraph with a few key words wrapped in [brackets] to indicate blanks.",schema:'{ "layout": "cloze", "title": "...", "subtitle": "...", "callout": "...", "cloze": { "text": "A sentence about the topic where the [key word] is in brackets." } }'},{id:"scenario",label:"Scenario",hint:"Branching scenario with choices.",promptHint:"Create a branching scenario. Provide a starting situation from the agent, and 2-3 potential responses from the user.",schema:'{ "layout": "scenario", "title": "...", "subtitle": "...", "callout": "...", "scenario": { "agentMessage": "...", "userOptions": ["..."] } }'},{id:"progress",label:"Progress",hint:"A step-by-step progress indicator.",promptHint:"Create a progress overview representing the users current learning status. Provide realistic mock values.",schema:'{ "layout": "progress", "title": "...", "subtitle": "...", "callout": "...", "progress": { "level": 4, "xp": 350, "percent": 65 } }'},{id:"poll",label:"Poll",hint:"An interactive poll or survey.",promptHint:"Create an interactive poll question with 3-4 options. Provide realistic mock vote counts.",schema:'{ "layout": "poll", "title": "...", "subtitle": "...", "callout": "...", "poll": { "question": "...", "options": [{ "text": "...", "votes": 12 }] } }'},{id:"matching",label:"Matching",hint:"A drag-and-drop matching activity.",promptHint:"Create a matching activity with 3-4 pairs of related concepts (e.g. term and definition).",schema:'{ "layout": "matching", "title": "...", "subtitle": "...", "callout": "...", "matching": { "pairs": [{ "left": "...", "right": "..." }] } }'},{id:"sorting",label:"Sorting",hint:"A sorting activity.",promptHint:"Create an activity where items need to be sorted into correct order. Provide the items in random order.",schema:'{ "layout": "sorting", "title": "...", "subtitle": "...", "callout": "...", "sorting": { "items": [{ "text": "...", "correctOrder": 0 }] } }'},{id:"labeledimage",label:"Labeled Image",hint:"An image with interactive hotspots.",promptHint:"Define 2-3 standard hotspots (x, y percentages) with labels and descriptions over a concept.",schema:'{ "layout": "labeledimage", "title": "...", "subtitle": "...", "callout": "...", "labeledimage": { "markers": [{ "x": 25, "y": 35, "label": "1", "title": "...", "description": "..." }] } }'}],u={cards:"three-card-grid",comparison:"comparison-columns",metrics:"metric-strip",timeline:"timeline-ribbon",faq:"faq-stack",process:"process-ladder"};function p(s,n="classic"){const f=String(s||n||"classic").trim().toLowerCase();return r.some($=>$.id===f)?f:n}function v(s,n=""){return String(s??n).replace(/^\s*[-•]\s*/,"").trim()||n}function h(s){return(Array.isArray(s)?s:typeof s=="string"?s.split(`
`):[]).map(f=>v(f)).filter(Boolean)}function k(s,n,f){const $=[...s];for(;$.length<n;)$.push(f($.length));return $.slice(0,n)}function g(s,n){const f=Array.isArray(s)?s.map((b,Y)=>({title:v(b==null?void 0:b.title,`Card ${Y+1}`),body:v((b==null?void 0:b.body)||(b==null?void 0:b.text)||(b==null?void 0:b.description),"Add supporting detail.")})).filter(b=>b.title||b.body):[],$=n.map((b,Y)=>({title:`Point ${Y+1}`,body:b}));return k(f.length?f:$,3,b=>({title:`Point ${b+1}`,body:"Add supporting detail."}))}function G(s,n){const f=h(s==null?void 0:s.leftPoints),$=h(s==null?void 0:s.rightPoints),b=n.slice(0,Math.max(1,Math.ceil(n.length/2))),Y=n.slice(Math.max(1,Math.ceil(n.length/2)));return{leftTitle:v(s==null?void 0:s.leftTitle,"Option A"),leftPoints:k(f.length?f:b,3,he=>`Left point ${he+1}`),rightTitle:v(s==null?void 0:s.rightTitle,"Option B"),rightPoints:k($.length?$:Y,3,he=>`Right point ${he+1}`)}}function le(s,n){const f=Array.isArray(s)?s.map((b,Y)=>({value:v(b==null?void 0:b.value,`${Y+1}`),label:v(b==null?void 0:b.label,`Metric ${Y+1}`)})).filter(b=>b.value||b.label):[],$=n.map((b,Y)=>{const[he,...Ye]=b.split(/[:\-]/);return{value:v(he,`${Y+1}`),label:v(Ye.join(" ").trim(),b)}});return k(f.length?f:$,3,b=>({value:`${b+1}`,label:`Metric ${b+1}`}))}function W(s,n){const f=Array.isArray(s)?s.map((b,Y)=>({title:v(b==null?void 0:b.title,`Phase ${Y+1}`),detail:v((b==null?void 0:b.detail)||(b==null?void 0:b.description),"Explain the milestone.")})).filter(b=>b.title||b.detail):[],$=n.map((b,Y)=>({title:`Phase ${Y+1}`,detail:b}));return k(f.length?f:$,4,b=>({title:`Phase ${b+1}`,detail:"Explain the milestone."}))}function U(s,n){const f=Array.isArray(s)?s.map((b,Y)=>({question:v(b==null?void 0:b.question,`Question ${Y+1}?`),answer:v(b==null?void 0:b.answer,"Add the short answer here.")})).filter(b=>b.question||b.answer):[],$=n.map((b,Y)=>({question:`Question ${Y+1}?`,answer:b}));return k(f.length?f:$,3,b=>({question:`Question ${b+1}?`,answer:"Add the short answer here."}))}function me(s,n){const f=Array.isArray(s)?s.map((b,Y)=>({title:v(b==null?void 0:b.title,`Step ${Y+1}`),detail:v((b==null?void 0:b.detail)||(b==null?void 0:b.description),"Add the step detail here.")})).filter(b=>b.title||b.detail):[],$=n.map((b,Y)=>({title:`Step ${Y+1}`,detail:b}));return k(f.length?f:$,3,b=>({title:`Step ${b+1}`,detail:"Add the step detail here."}))}const z=Ml(),B=it(),a=at(),P=M(()=>z.apiProvider==="gemini"?"Gemini":"OpenAI"),N=M(()=>z.apiProvider==="gemini"?"AIza...":"sk-..."),H=M(()=>z.apiProvider==="gemini"?"Gemini API keys from Google AI Studio work for text features on the free tier. We provide free image generation via Pollinations.ai when Gemini is selected. The key is stored locally in your browser and never sent to our servers.":"Key is stored locally in your browser. It is never sent to our servers."),m=L("generate"),O=L(""),ie=L(""),te=L("");Qe(m,()=>{te.value=""}),Qe(()=>B.aiPanelMode,s=>{s&&(m.value=s)},{immediate:!0});const ke=L(4),R=L("general"),F=L("Spanish"),pe=L(""),be=L(""),ne=L(""),we=L(!1),C=L("single"),j=L("classic"),D=L("mixed"),X=L(5),xe=L("slide"),ze=L([]),Ie=L(""),_e=M(()=>r.find(s=>s.id===j.value)||r[0]),oe=M(()=>{const s=ie.value.trim()||"[your topic]";if(C.value==="deck"){let $=`Create a complete ${X.value}-slide learning deck about "${s}".`;return be.value.trim()&&($+=`
Additional context: ${be.value.trim()}`),$+=`
Deck layout strategy: ${D.value}`,D.value==="single"?$+=`
Use the ${j.value} layout for every slide.`:$+=`
Mix layouts across the deck when appropriate.`,$+=`
Return ONLY valid JSON: { "slides": [{ "title": "...", "subtitle": "...", "callout": "...", "slideType": "...", "layout": "classic|cards|comparison|metrics|timeline|faq|process|cloze|scenario|progress|poll|matching|sorting|labeledimage" }] }`,$+=`
Make each slide distinct, logically sequenced, and specific to "${s}".`,$}let f=`Create a ${{general:"well-structured educational slide with title, key points, and a takeaway",intro:"introduction slide — purpose, motivation, and what learners will achieve",overview:"overview slide — high-level map of all topics to be covered",concept:"concept slide — definition, how it works, and why it matters",example:"example slide — real-world case study or worked example with outcome",summary:"summary slide — recap key points and reinforce the main message",callout:"callout slide — single critical insight or action item"}[R.value]||"educational slide"} about "${s}".`;return be.value.trim()&&(f+=`
Additional context: ${be.value.trim()}`),f+=`
Layout mode: ${j.value}`,f+=`
Layout instruction: ${_e.value.promptHint}`,f+=`
Return ONLY valid JSON matching this shape: ${_e.value.schema}`,f+=`
Make all content specific to "${s}" — no generic placeholders.`,f});Qe(oe,s=>{we.value||(ne.value=s)},{immediate:!0});function fe(){ne.value=oe.value,we.value=!1}const ae=L(""),ge=L("intermediate"),Me=L("multiple-choice"),se=L(""),I=L([]),S=L(""),ye=L(!1),c=M(()=>{const s=ae.value.trim()||"[your topic]",n={beginner:"Beginner",intermediate:"Intermediate",advanced:"Advanced"},f={"multiple-choice":"Multiple Choice","true-false":"True / False",mixed:"Mixed (MCQ + T/F)"};let $=`Generate ${ke.value} ${n[ge.value]} ${f[Me.value]} quiz questions about "${s}".
Return ONLY a valid JSON array with no markdown, each item having: question, options (array), correctIndex (0-based), explanation, difficulty, type.`;return se.value.trim()&&($+=`
Learning objective: ${se.value.trim()}`),$});Qe(c,s=>{ye.value||(S.value=s)},{immediate:!0});function Le(){S.value=c.value,ye.value=!1}const qe=M(()=>a.getProject(B.projectId)),je=M(()=>{var s,n;return(n=(s=qe.value)==null?void 0:s.slides)==null?void 0:n.find(f=>f.id===B.currentSlideId)}),Ce=M(()=>{var s,n;return B.selectedElementId?(n=(s=je.value)==null?void 0:s.elements)==null?void 0:n.find(f=>f.id===B.selectedElementId):null}),Pe=M(()=>{var n;const s=new Set(B.selectedElementIds);return(((n=je.value)==null?void 0:n.elements)||[]).filter(f=>{var $;return s.has(f.id)&&typeof(($=f==null?void 0:f.content)==null?void 0:$.text)=="string"&&f.content.text.trim()})}),st=M(()=>Pe.value.map(s=>s.content.text.trim()).filter(Boolean).join(`

`));async function tt(){if(!ie.value.trim()&&!ne.value.trim())return;if(te.value="",ze.value=[],Ie.value="",C.value==="deck"){const n=await z.generateSlideDeck(ie.value,X.value,{objective:be.value,customPrompt:ne.value,layoutStrategy:D.value,layoutMode:j.value});if(n!=null&&n.length){const f=n.map($=>ot($));te.value=JSON.stringify({slides:f},null,2),Be(f,{replaceGenerated:!0})}return}if(xe.value==="options"){await gt();return}const s=await z.generateSlideContent(ie.value,R.value,be.value,ne.value,{layoutMode:j.value});if(s){const n=ot(s);te.value=JSON.stringify(n,null,2),Ve(n,{replaceGenerated:!0})}}function ot(s){var b;const n=s&&typeof s=="object"?s:{},f=h(n.bullets),$=p(n.layout||((b=n.design)==null?void 0:b.layout),C.value==="deck"&&D.value==="mixed"?"classic":j.value);return{title:String(n.title||ie.value||"Untitled Slide").trim(),subtitle:String(n.subtitle||"").trim(),bullets:f,callout:String(n.callout||"").trim(),layout:$,cards:g(n.cards,f),comparison:G(n.comparison,f),metrics:le(n.metrics,f),timeline:W(n.timeline,f),faqs:U(n.faqs,f),process:me(n.process,f),cloze:n.cloze||{text:""},scenario:n.scenario||{agentMessage:"",userOptions:[]},progress:n.progress||{level:4,xp:350,percent:65},poll:n.poll||{question:"",options:[]},matching:n.matching||{pairs:[]},sorting:n.sorting||{items:[]},labeledimage:n.labeledimage||{markers:[]}}}function wt(s,n){var b,Y,he;const f=(Y=(b=a.getProject(s))==null?void 0:b.slides)==null?void 0:Y.find(Ye=>Ye.id===n);if(!((he=f==null?void 0:f.elements)!=null&&he.length))return;f.elements.filter(Ye=>{var T;return((T=Ye.meta)==null?void 0:T.source)==="ai-content"}).map(Ye=>Ye.id).forEach(Ye=>{a.deleteElement(s,n,Ye)})}function rt(s,n,f,$){return a.addElement(s,n,f,{...$,meta:{...$.meta||{},source:"ai-content"}})}function De(s){const n=Ol.find($=>$.id===s);if(!n)return null;const f=Fl(JSON.parse(JSON.stringify(n)),s);return f.elements=f.elements.map($=>({...$,meta:{...$.meta||{},source:"ai-content"}})),f}function ct(s,n){n&&s.elements.push({type:"text",x:0,y:54,width:760,height:36,meta:{source:"ai-content"},content:{text:n,fontSize:16,fontWeight:"500",textAlign:"left",color:"#64748b",lineHeight:1.4,fontFamily:"Inter, sans-serif"}})}function Ke(s,n){if(!n)return;const f=Gt(s);s.elements.push({type:"text",x:0,y:f.height+18,width:Math.max(f.width,720),height:40,meta:{source:"ai-content"},content:{text:`Takeaway: ${n}`,fontSize:15,fontWeight:"600",textAlign:"left",color:"#6c47ff",lineHeight:1.4,fontFamily:"Inter, sans-serif"}})}function Ct(s){const n=Array.isArray(s)?s:[];if(!n.length)return{minX:40,minY:54,width:0,height:0};const f=Math.min(...n.map(he=>Number(he.x||0))),$=Math.min(...n.map(he=>Number(he.y||0))),b=Math.max(...n.map(he=>Number(he.x||0)+Number(he.width||0))),Y=Math.max(...n.map(he=>Number(he.y||0)+Number(he.height||0)));return{minX:f,minY:$,width:Math.max(0,b-f),height:Math.max(0,Y-$)}}function St(s,n){var Y;const f=a.getProject(s),$=Gt(n),b=Number(((Y=f==null?void 0:f.settings)==null?void 0:Y.slideWidth)||960);return{x:Math.max(40,Math.round((b-$.width)/2)),y:54}}function $t(s){const n=De(u.cards);if(!n)return null;const f=s.cards;return n.elements[0].content.text=s.title,n.elements[1].content.text=s.subtitle||s.callout||"Use the three cards to frame the main ideas.",f.forEach(($,b)=>{n.elements[5+b].content.text=$.title,n.elements[8+b].content.text=$.body}),s.callout&&s.subtitle&&Ke(n,s.callout),n}function pt(s){const n=De(u.comparison);return n?(n.elements[0].content.text=s.title,n.elements[3].content.text=s.comparison.leftTitle,n.elements[4].content.text=s.comparison.rightTitle,n.elements[5].content={...n.elements[5].content,text:s.comparison.leftPoints.map(f=>`• ${f}`).join(`
`),fontSize:17,lineHeight:1.55},n.elements[6].content={...n.elements[6].content,text:s.comparison.rightPoints.map(f=>`• ${f}`).join(`
`),fontSize:17,lineHeight:1.55},ct(n,s.subtitle),Ke(n,s.callout),n):null}function It(s){const n=De(u.metrics);return n?(n.elements[0].content.text=s.title,s.metrics.forEach((f,$)=>{n.elements[4+$].content.text=f.value,n.elements[7+$].content.text=f.label}),ct(n,s.subtitle),Ke(n,s.callout),n):null}function Et(s){const n=De(u.timeline);return n?(n.elements[0].content.text=s.title,s.timeline.forEach((f,$)=>{n.elements[6+$].content={...n.elements[6+$].content,text:`${f.title}
${f.detail}`,fontSize:16,lineHeight:1.35}}),ct(n,s.subtitle),Ke(n,s.callout),n):null}function At(s){const n=De(u.faq);return n?(n.elements[0].content.text=s.title,s.faqs.forEach((f,$)=>{n.elements[4+$].content={...n.elements[4+$].content,text:`${f.question}
${f.answer}`,fontSize:16,lineHeight:1.35},n.elements[4+$].height=44}),ct(n,s.subtitle),Ke(n,s.callout),n):null}function y(s){const n=De(u.process);return n?(n.elements[0].content.text=s.title,s.process.forEach((f,$)=>{n.elements[8+$].content.text=f.title,n.elements[11+$].content.text=f.detail}),ct(n,s.subtitle),Ke(n,s.callout),n):null}function x(s,n,f,$,b){const Y=[];s.title&&Y.push({type:"heading",x:0,y:0,width:800,height:80,content:{text:s.title,fontSize:36,fontWeight:"bold",textAlign:"center",color:"#1a1a2e",fontFamily:"Inter, sans-serif",lineHeight:1.2}});let he=s.title?100:0;s.subtitle&&(Y.push({type:"text",x:0,y:he,width:800,height:40,content:{text:s.subtitle,fontSize:16,fontWeight:"500",textAlign:"center",color:"#64748b",lineHeight:1.4,fontFamily:"Inter, sans-serif"}}),he+=60);const Ye=Math.max(0,(800-f)/2);Y.push({type:n,x:Ye,y:he,width:f,height:$,content:b()});const T={id:`generated-${crypto.randomUUID?crypto.randomUUID():Date.now()}`,type:"group",elements:Y};return s.callout&&Ke(T,s.callout),T}function K(s){const n=s.cloze||{};return x(s,"cloze",600,240,()=>({title:"Fill in the blanks",text:n.text||"An assessment should align closely with the [learning] objectives.",bgColor:"#ffffff",textColor:"#1e293b",fontSize:16,borderRadius:8}))}function V(s){var Y;const n=s.scenario||{},f=n.agentMessage||"Welcome to this scenario. What will you do first?",$=(Y=n.userOptions)!=null&&Y.length?n.userOptions:["I will analyze the requirements."],b=[{role:"agent",text:f}];return $.forEach(he=>b.push({role:"user",text:typeof he=="string"?he:he.text})),x(s,"scenario",600,360,()=>({bgColor:"#f8fafc",borderRadius:8,messages:b}))}function Ee(s){const n=s.progress||{};return x(s,"progress",400,200,()=>({title:"Your Progress",bgColor:"#ffffff",titleColor:"#0f172a",textColor:"#64748b",fillColor:"#10b981",borderRadius:8,mockXP:n.xp||350,mockLevel:n.level||4,mockPercent:n.percent||65}))}function Ae(s){var b;const n=s.poll||{},$=((b=n.options)!=null&&b.length?n.options:[{text:"Option A",votes:12},{text:"Option B",votes:24}]).map((Y,he)=>({id:String(he+1),text:Y.text||String(Y),votes:Y.votes||0}));return x(s,"poll",600,360,()=>({question:n.question||"What is your favorite topic?",options:$,showResults:!1,barColor:"#cbd5e1",barSelectedColor:"#6c47ff",trackColor:"#f1f5f9",textColor:"#1e293b",bgColor:"#ffffff"}))}function Fe(s){var b;const n=s.matching||{},$=((b=n.pairs)!=null&&b.length?n.pairs:[{left:"Concept 1",right:"Detail 1"},{left:"Concept 2",right:"Detail 2"}]).map((Y,he)=>({id:String(he+1),left:Y.left,right:Y.right}));return x(s,"matching",600,360,()=>({title:"Match the concepts",bgColor:"#ffffff",titleColor:"#0f172a",accentColor:"#6c47ff",accentBgColor:"#f3f0ff",pairs:$}))}function We(s){var b;const n=s.sorting||{},$=((b=n.items)!=null&&b.length?n.items:[{text:"Step 1",correctOrder:0},{text:"Step 2",correctOrder:1}]).map((Y,he)=>({id:String(he+1),text:Y.text,correctOrder:Y.correctOrder??he}));return x(s,"sorting",500,360,()=>({title:"Sort items correctly",bgColor:"#ffffff",titleColor:"#0f172a",accentColor:"#6c47ff",items:$}))}function re(s){var b;const n=s.labeledimage||{},$=((b=n.markers)!=null&&b.length?n.markers:[{x:25,y:35,label:"1",title:"Point 1",description:"Description 1"},{x:75,y:65,label:"2",title:"Point 2",description:"Description 2"}]).map((Y,he)=>({id:String(he+1),x:Y.x||50,y:Y.y||50,label:Y.label||String(he+1),title:Y.title||`Point ${he+1}`,description:Y.description||""}));return x(s,"labeledimage",600,400,()=>({src:"",borderRadius:8,markerColor:"#6c47ff",markerTextColor:"#ffffff",markers:$}))}function $e(s){switch(s.layout){case"cards":return $t(s);case"comparison":return pt(s);case"metrics":return It(s);case"timeline":return Et(s);case"faq":return At(s);case"process":return y(s);case"cloze":return K(s);case"scenario":return V(s);case"progress":return Ee(s);case"poll":return Ae(s);case"matching":return Fe(s);case"sorting":return We(s);case"labeledimage":return re(s);default:return null}}function Ze(s,n,f){var $;if(f.title&&(a.updateSlide(s,n,{title:f.title}),rt(s,n,"heading",{x:60,y:40,width:840,height:80,content:{text:f.title,fontSize:36,fontWeight:"bold",textAlign:"center",color:"#1a1a2e",fontFamily:"Inter, sans-serif",lineHeight:1.2}})),f.subtitle&&rt(s,n,"text",{x:60,y:130,width:840,height:50,content:{text:f.subtitle,fontSize:20,fontWeight:"normal",textAlign:"center",color:"#4a4a6a",fontFamily:"Inter, sans-serif",lineHeight:1.4}}),($=f.bullets)!=null&&$.length){const b=f.bullets.map(Y=>`• ${Y}`).join(`
`);rt(s,n,"text",{x:60,y:f.subtitle?200:150,width:840,height:200,content:{text:b,fontSize:18,fontWeight:"normal",textAlign:"left",color:"#2d2d4e",fontFamily:"Inter, sans-serif",lineHeight:1.8}})}f.callout&&(rt(s,n,"shape",{x:60,y:420,width:840,height:60,content:{shapeType:"rectangle",fillColor:"#ede9ff",borderColor:"#6c47ff",borderWidth:2,borderRadius:8}}),rt(s,n,"text",{x:80,y:432,width:800,height:40,content:{text:`💡 ${f.callout}`,fontSize:15,fontWeight:"600",textAlign:"center",color:"#6c47ff",fontFamily:"Inter, sans-serif",lineHeight:1.4}}))}function Re(s,n,f,{replaceGenerated:$=!1,origin:b=null}={}){if(!s||!n)return;$&&wt(s,n);const Y=$e(f);if(a.updateSlide(s,n,{title:f.title||"Untitled Slide"}),Y){const he=b||St(s,Y);a.insertContentBlock(s,n,Y,he)}else Ze(s,n,f)}function Be(s,{replaceGenerated:n=!1}={}){if(!B.currentSlideId)return;const f=B.projectId;if(!f||!Array.isArray(s)||!s.length)return;s.map(b=>ot(b)).forEach(b=>{const Y=a.addSlide(f);Y&&Re(f,Y.id,b,{replaceGenerated:n})})}function Ve(s=null,{replaceGenerated:n=!1}={}){if(!B.currentSlideId)return;let f=s;if(!f){if(!te.value)return;try{f=JSON.parse(te.value)}catch(he){console.warn("Could not parse AI content:",he);return}}const $=ot(f),b=B.projectId,Y=B.currentSlideId;!b||!Y||Re(b,Y,$,{replaceGenerated:n})}function mt(){if(te.value){if(C.value==="deck"){try{const s=JSON.parse(te.value),n=Array.isArray(s)?s:s==null?void 0:s.slides;if(!Array.isArray(n)||!n.length)return;Be(n,{replaceGenerated:!0})}catch{return}return}Ve()}}async function gt(){const s=ie.value.trim()||"[your topic]",n=`You are an expert instructional designer.
Create exactly 3 distinct creative slide directions for a "${R.value}" slide about "${s}" using a ${j.value} layout.

Return ONLY valid JSON array:
[
  {
    "title": "Short option title",
    "angle": "What makes this approach unique in one sentence",
    "prompt": "A detailed prompt for generating that slide content as JSON with title/subtitle/bullets/callout"
  }
]

Each option must be meaningfully different in teaching style and structure.`,f=await z.generate(n,{type:"creativeOptions",topic:s,slideType:R.value});if(f)try{const $=JSON.parse(f.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim());if(!Array.isArray($))throw new Error("Options must be an array");ze.value=$.slice(0,3).map((b,Y)=>({title:String((b==null?void 0:b.title)||`Option ${Y+1}`),angle:String((b==null?void 0:b.angle)||""),prompt:String((b==null?void 0:b.prompt)||"")})).filter(b=>b.prompt.trim()),ze.value.length||(Ie.value="No usable creative options were returned. Try generating again.")}catch{Ie.value="Could not parse creative options. Try again or switch to “Show on Slide”."}}async function bt(s){s!=null&&s.prompt&&(ne.value=s.prompt,we.value=!0,xe.value="slide",await tt())}async function Lt(){if(!st.value.trim()||!B.projectId||!B.currentSlideId)return;const s=await z.transformSourceTextToSlideContent(st.value,{topic:ie.value,slideType:R.value,description:be.value,layoutMode:j.value,customPrompt:ne.value});if(!s)return;const n=ot(s),f=Ct(Pe.value),$={x:Math.max(24,Math.round(f.minX)),y:Math.max(24,Math.round(f.minY))};Pe.value.forEach(b=>{a.deleteElement(B.projectId,B.currentSlideId,b.id)}),te.value=JSON.stringify(n,null,2),Re(B.projectId,B.currentSlideId,n,{origin:$})}async function yt(s=!1){if(!ae.value.trim()&&!S.value.trim())return;s||(I.value=[]);const n=await z.generateQuiz(ae.value,ke.value,{difficulty:ge.value,questionType:Me.value,objective:se.value,customPrompt:S.value});if(n)if(s){const f=new Set(I.value.map(b=>b.question)),$=n.filter(b=>!f.has(b.question)).map(b=>({...b,_selected:!0}));I.value=[...I.value,...$]}else I.value=n.map(f=>({...f,_selected:!0}))}async function jt(){const s=I.value.filter(f=>f._selected);if(!s.length)return;const n=B.projectId;s.forEach((f,$)=>{const b=a.addSlide(n);if(b){a.addElement(n,b.id,"quiz",{x:60,y:80,width:840,height:380,content:{question:f.question||"Untitled Question",options:Array.isArray(f.options)?f.options:["True","False"],correctIndex:typeof f.correctIndex=="number"?f.correctIndex:0,explanation:f.explanation||""}});const Y=typeof f.question=="string"?f.question:"Quiz";a.updateSlide(n,b.id,{title:`Q${$+1}: ${Y.slice(0,40)}…`})}}),I.value=[]}function Tt(s){I.value.forEach(n=>n._selected=s)}async function _t(){if(!pe.value.trim())return;const s=await z.generateVoiceoverScript(pe.value);s&&(te.value=s)}async function Ot(){var f,$;const s=($=(f=Ce.value)==null?void 0:f.content)==null?void 0:$.text;if(!s)return;const n=await z.generateTranslation(s,F.value);n&&(te.value=n)}async function xt(){!te.value||!Ce.value||a.updateElement(B.projectId,B.currentSlideId,Ce.value.id,{content:{...Ce.value.content,text:te.value}})}const Ge=L(""),nt=L(!1);function vt(s){return String(s||"").replace(/```(json)?\n?/gi," ").replace(/```/g," ").replace(/[\r\n]+/g," ").replace(/\s+/g," ").trim().slice(0,220)}function dt(s,n){return new Promise((f,$)=>{const b=window.setTimeout(()=>{$(new Error("Timed out"))},n);Promise.resolve(s).then(Y=>{window.clearTimeout(b),f(Y)}).catch(Y=>{window.clearTimeout(b),$(Y)})})}function Dt(s){const n=String(s||"").trim(),f=n.toLowerCase(),$=P.value;return n?f.includes("billing hard limit")||f.includes("billing")||f.includes("quota")||f.includes("insufficient_quota")?z.apiProvider==="gemini"?"Gemini image generation is being rejected by Google because this project is still on the free tier. Gemini Developer API image models require a billing-enabled project, so you need to enable billing in AI Studio or switch providers for image generation.":`Your ${$} account cannot generate images right now because its billing or quota limit has been reached. Update billing or wait for quota reset, then try again.`:z.apiProvider==="gemini"&&(f.includes("resource exhausted")||f.includes("free tier")||f.includes("generativelanguage.googleapis.com"))?"Gemini image generation is not available to this free-tier project. Enable billing for the Gemini project in AI Studio to use Gemini image models.":f.includes("invalid api key")||f.includes("incorrect api key")||f.includes("unauthorized")?`The ${$} API key appears invalid for image generation. Check the key in API settings and try again.`:f.includes("rate limit")||f.includes("too many requests")?`${$} rate-limited the image request. Wait a moment and try again.`:`${$} image generation failed: ${n}`:`${$} image generation did not return an image. Try a simpler prompt or try again in a moment.`}async function qt(){if(Ge.value.trim()){nt.value=!0,te.value="Preparing image prompt...";try{if(!z.apiKey&&z.apiProvider!=="gemini"){te.value=`AI image generation requires a ${P.value} API key in API settings. No fallback image was inserted.`;return}let s=Ge.value;try{const f=await dt(z.generateImagePrompt(Ge.value),2200);f&&(s=f.replace(/```(json)?\n?/g,"").trim())}catch{s=Ge.value}s=vt(s)||vt(Ge.value),te.value="Generating image and inserting it on the slide...";const n=await dt(z.generateImageAsset(s),2e4).catch(()=>null);if(!n){te.value=Dt(z.lastError);return}a.addElement(B.projectId,B.currentSlideId,"image",{x:60,y:150,width:420,height:280,content:{src:n,fallbackSrcs:[],alt:Ge.value.trim()||"AI generated image",sourceType:`${z.apiProvider}-image`,objectFit:"cover"}}),te.value=`AI image added to slide using ${P.value} image generation.`}catch(s){te.value=Dt((s==null?void 0:s.message)||z.lastError)}finally{nt.value=!1}}}async function Ft(){var n,f;if(!((f=(n=Ce.value)==null?void 0:n.content)!=null&&f.text))return;const s=await z.improveText(Ce.value.content.text,O.value||"Make it clearer and more engaging");s&&(te.value=s)}async function Rt(){!te.value||!Ce.value||a.updateElement(B.projectId,B.currentSlideId,Ce.value.id,{content:{...Ce.value.content,text:te.value}})}async function Ut(){if(!O.value.trim())return;const s=await z.generate(O.value);s&&(te.value=s)}return(s,n)=>{var f,$,b,Y,he,Ye;return l(),i("div",x1,[e("div",k1,[(l(),i(ee,null,de([{id:"generate",label:"✦ Content"},{id:"quiz",label:"✅ Quiz"},{id:"voiceover",label:"🎙 Voiceover"},{id:"improve",label:"✏️ Improve"},{id:"translate",label:"🌐 Translate"},{id:"image",label:"🎨 Image"},{id:"settings",label:"⚙ API"}],T=>e("button",{key:T.id,class:Q(["ai-mode-btn",m.value===T.id&&"active"]),onClick:d=>m.value=T.id},w(T.label),11,w1)),64))]),e("div",C1,[m.value==="generate"?(l(),i(ee,{key:0},[e("div",S1,[n[36]||(n[36]=e("label",{class:"form-label"},[Z("Topic / Subject "),e("span",{class:"required"},"*")],-1)),ue(e("input",{"onUpdate:modelValue":n[0]||(n[0]=T=>ie.value=T),class:"input",placeholder:"e.g. Automotive Braking System, Photosynthesis…",onKeydown:pl(tt,["enter"])},null,544),[[Se,ie.value]])]),e("div",$1,[e("button",{class:Q(["output-mode-btn",C.value==="single"&&"active"]),onClick:n[1]||(n[1]=T=>C.value="single")},"Single Slide",2),e("button",{class:Q(["output-mode-btn",C.value==="deck"&&"active"]),onClick:n[2]||(n[2]=T=>C.value="deck")},"Slide Deck",2)]),C.value==="single"?(l(),i("div",I1,[n[38]||(n[38]=e("label",{class:"form-label"},"Slide Type",-1)),ue(e("select",{"onUpdate:modelValue":n[3]||(n[3]=T=>R.value=T),class:"select"},[...n[37]||(n[37]=[et('<option value="general" data-v-3ccdb1b2>General</option><option value="intro" data-v-3ccdb1b2>Introduction</option><option value="overview" data-v-3ccdb1b2>Overview</option><option value="concept" data-v-3ccdb1b2>Concept Explanation</option><option value="example" data-v-3ccdb1b2>Example / Case Study</option><option value="summary" data-v-3ccdb1b2>Summary</option><option value="callout" data-v-3ccdb1b2>Key Takeaway</option>',7)])],512),[[Pt,R.value]])])):q("",!0),C.value==="single"?(l(),i("div",E1,[e("div",A1,[n[39]||(n[39]=e("label",{class:"form-label"},"Layout",-1)),e("span",T1,w(_e.value.hint),1)]),e("div",M1,[(l(),i(ee,null,de(r,T=>e("button",{key:T.id,class:Q(["layout-preset-card",j.value===T.id&&"active"]),onClick:d=>j.value=T.id},[e("span",B1,w(T.label),1),e("span",N1,w(T.hint),1)],10,P1)),64))])])):(l(),i("div",z1,[n[40]||(n[40]=e("label",{class:"form-label"},"Number of Slides",-1)),ue(e("input",{"onUpdate:modelValue":n[4]||(n[4]=T=>X.value=T),class:"input",type:"number",min:"1",max:"20"},null,512),[[Se,X.value,void 0,{number:!0}]]),n[41]||(n[41]=e("p",{class:"form-hint"},"Generates this many slides from one full prompt.",-1))])),C.value==="deck"?(l(),i("div",L1,[e("div",j1,[n[42]||(n[42]=e("label",{class:"form-label"},"Deck Layouts",-1)),e("span",_1,w(D.value==="mixed"?"AI can vary layout by slide":`All slides use ${_e.value.label}`),1)]),e("div",D1,[e("button",{class:Q(["output-mode-btn",D.value==="mixed"&&"active"]),onClick:n[5]||(n[5]=T=>D.value="mixed")},"Mixed Layouts",2),e("button",{class:Q(["output-mode-btn",D.value==="single"&&"active"]),onClick:n[6]||(n[6]=T=>D.value="single")},"Consistent Layout",2)])])):q("",!0),C.value==="deck"&&D.value==="single"?(l(),i("div",q1,[e("div",R1,[n[43]||(n[43]=e("label",{class:"form-label"},"Deck Layout",-1)),e("span",O1,w(_e.value.hint),1)]),e("div",F1,[(l(),i(ee,null,de(r,T=>e("button",{key:`deck-${T.id}`,class:Q(["layout-preset-card",j.value===T.id&&"active"]),onClick:d=>j.value=T.id},[e("span",V1,w(T.label),1),e("span",W1,w(T.hint),1)],10,U1)),64))])])):q("",!0),e("div",G1,[n[44]||(n[44]=e("label",{class:"form-label"},[Z("Description "),e("span",{class:"optional"},"(optional)")],-1)),ue(e("textarea",{"onUpdate:modelValue":n[7]||(n[7]=T=>be.value=T),class:"textarea",style:{"min-height":"64px",resize:"vertical"},placeholder:"Add context, audience level, specific subtopics, tone, or any extra detail…"},null,512),[[Se,be.value]])]),e("div",H1,[e("div",Y1,[n[46]||(n[46]=e("label",{class:"form-label"},"AI Prompt",-1)),we.value?(l(),i("button",{key:0,class:"prompt-reset-btn",onClick:fe,title:"Reset to auto-generated prompt"},[...n[45]||(n[45]=[e("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),e("path",{d:"M3 3v5h5"})],-1),Z(" Reset ",-1)])])):(l(),i("span",J1,"auto"))]),ue(e("textarea",{"onUpdate:modelValue":n[8]||(n[8]=T=>ne.value=T),class:"textarea prompt-textarea",placeholder:"Describe exactly what you want the AI to create…",onInput:n[9]||(n[9]=T=>we.value=!0),spellcheck:"false"},null,544),[[Se,ne.value]]),n[47]||(n[47]=e("p",{class:"form-hint"},"Edit freely — the AI will follow your exact instructions.",-1))]),C.value==="single"?(l(),i("div",Q1,[e("button",{class:Q(["output-mode-btn",xe.value==="slide"&&"active"]),onClick:n[10]||(n[10]=T=>xe.value="slide")},"Show on Slide",2),e("button",{class:Q(["output-mode-btn",xe.value==="options"&&"active"]),onClick:n[11]||(n[11]=T=>xe.value="options")},"Creative Options",2)])):q("",!0),C.value==="single"&&st.value?(l(),i("div",X1,[e("div",K1,[n[48]||(n[48]=e("span",{class:"form-label"},"Selected Text Source",-1)),e("span",Z1,w(Pe.value.length)+" selected",1)]),e("div",eg,w(st.value),1),e("div",tg,[e("button",{class:"btn btn-secondary btn-sm",disabled:E(z).isGenerating,onClick:Lt}," Transform Selection to "+w(_e.value.label),9,og)])])):q("",!0),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:E(z).isGenerating||!ie.value.trim()&&!ne.value.trim()||C.value==="deck"&&(!X.value||X.value<1||X.value>20),onClick:tt},[E(z).isGenerating?(l(),i("span",lg)):(l(),i("svg",ig,[...n[49]||(n[49]=[e("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"},null,-1)])])),Z(" "+w(E(z).isGenerating?"Generating…":C.value==="deck"?te.value?`Regenerate ${X.value} Slides`:`Generate ${X.value} Slides`:xe.value==="slide"?te.value?"Regenerate & Apply":"Generate & Apply":"Generate Creative Options"),1)],8,ng),C.value==="single"&&xe.value==="options"&&(ze.value.length||Ie.value)?(l(),i("div",ag,[e("div",sg,[n[50]||(n[50]=e("span",{class:"form-label"},"Creative Options",-1)),e("button",{class:"btn btn-ghost btn-sm",onClick:n[12]||(n[12]=T=>{ze.value=[],Ie.value=""})},"Clear")]),Ie.value?(l(),i("div",rg,[n[51]||(n[51]=e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1)),Z(" "+w(Ie.value),1)])):(l(),i("div",dg,[(l(!0),i(ee,null,de(ze.value,(T,d)=>(l(),i("article",{key:d,class:"creative-option-card"},[e("h4",ug,w(T.title),1),e("p",cg,w(T.angle),1),e("button",{class:"btn btn-secondary btn-sm",onClick:t=>bt(T)},"Use This Option",8,pg)]))),128))]))])):q("",!0)],64)):m.value==="quiz"?(l(),i(ee,{key:1},[e("div",vg,[n[52]||(n[52]=e("label",{class:"form-label"},[Z("Quiz Topic "),e("span",{class:"required"},"*")],-1)),ue(e("input",{"onUpdate:modelValue":n[13]||(n[13]=T=>ae.value=T),class:"input",placeholder:"e.g. World War II Timeline, Photosynthesis, SQL Joins…",onKeydown:pl(yt,["enter"])},null,544),[[Se,ae.value]])]),e("div",fg,[e("div",gg,[n[54]||(n[54]=e("label",{class:"form-label"},"Questions",-1)),ue(e("select",{"onUpdate:modelValue":n[14]||(n[14]=T=>ke.value=T),class:"select"},[...n[53]||(n[53]=[e("option",{value:2},"2",-1),e("option",{value:3},"3",-1),e("option",{value:4},"4",-1),e("option",{value:5},"5",-1),e("option",{value:6},"6",-1),e("option",{value:8},"8",-1),e("option",{value:10},"10",-1)])],512),[[Pt,ke.value,void 0,{number:!0}]])]),e("div",mg,[n[56]||(n[56]=e("label",{class:"form-label"},"Difficulty",-1)),ue(e("select",{"onUpdate:modelValue":n[15]||(n[15]=T=>ge.value=T),class:"select"},[...n[55]||(n[55]=[e("option",{value:"beginner"},"Beginner",-1),e("option",{value:"intermediate"},"Intermediate",-1),e("option",{value:"advanced"},"Advanced",-1)])],512),[[Pt,ge.value]])])]),e("div",bg,[n[57]||(n[57]=e("label",{class:"form-label"},"Question Type",-1)),e("div",yg,[(l(),i(ee,null,de([{id:"multiple-choice",label:"Multiple Choice",icon:"☑"},{id:"true-false",label:"True / False",icon:"✓✗"},{id:"mixed",label:"Mixed",icon:"⊕"}],T=>e("button",{key:T.id,class:Q(["qtype-btn",Me.value===T.id&&"active"]),onClick:d=>Me.value=T.id},[e("span",xg,w(T.icon),1),e("span",null,w(T.label),1)],10,hg)),64))])]),e("div",kg,[n[58]||(n[58]=e("label",{class:"form-label"},[Z("Learning Objective "),e("span",{class:"optional"},"(optional)")],-1)),ue(e("input",{"onUpdate:modelValue":n[16]||(n[16]=T=>se.value=T),class:"input",placeholder:"e.g. Identify key causes of WWI"},null,512),[[Se,se.value]])]),e("div",wg,[e("div",Cg,[n[60]||(n[60]=e("label",{class:"form-label"},"AI Prompt",-1)),ye.value?(l(),i("button",{key:0,class:"prompt-reset-btn",onClick:Le,title:"Reset to auto-generated prompt"},[...n[59]||(n[59]=[e("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),e("path",{d:"M3 3v5h5"})],-1),Z(" Reset ",-1)])])):(l(),i("span",Sg,"auto"))]),ue(e("textarea",{"onUpdate:modelValue":n[17]||(n[17]=T=>S.value=T),class:"textarea prompt-textarea",placeholder:"Describe what quiz questions you want the AI to create…",onInput:n[18]||(n[18]=T=>ye.value=!0),spellcheck:"false"},null,544),[[Se,S.value]]),n[61]||(n[61]=e("p",{class:"form-hint"},"Edit this prompt freely. The AI will follow your exact instructions.",-1))]),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:E(z).isGenerating||!ae.value.trim()&&!S.value.trim(),onClick:n[19]||(n[19]=T=>yt(!1))},[E(z).isGenerating?(l(),i("span",Ig)):(l(),i("svg",Eg,[...n[62]||(n[62]=[e("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"},null,-1)])])),Z(" "+w(E(z).isGenerating?"Generating…":`Generate ${ke.value} Questions`),1)],8,$g),I.value.length?(l(),i("div",Ag,[e("div",Tg,[e("span",Mg,w(I.value.length)+" Questions",1),e("div",Pg,[e("button",{class:"btn btn-ghost btn-sm",onClick:n[20]||(n[20]=T=>Tt(!0))},"All"),e("button",{class:"btn btn-ghost btn-sm",onClick:n[21]||(n[21]=T=>Tt(!1))},"None"),e("button",{class:"btn btn-ghost btn-sm danger",onClick:n[22]||(n[22]=T=>I.value=[])},"Clear")])]),e("div",Bg,[e("button",{class:"btn btn-secondary regen-btn",disabled:E(z).isGenerating,onClick:n[23]||(n[23]=T=>yt(!1)),title:"Replace all questions with a new set"},[E(z).isGenerating?(l(),i("span",zg)):(l(),i("svg",Lg,[...n[63]||(n[63]=[e("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"},null,-1),e("path",{d:"M3 3v5h5"},null,-1)])])),n[64]||(n[64]=Z(" Regenerate ",-1))],8,Ng),e("button",{class:"btn btn-ghost regen-btn",disabled:E(z).isGenerating,onClick:n[24]||(n[24]=T=>yt(!0)),title:"Generate more and append to current list"},[...n[65]||(n[65]=[e("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e("line",{x1:"5",y1:"12",x2:"19",y2:"12"})],-1),Z(" Add More ",-1)])],8,jg)]),(l(!0),i(ee,null,de(I.value,(T,d)=>(l(),i("div",{key:d,class:Q(["quiz-card",{deselected:!T._selected}])},[e("div",_g,[e("label",Dg,[ue(e("input",{type:"checkbox","onUpdate:modelValue":t=>T._selected=t},null,8,qg),[[Nt,T._selected]]),e("span",Rg,"Q"+w(d+1),1)]),e("div",Og,[e("span",{class:Q(["badge difficulty-badge",T.difficulty])},w(T.difficulty),3),e("span",Fg,w(T.type==="true-false"?"T/F":"MCQ"),1)])]),e("p",Ug,w(T.question),1),e("div",Vg,[(l(!0),i(ee,null,de(T.options,(t,_)=>(l(),i("div",{key:_,class:Q(["q-option",_===T.correctIndex&&"correct"])},[e("span",Wg,w(["A","B","C","D"][_]),1),e("span",null,w(t),1),_===T.correctIndex?(l(),i("svg",Gg,[...n[66]||(n[66]=[e("polyline",{points:"20 6 9 17 4 12"},null,-1)])])):q("",!0)],2))),128))]),T.explanation?(l(),i("div",Hg,[n[67]||(n[67]=e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})],-1)),Z(" "+w(T.explanation),1)])):q("",!0)],2))),128)),e("button",{class:"btn btn-primary w-full",disabled:!I.value.filter(T=>T._selected).length,onClick:jt},[n[68]||(n[68]=e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M12 5v14M5 12l7 7 7-7"})],-1)),Z(" Add "+w(I.value.filter(T=>T._selected).length)+" Selected as Quiz Slides ",1)],8,Yg)])):q("",!0)],64)):m.value==="voiceover"?(l(),i(ee,{key:2},[e("div",Jg,[n[69]||(n[69]=e("label",{class:"form-label"},"Slide Content / Key Points",-1)),ue(e("textarea",{"onUpdate:modelValue":n[25]||(n[25]=T=>pe.value=T),class:"textarea",style:{"min-height":"100px"},placeholder:"Paste the slide content or talking points here…"},null,512),[[Se,pe.value]])]),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:E(z).isGenerating,onClick:_t},[E(z).isGenerating?(l(),i("span",Xg)):q("",!0),Z(" "+w(E(z).isGenerating?"Generating…":"Generate Script"),1)],8,Qg)],64)):m.value==="improve"?(l(),i(ee,{key:3},[($=(f=Ce.value)==null?void 0:f.content)!=null&&$.text?(l(),i("div",Kg,[n[70]||(n[70]=e("div",{class:"form-label",style:{"margin-bottom":"var(--space-1)"}},"Selected Text",-1)),e("div",Zg,w(Ce.value.content.text.slice(0,120))+w(Ce.value.content.text.length>120?"…":""),1)])):(l(),i("p",em,"Select a text element on the canvas to improve it.")),e("div",tm,[n[71]||(n[71]=e("label",{class:"form-label"},"Instruction",-1)),ue(e("input",{"onUpdate:modelValue":n[26]||(n[26]=T=>O.value=T),class:"input",placeholder:"Make it more concise and engaging"},null,512),[[Se,O.value]])]),n[72]||(n[72]=e("div",{class:"tab-section-title",style:{"margin-bottom":"var(--space-3)"}},"Or send a custom prompt:",-1)),ue(e("textarea",{"onUpdate:modelValue":n[27]||(n[27]=T=>O.value=T),class:"textarea",style:{"min-height":"70px"},placeholder:"Write anything…"},null,512),[[Se,O.value]]),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:E(z).isGenerating||!Ce.value&&!O.value,onClick:n[28]||(n[28]=T=>Ce.value?Ft():Ut())},[E(z).isGenerating?(l(),i("span",nm)):q("",!0),Z(" "+w(E(z).isGenerating?"Processing…":"Generate"),1)],8,om)],64)):m.value==="translate"?(l(),i(ee,{key:4},[(Y=(b=Ce.value)==null?void 0:b.content)!=null&&Y.text?(l(),i("div",lm,[n[73]||(n[73]=e("div",{class:"form-label",style:{"margin-bottom":"var(--space-1)"}},"Selected Text",-1)),e("div",im,w(Ce.value.content.text.slice(0,120))+w(Ce.value.content.text.length>120?"…":""),1)])):(l(),i("p",am,"Select a text element on the canvas to translate it.")),e("div",sm,[n[75]||(n[75]=e("label",{class:"form-label"},"Target Language",-1)),ue(e("select",{"onUpdate:modelValue":n[29]||(n[29]=T=>F.value=T),class:"select"},[...n[74]||(n[74]=[et('<option value="Spanish" data-v-3ccdb1b2>Spanish</option><option value="French" data-v-3ccdb1b2>French</option><option value="German" data-v-3ccdb1b2>German</option><option value="Italian" data-v-3ccdb1b2>Italian</option><option value="Portuguese" data-v-3ccdb1b2>Portuguese</option><option value="Chinese (Simplified)" data-v-3ccdb1b2>Chinese (Simplified)</option><option value="Japanese" data-v-3ccdb1b2>Japanese</option><option value="Arabic" data-v-3ccdb1b2>Arabic</option>',8)])],512),[[Pt,F.value]])]),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:E(z).isGenerating||!((Ye=(he=Ce.value)==null?void 0:he.content)!=null&&Ye.text),onClick:Ot},[E(z).isGenerating?(l(),i("span",dm)):q("",!0),Z(" "+w(E(z).isGenerating?"Translating…":"Translate Text"),1)],8,rm),te.value?(l(),i("div",um,[e("div",cm,[n[76]||(n[76]=e("span",{class:"form-label"},"Translation Result",-1)),e("div",pm,[e("button",{class:"btn btn-ghost btn-sm",onClick:n[30]||(n[30]=T=>s.navigator.clipboard.writeText(te.value))},"Copy"),e("button",{class:"btn btn-primary btn-sm",onClick:xt,disabled:!Ce.value},"Apply",8,vm)])]),e("div",fm,w(te.value),1)])):q("",!0)],64)):m.value==="image"?(l(),i(ee,{key:5},[n[81]||(n[81]=e("p",{class:"ai-hint",style:{"margin-bottom":"var(--space-3)"}},"Generate distinct educational visual assets instantly. The image will be added directly to your slide.",-1)),E(z).apiProvider==="gemini"?(l(),i("div",gm,[...n[77]||(n[77]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1),Z(" Gemini text features work on the free tier, but Gemini image generation on the Developer API usually needs billing enabled for the project. ",-1)])])):q("",!0),E(z).apiKey?q("",!0):(l(),i("div",mm,[n[78]||(n[78]=e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1)),Z(" AI image generation needs a "+w(P.value)+" API key in API settings. ",1)])),e("div",bm,[n[79]||(n[79]=e("label",{class:"form-label"},"Image Description",-1)),ue(e("textarea",{"onUpdate:modelValue":n[31]||(n[31]=T=>Ge.value=T),class:"textarea",style:{"min-height":"100px"},placeholder:"Describe the image (e.g. 'A futuristic city skyline at sunset in a vibrant retro style')"},null,512),[[Se,Ge.value]])]),e("button",{class:"btn btn-primary w-full ai-generate-btn",disabled:nt.value||E(z).isGenerating||!Ge.value||!E(z).apiKey,onClick:qt},[nt.value||E(z).isGenerating?(l(),i("span",hm)):q("",!0),Z(" "+w(nt.value||E(z).isGenerating?"Generating Image…":"Generate & Insert"),1)],8,ym),te.value?(l(),i("div",xm,[n[80]||(n[80]=e("div",{class:"result-header"},[e("span",{class:"form-label"},"Status")],-1)),e("div",km,w(te.value),1)])):q("",!0)],64)):m.value==="settings"?(l(),i("div",wm,[e("div",Cm,[n[83]||(n[83]=e("label",{class:"form-label"},"AI Provider",-1)),e("select",{value:E(z).apiProvider,class:"select",onChange:n[32]||(n[32]=T=>E(z).setProvider(T.target.value))},[...n[82]||(n[82]=[e("option",{value:"openai"},"OpenAI (GPT-4o mini)",-1),e("option",{value:"gemini"},"Google Gemini (Free tier for text)",-1)])],40,Sm)]),e("div",$m,[n[84]||(n[84]=e("label",{class:"form-label"},"API Key",-1)),e("input",{type:"password",value:E(z).apiKey,class:"input",placeholder:N.value,onChange:n[33]||(n[33]=T=>E(z).setApiKey(T.target.value))},null,40,Im),e("p",Em,w(H.value),1)]),E(z).apiProvider==="gemini"?(l(),i("div",Am,[...n[85]||(n[85]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1),Z(" Gemini is enabled for content, quiz, voiceover, improve, and translate in this app. Gemini image generation may still require billing on the Google project. ",-1)])])):q("",!0),E(z).apiKey?q("",!0):(l(),i("div",Tm,[n[86]||(n[86]=e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1)),n[87]||(n[87]=Z(" Running in ",-1)),n[88]||(n[88]=e("strong",null,"demo mode",-1)),Z(" — sample responses only. Add your "+w(P.value)+" API key to use real AI generation. ",1)]))])):q("",!0),te.value&&m.value!=="settings"&&m.value!=="quiz"?(l(),i("div",Mm,[e("div",Pm,[n[89]||(n[89]=e("span",{class:"form-label"},"Result",-1)),e("button",{class:"btn btn-ghost btn-sm",onClick:n[34]||(n[34]=T=>te.value="")},"Clear")]),e("pre",Bm,w(te.value),1),e("div",Nm,[m.value==="generate"?(l(),i("button",{key:0,class:"btn btn-primary btn-sm",onClick:mt},w(C.value==="deck"?"Apply as Deck":"Apply to Slide"),1)):q("",!0),m.value==="generate"?(l(),i("button",{key:1,class:"btn btn-ghost btn-sm",disabled:E(z).isGenerating,onClick:tt},[...n[90]||(n[90]=[e("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),e("path",{d:"M3 3v5h5"})],-1),Z(" Regenerate ",-1)])],8,zm)):q("",!0),m.value==="improve"&&Ce.value?(l(),i("button",{key:2,class:"btn btn-primary btn-sm",onClick:Rt}," Apply to Element ")):q("",!0),e("button",{class:"btn btn-secondary btn-sm",onClick:n[35]||(n[35]=T=>{var d;return(d=s.navigator.clipboard)==null?void 0:d.writeText(te.value)})}," Copy ")])])):q("",!0),E(z).lastError?(l(),i("div",Lm,[n[91]||(n[91]=e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})],-1)),Z(" "+w(E(z).lastError),1)])):q("",!0)])])}}},_m=Xe(jm,[["__scopeId","data-v-3ccdb1b2"]]),Dm={class:"theme-manager"},qm={class:"panel-section"},Rm={class:"presets-grid"},Om=["title","onClick"],Fm={class:"preset-preview"},Um={class:"preset-name"},Vm={class:"panel-section"},Wm={class:"theme-fields"},Gm={class:"form-label"},Hm={class:"color-row"},Ym=["value","onInput"],Jm=["value","onChange"],Qm={class:"panel-section"},Xm={class:"theme-field"},Km=["value","placeholder"],Zm={class:"chart-palette-preview"},eb={class:"panel-section"},tb={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},ob=["value"],nb=["value"],lb={class:"form-group",style:{"margin-bottom":"var(--space-3)"}},ib=["value"],ab=["value"],sb={class:"form-group"},rb=["value"],db={class:"panel-section"},ub={class:"tp-chart-row"},cb={key:0,class:"apply-message success"},pb={key:1,class:"apply-message error"},vb={__name:"ThemeManager",setup(A){const r=it(),u=at(),p=M(()=>u.getProject(r.projectId)),v=M(()=>{var a;return((a=p.value)==null?void 0:a.theme)||{}}),h=M(()=>vl(v.value)),k=L(""),g=L("");function G(a){u.updateProject(r.projectId,{theme:{...v.value,...a}})}const le=[{name:"Corporate Blue",primaryColor:"#1e40af",secondaryColor:"#0ea5e9",bgColor:"#f8fafc",textColor:"#0f172a",fontFamily:"Inter, sans-serif"},{name:"Vibrant Purple",primaryColor:"#6c47ff",secondaryColor:"#00c9a7",bgColor:"#ffffff",textColor:"#1a1a2e",fontFamily:"Inter, sans-serif"},{name:"Nature Green",primaryColor:"#16a34a",secondaryColor:"#84cc16",bgColor:"#f0fdf4",textColor:"#14532d",fontFamily:"Georgia, serif"},{name:"Dark Modern",primaryColor:"#818cf8",secondaryColor:"#f472b6",bgColor:"#0f172a",textColor:"#e2e8f0",fontFamily:"Inter, sans-serif"},{name:"Warm Sunset",primaryColor:"#dc2626",secondaryColor:"#f59e0b",bgColor:"#fffbeb",textColor:"#451a03",fontFamily:"Verdana, sans-serif"},{name:"Ocean Breeze",primaryColor:"#0891b2",secondaryColor:"#6366f1",bgColor:"#ecfeff",textColor:"#164e63",fontFamily:"Trebuchet MS, sans-serif"}],W=[{label:"Inter",value:"Inter, sans-serif"},{label:"Arial",value:"Arial, sans-serif"},{label:"Georgia",value:"Georgia, serif"},{label:"Verdana",value:"Verdana, sans-serif"},{label:"Times New Roman",value:'"Times New Roman", serif'},{label:"Courier New",value:'"Courier New", monospace'},{label:"Trebuchet MS",value:'"Trebuchet MS", sans-serif'},{label:"Tahoma",value:"Tahoma, sans-serif"}];function U(a){G(a)}function me(a,P){const N=a.content||{};return a.type==="text"?{content:{...N,fontFamily:P.fontFamily||N.fontFamily,color:P.textColor||N.color}}:a.type==="heading"?{content:{...N,fontFamily:P.headingFont||P.fontFamily||N.fontFamily,color:P.textColor||N.color}}:a.type==="shape"?{content:{...N,fillColor:P.secondaryColor||N.fillColor}}:a.type==="hotspot"?{content:{...N,bgColor:P.primaryColor||N.bgColor}}:a.type==="button"?{content:{...N,bgColor:P.primaryColor||N.bgColor,textColor:"#ffffff",borderColor:"transparent",fontFamily:P.fontFamily||N.fontFamily}}:a.type==="quiz"?{content:{...N,cardBgColor:P.bgColor||N.cardBgColor,questionColor:P.textColor||N.questionColor,accentColor:P.primaryColor||N.accentColor}}:a.type==="chart"?{content:{...N,...kl(P)}}:null}function z(){G({chartPalette:""})}function B(){k.value="",g.value="";const a=r.projectId,P=p.value,N=v.value;if(!a||!P){g.value="No active project to apply theme.";return}const H=P.slides||[];let m=0;H.forEach(O=>{(O.backgroundType||"color")==="color"&&u.updateSlide(a,O.id,{backgroundType:"color",background:N.bgColor||O.background||"#ffffff"}),(O.elements||[]).forEach(ie=>{const te=me(ie,N);te&&(u.updateElement(a,O.id,ie.id,te),m+=1)})}),k.value=`Applied theme to ${H.length} slide${H.length===1?"":"s"} and ${m} element${m===1?"":"s"}.`}return(a,P)=>(l(),i("div",Dm,[e("div",qm,[P[4]||(P[4]=e("div",{class:"panel-title"},"Preset Themes",-1)),e("div",Rm,[(l(),i(ee,null,de(le,N=>e("div",{key:N.name,class:"preset-card",title:N.name,onClick:H=>U(N)},[e("div",Fm,[e("div",{class:"pp-header",style:ce({background:N.primaryColor})},null,4),e("div",{class:"pp-body",style:ce({background:N.bgColor})},[e("div",{class:"pp-line",style:ce({background:N.textColor,opacity:.7})},null,4),e("div",{class:"pp-line",style:ce({background:N.textColor,opacity:.4,width:"60%"})},null,4)],4),e("div",{class:"pp-accent",style:ce({background:N.secondaryColor})},null,4)]),e("span",Um,w(N.name),1)],8,Om)),64))])]),e("div",Vm,[P[5]||(P[5]=e("div",{class:"panel-title"},"Colors",-1)),e("div",Wm,[(l(),i(ee,null,de({primaryColor:"Primary Color",secondaryColor:"Secondary Color",bgColor:"Background",textColor:"Text Color"},(N,H)=>e("div",{class:"theme-field",key:H},[e("label",Gm,w(N),1),e("div",Hm,[e("input",{type:"color",value:v.value[H]||"#ffffff",class:"color-input-native",onInput:m=>G({[H]:m.target.value})},null,40,Ym),e("input",{value:v.value[H]||"",class:"input",onChange:m=>G({[H]:m.target.value}),style:{"font-family":"var(--font-mono)","font-size":"var(--text-xs)"}},null,40,Jm)])])),64))])]),e("div",Qm,[P[8]||(P[8]=e("div",{class:"panel-title"},"Chart Palette",-1)),e("div",Xm,[P[6]||(P[6]=e("label",{class:"form-label"},"Chart Colors",-1)),e("input",{value:v.value.chartPalette||"",class:"input",placeholder:E(Ul)(E(vl)(v.value)),onChange:P[0]||(P[0]=N=>G({chartPalette:N.target.value}))},null,40,Km),e("div",Zm,[(l(!0),i(ee,null,de(h.value,(N,H)=>(l(),i("span",{key:`theme-chart-${H}`,class:"chart-palette-dot",style:ce({background:N})},null,4))),128))]),e("div",{class:"chart-palette-actions"},[e("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:z},"Use auto palette")]),P[7]||(P[7]=e("div",{class:"field-hint"},"Leave blank to derive chart colors from the theme primary, secondary, background, and text colors.",-1))])]),e("div",eb,[P[12]||(P[12]=e("div",{class:"panel-title"},"Typography",-1)),e("div",tb,[P[9]||(P[9]=e("label",{class:"form-label"},"Heading Font",-1)),e("select",{value:v.value.headingFont||"Inter, sans-serif",class:"select",onChange:P[1]||(P[1]=N=>G({headingFont:N.target.value}))},[(l(),i(ee,null,de(W,N=>e("option",{key:N.value,value:N.value,style:ce({fontFamily:N.value})},w(N.label),13,nb)),64))],40,ob)]),e("div",lb,[P[10]||(P[10]=e("label",{class:"form-label"},"Body Font",-1)),e("select",{value:v.value.fontFamily||"Inter, sans-serif",class:"select",onChange:P[2]||(P[2]=N=>G({fontFamily:N.target.value}))},[(l(),i(ee,null,de(W,N=>e("option",{key:N.value,value:N.value,style:ce({fontFamily:N.value})},w(N.label),13,ab)),64))],40,ib)]),e("div",sb,[P[11]||(P[11]=e("label",{class:"form-label"},"Base Font Size",-1)),e("input",{type:"number",min:"12",max:"24",value:v.value.fontSize||16,class:"input",onChange:P[3]||(P[3]=N=>G({fontSize:+N.target.value}))},null,40,rb)])]),e("div",db,[P[13]||(P[13]=e("div",{class:"panel-title"},"Preview",-1)),e("div",{class:"theme-preview",style:ce({background:v.value.bgColor||"#fff",fontFamily:v.value.fontFamily||"Inter, sans-serif"})},[e("div",{class:"tp-heading",style:ce({color:v.value.textColor,fontFamily:v.value.headingFont||v.value.fontFamily})}," Heading Text ",4),e("div",{class:"tp-body",style:ce({color:v.value.textColor,opacity:.7})}," Body text looks like this. Clear, readable, and well-spaced for learners. ",4),e("div",{class:"tp-btn",style:ce({background:v.value.primaryColor})},"Button",4),e("div",{class:"tp-badge",style:ce({background:v.value.secondaryColor})},"Badge",4),e("div",ub,[(l(!0),i(ee,null,de(h.value.slice(0,5),(N,H)=>(l(),i("span",{key:`preview-chart-${H}`,class:"tp-chart-bar",style:ce({background:N,height:`${22+H*8}px`})},null,4))),128))])],4),e("button",{class:"btn btn-primary w-full apply-theme-btn",onClick:B}," Apply Theme to Slides "),k.value?(l(),i("p",cb,w(k.value),1)):q("",!0),g.value?(l(),i("p",pb,w(g.value),1)):q("",!0)])]))}},fb=Xe(vb,[["__scopeId","data-v-a16a8954"]]),gb={key:0,class:"auth-gate",style:{"text-align":"center",padding:"40px 20px"}},mb={width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{opacity:"0.5","margin-bottom":"16px","margin-inline":"auto"}},bb={style:{display:"flex","flex-direction":"column",gap:"12px","max-width":"300px",margin:"0 auto"}},yb={class:"export-tabs tabs",style:{"overflow-x":"auto"}},hb={class:"export-content"},xb={class:"export-options",style:{"margin-bottom":"20px"}},kb={class:"form-group"},wb={class:"export-meta"},Cb={class:"meta-item"},Sb={class:"meta-item"},$b={class:"meta-item"},Ib={class:"export-options",style:{"margin-bottom":"20px"}},Eb={class:"form-group"},Ab={style:{display:"flex","align-items":"center",gap:"8px","margin-top":"12px","font-size":"13px",cursor:"pointer"}},Tb={class:"export-options",style:{"margin-bottom":"20px"}},Mb={class:"form-group"},Pb={style:{display:"flex","align-items":"center",gap:"8px","margin-top":"12px","font-size":"13px",cursor:"pointer"}},Bb={class:"coming-soon"},Nb={width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{opacity:".4"}},zb={key:0,class:"export-success",style:{background:"#e0f2fe",color:"#166534","border-color":"#bbf7d0"}},Lb={key:1,class:"export-success"},jb={__name:"ExportModal",setup(A){const r=it(),u=at(),p=wl(),v=M(()=>u.getProject(r.projectId)),h=L("json"),k=L(""),g=L(""),G=L(!0);Qe(v,H=>{H&&!g.value&&(g.value=H.name||"presentation")},{immediate:!0});function le(){const H=u.exportProject(r.projectId);if(!H)return;const m=new Blob([H],{type:"application/json"}),O=URL.createObjectURL(m),ie=document.createElement("a");ie.href=O,ie.download=`${g.value||"project"}.mediasurf.json`,ie.click(),URL.revokeObjectURL(O),k.value="success",setTimeout(()=>k.value="",3e3)}function W(H,m="presentation"){return String(H).trim().replace(/[\\/:*?"<>|]/g,"").replace(/\s+/g," ").trim()||m}function U(H){return new Promise((m,O)=>{const ie=new FileReader;ie.onloadend=()=>m(ie.result),ie.onerror=()=>O(ie.error),ie.readAsDataURL(H)})}function me(H,m,O="html"){const ie=zt(m);return`
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; }
:root {
  --lf-slide-width: ${ie.width}px;
  --lf-slide-height: ${ie.height}px;
}
body {
  min-height: 100vh;
  font-family: ${(H==null?void 0:H.fontFamily)||"Inter, sans-serif"};
  background: ${O==="pdf"?"#f3f4f6":`
    radial-gradient(circle at 18% 18%, rgba(108, 71, 255, 0.24), transparent 22%),
    radial-gradient(circle at 82% 72%, rgba(0, 201, 167, 0.18), transparent 28%),
    linear-gradient(180deg, #08101f 0%, #050916 62%, #02050b 100%)`};
  color: ${O==="pdf"?"#111827":"#ffffff"};
  display: ${O==="pdf"?"block":"flex"};
  align-items: ${O==="pdf"?"stretch":"center"};
  justify-content: ${O==="pdf"?"flex-start":"center"};
  overflow: ${O==="pdf"?"auto":"hidden"};
  padding: ${O==="pdf"?"24px 0":"0"};
}
.lf-shell {
  width: ${O==="pdf"?"100%":"100vw"};
  min-height: ${O==="pdf"?"auto":"100vh"};
  height: ${O==="pdf"?"auto":"100vh"};
  position: relative;
  display: flex;
  align-items: ${O==="pdf"?"stretch":"center"};
  justify-content: center;
  overflow: ${O==="pdf"?"visible":"hidden"};
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
  width: ${O==="pdf"?"100%":"auto"};
  max-width: ${O==="pdf"?"none":"auto"};
  padding: ${O==="pdf"?"0":"18px"};
  border-radius: ${O==="pdf"?"0":"32px"};
  background: ${O==="pdf"?"transparent":"linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))"};
  border: ${O==="pdf"?"none":"1px solid rgba(255,255,255,0.12)"};
  box-shadow: ${O==="pdf"?"none":"0 30px 80px rgba(0,0,0,.34)"};
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
  width: ${O==="pdf"?"100%":"var(--lf-slide-width)"};
  height: ${O==="pdf"?"auto":"var(--lf-slide-height)"};
  border-radius: ${O==="pdf"?"0":"18px"};
  overflow: ${O==="pdf"?"visible":"hidden"};
  box-shadow: ${O==="pdf"?"none":"0 30px 90px rgba(0,0,0,.5)"};
  transform-origin: center center;
  display: ${O==="pdf"?"flex":"block"};
  flex-direction: ${O==="pdf"?"column":"row"};
  align-items: ${O==="pdf"?"center":"stretch"};
  gap: ${O==="pdf"?"24px":"0"};
}
.slide {
  position: ${O==="pdf"?"relative":"absolute"};
  inset: ${O==="pdf"?"auto":"0"};
  display: ${O==="pdf"?"block":"none"};
  overflow: hidden;
  color: ${(H==null?void 0:H.textColor)||"#1a1a2e"};
  width: var(--lf-slide-width);
  height: var(--lf-slide-height);
  flex: 0 0 auto;
  background-clip: padding-box;
  box-shadow: ${O==="pdf"?"0 12px 32px rgba(15, 23, 42, 0.16)":"none"};
  page-break-after: ${O==="pdf"?"always":"auto"};
  break-after: ${O==="pdf"?"page":"auto"};
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
  background: ${(H==null?void 0:H.primaryColor)||"#6c47ff"};
  transition: width .22s ease;
  display: ${(m==null?void 0:m.showProgress)===!1?"none":"block"};
  z-index: 6;
}
${O==="iframe"?`
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
${O==="pdf"?`
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
`}function z(H="html"){return`
(function () {
  var exportMode = ${JSON.stringify(H)};
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
`}async function B(){return N("html")}async function a(){return N("iframe")}async function P(){return N("pdf")}async function N(H="html"){var _e,oe,fe;const m=v.value;if(!m)return;k.value="processing";const O=H==="pdf"&&typeof window<"u"?window.open("","_blank"):null;if(H==="pdf"&&!O){k.value="error",setTimeout(()=>k.value="",3e3);return}const ie=H==="pdf"?null:new ni,te=ie?ie.folder("assets"):null;let ke=0;async function R(ae,ge="media"){if((!ae||ae.startsWith("data:")||ae.startsWith("http://localhost")||ae.startsWith("blob:"))&&ae.startsWith("data:"))return ae;try{const se=await(await fetch(ae)).blob();if(H==="pdf")return await U(se);let I="bin";const S=se.type;if(S.includes("image/png")?I="png":S.includes("image/jpeg")?I="jpg":S.includes("image/gif")?I="gif":S.includes("image/svg")?I="svg":S.includes("image/webp")?I="webp":S.includes("video/mp4")?I="mp4":S.includes("audio/mpeg")&&(I="mp3"),I==="bin"){const c=ae.match(/\\.([a-zA-Z0-9]+)(\\?.*)?$/);c&&(I=c[1])}ke++;const ye=`${ge}_${ke}.${I}`;return te.file(ye,se),`assets/${ye}`}catch(Me){return console.warn("Could not fetch asset:",ae,Me),ae}}const F=JSON.parse(JSON.stringify([...m.slides||[]])).sort((ae,ge)=>(ae.order??0)-(ge.order??0));if(G.value)for(const ae of F){ae.backgroundType==="image"&&ae.backgroundImage&&(ae.backgroundImage=await R(ae.backgroundImage,"bg"));for(const ge of ae.elements||[])ge.type==="image"&&((_e=ge.content)!=null&&_e.src)&&(ge.content.src=await R(ge.content.src,"img")),ge.type==="video"&&((oe=ge.content)!=null&&oe.src)&&!ge.content.src.includes("youtube")&&!ge.content.src.includes("youtu.be")&&(ge.content.src=await R(ge.content.src,"vid")),ge.type==="audio"&&((fe=ge.content)!=null&&fe.src)&&(ge.content.src=await R(ge.content.src,"aud"))}const pe=W(g.value||m.name||"presentation"),be={name:m.name,theme:m.theme||{},settings:m.settings||{},slides:F},ne=JSON.stringify(be).replace(/</g,"\\u003c").replace(/>/g,"\\u003e").replace(/&/g,"\\u0026"),we=me(m.theme,m.settings,H),C=z(H),j=`<script id="lf-data" type="application/json">${ne}<\/script>`,X=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${pe}</title>
${H==="pdf"?`<style>${we}</style>`:'<link rel="stylesheet" href="style.css">'}
</head>
<body class="${H==="iframe"?"is-iframe":H==="pdf"?"is-pdf":""}">
<div class="lf-shell">
<div class="progress" id="progress"></div>
<div class="lf-grid"></div>
<div class="lf-stage-shell">
  <div class="presentation" id="presentation"></div>
</div>
<div class="dot-nav" id="dot-nav"></div>
<nav class="nav">
  <button class="nav-btn" id="prev-btn" type="button">← Prev</button>
  <span class="nav-counter" id="counter">1 / ${F.length}</span>
  <button class="nav-btn" id="next-btn" type="button">Next →</button>
</nav>
</div>
${j}
${H!=="pdf"?'<script src="script.js"><\/script>':`<script>${C}<\/script>`}
</body>
</html>`;if(H==="pdf"){O.document.open(),O.document.write(X),O.document.close(),k.value="success",setTimeout(()=>k.value="",3e3);return}ie.file("index.html",X),ie.file("style.css",we),ie.file("script.js",C);const xe=await ie.generateAsync({type:"blob"}),ze=URL.createObjectURL(xe),Ie=document.createElement("a");Ie.href=ze,Ie.download=`${pe}.zip`,Ie.click(),URL.revokeObjectURL(ze),k.value="success",setTimeout(()=>k.value="",3e3)}return(H,m)=>(l(),Je(yl,{title:"Export Project",size:"md",onClose:m[13]||(m[13]=O=>E(r).showExportModal=!1)},{footer:ut(()=>[e("button",{class:"btn btn-secondary",onClick:m[12]||(m[12]=O=>E(r).showExportModal=!1)},"Close")]),default:ut(()=>{var O,ie,te,ke,R;return[E(p).user?(l(),i(ee,{key:1},[e("div",yb,[e("button",{class:Q(["tab-btn",h.value==="json"&&"active"]),onClick:m[2]||(m[2]=F=>h.value="json")},"JSON",2),e("button",{class:Q(["tab-btn",h.value==="html"&&"active"]),onClick:m[3]||(m[3]=F=>h.value="html")},"HTML",2),e("button",{class:Q(["tab-btn",h.value==="iframe"&&"active"]),onClick:m[4]||(m[4]=F=>h.value="iframe")},"Iframe",2),e("button",{class:Q(["tab-btn",h.value==="pdf"&&"active"]),onClick:m[5]||(m[5]=F=>h.value="pdf")},"PDF",2),e("button",{class:Q(["tab-btn",h.value==="scorm"&&"active"]),onClick:m[6]||(m[6]=F=>h.value="scorm")},"SCORM",2)]),e("div",hb,[h.value==="json"?(l(),i(ee,{key:0},[m[24]||(m[24]=e("div",{class:"export-info"},[e("div",{class:"export-icon"},"📦"),e("div",null,[e("h4",null,"JSON Project File"),e("p",null,"Export your complete project as a JSON file. Use this to back up your work, share it with collaborators, or import it into another MediaSurf instance.")])],-1)),e("div",xb,[e("div",kb,[m[19]||(m[19]=e("label",{style:{display:"block","margin-bottom":"4px","font-size":"13px","font-weight":"600",color:"#333"}},"File Name",-1)),ue(e("input",{type:"text","onUpdate:modelValue":m[7]||(m[7]=F=>g.value=F),class:"inp",placeholder:"My Presentation",style:{width:"100%",padding:"8px","border-radius":"6px",border:"1px solid #ddd"}},null,512),[[Se,g.value]])])]),e("div",wb,[e("div",Cb,[m[20]||(m[20]=e("span",null,"Project",-1)),e("strong",null,w((O=v.value)==null?void 0:O.name),1)]),e("div",Sb,[m[21]||(m[21]=e("span",null,"Slides",-1)),e("strong",null,w(((te=(ie=v.value)==null?void 0:ie.slides)==null?void 0:te.length)||0),1)]),e("div",$b,[m[22]||(m[22]=e("span",null,"Elements",-1)),e("strong",null,w(((R=(ke=v.value)==null?void 0:ke.slides)==null?void 0:R.reduce((F,pe)=>{var be;return F+(((be=pe.elements)==null?void 0:be.length)||0)},0))||0),1)])]),e("button",{class:"btn btn-primary export-btn",onClick:le},[...m[23]||(m[23]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e("polyline",{points:"7 10 12 15 17 10"}),e("line",{x1:"12",y1:"15",x2:"12",y2:"3"})],-1),Z(" Download JSON ",-1)])])],64)):h.value==="html"?(l(),i(ee,{key:1},[m[28]||(m[28]=e("div",{class:"export-info"},[e("div",{class:"export-icon"},"🌐"),e("div",null,[e("h4",null,"Standalone HTML Package"),e("p",null,"Export as a self-contained HTML file that works in any browser. Includes all slides, interactions, and quiz functionality. No internet connection required.")])],-1)),e("div",Ib,[e("div",Eb,[m[25]||(m[25]=e("label",{style:{display:"block","margin-bottom":"4px","font-size":"13px","font-weight":"600",color:"#333"}},"Package Name",-1)),ue(e("input",{type:"text","onUpdate:modelValue":m[8]||(m[8]=F=>g.value=F),class:"inp",placeholder:"My Presentation",style:{width:"100%",padding:"8px","border-radius":"6px",border:"1px solid #ddd"}},null,512),[[Se,g.value]])]),e("label",Ab,[ue(e("input",{type:"checkbox","onUpdate:modelValue":m[9]||(m[9]=F=>G.value=F)},null,512),[[Nt,G.value]]),m[26]||(m[26]=Z(" Download external assets (Images/Audio/Video) locally for offline use ",-1))])]),m[29]||(m[29]=e("div",{class:"export-features"},[e("div",{class:"feature-item"},"✓ Keyboard navigation (arrow keys)"),e("div",{class:"feature-item"},"✓ Click-to-reveal hotspots"),e("div",{class:"feature-item"},"✓ Interactive quizzes with feedback"),e("div",{class:"feature-item"},"✓ Progress bar"),e("div",{class:"feature-item"},"✓ Responsive scaling"),e("div",{class:"feature-item"},"✓ YouTube/Vimeo video embeds")],-1)),e("button",{class:"btn btn-primary export-btn",onClick:B},[...m[27]||(m[27]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e("polyline",{points:"7 10 12 15 17 10"}),e("line",{x1:"12",y1:"15",x2:"12",y2:"3"})],-1),Z(" Download HTML ",-1)])])],64)):h.value==="iframe"?(l(),i(ee,{key:2},[m[33]||(m[33]=e("div",{class:"export-info"},[e("div",{class:"export-icon"},"???"),e("div",null,[e("h4",null,"Iframe Package"),e("p",null,"Export a lightweight package optimized for embedding in other sites via an iframe. Strips out outer backgrounds and fits precisely.")])],-1)),e("div",Tb,[e("div",Mb,[m[30]||(m[30]=e("label",{style:{display:"block","margin-bottom":"4px","font-size":"13px","font-weight":"600",color:"#333"}},"Package Name",-1)),ue(e("input",{type:"text","onUpdate:modelValue":m[10]||(m[10]=F=>g.value=F),class:"inp",placeholder:"My Presentation",style:{width:"100%",padding:"8px","border-radius":"6px",border:"1px solid #ddd"}},null,512),[[Se,g.value]])]),e("label",Pb,[ue(e("input",{type:"checkbox","onUpdate:modelValue":m[11]||(m[11]=F=>G.value=F)},null,512),[[Nt,G.value]]),m[31]||(m[31]=Z(" Download external assets locally ",-1))])]),e("button",{class:"btn btn-primary export-btn",onClick:a},[...m[32]||(m[32]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e("polyline",{points:"7 10 12 15 17 10"}),e("line",{x1:"12",y1:"15",x2:"12",y2:"3"})],-1),Z(" Download Iframe Zip ",-1)])])],64)):h.value==="pdf"?(l(),i(ee,{key:3},[m[35]||(m[35]=e("div",{class:"export-info"},[e("div",{class:"export-icon"},"??"),e("div",null,[e("h4",null,"PDF Document"),e("p",null,"Generate a printable, static PDF version of all slides. Converts perfectly to a standard presentation handout.")])],-1)),m[36]||(m[36]=e("p",{style:{"margin-bottom":"20px","font-size":"13px",color:"#666"}},`This will open the presentation in a new printable window. Just use your browser's Print dialog and select "Save as PDF".`,-1)),e("button",{class:"btn btn-primary export-btn",onClick:P},[...m[34]||(m[34]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e("polyline",{points:"7 10 12 15 17 10"}),e("line",{x1:"12",y1:"15",x2:"12",y2:"3"})],-1),Z(" Generate PDF ",-1)])])],64)):h.value==="scorm"?(l(),i(ee,{key:4},[m[40]||(m[40]=e("div",{class:"export-info"},[e("div",{class:"export-icon"},"🎓"),e("div",null,[e("h4",null,"SCORM Package"),e("p",null,"Export as a SCORM 1.2 / xAPI compatible package for LMS platforms like Moodle, Blackboard, and Canvas.")])],-1)),e("div",Bb,[(l(),i("svg",Nb,[...m[37]||(m[37]=[e("circle",{cx:"12",cy:"12",r:"10"},null,-1),e("line",{x1:"12",y1:"8",x2:"12",y2:"12"},null,-1),e("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"},null,-1)])])),m[38]||(m[38]=e("h4",null,"Coming Soon",-1)),m[39]||(m[39]=e("p",null,"SCORM export is planned for a future release. Use the HTML export for now and embed it via iframe in your LMS.",-1))])],64)):q("",!0),ft(Bt,{name:"fade"},{default:ut(()=>[k.value==="processing"?(l(),i("div",zb,[...m[41]||(m[41]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",class:"spin",stroke:"currentColor","stroke-width":"2.5"},[e("path",{d:"M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"})],-1),Z(" Generating package... Please wait. ",-1)])])):k.value==="success"?(l(),i("div",Lb,[...m[42]||(m[42]=[e("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5"},[e("polyline",{points:"20 6 9 17 4 12"})],-1),Z(" Export successful! Check your downloads folder. ",-1)])])):q("",!0)]),_:1})])],64)):(l(),i("div",gb,[(l(),i("svg",mb,[...m[14]||(m[14]=[e("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"},null,-1),e("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"},null,-1)])])),m[17]||(m[17]=e("h3",{style:{"font-size":"20px","font-weight":"600","margin-bottom":"8px"}},"Sign up to export",-1)),m[18]||(m[18]=e("p",{style:{"font-size":"14px",color:"#64748b","margin-bottom":"32px"}},"Create a free account to export, save, and share your presentations.",-1)),e("div",bb,[e("button",{class:"btn btn-secondary",style:{width:"100%","justify-content":"center",gap:"8px"},onClick:m[0]||(m[0]=F=>E(p).loginWithGoogle())},[...m[15]||(m[15]=[e("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("path",{d:"M12 8v8m-4-4h8"})],-1),Z(" Continue with Google ",-1)])]),e("button",{class:"btn btn-secondary",style:{width:"100%","justify-content":"center",gap:"8px"},onClick:m[1]||(m[1]=F=>E(p).loginWithMicrosoft())},[...m[16]||(m[16]=[e("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("rect",{x:"3",y:"3",width:"7",height:"7"}),e("rect",{x:"14",y:"3",width:"7",height:"7"}),e("rect",{x:"14",y:"14",width:"7",height:"7"}),e("rect",{x:"3",y:"14",width:"7",height:"7"})],-1),Z(" Continue with Microsoft ",-1)])])])]))]}),_:1}))}},_b=Xe(jb,[["__scopeId","data-v-e55467ab"]]),Db={key:0,class:"editor-view"},qb={class:"editor-topbar"},Rb={class:"topbar-left"},Ob={class:"project-name-wrap"},Fb=["value"],Ub={class:"save-label"},Vb={class:"topbar-center"},Wb={key:0,class:"slide-position"},Gb={class:"topbar-right"},Hb={class:"editor-body"},Yb={class:"authoring-rail"},Jb=["onClick","data-tooltip"],Qb={key:0,class:"rail-icon"},Xb={key:1,class:"rail-icon"},Kb={key:2,class:"rail-icon"},Zb={key:3,class:"rail-icon"},ey={key:4,class:"rail-icon"},ty={key:5,class:"rail-icon"},oy={key:6,class:"rail-icon"},ny={key:7,class:"rail-icon"},ly={key:8,class:"rail-icon"},iy={key:9,class:"rail-icon"},ay={class:"right-panel"},sy={class:"panel-tabs"},ry=["onClick","data-tooltip"],dy={class:"tab-icon"},uy={class:"tab-label"},cy={class:"panel-content"},py={key:1,class:"editor-not-found"},vy={__name:"EditorView",setup(A){const r=Tl(),u=Al(),p=it(),v=at(),h=wl(),k=M(()=>r.params.id),g=M(()=>v.getProject(k.value)),G=M(()=>zt(g.value)),le=M(()=>{var I;return[...((I=g.value)==null?void 0:I.slides)||[]].sort((S,ye)=>S.order-ye.order)}),W=L(null),U=L(!1),me=L("deck"),{aiStore:z,showAIModal:B,aiMode:a,aiTopic:P,aiContext:N,aiProjectName:H,aiSlideCount:m,aiQuestionCount:O,aiDifficulty:ie,aiQuestionType:te,aiCreationError:ke,aiSubmitting:R,aiProjectNamePlaceholder:F,aiPrimaryActionLabel:pe,openAICreationModal:be,createAIProject:ne}=Pl({onRequireAuth:()=>u.push({name:"dashboard"})});let we=!1,C=null;Qe(()=>g.value,I=>{if(I){if(we){we=!1;return}C&&clearTimeout(C),C=setTimeout(()=>{p.pushHistory(I)},600)}},{deep:!0}),Qe(()=>h.isAuthReady,async I=>{var S;if(I){if((S=h.user)!=null&&S.uid&&await v.ensureRemoteProjectsLoaded(),!g.value){u.push({name:"dashboard"});return}p.setProject(k.value),le.value.length>0&&p.setCurrentSlide(le.value[0].id),p.pushHistory(g.value)}},{immediate:!0});const j=M(()=>{const I=g.value;return I?`Saved ${new Date(I.updatedAt).toLocaleTimeString()}`:""}),D=M(()=>{switch(p.rightPanelTab){case"layers":return"layers";case"ai":return"ai";case"theme":return"theme";default:return"properties"}});li({undo:()=>{if(p.canUndo()){const I=p.undo();I&&(we=!0,v.updateProject(k.value,I))}},redo:()=>{if(p.canRedo()){const I=p.redo();I&&(we=!0,v.updateProject(k.value,I))}},delete:()=>{p.selectedElementId&&(v.deleteElement(p.projectId,p.currentSlideId,p.selectedElementId),p.clearSelection())},escape:()=>{p.clearSelection(),p.setActiveTool("select")},copy:()=>{var S,ye,c,Le;const I=(Le=(c=(ye=(S=g.value)==null?void 0:S.slides)==null?void 0:ye.find(qe=>qe.id===p.currentSlideId))==null?void 0:c.elements)==null?void 0:Le.find(qe=>qe.id===p.selectedElementId);I&&p.setClipboard(I)},paste:()=>{if(p.clipboard&&p.currentSlideId){const I=p.clipboard;v.addElement(p.projectId,p.currentSlideId,I.type,{...I,x:I.x+20,y:I.y+20,id:void 0})}},duplicate:()=>{if(p.selectedElementId){const I=v.duplicateElement(p.projectId,p.currentSlideId,p.selectedElementId);I&&p.selectElement(I.id)}},zoomIn:()=>p.zoomIn(),zoomOut:()=>p.zoomOut(),zoomReset:()=>p.zoomReset(),toggleGrid:()=>p.toggleGrid(),nudge:(I,S)=>{var c,Le,qe,je;if(!p.selectedElementId)return;const ye=(je=(qe=(Le=(c=g.value)==null?void 0:c.slides)==null?void 0:Le.find(Ce=>Ce.id===p.currentSlideId))==null?void 0:qe.elements)==null?void 0:je.find(Ce=>Ce.id===p.selectedElementId);ye&&v.updateElement(p.projectId,p.currentSlideId,p.selectedElementId,{x:ye.x+I,y:ye.y+S})},selectAll:()=>{var S,ye,c;(((c=(ye=(S=g.value)==null?void 0:S.slides)==null?void 0:ye.find(Le=>Le.id===p.currentSlideId))==null?void 0:c.elements)||[]).forEach((Le,qe)=>p.selectElement(Le.id,qe>0))}});function X(){u.push({name:"dashboard"})}function xe(){u.push({name:"preview",params:{id:k.value},query:{from:"editor"}})}function ze(I="deck"){me.value=I,U.value=!0}function Ie(){U.value=!1,be(me.value)}function _e(I,S="Image"){if(!p.projectId||!p.currentSlideId||!I)return;const ye=new Image;ye.onload=()=>{const qe=Math.min(420/ye.width,280/ye.height,1),je=Math.max(120,Math.round(ye.width*qe)),Ce=Math.max(80,Math.round(ye.height*qe)),Pe=Math.max(24,Math.round((G.value.width-je)/2)),st=Math.max(24,Math.round((G.value.height-Ce)/2)),tt=v.addElement(p.projectId,p.currentSlideId,"image",{x:Pe,y:st,width:je,height:Ce,content:{src:I,alt:S,objectFit:"cover"}});tt&&(p.selectElement(tt.id),p.setRightPanel("properties"),p.setActiveTool("select"))},ye.src=I}function oe(I){const[S]=Array.from(I.target.files||[]);if(!S||!S.type.startsWith("image/"))return;const ye=new FileReader;ye.onload=()=>_e(String(ye.result||""),S.name),ye.readAsDataURL(S),I.target.value=""}function fe(){var I;(I=W.value)==null||I.click()}const ae=[{id:"text",label:"Text"},{id:"blocks",label:"Blocks"},{id:"resources",label:"Resources"},{id:"interactive-elements",label:"Interactive elements"},{id:"interactive-questions",label:"Interactive questions"},{id:"widgets",label:"Widgets"},{id:"insert",label:"Insert"},{id:"style",label:"Style"},{id:"background",label:"Background"},{id:"pages",label:"Pages"}];function ge(I){if(I==="text"){p.setActiveTool("text");return}if(I==="blocks"){p.toggleSlidePanel("blocks");return}if(I==="resources"){p.setActiveTool("image");return}if(I==="interactive-elements"){p.setActiveTool("hotspot");return}if(I==="interactive-questions"){p.setActiveTool("quiz");return}if(I==="widgets"){p.setActiveTool("shape");return}if(I==="insert"){fe();return}if(I==="style"){p.setRightPanel("properties");return}if(I==="background"){p.clearSelection(),p.setRightPanel("properties");return}I==="pages"&&p.toggleSlidePanel("slides")}function Me(I){return I==="text"?["text","heading"].includes(p.activeTool):I==="blocks"?p.showSlidePanel&&p.leftPanelTab==="blocks":I==="resources"?p.activeTool==="image":I==="interactive-elements"?["hotspot","button"].includes(p.activeTool):I==="interactive-questions"?p.activeTool==="quiz":I==="widgets"?["shape","video","audio","chart"].includes(p.activeTool):I==="insert"?!1:I==="style"||I==="background"?p.rightPanelTab==="properties":I==="pages"?p.showSlidePanel:!1}function se(){zl({showProgress:!0,animate:!0,overlayColor:"rgba(15, 23, 42, 0.65)",popoverClass:"app-walkthrough-theme",steps:[{popover:{title:"Welcome to the Editor! 🎨",description:"This is where the magic happens. Let us take a quick tour so you know where everything is."}},{element:"#tour-export-btn",popover:{title:"Export Your Project",description:"When you are finished creating, hit Export to publish your work and share it with the world.",side:"bottom",align:"end"}},{element:".authoring-rail",popover:{title:"Authoring Tools",description:"Drag and drop text, interactive hotspots, quizzes, and multimedia directly onto your canvas.",side:"right",align:"start"}},{element:".topbar-center",popover:{title:"Slide Navigation",description:"Keep track of exactly which slide you are editing. You can add more from the Pages tab later.",side:"bottom",align:"center"}}],onDestroyed:()=>{localStorage.setItem("hasSeenWalkthrough","true")}}).drive()}return Qe(()=>g.value,I=>{I&&!localStorage.getItem("hasSeenWalkthrough")&&setTimeout(()=>{se()},100)},{immediate:!0}),(I,S)=>{const ye=El("ThemeToggle");return g.value?(l(),i("div",Db,[e("input",{ref_key:"imageInputRef",ref:W,type:"file",accept:"image/*",class:"sr-only",onChange:oe},null,544),e("header",qb,[e("div",Rb,[e("button",{class:"btn btn-ghost btn-sm back-btn",onClick:X,"data-tooltip":"Return to dashboard","data-tooltip-position":"bottom"},[...S[14]||(S[14]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M19 12H5M12 19l-7-7 7-7"})],-1),Z(" Dashboard ",-1)])]),e("div",Ob,[e("input",{value:g.value.name,class:"project-name-input",onChange:S[0]||(S[0]=c=>E(v).updateProject(k.value,{name:c.target.value}))},null,40,Fb)]),e("span",Ub,w(j.value),1)]),e("div",Vb,[E(p).currentSlideId?(l(),i("span",Wb," Slide "+w(le.value.findIndex(c=>c.id===E(p).currentSlideId)+1)+" of "+w(le.value.length),1)):q("",!0)]),e("div",Gb,[e("button",{class:"btn btn-ghost btn-sm",onClick:se,"data-tooltip":"Show Help","data-tooltip-position":"bottom"},[...S[15]||(S[15]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),e("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})],-1),Z(" Help ",-1)])]),ft(ye,{style:{"margin-left":"8px"}}),S[20]||(S[20]=Z(" import ThemeToggle from '@/components/common/ThemeToggle.vue' ",-1)),e("button",{class:Q(["btn btn-ghost btn-sm",E(p).showAIPanel&&"active-btn"]),onClick:S[1]||(S[1]=c=>{E(p).showAIPanel=!E(p).showAIPanel,E(p).setRightPanel("ai")}),"data-tooltip":"Open AI assistant","data-tooltip-position":"bottom"},[...S[16]||(S[16]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})],-1),Z(" AI ",-1)])],2),e("button",{class:"btn btn-ghost btn-sm",onClick:S[2]||(S[2]=c=>{E(p).showThemeManager=!E(p).showThemeManager,E(p).setRightPanel("theme")}),"data-tooltip":"Open theme controls","data-tooltip-position":"bottom"},[...S[17]||(S[17]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("path",{d:"M12 8v4m0 4h.01"})],-1),Z(" Theme ",-1)])]),e("button",{class:"btn btn-secondary btn-sm",onClick:xe,"data-tooltip":"Preview your project","data-tooltip-position":"bottom"},[...S[18]||(S[18]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polygon",{points:"5 3 19 12 5 21 5 3"})],-1),Z(" Preview ",-1)])]),e("button",{id:"tour-export-btn",class:"btn btn-primary btn-sm",onClick:S[3]||(S[3]=c=>E(p).showExportModal=!0),"data-tooltip":"Export or publish","data-tooltip-position":"bottom"},[...S[19]||(S[19]=[e("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e("polyline",{points:"7 10 12 15 17 10"}),e("line",{x1:"12",y1:"15",x2:"12",y2:"3"})],-1),Z(" Export ",-1)])])])]),ft(xf,{onOpenAiProject:ze}),e("div",Hb,[e("aside",Yb,[(l(),i(ee,null,de(ae,c=>e("button",{key:c.id,class:Q(["rail-option",Me(c.id)&&"active"]),onClick:Le=>ge(c.id),"data-tooltip":c.label,"data-tooltip-position":"right"},[c.id==="text"?(l(),i("span",Qb,"T")):c.id==="blocks"?(l(),i("span",Xb,[...S[21]||(S[21]=[et('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-c2eafba3><rect x="3" y="4" width="8" height="7" rx="1.5" data-v-c2eafba3></rect><rect x="13" y="4" width="8" height="5" rx="1.5" data-v-c2eafba3></rect><rect x="3" y="13" width="8" height="7" rx="1.5" data-v-c2eafba3></rect><rect x="13" y="11" width="8" height="9" rx="1.5" data-v-c2eafba3></rect></svg>',1)])])):c.id==="resources"?(l(),i("span",Kb,[...S[22]||(S[22]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),e("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),e("polyline",{points:"21 15 16 10 5 21"})],-1)])])):c.id==="interactive-elements"?(l(),i("span",Zb,[...S[23]||(S[23]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})],-1)])])):c.id==="interactive-questions"?(l(),i("span",ey,[...S[24]||(S[24]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),e("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})],-1)])])):c.id==="widgets"?(l(),i("span",ty,[...S[25]||(S[25]=[et('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-c2eafba3><rect x="3" y="3" width="7" height="7" data-v-c2eafba3></rect><rect x="14" y="3" width="7" height="7" data-v-c2eafba3></rect><rect x="14" y="14" width="7" height="7" data-v-c2eafba3></rect><rect x="3" y="14" width="7" height="7" data-v-c2eafba3></rect></svg>',1)])])):c.id==="insert"?(l(),i("span",oy,[...S[26]||(S[26]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e("line",{x1:"5",y1:"12",x2:"19",y2:"12"})],-1)])])):c.id==="style"?(l(),i("span",ny,[...S[27]||(S[27]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"})],-1)])])):c.id==="background"?(l(),i("span",ly,[...S[28]||(S[28]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),e("line",{x1:"3",y1:"9",x2:"21",y2:"9"}),e("line",{x1:"9",y1:"21",x2:"9",y2:"9"})],-1)])])):c.id==="pages"?(l(),i("span",iy,[...S[29]||(S[29]=[e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),e("polyline",{points:"13 2 13 9 20 9"})],-1)])])):q("",!0),Z(" "+w(c.label),1)],10,Jb)),64))]),ft(Bt,{name:"side-panel-slide"},{default:ut(()=>[E(p).showSlidePanel&&E(p).leftPanelTab==="slides"?(l(),Je(hi,{key:0})):q("",!0)]),_:1}),ft(Bt,{name:"side-panel-slide"},{default:ut(()=>[E(p).showSlidePanel&&E(p).leftPanelTab==="blocks"?(l(),Je(Hi,{key:0})):q("",!0)]),_:1}),ft(h1),e("aside",ay,[e("div",sy,[(l(),i(ee,null,de([{id:"properties",label:"Props",icon:"⚙"},{id:"layers",label:"Layers",icon:"◧"},{id:"ai",label:"AI",icon:"✦"},{id:"theme",label:"Theme",icon:"🎨"}],c=>e("button",{key:c.id,class:Q(["panel-tab",E(p).rightPanelTab===c.id&&"active"]),onClick:Le=>E(p).setRightPanel(c.id),"data-tooltip":`Open ${c.label}`,"data-tooltip-position":"bottom"},[e("span",dy,w(c.icon),1),e("span",uy,w(c.label),1)],10,ry)),64))]),e("div",cy,[ft(Bt,{name:"editor-panel-switch",mode:"out-in"},{default:ut(()=>[(l(),i("div",{key:D.value,class:"panel-content-view"},[E(p).rightPanelTab==="properties"?(l(),Je(Ov,{key:0})):E(p).rightPanelTab==="layers"?(l(),Je(fa,{key:1})):E(p).rightPanelTab==="ai"?(l(),Je(_m,{key:2})):E(p).rightPanelTab==="theme"?(l(),Je(fb,{key:3})):q("",!0)]))]),_:1})])])]),E(p).showExportModal?(l(),Je(_b,{key:0})):q("",!0),U.value?(l(),Je(Bl,{key:1,title:"Create a New AI Project",message:"Your current project stays saved. When the AI finishes, the editor will switch to the new generated project.","confirm-label":"Continue",onClose:S[4]||(S[4]=c=>U.value=!1),onConfirm:Ie})):q("",!0),E(B)?(l(),Je(Nl,{key:2,mode:E(a),topic:E(P),context:E(N),"project-name":E(H),"slide-count":E(m),"question-count":E(O),difficulty:E(ie),"question-type":E(te),"project-name-placeholder":E(F),"primary-action-label":E(pe),"creation-error":E(ke),"is-submitting":E(R),"is-generating":E(z).isGenerating,"has-api-key":!!E(z).apiKey,onClose:S[5]||(S[5]=c=>B.value=!1),onCreate:E(ne),"onUpdate:mode":S[6]||(S[6]=c=>a.value=c),"onUpdate:topic":S[7]||(S[7]=c=>P.value=c),"onUpdate:context":S[8]||(S[8]=c=>N.value=c),"onUpdate:projectName":S[9]||(S[9]=c=>H.value=c),"onUpdate:slideCount":S[10]||(S[10]=c=>m.value=c),"onUpdate:questionCount":S[11]||(S[11]=c=>O.value=c),"onUpdate:difficulty":S[12]||(S[12]=c=>ie.value=c),"onUpdate:questionType":S[13]||(S[13]=c=>te.value=c)},null,8,["mode","topic","context","project-name","slide-count","question-count","difficulty","question-type","project-name-placeholder","primary-action-label","creation-error","is-submitting","is-generating","has-api-key","onCreate"])):q("",!0)])):(l(),i("div",py,[S[30]||(S[30]=e("h2",null,"Project not found",-1)),S[31]||(S[31]=e("p",null,"This project may have been deleted or the link is invalid.",-1)),e("button",{class:"btn btn-primary",onClick:X},"Go to Dashboard")]))}}},ky=Xe(vy,[["__scopeId","data-v-c2eafba3"]]);export{ky as default};
