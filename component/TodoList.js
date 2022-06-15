import html from '../core.js'
import { connect } from '../store.js'

import TodoItem from'./TodoItem.js'

function TodoList({ todos, filter, filters, editIndex }) {
    return html`
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todos
                    .map((todo, index) => filters[filter](todo) && TodoItem(todo, index, editIndex))
                }
            </ul>
        </section>
    `
}

export default connect()(TodoList)