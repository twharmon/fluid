export function darken(color: string, coefficient: number) {
    let [r, g, b] = hexToRgb(color)
    r = Math.min(255, Math.round(r * (1 - coefficient)))
    g = Math.min(255, Math.round(g * (1 - coefficient)))
    b = Math.min(255, Math.round(b * (1 - coefficient)))
    return rgbToStr(r, g, b)
}

export function lighten(color: string, coefficient: number) {
    let [r, g, b] = hexToRgb(color)
    r = Math.min(255, Math.round(r + (255 - r) * coefficient))
    g = Math.min(255, Math.round(g + (255 - g) * coefficient))
    b = Math.min(255, Math.round(b + (255 - b) * coefficient))
    return rgbToStr(r, g, b)
}

export function desaturate(color: string, coefficient: number) {
    let [r, g, b] = hexToRgb(color)
    const [h, s, l] = rgbToHsl(r, g, b);
    [r, g, b] = hslToRgb(h, Math.max(0, s * (1 - coefficient)), l)
    return rgbToStr(r, g, b)
}

export function saturate(color: string, coefficient: number) {
    let [r, g, b] = hexToRgb(color)
    const [h, s, l] = rgbToHsl(r, g, b);
    [r, g, b] = hslToRgb(h, Math.min(1, s / (1 - coefficient)), l)
    return rgbToStr(r, g, b)
}

function hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return [r, g, b]
}

function rgbToStr(r: number, g: number, b: number): string {
    return `#${intToStr(r)}${intToStr(g)}${intToStr(b)}`
}

function intToStr(i: number): string {
    let s = i.toString(16)
    if (s.length === 1) {
        s = `0${s}`
    }
    return s
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    let l = (max + min) / 2
    if (max === min) {
        h = 0
        s = 0
    } else {
        var d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }
    return [h, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    let r, g, b
    if (s === 0) {
        r = l
        g = l
        b = l
    } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s
        var p = 2 * l - q
        r = hue2rgb(p, q, h + 1/3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1/3)
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function hue2rgb(p: number, q: number, t: number): number {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
}
