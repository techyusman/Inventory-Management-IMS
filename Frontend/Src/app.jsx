
import React, { useState } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManagerDashboard from './pages/Manager/ManagerDashboard';

export default function App(){
  const [user, setUser] = useState(null); // { id, name, role }
  if(!user) return <Login onLogin={setUser} />;

  if (user.role === 'admin') return <AdminDashboard user={user} onLogout={()=>setUser(null)} />;
  return <ManagerDashboard user={user} onLogout={()=>setUser(null)} />;
}
