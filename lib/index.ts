// Interfaces
import { Person, PersonWithFrequency, Frequency } from '../interfaces'

const NGRAM_SIZE: number = 2
const FUZZY_SEARCH_THRESHOLD: number = 0.6

/**
 * This method calculates the times a letter in the email of a person exists
 * and returns an array sorted from most frecuent character to less frecuent character
 * @typeParam Person[] - An array of people who we want to get the Frequency count from
 * @returns PersonWithFrequency[]
 */
export const frequencyCount = (people: Person[]): PersonWithFrequency[] => {
  return people.map((person: Person) => {
    const { email_address } = person
    const frequencyUnsorted: any = email_address
      .split('')
      .reduce((prev, curr) => {
        prev[curr] = prev[curr] ? prev[curr] + 1 : 1
        return prev
      }, {})
    const frequencyArrayUnsorted = objectToArrayConversion(frequencyUnsorted)
    const frequency = sortFrequency(frequencyArrayUnsorted)
    return Object.assign({}, { ...person }, { frequency })
  })
}

/**
 * This method transforms an object into Frequency[]
 * @param obj - An object you want to transform to an array
 * @returns Frequency[]
 */
const objectToArrayConversion = (obj: any): Frequency[] => {
  return Object.entries(obj).map(([key, value]) => ({
    letter: key,
    value: Number(value),
  }))
}

/**
 * This method sorts a Frequency[] based on the value of the element, from most frequent to less frequent
 * @typeParam Frequency[] - An array of frequency objects
 * @returns Frequency[]
 */
const sortFrequency = (frequency: Frequency[]): Frequency[] => {
  return frequency.sort((a, b) => {
    return b.value - a.value
  })
}

/**
 * This method returns a string on n-grams of two values, this is the base needed for the Dice coefficient calculation
 * you can see more information here  {@link https://en.wikipedia.org/wiki/Bigram}
 * @example
 * Here's a simple example:
 * ```
 * // Returns "['te', 'es', 'st']":
 * bigram('test');
 * ```
 * @param value - A string we want to get the bigram from
 * @returns bigrams of a string
 */
export const bigram = (value: string) => {
  let nGrams = []
  let index

  if (value === null || value === undefined) {
    return nGrams
  }

  value = value.slice ? value : String(value)
  index = value.length - Number(NGRAM_SIZE) + 1

  while (index--) {
    nGrams[index] = value.slice(index, index + NGRAM_SIZE)
  }

  return nGrams
}

/**
 * This method returns a score of the Dice coefficient of two strings
 * you can see more information on {@link https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient}
 * @example
 * Here's a simple example:
 * ```
 * // Returns 0.5:
 * diceCoefficient('night', 'naght');
 * ```
 * @param value - The first sample of string we want to compare
 * @param alternative - The second sample of string we want to compare
 * @returns score of the Dice coefficient
 */
export const diceCoefficient = (value: string, alternative: string) => {
  var val = value.toLowerCase()
  var alt = alternative.toLowerCase()
  var left = val.length === 1 ? [val] : bigram(val)
  var right = alt.length === 1 ? [alt] : bigram(alt)
  var leftLength = left.length
  var rightLength = right.length
  var index = -1
  var intersections = 0
  var leftPair
  var rightPair
  var offset

  while (++index < leftLength) {
    leftPair = left[index]
    offset = -1

    while (++offset < rightLength) {
      rightPair = right[offset]

      if (leftPair === rightPair) {
        intersections++

        // Make sure this pair never matches again.
        right[offset] = ''
        break
      }
    }
  }

  return (2 * intersections) / (leftLength + rightLength)
}

/**
 * This method returns an array
 * @example
 * Here's a simple example:
 * ```
 * const arrayStrings = ['test', 'tast', 'tesr', 'tesa', 'tezt']
 * // Returns [ 'test', 'tesr', 'tesa' ]:
 * fuzzySearch('test', arrayStrings);
 * ```
 * @param value - The first sample of string we want to compare
 * @param arrayStrings - Array of strings we want to compare or string with
 * @param threshold - This is the score we want to tell if a string is similiar or not
 * @returns array of strings that are similar
 */
export const fuzzySearch = (
  value: string,
  arrayStrings: string[],
  threshold: number = FUZZY_SEARCH_THRESHOLD
) => {
  let similiarStrings: Set<string> = new Set()

  if (value === null || value === undefined) {
    throw new Error("The value can't be null or undefined")
  }

  for (let i in arrayStrings) {
    if (diceCoefficient(value, arrayStrings[i]) > threshold) {
      similiarStrings.add(arrayStrings[i])
    }
  }

  return [...similiarStrings]
}
