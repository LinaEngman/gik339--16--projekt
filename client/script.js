const url = "http://localhost:3000/users"
fetch(url)

.then((response) => { 
    if (!response.ok) {
        throw new Error(`Network response was not ok, status code: ${response.status}`);
    }
    console.log(response);
    return response.json();
})
//.then((jsonData) => console.log(jsonData));
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

    // Loopa igenom användarobjekten och skapa li-element för varje
    eventArray.forEach((event) => {
      // Skapa li-element och fyll det med användarinformation
      const listItem = document.createElement("li");
    
      // Lägg till li-elementet i ul-elementet
      eventList.appendChild(listItem);
    });
    // Lägg till ul-elementet i body eller där du vill ha det i DOM-trädet
    document.body.appendChild(eventList);// Referera till den befintliga div med id "userListContainer"
    
    const eventListContainer = document.getElementById("eventListContainer");

    // Lägg till userList i userListContainer
    eventListContainer.appendChild(eventList);

    // Logga resultatet
    console.log(eventArray);
    console.log(jsonData);
  })
  .catch((error) => {
    // Hantera eventuella fel under hämtningen
    console.error("Fetch error:", error);
  });

//--------------- Formulär ---------------
  const buttonCRUD = document.getElementsByTagName("a");

  for (i = 0 ; i < buttonCRUD.length ; i++) {

   if ( buttonCRUD[i].id !== "resetEvent" ) {
    buttonCRUD[i].addEventListener("click", responseModal);
   }

  }

  function responseModal (e) {
    console.log(e.target);
  }