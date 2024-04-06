import {
    seConnecter,
} from "./database/db_queries";

let testdb = document.getElementById("testdb");

if(testdb) {
    testdb.textContent="test"
}

//let cl: Promise<string> = seConnecter("emp1");

/*cl.then((cl) => {
    if(testdb) {
        testdb.textContent = cl;
    }
}*/
