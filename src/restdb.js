const items = [
    {
      "id": 0,
      "name": "Mike Johnsons",
      "email": "mikej@abc.com",
      "password": "mikej"
    },
    {
      "name": "Cindy Smiths",
      "email": "cinds@abc.com",
      "password": "cinds",
      "id": 1
    },
    {
      "name": "Julio Martins",
      "email": "julim@abc.com",
      "password": "julim",
      "id": 2
    }
  ]

//// GET all customers
// export function getAll(){
//     return items;
// }

const baseURL = 'http://localhost:4000/customers';

export async function getAll(setCustomers) {
  const myInit = {
      method: 'GET',
      mode: 'cors' };
  const fetchData = async (url) => {
      try {
              const response = await fetch(url, myInit);
              if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
              }
              const data = await response.json();
              setCustomers(data);
          } catch (error) {
              alert(error);
          } 
  }

  fetchData(baseURL);
}





export function get(id) {
    let result = null;
    for( let item of items){
        if(item.id === id){
            result = item;
        }
    }
  return result;
}

//// DELETE a customer
export function deleteById(id) {
  let arrayIndex = getArrayIndexForId(id);
  if( arrayIndex >= 0 && arrayIndex < items.length){
    items.splice(arrayIndex,1);
  }
}

//// POST to create a new customer
export function post(item) {      // adds new customer
  let nextid = getNextId();       // get id for new customer
  item.id = nextid;
  items[items.length] = item;     // add new customer to customers array
}

//// PUT to edit/update a current customer
export function put(id, item) {
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      items[i] = item;
      return;
    }
  }
}

function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}


function getNextId(){
  let maxid = 0;
  for( let item of items){
    maxid = (item.id > maxid)?item.id:maxid;
  }  
  return maxid + 1;
}


