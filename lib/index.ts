// Interfaces
import { Person, PersonWithFrequency, Frequency } from '../interfaces'

const NGRAM_SIZE: Number = 2

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
