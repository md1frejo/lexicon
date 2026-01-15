let courseName: string = "Frontendutveckling";
let studentsEnrolled: number = 25;
let isTypeScriptFun: boolean = true;

console.log(`Kurs: ${courseName}`);
console.log(`Antal studenter: ${studentsEnrolled}`);

function greetStudent(name: string): string {
  return `Välkommen, ${name}!`;
}

console.log(greetStudent("Alice"));

// Steg 1: Variabler

const firstname:string = "jonas";
let age:number=53;
let isStudent:boolean = true;

console.log(`Jag heter ${firstname} är ${age} år gammal och är ${isStudent ? "student" : "inte student"}`);

// steg 2

const a:number = 15;
const b:number = 4;
const sum:number = a+b;
const product:number = a*b;
const remmainder:number = a%b;

console.log(`a+b: ${sum}`);
console.log(`a*b: ${product}`);
console.log("modulo:" + remmainder);

// Steg 3: Uppdateringar

let score:number = 10;

score+=5;
score-=2;

console.log("final score: "+score)

// Steg 4: Biografen.

const ticketPrice:number = 120;

let cashRegister:number = 0;
let totalCost:number = 3*ticketPrice;
totalCost+=59;

cashRegister+=totalCost;

console.log(`Det blir ${totalCost} kr. I kassan finns nu: ${cashRegister} kr`)

{
    let disccount:number = 20;
    let vipPrice:number = totalCost-disccount;

    console.log(`Med VIP rabatt: ${vipPrice} kr`)
}

// console.log(discount)
