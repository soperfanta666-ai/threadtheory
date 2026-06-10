'use client'

interface ColorSwatchProps {
  colors: Array<{ name: string; hex: string }>
  selected: string | null
  onSelect: (colorName: string, colorHex: string) => void
}

export const ColorSwatch = ({ colors, selected, onSelect }: ColorSwatchProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-3">Color</label>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelect(color.name, color.hex)}
            className="group flex flex-col items-center gap-2"
            aria-label={`Select color ${color.name}`}
          >
            <div
              className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                selected === color.name ? 'border-primary scale-125 shadow-lg' : 'border-border'
              }`}
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
              {color.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
