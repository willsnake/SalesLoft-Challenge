import { frequencyCount, bigram, diceCoefficient, fuzzySearch } from '../../lib'
import { people } from './mockData'
import { PersonWithFrequency } from '../../interfaces'

const expectedResults = [
  [
    { letter: 'o', value: 3 },
    { letter: 'p', value: 2 },
    { letter: 'a', value: 2 },
    { letter: '.', value: 2 },
    { letter: 'n', value: 2 },
    { letter: 'e', value: 2 },
    { letter: 'm', value: 2 },
    { letter: 't', value: 1 },
    { letter: 'j', value: 1 },
    { letter: 'h', value: 1 },
    { letter: 's', value: 1 },
    { letter: '@', value: 1 },
    { letter: 'x', value: 1 },
    { letter: 'l', value: 1 },
    { letter: 'c', value: 1 },
  ],
  [
    { letter: 'e', value: 4 },
    { letter: 'm', value: 3 },
    { letter: 'o', value: 3 },
    { letter: 'x', value: 2 },
    { letter: 'a', value: 2 },
    { letter: 'p', value: 2 },
    { letter: 'l', value: 2 },
    { letter: '.', value: 2 },
    { letter: 'n', value: 2 },
    { letter: 'j', value: 1 },
    { letter: 'h', value: 1 },
    { letter: 's', value: 1 },
    { letter: '@', value: 1 },
    { letter: 'c', value: 1 },
  ],
  [
    { letter: 'e', value: 5 },
    { letter: 'm', value: 4 },
    { letter: 'a', value: 3 },
    { letter: 'o', value: 2 },
    { letter: '.', value: 2 },
    { letter: 'l', value: 2 },
    { letter: 'w', value: 1 },
    { letter: 's', value: 1 },
    { letter: 'i', value: 1 },
    { letter: '@', value: 1 },
    { letter: 'x', value: 1 },
    { letter: 'p', value: 1 },
    { letter: 'c', value: 1 },
  ],
]

describe('Libraries', () => {
  describe('FrequencyCount', () => {
    it('should fetch people', () => {
      const peopleWithFrecuency: PersonWithFrequency[] = frequencyCount(people)
      for (let p in peopleWithFrecuency) {
        const { frequency } = peopleWithFrecuency[p]
        expect(frequency).not.toBeNull()
        expect(frequency.length).toBeGreaterThan(1)
        expect(frequency).toEqual(expectedResults[p])
      }
    })
  })

  describe('Ngrams', () => {
    it('should split a string into ngrams', () => {
      expect(bigram('test')).toEqual(['te', 'es', 'st'])
    })

    it('should return an emtpy array if a character was given', () => {
      expect(bigram('t')).toEqual([])
    })

    it('should return an emtpy a single ngram if two characters were given', () => {
      expect(bigram('te')).toEqual(['te'])
    })
  })

  describe('Dice Coefficient', () => {
    it('should return a score of 1', () => {
      expect(diceCoefficient('test', 'test')).toEqual(1)
    })

    it('should return a score of 0.25', () => {
      expect(diceCoefficient('night', 'nacht')).toEqual(0.25)
    })

    it('should return a score of 0.5', () => {
      expect(diceCoefficient('night', 'naght')).toEqual(0.5)
    })

    it('should return a score of 0.75', () => {
      expect(diceCoefficient('longWord', 'longerWord')).toEqual(0.75)
    })

    it('should return a score greater than 0.9', () => {
      expect(diceCoefficient('impairWords', 'impairWordsag')).toBeGreaterThan(
        0.9
      )
    })
  })

  describe('Fuzzy search', () => {
    it('should return an array with similiar strings ', () => {
      const arrayStrings = ['test', 'tast', 'tesr', 'tesa', 'tezt']
      expect(fuzzySearch('test', arrayStrings).length).toBeGreaterThan(1)
    })

    it('should return an empty array', () => {
      const arrayStrings = ['test', 'tast', 'tesr', 'tesa', 'tezt']
      expect(fuzzySearch('night', arrayStrings).length).toBe(0)
    })
  })
})
