function setSVGColor(e, color) {
  if (e.target.attributes.fill) {
    e.target.setAttribute("fill", color);
  } else if (e.target.attributes.xmlns) {
    e.target.children[0].setAttribute("fill", color);
  }
}

addEventListener("mouseover", (e) => setSVGColor(e, "#00ADB5"));

addEventListener("mouseout", (e) => setSVGColor(e, "#ffffff"));


