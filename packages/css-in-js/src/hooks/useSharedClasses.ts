import { useLayoutEffect, useMemo } from 'react'
import { ClassNameMap, PREFIX, Styles } from './useClasses'
import { cssToStr } from './utils'

const REF_CNT_ATTR = 'data-ref-cnt'

function freeRef(style: Element) {
    const refCnt = parseInt(style.getAttribute(REF_CNT_ATTR) as string)
    if (refCnt === 1) {
        document.head.removeChild(style)
    } else {
        style.setAttribute(REF_CNT_ATTR, (refCnt - 1).toString())
    }
}

function bindRef(style: Element) {
    const refCnt = parseInt(style.getAttribute(REF_CNT_ATTR) as string)
    style.setAttribute(REF_CNT_ATTR, (refCnt + 1).toString())
}


function useSharedClasses<ClassKey extends string>(name: string, make: () => Styles<ClassKey>, deps: any[]): ClassNameMap<ClassKey> {
    useLayoutEffect(() => {
        const fullName = `${PREFIX}-${name}`
        const style = document.head.querySelector(`#${fullName}`) 
        if (style) {
            bindRef(style)
            return () => freeRef(style)
        } else {
            const style = document.createElement('style')
            style.setAttribute('id', fullName)
            style.setAttribute(REF_CNT_ATTR, '1')
            const css = make()
            for (const prop in css) {
                style.innerText += cssToStr(`${fullName}-${prop}`, css[prop])
            }
            document.head.appendChild(style)
            return () => freeRef(style)
        }
    }, [...deps, name])

    const classes = useMemo(() => {
        const fullName = `${PREFIX}-${name}`
        const classes = {} as ClassNameMap<ClassKey>
        const css = make()
        for (const prop in css) {
            classes[prop] = `${fullName}-${prop}`
        }
        return classes
    }, [...deps, name])

    return classes
}

export default useSharedClasses
