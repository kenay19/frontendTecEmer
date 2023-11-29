"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3687],{3687:(C,p,i)=>{i.r(p),i.d(p,{LoginPageModule:()=>M});var x=i(6814),s=i(95),c=i(6728),d=i(3044),_=i(5861),n=i(6689),f=i(1296);const P=[{path:"",component:(()=>{var e;class a{constructor(o,r,t){this.router=o,this.crud=r,this.alertController=t,this.direccion=["/vendedor","/donador","/solicitante"]}ngOnInit(){}cambiopagina(){this.router.navigate(["/register"])}loginUser(o,r){this.crud.loginUser(o.value,r.value).subscribe(t=>{console.log(t),t.hasOwnProperty("error")?this.crearAlerta(t.error,o,r):t[0].hasOwnProperty("idUsuario")&&(localStorage.setItem("Usuario",JSON.stringify(t[0])),this.crud.setUser(t[0]),this.router.navigate([this.direccion[t[0].idRol-1]]))})}HomeReturn(){this.router.navigate(["/"])}crearAlerta(o,r,t){var g=this;return(0,_.Z)(function*(){(yield g.alertController.create({header:"Error",message:o,buttons:[{text:"Reintentar",handler:()=>{r.value="",t.value=""}},{text:"registrarse",handler:()=>{g.cambiopagina()}}]})).present()})()}}return(e=a).\u0275fac=function(o){return new(o||e)(n.Y36(d.F0),n.Y36(f.i),n.Y36(c.Br))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-login"]],decls:25,vars:1,consts:[[3,"fullscreen"],[1,"container"],[1,"form__group","form__div"],[1,"fa-solid","fa-envelope"],["placeholder","Direcci\xf3n de correo electr\xf3nico","type","email",1,"campo"],["email",""],[1,"fa-solid","fa-lock"],["placeholder","Contrase\xf1a","type","password",1,"campo"],["contra",""],[1,"form__group"],[3,"click"],[1,"form__group__enlace"],[1,"enlace_1"],[1,"enlace",3,"click"],["id","btn_salir",1,"enlace",3,"click"]],template:function(o,r){if(1&o){const t=n.EpF();n.TgZ(0,"ion-content",0)(1,"div",1)(2,"ion-title"),n._uU(3,"Login"),n.qZA(),n.TgZ(4,"form")(5,"div",2)(6,"span"),n._UZ(7,"i",3),n.qZA(),n._UZ(8,"ion-input",4,5),n.qZA(),n.TgZ(10,"div",2)(11,"span"),n._UZ(12,"i",6),n.qZA(),n._UZ(13,"ion-input",7,8),n.qZA(),n.TgZ(15,"div",9)(16,"ion-button",10),n.NdJ("click",function(){n.CHM(t);const u=n.MAs(9),h=n.MAs(14);return n.KtG(r.loginUser(u,h))}),n._uU(17,"Acceder"),n.qZA()(),n.TgZ(18,"div",11)(19,"p",12),n._uU(20,"\xbfNo tienes una cuenta? "),n.TgZ(21,"a",13),n.NdJ("click",function(){return r.cambiopagina()}),n._uU(22,"Reg\xedstrate aqu\xed"),n.qZA()(),n.TgZ(23,"a",14),n.NdJ("click",function(){return r.HomeReturn()}),n._uU(24,"Regresar"),n.qZA()()()()()}2&o&&n.Q6J("fullscreen",!0)},dependencies:[s._Y,s.JL,s.F,c.YG,c.W2,c.pK,c.wd,c.j9],styles:["@media (min-width: 991px){.movil[_ngcontent-%COMP%]{display:none}ion-content[_ngcontent-%COMP%]{--background: url(large-triangles.124a1aa25f79aca0.svg) no-repeat center/cover;font-family:Poppins}*[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}.container[_ngcontent-%COMP%]{width:450px;padding:20px;border-radius:15px;background:white;display:flex;flex-direction:column;align-items:center;gap:15px;margin:30px auto auto}ion-title[_ngcontent-%COMP%]{color:#607d8b;font-size:38px}form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:15px;width:100%}.form__div[_ngcontent-%COMP%]{width:100%;border:solid 1px rgb(145,145,145);padding:10px 25px;border-radius:20px}ion-input[_ngcontent-%COMP%]{border:none;outline:none;padding:10px;--color: #444242}span[_ngcontent-%COMP%]{color:#919191}ion-button[_ngcontent-%COMP%]{width:100%;padding:12px 15px;--background: #7ac0e4;border:none;font-size:16px;border-radius:20px;cursor:pointer}ion-button[_ngcontent-%COMP%]:hover{--background: #619ebd}.enlace[_ngcontent-%COMP%]{text-align:center;font-size:16px;color:#000;text-decoration:none}.form__group__enlace[_ngcontent-%COMP%]{text-align:center;font-size:25px}hr[_ngcontent-%COMP%]{width:100%}p[_ngcontent-%COMP%]{text-align:center;font-size:14px;color:#444242}.div__group[_ngcontent-%COMP%]{display:flex;gap:20px}.enlace_1[_ngcontent-%COMP%]{font-size:17px;text-decoration:none}#btn_salir[_ngcontent-%COMP%]{text-decoration:none}#btn_salir[_ngcontent-%COMP%]:hover{cursor:pointer;text-decoration:underline}.enlace_1[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{cursor:pointer;text-decoration:underline;color:#007bff}}@media (max-width: 767px){.desktop[_ngcontent-%COMP%]{display:none}ion-content[_ngcontent-%COMP%]{--background: url(large-triangles.124a1aa25f79aca0.svg) no-repeat center/cover;font-family:Poppins}*[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}.container[_ngcontent-%COMP%]{height:420px;width:320px;padding:20px;border-radius:15px;background:white;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:15px;margin:150px auto auto}ion-title[_ngcontent-%COMP%]{position:relative;top:10px;color:#4c5f68;font-size:38px}form[_ngcontent-%COMP%]{margin-top:3px;display:flex;flex-direction:column;gap:15px;width:100%}.form__div[_ngcontent-%COMP%]{width:100%;border:solid 1px rgb(145,145,145);padding:10px 25px;border-radius:20px}ion-input[_ngcontent-%COMP%]{border:none;outline:none;padding:10px;--color: #444242}span[_ngcontent-%COMP%]{color:#919191}ion-button[_ngcontent-%COMP%]{width:100%;padding:12px 15px;--background: #7ac0e4;border:none;font-size:16px;border-radius:20px;cursor:pointer}ion-button[_ngcontent-%COMP%]:hover{--background: #619ebd}.enlace[_ngcontent-%COMP%]{text-align:center;font-size:16px;color:#000;text-decoration:none}.form__group__enlace[_ngcontent-%COMP%]{text-align:center;font-size:25px}hr[_ngcontent-%COMP%]{width:100%}p[_ngcontent-%COMP%]{text-align:center;font-size:14px;color:#444242}.div__group[_ngcontent-%COMP%]{display:flex;gap:20px}.enlace_1[_ngcontent-%COMP%]{font-size:17px;text-decoration:none}#btn_salir[_ngcontent-%COMP%]{text-decoration:none}#btn_salir[_ngcontent-%COMP%]:hover{cursor:pointer;text-decoration:underline}.enlace_1[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{cursor:pointer;text-decoration:underline;color:#007bff}}"]}),a})()}];let m=(()=>{var e;class a{}return(e=a).\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[d.Bz.forChild(P),d.Bz]}),a})(),M=(()=>{var e;class a{}return(e=a).\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[x.ez,s.u5,c.Pc,m]}),a})()}}]);