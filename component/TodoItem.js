import html from '../core.js'

function TodoItem({ title, isCompleted }, index, editIndex) {
    return html`
        <li 
            class="${isCompleted && 'completed'} ${editIndex === index && 'editing'}" 
            ondblclick="dispatch('startEdit', ${index}, () => {
                document.querySelector('.editing .edit').focus()
            })"
        >   
            <div class="view">
                <input
                    class="toggle" 
                    type="checkbox" 
                    ${isCompleted && 'checked'}
                    onchange="dispatch('toggle', ${index})"
                >
                <label>${title}</label>
                <button class="destroy" onclick="dispatch('delete', ${index})"></button>
            </div>
            <input 
                class="edit" 
                value='${title}'
                onfocus="setSelectionRange(${title.length}, ${title.length})"
                onkeyup="event.keyCode === 13 && dispatch('endEdit', ${index}, this.value) ||
                    event.keyCode === 27 && dispatch('cancelEdit')"
                onblur="dispatch('endEdit', ${index}, this.value)"
            >
        </li>
    `
}

export default TodoItem