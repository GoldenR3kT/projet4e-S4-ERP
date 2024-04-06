"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_queries_1 = require("./database/db_queries");
let testdb = document.getElementById("testdb");
if (testdb) {
    testdb.textContent = "test";
}
let cl = (0, db_queries_1.seConnecter)("emp1");
cl.then((cl) => {
    if (testdb) {
        testdb.textContent = cl;
    }
});
