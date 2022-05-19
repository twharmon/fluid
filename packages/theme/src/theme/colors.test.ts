import { darken } from './colors'

test('darken', () => {
    const color = '#555555'
    const dark = darken(color, 1)
    expect(dark).toBe('#000000')
})
