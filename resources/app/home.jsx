import { useEffect, useState } from 'preact/hooks'
import Layout from './layout'
import { actionGet } from './lib/api'

export default () => {
  const [app, appSet] = useState({
    page: 1,
    size: 15,
    sizes: [10, 15, 20, 30, 40, 50],
    search: '',
    reviewCheck: true,
    doubleCheck: true,
    fileRead: null,
    filesChecked: false,
    filesCheckeds: [],
  })
  const update = (key, value) => appSet(app => ({ ...app, ...(
    /^o/.test(typeof key) ? key : { [key]: value }
  )}))
  const load = async () => {
    const {
      directories: directoryList = [],
      size = app.size,
      sizes = app.sizes,
    } = (await actionGet('init')) || {}

    update({ directoryList, size, sizes })
  }
  const loadPage = async withUpdate => {
    update({ loadingList: true })

    const { directoryActive, size, page, search } = {
      directoryActive: app.directoryActive,
      size: app.size,
      page: app.page,
      search: app.search,
      ...(withUpdate || {}),
    }
    const directoryPage = await actionGet('directory', directoryActive, {
      size,
      page,
      search,
    })

    update({ ...(withUpdate || {}), directoryPage, loadingList: false })
  }
  const onPage = event => loadPage({ page: event.target.value })
  const onSize = event => loadPage({ page: 1, size: event.target.value })
  const onSearch = event => 'Enter' == event.key && loadPage({ page: 1, search: event.target.value })
  const onDirectoryChange = event => loadPage({ page: 1, directoryActive: event.target.value })
  const onDirectoryPrev = () => loadPage({ page: app.page - 1 })
  const onDirectoryNext = () => loadPage({ page: app.page + 1 })
  const onFile = async (_, { name }) => {
    if (name != app.fileRead) {
      update({ loading: true, fileRead: name, message: '' })

      const file = await actionGet('file', name, {
        directory: app.directoryActive,
      })

      update({ loading: false, file })
    }

    if (app.reviewCheck) {
      update({
        filesCheckeds: (
          app.filesCheckeds.includes(name) ?
            app.filesCheckeds.filter(check => check != name) :
            [...app.filesCheckeds, name]
        )
      })
    }
  }
  const onDelete = async () => {
    if (app.doubleCheck && !confirm('Are you sure?')) {
      return
    }

    update({ deleting: true, message: null })

    const result = await actionGet('delete', app.directoryActive, null, {
      files: app.filesCheckeds,
    })

    loadPage({
      deleting: false,
      message: result?.message || 'Unknown error',
      filesChecked: false,
      filesCheckeds: [],
    })
  }
  const onFilesCheck = event => update({
    filesCheckeds: event.target.checked ? (app.directoryPage?.items.map(({ name }) => name) || []) : [],
    filesChecked: !app.filesChecked,
  })
  const onMessageClose = () => update({
    message: '',
  })
  const onDoubleCheck = event => update({
    doubleCheck: !!event.target.checked,
  })
  const onReviewCheck = event => update({
    reviewCheck: !!event.target.checked,
  })

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <Layout {...{
        ...app,
        onDirectoryChange,
        onDirectoryPrev,
        onDirectoryNext,
        onSearch,
        onPage,
        onSize,
        onFile,
        onFilesCheck,
        onDelete,
        onMessageClose,
        onDoubleCheck,
        onReviewCheck,
      }} />
    </>
  )
}
