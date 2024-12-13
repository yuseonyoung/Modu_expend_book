import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function AddExpenseButton() {
  return (
    <button className="fixed bottom-8 right-8 bg-custom hover:bg-indigo-600 text-white p-4 rounded-full shadow-lg">
      <FontAwesomeIcon icon={faPlus} />
    </button>
  )
}

