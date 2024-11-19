export const normalizeText = (text: string) => {
    const separatedWords = text.split(' ')
    let normalizedText = ''

    for(let word of separatedWords) {
        const firstLetterCapitalized = word.slice(0,1).toUpperCase()
        const restOfLetters = word.slice(1, word.length).toLocaleLowerCase()

        normalizedText += firstLetterCapitalized + restOfLetters + ' '
    }

    return normalizedText.trim()
};
