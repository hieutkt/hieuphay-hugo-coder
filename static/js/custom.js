// Dropcaps
var DropcapLine = document.querySelector("article > div > p:first-of-type");
// no dropcap if the first <p> is after an heading
var DropcapLinePrevHeadingSibling = (DropcapLine != null) ? DropcapLine.previousElementSibling : null;
if (DropcapLinePrevHeadingSibling != null) {
  if (DropcapLinePrevHeadingSibling.tagName.toLowerCase().startsWith("h")) {
    DropcapLinePrevHeadingSibling = null;
  }
}
if (DropcapLine != null & DropcapLinePrevHeadingSibling != null & DropcapLine.innerText.length > 100) {
  var split = DropcapLine.innerHTML.split(" ");
  var DropcapWord = split[0];
  var DropcapRest = split.slice(1,split.length).join(" ");
  var DropcapMatch = /^(["']?.)(.*)$/.exec(DropcapWord);
  var DropcapChar = DropcapMatch[1];
  var DropcapCharRest = DropcapMatch[2];
  DropcapLine.innerHTML = "<span role='text'><span aria-hidden='true'><span class='dropcap'>"
    +DropcapChar+"</span>"+DropcapCharRest+"</span><span class='visually-hidden'>" + DropcapWord
    +"</span></span> " + DropcapRest;
}

// Auto resize iframes
window.onload = function(e) {
  var iframes = document.querySelectorAll("article > div iframe");
  // Resize all iframes to its contents:
  for( var i = 0; i < iframes.length; i++) {
    iframes[i].width  = iframes[i].contentWindow.document.body.scrollWidth;
    iframes[i].height = iframes[i].contentWindow.document.body.scrollHeight;
    iframes[i].scrolling = "no";
  }
};

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
