import React from 'react';
import Book from './components/Book';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';

import { fas } from '@fortawesome/free-solid-svg-icons'; // Solid icons (fas)
import { far } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Swal from 'sweetalert2';

library.add(fas, far);

function App() {
  return (
    <div className="App">
      <Book />
    </div>
  );
}

export default App;
