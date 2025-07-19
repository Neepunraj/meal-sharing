import MealDetail from "@/components/MealList/MealDetail";
import axios from "axios";
function slugify(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-");
}
export async function generateStaticParams() {
    const res = await axios.get('http://localhost:8000/api/meals/allmeals');
    const meals = res.data.meals
    return meals.map((meal) => ({
        id: `${meal.id}-${slugify(meal.title)}`,
    }));
}
/* for now i have used id-slug will implement best practice later */
export default async function MealDetailsPage(props) {
    const params = await props.params
    const [id] = params.id.split("-")
    return <MealDetail id={id} />;
}