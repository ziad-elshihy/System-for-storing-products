let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tmp;
let mood = 'create';


// Total function
function getTotal() {
   if (price.value != '') {
      let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
      total.innerHTML = result;
      total.style.backgroundColor = 'green'
   } else {
      total.innerHTML = '';
      total.style.backgroundColor = 'rgb(173, 20, 9)'
   }
}

// Create product
let dataProduct;
if (localStorage.product != null) {
   dataProduct = JSON.parse(localStorage.product)
} else {
   dataProduct = [];
}
submit.onclick = function () {
   let newDataProduct = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
   };
   if(title.value == ''
   || price.value == ''
   || category.value == ''){
      alert("Please Fill Boxes Below !!!");
   } else {
      if (mood === 'create') {
         if (newDataProduct.count > 1) {
            for (let i = 0; i < newDataProduct.count; i++) {
               dataProduct.push(newDataProduct);
            }
         } else {
            dataProduct.push(newDataProduct);
         }
      } else {
         dataProduct[tmp] = newDataProduct
         mood = 'create'
         submit.innerHTML = "Create"
         count.disabled = false;
         count.style.opacity = '1';
      }
      clearValue();
   }

   // local storage
   localStorage.setItem("product", JSON.stringify(dataProduct));
   readProduct()
}

// clear inputs' value
function clearValue() {
   title.value = '';
   price.value = '';
   taxes.value = '';
   ads.value = '';
   discount.value = '';
   total.innerHTML = '';
   count.value = '';
   category.value = '';
}

// adding products to table
function readProduct() {
   let table = '';
   for (let i = 0; i < dataProduct.length; i++) {
      table += `
      <tr>
         <td>${i+1}</td>
         <td>${dataProduct[i].title}</td>
         <td>${dataProduct[i].price}</td>
         <td>${dataProduct[i].taxes}</td>
         <td>${dataProduct[i].ads}</td>
         <td>${dataProduct[i].discount}</td>
         <td>${dataProduct[i].total}</td>
         <td>${dataProduct[i].category}</td>
         <td><button onclick='update(${i})'>UPDATE</button></td>
         <td><button onclick="deleteData(${i})">DELETE</button></td>
      </tr>
      `
   }
   document.getElementById('tbody').innerHTML = table
   let btnDelete = document.getElementById('deleteAll')
   if (dataProduct.length > 0) {
      btnDelete.innerHTML = `
      <button onclick='deleteAll()'>Delete All (${dataProduct.length})</button>
      `
   } else {
      btnDelete.innerHTML = ''
   }
   getTotal()
}
readProduct();

// delete 
function deleteData(i) {
   dataProduct.splice(i, 1);
   localStorage.product = JSON.stringify(dataProduct);
   readProduct();
}

// delete all
function deleteAll() {
   localStorage.clear()
   dataProduct.splice(0)
   readProduct();
}

// update
function update(i) {
   title.value = dataProduct[i].title;
   price.value = dataProduct[i].price;
   taxes.value = dataProduct[i].taxes;
   ads.value = dataProduct[i].ads;
   discount.value = dataProduct[i].discount;
   getTotal()
   category.value = dataProduct[i].category;
   count.disabled = true;
   count.style.opacity = '0.3';
   scroll({
      top: 0,
      behavior: "smooth"
   })
   title.focus()
   submit.innerHTML = 'Update';
   mood = "update"
   tmp = i;
}

// search
let searchMode = "title"
function getSearch(id) {
   let search = document.getElementById("search")
   if (id == "searchTitle") {
      searchMode = "title"
   } else {
      searchMode = "category"
   }
   search.placeholder = "Search by " + searchMode;
   search.value = '';
   search.focus();
   readProduct();
}
// search data

function search(value) {
   let table = '';
   for (let i = 0; i < dataProduct.length; i++) {
      if (searchMode == "title") {
         if (dataProduct[i].title.includes(value.toLowerCase())) {
            table += `
               <tr>
                  <td>${i}</td>
                  <td>${dataProduct[i].title}</td>
                  <td>${dataProduct[i].price}</td>
                  <td>${dataProduct[i].taxes}</td>
                  <td>${dataProduct[i].ads}</td>
                  <td>${dataProduct[i].discount}</td>
                  <td>${dataProduct[i].total}</td>
                  <td>${dataProduct[i].category}</td>
                  <td><button onclick='update(${i})'>UPDATE</button></td>
                  <td><button onclick="deleteData(${i})">DELETE</button></td>
               </tr>`
         }
      }
      else {
         if (dataProduct[i].category.includes(value.toLowerCase())) {
            table += `
                              <tr>
                                 <td>${i}</td>
                                 <td>${dataProduct[i].title}</td>
                                 <td>${dataProduct[i].price}</td>
                                 <td>${dataProduct[i].taxes}</td>
                                 <td>${dataProduct[i].ads}</td>
                                 <td>${dataProduct[i].discount}</td>
                                 <td>${dataProduct[i].total}</td>
                                 <td>${dataProduct[i].category}</td>
                                 <td><button onclick='update(${i})'>UPDATE</button></td>
                                 <td><button onclick="deleteData(${i})">DELETE</button></td>
                              </tr>`
         }
      }
   }
   document.getElementById('tbody').innerHTML = table;
}
