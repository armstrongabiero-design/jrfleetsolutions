# Adding Custom Favicon

The project includes a basic favicon. For a professional touch, replace the favicon files with your brand assets.

## Required Files

Place these files in the root directory:

1. **favicon.svg** - Modern SVG favicon (recommended)
   - Size: Scalable vector
   - Format: SVG
   - Current: Simple "JR" text logo

2. **favicon.ico** - Legacy favicon
   - Size: 32x32px (or multi-resolution)
   - Format: ICO
   - For older browsers

3. **apple-touch-icon.png** - iOS home screen icon
   - Size: 180x180px
   - Format: PNG
   - For Apple devices

## Quick Generation Tools

### Online Generators
- [Favicon.io](https://favicon.io/) - Generate from text, image, or emoji
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Comprehensive favicon generator
- [Favicon Generator](https://www.favicon-generator.org/) - Simple favicon creator

### Design Tools
- **Figma/Adobe Illustrator**: Create your logo, export as SVG
- **Canva**: Design icon, export as PNG (180x180px)
- **Photoshop**: Create multi-resolution ICO file

## Steps to Replace

1. **Create your favicon**:
   - Use your company logo
   - Keep it simple and recognizable
   - Use brand colors (Gold #D4AF37 and Black #0A0A0A)

2. **Generate all formats**:
   - favicon.svg (preferred)
   - favicon.ico (backup)
   - apple-touch-icon.png (180x180)

3. **Replace files** in root directory:
   ```bash
   /jrfleetsolutions/
   ├── favicon.svg
   ├── favicon.ico
   └── apple-touch-icon.png
   ```

4. **Deploy**: Vercel will automatically serve the new favicons

## Current Favicon

The project includes a basic SVG favicon with:
- "JR" text in gold (#D4AF37)
- Black background (#0A0A0A)
- Matches brand identity

**Replace this with your actual logo for production deployment.**

## Testing

After adding your favicon:
1. Clear browser cache
2. Refresh the page
3. Check browser tab for icon
4. Test on mobile (add to home screen)

---

**Note**: Favicon changes may take time to update due to browser caching.
