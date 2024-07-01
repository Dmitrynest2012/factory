
const clientName = "Шевченко Юлия"; // Глобальная переменная для ФИО клиента
const clientGender = "female"; // Глобальная переменная для пола клиента
const clientBirthDate = "23-05-1980"; // Глобальная переменная для даты рождения клиента в формате дд.мм.гггг
const clientLaboratory = 1; // Глобальная переменная лаборатории, где клиент сдавал анализы
const clientDeliveryDateTime = "25-06-2024 10:00"; // Пример значения даты и времени сдачи
const clientTariff = "PRO"; // Пример значения клиентского тарифа



// Глобальная переменная для хранения выбранного пола
let gender = null;
let age = null; // Глобальная переменная для хранения возраста
let laboratory = null;
let tarif = null;

// Глобальный счетчик контейнеров
let globalContainerCount = 0;



// Симуляция данных из labs.json
const labsData = [
    { "id": 1, "name": "Хромолаб" },
    { "id": 2, "name": "Медси" },
    { "id": 3, "name": "KDL" },
    { "id": 4, "name": "Invitro" }
];







// Создаем элемент кнопки
let backToTopButton = document.createElement("button");
backToTopButton.id = "backToTop";
backToTopButton.className = "back-to-top";
backToTopButton.innerHTML = "&#9650;";
document.body.appendChild(backToTopButton);

// Показать или скрыть кнопку в зависимости от позиции прокрутки
window.onscroll = function() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Функция плавного прокручивания вверх
function scrollToTop() {
    let scrollStep = -window.scrollY / (900 / 15);
    let scrollInterval = setInterval(function() {
        if (window.scrollY != 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}

// Добавляем событие клика на кнопку
backToTopButton.onclick = function() {
    // Сразу скрываем кнопку
    backToTopButton.style.display = "none";

    // Запускаем прокрутку наверх
    scrollToTop();
};



// Создаем элемент "заклейка"
let stickyNote = document.createElement("div");
stickyNote.className = "sticky-note";

// Добавляем "заклейку" на страницу
document.body.appendChild(stickyNote);












// Функция для преобразования значения пола
function displayGender(genderValue) {
    return genderValue === "male" ? "Мужской" : "Женский";
}

// Функция для вычисления возраста на основе даты рождения
function calculateAge(birthDate) {
    const [day, month, year] = birthDate.split('-');
    const birthDateObj = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
}

// Функция для получения имени лаборатории по ID
function getLaboratoryNameById(id) {
    const lab = labsData.find(lab => lab.id === id);
    return lab ? lab.name : 'Неизвестная лаборатория'; // Возвращаем имя или дефолтное значение, если лаборатория не найдена
}


function calculateTimeElapsed(deliveryDateTime) {
    const [datePart, timePart] = deliveryDateTime.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    const deliveryDateObj = new Date(year, month - 1, day, hour, minute);
    const now = new Date();

    // Проверяем, если дата сдачи еще не наступила
    if (now < deliveryDateObj) {
        return '[ошибка, исправьте дату]';
    }

    // Разница в миллисекундах
    let diffMilliseconds = now - deliveryDateObj;

    // Количество миллисекунд в минуте, часе, дне и неделе
    const msPerMinute = 1000 * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;
    const msPerMonth = msPerDay * 30.44; // Среднее количество дней в месяце
    const msPerYear = msPerDay * 365.25; // Среднее количество дней в году

    // Вычисляем количество лет, месяцев, недель, дней, часов и минут
    let years = Math.floor(diffMilliseconds / msPerYear);
    diffMilliseconds %= msPerYear;
    let months = Math.floor(diffMilliseconds / msPerMonth);
    diffMilliseconds %= msPerMonth;
    let weeks = Math.floor(diffMilliseconds / msPerWeek);
    diffMilliseconds %= msPerWeek;
    let days = Math.floor(diffMilliseconds / msPerDay);
    diffMilliseconds %= msPerDay;
    let hours = Math.floor(diffMilliseconds / msPerHour);
    diffMilliseconds %= msPerHour;
    let minutes = Math.floor(diffMilliseconds / msPerMinute);

    // Формируем строку с прошедшим временем
    let timeElapsedString = '[прошло ';
    let added = false;

    if (years > 0) {
        timeElapsedString += `${years} лет`;
        added = true;
    }
    if (months > 0) {
        if (added) timeElapsedString += ', ';
        timeElapsedString += `${months} месяцев`;
        added = true;
    }
    if (weeks > 0) {
        if (added) timeElapsedString += ', ';
        timeElapsedString += `${weeks} недель`;
        added = true;
    }
    if (days > 0) {
        if (added) timeElapsedString += ', ';
        timeElapsedString += `${days} дней`;
        added = true;
    }
    if (hours > 0 && !(years > 0 || months > 0 || weeks > 0 || days > 0)) {
        if (added) timeElapsedString += ', ';
        timeElapsedString += `${hours} часов`;
        added = true;
    }
    if (minutes > 0 && !(years > 0 || months > 0 || weeks > 0 || days > 0 || hours > 0)) {
        if (added) timeElapsedString += ', ';
        timeElapsedString += `${minutes} минут`;
    }

    timeElapsedString += ']';

    return timeElapsedString;
}






/**
 * Функция для загрузки JSON данных из файла.
 * @param {string} file - Путь к файлу JSON.
 * @returns {Promise<Object>} - Объект данных из файла JSON.
 */
async function fetchJSON(file) {
    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`Не удалось загрузить ${file}: ${response.statusText}`);
    }
    return await response.json();
}

/**
 * Функция для создания группы элементов в зависимости от указанного тарифа.
 * @param {string} tarif - Выбранный тариф.
 * @param {string} gender - Пол (например, "мужчина" или "женщина").
 * @param {number} age - Возраст.
 * @param {HTMLElement} parametriaContainer - Контейнер, в который добавляются группы элементов.
 */
async function createElementsGroup(tarif, gender, age, parametriaContainer) {
    try {
        // Загружаем данные из файлов data.json и panels.json
        const data = await fetchJSON('data.json');
        const panels = await fetchJSON('panels.json');

        // Проверяем наличие указанного тарифа в panels.json
        if (!panels[tarif]) {
            console.error(`Тариф ${tarif} не найден в panels.json`);
            return;
        }

        const panel = panels[tarif];
        const options = panel.options;

        options.forEach(option => {
            const group = data[option];
            if (!group) {
                console.error(`Группа параметров ${option} не найдена в data.json`);
                return;
            }

            // Создаем контейнер для группы элементов
            const groupContainer = document.createElement('div');
            groupContainer.className = 'group-container';

            // Добавляем заголовок группы с отдельным классом
            const groupHeader = document.createElement('h3');
            groupHeader.textContent = group.name;
            groupHeader.className = 'group-header'; // Отдельный класс для заголовка
            groupContainer.appendChild(groupHeader);

            // Добавляем параметры группы
            Object.keys(group).forEach(key => {
                if (!isNaN(key)) {
                    createContainerWithInput(group[key], option, key, gender, age, groupContainer);
                }
            });

            parametriaContainer.appendChild(groupContainer);
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
}



























// Глобальная функция для создания лейблов
function createLabels(container) {
    // Создаем лейблы
    const labels = [
        { text: 'Параметры:', class: 'label-parameters', id: 'label-parameters' },
        { text: 'Нормы:', class: 'label-norms', id: 'label-norms' },
        { text: 'Значения:', class: 'label-values', id: 'label-values' },
        { text: 'Грейды:', class: 'label-grades', id: 'label-grades' }
    ];

    // Добавляем каждый лейбл в указанный контейнер
    labels.forEach(label => {
        const labelElement = document.createElement('div');
        labelElement.textContent = label.text;
        labelElement.classList.add(label.class);
        labelElement.id = label.id;
        container.appendChild(labelElement);
    });
}

// Функция для создания контейнера с параметрами и добавления в него элементов
function createParametriaContainer(gender, age) {
    // Проверяем, существует ли уже контейнер с параметрами
    const existingContainer = document.getElementById('parametria');
    if (existingContainer) {
        // Если контейнер существует, удаляем его
        existingContainer.remove();
    }

    // Создаем новый контейнер
    globalContainerCount = 0;
    const parametriaContainer = document.createElement('div');
    parametriaContainer.id = 'parametria';
    parametriaContainer.classList.add('parametria-class'); // Добавляем класс

    // Создаем лейблы и добавляем их в контейнер
    createLabels(parametriaContainer);

    // Добавляем контейнер на страницу (в body)
    document.body.appendChild(parametriaContainer);

    
    
    createElementsGroup(tarif, gender, age, parametriaContainer);
}


/**
 * Создает панель управления (контейнер) с текстом "Пол" и выпадающим списком для выбора пола, а также с возрастом.
 * @param {string} panelId - ID для создаваемой панели управления.
 * @returns {HTMLElement} Возвращает элемент панели управления.
 */
function createControlPanel(panelId) {
    // Создаем элемент панели управления
    const panel = document.createElement('div');
    
    // Присваиваем класс для стилизации
    panel.classList.add('control-panel');

    // Устанавливаем ID, если он был предоставлен
    if (panelId) {
        panel.id = panelId;
    }


    // Создаем контейнер для текста "Клиент"
    const clientLabel = document.createElement('div');
    clientLabel.textContent = `Клиент: ${clientName}`;
    clientLabel.classList.add('client-label');

    // Добавляем контейнер с текстом "Клиент" в панель
    panel.appendChild(clientLabel);

    
    // Создаем контейнер для текста "Пол клиента"
    const clientGenderLabel = document.createElement('div');
    clientGenderLabel.textContent = `Пол: ${displayGender(clientGender)}`; // Показывает текущий пол, но замаскированный под русские значения
    clientGenderLabel.classList.add('client-gender-label');

    // Добавляем контейнер с текстом "Пол клиента" в панель
    panel.appendChild(clientGenderLabel);

    gender = clientGender;


    
     // Вычисляем возраст клиента на основе даты рождения
    const clientAge = calculateAge(clientBirthDate);

    // Создаем контейнер для текста "Дата рождения клиента"
    const clientBirthDateLabel = document.createElement('div');
    clientBirthDateLabel.textContent = `Дата рождения: ${clientBirthDate} [${clientAge} лет]`;
    clientBirthDateLabel.classList.add('client-birthdate-label');

    // Добавляем контейнер с текстом "Дата рождения клиента" в панель
    panel.appendChild(clientBirthDateLabel);

    age = clientAge;
    


    // Добавляем контейнер с текстом "Лаборатория сдачи"
    const clientLaboratoryLabel = document.createElement('div');
    clientLaboratoryLabel.textContent = `Лаборатория сдачи: ${getLaboratoryNameById(clientLaboratory)}`; // здесь должно быть значение переменной laboratory
    clientLaboratoryLabel.classList.add('client-laboratory-label');

    // Добавляем контейнер с текстом "Лаборатория сдачи" в панель
    panel.appendChild(clientLaboratoryLabel);

    laboratory = clientLaboratory;


    // Создаем контейнер для текста "Дата и время сдачи"
    const clientDeliveryLabel = document.createElement('div');
    clientDeliveryLabel.textContent = `Дата и время сдачи: ${clientDeliveryDateTime} ${calculateTimeElapsed(clientDeliveryDateTime)}`;
    clientDeliveryLabel.classList.add('client-delivery-label');

    // Добавляем контейнер с текстом "Дата и время сдачи" в панель
    panel.appendChild(clientDeliveryLabel);


    // Добавляем контейнер с текстом "Клиентский тариф"
    const clientTariffLabel = document.createElement('div');
    clientTariffLabel.textContent = `Клиентский тариф: ${clientTariff}`;
    clientTariffLabel.classList.add('client-tariff-label');

    // Добавляем контейнер с текстом "Клиентский тариф" в панель
    panel.appendChild(clientTariffLabel);



    


    // Создаем контейнер для текста "Пол"
    const genderLabel = document.createElement('div');
    genderLabel.textContent = 'Пол:';
    genderLabel.classList.add('gender-label');

    // Добавляем контейнер с текстом "Пол" в панель
    panel.appendChild(genderLabel);

    // Создаем выпадающий список для выбора пола
    const genderSelect = document.createElement('select');
    genderSelect.classList.add('gender-select');
    genderSelect.style.backgroundColor = 'white';
    genderSelect.style.border = `2px solid #dddddd`;
    genderSelect.style.borderRadius = `20px`;

    // Добавляем обработчик изменения выбора пола
    genderSelect.addEventListener('change', function() {
        gender = this.value; // Обновляем глобальную переменную при изменении выбора
        createParametriaContainer(gender, age); // Создаем контейнер с параметрами
    });

    // Добавляем обработчики событий для изменения стилей при ховере и фокусе
    genderSelect.addEventListener('mouseenter', function() {
        this.style.border = `1px solid #3af`; /* Синий цвет рамки при ховере */
    });

    genderSelect.addEventListener('mouseleave', function() {
        this.style.border = `1px solid #ddd`; /* Возвращаем серый цвет рамки после ховера */
    });

    genderSelect.addEventListener('focus', function() {
        this.style.border = `1px solid #3af`; /* Синий цвет рамки при фокусе */
    });

    genderSelect.addEventListener('blur', function() {
        this.style.border = `1px solid #ddd`; /* Возвращаем серый цвет рамки после фокуса */
    });

    // Добавляем опции в выпадающий список
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Выберите пол';
    genderSelect.appendChild(defaultOption);

    const maleOption = document.createElement('option');
    maleOption.value = 'male';
    maleOption.text = 'Мужской';
    genderSelect.appendChild(maleOption);

    const femaleOption = document.createElement('option');
    femaleOption.value = 'female';
    femaleOption.text = 'Женский';
    genderSelect.appendChild(femaleOption);

    // Маска
    genderSelect.value = gender;

    // Устанавливаем значение по умолчанию из глобальной переменной клиента
    genderSelect.value = clientGender;

    

    // Добавляем выпадающий список в панель
    panel.appendChild(genderSelect);

    // Создаем контейнер для текста "Возраст"
    const ageLabel = document.createElement('div');
    ageLabel.textContent = 'Возраст:';
    ageLabel.classList.add('age-label');
    

    // Добавляем контейнер с текстом "Возраст" в панель
    panel.appendChild(ageLabel);

    // Создаем инпут для ввода возраста
    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.placeholder = 'Укажите возраст';
    ageInput.classList.add('age-input');
    ageInput.style.width = '140px'; // Пример установки ширины инпута (можно менять)
    ageInput.style.backgroundColor = 'white';
    ageInput.style.border = `2px solid #dddddd`;
    ageInput.style.borderRadius = `20px`;

    // Устанавливаем значение по умолчанию из глобальной переменной возраста
ageInput.value = age || '';

// Добавляем обработчики событий для изменения стилей при ховере и фокусе
ageInput.addEventListener('mouseenter', function() {
    this.style.border = `1px solid #3af`; /* Синий цвет рамки при ховере */
});

ageInput.addEventListener('mouseleave', function() {
    this.style.border = `1px solid #ddd`; /* Возвращаем серый цвет рамки после ховера */
});

ageInput.addEventListener('focus', function() {
    this.style.border = `1px solid #3af`; /* Синий цвет рамки при фокусе */
});

ageInput.addEventListener('blur', function() {
    this.style.border = `1px solid #ddd`; /* Возвращаем серый цвет рамки после фокуса */
});




    ageInput.addEventListener('input', function() {
        age = parseInt(this.value); // Обновляем глобальную переменную возраста при изменении значения
        createParametriaContainer(gender, age); // Обновляем контейнер с параметрами
    });

    // Добавляем инпут для ввода возраста в панель
    panel.appendChild(ageInput);


    

    fetch('labs.json')
    .then(response => response.json())
    .then(labsData => {
        const labLabel = document.createElement('div');
        labLabel.textContent = 'Лаборатория:';
        labLabel.classList.add('lab-label');
        panel.appendChild(labLabel);

        

        const labSelect = createSelect('lab-select', 'Выберите лабораторию', labsData.map(lab => ({
            value: lab.id,
            text: lab.name
            
        })));

        labSelect.style.backgroundColor = 'white';
            labSelect.style.border = `2px solid #dddddd`;
            labSelect.style.borderRadius = `20px`;

            // Устанавливаем лабораторию по умолчанию
        labSelect.value = laboratory;
        
        

        labSelect.addEventListener('change', function() {
            laboratory = this.value;

            
            
            updateTarifSelect(); 
            
        });

        panel.appendChild(labSelect);

        

        fetch('tarifs.json')
            .then(response => response.json())
            .then(data => {
                tarifData = data; 

                setTimeout(updateTarifSelect, 1000); // Вызываем функцию обновления списка тарифов через 1 секунду

                const tarifLabel = document.createElement('div');
                tarifLabel.textContent = 'Панель:';
                tarifLabel.classList.add('tarif-label');
                panel.appendChild(tarifLabel);

                const tarifSelect = createSelect('tarif-select', 'Выберите панель', []);
                tarifSelect.addEventListener('change', function() {
                    tarif = this.value;
                    createParametriaContainer(gender, age);
                    console.log('Выбрана панель:', tarif);
                });
                panel.appendChild(tarifSelect);

                tarifSelect.style.backgroundColor = 'white';
                    tarifSelect.style.border = `2px solid #dddddd`;
                    tarifSelect.style.borderRadius = `20px`;

                    


                    // Функция для обновления списка тарифов и установки значения по умолчанию
        function updateTarifSelect() {
            // Фильтруем тарифы по лаборатории
            const filteredTarifs = tarifData.filter(tarif => tarif.labId == laboratory);
        
            // Создаем объект для хранения тарифов и их соответствия по ключевым буквам
            const tariffMatches = {};
        
            // Проходим по отфильтрованным тарифам и вычисляем соответствия по ключевым буквам
            filteredTarifs.forEach(tarif => {
                const tariffName = tarif.name;
                const keyLetters = getKeyLetters(clientTariff, tariffName);
                tariffMatches[tariffName] = keyLetters.length;
            });
        
            // Сортируем тарифы по наибольшему количеству совпадающих ключевых букв
            const sortedTarifs = filteredTarifs.sort((a, b) => {
                return tariffMatches[b.name] - tariffMatches[a.name];
            });
        
            // Очищаем список тарифов перед добавлением новых опций
            tarifSelect.innerHTML = '';
        
            // Создаем опции для выпадающего списка на основе отсортированных тарифов
            const defaultOption = document.createElement('option');
            defaultOption.text = 'Выберите панель';
            tarifSelect.appendChild(defaultOption);
        
            sortedTarifs.forEach(tarif => {
                const optionElement = document.createElement('option');
                optionElement.value = tarif.name;
                optionElement.text = tarif.name;
                tarifSelect.appendChild(optionElement);
            });
        
            // Устанавливаем выбранное значение в соответствии с наиболее подходящим тарифом
            if (sortedTarifs.length > 0) {
                tarifSelect.value = sortedTarifs[0].name; // Устанавливаем первый в отсортированном списке тариф
                tarif = sortedTarifs[0].name; // Обновляем глобальную переменную для тарифа
                createParametriaContainer(gender, age); // Создаем контейнер с параметрами
            }
        }
        
        // Функция для получения ключевых букв для сравнения тарифов
        function getKeyLetters(clientTariff, tariffName) {
            const clientLetters = clientTariff.toLowerCase().replace(/[^а-яa-z]/g, '');
            const tariffLetters = tariffName.toLowerCase().replace(/[^а-яa-z]/g, '');
            const keyLetters = [];
        
            for (let i = 0; i < clientLetters.length; i++) {
                const letter = clientLetters[i];
                if (tariffLetters.includes(letter) && !keyLetters.includes(letter)) {
                    keyLetters.push(letter);
                }
            }
        
            return keyLetters;
        }
                    

                
                labSelect.addEventListener('change', updateTarifSelect);
            })
            .catch(error => {
                console.error('Ошибка при загрузке tarifs.json:', error);
            });
    })
    .catch(error => {
        console.error('Ошибка при загрузке labs.json:', error);
    });

return panel;
}

/**
 * Создает выпадающий список (select) с указанными опциями.
 *
 * @param {string} className - Класс для создаваемого элемента select.
 * @param {string} defaultOptionText - Текст первой опции (подсказка).
 * @param {Array} options - Массив объектов с опциями для списка в формате {value, text}.
 * @returns {HTMLElement} Возвращает элемент выпадающего списка (select).
 */
function createSelect(className, defaultOptionText, options) {
    // Создаем элемент select и добавляем ему класс
    const select = document.createElement('select');
    select.classList.add(className);

    // Создаем и добавляем элемент option для подсказки
    const defaultOption = document.createElement('option');
    defaultOption.text = defaultOptionText;
    select.appendChild(defaultOption);

    // Проходим по массиву options и создаем элементы option для каждого объекта
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.text = option.text;
        select.appendChild(optionElement);
    });

    // Возвращаем созданный элемент select
    return select;
}



// Пример использования функции для создания панели управления с ID 'controlPanel'
const controlPanel = createControlPanel('controlPanel');
document.body.appendChild(controlPanel);








// Глобальный массив для хранения состояний чекбоксов
const checkboxStates = [];

/**
 * Асинхронно создает переключатель чекбокса.
 * @param {string} id - Идентификатор элемента, куда будет вставлен чекбокс.
 * @param {boolean} defaultValue - Значение по умолчанию (true - включен, false - выключен).
 */
async function createCheckboxToggle(id, defaultValue) {
    try {
        // Находим элемент, куда нужно вставить переключатель
        const container = document.getElementById(id);
        
        // Создаем элементы чекбокса
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = defaultValue;
        
        // Добавляем информацию о чекбоксе в массив checkboxStates
        checkboxStates.push({ id, checked: defaultValue });

        // Добавляем классы для стилизации (будут определены в CSS)
        checkbox.classList.add('toggle-checkbox');
        
        // Устанавливаем стиль для смещения чекбокса на 550 пикселей влево
        checkbox.style.position = 'absolute';
        checkbox.style.left = '300px';
        checkbox.style.border = '1px solid rgba(78, 78, 78, 0.25)';
        checkbox.style.borderRadius = '20px';
        
        // Добавляем обработчик события изменения состояния чекбокса
        checkbox.addEventListener('change', function() {
            const dropdownId = `${id}-dropdown`;
            const inputId = `${id}-input`;
            const dropdown = document.getElementById(dropdownId);
            const input = document.getElementById(inputId);
        
            if (checkbox.checked) {
                // Блокируем выпадающий список и инпут
                if (dropdown) {
                    dropdown.disabled = true;
                    // Очищаем значение выпадающего списка
                    dropdown.selectedIndex = -1;
                }
                if (input) {
                    input.disabled = true;
                    // Очищаем значение инпута
                    input.value = '';
                    updateGradePanelStatus(input.value, container.id, checkbox.checked); // Передача состояния чекбокса
                }
                // Показываем индикатор
                createIndicator(true, container);
            } else {
                // Разблокируем выпадающий список и инпут
               
                if (dropdown) dropdown.disabled = false;
                disableToggle = false;
                
                if (input) input.disabled = false;
                // Скрываем индикатор
                createIndicator(false, container);
            }
        
            // Обновляем значение в массиве checkboxStates
            const index = checkboxStates.findIndex(item => item.id === id);
            if (index !== -1) {
                checkboxStates[index].checked = checkbox.checked;
            }
            console.log(`Checkbox ${id} changed: ${checkbox.checked}`);
        });
        
        
        
        // Добавляем чекбокс в контейнер
        container.appendChild(checkbox);
    } catch (error) {
        console.error('Error creating checkbox:', error);
    }
}


// Определяем нужно ли отключить параметр в зависимости от значения переменной tarif
let disableToggle;


/**
 * Создает индикатор в виде иконки из Unicode с добавлением класса.
 * @param {boolean} isActive - Значение индикатора. Если true, индикатор будет зеленым (🟢), иначе серым (🔘).
 * @param {HTMLElement} container - HTML элемент, в который будет добавлен индикатор.
 * @param {boolean} IndicatorDisable - переменная отключения индикатора по умолчанию.
 * @returns {void}
 */
function createIndicator(isActive, container, IndicatorDisable) {
    // Определяем символы Unicode для индикаторов

    let grayIcon;

    if(IndicatorDisable) {
    grayIcon = '🟢';
    } else {
        grayIcon = '🔘';  
    }


    const greenIcon = '🟢';

    // Выбираем иконку в зависимости от значения isActive
    const icon = isActive ? greenIcon : grayIcon;

    // Определяем класс для индикатора
    const indicatorClass = isActive ? 'indicator-green' : 'indicator-gray';

    // Ищем существующий индикатор внутри контейнера
    let indicator = container.querySelector('.indicator');

    if (indicator) {
        // Если индикатор уже существует, обновляем его
        indicator.textContent = icon;
        indicator.className = `indicator ${indicatorClass}`;
    } else {
        // Если индикатора нет, создаем новый и добавляем его в контейнер
        indicator = document.createElement('span');
        indicator.className = `indicator ${indicatorClass}`;
        indicator.textContent = icon;
        container.appendChild(indicator);
    }
}


/**
 * Создает заголовок с отображаемым значением счетчика, оборачивая его в дополнительный контейнер с уникальным классом.
 * @param {number} count - Номер контейнера.
 * @param {string} headerText - Текст заголовка.
 * @param {string} paramId - ID параметра.
 * @returns {HTMLElement} - Контейнер с заголовком и счетчиком.
 */
function createHeaderWithCounter(count, headerText, paramId) {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('headerContainer'); // Добавляем класс для стилей
    headerContainer.id = `${paramId}`; // Назначаем ID контейнеру заголовка

    const header = document.createElement('h2');

    // Если длина текста больше 27 символа, обрезаем и добавляем многоточие
    const displayText = headerText.length > 27 ? headerText.slice(0, 27) + '...' : headerText;
    header.textContent = `${count}. ${displayText}`;

    headerContainer.appendChild(header);

    // Загружаем данные из panels.json для проверки запрещенных параметров
    /*
    const panelsResponse = await fetch('panels.json');
    const panelsData = await panelsResponse.json();
    */

    // Флаг для отслеживания состояния расширения контейнера
    let expanded = false;

    // Добавляем обработчик событий для переключения состояния расширения контейнера
    headerContainer.addEventListener('click', () => {
        expanded = !expanded;
        headerContainer.classList.toggle('expanded', expanded);

        // Меняем текст при расширении и сжатии контейнера
        if (expanded) {
            header.textContent = `${count}. ${headerText}`;
        } else {
            header.textContent = `${count}. ${displayText}`;
        }
    });

    // Добавляем обработчик события mouseleave для возврата к исходному состоянию
    headerContainer.addEventListener('mouseleave', () => {
        if (expanded) {
            expanded = false;
            headerContainer.classList.remove('expanded');
            header.textContent = `${count}. ${displayText}`;
        }
    });
    return headerContainer;
}


// Буфер для сохранения значений при смене панелей
let parallelDataBuffer = [
    { parameterHeader: "", lowerBound: "", upperBound: "", inputValue: "" }
];



/**
 * Создает контейнер с заголовком, содержащий чекбокс, выпадающий список и инпут.
 * @param {string} id - ID контейнера.
 * @param {string} type - Тип параметра ('vitamins', 'minerals', 'biochemistry').
 * @param {number} number - Номер параметра в списке типа.
 * @param {string} gender - Пол (например, 'male', 'female').
 * @param {number} age - Возраст.
 * @param {HTMLElement} parentContainer - Контейнер, в который будет добавлен новый контейнер.
 * @param {Object} panels - Данные из panels.json для проверки запрещенных параметров.
 */
async function createContainerWithInput(id, type, number, gender, age, parentContainer, panels) {
    const container = document.createElement('div');
    container.id = id;
    container.classList.add('inputContainer'); // Добавляем класс для стилей (если нужно)

    try {
        // Загружаем данные из JSON файла
        const response = await fetch('data.json');
        const data = await response.json();

        // Определяем заголовок контейнера и ID параметра в зависимости от типа и номера
        let headerText = 'Unknown Parameter';
        let paramId = null;

        if (data[type]) {
            const groupId = data[type].group_id;
            paramId = groupId + '-' + number;

            // Проверяем, есть ли соответствующий параметр ID
            const idKey = `id ${number}`;
            if (data[type][idKey]) {
                headerText = data[type][idKey];
                paramId = data[type][idKey];
            } else if (data[type][number.toString()]) {
                headerText = data[type][number.toString()];
            }
        } else {
            console.error(`Data for type "${type}" not found in data.json`);
        }

        // Увеличиваем глобальный счетчик контейнеров
        globalContainerCount++;

        // Создаем заголовок с отображаемым значением счетчика и ID параметра
        const headerContainer = createHeaderWithCounter(globalContainerCount, headerText, paramId);

        // Добавляем заголовок в контейнер
        container.appendChild(headerContainer);
        container.setAttribute('data-type', type); // Добавляем атрибут для удобства (если нужно)

        // Добавляем контейнер в родительский контейнер
        parentContainer.appendChild(container);

        // Загружаем данные из panels.json
        const panelsResponse = await fetch('panels.json');
        const panelsData = await panelsResponse.json();

        // Определяем нужно ли отключить параметр в зависимости от значения переменной tarif
        let disableToggle = false;
        if (panelsData[tarif] && panelsData[tarif]['disable parameters']) {
            disableToggle = panelsData[tarif]['disable parameters'].includes(headerText);
        }

        // Создаем переключатель чекбокса с использованием данных из panels.json
        await createCheckboxToggle(id, disableToggle, panels);

        // Создаем выпадающий список перед инпутом
        await createDropdownList(`${id}-dropdown`, headerText, container, gender, age, tarif, paramId, disableToggle);

        // Проверяем наличие элемента в parallelDataBuffer
        let bufferItem = parallelDataBuffer.find(item => item.parameterHeader === headerText);
        let defaultValue = '';
        if (bufferItem) {
            defaultValue = bufferItem.inputValue;
        } else {
            bufferItem = {
                parameterHeader: headerText,
                lowerBound: "",
                upperBound: "",
                inputValue: ""
            };
            parallelDataBuffer.push(bufferItem);
        }

        // Создаем инпут с помощью функции createSmartInput, передавая значение disableToggle и defaultValue
        createSmartInput(`${id}-input`, 10, 6, id, disableToggle, headerText, defaultValue);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

/**
 * Главная функция, загружающая данные и создающая контейнеры последовательно.
 * @param {HTMLElement} parentContainer - Контейнер, в который будут добавлены новые контейнеры.
 * @param {Array} containerConfigs - Массив конфигураций для контейнеров.
 */
async function initializeContainers(parentContainer, containerConfigs) {
    try {
        // Загружаем данные из JSON файла
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Загружаем данные из panels.json
        const panelsResponse = await fetch('panels.json');
        const panelsData = await panelsResponse.json();

        // Создаем контейнеры последовательно
        for (const config of containerConfigs) {
            const { id, type, number, gender, age } = config;
            await createContainerWithInput(id, type, number, gender, age, parentContainer, panelsData);
        }
    } catch (error) {
        console.error('Error initializing containers:', error);
    }
}






/**
 * Создает выпадающий список с элементами, извлечёнными из JSON файла.
 * @param {string} id - ID выпадающего списка.
 * @param {string} filterName - Имя для фильтрации позиций в JSON файле.
 * @param {HTMLElement} container - Контейнер, в который будет добавлен выпадающий список.
 * @param {string} gender - Пол (например, 'male', 'female').
 * @param {number} age - Возраст.
 * @param {string} tarif - Номер текущей панели.
 * @param {boolean} disableToggleOnCreation - Указывает, должен ли список быть заблокирован при создании.
 * @param {number} [lowerNorm] - Нижняя граница нормы.
 * @param {number} [upperNorm] - Верхняя граница нормы.
 * @returns {Promise<void>} - Возвращает промис для синхронизации с другими действиями.
 */
async function createDropdownList(id, filterName, container, gender, age, tarif, paramId, disableToggleOnCreation, lowerNorm = null, upperNorm = null) {
    let isOpen = false; // Флаг для отслеживания состояния открытия списка
    const select = document.createElement('select');
    const searchInput = document.createElement('input');
    let selectedOption = null; // Выбранная опция
    let sistertHeader = paramId; // Получаем айди сестринского хэдер контейнера

    // Если disableToggleOnCreation истинно, блокируем выпадающий список сразу
    if (disableToggleOnCreation) {
        select.disabled = true; // Устанавливаем disabled для блокировки select
    } else {
        select.disabled = false;
 
    }

    try {
        select.id = id;
        const response = await fetch('normal_positions.json');
        const data = await response.json();

        // Функция для проверки совпадения имени позиции по первым трем словам или полностью
        const nameMatches = (positionName, filterName) => {
            const positionNameWords = positionName.toLowerCase().split(' ');
            const filterNameWords = filterName.toLowerCase().split(' ');


            

            // Проверяем, содержит ли positionName хотя бы первые три слова из filterName
            if (filterNameWords.length >= 3) {
                const firstThreeFilterWords = filterNameWords.slice(0, 3);
                const firstThreePositionWords = positionNameWords.slice(0, 3);
                if (firstThreeFilterWords.every(word => firstThreePositionWords.includes(word))) {
                    return true;
                }
            }

            // Проверяем, содержит ли positionName все слова из filterName
            if (positionNameWords.length >= filterNameWords.length) {
                if (filterNameWords.every(word => positionNameWords.includes(word))) {
                    return true;
                }
            }
            
            return false;
        };

        // Фильтруем данные по имени, полу и панели
const filteredPositions = data.positions.filter(position => {
    return nameMatches(position.name, filterName) && 
           position.panel.toLowerCase().startsWith(tarif.toLowerCase().split(' ')[0]) && 
           (position.gender === gender || position.gender === 'all'); 
});


        // Сортируем позиции, чтобы сначала шли позиции для текущего пола, затем "all", затем по возрасту
        filteredPositions.sort((a, b) => {
            if (a.current && !b.current) {
                return -1;
            } else if (!a.current && b.current) {
                return 1;
            } else {
                // Сравниваем пол
                if (a.gender === gender && b.gender !== gender) {
                    return -1;
                } else if (a.gender !== gender && b.gender === gender) {
                    return 1;
                } else {
                    // При равенстве по полу, сортируем по "all", затем по возрасту
                    if (a.gender === 'all' && b.gender !== 'all') {
                        return -1;
                    } else if (a.gender !== 'all' && b.gender === 'all') {
                        return 1;
                    } else {
                        // При равенстве по полу и "all", сортируем по возрасту
                        return a.ageLowerBound - b.ageLowerBound;
                    }
                }
            }
        });
        


        

        

        select.addEventListener('change', () => {
            const inputValue = document.getElementById(`${container.id}-input`).value;
            updateGradePanelStatus(inputValue, container.id);
            

            // Сбрасываем стиль предыдущей выбранной опции
            if (selectedOption) {
                selectedOption.style.color = 'black'; // Черный цвет для не выбранной опции
            }

            // Получаем выбранную опцию
            selectedOption = select.options[select.selectedIndex];
            selectedOption.style.color = 'blue'; // Синий цвет для выбранной опции

            // Получаем значения границ из выбранной опции
            const bounds = JSON.parse(selectedOption.value);

            // Обновляем parallelDataBuffer
            const bufferItem = parallelDataBuffer.find(item => item.parameterHeader === filterName);
            if (bufferItem) {
                if (!bufferItem.lowerBound && !bufferItem.upperBound) {
                    bufferItem.lowerBound = bounds.lowerBound;
                    bufferItem.upperBound = bounds.upperBound;
                }
            } else {
                parallelDataBuffer.push({
                    lowerBound: bounds.lowerBound,
                    upperBound: bounds.upperBound,

                });
            }
            
        });

        // Функция для загрузки JSON файла
async function loadGeneticCodes() {
    try {
        const response = await fetch('genetic_codes.json');
        if (!response.ok) {
            throw new Error('Failed to load genetic_codes.json');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading genetic_codes.json:', error);
        return null;
    }
}



// Пример функции createOption, которая использует данные из genetic_codes.json
const createOptionGen = async (position) => {
    // Загрузка данных из genetic_codes.json
    const geneticCodes = await loadGeneticCodes();

    if (!geneticCodes) {
        console.error('Failed to load genetic codes data.');
        return;
    }

    const option = document.createElement('option');
    let upperBoundDisplay = position.upperBound; // Значение, которое будет отображаться на сайте

    // Если верхняя граница "∞", заменяем на 999999 для обработки в JavaScript
    if (position.upperBound === '∞') {
        position.upperBound = 999999;
        upperBoundDisplay = '∞'; // Отображаем символ бесконечности на сайте
    }

    // Функция для замены числовых значений на буквенные коды
    const replaceGeneticCodes = (value) => {
        for (let key in geneticCodes) {
            if (geneticCodes.hasOwnProperty(key)) {
                value = value.replace(new RegExp(geneticCodes[key], 'g'), key);
            }
        }
        return value;
    };

    // Применяем замену на буквенные коды в тексте опции
    const nameSpan = document.createElement('span');
    nameSpan.textContent = `${position.name} ${replaceGeneticCodes(`${position.lowerBound}-${upperBoundDisplay}`)} ${position.unit}`;
    option.appendChild(nameSpan);

    option.value = JSON.stringify({ lowerBound: position.lowerBound, upperBound: position.upperBound });

    // Добавляем класс, если возраст находится в заданном диапазоне
    if (age >= position.ageLowerBound && age <= position.ageUpperBound) {
        option.classList.add('matched-option');
    }

    select.appendChild(option);

    // Проверяем, соответствует ли текущая опция всем условиям фильтрации
    if (!selectedOption && age >= position.ageLowerBound && age <= position.ageUpperBound) {
        selectedOption = option;
    }
};




    const createOption = (position) => {
        const option = document.createElement('option');
        let upperBoundDisplay = position.upperBound; // Значение, которое будет отображаться на сайте
    
        // Если верхняя граница "∞", заменяем на 999999 для обработки в JavaScript
        if (position.upperBound === '∞') {
            position.upperBound = 999999;
            upperBoundDisplay = '∞'; // Отображаем символ бесконечности на сайте
        }
    
        // Преобразуем числовые границы в буквенные коды для отображения на сайте
        const letterCode = position.letterCode || ''; // Буквенный код
        const displayText = `${position.name} ${letterCode} ${position.lowerBound} - ${upperBoundDisplay} ${position.unit}`;
    
        // Создаем структуру из span элементов для разных частей текста
        const nameSpan = document.createElement('span');
        nameSpan.textContent = displayText;
        option.appendChild(nameSpan);
    
        option.value = JSON.stringify({ lowerBound: position.lowerBound, upperBound: position.upperBound });
    
        // Добавляем класс, если возраст находится в заданном диапазоне
        if (age >= position.ageLowerBound && age <= position.ageUpperBound) {
            option.classList.add('matched-option');
        }
    
        select.appendChild(option);
    
        // Проверяем, соответствует ли текущая опция всем условиям фильтрации
        if (!selectedOption && age >= position.ageLowerBound && age <= position.ageUpperBound) {
            selectedOption = option;
        }
    };
    


        
        
        
        
        
        
        
        

        

        // Функция для фильтрации поискового запроса
        const filterOptions = (searchTerm) => {
            const lowerCaseSearch = searchTerm.toLowerCase();
            select.innerHTML = ''; // Очищаем список перед добавлением отфильтрованных элементов

            filteredPositions.forEach(position => {
                // Преобразуем диапазон в строку для поиска
                const rangeString = `${position.lowerBound}-${position.upperBound}`;

                // Проверяем, содержится ли поисковый запрос в названии, единице измерения или диапазоне
                if (position.name.toLowerCase().includes(lowerCaseSearch) ||
                    position.unit.toLowerCase().includes(lowerCaseSearch) ||
                    rangeString.includes(lowerCaseSearch)) {
                    if(tarif !== 'Хромолаб GEN PRO 1.0') {
                    createOption(position);
                    } 
                    
                    if (tarif == 'Хромолаб GEN PRO 1.0') {
                        createOptionGen(position); 
                    }
                }
            });

            // Показываем или скрываем инпут для поиска в зависимости от наличия отфильтрованных элементов
            if (select.options.length > 0) {
                searchInput.style.display = 'block';
            } else {
                searchInput.style.display = 'none';
            }
        };

        // Инициализация инпута для поиска
        searchInput.type = 'text';
        searchInput.placeholder = 'Поиск...';
        searchInput.classList.add('search-input'); // Добавляем класс для стилей
        searchInput.style.display = 'none'; // Начинаем со скрытым инпутом
        searchInput.addEventListener('input', () => {
            filterOptions(searchInput.value.trim());
        });
        container.appendChild(searchInput);

        
        

        // Добавляем выпадающий список в контейнер
        container.appendChild(select);

        // Обработчик клика по выпадающему списку для открытия/закрытия инпута поиска
        select.addEventListener('click', (event) => {
            event.stopPropagation(); // Остановка всплытия события, чтобы клик по select не срабатывал на документе
            isOpen = !isOpen;
            if (isOpen) {
                searchInput.style.display = 'block';
                searchInput.style.backgroundColor = 'white';
                searchInput.style.border = '1px solid #00a2ff8e';
                searchInput.style.boxShadow = 'inset 0 0 15px rgba(156, 156, 156, 0.5)';

                
                
            } else {
                searchInput.style.display = 'none';
            }

           
        });

        // Обработчик для ховера над searchInput
searchInput.addEventListener('mouseenter', () => {
    // Действия при наведении курсора
    searchInput.style.backgroundColor = '#f0f0f0'; // Пример стиля для подсветки при ховере
    searchInput.style.border = '1px solid #00a2ff'; // Пример изменения границы при ховере
});

searchInput.addEventListener('mouseleave', () => {
    // Действия при уходе курсора
    searchInput.style.backgroundColor = 'white'; // Возвращаем исходный цвет при уходе курсора
    searchInput.style.border = '1px solid #dddddd'; // Возвращаем исходную границу при уходе курсора
});

// Обработчик для фокуса на searchInput
searchInput.addEventListener('focus', () => {
    // Действия при фокусе на элементе
    searchInput.style.outline = '1px solid #00a2ff'; // Пример стиля для обводки при фокусе
});

searchInput.addEventListener('blur', () => {
    // Действия при потере фокуса элементом
    searchInput.style.outline = 'none'; // Убираем обводку при потере фокуса
});

        // Добавляем обработчик изменения для обновления стиля
        select.addEventListener('change', () => {
            if (selectedOption && selectedOption.classList.contains('matched-option')) {
                select.classList.add('matched-select');
            } else {
                select.classList.remove('matched-select');
            }
        });


        if(tarif !== 'Хромолаб GEN PRO 1.0') {
            // Инициализируем выпадающий список с текущими фильтрованными данными
        filteredPositions.forEach(createOption);
            }
         if (tarif == 'Хромолаб GEN PRO 1.0') {
                // Инициализируем выпадающий список с текущими фильтрованными данными
        filteredPositions.forEach(createOptionGen);
            }

        

        // Если найдена соответствующая опция при загрузке, делаем её выбранной
        if (selectedOption) {
            selectedOption.selected = true;
        }

        // Обработчик клика на документе для закрытия инпута, если кликнуто вне контейнера
        document.addEventListener('click', (event) => {
            const isClickedInside = container.contains(event.target);
            if (!isClickedInside) {
                isOpen = false;
                searchInput.style.display = 'none';
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}




/**
 * Создает инпут для умного ввода числовых значений с заданными ограничениями.
 * @param {string} id - ID элемента, к которому будет привязан инпут.
 * @param {number} maxLength - Максимальная длина всего числового значения.
 * @param {number} maxDecimalLength - Максимальная длина дробной части числового значения.
 * @param {string} containerId - ID контейнера, в который нужно добавить инпут.
 * @param {boolean} disable - Указывает, должен ли инпут быть заблокирован
* @param {string} headerText - Заголовок, связанный с этим инпутом.
* @param {string} defaultValue - Значение по умолчанию для инпута.
 */
function createSmartInput(id, maxLength, maxDecimalLength, containerId, disable, headerText, defaultValue) {
    const container = document.getElementById(containerId);

    // Создаем input элемент
    const input = document.createElement('input');
    input.id = id;
    input.type = 'text';
    input.maxLength = maxLength;
    input.dataset.maxDecimalLength = maxDecimalLength;

     
     

    // Добавляем input в контейнер
    container.appendChild(input);


    // Получаем значение по умолчанию из входного аргумента
    input.value = defaultValue;
    
    // Функция для установки состояния disabled и класса disabled-input
    function setDisabledState(disable) {
        
        
        if (disable) {
            input.disabled = disable;
            
        } else {
            input.disabled = disable;
            
        }
   
    }

    // Находим предыдущий чекбокс по порядку (это часть вашего кода, где вы настраиваете состояние disable)

    const index = checkboxStates.findIndex(item => item.id === id);
    const previousCheckbox = index > 0 ? checkboxStates[index - 1] : null;

    if (previousCheckbox) {
        // Проверяем состояние предыдущего чекбокса с задержкой в 100 мс
        
            setDisabledState(previousCheckbox.checked || disable);
       
    } else {
        // Если нет предыдущего чекбокса, просто устанавливаем состояние из disable
        setDisabledState(disable);
    }




    

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = '';

    
    input.type = 'text';
    input.id = id;
    input.autocomplete = 'off'; // Запрещаем автозаполнение

    const status = document.createElement('div');
    status.id = `${id}-status`;
    status.classList.add('status');

    container.appendChild(label);
    container.appendChild(input);
    container.appendChild(status);

    // Создаем индикатор и добавляем его в контейнер
    createIndicator(input.value.trim() !== '', container, disable);

    // Функция для проверки значения и обновления статуса индикатора
    function updateIndicatorStatus(value) {
        createIndicator(value.trim() !== '', container);
    }


    // Проверка значения и обновление статуса сразу после создания инпута
    updateGradePanelStatus(input.value, containerId);
    updateIndicatorStatus(input.value);

    // Переменные для хранения состояния
    let originalValue = ''; // Переменная для хранения оригинального значения перед редактированием
    let pasteEventTriggered = false; // Флаг для отслеживания вставки

     

    
    if(tarif !== 'Хромолаб GEN PRO 1.0') {

    input.addEventListener('input', function() {
        if (pasteEventTriggered) {
            pasteEventTriggered = false;
            return;
        }
    
        let value = this.value.trim(); // Убираем начальные и конечные пробелы
        let firstChar = value.charAt(0);

        
                
    
        // Заменяем запятую на точку
        value = value.replace(',', '.');
    
        // Проверяем первый символ и сохраняем его, если это > или <
        if (firstChar === '>' || firstChar === '<') {
            value = firstChar + value.slice(1).replace(/[^\d.]/g, '');
        } else {
            value = value.replace(/[^\d.]/g, '');
        }
    
        // Ограничение на максимальную длину числового значения
        if (maxLength && value.length > maxLength) {
            value = value.slice(0, maxLength);
        }
    
        // Ограничение на максимальную длину дробной части
        if (maxDecimalLength && value.includes('.')) {
            let parts = value.split('.');
            parts[0] = parts[0].slice(0, maxLength); // Ограничение целой части
            parts[1] = parts[1].slice(0, maxDecimalLength); // Ограничение дробной части
            value = parts.join('.');
        }
    
        // Сохраняем текущее значение перед очисткой
        originalValue = value;
    
        // Устанавливаем очищенное значение обратно в инпут
        this.value = value;
    
        // Проверка значения и обновление статуса
        updateGradePanelStatus(this.value, containerId);
    
        // После обновления значения вызываем функцию для обновления индикатора
        updateIndicatorStatus(this.value);

        
        // Обновление parallelDataBuffer
        const bufferItem = parallelDataBuffer.find(item => item.parameterHeader === headerText);
        if (bufferItem) {
            bufferItem.inputValue = this.value;
        }

        // Логируем parallelDataBuffer в консоль
        console.log('Updated parallelDataBuffer:', parallelDataBuffer);
    
        // Задержка перед проверкой и очисткой дробной части
        setTimeout(() => {
            let currentValue = this.value;
    
            // Удаляем дробную часть, если в ней только нули
            if (/^\d+\.[0]*$/.test(currentValue)) {
                currentValue = currentValue.split('.')[0];
                this.value = currentValue;
                updateGradePanelStatus(this.value, containerId); // Обновление статуса после изменения значения
                updateIndicatorStatus(this.value); // Обновление индикатора после изменения значения
            }
    
            // Убираем нули в конце дробной части (если есть)
            if (currentValue.includes('.')) {
                currentValue = currentValue.replace(/(\.[0-9]*[1-9])0+$/, '$1').replace(/\.0*$/, '');
                this.value = currentValue;
                updateGradePanelStatus(this.value, containerId); // Обновление статуса после изменения значения
                updateIndicatorStatus(this.value); // Обновление индикатора после изменения значения
            }
    
            // Удаляем знак ">" или "<", если за ними нет числовых символов
            if (currentValue === '>' || currentValue === '<') {
                this.value = '';
                updateGradePanelStatus(this.value, containerId); // Обновление статуса после изменения значения
                updateIndicatorStatus(this.value); // Обновление индикатора после изменения значения
            }
    
            // Удаляем точку, если это последний символ и нет дробной части
            if (/^\d+\.$/.test(currentValue)) {
                currentValue = currentValue.slice(0, -1);
                this.value = currentValue;
                updateGradePanelStatus(this.value, containerId); // Обновление статуса после изменения значения
                updateIndicatorStatus(this.value); // Обновление индикатора после изменения значения
            }
        }, 5000); // Задержка 3 секунды
    });

    



    
    

    // Обработка вставки из буфера обмена
    input.addEventListener('paste', function(event) {
        event.preventDefault();
        let pasteText = (event.clipboardData || window.clipboardData).getData('text');
        pasteText = pasteText.trim(); // Убираем начальные и конечные пробелы
        let firstChar = pasteText.charAt(0);

        // Заменяем запятую на точку
        pasteText = pasteText.replace(',', '.');

        // Проверяем первый символ и сохраняем его, если это > или <
        if (firstChar === '>' || firstChar === '<') {
            pasteText = firstChar + pasteText.slice(1).replace(/[^\d.]/g, '');
        } else {
            pasteText = pasteText.replace(/[^\d.]/g, '');
        }

        // Убираем нули в конце дробной части (если есть)
    if (pasteText.includes('.')) {
        pasteText = pasteText.replace(/(\.[0-9]*[1-9])0+$/, '$1');

        // Удаляем дробную часть, если в ней только нули
        if (/^\d+\.[0]+$/.test(pasteText)) {
            pasteText = pasteText.split('.')[0];
        }
    }

        // Устанавливаем очищенный текст обратно в инпут
        document.execCommand('insertText', false, pasteText);

        pasteEventTriggered = true; // Устанавливаем флаг вставки
    });

    }


    if (tarif == 'Хромолаб GEN PRO 1.0') {
        // Загрузка JSON файла с соответствиями
        fetch('genetic_codes.json')
            .then(response => response.json())
            .then(data => {
                // Функция для замены сочетаний по данным из JSON
                const replaceGeneticCodes = function(value) {
                    for (let key in data) {
                        if (data.hasOwnProperty(key)) {
                            // Заменяем сочетания на числовые значения
                            value = value.replace(new RegExp(key, 'g'), data[key]);
                        }
                    }
                    return value;
                };
    
                // Функция для восстановления оригинального текста с буквенными кодами
                const restoreOriginalText = function(value) {
                    for (let key in data) {
                        if (data.hasOwnProperty(key)) {
                            // Восстанавливаем оригинальный текст с буквенными кодами
                            value = value.replace(new RegExp(data[key], 'g'), key);
                        }
                    }
                    return value;
                };
    
                // Функция авто-правщика
                const autoCorrect = function(value) {
                    // Убираем все цифры и делаем буквы заглавными
                    return value.replace(/\d/g, '').toUpperCase();
                };

                
    
                // Обработчик события input для поля ввода
                input.addEventListener('input', function() {
                    let value = this.value.trim(); // Получаем текущее значение и убираем пробелы
                    value = autoCorrect(value); // Применяем авто-правщик
                    let numericValue = replaceGeneticCodes(value); // Заменяем сочетания на числовые значения
                    this.value = restoreOriginalText(numericValue); // Восстанавливаем оригинальный текст с буквенными кодами
                    updateGradePanelStatus(numericValue, containerId); // Обновляем статус
                    updateIndicatorStatus(numericValue); // Обновляем индикатор
                });
    
                // Обработчик события paste для поля ввода
                input.addEventListener('paste', function(event) {
                    // Отменяем стандартное действие вставки, чтобы обработать текст до его вставки
                    event.preventDefault();
    
                    // Получаем вставляемый текст
                    let pasteText = (event.clipboardData || window.clipboardData).getData('text');
                    
                    // Применяем авто-правщик к вставляемому тексту
                    pasteText = autoCorrect(pasteText);
    
                    // Получаем текущее значение поля ввода
                    let currentValue = this.value.trim();
    
                    // Вычисляем начальную и конечную позиции выделения, чтобы заменить текст в нужном месте
                    let startPos = this.selectionStart;
                    let endPos = this.selectionEnd;
    
                    // Формируем новое значение с заменой вставляемого текста
                    let newValue = currentValue.slice(0, startPos) + pasteText + currentValue.slice(endPos);
    
                    // Заменяем сочетания на числовые значения
                    let numericValue = replaceGeneticCodes(newValue);
    
                    // Восстанавливаем оригинальный текст с буквенными кодами
                    newValue = restoreOriginalText(numericValue);
    
                    // Устанавливаем новое значение обратно в инпут
                    this.value = newValue;
    
                    // Устанавливаем позицию курсора после вставки
                    this.setSelectionRange(startPos + pasteText.length, startPos + pasteText.length);
    
                    // Обновляем статус
                    updateGradePanelStatus(numericValue, containerId);
                    updateIndicatorStatus(numericValue);
                });
            })
            .catch(error => console.error('Ошибка загрузки JSON файла', error));
    }
    
    
    
    

    /*
    
    // Обработка события потери фокуса (blur)
    input.addEventListener('blur', function() {
        // Если событие вставки не происходило
        if (!pasteEventTriggered) {
            // При потере фокуса, убираем нули в конце дробной части (если есть)
            if (this.value.includes('.')) {
                let trimmedValue = originalValue.replace(/(\.[0-9]*[1-9])0+$/, '$1');
                this.value = trimmedValue;
            }
        }
        pasteEventTriggered = false; // Сбрасываем флаг вставки
    });
    */
}



/**
 * Проверяет значение инпута и обновляет статус в зависимости от нижней и верхней границы,
 * а также от состояния чекбокса.
 * @param {string} value - Текущее значение инпута.
 * @param {string} containerId - ID контейнера, в котором находится инпут.
 * @param {boolean} isChecked - Состояние чекбокса (включен или выключен).
 * @param {string} tarif - Название тарифа для проверки.
 */
function updateGradePanelStatus(value, containerId, isChecked, tarif) {
    const container = document.getElementById(containerId);
    const dropdown = container.querySelector('select');
    const status = container.querySelector('.status');

    if (!dropdown || !status) return;

    // Если чекбокс включен, показываем пустой статус
    if (isChecked) {
        status.textContent = '';
        status.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Полупрозрачный белый цвет для пустого статуса
        return;
    }

    const selectedOption = dropdown.options[dropdown.selectedIndex];
    let bounds = JSON.parse(selectedOption.value);
    let numberValue;
    let sign = ''; // Знак ">" или "<"

    if (value.startsWith('>')) {
        sign = '>';
        numberValue = parseFloat(value.substring(1)); // Убираем знак ">" и парсим число
    } else if (value.startsWith('<')) {
        sign = '<';
        numberValue = parseFloat(value.substring(1)); // Убираем знак "<" и парсим число
    } else {
        numberValue = parseFloat(value);
    }

    // Если тариф "Хромолаб GEN PRO 1.0", преобразуем numberValue в строку
    if (tarif === 'Хромолаб GEN PRO 1.0') {
        numberValue = value; // Оставляем как строку
    }

    if (isNaN(numberValue) && tarif !== 'Хромолаб GEN PRO 1.0') {
        status.textContent = ''; // По умолчанию здесь написано, что Абс. значение отсутствует
        status.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Полупрозрачный желтый цвет для неизвестного значения
        return;
    }

    if (sign === '<' && numberValue < bounds.lowerBound) {
        status.textContent = 'Неизвестное сверхнизкое значение';
        status.style.backgroundColor = 'rgba(206, 147, 216, 0.5)'; // Полупрозрачный фиолетовый цвет для неизвестного значения со знаком "<"
    } else if (sign === '>' && numberValue < bounds.lowerBound) {
        const timesLower = (bounds.lowerBound / numberValue).toFixed(2);
        status.textContent = `Занижение в ${timesLower}x раз`;
        status.style.backgroundColor = 'rgba(100, 181, 246, 0.5)'; // Полупрозрачный синий цвет для занижения значения
    } else if (sign === '<' && numberValue >= bounds.lowerBound && numberValue <= bounds.upperBound && bounds.lowerBound !== 0) {
        status.textContent = 'Неизвестное пониженное значение';
        status.style.backgroundColor = 'rgba(255, 235, 59, 0.5)'; // Полупрозрачный желтый цвет для неизвестного значения со знаком "<" в пределах нормы
    } else if (sign === '>' && numberValue >= bounds.lowerBound && numberValue <= bounds.upperBound && bounds.upperBound !== 999999) {
        status.textContent = 'Неизвестное повышенное значение';
        status.style.backgroundColor = 'rgba(255, 235, 59, 0.5)'; // Полупрозрачный желтый цвет для неизвестного значения со знаком ">" в пределах нормы
    } else if (sign === '>' && numberValue > bounds.upperBound) {
        status.textContent = 'Неизвестное сверхвысокое значение';
        status.style.backgroundColor = 'rgba(255, 204, 128, 0.5)'; // Полупрозрачный оранжевый цвет для неизвестного значения со знаком ">" выше нормы
    } else if (numberValue < bounds.lowerBound) {
        const timesLower = (bounds.lowerBound / numberValue).toFixed(2);
        status.textContent = `Занижение в ${timesLower}x раз`;
        status.style.backgroundColor = 'rgba(100, 181, 246, 0.5)'; // Полупрозрачный синий цвет для занижения значения
    } else if (numberValue > bounds.upperBound) {
        const timesHigher = (numberValue / bounds.upperBound).toFixed(2);
        status.textContent = `Завышение в ${timesHigher}x раз`;
        status.style.backgroundColor = 'rgba(229, 115, 115, 0.5)'; // Полупрозрачный красный цвет для завышения значения
    } else {
        status.textContent = 'Норма';
        status.style.backgroundColor = 'rgba(129, 199, 132, 0.5)'; // Полупрозрачный зеленый цвет для нормального значения
    }

    if (numberValue === "") {
        status.textContent = '';
        status.style.backgroundColor = 'rgba(255, 255, 255, 0)'; // Полупрозрачный зеленый цвет для нормального значения
    }

    // Ген MTHFR (rs 1801133)
    if (numberValue == 8795444423122 && bounds.lowerBound == 8795444423122) {
        status.textContent = 'Норма';
        status.style.backgroundColor = 'rgba(129, 199, 132, 0.5)'; // Полупрозрачный зеленый цвет для нормального значения
    }

    // Ген MTHFR (rs 1801133)
    if ((numberValue == 8795444423123 || numberValue == 8795444423124) && bounds.lowerBound == 8795444423122) {
        status.textContent = 'Генетич. отклонение';
        status.style.backgroundColor = 'rgba(229, 115, 115, 0.5)'; // Полупрозрачный красный цвет для опасного значения
    }

    

    
}




























/**
 * Создает радио кнопку и добавляет её в указанный контейнер.
 * @param {string} containerId - ID контейнера, в который будет добавлена радио кнопка.
 * @param {string} name - Имя группы радио кнопок (атрибут name).
 * @param {string} value - Значение радио кнопки (атрибут value).
 * @param {string} labelText - Текст метки для радио кнопки.
 * @param {boolean} checked - Определяет, будет ли радио кнопка выбрана по умолчанию.
 */
function createRadioButton(containerId, name, value, labelText, checked) {
    // Находим контейнер по его ID
    var container = document.getElementById(containerId);

    // Создаем новую радио кнопку
    var radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = name;
    radio.value = value;
    radio.checked = checked;

    // Создаем метку для радио кнопки
    var label = document.createElement('label');
    label.appendChild(document.createTextNode(labelText));
    label.setAttribute('for', value); // Привязываем метку к радио кнопке

    // Добавляем радио кнопку и метку в контейнер
    container.appendChild(radio);
    container.appendChild(label);

    // Добавляем перенос строки, чтобы следующие элементы начинались с новой строки
    container.appendChild(document.createElement('br'));
}