'use server'

import { redirect } from "next/navigation"
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache"
function isInvalidText(text) {
    return !text || text.trim() === ''
}
// chơi vs useFormState => truyền thêm 1 param: prevState
export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }
    console.log(meal);
    if (
        isInvalidText(meal.title)
        || isInvalidText(meal.summary)
        || isInvalidText(meal.instructions)
        || isInvalidText(meal.creator)
        || isInvalidText(meal.creator_email)
        || !meal.creator_email.includes('@')
        || !meal.image || meal.image.size === 0
    ) {
        return {
            message: 'Invalid input.'
        }
    }
    await saveMeal(meal)
    // khi production, sau khi create new meal với form thì
    // không show lên được vì còn lưu cache lúc run build, muốn hiện mới thì run build lại
    //
    //=> revalidatePath các đường dẫn để throw cache cũ và chạy lại code fetch bên /meals
    revalidatePath('/meals')
    redirect('/meals')
}