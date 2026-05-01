'use client'

import { ChevronDown, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import type { Category, Condition } from '@/lib/types'

interface FilterBarProps {
  selectedCategory: Category | null
  selectedCondition: Condition | null
  onCategoryChange: (category: Category | null) => void
  onConditionChange: (condition: Condition | null) => void
}

const categories: { value: Category; label: string }[] = [
  { value: 'iphone', label: 'iPhone' },
  { value: 'mac', label: 'Mac' },
  { value: 'audio', label: 'Audio' }
]

const conditions: { value: Condition; label: string }[] = [
  { value: 'sellado', label: 'Sellado' },
  { value: 'seminuevo', label: 'Seminuevo' },
  { value: 'usado', label: 'Usado' }
]

interface DropdownProps {
  label: string
  options: { value: string; label: string }[]
  value: string | null
  onChange: (value: string | null) => void
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
          value
            ? 'bg-foreground text-background border-foreground'
            : 'bg-secondary/70 text-foreground border-border/50 hover:bg-secondary hover:border-border'
        }`}
      >
        <span>{selectedOption?.label || label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-[160px] bg-card border border-border rounded-xl shadow-xl shadow-black/10 overflow-hidden z-50">
          <div className="p-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(value === option.value ? null : option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2.5 text-left text-sm rounded-lg transition-colors ${
                  value === option.value
                    ? 'bg-foreground text-background'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function FilterBar({
  selectedCategory,
  selectedCondition,
  onCategoryChange,
  onConditionChange
}: FilterBarProps) {
  const hasFilters = selectedCategory || selectedCondition

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Dropdown
        label="Categoría"
        options={categories}
        value={selectedCategory}
        onChange={(v) => onCategoryChange(v as Category | null)}
      />
      
      <Dropdown
        label="Condición"
        options={conditions}
        value={selectedCondition}
        onChange={(v) => onConditionChange(v as Condition | null)}
      />

      {hasFilters && (
        <button
          onClick={() => {
            onCategoryChange(null)
            onConditionChange(null)
          }}
          className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Limpiar filtros</span>
        </button>
      )}
    </div>
  )
}
