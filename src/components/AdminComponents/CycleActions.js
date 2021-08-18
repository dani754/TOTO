import React from 'react';





export function verifyBets (cycleID){
    return fetch(`https://toto-server.herokuapp.com/verifybets/${cycleID}`,
    {
        method: "get",
        dataType: "json",
        headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        let result = data;
        console.log("verify bets before lock cycle", result);
        return result
    }).catch(err => console.log('AdminPage', err))
}





