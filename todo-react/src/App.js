import './App.css';
import Favorite from './pages/Favorite';
import MyAccount from './pages/MyAccount';
import MyTasks from './pages/MyTasks';
import ToDoApp from './components/ToDoApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ToDoApp />}>
            <Route path='/tasks' element={<MyTasks />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/me' element={<MyAccount />} />
            <Route path='*' element={<h2 className='text-center rounded-2 shadow mx-auto text-bg-danger w-50 p-5 my-5'>Page Not Found 404</h2>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;