import React, { useState } from 'react';
import { Item } from '../types';

export function EditableItem({ initialItem, onSubmit }: { initialItem: Item; onSubmit: (item: Item) => void; }) {
  const [item, updateItem] = useState(initialItem);

  return <div className="Item">
    <input type='text' value={item.name} onChange={e => updateItem({
      ...item,
      name: e.target.value
    })} />
    (editing)
    <hr />
    <span className='Note'>({initialItem.category})</span>
    {item.attributes.map((attribute) => <div className="Item-Attribute" key={attribute.id}>
      <b>{attribute.name}:</b>
      &nbsp;
      <input type='text' value={attribute.value} style={{ maxWidth: '50px' }} onChange={e => {
        const updatedAttr = { ...attribute, value: e.target.value };
        if (attribute.kind === 'number') { updatedAttr.value = (updatedAttr.value as string).replace(/\D/, ''); }
        let updatedAttributes = item.attributes.map((attr) => attribute.id === attr.id ? updatedAttr : attr);
        updateItem({ ...item, attributes: updatedAttributes });
      }} />
      &nbsp;
      <span className="Note">({attribute.kind})</span>
    </div>)}
    <br />
    <div className="Note">ID {item.id}</div>
    <button onClick={() => onSubmit(item)}>Save</button>
  </div>;
}
