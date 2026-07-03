let employees =
    JSON.parse(
        localStorage.getItem("employees")
    ) || [];

const form =
    document.getElementById("employeeForm");

if(form){

form.addEventListener("submit", function(e){

    e.preventDefault();

    let employee = {

        id:
            "EMP" + Date.now(),

        name:
            document.getElementById("name").value,

        department:
            document.getElementById("department").value,

        designation:
            document.getElementById("designation").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        salary:
            document.getElementById("salary").value
    };

    employees.push(employee);

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    alert("Employee Added Successfully");

    window.location =
        "viewEmployees.html";
});
}

function loadEmployees(list = employees){

    let table =
        document.getElementById("employeeTable");

    if(!table)
        return;

    table.innerHTML = "";

    list.forEach((emp,index)=>{

        table.innerHTML +=
        `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.designation}</td>
            <td>${emp.email}</td>
            <td>${emp.phone}</td>
            <td>₹ ${emp.salary}</td>
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
    loadDashboard();
}

function loadDashboard(){

    let total =
        document.getElementById(
            "totalEmployees"
        );

    let dept =
        document.getElementById(
            "totalDepartments"
        );

    if(total)
        total.innerHTML =
            employees.length;

    if(dept){

        let departments =
            [...new Set(
                employees.map(
                    e => e.department
                )
            )];

        dept.innerHTML =
            departments.length;
    }
}

const search =
    document.getElementById("search");

if(search){

search.addEventListener(
    "keyup",
    function(){

    let value =
        this.value.toLowerCase();

    let filtered =
        employees.filter(emp =>
            emp.name.toLowerCase()
            .includes(value)
            ||
            emp.department.toLowerCase()
            .includes(value)
        );

    loadEmployees(filtered);
});
}

loadEmployees();
loadDashboard();