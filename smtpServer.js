const smtpMailServer = async (item) => {
    const bodyHtml = require("./htmlBody"); // оформление текста письма подтягиваем из отдельного файла
    const nodemailer = require("nodemailer"); // авторизатор

    // блок авторизации пользователя
    const transporter = nodemailer.createTransport({
        service: "gmail", // тип почты (если gmail)
        auth: {
            user: "proverka@gmail.com", // адрес почты
            pass: "proverka123456", // пароль от почты
        },
    });

    // блок отправки сообщений
    transporter.sendMail(
        {
            from: "Name Lastname <proverka@gmail.com>", // от кого письмо, подпись отправителя
            to: `${item.email}`, // адрес куда отправляем
            subject: "Theme my mail to Firm",
            html: bodyHtml(item.name), // текст письма, можно передать как в виде простого текста так форматированного из html тегов (и стилей)
            attachments: [
                {
                    filename: "my_fileNmae.docx", // имя передаваемого файла
                    path: "C:/Users/user/Downloads/file/my_fileNmae.docx", // путь к файлу (относительный либо абсолютный)
                },
            ],
        },
        function (err) {
            if (err) {
                console.log(err && err.stack);
            }
            return "successfully";
        }
    );
};

function createLoopMail() {
    // рекурсивно-замыкающая функция
    const result = require("./company.json"); // файл с данными (копия где будут удаления!)
    let rwResult = result.map((item) => item); // копия для перезаписи
    let numberMailSend = 0; // указываем сколько писем хотим отправить. По умолчанию - если 0  - значит все по длине массива.
    console.log("Не обработанных адресов осталось:", result.length);
    const fileWriteJSON = require("./data"); // импортированная функция записи массива в файл
    const sendmail = []; // массив хранения отправленных ссылок
    let sendFirm;
    try {
        sendFirm = require("./sendFirm.json"); // если файл есть работаем с ним
    } catch {
        fileWriteJSON([], "sendFirm"); // если нет, создаем новый пустой
        sendFirm = []; // присваиваем переменной пустой массив
    }
    let i = 0; // итератор

    return function iterator() {
        if (result[i].email.join() === "") {
            console.log(result[i].name, "- 'not email!'");
            rwResult = rwResult.filter((item) => item !== result[i]); // удаляем пройденные элементы из основного массива
        } else {
            let mail = { name: result[i].name, email: result[i].email.join() }; // отправляем письмо
            smtpMailServer(mail);
            sendmail.push(mail);
            console.log(
                result[i].name,
                result[i].email.join(),
                "Итого:",
                i + 1,
                "из:",
                result.length
            );
            rwResult = rwResult.filter((item) => item !== result[i]); // удаляем пройденные элементы из основного массива
        }

        if (++i >= (numberMailSend !== 0 ? numberMailSend : result.length))
            return (
                fileWriteJSON(sendFirm.concat(sendmail), "sendFirm"), // записываем файл со списком куда мы отправили письма
                fileWriteJSON(rwResult, "company"), // перезаписываем изначальный файл необработанных писем
                console.log(
                    "Отправлено писем в компании:",
                    sendFirm.length + sendmail.length
                ) // перезаписываем основной массив
            ); // возвращаем записанный (дозаписанный) файл
        setTimeout(iterator, 2500);
    };
}

const iterator = createLoopMail();
iterator(); // запускаем весь код
