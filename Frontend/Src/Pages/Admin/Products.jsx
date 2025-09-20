
import React, { useEffect, useState } from 'react';
import { api } from '../../api';

export default function Products(){
  const [products,setProducts]=useState([]);
  useEffect(()=> {
    api.get('/products').then(r=>setProducts(r.data)).catch(()=> {
      setProducts([
        {id:1,name:'HTZ 12V Battery',type:'Battery',price:4200,stock:20},
        {id:2,name:'70cc Bike',type:'Bike',price:55000,stock:5}
      ]);
    });
  },[]);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Products</h3>
        <button className="px-3 py-1 bg-green-600 text-white rounded">Add New</button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map(p=>(
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{p.name}</h4>
                <p className="text-xs text-gray-500">{p.type}</p>
              </div>
              <div className="text-right">
                <p>₨ {p.price}</p>
                <p className="text-sm">Stock: {p.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
