const FormatDate = (str) => {

    const input = str.slice(0, -14)
    var datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;

  }
  
  
const urlFrontEnd = () => {
  if(process.env.NODE_ENV === "production"){
    var REACT_APP_URL_FRONT="http://66.97.46.226:3001/";
  }
  else{
    var REACT_APP_URL_FRONT="http://localhost:3001/";
  }
  return REACT_APP_URL_FRONT;
}


const urlBackEnd = () => {
  if(process.env.NODE_ENV === "production"){
    var REACT_APP_URL_BACK="http://66.97.46.226:4001/";
  }
  else{
    var REACT_APP_URL_BACK="http://localhost:4000/";
  }
  return REACT_APP_URL_BACK;
}





export {FormatDate, urlFrontEnd, urlBackEnd};
