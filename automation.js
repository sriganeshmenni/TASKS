cards=[
  {"image":"image.png",
  "price": "1200",
  "brand" :"polo"
},
{"image":"image.png",
  "price": "1200",
  "brand" :"polo"
},
{"image":"image.png",
  "price": "1200",
  "brand" :"polo"
},
{"image":"image.png",
  "price": "1200",
  "brand" :"polo"
},
{"image":"image.png",
  "price": "1200",
  "brand" :"polo"
},
{"image":"image.png",
  "price": "1200",
  "brand" :"polo"
},
{"image":"image.png",
  "price": "1200",
  "brand" :"polo"
},
{"image":"image.png",
  "price": "1200",
  "brand" :"polo"
},
{"image":"image.png",
  "price": "1200",
  "brand" :"polo"
},
{"image":"image.png",
  "price": "1200",
  "brand" :"polo"
}
]
var cards=my-cards.map((ele)=>{
  return `
  <div class="card">
      <div class="image-section">
        <img src="${ele.image}" alt="sri">
      </div>
      <div class="cardin">
         <div class="di1">Price:${ele.price}</div>
         <div class="di2">Brand:${ele.brand}</div>
      </div>
  </div>
  `
})
cards=cards.join("");
var cardsection = document.getElementsByClassName("card-parent")[0];
cardsection.innerHTML(cards);
