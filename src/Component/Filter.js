import React from 'react'
import './Filter.css' 
export default function Filter({filter,handleFilterChange}) {
  return (
    <div>
      
      <select className='filter' value={filter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
    </div>
  );
};