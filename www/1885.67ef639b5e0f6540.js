"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1885],{151:(O,_,p)=>{p.d(_,{s:()=>c});var m=p(9862),x=p(6689);let c=(()=>{var g;class t{constructor(i){this.product=i}getProductsids(i){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProductsIds",{idVendedor:i})}getProducts(i){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProducts",{idVendedor:i})}getProduct(i){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProduct",{idProduct:i})}getImageProducts(i){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getImageProducts",i,{responseType:"blob"})}updateProduct(i){return this.product.put("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/updateProduct",i)}deleteProduct(i){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/deleteProduct",{idEquipoMedico:i})}getProductsDonador(){return this.product.get("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProductsDonador")}findProduct(i){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/findProduct",[i])}getCoordenates(i){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getCoordenates",{idVendedor:i})}compraVenta(i,h){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/compraVenta",{idEquipoMedico:i,idUsuario:h})}getProductsSolicitante(){return this.product.get("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProductsSolicitante")}donacionAsignada(i,h){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/DonacionAsignada",{idEquipoMedico:i,idSolicitante:h})}getDonacionesAsignadas(i){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getDonacionesAsignadas",{idSolicitante:i})}getTranscription(i){const h=new m.WM;h.append("Content-Type","multipar/form-data");const b=new FormData;return b.append("audioBlob",i,"audio.wav"),this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/transcribe",b,{headers:h})}}return(g=t).\u0275fac=function(i){return new(i||g)(x.LFG(m.eN))},g.\u0275prov=x.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),t})()},1885:(O,_,p)=>{p.r(_),p.d(_,{VendedorPageModule:()=>U});var m=p(6814),x=p(95),c=p(6728),g=p(3044),t=p(6689),f=p(1296),i=p(5861),h=p(151);function b(n,s){if(1&n){const a=t.EpF();t.TgZ(0,"button",6),t.NdJ("click",function(){const r=t.CHM(a).$implicit,d=t.oxw(2);return t.KtG(d.filtrado(r.name))}),t._uU(1),t.qZA()}if(2&n){const a=s.$implicit;t.xp6(1),t.Oqu(a.name)}}function P(n,s){if(1&n&&(t.TgZ(0,"nav",3)(1,"div",4),t.YNc(2,b,2,1,"button",5),t.qZA()()),2&n){const a=t.oxw();t.xp6(2),t.Q6J("ngForOf",a.estados)}}function v(n,s){if(1&n&&(t.TgZ(0,"ion-item")(1,"ion-card")(2,"a",9)(3,"ion-card-content"),t._UZ(4,"img",10),t.TgZ(5,"ion-title",11),t._uU(6),t.qZA(),t.TgZ(7,"span",12)(8,"h2"),t._uU(9),t.qZA()(),t.TgZ(10,"ion-label",13)(11,"h1"),t._uU(12),t.qZA()()()()()()),2&n){const a=s.$implicit;t.xp6(2),t.MGl("href","/products/",a.idEquipoMedico,"",t.LSH),t.xp6(2),t.s9C("src",a.imagenes[0][0],t.LSH),t.s9C("alt",a.nombre),t.xp6(2),t.Oqu(a.nombre),t.xp6(3),t.hij(" ",a.descripcion," "),t.xp6(3),t.hij(" $",a.costo," ")}}function M(n,s){if(1&n&&(t.TgZ(0,"ion-list",7),t.YNc(1,v,13,6,"ion-item",8),t.qZA()),2&n){const a=t.oxw();t.xp6(1),t.Q6J("ngForOf",a.copyDatos)}}let w=(()=>{var n;class s{constructor(e,o,r){this.products=e,this.auth=o,this.router=r,this.datos=[],this.copyDatos=[],this.estados=[{name:"En venta"},{name:"listado"}]}ngOnInit(){var e=this;return(0,i.Z)(function*(){const{idUsuario:o}=JSON.parse(localStorage.getItem("Usuario")),r=yield e.products.getProducts(o).toPromise();for(let d=0;d<Object.keys(r).length;d++){e.datos.push(r[d][0]);for(let l=0;l<e.datos[d].imagenes.length;l++)try{const u=yield e.products.getImageProducts(e.datos[d].imagenes[l][0]).toPromise();console.log(u),e.datos[d].imagenes[l][0]=URL.createObjectURL(u),console.log(e.datos[d].imagenes[l][0])}catch(u){console.error(`Error al cargar la imagen: ${u.message}`)}}console.log(e.copyDatos),e.copyDatos=e.datos})()}filtrado(e){this.estadoSelect!==e?(this.copyDatos=this.datos.filter(o=>o.estado==e),this.estadoSelect=e):this.copyDatos=this.datos}navigateToprodcut(e){this.router.navigate(["/products",e])}}return(n=s).\u0275fac=function(e){return new(e||n)(t.Y36(h.s),t.Y36(f.i),t.Y36(g.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-listado-vendedor"]],decls:3,vars:2,consts:[[1,"container"],["class","container-btn",4,"ngIf"],["class","product-list","lines","none",4,"ngIf"],[1,"container-btn"],[1,"filter-buttons"],["class","btn_seleccion",3,"click",4,"ngFor","ngForOf"],[1,"btn_seleccion",3,"click"],["lines","none",1,"product-list"],[4,"ngFor","ngForOf"],[1,"estilos-a",3,"href"],[3,"src","alt"],[1,"product-name"],[1,"product-description"],[1,"product-cost"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.YNc(1,P,3,1,"nav",1),t.YNc(2,M,2,1,"ion-list",2),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngIf",o.copyDatos&&o.datos),t.xp6(1),t.Q6J("ngIf",o.copyDatos&&o.datos))},dependencies:[m.sg,m.O5,c.PM,c.FN,c.Ie,c.Q$,c.q_,c.wd],styles:['@charset "UTF-8";@media (min-width: 991px){ion-card[_ngcontent-%COMP%]{width:320px;height:350px;margin:10px;border:5px solid #90E0EF;transition:transform .3s ease}ion-card[_ngcontent-%COMP%]:hover{transform:translateY(-5px)}ion-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;text-align:center}.product-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center}ion-item[_ngcontent-%COMP%]{width:auto}.container-btn[_ngcontent-%COMP%]{height:30px;display:flex;justify-content:space-around;align-items:center;background-color:#f0f0f0}.btn_seleccion[_ngcontent-%COMP%]{flex:1;padding:10px;background-color:#4361ee;color:#fff;border:none;cursor:pointer;transition:background-color .3s ease}.filter-buttons[_ngcontent-%COMP%]{display:flex;width:1504px}.btn_seleccion[_ngcontent-%COMP%]:hover{background-color:#3345cb}.product-name[_ngcontent-%COMP%], .product-description[_ngcontent-%COMP%], .product-cost[_ngcontent-%COMP%]{margin:5px 0}ion-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-decoration:none}.product-name[_ngcontent-%COMP%]{font-size:22px;font-weight:700;color:#111d13;height:50px;overflow:hidden;text-overflow:ellipsis;white-space:normal}.product-description[_ngcontent-%COMP%]{width:295px;height:70px;max-height:90px;margin-top:5px;font-size:14px;overflow:hidden;color:#111d13}.product-cost[_ngcontent-%COMP%]{font-size:16px;font-weight:700;color:#111d13}.estilos-a[_ngcontent-%COMP%]{text-decoration:none}}@media (max-width: 767px){.desktop[_ngcontent-%COMP%]{display:none}.container-btn[_ngcontent-%COMP%]{height:30px;display:flex;justify-content:space-around;background-color:#f0f0f0}.container-btn[_ngcontent-%COMP%]{height:30px;display:flex;justify-content:space-around;align-items:center;background-color:#f0f0f0}.filter-buttons[_ngcontent-%COMP%]{width:100%;display:flex}.btn_seleccion[_ngcontent-%COMP%]{flex:1;padding:10px;background-color:#4361ee;color:#fff;border:none}.product-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-around}ion-item[_ngcontent-%COMP%]{width:auto}ion-card[_ngcontent-%COMP%]{height:360px;margin:10px;border:5px solid #90E0EF}ion-card-content[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;justify-content:space-between;align-items:center;text-align:center}.product-name[_ngcontent-%COMP%]{width:auto;font-size:18px;font-weight:700;color:#111d13;margin-top:5px}.product-description[_ngcontent-%COMP%]{font-size:14px;color:#111d13;width:auto;height:auto}.product-cost[_ngcontent-%COMP%]{font-size:16px;font-weight:700;color:#111d13;margin-top:5px}.estilos-a[_ngcontent-%COMP%]{text-decoration:none}}']}),s})();var y=p(8184);const Z=["archivoInput"];let T=(()=>{var n;class s{constructor(e,o,r,d,l){this.medictools=e,this.crud=o,this.elementRef=r,this.alertController=d,this.router=l,this.imagenes=[],this.tomarFoto=!0,this.capturingFrames=!0}ngOnInit(){}showFoto(){this.tomarFoto?(this.tomarFoto=!1,this.abrirCamaraConVistaPrevia()):(this.tomarFoto=!0,this.capturingFrames=!0,this.captureFrames(),this.stopVideo(),console.log(this.imagenes))}cargarImagen(){console.log(this.archivoInput);const e=this.archivoInput.nativeElement;console.log(e);const o=e.files[0];o?(console.log("Nombre del archivo:",o.name),console.log("Tipo de archivo:",o.type),console.log("Tama\xf1o del archivo (en bytes):",o.size)):console.log("Ning\xfan archivo seleccionado.")}guardar(e,o,r){this.medictools.guardar(e.value,o.value,r.value,JSON.parse(localStorage.getItem("Usuario")).idUsuario,this.imagenes).subscribe(d=>{d.hasOwnProperty("message")?this.alerta({header:"exito",message:d.message},e,o,r):this.alerta({header:"error",message:"no se pudo agregar correctamente"},e,o,r)})}alerta(e,o,r,d){var l=this;return(0,i.Z)(function*(){let u;u="error"===e.header?[{text:"Reintentar",handler:()=>{o.value="",r.value="",d.value="",l.imagenes=[]}}]:[{text:"Agregar Otro",handler:()=>{o.value="",r.value="",d.value="",l.imagenes=[]}}],(yield l.alertController.create({header:e.header,message:e.message,buttons:u})).present()})()}abrirCamaraConVistaPrevia(){var e=this;return(0,i.Z)(function*(){const o=e.elementRef.nativeElement.querySelector("#video");try{e.stream=yield navigator.mediaDevices.getUserMedia({video:!0}),o.srcObject=e.stream,o.play()}catch(r){console.error("Error al acceder a la c\xe1mara:",r)}})()}stopVideo(){if(this.stream){const e=this.stream.getTracks();this.capturingFrames=!1,e.forEach(o=>{o.stop()})}}captureFrames(){var e=this;return(0,i.Z)(function*(){const o=e.elementRef.nativeElement.querySelector("#video");let r=document.createElement("canvas"),d=r.getContext("2d");if(e.capturingFrames){d.drawImage(o,0,0,r.width,r.height);const l=d.getImageData(0,0,r.width,r.height);e.imagenes.push({matriz:l.data,width:l.width,height:l.height}),yield new Promise(u=>setTimeout(u,1e4))}})()}}return(n=s).\u0275fac=function(e){return new(e||n)(t.Y36(y.t),t.Y36(f.i),t.Y36(t.SBq),t.Y36(c.Br),t.Y36(g.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-formulario-vendedor"]],viewQuery:function(e,o){if(1&e&&t.Gf(Z,5),2&e){let r;t.iGM(r=t.CRH())&&(o.archivoInput=r.first)}},decls:18,vars:1,consts:[[1,"container"],[1,"container-forms"],["label","Nombre","labelPlacement","floating","type","text"],["nombre",""],["label","Descripci\xf3n","labelPlacement","floating","type","textarea"],["descripcion",""],["label","Costo","labelPlacement","floating","type","number"],["costo",""],[1,"container-photo"],["id","video","controls","",3,"hidden"],["id","btn_tf",3,"click"],["id","btn_enviar",3,"click"]],template:function(e,o){if(1&e){const r=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"form")(3,"ion-item"),t._UZ(4,"ion-input",2,3),t.qZA(),t.TgZ(6,"ion-item"),t._UZ(7,"ion-textarea",4,5),t.qZA(),t.TgZ(9,"ion-item"),t._UZ(10,"ion-input",6,7),t.qZA()()(),t.TgZ(12,"div",8),t._UZ(13,"video",9),t.TgZ(14,"ion-button",10),t.NdJ("click",function(){return o.showFoto()}),t._uU(15," Tomar Foto"),t.qZA()(),t.TgZ(16,"ion-button",11),t.NdJ("click",function(){t.CHM(r);const l=t.MAs(5),u=t.MAs(8),C=t.MAs(11);return t.KtG(o.guardar(l,u,C))}),t._uU(17,"Guardar"),t.qZA()()}2&e&&(t.xp6(13),t.Q6J("hidden",o.tomarFoto))},dependencies:[x._Y,x.JL,x.F,c.YG,c.pK,c.Ie,c.g2,c.as,c.j9],styles:["@media (min-width: 991px){.container[_ngcontent-%COMP%]{width:397px;height:524px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0;padding:0}.container-forms[_ngcontent-%COMP%]{margin-top:1px;margin-bottom:30px;width:350px}.archivo[_ngcontent-%COMP%]{margin-top:30px}#video[_ngcontent-%COMP%]{width:340px;height:170px}#btn_tf[_ngcontent-%COMP%]{width:120px;height:35px}#btn_enviar[_ngcontent-%COMP%]{width:120px;height:35px;margin-bottom:10px}.container-photo[_ngcontent-%COMP%]{width:345px;height:220px;border:2px solid #2c3e50;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:10px;padding:15px;box-shadow:0 4px 8px #0000001a}}@media (max-width: 767px){.container[_ngcontent-%COMP%]{max-width:332px;min-width:285px;height:527px;display:flex;flex-direction:column;align-items:center;justify-content:center}.archivo[_ngcontent-%COMP%]{margin-top:30px}#video[_ngcontent-%COMP%]{width:340px;height:170px}#btn_tf[_ngcontent-%COMP%]{width:120px;height:35px}#btn_enviar[_ngcontent-%COMP%]{width:120px;height:35px;margin-bottom:10px}.container-photo[_ngcontent-%COMP%]{width:345px;height:220px;border:2px solid #2c3e50;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:10px;padding:15px;box-shadow:0 4px 8px #0000001a}.container-forms[_ngcontent-%COMP%]{margin-bottom:30px}}"]}),s})();function k(n,s){1&n&&(t.TgZ(0,"ion-item"),t._UZ(1,"app-listado-vendedor"),t.qZA())}function F(n,s){1&n&&(t.TgZ(0,"ion-item"),t._UZ(1,"app-formulario-vendedor"),t.qZA())}const V=[{path:"",component:(()=>{var n;class s{constructor(e,o){this.crud=e,this.router=o,this.show="listado"}ngOnInit(){}ionViewWillEnter(){this.user=JSON.parse(localStorage.getItem("Usuario")),this.user?1!==this.user.idRol&&this.router.navigate(["/"]):this.router.navigate(["/"]),this.nombre=this.user.nombre}changeFromListado(){"listado"===this.show&&(this.show="formulario")}changeFromFormulario(){"formulario"===this.show&&(this.show="listado")}logOut(){localStorage.removeItem("Usuario"),this.router.navigate(["/"])}}return(n=s).\u0275fac=function(e){return new(e||n)(t.Y36(f.i),t.Y36(g.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-vendedor"]],decls:27,vars:3,consts:[["slot","start",1,"ion-logo"],["src","../../assets/logo_transparent.png",1,"logo"],["slot","end"],[1,"header-content"],["src","../../assets/icon_user_64.png",1,"user-icon"],[1,"user-name"],["slot","end",1,"ion-back"],[1,"custom-button",3,"click"],["src","../../assets/icon_logout_32.png",1,"icono_back"],[1,"container"],[1,"container-buttons"],[1,"button-icon",3,"click"],["src","../../assets/icono_agregar.png",1,"icono"],[1,"text"],["src","../../assets/icon_lista.png",1,"icono"],[1,"container-listado","listado"],[4,"ngIf"],[1,"container-formulario","formulario"]],template:function(e,o){1&e&&(t.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),t._UZ(3,"ion-img",1),t.qZA(),t.TgZ(4,"ion-buttons",2)(5,"div",3),t._UZ(6,"ion-img",4),t.TgZ(7,"div",5),t._uU(8),t.qZA()()(),t.TgZ(9,"ion-buttons",6)(10,"ion-button",7),t.NdJ("click",function(){return o.logOut()}),t._UZ(11,"ion-img",8),t.qZA()()()(),t.TgZ(12,"ion-content")(13,"div",9)(14,"div",10)(15,"button",11),t.NdJ("click",function(){return o.changeFromListado()}),t._UZ(16,"ion-img",12),t.TgZ(17,"span",13),t._uU(18,"AGREGAR"),t.qZA()(),t.TgZ(19,"button",11),t.NdJ("click",function(){return o.changeFromFormulario()}),t._UZ(20,"ion-img",14),t.TgZ(21,"span"),t._uU(22,"LISTAR"),t.qZA()()()(),t.TgZ(23,"div",15),t.YNc(24,k,2,0,"ion-item",16),t.qZA(),t.TgZ(25,"div",17),t.YNc(26,F,2,0,"ion-item",16),t.qZA()()),2&e&&(t.xp6(8),t.Oqu(o.nombre),t.xp6(16),t.Q6J("ngIf","listado"===o.show),t.xp6(2),t.Q6J("ngIf","formulario"===o.show))},dependencies:[m.O5,c.YG,c.Sm,c.W2,c.Gu,c.Xz,c.Ie,c.sr,w,T],styles:['@charset "UTF-8";@media (min-width: 991px){.movil[_ngcontent-%COMP%]{display:none}ion-content[_ngcontent-%COMP%]{--background: #E8E8E8}ion-header[_ngcontent-%COMP%]{height:90px}ion-toolbar[_ngcontent-%COMP%]{height:90px;display:flex;justify-content:space-between;align-items:center;--background: #5DADE2}.header-content[_ngcontent-%COMP%]{width:60px;height:73px;margin-right:20px;align-items:center;text-align:center}.header_img[_ngcontent-%COMP%]{height:165px}.user-icon[_ngcontent-%COMP%]{width:52px;height:52px}.icono_back[_ngcontent-%COMP%]{width:30px;height:30px;margin-right:3px}.user-name[_ngcontent-%COMP%]{font-size:18px}.logo[_ngcontent-%COMP%]{width:220px;height:160px;margin:7px 0 0}ion-searchbar[_ngcontent-%COMP%]{--background: #ffffff;color:#000}.searchbar[_ngcontent-%COMP%]{width:700px;height:50px;margin-left:120px}.icon_micro[_ngcontent-%COMP%]{width:30px;height:30px}.btn_micro[_ngcontent-%COMP%]{margin-right:320px}.container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:100%;height:100px}.container-buttons[_ngcontent-%COMP%]{display:flex;align-items:center;margin-top:20px}button[_ngcontent-%COMP%]{width:150px;height:70px;display:flex;align-items:center;padding:10px;margin:10px;border-radius:15px;background:#2ecc71;color:#fff;border:none;cursor:pointer;transition:background .3s ease;box-shadow:0 4px 6px #0000001a;transform:scale(1);transition:transform .3s ease}button[_ngcontent-%COMP%]:hover{background:#27ae60;transform:scale(1.05)}.text[_ngcontent-%COMP%]{margin-left:7px}.container-formulario[_ngcontent-%COMP%]{width:430px;height:527px;display:flex;align-items:center;justify-content:center;margin:25px auto 0;box-sizing:border-box;padding:0}.container-listado[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;margin-top:25px}}@media (max-width: 767px){.desktop[_ngcontent-%COMP%]{display:none}ion-content[_ngcontent-%COMP%]{--background: #E8E8E8}ion-header[_ngcontent-%COMP%]{height:90px}ion-toolbar[_ngcontent-%COMP%]{height:90px;width:100%;--background: #5DADE2}.btn_micro[_ngcontent-%COMP%]{display:none}ion-toolbar[_ngcontent-%COMP%]{height:90px;display:flex;justify-content:space-between;align-items:center}.ion-logo[_ngcontent-%COMP%]{width:120px;height:100%;margin:0;padding:0}.header-content[_ngcontent-%COMP%]{width:44px;height:62px;align-items:center}.user-name[_ngcontent-%COMP%]{font-size:12px;text-align:center}.ion-back[_ngcontent-%COMP%]{width:40px;height:40px;justify-content:flex-end;margin-top:8px}.custom-button[_ngcontent-%COMP%]{width:35px;height:35px}ion-searchbar[_ngcontent-%COMP%]{--background: #ffffff;color:#000;--min-width: 40px;--width: 50px;--height: 20px;--font-size: 12px}.container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:100%;height:65px}.container-buttons[_ngcontent-%COMP%]{display:flex;align-items:center}button[_ngcontent-%COMP%]{width:100px;height:50px;display:flex;align-items:center;margin:8px;border-radius:5px;background:#2ecc71}button[_ngcontent-%COMP%]:hover{background:#27ae60;transform:scale(1.05)}span[_ngcontent-%COMP%]{font-size:7px}.icono[_ngcontent-%COMP%]{width:45px;height:45px;padding-right:2px}.button-icon[_ngcontent-%COMP%]{padding-left:8px}.container-formulario[_ngcontent-%COMP%]{max-width:400px;min-width:300px;height:527px;display:flex;align-items:center;justify-content:center;margin:5px auto 0;box-sizing:border-box;padding:0}.container-listado[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;margin:0;padding:0}}']}),s})()}];let A=(()=>{var n;class s{}return(n=s).\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[g.Bz.forChild(V),g.Bz]}),s})(),U=(()=>{var n;class s{}return(n=s).\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[m.ez,x.u5,c.Pc,A]}),s})()}}]);