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
    for (const prop in props) {
        if (prop.startsWith('&')) {
            adds.push({ prop: `${prop.slice(1)}`, val: props[prop as keyof CSSProps] as CSSProps })
        } else {
            const val = props[prop as keyof CSSProperties]
            innerText += `${camel2kebab(prop)}:${val};`
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