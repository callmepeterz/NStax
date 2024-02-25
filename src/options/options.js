let currentStatConfig = [];
let currentSelectedStat = "";

getConfig().then(updateTable);


document.getElementById("stat").addEventListener("change", showStatsConfig);
document.getElementById("positive").addEventListener("change", positive);
document.getElementById("shownotabilities").addEventListener("change", updateTable);
document.getElementById("left").addEventListener("click", left);
document.getElementById("right").addEventListener("click", right);
document.getElementById("add").addEventListener("click", add);
document.getElementById("remove").addEventListener("click", remove);
document.getElementById("save").addEventListener("click", save);
document.getElementById("exit").addEventListener("click", exit);

async function getConfig() {
    let currentConfig;
    let storageconfig = await chrome.storage.sync.get(["stats", "showNotabilities"]);
    if (!storageconfig?.stats?.length) {
        const rawconfig = await fetch("../default.json");
        const configjson = await rawconfig.json();
        await chrome.storage.sync.set(configjson);
        currentConfig = configjson;
    }
    else currentConfig = storageconfig;

    document.getElementById("shownotabilities").checked = currentConfig.showNotabilities;
    currentStatConfig = currentConfig.stats;
}

async function showStatsConfig() {
    const selectedStat = document.getElementById("stat").value;
    let selectedStatConfig = findStat(currentStatConfig, selectedStat);
    currentSelectedStat = selectedStat;
    if (selectedStatConfig.index !== -1) {
        document.getElementById("positive").checked = selectedStatConfig.isPositive;
        document.getElementById("positive").removeAttribute("disabled");
    }
    else {
        document.getElementById("positive").setAttribute("disabled", "disabled");
    }
}

function positive() {
    let statIndex = findStat(currentStatConfig, currentSelectedStat).index;
    currentStatConfig[statIndex].isPositive = document.getElementById("positive").checked;
    updateTable();
}

function left() {
    let statIndex = findStat(currentStatConfig, currentSelectedStat).index;
    if (statIndex === -1 || statIndex === 0) return;
    let statConfig = currentStatConfig[statIndex];
    let prevStatConfig = currentStatConfig[statIndex - 1];

    currentStatConfig.splice(statIndex - 1, 2, statConfig, prevStatConfig);
    updateTable();
}

function right() {
    let statIndex = findStat(currentStatConfig, currentSelectedStat).index;
    if (statIndex === -1 || statIndex === currentStatConfig.length - 1) return;
    let statConfig = currentStatConfig[statIndex];
    let nextStatConfig = currentStatConfig[statIndex + 1];

    currentStatConfig.splice(statIndex, 2, nextStatConfig, statConfig);
    updateTable();
}

function add() {
    let statIndex = findStat(currentStatConfig, currentSelectedStat).index;
    if (statIndex !== -1 || !currentSelectedStat) return;
    currentStatConfig.push({ name: currentSelectedStat, isPositive: true });
    document.getElementById("positive").removeAttribute("disabled");
    document.getElementById("positive").checked = true;
    updateTable();
}

function remove() {
    let statIndex = findStat(currentStatConfig, currentSelectedStat).index;
    if (statIndex === -1 || !currentSelectedStat) return;
    currentStatConfig.splice(statIndex, 1);
    document.getElementById("positive").setAttribute("disabled", "disabled");
    updateTable();
}

function updateTable() {
    let headershtml = "<th>Option</th>";
    let posRow = "<tr><td></td>";
    let negRow = "<tr><td></td>";
    for (s of currentStatConfig) {
        headershtml += `<th style="width: 70px">${s.name}</th>`;
        posRow += `<td class="${s.isPositive ? "background-positive" : "background-negative"}">(mean +1000)</td>`;
        negRow += `<td class="${s.isPositive ? "background-negative" : "background-positive"}">(mean -1000)</td>`;
    }
    if (document.getElementById("shownotabilities").checked) {
        headershtml += "<th>Notabilities/Policies</th>";
        posRow += "<td></td>";
        negRow += "<td></td>";
    }
    posRow += "</tr>";
    negRow += "</tr>";

    document.getElementById("headers").innerHTML = headershtml;
    document.getElementById("table-content").innerHTML = posRow + negRow;
}

async function save() {
    await chrome.storage.sync.set({ stats: currentStatConfig, showNotabilities: document.getElementById("shownotabilities").checked });
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
        status.textContent = '';
    }, 750);
}

async function exit() {
    let tab = await chrome.tabs.getCurrent();
    chrome.tabs.remove(tab.id);
}

function findStat(statsArray, statName) {
    let result = { name: "", isPositive: true, index: -1 };
    for (e of statsArray) {
        if (e.name === statName) {
            result.name = e.name;
            result.isPositive = e.isPositive;
            result.index = statsArray.indexOf(e);
            break;
        }
    }
    return result;
}