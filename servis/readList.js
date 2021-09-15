// readList();

function readList() {
    const fs = require("fs"); // импортируем библиотеку
    let fileContent = fs.readFile("list.txt", "utf8"); // читаем файл в кодировке
    let newQest = fileContent.split("\r\n"); // удаляем переносы строк и символ перехода в каждой строке

    const fileArr = newQest.map((item, index) => {
        return `[**${item}**](#js-question_${index + 1})` + "\n"; // создаем нужный шаблон для записи
    });

    fileArr.forEach((item) => {
        fs.appendFile("hello.txt", item + "\n", function (error) {
            // записываем файл построчно, дополняя его содержание
            if (error) throw error; // если возникла ошибка
        });
    });
    console.log("Запись файла завершена");
}
