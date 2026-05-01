import { Header } from '@/components/header'
import { Catalog } from '@/components/catalog'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
            Productos Apple
            <br />
            <span className="text-muted-foreground">con garantía</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Encuentra los mejores iPhones, Macs y accesorios de audio. 
            Productos sellados, seminuevos y usados verificados.
          </p>
          
          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-16">
            <div>
              <p className="text-3xl font-bold text-foreground">100+</p>
              <p className="text-sm text-muted-foreground mt-1">Productos</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">6 meses</p>
              <p className="text-sm text-muted-foreground mt-1">Garantía</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">24h</p>
              <p className="text-sm text-muted-foreground mt-1">Envío rápido</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Catalog />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 iStore. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Términos
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacidad
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
