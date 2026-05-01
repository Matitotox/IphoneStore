import { Apple } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
              <Apple className="w-6 h-6 text-background" />
            </div>
            <span className="text-xl font-semibold text-foreground tracking-tight">
              iStore
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
              Catálogo
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Garantías
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </nav>

          {/* CTA */}
          <a
            href="#"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-colors"
          >
            WhatsA
          </a>
        </div>
      </div>
    </header>
  )
}
