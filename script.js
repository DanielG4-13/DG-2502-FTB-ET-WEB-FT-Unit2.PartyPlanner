const API_URL= `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2502-FTB-ET-WEB-FT/events`;

const state ={
    events: [],
};

async function getpartyForms() {
    try{
        const response= await fetch(API_URL);
        const data = response.json();
        return data;
    } catch (error){
        console.error(error.message);
    }
        
}


async function addpartyForm() {
    
}

render()