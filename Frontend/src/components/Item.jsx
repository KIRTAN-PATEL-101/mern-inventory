// ItemList.js

import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import SidePanel from './SidePanel';

function ItemList() {
  return (
    <div className="flex">
      <SidePanel />
      <section id="content" className="relative w-full ml-72 transition-all">
        <Header />
      <main>
        <section className="Item">
          <div id="item-box-1" className="item-view-box hidden"></div>
          <div id="Item-list">
            <h1 className="text-2xl mb-4">Items</h1>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Owner</th>
                  <th className="px-4 py-2">Created date</th>
                  <th className="px-4 py-2">Inventory Name</th>  
                  <th className="px-4 py-2">Quantity left</th>
                  <th className="px-4 py-2">In stock</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* Table rows */}
                </tr>
                {/* Additional table rows */}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </section>
    </div>
  );
}

export default ItemList;
