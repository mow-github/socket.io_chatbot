


const giveAnswerBasedOnQuestion = function(text){


  return new Promise((resolve, reject) => {
    let ans = null;
    if(text === "Vilket glas rekomenderar du för en Sugar creek?"){
      ans = "En pint! Besök även <a href='http://sugarcreekbrewing.com/'>sugarcreekbrewing</a>";
    }else if(text === "Behöver ni anställa personal?"){
      ans = "Tyvärr, detta är bara en fiktiv sida";
    }else if(text === "Kan ni ge mig ett bra citat?"){
      ans = "Dinosaurs had not beer. How did that work out?";
    }else if(text === "Vilka API:er använder knowyourbeer?"){
      ans = "flickr samt brewerydb";
    }else if(text === "Tycker du att jag ska sluta dricka?"){
      ans = "Jag kan inte bearbeta din fråga... försök igen senare ";
    }else{
      ans = "Ange en giltig fråga, tack!";
    }
    resolve(ans);
  });
};




module.exports = {
  giveAnswerBasedOnQuestion
};