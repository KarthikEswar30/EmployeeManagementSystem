let employees =
    JSON.parse(localStorage.getItem("employees")) || [];

const form =
    document.getElementById("employeeForm");

if(form){

form.addEventListener("submit", function(e){

    e.preventDefault();

    let employee = {

        id: Date.now(),

        name:
            document.getElementById("name").value,

        designation:
            document.getElementById("designation").value,

        salary:
            document.getElementById("salary").value
    };

    employees.push(employee);

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    alert("Employee Added");

    window.location =
        "viewEmployees.html";
});
}

function loadEmployees(){

    let table =
        document.getElementById("employeeTable");

    if(!table)
        return;

    table.innerHTML="";

    employees.forEach((emp,index)=>{

        table.innerHTML +=
        `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.designation}</td>
            <td>${emp.salary}</td>

            <td>
                <button
                onclick="deleteEmployee(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}

function deleteEmployee(index){

    employees.splice(index,1);

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    loadEmployees();
}

loadEmployees();