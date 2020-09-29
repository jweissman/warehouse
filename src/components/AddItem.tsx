import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import shortid from 'shortid';

import { Attribute, AttributeKind, Item } from '../types';
import './AddItem.css';

const newAttribute: () => Attribute = () => { return { id: shortid.generate(), name: 'Name', value: 'Value', kind: 'string' }}

function AttributeList({ attributes, setAttributes }: { attributes: Attribute[], setAttributes: (attrs: Attribute[]) => void}) {
  return <div className="AttributeList">
    Attributes:
    {attributes.map((attr) =>
    <div className="AddItem-Attribute" key={attr.id}>
        <input type='text' value={attr.name} onChange={e => {
          const updatedAttr = { ...attr, name: e.target.value };
          setAttributes(attributes.map((attribute) => attribute.id === attr.id ? updatedAttr : attribute));
        }} />:&nbsp;
      <input type='text' value={attr.value} onChange={e => {
          const updatedAttr = { ...attr, value: e.target.value };
          if (attr.kind === 'number') { updatedAttr.value = (updatedAttr.value as string).replace(/\D/, ''); }
          setAttributes(attributes.map((attribute) => attribute.id === attr.id ? updatedAttr : attribute));
        }} />
      &nbsp;with type&nbsp;
      <div className="AddItem-AttributeKind" style={{ display: 'inline-block' }}>
          <Dropdown options={['number', 'string']}
            value={attr.kind}
            onChange={e => {
              const updatedAttr: Attribute = { ...attr, kind: e.value as AttributeKind };
              if (e.value === 'number') { updatedAttr.value = (updatedAttr.value as string).replace(/\D+/, ''); }
              setAttributes(attributes.map((attribute) => attribute.id === attr.id ? updatedAttr : attribute));
            }} />
        </div>
      </div>
    )}
    <br />
    <button onClick={e => {
      let updated = [...attributes, newAttribute()]
      setAttributes(updated);
    }}>(+) Add Attribute</button>
  </div>
}

export const newItem: Item = {
  id: 'new-item-id',
  name: 'My New Item',
  category: '',
  attributes: []
}
export function AddItem({ categories, onSubmit }: { categories: string[], onSubmit: (it: Item) => void; }) {
  newItem.category = categories[0];
  const [item, updateItem] = useState(newItem);
  return <div className="AddItem">
    <b>Create New Item</b>
    <br />
      Name:
      &nbsp;
      <input type='text' value={item.name} onChange={e => updateItem({
      ...item,
      name: e.target.value
    })} />
    <br />
    Category:
    &nbsp;
    <Dropdown options={categories}
      value={item.category}
      onChange={e => updateItem({ ...item, category: e.value })} />
    <br />
    <AttributeList attributes={item.attributes} setAttributes={newAttrs => updateItem({ ...item, attributes: newAttrs })} />
    <button onClick={() => onSubmit({ ...item, id: shortid.generate() })}>Create Item</button>
  </div>;
}
