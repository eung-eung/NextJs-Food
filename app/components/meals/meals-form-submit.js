'use client'
import { useFormStatus } from 'react-dom'
function MealsFormSubmit() {
    const { pending } = useFormStatus()

    return <button
        disabled={pending}
    >
        {pending ? 'Loading...' : 'Share Meal'}
    </button>

}
export default MealsFormSubmit