(this["webpackJsonptoto-production"]=this["webpackJsonptoto-production"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},26:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(21),i=n.n(r),o=(n(26),n(8)),c=n(9),l=n(11),u=n(10),h=n(2),g=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(h.jsx)("div",{children:Object(h.jsx)("h1",{children:"home page"})})}}]),n}(s.a.Component),j=n(6),d=n(15),b=(n(12),n(13),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).onEmailChange=function(e){a.setState({signinEmail:e.target.value})},a.onPasswordChange=function(e){a.setState({signinPassword:e.target.value})},a.onSubmitSignin=function(){if(""!==a.state.signinEmail)return fetch("https://toto-server.herokuapp.com/signin",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a.state.signinEmail,password:a.state.signinPassword})}).then((function(e){return e.json()})).then((function(e){var t=parseInt(e);console.log("signin",t),a.props.onRegistration(t)})).catch((function(e){return console.log("signin",e)}))},a.state={signinEmail:"",signinPassword:"",badSubmition:!1},a}return Object(c.a)(n,[{key:"render",value:function(){var e=this,t="Email address",n="Password",a="Log In";return"hebrew"===this.props.language&&(t="\u05db\u05ea\u05d5\u05d1\u05ea \u05d0\u05d9\u05de\u05d9\u05d9\u05dc",n="\u05e1\u05d9\u05e1\u05de\u05d0",a="\u05d4\u05ea\u05d7\u05d1\u05e8\u05d5\u05ea"),Object(h.jsx)("div",{children:Object(h.jsxs)(j.a,{className:"signinForm",children:[Object(h.jsxs)(j.a.Group,{controlId:"formBasicEmail",children:[Object(h.jsx)(j.a.Label,{children:t}),Object(h.jsx)("p",{}),Object(h.jsx)(j.a.Control,{type:"text",placeholder:"Enter email",onChange:this.onEmailChange})]}),Object(h.jsxs)(j.a.Group,{controlId:"formBasicPassword",children:[Object(h.jsx)(j.a.Label,{children:n}),Object(h.jsx)("p",{}),Object(h.jsx)(j.a.Control,{type:"password",placeholder:"Password",onChange:this.onPasswordChange})]}),Object(h.jsx)(j.a.Group,{children:Object(h.jsx)(d.a,{variant:"primary",type:"submit",onClick:function(t){t.preventDefault(),e.onSubmitSignin()},children:a})})]})})}}]),n}(s.a.Component)),p=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).onEmailChange=function(e){a.setState({newEmail:e.target.value})},a.onUsernameChange=function(e){a.setState({newUserName:e.target.value})},a.onPasswordChange=function(e){a.setState({newPassword:e.target.value})},a.onPasswordAgainChange=function(e){a.setState({passwordAgain:e.target.value})},a.onSubmitRegister=function(){a.state.newPassword===a.state.passwordAgain&&fetch("https://toto-server.herokuapp.com/register",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a.state.newEmail,username:a.state.newUserName,password:a.state.newPassword})}).then((function(e){return e.json()})).then((function(e){var t=parseInt(e);console.log("register",t),a.props.onRegistration(t)})).catch((function(e){return console.log("register",e)}))},a.state={newEmail:"",newUserName:"",newPassword:"",passwordAgain:"",badSubmition:!1},a}return Object(c.a)(n,[{key:"render",value:function(){var e=this,t="Email address",n="User Name",a="Password",s="Please re-enter Password",r="Register";return"hebrew"===this.props.language&&(t="\u05db\u05ea\u05d5\u05d1\u05ea \u05d0\u05d9\u05de\u05d9\u05d9\u05dc",n="\u05e9\u05dd \u05de\u05e9\u05ea\u05de\u05e9 (\u05e6\u05d9\u05d1\u05d5\u05e8\u05d9)",a="\u05e1\u05d9\u05e1\u05de\u05d0",s="\u05d4\u05d6\u05e0\u05ea \u05d4\u05e1\u05d9\u05e1\u05de\u05d0 \u05d1\u05e9\u05e0\u05d9\u05ea",r="\u05d4\u05e8\u05e9\u05de\u05d4"),Object(h.jsx)("div",{children:Object(h.jsxs)(j.a,{className:"registerForm",children:[Object(h.jsxs)(j.a.Group,{controlId:"formBasicEmail",children:[Object(h.jsx)(j.a.Label,{children:t}),Object(h.jsx)(j.a.Control,{type:"email",placeholder:"Enter email",autocomplete:"email",onChange:this.onEmailChange})]}),Object(h.jsxs)(j.a.Group,{controlId:"formUsername",children:[Object(h.jsx)(j.a.Label,{children:n}),Object(h.jsx)(j.a.Control,{type:"text",placeholder:"Enter a unique user name (public)",autocomplete:"username",onChange:this.onUsernameChange})]}),Object(h.jsxs)(j.a.Group,{controlId:"formBasicPassword",children:[Object(h.jsx)(j.a.Label,{children:a}),Object(h.jsx)(j.a.Control,{type:"password",placeholder:"Password",autocomplete:"new-password",onChange:this.onPasswordChange})]}),Object(h.jsxs)(j.a.Group,{controlId:"formBasicPassword",children:[Object(h.jsx)(j.a.Label,{children:s}),Object(h.jsx)(j.a.Control,{type:"password",placeholder:"Password (again)",autocomplete:"new-password",onChange:this.onPasswordAgainChange})]}),Object(h.jsx)(j.a.Group,{children:Object(h.jsx)(d.a,{variant:"primary",type:"submit",onClick:function(){return e.onSubmitRegister()},children:r})})]})})}}]),n}(s.a.Component),m=n(7),O=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).eventsHandler=function(e){switch(e){case"english":case"hebrew":a.props.changeLanguage(e),a.setState({language:e});break;case"register":a.setState({register:!0});break;case"login":case"about":a.setState({register:!1});break;default:a.setState({register:!1})}},a.state={register:!1,language:a.props.language,userID:0},a}return Object(c.a)(n,[{key:"render",value:function(){var e=this,t=Object(h.jsx)(b,{onRegistration:function(t){return e.setState({userID:t})},language:this.state.language});this.state.register&&(t=Object(h.jsx)(p,{onRegistration:function(t){return e.setState({userID:t})},language:this.state.language})),0!==this.state.userID&&this.props.validLogin(parseInt(this.state.userID));var n="About",a="Register",s="Log In",r="signinPage English";return"hebrew"===this.state.language&&(n="\u05d0\u05d5\u05d3\u05d5\u05ea",a="\u05d4\u05e8\u05e9\u05de\u05d4",s="\u05db\u05e0\u05d9\u05e1\u05d4 \u05dc\u05d7\u05e9\u05d1\u05d5\u05df",r="signinPage Hebrew"),Object(h.jsxs)("div",{className:r,children:[Object(h.jsxs)(m.a,{onSelect:function(t){return e.eventsHandler(t)},children:[Object(h.jsx)(m.a.Item,{children:Object(h.jsx)(m.a.Link,{eventKey:"english",children:"English"})}),Object(h.jsx)(m.a.Item,{children:Object(h.jsx)(m.a.Link,{eventKey:"hebrew",children:"\u05e2\u05d1\u05e8\u05d9\u05ea"})}),Object(h.jsx)(m.a.Item,{children:Object(h.jsx)(m.a.Link,{eventKey:"about",children:n})}),Object(h.jsx)(m.a.Item,{children:Object(h.jsxs)(m.a.Link,{eventKey:"register",children:[a," "]})}),Object(h.jsx)(m.a.Item,{children:Object(h.jsx)(m.a.Link,{eventKey:"login",children:s})})]}),Object(h.jsx)("div",{}),t,Object(h.jsx)("div",{})]})}}]),n}(s.a.Component),f=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={userID:0,language:"english"},a}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return 0!==this.state.userID?Object(h.jsx)(g,{user:this.state.userID,logOut:function(){e.setState({userID:0})},language:this.state.language}):Object(h.jsx)(O,{validLogin:function(t){e.setState({userID:t})},changeLanguage:function(t){e.setState({language:t})}})}}]),n}(s.a.Component),w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,32)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),s(e),r(e),i(e)}))};i.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(f,{})}),document.getElementById("root")),w()}},[[31,1,2]]]);
//# sourceMappingURL=main.1854b743.chunk.js.map