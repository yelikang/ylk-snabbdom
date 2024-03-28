import { init, h } from "../../build/index.js";

const patch = init([]);

const renderVnode = (_list) => {
  const list = _list
    ? _list
    : [
        {
          name: "one"
        },
        {
          name: "two"
        },
        {
          name: "tree"
        }
      ];
  return h("div.list", {}, [
    h(
      "ul.list__items",
      {},
      list.map((item) => h("li", {}, item.name))
    )
  ]);
};

const app = document.getElementById("app");
let vnode = patch(app, renderVnode());

document.getElementById("btn").addEventListener("click", update);
function update() {
  // vue 也是每次data变化，调用updateComponent中的vm._render()方法，生成新的vnode，然后patch(prevVnode, newVnode)
  const newVnode = renderVnode([{ name: new Date().getTime() }]);
  vnode = patch(vnode, newVnode);
}
