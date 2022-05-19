import { CSSProperties } from 'react'
import { CSSProps, Styles } from './useClasses'

const CAMEL_CASE_RE = new RegExp('([a-z])([A-Z])', 'g')
const PASCAL_CASE_RE = new RegExp('^([A-Z])', 'g')

function camelTokebab(s: string): string {
    return s.replace(PASCAL_CASE_RE, '-$1').replace(CAMEL_CASE_RE, '$1-$2').toLowerCase()
}

export function cssToStr(name: string, props: CSSProps, prefix = '.') {
    let innerText = `${prefix}${name}{`
    const adds: { prop: string, val: CSSProps }[] = []
    const propKeys = Object.keys(props)
    for (let i = 0; i < propKeys.length; i++) {
        if (propKeys[i].startsWith('&')) {
            adds.push({ prop: `${propKeys[i].slice(1)}`, val: props[propKeys[i]] })
        } else {
            const val = props[propKeys[i] as keyof CSSProperties]
            innerText += `${camelTokebab(propKeys[i])}:${val};`
        }
    }
    innerText += `}`
    for (const add of adds) {
        innerText += cssToStr(`${name}${add.prop}`, add.val)
    }
    return innerText
}


export function createStyles<T extends string>(css: Styles<T>): Styles<T> {
    return css
}