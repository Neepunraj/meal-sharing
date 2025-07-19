import MealDetail from "@/components/MealList/MealDetail";

export async function generateStaticParams() {
    const res = await fetch('http://localhost:8000/api/meals/allmeals', {
        method: 'GET',
    });
    const data = await res.json();
    return data.meals.map((meal) => ({
        id: (meal.id).toString(),
    }));
}
/* for now i have used id-slug will implement best practice later */
export default async function MealDetailsPage(props) {
    const params = await props.params
    const [id] = params.id.split("-")
    return <MealDetail id={id} />;
}