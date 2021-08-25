const port = 8000 ;// use 8000 in development and 8001 in prod
const catchError = (error) => {console.log("there's an error:", error)}
const postData = async ( url = '', data = 
{ourInput: shiki})=>{
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: data.ourInput }),
       // body data type must match "Content-Type" header        
    });
      try {
        const newData = await response.json();
        console.log(newData)
        return newData;
      }
      catch{(catchError);}
  } 

export function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('name').value
// i put here if condition to check input first before api call 
    if(Client.checkForName(formText)){  console.log("::: Form Submitted :::")
    postData(`http://localhost:${port}/ArticleURL`, {ourInput: formText})
     .then(function (data) {
         document.getElementById('scoreTag').textContent = data.score_tag
         document.getElementById('confidence').textContent = data.confidence
         document.getElementById('subjectivity').textContent = data.subjectivity
         document.getElementById('agreement').textContent = data.agreement
         document.getElementById('irony').textContent = data.irony
         document.getElementById('resultSection').className = ""
     }).catch(()=> catchError, document.getElementById('resultSection').className = "hidden")}
     else {
       alert('invalid URL')
      document.getElementById('resultSection').className = "hidden"
     }

  

  } 
