import Animation from '../utils/Animation';
import decorate from '../utils/decorate';
import spring from '../utils/spring';

export default decorate({

  animate(defaultStyle, style, handleUpdate, handleRest) {
    if (this.animation) {
      this.animation.stop();
    }
    this.animation = new Animation({ style, defaultStyle });
    this.animation.on('update', handleUpdate);
    this.animation.on('rest', handleRest);
    this.animation.start();
    return this;
  },

  fadeIn(el = this.parent.element, v = [199, 24]) {
    const s = this.element.style;
    const defaultStyle = { opacity: 0 };
    const style = { opacity: spring(1, { stiffness: v[0], damping: v[1] }) };
    const onUpdate = ({ opacity }) => { s.opacity = opacity; };
    const onRest = () => { this.animation.stop(); };
    this.render(el);
    s.display = 'block';
    this.animate(defaultStyle, style, onUpdate, onRest);
    return this;
  },

  fadeOut(v = [199, 24]) {
    const s = this.element.style;
    const defaultStyle = { opacity: 1 };
    const style = { opacity: spring(0, { stiffness: v[0], damping: v[1] }) };
    const onUpdate = ({ opacity }) => { s.opacity = opacity; };
    const onRest = () => { s.display = 'none'; this.animation.stop(); this.destroy(); };
    this.animate(defaultStyle, style, onUpdate, onRest);
    return this;
  },

});
