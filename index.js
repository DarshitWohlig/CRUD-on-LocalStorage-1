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

            let arr = JSON.parse(localStorage.getItem('crud'));  // used to check if there is something named 'crud' already in LocalStorage or not

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
        selectData();    //
    }
    
}


function selectData(){
    let arr = JSON.parse(localStorage.getItem('crud'));
    
    if(arr!=null){
        let Sno=1;
        let storage='';

        for (let i in arr){
          
            storage += `<tr> <td>${Sno}</td> <td>${arr[i]}</td> <td> <a href=javascript:void(0) onclick="editData(${i})">Edit</a> &nbsp <a href=javascript:void(0) onclick="deleteData(${i})">Delete</a></td> </tr>`
            Sno++;
        }
        document.getElementById('root').innerHTML=storage;  // inserts localstorage data into Tbody.
    }
}


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