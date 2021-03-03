// Using ::before in shell code block but only allow to select text
var ShellPreElements = document.querySelectorAll("pre code[data-lang=\"shell\"]");
if (ShellPreElements != null) {
  for (pre of ShellPreElements) {
    pre.innerHTML="<span class='line'>"+(pre.textContent.split("\n").filter(Boolean).join("</span>\n<span class='line'>"))+"</span>";
  }
}

// Replace "Table of contents" with a simple icon
var TocHeading = document.querySelector(".ox-hugo-toc .heading");
if (TocHeading != null) {
  TocHeading.innerHTML = "<i class=\"fa fa-indent fa-fw\" aria-hidden=true></i>";
}
