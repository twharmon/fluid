import { CSSProperties } from 'react'
import { CSSProps, Styles } from './useClasses'

const CAMEL_CASE_RE = new RegExp('([a-z])([A-Z])', 'g')
const PASCAL_CASE_RE = new RegExp('^([A-Z])', 'g')

function camel2kebab(s: string): string {
    return s.replace(PASCAL_CASE_RE, '-$1').replace(CAMEL_CASE_RE, '$1-$2').toLowerCase()
}

export function toString(name: string, props: CSSProps, prefix = '.') {
    let innerText = `${prefix}${name}{`
    const adds: { prop: string, val: CSSProps }[] = []
    const propKeys = Object.keys(props)
    for (let i = 0; i < propKeys.length; i++) {
        if (propKeys[i].startsWith('&')) {
            adds.push({ prop: `${propKeys[i].slice(1)}`, val: props[propKeys[i]] })
        } else {
            const val = props[propKeys[i] as keyof CSSProperties]
            innerText += `${camel2kebab(propKeys[i])}:${val}${i < propKeys.length - 1 ? ';' : ''}`
        }
    }
    innerText += `}`
    for (const add of adds) {
        innerText += toString(`${name}${add.prop}`, add.val)
    }
    return innerText
}


export function createStyles<T extends string>(css: Styles<T>): Styles<T> {
    return css
}