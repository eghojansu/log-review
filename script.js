document.addEventListener('click', event => {
  if (event.target.closest('button') && event.target.dataset.action in handlers) {
    handlers[event.target.dataset.action](event)
  }
})

const update = params => {
  const q = new URLSearchParams(window.location.search)

  if (params) {
    Object.entries(params).forEach(([name, value]) => q.set(name, value))
  }

  window.location = `?${q}`
}
const handlers = {
  next: event => update({ move: 'next', file: event.target.closest('[data-current]')?.dataset.current }),
  prev: event => update({ move: 'prev', file: event.target.closest('[data-current]')?.dataset.current }),
  delete: () => {
    const confirmEl = document.querySelector('input[type=checkbox]')
    const doDelete = async () => {
      try {
        const response = await fetch(window.location.href, {
          method: 'DELETE',
        })
        const result = await response.json()

        update({ success: result.success || '0', file: result.next || '', deleted: result.deleted || '', confirm: confirmEl?.checked ? 1 : 0 })
      } catch (e) {
        alert(e.message)
      }
    }

    if (confirmEl?.checked || confirm('Are you sure?')) {
      doDelete()
    }
  }
}