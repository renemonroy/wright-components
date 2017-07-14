import Component from '../utils/Component';
import spring from '../utils/spring';
import animated from '../decorators/animate';

const initialY = -100;
const destY = 0;

class Message extends Component {
  constructor(data) {
    super(data);
    this.$title = this.element.getElementsByClassName('ui-message-title')[0];
    this.$description = this.element.getElementsByClassName('ui-message-description')[0];
    this.element.style.display = 'none';
  }

  show(el = this.parent.element, st = [325, 28]) {
    const s = this.element.style;
    const defaultStyle = { y: initialY };
    const style = { y: spring(destY, { stiffness: st[0], damping: st[1] }) };
    const onUpdate = ({ y }) => { s.transform = `translate3d(0, ${y}%, 0)`; };
    const onRest = () => { this.animation.stop(); setTimeout(() => { this.hide(); }, 1500); };
    this.render(el);
    s.display = 'block';
    this.animate(defaultStyle, style, onUpdate, onRest);
    return this;
  }

  hide(st = [325, 28]) {
    const s = this.element.style;
    const defaultStyle = { y: destY };
    const style = { y: spring(initialY, { stiffness: st[0], damping: st[1] }) };
    const onUpdate = ({ y }) => { s.transform = `translate3d(0, ${y}%, 0)`; };
    const onRest = () => { s.display = 'none'; this.animation.stop(); this.destroy(); };
    this.animate(defaultStyle, style, onUpdate, onRest);
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
