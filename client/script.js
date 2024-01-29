let selectedEventId;
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
        Titel: ${event.titel}<br>
        Datum: ${event.datum}<br>
        Plats: ${event.plats}<br>
        Tid: ${event.tid}<br>
        <button class="btn btn-primary buttonUpdate" type="submit" onclick="handleEdit(${event.id})">Redigera</button>
        <button class="btn btn-danger buttonRemove" onclick="handleDelete(${event.id})">Ta bort</button>`;
  
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



//----------Kajsas redigering-----------------
// Funktion för att hantera redigering
function handleEdit(eventId) {
  console.log("Hantering av redigering startad.");
  selectedEventId = eventId;
  console.log(`Hanterar redigering för event med ID:`, eventId);
fetch(`http://localhost:3000/events`)
  .then((response) => {
    console.log("Fetch-anropet lyckades.");
    console.log(response)
    if (!response.ok) {
      throw new Error(`Network response was not ok, status code: ${response.status}`);
    }
    return response.json()
  })
  .then((data) => {
    // Fyll i formulärets fält med befintlig data
    console.log(data)
    currentData = data[0]
    document.getElementById('eventNameInput').value = currentData.titel; //ändrade så att det är namnet ist för id:et vilket känns lite knas men ett errormeddelande försvann
    document.getElementById('eventDateInput').value = currentData.datum;
    document.getElementById(`eventPlaceInput`).value = currentData.plats;
    document.getElementById('eventTimeInput').value = currentData.tid;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
  if (!selectedEventId) {
    console.error("Selected event ID is undefined");
    return;
  }
  console.log("Selected Event ID:", selectedEventId)
  // Hämta uppdaterade värden från formuläret
  const updatedEvent = {
    titel: document.getElementById('eventNameInput').value,
    datum: document.getElementById('eventDateInput').value,
    plats: document.getElementById('eventPlaceInput').value,
    tid: document.getElementById('eventTimeInput').value,
  };
  console.log(updatedEvent)
  // Skicka uppdaterad data till servernfor 
  for (i = 0 ; i < inputFields.length ; i++) {
    if (inputFields[i].value !== "") {
      fetch(`http://localhost:3000/events/${selectedEventId}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(updatedEvent)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok, status code: ${response.status}`);
          }
          return response.json(); 
        })
        .then((data) => {
          console.log(data); // logga data från servern
        })
        .catch((error) => {
          console.error("Fetch error:", error);
      }); }
  }
}
//----------------------------------------------------

//Funktion för att hantera borttagning ------------
function handleDelete(id) {
    fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
    
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok, status code: ${response.status}`);
      }
      // Uppdatera listan och DOM-trädet efter borttagning
      //updateEventList();
      console.log(`Event med ID ${id} borttaget framgångsrikt`);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
  }

//-----------------------------------------------------------

//--------------- Formulär ---------------
// Lägg till formulär

const form = document.getElementById('myForm');
form.addEventListener('submit', handleAdd, handleEdit);

function handleAdd(e) {
  e.preventDefault();
  console.log(e);

  const formInput = new FormData(form);

  const addEvent = { titel: formInput.get("title"), datum: formInput.get("date"), plats: formInput.get("place"), tid: formInput.get("time")}
  const jsonData = JSON.stringify(addEvent);

  console.log(jsonData)

  const request = new Request(url, {
    method: 'POST',
    headers: {'content-type': 'application/json' },
    body: jsonData
  });

  fetch(request)
 .then((response) => {
  if (!response.ok) {
    throw new Error(`Network response was not ok, status code: ${response.status}`);
  }
})
}

// Kod till modal

const inputFields = document.getElementsByClassName("form-control");
const buttonAdd = document.getElementById("buttonAdd");
const myModal = new bootstrap.Modal('#modalPopUp');

function showModal (e) {
  e.preventDefault();
    myModal.show();
    
  }
buttonAdd.addEventListener('click', showModal);

const saveChangesBtn = document.getElementById('saveChangesBtn');
saveChangesBtn.addEventListener('click', handleAdd );



//_______försök till att koppla modalen till knappar_______

// const myModalUp = new bootstrap.Modal('#modalPopUpUpdate');
// const buttonUp = document.getElementById("buttonUp");
// function showModalUp (e) {
//   e.preventDefault();
//     myModalUp.show();
      
//   }
// buttonUp.addEventListener('click', showModalUp);


// const myModalDel = new bootstrap.Modal('#modalPopUpDelete');
// const buttonDel = document.getElementById("buttonDel");
// function showModalDel (e) {
//   e.preventDefault();
//     myModalDel.show();
//   }
// buttonDel.addEventListener('click', showModalDel);

