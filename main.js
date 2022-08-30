let proName = document.querySelector("#Name");
let desc = document.querySelector("#Description");
let price = document.querySelector("#Price");
let quantity = document.querySelector("#Quantity");
let category = document.querySelector("#category");
let search_inpt = document.querySelector("#Search");
let sub_btn = document.querySelector(".sub_btn");
let tbodyElement = document.querySelector(".tbodyElement");
let empty_arr;
let mood = "create";
let tmp;

if(window.localStorage.getItem("product")){
    empty_arr = JSON.parse(window.localStorage.product);
}else{
    empty_arr = [];
}

addArrayToPage(empty_arr);

sub_btn.addEventListener("click" , (e)=>{
    e.preventDefault();
    if(proName.value !== "" && desc.value !== "" && price.value !== "" && quantity.value !== "" && category.value !== ""){
        createObjectForElement();
        proName.value = "";
        desc.value = "";
        price.value = "";
        quantity.value = "";
        category.value = "";
    }else{
        alert("you have fill all fields");
    }
})


function createObjectForElement(){
    let newObj = {
        pro_name: proName.value.toLowerCase(),
        pro_desc: desc.value,
        pro_price: price.value,
        pro_quantity: quantity.value,
        pro_category: category.value
    }
    addObjectToArray(newObj);
}

function addObjectToArray(newObj){
    if(mood === "create"){
        empty_arr.push(newObj);
    }else{
        empty_arr[tmp] = newObj;
        sub_btn.innerHTML = "Submit";
    }
    
    addArrayToPage(empty_arr);
    addArrayToLocal(empty_arr)
}

function addArrayToPage(arr){
    tbodyElement.innerHTML = "";
    for(let i = 0; i < arr.length; i++){
        let table = `
        <tr id=${i}>
            <td scope="col">${i + 1}</td>
            <td scope="col">${arr[i].pro_name}</td>
            <td scope="col">${arr[i].pro_desc}</td>
            <td scope="col">${arr[i].pro_category}</td>
            <td scope="col">$${arr[i].pro_price}</td>
            <td scope="col">${arr[i].pro_quantity}</td>
            <td scope="col">$${arr[i].pro_price * arr[i].pro_quantity}</td>
            <td scope="col"><i onclick= "editElement(${i})" class="fa-solid fa-pen-to-square"></i></td>
            <td scope="col"><i onclick= "deleteItem(${i})" class="fa-solid fa-trash"></i></td>
        </tr>
        `;
        tbodyElement.innerHTML += table;
    }
}

// add array to local storage

function addArrayToLocal(empty_arr){
    window.localStorage.setItem("product" , JSON.stringify(empty_arr));
}

function deleteItem(i){
    empty_arr.splice(i , 1);
    window.localStorage.setItem("product" , JSON.stringify(empty_arr));
    addArrayToPage(empty_arr)
}


function editElement(i){

    proName.value = empty_arr[i].pro_name;
    desc.value = empty_arr[i].pro_desc;
    price.value = empty_arr[i].pro_price;
    quantity.value = empty_arr[i].pro_quantity;
    category.value = empty_arr[i].pro_category;
    sub_btn.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scrollTo(0 , 0);
}


search_inpt.addEventListener("keyup" , ()=>{
    search_inpt.value = search_inpt.value.toLowerCase();
    tbodyElement.innerHTML = "";
    for(let i = 0; empty_arr.length; i++){
        if(empty_arr[i].pro_name.includes(search_inpt.value)){
            let table = `
            <tr id=${i}>
                <td scope="col">${i + 1}</td>
                <td scope="col">${empty_arr[i].pro_name}</td>
                <td scope="col">${empty_arr[i].pro_desc}</td>
                <td scope="col">${empty_arr[i].pro_category}</td>
                <td scope="col">$${empty_arr[i].pro_price}</td>
                <td scope="col">${empty_arr[i].pro_quantity}</td>
                <td scope="col">$${empty_arr[i].pro_price * empty_arr[i].pro_quantity}</td>
                <td scope="col"><i onclick= "editElement(${i})" class="fa-solid fa-pen-to-square"></i></td>
                <td scope="col"><i onclick= "deleteItem(${i})" class="fa-solid fa-trash"></i></td>
            </tr>
            `;
            tbodyElement.innerHTML += table;
        }
    }
})
