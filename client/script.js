let selectedEventId;
const url = "http://localhost:3000/events";

window.addEventListener("load", loadData);

function loadData() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status code: ${response.status}`
        );
      }
      return response.json();
    })
    .then((jsonData) => { 
     // console.log(jsonData);

      jsonData.forEach((event, index) => {
        //console.log(index)
        //console.log(event)
        
      const cardBodies = document.querySelectorAll(".card-body");
        
        cardBodies[index].innerHTML = "";
        cardBodies[index].innerHTML = `
          <h5 class="card-title">Händelse</h5>
          Titel: ${event.titel}<br>
          Datum: ${event.datum}<br>
          Plats: ${event.plats}<br>
          Tid: ${event.tid}<br>
          <button class="btn btn-primary buttonUpdate" type="submit" onclick="handleEdit(${event.id})">Redigera</button>
          <button class="btn btn-danger buttonRemove" onclick="handleDelete(${event.id})">Ta bort</button>`; 
          
      });
      
      /*
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

      // Hämta alla card-body element
      const cardBodies = document.querySelectorAll(".card-body");
      
      
      // Loopa igenom användarobjekten och skapa li-element för varje
      eventArray.forEach((event, index) => {
        cardBodies[index].innerHTML = "";
        cardBodies[index].innerHTML = `
          Titel: ${event.titel}<br>
          Datum: ${event.datum}<br>
          Plats: ${event.plats}<br>
          Tid: ${event.tid}<br>
          <button class="btn btn-primary buttonUpdate" type="submit" onclick="handleEdit(${event.id})">Redigera</button>
          <button class="btn btn-danger buttonRemove" onclick="handleDelete(${event.id})">Ta bort</button>`;

        /*
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

        // Lägg till li-elementet i det matchande card-body
        // Koden som skapar dubbletter ligger under! <----------- 
        // Ta bort ul och ersätt il med div.
        const listContainer = document.createElement("ul");

        // if-satsen kan vara onödig.
        if (cardBodies[index]) {
          listContainer.appendChild(listItem);
          cardBodies[index].appendChild(listContainer);
        }
        */
      });
      
      
      /* 
      // Logga resultatet
      console.log(eventArray);
      console.log(jsonData);
    })
    .catch((error) => {
      // Hantera eventuella fel under hämtningen
      console.error("Fetch error:", error);
      
    });
    */
} 


//----------Kajsas redigering-----------------
// Funktion för att hantera redigering
 function handleEdit(eventId) {
  console.log("Hantering av redigering startad.");
  console.log(`Hanterar redigering för event med ID:`, eventId);
  fetch(url)
    .then((response) => {
      console.log("Fetch-anropet lyckades.");
      console.log(response);
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status code: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      // Fyll i formulärets fält med befintlig data
      console.log(data);
      // https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
      let currentData = data.find( event => event.id === eventId);
      console.log(currentData)
      document.getElementById("eventNameInput").value = currentData.titel; //ändrade så att det är namnet ist för id:et vilket känns lite knas men ett errormeddelande försvann
      document.getElementById("eventDateInput").value = currentData.datum;
      document.getElementById(`eventPlaceInput`).value = currentData.plats;
      document.getElementById("eventTimeInput").value = currentData.tid;

      // Lagrar befintligt id för händelse som ska uppdateras i localstorage
      localStorage.setItem('selectedEventId', eventId)
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
    // ----- Ta bort det som är nedan? -----
    // ---> Om det här till...... <---

    
  if (!eventId) {
    console.error("Selected event ID is undefined");
    return;
  }

  console.log("Selected Event ID:", eventId);
  /*
  for (i = 0 ; i < inputFields.length ; i++) {
  if (inputFields[i].value !== "") {
  fetch(`${url}/${selectedEventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedEvent),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status code: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // logga data från servern
      loadData();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
} */
}
//----------------------------------------------------

//Funktion för att hantera borttagning ------------
function handleDelete(id) {
  fetch(`${url}/${id}`, {
    method: "DELETE"
  })
  .then((response) => {
   /* if (!response.ok) {
      throw new Error(
        `Network response was not ok, status code: ${response.status}`
      );
     } */
      // Uppdatera listan och DOM-trädet efter borttagning
      loadData();
      console.log(`Event med ID ${id} borttaget framgångsrikt`);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

//-----------------------------------------------------------

//--------------- Formulär ---------------
// Lägg till formulär

const form = document.getElementById("myForm");
form.addEventListener("submit", handleAdd, handleEdit);

function handleAdd(e) {
  e.preventDefault();
 
  const formInput = new FormData(form);

  const addEvent = {
    titel: formInput.get("title"),
    datum: formInput.get("date"),
    plats: formInput.get("place"),
    tid: formInput.get("time"),
  };

  console.log(addEvent)
 
  // Hämtar id från händelsen som ska redigeras men om en händelse istället läggs till blir id = null.
  // För att id ska innehålla något måste handleEdit() ha körts först.
  const id = localStorage.getItem("selectedEventId");
  console.log(id)

  // Lägger till id till addEvent objektet
   if (id) {
     addEvent.id = id;
   }

  // Om addEvent.id är null väljs post om inte väljs put.
  const request = new Request(url, {
   method: addEvent.id ? "PUT" : "POST",
   headers: {
     "content-type": "application/json",
   },
   body: JSON.stringify(addEvent),
   });
 
 fetch(request).then((response) => {
  loadData();

  localStorage.removeItem("selectedEventId")

 });
 }


// Kod till modal

const inputFields = document.getElementsByClassName("form-control");
const buttonAdd = document.getElementById("buttonAdd");
const myModal = new bootstrap.Modal("#modalPopUp");

function showModal(e) {
  e.preventDefault();
  myModal.show();
}
buttonAdd.addEventListener("click", showModal);

const saveChangesBtn = document.getElementById("saveChangesBtn");
saveChangesBtn.addEventListener("click", handleAdd);

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
