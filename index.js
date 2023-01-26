let elementsBlock = $(".elementsBlock");
let modalMore = $('.modalMore');
let sendBtn = $(".sendBtn");
console.log(sendBtn);
const API = "http://localhost:8000/students";




function render(){
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
        elementsBlock.html('')
        data.forEach(element => {
            elementsBlock.append(`
            <div class="card">
                <img src="${element.avatar}" alt="IMG">
                <p>${element.name + ' ' + element.surname}</p>
                <p class="more" id="${element.id}">more</p>

                <div class="btns">
                <p class="editBtn" id="${element.id}">edit</p>
                <p class="deleteBtn" id="${element.id}">delete</p>
                </div>
            </div>
            `)
            modalMore.append(`
            <img class="avatar round" src="${element.avatar}" alt="IMG">
            <p>${element.name + ' ' + element.surname}</p>
            <p>Phone: ${element.phone}</p>
            <p>Weeckly: ${element.wKPI}</p>
            <p>Meekly: ${element.mKPI}</p>

            <span class="closeModal">X</span>
            `)
            $('.more').on('click', (e)=>{
                modalMore.css({
                    display: "block"
                })
            })
            $(".deleteBtn").on("click", (e)=>{deleteElement(e)})
            $(".editBtn").on("click", (e)=>{editElement(e)})
            $('.closeModal').on('click', closeModal)

            $('.closeModal').css({
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer"
            })
            $('.card').css({
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "200px",
                height: "auto",
                backgroundColor: "#a9a9a9"
            })
            $('.avatar').css({
                width: "120px",
                height: "150px",
            })
            $('.round').css({
                borderRadius: "50%"
            })
            $('.more').css({
                cursor: "pointer"
            })
            $('.btns').css({
                width: "120px",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#404141",
                margin: "10px",
                
            })
        })
    });
}


function closeModal(){
    modalMore.css({
        display: "none",
    })
}

/* === SEND DATA === */
let newStudent = {}

sendBtn.on('click', () => {
    inpValidation()
    sendData()
})


/* ==== DELETE  === */
function deleteElement(event){
    fetch(`${API}/${event.target.id}`,{
        method: 'DELETE'
    })
    .then(()=>render())
    
}

 
function editElement(event){
    let editId = 0;
    const editModal = $('.editModal');
    editModal.css({
        display: "block",
    })

    fetch(`${API}/${event.target.id}`)
        .then((res) => res.json())
        .then((data) => {
            editId = data.id
            $(".edit-name").val(data.name);
            $(".edit-surname").val(data.surname);
            $(".edit-phone").val(data.phone);
            $(".edit-wKPI").val(data.wKPI);
            $(".edit-mKPI").val(data.mKPI);
            $(".edit-aLink").val(data.avatar);
        });
    

        const sendBtn = $('.editBtn')
        sendBtn.on('click', function(){

        let editedStudent = {
            name: $(".edit-name").val(), 
            surname: $(".edit-surname").val(), 
            phone: $(".edit-phone").val(),
            wKPI: $(".edit-wKPI").val(),   
            mKPI: $(".edit-mKPI").val(), 
            avatar: $(".edit-aLink").val()
        }


        fetch(`${API}/${editId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedStudent),
        })
        .then(()=> render()) 
    })   
}

/* === Volidation === */

function inpValidation(){
    let name = $(".name").val()
    let surname = $(".surname").val()
    let phone = $(".phone").val()
    let wKPI = $(".wKPI").val()
    let mKPI = $(".mKPI").val()
    let avatar = $(".aLink").val()
    
    if(!name){
        alert('fill data')
    }
    return (newStudent = {
        name, 
        surname, 
        phone,
        wKPI,   
        mKPI, 
        avatar
    })
}


/* === POST === */
function sendData(){
    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
    })
    .then(() => render())
}

render()
console.log(elementsBlock);