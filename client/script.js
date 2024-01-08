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
        <button onclick="handleEdit(${event.id})">Redigera</button>
        <button onclick="handleDelete(${event.id})">Ta bort</button>`;
  
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

// // funktion för att skapa event
// function addNewEvent(newEvent) {
//   fetch("http://localhost:3000/events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newEvent),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Network response was not ok, status code: ${response.status}`);
//       }
//       // Uppdatera listan och DOM-trädet efter att ha lagt till evenemanget
//       updateEventList();
//       console.log("Evenemang har lagts till i databasen");
//     })
//     .catch((error) => {
//       console.error("Fetch error:", error);
//     });
// }


// Funktion för att hantera redigering (oklar)
function fillFormWithResourceData(resourceData) {
  document.getElementById('eventNameInput').value = resourceData.titel;
  document.getElementById('eventDateInput').value = resourceData.datum;
  document.getElementById('eventTimeInput').value = resourceData.tid;
}

function handleEdit(id) {
  // Implementera din logik för redigering här
  console.log(`Redigera resurs med ID ${id}`);
  
  fetch(`http://localhost:3000/events/${id}`, )
    .then((response)=> {
      if (!response.ok) {
        throw new Error(`Network response was not ok, status code: ${response.status}`);
      }
      return response.json();
})
.then((resourceData) => {
  saveResourceId(id);
  fillFormWithResourceData(resourceData);
})
.catch((error) => {
  console.error('Fetch error:', error);
});
}



// Funktion för att hantera borttagning
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

//--------------- Formulär ---------------


// Lägg till formulär




/*
function handleAdd() {
  e.preventDefault();

  const form = document.getElementById('myForm');

  const formInput = new FormData(form);
 
  for (const p of formInput.entries()) {

    // const data = { titel : , datum: ,  }

    console.log(p);
  };

  fetch(`http://localhost:3000/events/`, {method: 'POST', headers= {"'content-type': 'application/json' }, 
  body: jsonData})

  .then()

}
*/


const inputCRUD = document.getElementsByTagName("input");

/* for (i = 0 ; i < inputCRUD.length ; i++) {

   if ( inputCRUD[i].id === "buttonAdd", "buttonUpdate") {
    inputCRUD[i].addEventListener("submit", responseModal);
   }

  } */

//const myModal = document.getElementById('modalPopUp');
//const button = document.getElementById('testButton');

// button.addEventListener('click', modalFunc);

/* function modalFunc (e) {
  console.log(e);
  myModal.showModal();
} */

/* function modalFunc () {

} */

// Eventet "submit" kan användas för att visa medddelande rutan sen.

  // ${"form"}.on('submit', () => $(".modal").show());