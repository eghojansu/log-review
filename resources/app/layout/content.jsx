import { range } from '../lib'

export default ({
  file: {
    content = '',
    name = '',
  } = {},
  filesChecked = false,
  filesCheckeds = [],
  fileRead,
  message,
  loading,
  loadingList,
  reviewCheck = true,
  doubleCheck = true,
  deleting,
  directoryList = [],
  directoryActive,
  directoryPage: {
    items = [],
    page = 1,
    pages = 0,
    from = 0,
    to = 0,
    total = 0,
  } = {},
  sizes = [10, 15, 20, 30, 40, 50],
  size = 15,
  onReviewCheck = () => {},
  onDoubleCheck = () => {},
  onMessageClose = () => {},
  onPage = () => {},
  onSize = () => {},
  onDirectoryNext = () => {},
  onDirectoryPrev = () => {},
  onDirectoryChange = () => {},
  onSearch = () => {},
  onFile = () => {},
  onFilesCheck = () => {},
  onDelete = () => {},
}) => (
  <div class="p-3 flex-grow">
    <div class="mb-3">
      <label>
        <span class="sr-only">Directory</span>
        <select onChange={onDirectoryChange} value={directoryActive} class="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option>Select directory</option>
          {directoryList.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>
      <label class="ms-3">
        <span class="sr-only">Search</span>
        <input
          onKeyDown={onSearch}
          placeholder="Search file"
          type="text"
          class="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
      </label>
      <button type="button" onClick={onDelete} disabled={deleting || !filesCheckeds?.length} class="ms-3 bg-red-300 hover:bg-red-400 active:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 py-2 px-5 rounded disabled:bg-red-100 disabled:text-gray-400">{deleting ? 'Please wait...' : `Delete Selected${filesCheckeds?.length > 0 ? ` (${filesCheckeds.length})` : ''}`}</button>
      <label class="ms-3 inline-flex items-center">
        <input
          checked={doubleCheck}
          onClick={onDoubleCheck}
          type="checkbox"
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          />
        <span class="text-gray-700 ms-2">Confirm before delete</span>
      </label>
      <label class="ms-3 inline-flex items-center">
        <input
          checked={reviewCheck}
          onClick={onReviewCheck}
          type="checkbox"
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          />
        <span class="text-gray-700 ms-2">Check while review</span>
      </label>
    </div>

    <div class="flex gap-3 h-full">
      <div class="w-5/12">
        <table class="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th class="border border-slate-300 p-2 w-px">
                <input type="checkbox" disabled={deleting} checked={filesChecked} onClick={onFilesCheck} />
              </th>
              <th class="border border-slate-300 p-2">File</th>
              <th class="border border-slate-300 p-2">Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.name} onClick={event => onFile(event, item)}>
                <td class="border border-slate-300 p-2">
                  <input type="checkbox" disabled={deleting} checked={filesCheckeds?.includes(item.name)} />
                </td>
                <td class="border border-slate-300 p-2">{item.name}</td>
                <td class="border border-slate-300 p-2">{item.mtime}</td>
              </tr>
            ))}
            {!loadingList && total < 1 && (
              <tr>
                <td colspan="3" class="italic border border-slate-300 p-2">
                  No files
                </td>
              </tr>
            )}
            {loadingList && (
              <tr>
                <td colspan="3" class="italic border border-slate-300 p-2">
                  Please wait...
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div class="flex mt-3">
          <div class="italic">
            {total > 0 && (
              <p>Show {from} &ndash; {to} of {total}</p>
            )}
          </div>
          <div class="flex ms-auto gap-3 items-center">
            <label>
              <span class="text-gray-700 me-3">Page</span>
              <select onChange={onPage} value={page} class="mt-1 py-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {range(pages || page).map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              <span class="text-gray-700 me-3">Size</span>
              <select onChange={onSize} value={size} class="mt-1 py-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {sizes.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <button onClick={onDirectoryPrev} disabled={page <= 1} type="button" class="bg-slate-300 hover:bg-slate-400 active:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-300 py-1 px-3 rounded disabled:bg-slate-100 disabled:text-gray-400">Prev</button>
            <button onClick={onDirectoryNext} disabled={page >= pages} type="button" class="bg-slate-300 hover:bg-slate-400 active:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-300 py-1 px-3 rounded disabled:bg-slate-100 disabled:text-gray-400">Next</button>
          </div>
        </div>
      </div>
      <div class="w-7/12 bg-slate-100 p-3 rounded">
        {loading && (
          <p class="italic my-3">Loading file {fileRead}...</p>
        )}
        {message && (
          <div class={`bg-yellow-300 p-3 rounded mb-5`}>
            <button type="button" onClick={onMessageClose} class="float-end rounded-full bg-slate-100 py-0.5 px-2">x</button>
            <p>{message}</p>
          </div>
        )}
        <p class="italic border-b pb-1 mb-1">{name || 'Please select any file.'}</p>
        {content && <div class="overflow-y-auto break-all whitespace-pre max-h-96">{content}</div>}
      </div>
    </div>
  </div>
)
