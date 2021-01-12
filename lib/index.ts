// Interfaces
import { Person, PersonWithFrequency, Frequency } from '../interfaces'

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

const objectToArrayConversion = (obj: any): Frequency[] => {
  return Object.entries(obj).map(([key, value]) => ({
    letter: key,
    value: Number(value),
  }))
}

const sortFrequency = (frequency: Frequency[]): Frequency[] => {
  return frequency.sort((a, b) => {
    return b.value - a.value
  })
}
