
import React, { useState } from 'react';

export default function Login({ onLogin }){
  const [role,setRole] = useState('manager');
  const [phone,setPhone]=useState('');
  const [name,setName]=useState('');

  function submit(e){
    e.preventDefault();
    // In production: call backend auth API -> return token + user
    const mock = { id:1, name: name || 'Usman', role };
    onLogin(mock);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login — Aamir Inventory</h2>
        <div className="mb-3">
          <label className="block text-sm">Role</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full border p-2 rounded">
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-sm">Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border p-2 rounded"/>
        </div>
        <div className="mb-3">
          <label className="block text-sm">Phone (WhatsApp)</label>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full border p-2 rounded"/>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
