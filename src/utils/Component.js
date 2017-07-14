const getFirstDiv = el => (
  el.content.querySelector('div')
);

class UIComponent {
  constructor(data = {}) {
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
    this._isShadowTemplate = temp.firstChild.tagName === 'TEMPLATE';
    this.shadowElement = this._isShadowTemplate ? temp.firstChild.content : null;
    this.element = this._isShadowTemplate ? getFirstDiv(temp.firstChild) : temp.firstChild;
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
    return this.children.get(component.data.key);
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
    const el = this._isShadowTemplate ? this.shadowElement : this.element;
    switch (position) {
      case 'beforebegin':
        element.parentNode.insertBefore(el, element);
        break;
      case 'afterbegin':
        element.insertBefore(el, element.firstChild);
        break;
      case 'afterend':
        element.parentNode.insertBefore(el, element.nextSibling);
        break;
      default:
        element.appendChild(el);
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
