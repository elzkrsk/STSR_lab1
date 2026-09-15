// ========================================
// ПОЛУЧАЕМ ЭЛЕМЕНТЫ СТРАНИЦЫ
// ========================================

const form = document.getElementById("surveyForm");

const rating = document.getElementById("rating");
const ratingValue = document.getElementById("ratingValue");

const resultButton = document.getElementById("resultButton");

const weekInput = document.getElementById("week");
const weekPlaceholder = document.getElementById("weekPlaceholder");


// ========================================
// ПОЛЕ "НЕДЕЛЯ"
// ========================================

function updateWeekPlaceholder() {

    if (weekInput.value) {

        // Получаем выбранную неделю
        const value = weekInput.value;

        // Например: 2026-W38
        weekPlaceholder.textContent = value;

    } else {

        // Если ничего не выбрано
        weekPlaceholder.textContent = "Выберите неделю";

    }

}


updateWeekPlaceholder();


weekInput.addEventListener("change", function () {

    updateWeekPlaceholder();

});


// Проверяем состояние поля при загрузке страницы

updateWeekPlaceholder();


// Скрываем надпись после выбора недели

weekInput.addEventListener("change", function () {

    updateWeekPlaceholder();

});


// ========================================
// ОТОБРАЖЕНИЕ ЗНАЧЕНИЯ RANGE
// ========================================

rating.addEventListener("input", function () {

    ratingValue.textContent = rating.value;

});


// ========================================
// ОЧИСТКА ФОРМЫ
// ========================================

form.addEventListener("reset", function () {

    setTimeout(function () {

        // Возвращаем значение range
        ratingValue.textContent = rating.value;

        // Возвращаем надпись для недели
        updateWeekPlaceholder();

    }, 0);

});


// ========================================
// КНОПКА "ПОСМОТРЕТЬ РЕЗУЛЬТАТЫ"
// ========================================

resultButton.addEventListener("click", function () {

    // Проверяем обязательные поля

    if (!form.checkValidity()) {

        form.reportValidity();

        return;

    }


    // ========================================
    // ПОЛУЧАЕМ ИМЯ
    // ========================================

    const name = document
        .getElementById("name")
        .value
        .trim();


    // ========================================
    // ПОЛУЧАЕМ НЕДЕЛЮ
    // ========================================

    const week = weekInput.value;


    // ========================================
    // ПОЛУЧАЕМ CHECKBOX
    // ========================================

    const selectedInterests =
        document.querySelectorAll(
            'input[name="interests"]:checked'
        );

    const interests = [];


    selectedInterests.forEach(function (checkbox) {

        interests.push(checkbox.value);

    });


    // Проверяем, выбран ли хотя бы один checkbox

    if (interests.length === 0) {

        alert(
            "Выберите хотя бы один вариант " +
            "того, что вам понравилось."
        );

        return;

    }


    // ========================================
    // ПОЛУЧАЕМ БРЕНД
    // ========================================

    const brand = document
        .getElementById("brand")
        .value;


    // ========================================
    // ПОЛУЧАЕМ RADIO
    // ========================================

    const selectedRecommend =
        document.querySelector(
            'input[name="recommend"]:checked'
        );


    const recommend = selectedRecommend
        ? selectedRecommend.value
        : "";


    // ========================================
    // ПОЛУЧАЕМ ОЦЕНКУ
    // ========================================

    const ratingNumber =
        rating.value;


    // ========================================
    // ПОЛУЧАЕМ ЦВЕТ
    // ========================================

    const color =
        document.getElementById("color").value;


    // ========================================
    // ПОЛУЧАЕМ СПИСОК ПОЛЬЗОВАТЕЛЕЙ
    // ИЗ LOCALSTORAGE
    // ========================================

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    // Добавляем новое имя

    users.push(name);


    // Сохраняем обновлённый список

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    // ========================================
    // ОТКРЫВАЕМ ОКНО РЕЗУЛЬТАТОВ
    // ========================================

    const resultWindow = window.open(
        "",
        "resultsWindow",
        "width=900,height=700,resizable=yes"
    );


    // Проверяем, удалось ли открыть окно

    if (!resultWindow) {

        alert(
            "Не удалось открыть новое окно. " +
            "Разрешите всплывающие окна в браузере."
        );

        return;

    }


    // ========================================
    // СОЗДАЁМ НУМЕРОВАННЫЙ СПИСОК
    // ПРЕДЫДУЩИХ ПОЛЬЗОВАТЕЛЕЙ
    // ========================================

    let usersList = "<ol>";


    users.forEach(function (user) {

        usersList +=
            "<li>" +
            user +
            "</li>";

    });


    usersList += "</ol>";


    // ========================================
    // ВЫВОДИМ РЕЗУЛЬТАТЫ
    // ========================================

    resultWindow.document.write(`

        <!DOCTYPE html>

        <html lang="ru">

        <head>

            <meta charset="UTF-8">

            <meta
                name="viewport"
                content="width=device-width,
                initial-scale=1.0"
            >

            <title>
                Результаты опроса
            </title>


            <style>

                * {
                    box-sizing: border-box;
                }


                body {

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    background-color: #f4f7fb;

                    color: #202938;

                    padding: 30px;

                    margin: 0;

                }


                h1 {

                    text-align: center;

                    color: #172554;

                    margin-bottom: 30px;

                }


                h2 {

                    color: #172554;

                    margin-top: 35px;

                }


                table {

                    width: 100%;

                    border-collapse: collapse;

                    background-color: white;

                    border-radius: 10px;

                    overflow: hidden;

                    box-shadow:
                        0 5px 20px
                        rgba(30, 50, 80, 0.08);

                }


                th,
                td {

                    border: 1px solid #d5dce8;

                    padding: 13px;

                    text-align: left;

                }


                th {

                    background-color: #172554;

                    color: white;

                }


                tr:nth-child(even) {

                    background-color: #f8fafc;

                }


                ol {

                    background-color: white;

                    border: 1px solid #e0e6ef;

                    border-radius: 10px;

                    padding:
                        20px
                        20px
                        20px
                        40px;

                }


                li {

                    padding: 6px;

                }


                .color-box {

                    display: inline-block;

                    width: 30px;

                    height: 30px;

                    border-radius: 6px;

                    border:
                        1px solid #777;

                    vertical-align: middle;

                    margin-right: 10px;

                    background-color: ${color};

                }


                .buttons {

                    margin-top: 30px;

                    text-align: center;

                }


                button {

                    padding: 11px 20px;

                    margin: 5px;

                    border: none;

                    border-radius: 8px;

                    background-color: #2563eb;

                    color: white;

                    cursor: pointer;

                    font-size: 14px;

                    font-weight: 600;

                }


                button:hover {

                    background-color: #1d4ed8;

                }

            </style>

        </head>


        <body>


            <h1>
                Результаты опроса
            </h1>


            <table>

                <tr>

                    <th>
                        Параметр
                    </th>

                    <th>
                        Результат
                    </th>

                </tr>


                <tr>

                    <td>
                        Имя посетителя
                    </td>

                    <td>
                        ${name}
                    </td>

                </tr>


                <tr>

                    <td>
                        Неделя посещения
                    </td>

                    <td>
                        ${week}
                    </td>

                </tr>


                <tr>

                    <td>
                        Что понравилось
                    </td>

                    <td>
                        ${interests.join(", ")}
                    </td>

                </tr>


                <tr>

                    <td>
                        Любимый бренд
                    </td>

                    <td>
                        ${brand}
                    </td>

                </tr>


                <tr>

                    <td>
                        Рекомендует выставку
                    </td>

                    <td>
                        ${recommend}
                    </td>

                </tr>


                <tr>

                    <td>
                        Оценка выставки
                    </td>

                    <td>
                        ${ratingNumber} из 10
                    </td>

                </tr>


                <tr>

                    <td>
                        Любимый цвет смартфона
                    </td>

                    <td>

                        <span
                            class="color-box">
                        </span>

                        ${color}

                    </td>

                </tr>

            </table>


            <h2>
                Ранее зарегистрированные
                пользователи
            </h2>


            ${usersList}


            <div class="buttons">

                <button
                    onclick="window.close()"
                >
                    Закрыть окно
                </button>


                <button
                    onclick="
                        localStorage.removeItem('users');
                        location.reload();
                    "
                >
                    Очистить список пользователей
                </button>

            </div>


        </body>

        </html>

    `);


    resultWindow.document.close();

});