import { useLayoutEffect } from 'react'
import { PREFIX, Styles } from './useClasses'
import { toString } from './utils'

function useGlobalStyles(make: () => Styles, deps: any[]): void {
    useLayoutEffect(() => {
        const fullName = `${PREFIX}-Global`
        const style = document.createElement('style')
        style.setAttribute('id', fullName)
        const css = make()
        for (const prop in css) {
            style.innerText += toString(prop, css[prop], '')
        }
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, deps)
}

export default useGlobalStyles
