let courseName = "Frontendutveckling";
let studentsEnrolled = 25;
let isTypeScriptFun = true;
console.log(`Kurs: ${courseName}`);
console.log(`Antal studenter: ${studentsEnrolled}`);
function greetStudent(name) {
    return `Välkommen, ${name}!`;
}
console.log(greetStudent("Alice"));
// Steg 1: Variabler
const firstname = "jonas";
let age = 53;
let isStudent = true;
console.log(`Jag heter ${firstname} är ${age} år gammal och är ${isStudent ? "student" : "inte student"}`);
// steg 2
const a = 15;
const b = 4;
const sum = a + b;
const product = a * b;
const remmainder = a % b;
console.log(`a+b: ${sum}`);
console.log(`a*b: ${product}`);
console.log("modulo:" + remmainder);
// Steg 3: Uppdateringar
let score = 10;
score += 5;
score -= 2;
console.log("final score: " + score);
// Steg 4: Biografen.
const ticketPrice = 120;
let cashRegister = 0;
let totalCost = 3 * ticketPrice;
totalCost += 59;
cashRegister += totalCost;
console.log(`Det blir ${totalCost} kr. I kassan finns nu: ${cashRegister} kr`);
{
    let disccount = 20;
    let vipPrice = totalCost - disccount;
    console.log(`Med VIP rabatt: ${vipPrice} kr`);
}
export {};
// console.log(discount)
//# sourceMappingURL=index.js.map