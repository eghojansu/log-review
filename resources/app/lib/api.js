export const actionGet = async (action, value, args, payload) => {
  try {
    const setup = new URLSearchParams({ ...(args || {}), action })

    if (value) {
      setup.set(action, value)
    }

    const response = await fetch(`?${setup}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: payload ? JSON.stringify(payload) : null,
    })
    const data = await response.json()

    return data
  } catch (e) {
    return null
  }
}
