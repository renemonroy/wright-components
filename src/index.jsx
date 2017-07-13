import Root from './components/Root';
import Message from './components/Message';

const $wrightInterface = document.createElement('wright-interface');
const shadowHost = $wrightInterface.attachShadow({ mode: 'open' });
document.documentElement.appendChild($wrightInterface);

const app = new Root({ key: 'root' }, true).render(shadowHost);

app.addChild(new Message({
  key: 'msg',
  title: 'Inject',
  description: 'New injections were done.',
}));

app.children.get('msg').fadeIn();

setTimeout(() => {
  app.children.get('msg').fadeOut();
  setTimeout(() => {
    console.log(app);
  }, 2000);
}, 2000);
