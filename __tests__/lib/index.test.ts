import { frequencyCount } from '../../lib'
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
    it('should fetch people', async () => {
      const peopleWithFrecuency: PersonWithFrequency[] = frequencyCount(people)
      for (let p in peopleWithFrecuency) {
        const { frequency } = peopleWithFrecuency[p]
        expect(frequency).not.toBeNull()
        expect(frequency.length).toBeGreaterThan(1)
        expect(frequency).toEqual(expectedResults[p])
      }
    })
  })
})
