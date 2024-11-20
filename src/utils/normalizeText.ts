const firstLettersCaps = (text: string) => {
    const separatedWords = text.split(' ')
    let normalizedText = ''

    for(let word of separatedWords) {
        const firstLetterCapitalized = word.slice(0,1).toUpperCase()
        const restOfLetters = word.slice(1, word.length).toLocaleLowerCase()

        normalizedText += firstLetterCapitalized + restOfLetters + ' '
    }

    return normalizedText.trim()
};

const firstLetterCaps = (text: string) => {
    const firstLetterCapitalized = text.slice(0,1).toUpperCase()
    const restOfLetters = text.slice(1, text.length)
    const normalizedText = firstLetterCapitalized + restOfLetters

    return normalizedText
};



const normalizeText = { firstLetterCaps, firstLettersCaps };

export default normalizeText;

