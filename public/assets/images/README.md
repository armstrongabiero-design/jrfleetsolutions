# Image Assets

This directory contains image assets for the JR Fleet Solutions landing page.

## Recommended Images

### Hero Section
- **hero-background.jpg** (1920x1080px)
  - High-quality image of modern fleet vehicles or operations center
  - Dark overlay recommended for text readability
  - WebP format for performance

### Visual Elements
- **dashboard-preview.png** (800x600px)
  - Screenshot of the fleet management dashboard
  - Used in solution section
  
- **fleet-operations.jpg** (600x400px)
  - Professional image of fleet in action
  - Used in problem/solution sections

## Optimization Guidelines

1. **Format**: Use WebP with JPEG fallback
2. **Compression**: 80% quality for photographs
3. **Responsive**: Provide 2x versions for retina displays
4. **Alt Text**: Always include descriptive alt text
5. **Lazy Loading**: Use `loading="lazy"` attribute

## Example Usage

```html
<picture>
    <source srcset="assets/images/hero-background.webp" type="image/webp">
    <img src="assets/images/hero-background.jpg" 
         alt="Modern fleet operations center" 
         loading="lazy">
</picture>
```

## Image Credits

Ensure all images have proper licensing for commercial use.
- Stock photos: Unsplash, Pexels, or licensed stock photography
- Custom photography: Professional fleet photography recommended
- Screenshots: Must be from actual JR Fleet Solutions product

---

**Note**: This is a placeholder directory. Add actual images before production deployment.
