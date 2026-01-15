console.log("******** the type script adventure ****************")

// Steg 1: Hjälten

const heroName:String = "peter"
let hp:number=Math.floor(Math.random()*100+1)
let isAlive:Boolean=true;

console.log(`Välkommen ${heroName}! Du börjar med ${hp} HP`)

// Steg 2: Inventory

let inventory:String[] = [];

inventory.push("svärd")
inventory.push("sköld")

console.log(inventory)

inventory.pop()

console.log(`Din ryggsäck innehåller: ${inventory}`)

// Steg 3: Äventyret

let enemies:String[] = ["Slemprop","  Varg","Drake"]
let monster:String[]=enemies.map(x => enemies[Math.floor(Math.random()*3)])



for (const k of enemies) {
    console.log(k)
    if(k===enemies[0]) {
        console.log("Du besegrade Slemproppen enkelt!")
        inventory.push("Guldmynt")
    }
    else if(k===enemies[1]) {
        hp-=20
        console.log(`Vargen bet dig! Du har ${hp} HP kvar.`)
    }
    else {
        if((hp>=50 && isAlive) || inventory.filter(x => x=="Svärd") ) {
            console.log("Du besegrade draken och vann spelet!")
            hp=100
        }
        else {
            isAlive=false;
            console.log("Draken sprutade eld. Game Over.")
        }
    }
}

console.log("map:  "+enemies.map(x => x));

// Steg 5: Resultat

console.log(`${isAlive? "Grattis ${heroName}, du överlevde äventyret!": "Tyvärr ${heroName}, du dog i skogen..."}`)

console.log(inventory)

// more fun
console.log("****************** more fun *********************")

let eb:String[] = ["Slemprop","  Varg","Drake"]
const monsters:String[]=["Slemprop","  Varg","Drake"].map(x => eb[Math.floor(Math.random()*3)])
let res=[[monsters.map(x=>x=='Drake').some(Boolean),"död"],[monsters.map(x=>x=='Varg').some(Boolean),"förlorade hp"],[monsters.map(x=>x=='Slemprop').some(Boolean),"enkelt"]].filter(x=>x[0]==true)[0][1]

console.log(res)

// object

const person: { name:string, age: number; isStudent: Boolean;}=
{
     name: "luna",
     age: 4,
     isStudent: false,
}

const dog: { name:string,breed:string, bark: ()=>void} = {
    name: "buddy",
    breed: "golden retriever",
    bark() {
        console.log("woof")
    }
}

// top object

console.log(window.innerWidth)