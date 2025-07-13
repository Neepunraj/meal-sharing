import MealDetail from "@/components/MealList/MealDetail";

export async function generateStaticParams() {
    const res = await fetch('http://localhost:8000/api/meals/allmeals', {
        method: 'GET',
    });
    const data = await res.json();
    return data.meals.map((meal) => ({
        id: meal.id.toString(),
    }));
}

export default async function MealDetailsPage(props) {
    const params = await props.params
    return <MealDetail id={params.id} />;
}