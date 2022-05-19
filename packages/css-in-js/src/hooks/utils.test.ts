import { cssToStr } from './utils'

describe('cssToStr', () => {
    test('basic', () => {
        const className = 'test'
        const background = 'white'
        const color = 'black'
        const css = { background, color }
        const output = cssToStr(className, css)
        expect(output).toBe(`.${className}{background:${background};color:${color};}`)
    })

    test('nested', () => {
        const css = {
            color: 'white',
            '& p': { marginBottom: '10px' },
        }
        const output = cssToStr('test', css)
        expect(output).toBe(`.test{color:white;}.test p{margin-bottom:10px;}`)
    })
})