// export type Category = 'car'
export type AttributeKind = 'string' | 'number'
export type Attribute = { id: string, name: string, value: string | number, kind: AttributeKind }
export type Item = {
  id: string,
  name: string,
  category: string,
  attributes: Attribute[]
}