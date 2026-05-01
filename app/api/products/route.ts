import { NextResponse } from 'next/server'
import type { Product, Category, Condition, StockStatus } from '@/lib/types'

// Replace this with your Google Sheets published CSV URL
// To get this URL:
// 1. Open your Google Sheet
// 2. Go to File > Share > Publish to web
// 3. Select the sheet and choose "Comma-separated values (.csv)"
// 4. Copy the URL
const GOOGLE_SHEETS_CSV_URL = process.env.GOOGLE_SHEETS_CSV_URL || ''

function parseCSV(csv: string): Product[] {
  const lines = csv.split('\n')
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  
  const products: Product[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    
    // Handle CSV with commas inside quotes
    const values: string[] = []
    let current = ''
    let insideQuotes = false
    
    for (const char of line) {
      if (char === '"') {
        insideQuotes = !insideQuotes
      } else if (char === ',' && !insideQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())
    
    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = values[index] || ''
    })
    
    // Map Spanish column names to English
    const product: Product = {
      id: row['id'] || String(i),
      name: row['nombre'] || row['name'] || '',
      description: row['descripcion'] || row['description'] || '',
      price: parseFloat(row['precio'] || row['price'] || '0'),
      image: row['imagen'] || row['image'] || '',
      batteryPercentage: row['bateria'] || row['battery'] 
        ? parseInt(row['bateria'] || row['battery']) 
        : null,
      category: (row['categoria'] || row['category'] || 'iphone').toLowerCase() as Category,
      condition: (row['condicion'] || row['condition'] || 'seminuevo').toLowerCase() as Condition,
      stockStatus: normalizeStockStatus(row['stock'] || row['stockstatus'] || 'disponible'),
    }
    
    if (product.name) {
      products.push(product)
    }
  }
  
  return products
}

function normalizeStockStatus(status: string): StockStatus {
  const normalized = status.toLowerCase().trim()
  if (normalized.includes('disponible') || normalized === 'en stock' || normalized === 'available') {
    return 'disponible'
  }
  if (normalized.includes('camino') || normalized === 'en camino' || normalized === 'on the way') {
    return 'en_camino'
  }
  return 'agotado'
}

// Demo products for when no Google Sheets URL is configured
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    description: 'Titanio Natural. Pantalla Super Retina XDR de 6.7 pulgadas. Chip A17 Pro. Sistema de cámara Pro de 48MP.',
    price: 1299000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
    batteryPercentage: 100,
    category: 'iphone',
    condition: 'sellado',
    stockStatus: 'disponible'
  },
  {
    id: '2',
    name: 'iPhone 14 Pro 128GB',
    description: 'Morado Oscuro. Pantalla Super Retina XDR con ProMotion. Dynamic Island. Chip A16 Bionic.',
    price: 899000,
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&q=80',
    batteryPercentage: 92,
    category: 'iphone',
    condition: 'seminuevo',
    stockStatus: 'disponible'
  },
  {
    id: '3',
    name: 'MacBook Air M2 256GB',
    description: 'Chip Apple M2. Pantalla Liquid Retina de 13.6". 8GB RAM. Midnight.',
    price: 1199000,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
    batteryPercentage: null,
    category: 'mac',
    condition: 'sellado',
    stockStatus: 'disponible'
  },
  {
    id: '4',
    name: 'MacBook Pro 14" M3 Pro',
    description: 'Chip M3 Pro con CPU de 12 núcleos. 18GB RAM. 512GB SSD. Space Black.',
    price: 2499000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    batteryPercentage: null,
    category: 'mac',
    condition: 'sellado',
    stockStatus: 'en_camino'
  },
  {
    id: '5',
    name: 'AirPods Pro 2da Gen',
    description: 'Cancelación activa de ruido. Audio espacial personalizado. Estuche MagSafe.',
    price: 299000,
    image: 'https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?w=800&q=80',
    batteryPercentage: null,
    category: 'audio',
    condition: 'sellado',
    stockStatus: 'disponible'
  },
  {
    id: '6',
    name: 'AirPods Max',
    description: 'Audio de alta fidelidad. Cancelación activa de ruido. Modo de sonido ambiente. Sky Blue.',
    price: 649000,
    image: 'https://images.unsplash.com/photo-1625245488600-f03fef636a3c?w=800&q=80',
    batteryPercentage: null,
    category: 'audio',
    condition: 'seminuevo',
    stockStatus: 'disponible'
  },
  {
    id: '7',
    name: 'iPhone 13 128GB',
    description: 'Verde. Sistema de cámara dual de 12MP. Chip A15 Bionic. Pantalla Super Retina XDR.',
    price: 549000,
    image: 'https://images.unsplash.com/photo-1632633173522-47456de71b76?w=800&q=80',
    batteryPercentage: 85,
    category: 'iphone',
    condition: 'usado',
    stockStatus: 'disponible'
  },
  {
    id: '8',
    name: 'Mac Mini M2',
    description: 'Chip Apple M2. 8GB RAM. 256GB SSD. Increíblemente compacto y potente.',
    price: 699000,
    image: 'https://images.unsplash.com/photo-1681566995849-c8b8c9197db3?w=800&q=80',
    batteryPercentage: null,
    category: 'mac',
    condition: 'usado',
    stockStatus: 'agotado'
  },
  {
    id: '9',
    name: 'iPhone 15 128GB',
    description: 'Rosa. Dynamic Island. Cámara de 48MP. USB-C. Chip A16 Bionic.',
    price: 899000,
    image: 'https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=800&q=80',
    batteryPercentage: 100,
    category: 'iphone',
    condition: 'sellado',
    stockStatus: 'en_camino'
  },
  {
    id: '10',
    name: 'HomePod mini',
    description: 'Audio de 360°. Siri integrado. Sonido increíble en un diseño compacto. Blanco.',
    price: 129000,
    image: 'https://images.unsplash.com/photo-1617143207675-e7e6371f5f5d?w=800&q=80',
    batteryPercentage: null,
    category: 'audio',
    condition: 'sellado',
    stockStatus: 'disponible'
  }
]

export async function GET() {
  try {
    if (GOOGLE_SHEETS_CSV_URL) {
      const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
        next: { revalidate: 60 } // Cache for 60 seconds
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch from Google Sheets')
      }
      
      const csv = await response.text()
      const products = parseCSV(csv)
      
      return NextResponse.json(products)
    }
    
    // Return demo products if no Google Sheets URL is configured
    return NextResponse.json(demoProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    // Return demo products as fallback
    return NextResponse.json(demoProducts)
  }
}
