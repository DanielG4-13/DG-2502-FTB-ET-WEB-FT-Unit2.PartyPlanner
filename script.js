// const API_URL= `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2502-FTB-ET-WEB-FT/events`;

// const state ={
//     parties: [],};

// const partyList = document.querySelector("#partyList");
// const partyForm = document.querySelector("#partyForm");
// partyForm.addEventListener("submit", addpartyForm);
// partyList.addEventListener("click", deleteParty);

// async function getpartyForms() {
//     try{
//         const response= await fetch(API_URL);
//         const json = await response.json();
//         console.log(json.data);
        
//         state.parties = json.data;
//         console.log(json.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }

// async function addpartyForm(event) {
//     event.preventDefault();
  
//     const name = document.querySelector("#name").value;
//     const date = new Date(document.querySelector("#date").value);
//     const location = document.querySelector("#location").value;
//     const description = document.querySelector("#description").value;
  
//     const newParty = {
//       name,
//       date,
//       location,
//       description,
//     };
//       try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newParty),
//       });
//       const json = await response.json();
//       console.log(json.data);
  
//       renderParty(json.data);
  
//       partyForm.reset();
//     } catch (error) {
//       console.log(error);
//     }
//   } {
    
// }
// async function render() {
//     await getpartyForms();
//     renderPartyList();
// }
// render()

// async function deleteParty(event) {
//     if (event.target.classList.contains("delete-button")) {
//       const partyId = event.target.dataset.partyId;
//       console.log(partyId);
//       try {
//         await fetch(`${API_URL}/${partyId}`, {
//           method: "DELETE",
//         });
  
//         event.target.parentElement.remove();
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }
//   function renderPartyList() {
//     state.parties.forEach((party) => {
//       renderParty(party);
//     });
//   }
//   function renderParty(party) {
//     const li = document.createElement("li");
//     li.innerHTML = /* html */ `
//           <strong>${party.name}</strong><br>
//           Date: ${new Date(party.date).toLocaleDateString()}<br>
//           Location: ${party.location}<br>
//           Description: ${party.description}<br>
//           <button class="delete-button" data-party-id="${
//             party.id
//           }">Delete</button>
//         `;
//         const deleteButton = li.querySelector(".delete-button");
//         deleteButton.addEventListener
//     partyList.appendChild(li);
//   }
  




const COHORT = "2410-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;
//sate
const state = {
    parties: [],
};
//event listeners
const form = document.querySelector("#partyForm");
form.addEventListener("submit", async (event) =>{
    event.preventDefault();
    const party = {
        name: form.partyName.value,
        date: new Date(form.partyDate.value).toISOString(),
        location: form.partyLocation.value,
        description: form.partyDescription.value,
    };
    console.log("Adding party:", party);
    await addParty(party);
    render();
});
//updates state with parties from API
async function getParties() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        console.log("Fetched parties:", json);
        state.parties = json.data;
    } catch (error) {
        console.error(error);
    }
}
//asks API to create a new party based on the given info
async function addParty(party) {
    try {
        const response = await fetch(API_URL,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(party),
        });
        const json = await response.json();
        //console.log("API response:", json);
        if (form) {
            form.reset();
        } else {
            console.error("Form is not available in the DOM.");
        }
        if(json.error){
            throw new Error(json.error.message);
        }
    } catch (error) {
        console.error(error);
    }
}
//deletes events
async function deleteParty(party) {
    try {
        const response = await fetch(`${API_URL}/${party.id}`,{
            method: "DELETE"
        });
        if (response.ok) {
            const json = await response.json().catch(() => null);
            if (json && json.error) {
                throw new Error(json.error.message);
            }
        }
        state.parties = state.parties.filter((p) => p.id !== party.id);
        render();
    } catch (error) {
        console.error(error);
    }
}
//renders parties from state
function renderParties() {
    const partyList = document.querySelector("#parties");
    if (!state.parties.length){
        partyList.innerHTML = "<li>No parties listed.</li>"
        return;
    }
    const partyCards = state.parties.map((party) => {
        const formattedDate = new Date(party.date).toLocaleDateString("en-US", {
            day: "numeric",
            weekday: "long",
            month: "long",
            year: "numeric",
        });
        const card = document.createElement("li");
        card.innerHTML = `
        <h2>${party.name}</h2>
        <h3>${formattedDate}</h3>
        <h3>${party.location}</h3>
        <p>${party.description}</p>
        <button class="deleteButton" data-id="${party.id}">DELETE</button>`;
        const deleteButton = card.querySelector(".deleteButton");
        deleteButton.addEventListener("click", async() => {
            await deleteParty(party);
            render();
        });
        return card;
    });
    partyList.replaceChildren(...partyCards);
}
//syncs state with the API and render
async function render() {
    await getParties();
    renderParties();
}
render();