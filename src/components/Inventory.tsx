import React, { useState } from 'react';
import { ItemPresenter } from './ItemPresenter';
import './Inventory.css';
import { AddItem } from './AddItem';
import { Report } from './Report';
import { initialItems } from '../helpers/initialItems';
import { uniq } from '../helpers/uniq';
import shortid from 'shortid';
import { Item } from '../types';
import { AddCategory } from './AddCategory';

const initialCategories = uniq(initialItems.map(item => item.category))

export function Inventory() {
  const [state, setState] = useState({ items: initialItems, selectedCategory: '', categories: initialCategories });
  let items = state.items;
  const setItems = (items: Item[]) => setState({ ...state, items });
  const selectedCategory = state.selectedCategory;
  const setSelectedCategory = (category: string) => { setState({ ...state, selectedCategory: category })}; 
  const categories = state.categories;
  const setCategories = (categories: string[]) => setState({ ...state, categories });

  let filteredItems = items.sort((a, b) => a.id > b.id ? -1 : 1);
  if (selectedCategory) {
    filteredItems = filteredItems.filter(item => item.category === selectedCategory);
  }
  return <div className="Inventory">
    <div className="Inventory-Categories">
      <b>Categories:</b>
      &nbsp;
      <div className="Inventory-Category" onClick={() => setSelectedCategory('')}>all</div>
      &nbsp;
      {categories.map(category => <div key={category}
        className="Inventory-Category"
        onClick={() => setSelectedCategory(category)}>{category}&nbsp;</div>)
      }
    </div>
 
    Displaying {filteredItems.length} item(s) {!!selectedCategory && `in category ${selectedCategory}`}:

    {!!selectedCategory && <div onClick={() => {
      let updatedItems = items.filter(item => item.category !== selectedCategory)
      setState({
        items: updatedItems,
        categories: categories.filter(category => category !== selectedCategory),
        selectedCategory: '',
      });
    }} style={{ color: 'red', cursor: 'pointer' }}>
      Delete category <b>{selectedCategory}</b> ({filteredItems.filter(item => item.category === selectedCategory).length} items will be deleted)
      </div>}

    <div className="Inventory-Items">
      {filteredItems.map(item => <ItemPresenter it={item} key={item.id}
        onUpdate={(updatedItem) => setItems([ ...items.filter(it => it.id !== item.id), updatedItem ])}
        onDelete={() => setItems(items.filter(it => it.id !== item.id))}
        onClone={() => setItems([...items, { ...item, id: shortid.generate() } ])}
      />)}
    </div>
    <div className="Inventory-Footer">
      <Report items={filteredItems} />
      <AddItem onSubmit={newItem => setItems([ ...items, newItem ])} categories={categories} />
      <AddCategory categories={categories} onSubmit={newCategory => setCategories([ ...categories, newCategory ])} />
    </div>
  </div>;
}
