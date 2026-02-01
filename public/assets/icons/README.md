# Icon Assets

This directory contains SVG icons used throughout the JR Fleet Solutions landing page.

## Current Icons

All icons are currently inline SVG for performance and customization. The icons used are:

### Navigation & UI
- Hamburger menu (mobile navigation)
- Checkmarks (benefits lists)
- Social media icons (LinkedIn, Twitter)

### Feature Icons
- **Layers** - Fragmented systems (problem section)
- **Clock** - Real-time visibility (problem section)
- **Package** - Scaling limitations (problem section)
- **Cube** - Scalable capability
- **Edit** - Customizable capability
- **Chart** - Data-driven capability
- **Lock** - Enterprise security capability

## Icon Guidelines

### Design Principles
- **Style**: Outline style, 1.5-2px stroke weight
- **Size**: 24x24px base, scales up to 56x56px
- **Color**: Inherits from parent (uses `currentColor`)
- **Format**: SVG (inline or external)

### Custom Icons (If Needed)

To add custom icons:

1. **Create/Export**
   - Design at 24x24px artboard
   - Use 1.5px stroke weight
   - Outline all strokes before export
   - Export as SVG

2. **Optimize**
   ```bash
   # Using SVGO
   npx svgo icon.svg
   ```

3. **Implement**
   ```html
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
       <path d="..."/>
   </svg>
   ```

## Icon Libraries (Optional)

If you need additional icons, recommended sources:

- **Lucide Icons**: https://lucide.dev (free, MIT license)
- **Heroicons**: https://heroicons.com (free, MIT license)
- **Feather Icons**: https://feathericons.com (free, MIT license)
- **Custom Design**: Match brand aesthetic

## Accessibility

Always include proper ARIA labels:

```html
<svg aria-label="Check mark icon" role="img">
    <path d="..."/>
</svg>

<!-- Or hide decorative icons -->
<svg aria-hidden="true">
    <path d="..."/>
</svg>
```

## Performance

- **Inline SVG**: Best for small, frequently used icons
- **External SVG**: Better for large icons or sprite sheets
- **Icon Sprite**: Use for multiple instances of same icon

---

**Note**: All icons currently used are inline SVG for optimal performance and customization.
