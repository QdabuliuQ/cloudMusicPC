

export default function(dom: HTMLElement, offset: number) {
  window.scrollTo(0, dom.offsetTop - 55 + offset);
}