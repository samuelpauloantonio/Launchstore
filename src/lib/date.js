module.exports = {
  
  date(timestamp){

    const date = new Date(timestamp)

    const year = date.getUTCFullYear()

    const  Month = `0${date.getUTCMonth()+ 1}`.slice(-2)

    const day  = `0${date.getUTCDate()}`.slice(-2)

   return  {
    day,
    Month,
    year,
    iso: `${year}-${Month}-${day}` ,
    birthday : `${day}/${Month}`,
    format: `${day}/${Month}/${year}`
   }
   
  }
  


}