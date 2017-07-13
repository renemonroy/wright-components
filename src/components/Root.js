import Component from '../utils/Component';

class Root extends Component {
  get template() { // eslint-disable-line class-methods-use-this
    return `
      <template id="wright-interface">
        <style>@import url('static/wright-interface.css')</style>
        <div id="root"></div>
      </template>
    `;
  }
}

export default Root;
