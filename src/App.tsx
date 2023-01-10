/* eslint-disable no-unused-vars */
import './App.css';
import { BasicTable } from './components/Table/01BasicTable/BasicTable';
import { VisibleTable } from './components/Table/02VisibleTable/VisibleTable';
import { OrderTable } from './components/Table/03OrderTable/OrderTable';
import { FiltersTable } from './components/Table/04FiltersTable/FiltersTable';

import { PinnedTable } from './components/Table/PinnedTable/PinnedTable';

function App() {
  return (
    <div className="App">
      {/* <div className="promotion-table-container">
        <PinnedTable />
      </div> */}
      {/*  <div className="promotion-table-container">
        <BasicTable />
      </div> */}
      {/* <VisibleTable /> */}
      {/* <OrderTable /> */}
      <FiltersTable />
    </div>
  );
}

export default App;
