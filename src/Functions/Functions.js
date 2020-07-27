const FormatDate = (str) => {

    const input = str.slice(0, -14)
    var datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;

  }
  
  


export default FormatDate;
