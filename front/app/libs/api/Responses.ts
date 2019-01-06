interface IEvent {
  name: string
  description: string
  type: string
  siteLink: string
  address: string
}

interface IEvening extends IEvent {
  partsOfDay: ['night', 'afternoon']
}

interface IMorning extends IEvent {
  partsOfDay: ['morning']
}

export interface IDay {
  evening: IEvening
  morning: IMorning
}

export interface IItineraryResponse {
  itinerary: IDay[]
}
