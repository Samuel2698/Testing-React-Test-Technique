import './App.css'
import { Item } from './components/Item'
import { useItems } from './hooks/useItems'
import { useSEO } from './hooks/useSEO'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`

export interface Item {
  id: ItemId
  timestamp: number
  text: string
}

function App() {
  const { items, addItem, removeItem } = useItems()
  useSEO({
    title: `[${items.length}] Test Technique de React`,
    description: `Ajouter et effacer des éléments d'une liste`
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement

    if (!isInput || input == null) return

    addItem(input.value)

    input.value = ''
  }

  const handleRemoveItem = (id: ItemId) => () => {
    removeItem(id)()
  }

  return (
    <main>
      <aside>
        <h1>Test Technique de React ⚛️</h1>
        <h2>Ajouter et Effacer des Eléments d'une liste</h2>
        <form
          onSubmit={handleSubmit}
          aria-label="Ajouter des éléments à la liste"
        >
          <input name="item" required placeholder="Jeux vidéos 🎮" />
          <button>Ajouter un élément à la liste</button>
        </form>
      </aside>

      <section>
        <h2>Liste d'éléments</h2>

        {items.length === 0 ? (
          <strong>Il n'y a pas d'éléments dans la liste</strong>
        ) : (
          <ul>
            {items.map((item) => (
              <Item
                {...item}
                handleRemove={handleRemoveItem(item.id)}
                key={item.id}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
