interface License {
    name: string;
    url: string;
}

interface Definition {
    definition: string;
    example?: string;
    synonyms: string[];
    antonyms: string[];
}

interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
}

interface Phonetic {
    text: string;
    audio: string;
}

export interface WordData {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: License;
    sourceUrls: string[];
}
