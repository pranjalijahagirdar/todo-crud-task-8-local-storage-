const cl=console.log;

const electronicList = document.getElementById('electronicList')
const electronicsForm = document.getElementById('electronicsForm')
const category = document.getElementById('category')
const addelectronicBtn = document.getElementById('addelectronicBtn')
const updateelectronicBtn = document.getElementById('updateelectronicBtn')

// const electronics = [
//     {
//         id: "1",
//         category : "Computer"
//     },
//     {
//         id: "2",
//         category : "Mobile"
//     },
//     {
//         id: "3",
//         category : "Audio"
//     },
//     {
//         id: "4",
//         category : "Wearable"
//     },
//     {
//         id: "5",
//         category : "Computer"
//     }
// ];

// localStorage.setItem('electronics', JSON.stringify(electronics))
let electronics = JSON.parse(localStorage.getItem('electronics'))||[]

function oncreateElectronic(arr){
    let result =``;
    arr.forEach((ele)=>{
        result +=` <li class="list-group-item d-flex justify-content-between align-items-center" id="${ele.id}">
                            <strong>Category:${ele.category}</strong>
                    
                            <div>
                                <button onclick="editEle(this)" class="btn btn-sm text-primary" role="button">Edit</button>
                                <button onclick="deleteEle(this)" class="btn btn-sm text-danger" role="button">Remove</button>
                            </div>
                        </li>`
    })

    electronicList.innerHTML = result;
}
oncreateElectronic(electronics)

//create

function onAddElectronic(eve){
    eve.preventDefault()
    let ElectronicObj={
        id:Date.now().toString(),
        category:category.value,
    }
    electronics.push(ElectronicObj)
    electronicsForm.reset()
    localStorage.setItem('electronics', JSON.stringify(electronics))
    let li = document.createElement('li')
    li.className = 'list-group-item d-flex justify-content-between align-items-center'
    li.id = ElectronicObj.id;
    li.innerHTML = `<strong> Category : ${ElectronicObj.category}</strong>
                            <div>
                                <button onclick="editEle(this)" class="btn btn-sm text-primary" role="button">Edit</button>
                                <button onclick="deleteEle(this)" class="btn btn-sm text-danger" role="button">Remove</button>
                            </div>`

        electronicList.append(li)

        Swal .fire({
            title:'card added successfully !!!',
            icon:"success",
            timer:3000
        });
}


//edit

function editEle(ele){
    let editId = ele.closest('li').id;
    cl(editId)
    localStorage.setItem('editId', editId)
    let editObj = electronics.find(y=>y.id === editId)
    category.value = editObj.category;
    addelectronicBtn.classList.add('d-none')
    updateelectronicBtn.classList.remove('d-none')
}

//update

function onUpdateEle(){
    let updateId = localStorage.getItem('editId')
    localStorage.removeItem('editId')
    let updateObj={
        id:updateId,
        category:category.value,
    }
    let getIndex = electronics.findIndex(i=>i.id === updateId)
    electronics[getIndex]=updateObj;
    localStorage.setItem('electronics', JSON.stringify(electronics))
    document.getElementById(updateId).querySelector('strong').innerHTML = updateObj.category;
    electronicsForm.reset()
    addelectronicBtn.classList.remove('d-none')
    updateelectronicBtn.classList.add('d-none')

    Swal .fire({
        title:"Card update successfully !!!",
        icon:"success",
        timer:3000
    });
}

//delete

function deleteEle(ele){
    let delete_Id = ele.closest('li').id;
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) { 

      let getIndex = electronics.findIndex(d=>d.id === delete_Id)
      electronics.splice(getIndex, 1)
      localStorage.setItem('electronics', JSON.stringify(electronics))
      ele.closest('li').remove()
  }
});
    }



electronicsForm.addEventListener('submit', onAddElectronic)
updateelectronicBtn.addEventListener('click', onUpdateEle)