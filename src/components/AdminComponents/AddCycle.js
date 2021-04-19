import React from 'react';

export function AddCycle (leagueID){
        console.log("add cycle props", leagueID);
        return fetch(`https://toto-server.herokuapp.com/addcycle/${leagueID}`,
        {
            method: "get",
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json(), 100000000)
        .then((data) => {
            let result = data;
            console.log("add cycle", result);
        }).catch(err => console.log('AdminPage', err))    

}
