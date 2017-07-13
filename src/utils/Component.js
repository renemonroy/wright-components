const getFirstDiv = el => (
  el.content.querySelector('div')
);

class UIComponent {
  constructor(data = {}, isShadowTemplate = false) {
    const defaultData = {
      key: null,
    };
    let temp = document.createElement('div');
    if (!data.key) {
      throw new Error('All components need a \'key\'');
    }
    this.children = new Map();
    this.parent = null;
    this.data = Object.assign({}, defaultData, data);
    temp.insertAdjacentHTML('afterbegin', this.template.trim());
    this.element = isShadowTemplate ? getFirstDiv(temp.firstChild) : temp.firstChild;
    temp = null;
  }

  setParent(parent) {
    this.parent = parent;
  }

  addChild(component) {
    if (component.parent) {
      component.parent.removeChild(component);
    }
    this.children.set(component.data.key, component);
    component.setParent(this);
    return this;
  }

  removeChild(childRef) {
    if (this.children.has(childRef)) {
      this.children.get(childRef).parent = null;
      this.children.delete(childRef);
    }
    return this;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
    this.children.forEach((component) => {
      component.destroy();
    });
    if (this.parent) {
      this.parent.removeChild(this.data.key);
    }
    this.element = null;
    this.data = null;
    this.children = null;
    return null;
  }

  render(element, position) {
    switch (position) {
      case 'beforebegin':
        element.parentNode.insertBefore(this.element, element);
        break;
      case 'afterbegin':
        element.insertBefore(this.element, element.firstChild);
        break;
      case 'afterend':
        element.parentNode.insertBefore(this.element, element.nextSibling);
        break;
      default:
        element.appendChild(this.element);
        break;
    }
    return this;
  }

  get template() {
    console.log(this.data);
    return '<div></div>';
  }
}

export default UIComponent;
