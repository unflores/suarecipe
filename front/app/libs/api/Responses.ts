interface IEvent {
  name: string
  description: string
  type: string
  siteLink: string
  address: string
}

export interface IngredientResponse {
  _id: string
  name: string
  type: string
  address: string
  siteLink: string
  zipcode: number
}
