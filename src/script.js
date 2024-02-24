// SETTINGS
// =================================================

// enter stats that you would like to request (case sensitive)
const selectedStats = ["Taxation", "Average Income", "Average Income of Poor", "Average Income of Rich"];

// set to true if you want stat to increase, false if you want stat to decrease
const statPositive = [false, true, true, true];

// =================================================

for (s of selectedStats) {
    document.getElementById("header").innerHTML += `<th style="width: 70px">${s}</th>`;
}
document.getElementById("header").innerHTML += "<th>Notabilities/Policies</th>";

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => fetchData(tabs));

async function fetchData(tabs) {
    let url = tabs[0].url;
    if (!url.startsWith("https://www.nationstates.net/page=show_dilemma/dilemma=")) {
        document.getElementById("issue-title").innerText = "Issue page not detected!";
    }

    const res = await fetch(`http://www.mwq.dds.nl/ns/results/${url.replace("https://www.nationstates.net/page=show_dilemma/dilemma=", "")}.html`)
    const restext = await res.text();
    const reshtml = document.createElement("html");
    reshtml.innerHTML = restext;

    document.getElementById("issue-title").innerText = reshtml.querySelector("body > h2").innerText;

    let tableNodelist = reshtml.querySelector("body > table > tbody").childNodes;
    let tableArray = [];

    for (let i = 0; i < tableNodelist.length; i++) {
        tableArray[i] = tableNodelist.item(i);
    }
    tableArray.shift();

    for (e of tableArray) {
        if (!e?.innerHTML) continue;

        let statArray = e.querySelector("td:nth-child(2)")?.innerText.split("\n");
        let outputhtml = `<tr><td>${e.querySelector("td:nth-child(1)").innerText}</td>`;
        let notabilities = "<td><ul>";
        let enteredStat = [];

        for (stat of statArray) {
            let detectedStat = testStat(selectedStats, stat);
            let detectedStatIndex = selectedStats.indexOf(detectedStat);

            if (detectedStat) {
                enteredStat[detectedStatIndex] = stat.replace(detectedStat + " ", "");
            }
            else if (/(adds|removes)/.test(stat)) {
                notabilities += `<li>` + stat.replace("adds", `<span class=word-positive><b>adds</b></span>`).replace("removes", `<span class=word-negative><b>removes</b></span>`).replace(": ", ": <b>") + "</b></li>";
            }
        }

        for (let i = 0; i < selectedStats.length; i++) {
            if (enteredStat[i]) {
                let mean = parseFloat(enteredStat[i].replace(/(.* \(mean |\))/, ""));
                let colorclass = statPositive[i] ? (mean < 0 ? "background-negative" : "background-positive") : (mean > 0 ? "background-negative" : "background-positive");
                outputhtml += `<td class=${colorclass}>` + enteredStat[i] + "</td>";
            }
            else {
                outputhtml += "<td></td>"
            }
        }

        notabilities += "</ul></td>";

        document.getElementById("table-content").innerHTML += outputhtml + notabilities + "</tr>";
    }

}

function testStat(selectedStats, stat) {
    let result = "";
    for (s of selectedStats) {
        let statRegex = new RegExp(`[0-9]+ ${s} \\(mean`);
        if (statRegex.test(stat)) {
            result = s;
            break;
        }
    }
    return result;
}