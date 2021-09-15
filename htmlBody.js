module.exports = (name) => {
    // оформление текста письма
    return `<body>
    <div class="heder_block" width="100%" cellspacing="0" cellpadding="0">
        <p class="header">
            Hello, my name is Name
        </p>
    </div>
    <div class="text_block" width="100%" cellspacing="0" cellpadding="0">
        <p class="text">
            I would like to work in the company "${name}" .
            <i>Name LastName</i>
        </p>
    </div>
    <style>
        body {
            max-width: 100%;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            padding: 0;
            margin: 0;
        }

        .text_block {
            background-color: #f5f5f5;
            width: 100%;
            margin: 0;
        }

        .text {
            padding: 40px;
            margin: 0;
            line-height: 1.5;
        }
    </style>
</body>`;
};
