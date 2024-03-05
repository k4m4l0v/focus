import { Header } from './components/Header';
import { Timer } from './components/Timer';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import './styles/style.css';
import { useContext } from 'react';
import { Context } from '.';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const {store} = useContext(Context);

  return (
    <section className='main'>
      <Header />
      <Timer />
      {store.task ?
        <div className='focus-time'>{store.task}</div>
        :
        <div className='focus-time'>It's time to focus!</div>
      }
      <TaskList />
    </section>
  );
})

export default App;
