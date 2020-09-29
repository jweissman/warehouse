import React, { useState } from 'react';
import './AddCategory.css';
export function AddCategory({ categories, onSubmit }: { categories: string[], onSubmit: (newCategoryName: string) => void; }) {
  const [categoryName, setCategoryName] = useState('');
  return <div className="AddCategory">
    <b>Create New Category</b>
    <br />
    Name:&nbsp;
    <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
    {categories.indexOf(categoryName) !== -1 && <div style={{color: 'red'}}>The category {categoryName} already exists!</div>}
    <button
      onClick={() => { setCategoryName(''); onSubmit(categoryName) }}
      disabled={!categoryName || categories.indexOf(categoryName) !== -1}>
      Create Category
        </button>
  </div>;
}
