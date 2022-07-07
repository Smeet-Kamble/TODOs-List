function getAndUpdate() {
    console.log('Updating list....');
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();
}

function update() {

    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    // // Populate the table
    tableBody = document.getElementById('tableBody');
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
            </tr>`;
    })
    tableBody.innerHTML = str;
}

add = document.getElementById('add');
add.addEventListener('click', getAndUpdate);
update();

function clearStorage() {
    if(confirm("Do you really want to clear the list?")){
        console.log("clearing the storage")
        localStorage.clear();
        update();
        localStorage.clear();
    }
}

function deleted(itemIndex) {
    console.log("deleted");
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Deleting the item using splice
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}