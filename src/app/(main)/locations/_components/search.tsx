import React, { useMemo, useState } from 'react'

import { Box, Text, TextField } from '@radix-ui/themes'
import { debounce } from 'es-toolkit'

import { locations } from '@/data/locations'

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])

  const handleSearch = (searchQuery: string) => {
    const lowerCaseQuery = searchQuery.toLowerCase()
    const searchResults: string[] = []

    Object.entries(locations).forEach(([region, countries]) => {
      Object.entries(countries).forEach(
        ([country, cities]: [
          string,
          {
            id: string
            lat: number
            lng: number
            solutions: string[]
          }
        ]) => {
          Object.keys(cities).forEach(city => {
            if (city.toLowerCase().includes(lowerCaseQuery)) {
              searchResults.push(`${city}, ${country}, ${region}`)
            }
          })
        }
      )
    })

    setResults(searchResults)
  }

  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  return (
    <Box>
      <TextField.Root placeholder="Search for a city..." value={query} onChange={handleChange} />

      <Box>
        {results.map((result, index) => (
          <Text key={index}>{result}</Text>
        ))}
      </Box>
    </Box>
  )
}

export default SearchComponent
