// Interfaces
import { Person, PersonWithFrequency, Frequency } from '../interfaces'

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
