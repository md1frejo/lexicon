// functions
import { getAuditList } from "../../../../../../node_modules/lighthouse/core/index";
console.log("functions");
// utan return är det void
function t1() {
    console.log("void function");
}
t1();
function setCode() {
    const code = "1234";
    console.log(`coden är: ${code}`);
}
setCode();
function greetung(namn) {
    console.log(`ǜälkommen in i värmen ${namn}`);
}
greetung("nils");
// Steg 1: Syntax-omvandlingen (Oldschool till Modern)
function calculateArea(widh, height) {
    return widh * height;
}
const calculateArea2 = (widh, height) => widh * height;
console.log(calculateArea(2, 4));
console.log(calculateArea2(2, 4));
// Steg 2: Flexibla Parametrar
function greetUser(name, greeting = "hej", isShouting) {
    return isShouting ? "stora bokstäver" : "Hej Luna";
}
greetUser("bertil");
console.log("232323443230303");
//# sourceMappingURL=functiontest.js.map