interface Event {
  name: string
  description: string
  type: string
  zipcode: string
}

interface Evening extends Event {
  partsOfDay: ["night", "afternoon"]
}

interface Morning extends Event {
  partsOfDay: ["morning"]
}
export interface IItineraryResponse {
  itinerary: [
    {
      evening: Evening
      morning: Morning
    }
  ]
}
