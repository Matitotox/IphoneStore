'use client'

import Image from 'next/image'
import type { Product } from '@/lib/types'
import { Battery, BatteryLow, BatteryMedium, Package, Truck, XCircle } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

const conditionLabels = {
  sellado: 'Sellado',
  seminuevo: 'Seminuevo',
  usado: 'Usado'
}

const conditionStyles = {
  sellado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  seminuevo: 'bg-sky-50 text-sky-700 border-sky-200',
  usado: 'bg-amber-50 text-amber-700 border-amber-200'
}

const stockLabels = {
  disponible: 'Disponible',
  en_camino: 'En camino',
  agotado: 'Agotado'
}

const stockStyles = {
  disponible: 'text-emerald-600',
  en_camino: 'text-amber-600',
  agotado: 'text-red-500'
}

const StockIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'disponible':
      return <Package className="w-4 h-4" />
    case 'en_camino':
      return <Truck className="w-4 h-4" />
    default:
      return <XCircle className="w-4 h-4" />
  }
}

const BatteryIcon = ({ percentage }: { percentage: number }) => {
  if (percentage >= 80) return <Battery className="w-4 h-4 text-emerald-600" />
  if (percentage >= 50) return <BatteryMedium className="w-4 h-4 text-amber-600" />
  return <BatteryLow className="w-4 h-4 text-red-500" />
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <article className="group bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:border-border hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-b from-secondary/50 to-secondary p-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </div>
        
        {/* Condition Badge */}
        <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full border ${conditionStyles[product.condition]}`}>
          {conditionLabels[product.condition]}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          {product.category}
        </p>
        
        {/* Name */}
        <h3 className="font-semibold text-foreground text-lg leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Battery (for iPhones) */}
        {product.batteryPercentage !== null && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-secondary/50 rounded-xl">
            <BatteryIcon percentage={product.batteryPercentage} />
            <span className="text-sm font-medium text-foreground">
              Batería: {product.batteryPercentage}%
            </span>
          </div>
        )}

        {/* Price and Stock */}
        <div className="flex items-end justify-between pt-3 border-t border-border/50">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </p>
            <p className="text-xs text-muted-foreground">COP</p>
          </div>
          
          <div className={`flex items-center gap-1.5 text-sm font-medium ${stockStyles[product.stockStatus]}`}>
            <StockIcon status={product.stockStatus} />
            <span>{stockLabels[product.stockStatus]}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button 
          className={`w-full mt-4 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
            product.stockStatus === 'agotado'
              ? 'bg-secondary text-muted-foreground cursor-not-allowed'
              : 'bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98]'
          }`}
          disabled={product.stockStatus === 'agotado'}
        >
          {product.stockStatus === 'agotado' ? 'No disponible' : 'Consultar'}
        </button>
      </div>
    </article>
  )
}
