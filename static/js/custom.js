// Auto resize iframes
function resizeIframe(obj) {
  obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 50 + 'px';
}
var Iframes = document.querySelectorAll(".content .iframe-container > iframe");
for (iframe of Iframes) {
  iframe.setAttribute("onload", "resizeIframe(this)");
  iframe.setAttribute("frameBorder", "0");
}

// Using ::before in shell code block but only allow to select text
var ShellPreElements = document.querySelectorAll("pre code[data-lang=\"shell\"]");
if (ShellPreElements != null) {
  for (pre of ShellPreElements) {
    pre.innerHTML="<span class='line'>"+(pre.textContent.split("\n").filter(Boolean).join("</span>\n<span class='line'>"))+"</span>";
  }
}

// Replace "Table of contents" with a simple icon
var TocDiv = document.querySelector(".ox-hugo-toc");
var TocHeading = document.querySelector(".ox-hugo-toc .heading");
var TocContent = document.querySelector(".ox-hugo-toc > ul");

if (TocDiv != null) {
  TocHeading.innerHTML = "<i class=\"fa fa-indent fa-fw\" aria-hidden=true></i>";
  TocHeading.addEventListener("click", toggleToC);
  TocContent.classList.add("toc_collapse");
  // Get the offset position of the navbar
  var sticky_offset = TocHeading.offsetTop;
  // When the user scrolls the page, execute myFunction
  window.onscroll = function() {myFunction()};
}

function toggleToC() {
    if (TocContent.classList.contains("toc_collapse")) {
      TocContent.classList.remove("toc_collapse");
      TocHeading.classList.add("toc_active")
    } else {
      TocContent.classList.add("toc_collapse");
      TocHeading.classList.remove("toc_active");
    }
}

// Add the sticky class to the header when you reach its scroll position.
// Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky_offset) {
    TocDiv.classList.add("toc_sticky");
    TocContent.classList.add("toc_collapse");
    TocHeading.classList.remove("toc_active");
  } else {
    TocDiv.classList.remove("toc_sticky");
  }
}
