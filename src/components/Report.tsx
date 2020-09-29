import React from 'react';
import { Attribute, Item } from '../types';
import { uniq } from '../helpers/uniq';


export function Report({ items }: { items: Item[]; }) {
  const numericAttrNames = uniq(items.flatMap(item => item.attributes).filter(attr => attr.kind === 'number').map(attr => attr.name));
  return <div className='Report' style={{border: '1px solid gray', backgroundColor: 'white', color: 'black' }}>
    <u>Summaries of Numeric Attributes</u> ({numericAttrNames.length} found):
      {numericAttrNames.map(attrName => {
      let matchingAttributes: Attribute[] = items
        .filter(item => item.attributes.find(attr => attr.name === attrName))
        .map(item => item.attributes.find(attr => attr.name === attrName)) as Attribute[];
      return <div key={attrName}>{attrName}: {matchingAttributes.map(attr => Number(attr.value)).reduce((acc, cur) => acc + cur, 0)}</div>;
    })}
  </div>;
}
