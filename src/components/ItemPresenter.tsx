import React, { useState } from 'react';
import { Item } from '../types';
import { EditableItem } from './EditableItem';
import './Item.css';

export function ItemPresenter({ it, onDelete, onUpdate, onClone }: { it: Item, onDelete: Function, onUpdate: (updated: Item) => void, onClone: Function }) {
  const [editing, setEditing] = useState(false); 
  return !editing ? <div className="Item">
    <b>{it.name}</b> 
    <div className='Note' onClick={()=>setEditing(true)} style={{cursor: 'pointer'}}>(edit)</div>
    <hr/>
    <span className='Note'>({it.category})</span>
    {it.attributes.map((attribute) => <div className="Item-Attribute" key={attribute.id}>
      <b>{attribute.name}:</b> {attribute.value}
      &nbsp;
      <span className='Note'>({attribute.kind})</span>
    </div>)}
    <br/>
    <div className='Note'>ID {it.id}</div>

    <div style={{ fontSize: '9px', cursor: 'pointer' }} onClick={()=>onClone()}>Clone {it.name}</div>
    <hr/>
    <div style={{ color: 'red', fontSize: '9px', cursor: 'pointer' }} onClick={()=>onDelete()}>Delete {it.name}</div>
  </div> : <EditableItem initialItem={it} onSubmit={(updatedItem)=>{ setEditing(false); onUpdate(updatedItem) }} />;
}
