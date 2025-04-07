var prompt = require("prompt-sync")();

const matriz = [];

for (let i = 0; i < 5; i++) {
    const linha = [];
    for (let j = 0; j < 5; j++) {
        linha.push("Água");
    }

    matriz.push(linha);
}

console.log(matriz);