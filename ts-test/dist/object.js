// steg 1: objekt
console.log("begravningsbyrån");
const begbyrå = {
    klienter: ["adam", "eva", "nils", "anna"],
    antalkl: 4,
    kistor: 10,
    levande: [true, true, false, true],
    leverpersonen(namn) {
        const index = begbyrå.klienter.indexOf(namn);
        console.log(begbyrå.levande?.[index] ? "lever" : "död");
    },
};
console.log(begbyrå.klienter);
console.log(begbyrå["klienter"]);
console.log(begbyrå.leverpersonen("adam"));
console.log(begbyrå.leverpersonen("nils"));
// Steg 2: Math & Date
const rand = Math.floor(Math.random() * 100);
const date = new Date();
console.log(rand);
console.log(date.getFullYear());
// Steg 4: Typkonvertering
const talst = "300px";
console.log(parseInt(talst));
console.log(Number("123"));
// functions
// Steg 1: Syntax-omvandlingen (Oldschool till Modern)
function calculateArea(widh, height) {
    return widh * height;
}
const calculateArea2 = (widh, height) => widh * height;
console.log(calculateArea(2, 4));
console.log(calculateArea2(2, 4));
// Steg 2: Flexibla Parametrar
function greetUser(name, greeting = "hej", isShouting) {
    return isShouting ? `${greeting.toUpperCase()} ${name.toUpperCase()}` : `Hej ${name}`;
}
console.log(greetUser("bertil", "hejsan"));
export {};
//# sourceMappingURL=object.js.map