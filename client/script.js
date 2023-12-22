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

// Funktion för att hantera redigering
function handleEdit(id) {
  // Implementera din logik för redigering här
  console.log(`Redigera resurs med ID ${id}`);
}

// Funktion för att hantera borttagning
function handleDelete(id) {
  // Implementera din logik för borttagning här
  console.log(`Ta bort resurs med ID ${id}`);
}

//--------------- Formulär ---------------
  /* const buttonCRUD = document.getElementsByTagName("input");

  for (i = 0 ; i < buttonCRUD.length ; i++) {

   if ( buttonCRUD[i].id !== "buttonReset" ) {
    buttonCRUD[i].addEventListener("submit", responseModal);
   }

  }


function responseModal (e) {

} */

const myModal = document.getElementById('modalPopUp');
const myInput = document.getElementById('test');

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
});



  // ${"form"}.on('submit', () => $(".modal").show());