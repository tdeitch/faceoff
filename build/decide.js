window.onload=function(){var m=window.document,j=m.body;function i(r){return m.getElementById(r)}function d(r){return m.createElement(r)}function a(r){return m.createTextNode(r)}function k(r){if(r.innerText){return r.innerText}if(r.textContent){return r.textContent}return""}function f(r,s){r.appendChild(s)}function b(s,r,t){s.setAttribute(r,t)}function e(s,r){return s.getElementsByTagName(r)}if(!window.localStorage){i("add_note").innerHTML="Browser does not support local storage.";return}var h=i("notes"),l=i("note_form"),p=i("links");function o(s,t){var r=d("li");f(r,a(t));b(r,"id","note_"+s);h.insertBefore(r,i("add_note"))}function c(){for(var r=0;r<localStorage.length;r++){var s=localStorage.getItem(r);o(r,s)}}function q(s){var r=localStorage.length;localStorage.setItem(r,s);o(r,s)}l.onsubmit=function(){var r=i("add_note_input").value;if(r){q(r);i("add_note_input").value=""}return false};function g(t,r,u){var s=d("a");b(s,"href","");s.className="delete";f(s,a("x"));b(s,"title","Delete this todo item");s.onclick=function(){var v=parseInt(r.children[0].id.substr(6),10);r.id="todeleteli";var x=i("note_"+v);x.id="todeletenote";for(var w=v+1;w<localStorage.length;w++){localStorage.setItem(w-1,localStorage.getItem(w));m.getElementById("input_"+w).id="input_"+(w-1);m.getElementById("note_"+w).id="note_"+(w-1)}localStorage.removeItem(localStorage.length-1);t.removeChild(r);x.parentNode.removeChild(x);return false};return s}i("edit").onclick=function(){p.className="hidden";l.className="hidden";var y=d("form"),t=d("ul"),x=d("input"),u=d("a");b(y,"id","edit_form");b(x,"type","submit");x.value="Save";b(u,"href","");f(u,a("Cancel"));f(y,t);var z=e(h,"li");for(var w=0;w<z.length;w++){var s=z[w].id;if(s!="add_note"){var r=Number(s.substring("note_".length)),B=d("li"),A=d("input");b(A,"id","input_"+r);A.value=z[w].innerText;var C=g(t,B,r);f(B,A);f(B,C);f(t,B)}}f(y,x);f(y,a(" or "));f(y,u);f(j,y);function v(){p.className="";l.className="";j.removeChild(y)}u.onclick=function(){v();return false};y.onsubmit=function(){var D=m.querySelectorAll('*[id^="input_"]');for(var G=0;G<D.length;G++){var E=D[G];var H=E.id.substr(6,E.id.length);var F=parseInt(H,10);localStorage.setItem(F,E.value);i("note_"+H).innerText=E.value}v();return false};return false};function n(s,r){if(r>=localStorage.length){i("decision").innerHTML="And the winner is...<br><br><b>"+localStorage.getItem(s)+"</b>"}else{i("decision").innerHTML='<a href="#" id="choiceOne">'+localStorage.getItem(s)+'</a><br><br>OR<br><br><a href="#" id="choiceTwo">'+localStorage.getItem(r)+"</a>";i("choiceOne").onclick=function(){n(s,r+1)};i("choiceTwo").onclick=function(){n(r,r+1)}}}i("go-button").onclick=function(){l.className="hidden";n(0,1)};c()};