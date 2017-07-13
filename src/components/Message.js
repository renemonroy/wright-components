import Component from '../utils/Component';
import animated from '../decorators/animate';

class Message extends Component {
  constructor(data) {
    super(data);
    this.$title = this.element.getElementsByClassName('ui-message-title')[0];
    this.$description = this.element.getElementsByClassName('ui-message-description')[0];
    this.element.style.display = 'none';
    this.element.style.opacity = 0;
  }

  get template() {
    const { title, description } = this.data;
    return `
      <div class="ui-message">
        <h3 class="ui-message-title">${title}</h3>
        <p>${description}</p>
      </div>
    `;
  }
}

export default animated(Message);
