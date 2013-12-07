/* Copyright (C) 1998-2013 by Northwoods Software Corporation. All Rights Reserved. */

// Traverse the whole document and replace <a>TYPENAME</a> with:
//    <a href="../api/symbols/TYPENAME.html">TYPENAME</a>
// and <a>TYPENAME.MEMBERNAME</a> with:
//    <a href="../api/symbols/TYPENAME.html#MEMBERNAME">TYPENAME.MEMBERNAME</a>
function goDoc() {
  _traverseDOM(document);
  // add standard footer
  var ftr = document.createElement("div");
  ftr.className = "footer";
  var msg = "Copyright &copy; 1998-2013 by Northwoods Software Corporation.";
  if (go && go.version) {
    msg = "GoJS&reg; version " + go.version + ". " + msg;
  }
  ftr.innerHTML = msg;
  document.body.appendChild(ftr);
}

function _traverseDOM(node) {
  if (node.nodeType === 1 && node.nodeName === "A" && !node.getAttribute("href")) {
    var text = node.innerHTML.split(".");
    if (text.length === 1) {
      node.setAttribute("href", "../api/symbols/" + text[0] + ".html");
      node.setAttribute("target", "api");
    } else if (text.length === 2) {
      // static method or not:
      if (go[text[0]] && go[text[0]][text[1]] && !go[text[0]]['prototype'][text[1]]) {
        node.setAttribute("href", "../api/symbols/" + text[0] + ".html" + "#." + text[1]);
      } else {
        node.setAttribute("href", "../api/symbols/" + text[0] + ".html" + "#" + text[1]);
      }

      node.setAttribute("target", "api");
    } else {
      alert("Unknown API reference: " + node.innerHTML);
    }
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    _traverseDOM(node.childNodes[i]);
  }
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1506307-5']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
