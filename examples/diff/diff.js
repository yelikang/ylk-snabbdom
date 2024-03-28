import { init, h } from "../../build/index.js";

const patch = init([]);

const defaultList = [
  {
    name: "one",
    key:'1'
  },
  {
    name: "two",
    key:'2'
  },
  {
    name: "tree",
    key:'3'
  }
];

const renderVnode = (_list) => {
  const list = _list ? _list : defaultList;
  return h("div.list", {}, [
    h(
      "ul.list__items",
      {
        hook: {
          update(oldVnode, vnode) {
            console.log("update", oldVnode, vnode);
          }
        }
      },
      list.map((item) => h("li", {
        key: item.key
      }, item.name))
    )
  ]);
};

const app = document.getElementById("app");
let vnode = patch(app, renderVnode());

document.getElementById("btn").addEventListener("click", update);
function update() {
  // vue 也是每次data变化，调用updateComponent中的vm._render()方法，生成新的vnode，然后patch(prevVnode, newVnode)
  //   const newVnode = renderVnode([{ name: new Date().getTime() }]);

  const newVnode = renderVnode([
    {
      name: "one",
      key:'1'
    },
    {
      name: "tree",
      key:'3'
    }
  ]);

  vnode = patch(vnode, newVnode);
}
