import fs from 'fs';

const PACKET_LENGTH = 14;
const getData = (): Array<string> => {
  const input: string = fs
    .readFileSync('../resources/inputDay06.txt')
    .toString()
    .trim();
  return [...input];
};

const charactersAreUnique = (characters: Array<string>): boolean => {
  const uniqueCharacters = new Set(characters);
  return uniqueCharacters.size === characters.length;
};

const findMarker = (): number => {
  let marker = -1;
  const characters = getData();
  const lastCharacters: Array<string> = [];

  for (let i = 0; i < characters.length; i++) {
    if (lastCharacters.length === PACKET_LENGTH) {
      lastCharacters.shift();
    }
    lastCharacters.push(characters[i]);
    if (
      lastCharacters.length === PACKET_LENGTH &&
      charactersAreUnique(lastCharacters)
    ) {
      marker = i + 1;
      break;
    }
  }
  return marker;
};

console.log(`The marker is at the position ${findMarker()}`);
