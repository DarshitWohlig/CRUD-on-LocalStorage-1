let id = "";
selectData(); // we need to call this function in start otherwise our data will not be loaded


function manageData(){
    document.getElementById('msg').innerHTML='';

    let Inputname=document.getElementById('name').value;
    let arr = JSON.parse(localStorage.getItem('crud'));
    if(Inputname==""){
        document.getElementById('msg').innerHTML='Please Enter your name';
    }
    else{
        if(id==='' && isNaN(id)==false){     //Checks if ID is null so user is adding data else user is updating data

            arr = JSON.parse(localStorage.getItem('crud'));  // used to check if there is something named 'crud' already in LocalStorage or not

            if(arr==null){     //if there is nothing in localstorage then we add it......

                let dataItem=[Inputname];
                localStorage.setItem('crud',JSON.stringify(dataItem));  // 'crud' is a a key value in which name will be added 
            }
            else{
                arr.push(Inputname);
                localStorage.setItem('crud',JSON.stringify(arr));
            }
        
        document.getElementById('name').value='';
        document.getElementById('msg').innerHTML='Data Added';
        }
        else{
            let arr = JSON.parse(localStorage.getItem('crud'));
            arr[id]=Inputname;
            localStorage.setItem('crud',JSON.stringify(arr));

            document.getElementById('name').value='';
            document.getElementById('msg').innerHTML='Data Updated';
        }
        selectData();
    }
}

function getUrl(start=0,limit=5){
    return `http://127.0.0.1:5500/index.html#!/?start=${start}&limit=${limit}`;
}
 
function getData(url){
    console.log("url: ",url);
    fetch(url)
       .then(response => response.json())
        .then(data => selectData(data,start,limit))
        .catch(err => console.log(err));
}

function selectData(start=0,limit=5){

    arr = JSON.parse(localStorage.getItem('crud'));

        let Sno = 1;
        let storage = "";
        let arrStart =(start*limit)-limit;
        let arrLimit= arrStart+limit;
        
        console.log(start,limit);
        console.log(arrStart,arrLimit);

        for (let i in arr) {
            while (arrStart < arrLimit) {
                storage += `<tr> 
                            <td>${Sno++}</td> 
                            <td>${arr[i++]}</td>
                            <td> <a href=javascript:void(0) onclick="editData(${i})">Edit</a> &nbsp 
                                 <a href=javascript:void(0) onclick="deleteData(${i})">Delete</a>
                            </td>
                        </tr>`;

                document.getElementById("root").innerHTML = storage; // inserts localstorage data into Tbody

                arrStart++;
              }
              console.log(storage);
            }
}

function handleNumberClick(clickedLink,leftArrow,rightArrow) {
    clickedLink.parentElement.classList='active';
    let clickedLinkPageNumber =parseInt(clickedLink.innerText);
    let url = getUrl((clickedLinkPageNumber*5)-5);
    getData(url);

    switch(clickedLinkPageNumber){
        case 1:
            disableLeftArrow(leftArrow);
            if(rightArrow.className.indexOf('disabled')!== -1){
                enableRightArrow(rightArrow);
            }
            break;
        case 5:
            disableRightArrow(rightArrow);
            if(leftArrow.className.indexOf('disabled')!== -1){
                enableLeftArrow(leftArrow);
            }
            break;
        default:
            if(leftArrow.className.indexOf('disabled')!== -1){
                enableLeftArrow(leftArrow);
            }
            if(rightArrow.className.indexOf('disabled')!== -1){
                enableRightArrow(rightArrow);
            }
            break; 
    }
}

function handleLeftArrowClick() {
    
}

function handleRightArrowClick() {
    
}

function disableLeftArrow(leftArrow){
    leftArrow.classList = 'disabled arrow-left';
    leftArrow.classList.remove('waves-effect');
} 

function enableLeftArrow(leftArrow){
    leftArrow.classList.remove('disabled');
    leftArrow.classList = 'waves-effect arrow-left'
} 

function disableRightArrow(rightArrow){
    rightArrow.classList = 'disabled arrow-right';
    rightArrow.classList.remove('waves-effect');
}

function enableRightArrow(rightArrow){
    rightArrow.classList.remove('disabled');
    rightArrow.classList = 'waves-effect arrow-right'
}

//Handling Paginations
let pageLinks=document.querySelectorAll('a');
let activePage;
let clickedLink;
let nextPage;
let leftArrow;
let rightArrow;
let url='';

pageLinks.forEach(element => {
    element.addEventListener('click',function(){

        leftArrow=document.querySelector('.arrow-left');
        rightArrow=document.querySelector('.arrow-right');
        activeLink=document.querySelector('.active');

        activePage=parseInt(activeLink.innerText);
  
        if((this.innerText==='chevron_left' && activePage===1)||(this.innerText==='chevron_right' && activePage===5)){
            return;
        }

        activeLink.classList="waves-effect";
        activeLink.classList.remove('.active');

        if(this.innerText==='chevron_left'){
            handleLeftArrowClick();
        } 
        else if(this.innerText==='chevron_right'){
            handleRightArrowClick();
        }
        else{
            handleNumberClick(this,leftArrow,rightArrow);
        }
    });
});








function editData(refID){
  
    id=refID;
    let arr = JSON.parse(localStorage.getItem('crud'));
    document.getElementById('name').value=arr[refID];

}

function deleteData(refID){
    let arr = JSON.parse(localStorage.getItem('crud'));
    arr.splice(refID,1);

    localStorage.setItem('crud',JSON.stringify(arr));  // updated data

    selectData();
}
// https://www.youtube.com/watch?v=MRwWB6Cz-Vk  on LocalStorage

// https://www.youtube.com/watch?v=W1Kttu53qTg using Database...