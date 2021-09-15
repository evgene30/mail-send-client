// getData() // загрузка файла с данными если он отсутствует
function getData() {
    const needle = require("needle");
    const mass = [];
    needle.get(
        "https://raw.githubusercontent.com/evgene30/mailServerSMTP/master/companyData.json",
        (err, res) => {
            if (err) throw err;
            mass.push(JSON.parse(res.body));
            fileHandler(mass);
        }
    );
}

module.exports = fileHandler = (array,name) => {
    // дозапись файла
    const fs = require("fs");
    fs.writeFile(
        `./${name}.json`,
        JSON.stringify(array),
        function (error) {
            if (error) throw error; // ошибка чтения файла, если есть
        }
    );
}

// dataSettings(); // операции над файлом

function dataSettings() {
    const allFirms = require("./data/allFirms.json");

    function uniqueData(array) {
        const filterUnique = array.filter((item) => item.email); // вычисление не пустых значений потчы
        devFirms = filterUnique.filter((item, index, array) => {
            // вычисление уникальных значений
            return (
                array
                    .map((mapItem) => mapItem["email"])
                    .indexOf(item["email"]) === index
            );
        });
    }

    function HTPark() {
        const zero = htpFirms.filter((item) => {
            if (!item.email[0] && !item.phone[0]) {
                return item;
            }
        });

        console.log(htpFirms);

        const react = htpFirms.filter((item) => {
            if (item.description.toLowerCase().includes(" react ")) {
                return item;
            }
        });

        const location = react.filter((item) => {
            if (!item.email[0]) {
                return item;
            }
        });

        console.log(location);
    }
}
