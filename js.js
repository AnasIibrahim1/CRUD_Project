// Document all
let title = document.getElementById("title")
let total = document.getElementById("total")
let price = document.getElementById("price")
let count = document.getElementById("count")
let Taxes = document.getElementById("Taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let catigory = document.getElementById("catigory")
let search = document.getElementById("search")
let btn_create = document.getElementById("btn_create")
let btn_Search_i = document.getElementById("btn_Search_i")
let btn_Search_c = document.getElementById("btn_Search_c")
let btn_update = document.getElementById("btn_update")
let btn_delete = document.getElementById("btn_delete")
let delete_all = document.getElementById("delete_all")

// Update Mood 
// this variable is متغير لما يبقا في وضع الكرييت هخليه يعملي منتج جديد و لما يبقا في وضع الموود هخليه يعدلي على منتج 
let mood = `create`
// Global Variable =>المتغير الوهمي
let tmp;
// Search for Element
// 1- Global Element to start Data
let Search = `title`;
// Element that get full Data on array
// Make array to store data and not loss
let Elements;

// get totla
function getTotal(){
    // want make it if price only not null
    if(price.value != ``){
        let result = (+price.value + +ads.value + +Taxes.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "green"
    }else{
        total.innerHTML = ""
        total.style.background = "rgb(56, 56, 56)"
    }
}
//رقم 6 في الملف 
if(localStorage.h != null){
    Elements = JSON.parse(localStorage.h);
}
else{
   Elements = []        
}
// create product
btn_create.onclick = function (){
    // make obj to get one item and has alot of attributes
    let newP = {
        title : title.value.toLowerCase(),
        price : price.value,
        Taxes : Taxes.value,
        ads : ads.value,
        discount : discount.value,
        count : count.value,
        total : total.innerHTML,
        catigory : catigory.value.toLowerCase(),
    }
    // push to add into array
    // Elements.push(newP)
    // Push more than one item 

    // if title / price / count / all of them isn`t null, make it
    if (title.value != `` && price.value != `` && Taxes.value != `` && ads.value != `` && discount.value != `` && catigory.value != `` && newP.count < 100 )
    {
 // Create mood
 if (mood === `create`){
    if(newP.count > 1){
        for (i = 0 ; i < newP.count ; i++){
    Elements.push(newP)
        }
    }
    else
    {
        Elements.push(newP)
    } 
    cleardata()

}
// Update Mood
else{
    Elements [ tmp ] = newP;
    // عندي متغير تحت في الفانكشن بتاعت الابديت الي هو i
    // مش عارف استخدمه هنا 
    // بنستخدم المتغير الوهمي او المساعد
    mood = `create`;
btn_create.innerText = "create"
count.style.display =  "block"
getTotal()
}
    }
   


    // local Storage to save values
        
    showData()

}

// clear input
function cleardata(){
title.value = "";
price.value = "";
Taxes.value = "";
ads.value = "";
count.value = "";
catigory.value = "";
discount.value = "";
total.innerHTML = "";
total.style.background = "rgb(56, 56, 56)"
}

// read the values on table "Show Data"
function showData() {
    let table = '';
    for (let i = 0 ; i < Elements.length ; i++ ){
        table += `
        <tbody>
            <td>${i}</td>
            <td>${Elements[i].title}</td>
            <td>${Elements[i].price}</td>
            <td>${Elements[i].Taxes}</td>
            <td>${Elements[i].ads}</td>
            <td>${Elements[i].discounts}</td>   
            <td>${Elements[i].catigory}</td>
            <td>${Elements[i].total}</td>
            <td><button onclick = "UpdateData(${i})" id="btn_update"> update</button></td>
            <td><button onclick="DeleteItem(${i})" id="btn_delete"> delete</button></td> 
        </tbody>
        `
    }
document.getElementById("tbody").innerHTML  = table;

// Delete all Btn
if(Elements.length > 0){
    delete_all.innerHTML = `  <button onclick ="DeleteAll()"  id="btn_Delete_all">Delete All (${Elements.length})</button> `
    }
    else{
        delete_all.innerHTML = "" 
    }
}

// Delete one item 
function DeleteItem (i){
        // by this way will delete from the array only
        Elements.splice(i,1)
        // to get it from local storage and handle it 
        localStorage.h = JSON.stringify(Elements)
        // to delete items directly
        showData()
}

// Delete all items
function DeleteAll(){
    // To clear Storage
    localStorage.clear()
    // To delete items from index 0 into infinite
    Elements.splice(0)
    showData()
}

// Count " Add more than one item"
// in 53:63 Code lines

// update Values
 function UpdateData(i) {
    title.value = Elements[i].title;
    price.value = Elements[i].price;
    Taxes.value = Elements[i].Taxes;
    ads.value = Elements[i].ads;
    discount.value = Elements[i].discount;
    catigory.value = Elements[i].catigory;
    // i dont need count box
    count.style.display = "none"
    btn_create.innerText = "Update"
    mood = `update`
    tmp = i;
    scroll({top : 0, behavior : `smooth`})
    // if we click update , total willnot Start
    getTotal()}


// Search
// Want to get id of button
// 1- Change mood finction
function SearchMood(id) {
    if(id == `btn_Search_i`){
Search = `title`;
search.focus()
search.placeholder = `Search By Item`
    } else {
 Search = `catigory`;
 search.focus()
search.placeholder = `Search By Catigory`}}

// 2- Search Function
function SearchData(value) {
let table = ``;
    if(Search == `title`){
        for(i = 0 ; i < Elements.length ; i++){
            // if u use value.includes(Elements[i].title) => بعد اما تكتب الاسم صح هيظهر
            //  if u use Elements[i].title.includes(value) => مع كل حرف هيتكتب هيظهرلك الكلة 
                if(Elements[i].title.includes(value)){
                    table += `
                    <tbody>
                        <td>${i}</td>
                        <td>${Elements[i].title}</td>
                        <td>${Elements[i].price}</td>
                        <td>${Elements[i].Taxes}</td>
                        <td>${Elements[i].ads}</td>
                        <td>${Elements[i].discounts}</td>   
                        <td>${Elements[i].catigory}</td>
                        <td>${Elements[i].total}</td>
                        <td><button onclick = "UpdateData(${i})" id="btn_update"> update</button></td>
                        <td><button onclick="DeleteItem(${i})" id="btn_delete"> delete</button></td> 
                    </tbody>
                    `

                }


        }

    }
    else{
        for(i = 0 ; i < Elements.length ; i++){
            // if u use value.includes(Elements[i].title) => بعد اما تكتب الاسم صح هيظهر
            //  if u use Elements[i].title.includes(value) => مع كل حرف هيتكتب هيظهرلك الكلة 
                if(Elements[i].catigory.includes(value)){
                    table += `
                    <tbody>
                        <td>${i}</td>
                        <td>${Elements[i].title}</td>
                        <td>${Elements[i].price}</td>
                        <td>${Elements[i].Taxes}</td>
                        <td>${Elements[i].ads}</td>
                        <td>${Elements[i].discounts}</td>   
                        <td>${Elements[i].catigory}</td>
                        <td>${Elements[i].total}</td>
                        <td><button onclick = "UpdateData(${i})" id="btn_update"> update</button></td>
                        <td><button onclick="DeleteItem(${i})" id="btn_delete"> delete</button></td> 
                    </tbody>` }

}}
document.getElementById("tbody").innerHTML  = table;

}


// Clean Data
// 1- if you but any data null don`t create it 
// 2- if he get count more than 100 don`t make it
// in Create Function
// Standerd Function
showData()
    
