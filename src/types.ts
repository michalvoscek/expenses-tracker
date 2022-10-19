
export type category = 'food' | 'utility' | 'clothes' | 'salary'

export type transaction = [string, number, category, string]

export const types = {
  food: 'Food',
  utility: 'Utility',
  clothes: 'Clothes',
  salary: 'Salary',
}
