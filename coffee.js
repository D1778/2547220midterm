let productsArray=[];
const container = document.querySelector('#products');
const input = document.querySelector('#title');
const sorttitle = document.querySelector('#sorttitle');

fetch('https://api.sampleapis.com/coffee/hot')
.then(response=>response.json())
.then(data=>{
  productsArray=data.products;
  displayProducts(productsArray);
});

function displayProducts(products){
  container.innerHTML='';
  products.forEach(product=>{
    const card=document.createElement('div');
    card.className="bg-white p-4 rounded shadow w-60 text-center hover:scale-105 transition-transform";
    card.innerHTML=`
    <img src="${product.images[0]}" alt="${product.title}" class="h-40 w-full object-contain mb-2 rounded">
    <h2 class="text-sm font-semibold h-12 overflow-hidden">${product.title}</h2>
    `;
    container.appendChild(card);
  }
  );
}

input.addEventListener('input',()=>{
  filterAndSort();
}
);
sorttitle.addEventListener('change',()=>
{
  filterAndSort();
});
function filterAndSort(){
  let filtered=[...productsArray];
  const keyword=input.ariaValueMax.toLowerCase();
  if(keyword){
    filtered=filtered.filter(p=>
      p.title.toLowerCase().includes(keyword));
}
const titlesort=sorttitle.value;
if(titlesort=='az'){
  filtered.sort((a,b)=>a.title.localCompare(b.title));
}else if(titlesort==='za'){
  filtered.sort((a,b)=>b.title.localCompare(a.title));
}

displayProducts(filtered);
}