const url = "http://localhost:3000/events"
fetch(url)

.then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok, status code: ${response.status}`);
    }
    return response.json();
  })
  .then((jsonData) => {
    // Skapa en array av JavaScript-objekt som representerar användare
    const eventArray = jsonData.map((event) => {
      return {
        id: event.id,
        titel: event.titel,
        datum: event.datum,
        plats: event.plats,
        tid: event.tid,
      };
    });

    // Skapa ett ul-element och ge det en klass
    const eventList = document.createElement("ul");
    eventList.classList.add("eventList");
      // Hämta alla card-body element
      const cardBodies = document.querySelectorAll('.card-body');

      // Loopa igenom användarobjekten och skapa li-element för varje
      eventArray.forEach((event, index) => {
      // Skapa li-element och fyll det med användarinformation
        const listItem = document.createElement("li");
        listItem.style.listStyle = "none";
        listItem.innerHTML = `
        ${event.titel}<br>
        Datum: ${event.datum}<br>
        Plats: ${event.plats}<br>
        Tid: ${event.tid}<br>
`;
  
      // Lägg till li-elementet i ul-elementet
      eventList.appendChild(listItem);
  
      // Lägg till li-elementet i det matchande card-body
      if (cardBodies[index]) {
        cardBodies[index].appendChild(listItem);
      }
  });
      // Lägg till ul-elementet i body eller där du vill ha det i DOM-trädet
      document.body.appendChild(eventList);
      // Logga resultatet
      console.log(eventArray);
      console.log(jsonData);
    })
    .catch((error) => {
      // Hantera eventuella fel under hämtningen
      console.error("Fetch error:", error);
    });

// Funktion för att hantera redigering (oklar)


//Funktion för att hantera borttagning
function handleDelete(id) {
    fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok, status code: ${response.status}`);
      }
      // Uppdatera listan och DOM-trädet efter borttagning
      updateEventList();
      console.log(`Event med ID ${id} borttaget framgångsrikt`);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
// linas delete
// function handleDelete(event) {
//   const id = event.target.id; // Antag att id är en egenskap i event-objektet
  
//   fetch(`http://localhost:3000/events/${id}`, {
//       method: "DELETE",
//   })
//   .then((response) => {
//       if (!response.ok) {
//           throw new Error(`Network response was not ok, status code: ${response.status}`);
//       }
//       // Uppdatera listan och DOM-trädet efter borttagning
//       updateEventList();
//       console.log(`Event med ID ${id} borttaget framgångsrikt`);
//   })
//   .catch((error) => {
//       console.error("Fetch error:", error);
//   });
// }

//--------------- Formulär ---------------


// Lägg till formulär


const form = document.getElementById('myForm');

form.addEventListener('submit', handleAdd);


function handleAdd() {
  e.preventDefault();

  const formInput = new FormData(form);

  const addEvent = { titel: formInput.get("title"), datum: formInput.get("date"), plats: formInput.get(""), tid: formInput.get("time")}
  const jsonData = JSON.stringify(addEvent);

  console.log(addEvent)

  const request = new Request(url, {
    method: 'POST',
    headers: {'content-type': 'application/json' },
    body: jsonData
  });

  fetch(request)

  fetch(`http://localhost:3000/events/`, {method: 'POST', headers: {'content-type': 'application/json' }, 
  body: jsonData
})
 .then((response) => {
  if (!response.ok) {
    throw new Error(`Network response was not ok, status code: ${response.status}`);
  }
})

}

// Eventet "submit" kan användas för att visa medddelande rutan sen.
