'use client'

import { useState, useMemo } from 'react'
import useSWR from 'swr'
import { SearchBar } from './search-bar'
import { FilterBar } from './filter-bar'
import { ProductGrid } from './product-grid'
import type { Product, Category, Condition } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function Catalog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null)

  const { data: products = [], isLoading } = useSWR<Product[]>('/api/products', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000
  })

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false
      }

      // Condition filter
      if (selectedCondition && product.condition !== selectedCondition) {
        return false
      }

      return true
    })
  }, [products, searchQuery, selectedCategory, selectedCondition])

  const productCount = filteredProducts.length
  const totalCount = products.length

  return (
    <div className="space-y-8">
      {/* Header with Search and Filters */}
      <div className="sticky top-0 z-40 -mx-4 px-4 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            selectedCategory={selectedCategory}
            selectedCondition={selectedCondition}
            onCategoryChange={setSelectedCategory}
            onConditionChange={setSelectedCondition}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            'Cargando productos...'
          ) : (
            <>
              Mostrando <span className="font-medium text-foreground">{productCount}</span> de{' '}
              <span className="font-medium text-foreground">{totalCount}</span> productos
            </>
          )}
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  )
}
