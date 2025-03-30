def parse_text_list(text: str) -> list[str]:
    return [
        line.strip()[1:].strip()
        for line in text.strip().splitlines()
        if line.strip().startswith("-")
    ]
