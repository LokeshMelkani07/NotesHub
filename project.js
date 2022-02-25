showNotes();

// when user press add notes button
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addText = document.getElementById('addText');
    let addTitle = document.getElementById('addTitle');
    let addDate = document.getElementById('addDate');
    if (addText.textLength == 0 || addTitle.textLength == 0 || addDate.textLength == 0) {
        alert("Please Add All Fields Correctly !");
    }
    else {
        let notes = localStorage.getItem('notes');
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            title: addTitle.value,
            text: addText.value,
            date: addDate.value
        }
        notesObj.push(myObj);
        // notes should be added in string form
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addText.value = "";
        addTitle.value = "";
        addDate.value = "";
        console.log(notesObj);
        showNotes();
    }
}
)
// To show notes from localStorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        // takes notes in form of string
    }
    let html = "";
    notesObj.forEach(function (element, index, date) {
        html += `
            <div class="noteCard my-2 mx-2 card bg-danger" style = "width: 18rem;" >
                <div class="card-body">
                    <h5 class="card-title">Date ${element.date}</h5>
                    <h5 class="card-title">Note ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button class="btn btn-dark"
                    id = "${index}" onclick = "deleteNote(this.id)">Delete Note</button>
                </div>
            </div >`;
    });
    // using this.id in onclick of button sends the id of the button to deleteNote function
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = "Nothing to Show, Add Notes to see Your Notes"
    }
}

// Function which works when we press the delete button
function deleteNote(index) {
    console.log('I am deleting', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// Search Button
let search = document.getElementById('searchText');
search.addEventListener('input', function () {
    let inputValue = search.value;
    // we will make display of noteCard visible if text matches our inputValue else we make it hidden
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        // let cardText = element.getElementsByTagName('p')[0].innerText;
        let cardText = element.getElementsByTagName('h5')[1].innerText;
        if (cardText.includes(inputValue)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    })

})