import shortid from "shortid";
import { Item } from "../types";

export const initialItems: Item[] = [
  {
    id: shortid.generate(),
    name: 'Suzuki Aerio',
    category: 'vehicle',
    attributes: [
      { id: shortid.generate(), name: 'Make', value: 'Suzuki', kind: 'string' },
      { id: shortid.generate(), name: 'Axle Count', value: 2, kind: 'number' },
      { id: shortid.generate(), name: 'Seats', value: 4, kind: 'number' }
    ]
  },
  {
    id: shortid.generate(),
    name: 'Mack Truck',
    category: 'vehicle',
    attributes: [
      { id: shortid.generate(), name: 'Make', value: 'Mack', kind: 'string' },
      { id: shortid.generate(), name: 'Axle Count', value: 4, kind: 'number' },
      { id: shortid.generate(), name: 'Seats', value: 2, kind: 'number' }
    ]
  },
  {
    id: shortid.generate(),
    name: 'Boeing 737',
    category: 'airframe',
    attributes: [
      { id: shortid.generate(), name: 'Make', value: 'Boeing', kind: 'string' },
      { id: shortid.generate(), name: 'Seats', value: 120, kind: 'number' }
    ]
  },
]