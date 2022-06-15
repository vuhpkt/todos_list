export default function html([first, ...strings], ...values) {
    return values.reduce((acc, value) => 
        acc.concat(value, strings.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('')
}

export function createStore(reducer) {
    let state = reducer()
    const roots = new Map()

    function render(callback) {
        for (const [root, component] of roots) {
            const output = component()
            root.innerHTML = output
        }
        if (typeof callback === 'function') callback()
    }

    return {
        attach(component, root) {
            roots.set(root, component)
            render()
        },
        connect(selector = state => state) {
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state), args))
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args)
            render(args[args.length - 1])
        }
    }
}