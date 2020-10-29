const sentenceSplitRegex = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/;
const wordSplitRegex = /((\b[^\s]+\b)((?<=\.\w).)?)/g;

function main(text) {
    const concordance = findConcordance(text);
    log(concordance);
}

function findConcordance(text) {
    const wordTracker = {};
    text.split(sentenceSplitRegex).forEach((sentence, sentenceIndex) => {
        const words = Array.from(sentence.matchAll(wordSplitRegex), m => m[0]);
        words.forEach((word) => {
            const normalizedWord = word.toLowerCase();
            if (!wordTracker[normalizedWord]) {
                wordTracker[normalizedWord] = {
                    value: normalizedWord,
                    count: 1,
                    sentenceAppearance: [sentenceIndex]
                };
            } else {
                wordTracker[normalizedWord].count++;
                wordTracker[normalizedWord].sentenceAppearance.push(sentenceIndex);
            }
        });
    });
    return wordTracker;
}

function log(concordance) {
    Object.keys(concordance).forEach((key, index) => {
        const uniqueWord = concordance[key];
        console.log(`${index + 1}.  ${uniqueWord.value} {${uniqueWord.count}:${uniqueWord.sentenceAppearance.join(',')}}`);
    });
}

const text = `
Now indulgence dissimilar for his thoroughly has terminated. Agreement offending commanded my an. Change wholly say why eldest period. Are projection put celebrated particular unreserved joy unsatiable its. In then dare good am rose bred or. On am in nearer square wanted. 
`;
main(text);