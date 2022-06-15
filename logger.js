export default function logger(reducer) {
    return (prevState, action, args) => {
        console.group(action)
        console.log('Previous State: ', prevState)
        console.log('Action Arguments: ', args)

        const newState = reducer(prevState, action, args)

        console.log('New State: ', newState)
        console.groupEnd()

        return newState
    }
}