import { Accordion } from '@flat101/componentes';
import './App.css';

import { PromotionTable } from './components/Table/PromotionTable';

function App() {
  return (
    <div className="App ">
      <PromotionTable />

      <Accordion label="Búsqueda Avanzada" size="M" type="simple">
        <p>Child Content</p>
      </Accordion>
    </div>
  );
}

export default App;
