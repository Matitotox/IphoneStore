'use client'

import { ProductCard } from './product-card'
import type { Product } from '@/lib/types'
import { PackageX } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
}

function ProductSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden animate-pulse">
      <div className="aspect-square bg-secondary" />
      <div className="p-5 space-y-4">
        <div className="h-3 w-16 bg-secondary rounded" />
        <div className="h-5 w-3/4 bg-secondary rounded" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-secondary rounded" />
          <div className="h-3 w-2/3 bg-secondary rounded" />
        </div>
        <div className="flex justify-between pt-3 border-t border-border/50">
          <div className="h-7 w-28 bg-secondary rounded" />
          <div className="h-5 w-20 bg-secondary rounded" />
        </div>
        <div className="h-12 w-full bg-secondary rounded-xl" />
      </div>
    </div>
  )
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
          <PackageX className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No se encontraron productos
        </h3>
        <p className="text-muted-foreground max-w-md">
          Intenta ajustar los filtros o la búsqueda para encontrar lo que buscas.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
