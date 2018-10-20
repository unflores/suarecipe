import * as React from 'react'

class Itinerary extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h2>Day 1</h2>
        <h3>Morning - Musée d'Orsay</h3>
        <p>
          Once a train station in the heart of the city, the Orsay museum is dedicated to impressionist and Post-Impressionist art (roughly 1848 to 1914). Its collections include some of the most famous paintings by Monet, Renoir, and Van Gogh. Make sure you take a break from the art & visit the café on the top level, where you will get to see the city from behind one of the giant clocks!
        </p>
        <p>
          <strong>Things to note:</strong>
          We recommend buying your ticket in advance. The museum is open Tuesday-Sunday, 9:30-18:00, and on Thursday until 21:00
        </p>
        <ul>
          <li><strong>Time to spend:</strong> 4 hours with lunch</li>
          <li><a href='blah'>website</a> | <strong> Price: 12 euros</strong> | 1 rue de la legion d'honneur, 75005</li>
        </ul>

      </div>
    )
  }
}

export default Itinerary
