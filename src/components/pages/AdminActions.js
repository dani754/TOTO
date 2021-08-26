
export function addCycle (leagueID){
    return fetch(`https://toto-server.herokuapp.com/addcycle/${leagueID}`,
    {
        method: "get",
        dataType: "json",
        headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        let result = parseInt(data);
        console.log("add cycle", result);
        return result;
    }).catch(err => console.log('AdminPage', err))    

}

export function lockBets(cycleID){
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

export function unlockBets (cycleID) {
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

export function setCurrentCycle (cycleID, leagueID) {
    let url = `https://toto-server.herokuapp.com/set-current-cycle`;
    return fetch(url,
    {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                cycleid: cycleID,
                leagueid: leagueID,
            })
    }).then((res) => {
        console.log("response setCurrentCycle", res)
        res.json()
    }).then((data) => {
        console.log("response unlockcycle", data)
    }).catch(err => console.log("unlockcycle", err))
}

export function lockUpdates (cycleID){
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

export function unlockUpdates (cycleID){
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

