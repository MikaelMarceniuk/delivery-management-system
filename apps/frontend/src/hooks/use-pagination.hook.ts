import { useState } from 'react'

export function usePagination(defaultPage = 1, defaultSize = 10) {
  const [page, setPageState] = useState(defaultPage)
  const [size, setSizeState] = useState(defaultSize)

  const setPage = (newPage: number) => {
    if (newPage < 1) return
    setPageState(newPage)
  }

  const setSize = (newSize: number) => {
    if (newSize < 1) return
    setSizeState(newSize)
    setPage(1)
  }

  return {
    page,
    size,
    setPage,
    setSize,
  }
}
