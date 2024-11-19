'use client'

import type { ChangeEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { IconChevronDown, IconChevronRight, IconSearch } from '@tabler/icons-react'
import { debounce } from 'es-toolkit'

interface Option {
  id: string
  label: string
  children?: Option[]
}

interface SearchDropdownProps {
  options: Option[]
  placeholder?: string
  className?: string
  onSelect?: (option: Option) => void
}

export default function SearchDropdown({
  options,
  placeholder = 'Search options...',
  className,
  onSelect
}: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const filtered = filterOptions(options, term)

      setFilteredOptions(filtered)
    }, 300),
    [options]
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value

    setSearchTerm(newSearchTerm)
    setIsOpen(true)
    debouncedSearch(newSearchTerm)
  }

  const handleOptionClick = (option: Option) => {
    if (!option.children) {
      setSearchTerm(option.label)

      setIsOpen(false)

      if (onSelect) {
        onSelect(option)
      }
    }
  }

  function filterOptions(options: Option[], term: string): Option[] {
    return options.reduce((acc: Option[], option) => {
      if (option.label.toLowerCase().includes(term.toLowerCase())) {
        acc.push(option)
      } else if (option.children) {
        const filteredChildren = filterOptions(option.children, term)

        if (filteredChildren.length > 0) {
          acc.push({ ...option, children: filteredChildren })
        }
      }

      return acc
    }, [])
  }

  function renderOptions(options: Option[], level = 0) {
    return options.map(option => (
      <li key={option.id}>
        <div
          className={`px-4 py-2 cursor-pointer hover:bg-gray-2 flex items-center ${
            level > 0 ? 'pl-' + (4 + level * 4) : ''
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {option.children && <IconChevronRight className="w-4 h-4 mr-2" />}

          {option.label}
        </div>

        {option.children && (
          <ul>{renderOptions(option.children, level + 1)}</ul>
        )}
      </li>
    ))
  }

  return (
    <div className={className} ref={dropdownRef}>
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-10"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onClick={() => setIsOpen(true)}
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {isOpen ? (
              <IconChevronDown className="w-5 h-5 text-gray-9" />
            ) : (
              <IconSearch className="w-5 h-5 text-gray-9" />
            )}
          </div>
        </div>

        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-64 overflow-auto">
            {filteredOptions.length > 0 ? (
              renderOptions(filteredOptions)
            ) : (
              <li className="px-4 py-2 text-gray-10">No options found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
