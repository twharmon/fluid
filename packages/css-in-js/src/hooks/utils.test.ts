import { toString } from './utils'

test('toString', () => {
    const className = 'test'
    const background = 'white'
    const color = 'black'
    const css = { background, color }
    const output = toString(className, css)
    expect(output).toBe(`.${className}{background:${background};color:${color}}`)
})
