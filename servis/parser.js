// parserNode();

function parserNode() {
    const needle = require("needle");
    const cheerio = require("cheerio");
    const listCompany = [];
    let a = 0;

    URL = "https://companies.dev.by";

    needle.get(URL, (err, res) => {
        if (err) throw err;
        const $ = cheerio.load(res.body);
        const listNameFirms = [];

        $("tr a").each(function (index, item) {
            if ($(item).text().replace(/['↗']/g, "").trim().length > 2) {
                listNameFirms.push([
                    $(item).text().replace(/['↗']/g, "").trim(),
                    URL + $(item).attr("href").replace(/['↗']/g, "").trim(),
                ]);
                getData(
                    URL + $(item).attr("href").replace(/['↗']/g, "").trim(),
                    listCompany
                );
            }
        });
    });

    function getData(URL, listCompany) {
        needle.get(URL, (err, res) => {
            // if (err) throw err;
            const cheer = cheerio.load(res.body);
            const firmName = cheer("h1").text(); // ищем название компании
            let linkFirm = ""; // ищем ссылку на сайт компании

            cheer(".vcard li a").each((index, item) => {
                linkFirm = cheer(item).attr("href");
                listCompany.push({company: firmName, link: linkFirm});
                console.log(listCompany, `Обработано ссылок: ${a++}`);
                fileHandler(JSON.stringify(listCompany));
            });
        });
    }

    function fileHandler(array) {
        const fs = require("fs");
        fs.writeFile("company.json", array, function (error) {
            if (error) throw error; // ошибка чтения файла, если есть
        });
    }
}
