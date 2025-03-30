from src.content.service import get_content_by_key, create_content


DEFAULT_CONTENT = [
    {
        "key": "main_title",
        "section": "hero",
        "name": "Основной загаловок",
        "value": "стратегическое\nпревосходство бренда",
    },
    {
        "key": "sub_title",
        "section": "hero",
        "name": "Подзагаловок",
        "value": "Лаборатория стратегического бренд-консалтинга",
    },
    {
        "key": "learn_more_btn",
        "section": "hero",
        "name": "Кнопка 'узнать больше'",
        "value": "Узнать больше",
    },
    {
        "key": "support_on_every_step",
        "section": "general",
        "name": "Текст про поддержку на всех этапах",
        "value": "мы поддерживаем вас на всех\nэтапах построения бизнеса",
    },
    {
        "key": "projects_title",
        "section": "general",
        "name": "Текст перед секцией с кейсами",
        "value": "наши кейсы",
    },
    {
        "key": "team_title",
        "section": "general",
        "name": "Текст перед секцией с командой",
        "value": "Познакомьтесь с нашей\nкомандой",
    },
    {
        "key": "contact_title",
        "section": "contact",
        "name": "Загаловок секции с контактами",
        "value": "давайте обсудим\nваш проект",
    },
    {
        "key": "user_agreement_link",
        "section": "contact",
        "name": "Ссылка на условия обработки пероснальных данных",
        "value": "http://example.com",
    },
    {
        "key": "email",
        "section": "contact",
        "name": "Имейл",
        "value": "hello@monscons.ru",
    },
    {
        "key": "phone_number",
        "section": "contact",
        "name": "Номер телефона",
        "value": "+7 (926) 960 09 40",
    },
    {
        "key": "telegram_link",
        "section": "contact",
        "name": "Ссылка на тг",
        "value": "http://example.com",
    },
    {
        "key": "dzen_link",
        "section": "contact",
        "name": "Ссылка на дзен",
        "value": "http://example.com",
    },
    {
        "key": "setka_link",
        "section": "contact",
        "name": "Ссылка на сетку",
        "value": "http://example.com",
    },
    {
        "key": "start_text",
        "section": "about",
        "name": "Текст в начале секции 'о нас'",
        "value": "Какой-то текст в начале",
    },
    {
        "key": "end_text",
        "section": "about",
        "name": "Текст в конце секции 'о нас'",
        "value": "Какой-то текст в конце",
    },
]


def load_default_content():
    for item in DEFAULT_CONTENT:
        existing = get_content_by_key(item["key"])
        if not existing:
            create_content(
                key=item["key"],
                section=item["section"],
                name=item["name"],
                value=item["value"],
            )
