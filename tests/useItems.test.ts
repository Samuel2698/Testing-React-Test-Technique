import { describe, test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useItems } from '../src/hooks/useItems'

describe('useItems hook', () => {
  test('should add and remove items', () => {
    const { result } = renderHook(() => useItems())
    // console.log(result.current)

    // expect(result.current.items).toEqual([])
    expect(result.current.items.length).toBe(0)

    act(() => {
      result.current.addItem('yes!')
      result.current.addItem('no!')
    })
    // console.log(result.current.items)

    expect(result.current.items.length).toBe(2)

    act(() => {
      result.current.removeItem(result.current.items[0].id)()
    })

    expect(result.current.items.length).toBe(1)
  })
})
