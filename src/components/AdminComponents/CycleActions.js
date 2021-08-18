import React from 'react';

export function addCycle (leagueID){
        return fetch(`https://toto-server.herokuapp.com/addcycle/${leagueID}`,
        {
            method: "get",
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            let result = data;
            console.log("add cycle", result);
        }).catch(err => console.log('AdminPage', err))    

}

export function closeCycle (cycleID){
    return fetch(`https://toto-server.herokuapp.com/lock-for-updates/${cycleID}`,
    {
        method: "get",
        dataType: "json",
        headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        let result = data;
        console.log("close cycle", result);
    }).catch(err => console.log('AdminPage', err))
}

export function lockCycle (cycleID){
    return fetch(`https://toto-server.herokuapp.com/lock-for-bets/${cycleID}`,
    {
        method: "get",
        dataType: "json",
        headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        let result = data;
        console.log("lock cycle", result);
    }).catch(err => console.log('AdminPage', err))
}

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

export function uncloseCycle (cycleID){
    let url = `https://toto-server.herokuapp.com/unlock-for-updates/${cycleID}`;
    return fetch(url,
    {
            method: "get",
            headers: {'Content-Type': 'application/json'},
    }).then((res) => {
        console.log("response unclosecycle", res)
        res.json()
    }).then((data) => {
        console.log("response unclosecycle", data)
    }).catch(err => console.log("unclosecycle", err))
}

export function unlockCycle (cycleID) {
    let url = `https://toto-server.herokuapp.com/unlock-for-bets/${cycleID}`;
    return fetch(url,
    {
            method: "get",
            headers: {'Content-Type': 'application/json'},
    }).then((res) => {
        console.log("response unlockcycle", res)
        res.json()
    }).then((data) => {
        console.log("response unlockcycle", data)
    }).catch(err => console.log("unlockcycle", err))
}



