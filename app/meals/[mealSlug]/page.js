import Image from 'next/image'
import classes from './page.module.css'
import { getAMeal } from '@/lib/meals'
import { notFound } from 'next/navigation'

//title page
export async function generateMetadata({ params }) {
    const meal = getAMeal(params.mealSlug)
    // vào path params lạ => go to notFound
    if (!meal) {
        notFound()
    }
    return {
        title: meal.title,
        description: meal.summary
    }
}

function MealDetailPage({ params }) {
    const meal = getAMeal(params.mealSlug)
    // notFound sẽ tìm tới file not-found gần nhất
    if (!meal) {
        notFound()
    }
    meal.instructions = meal.instructions.replace(/\n/g, '<br/>')
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.create_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main>
                <p className={classes.instructions}
                    dangerouslySetInnerHTML={{ __html: meal.instructions }}>
                </p>
            </main>
        </>
    )
}
export default MealDetailPage