import MealDetail from "@/components/MealList/MealDetail";
import { API_BASE_URL, API_ROUTES } from "@/utils/api";
import axios from "axios";
function slugify(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-");
}
export async function generateStaticParams() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/meals/allmeals`)
        return res.data.meals.map(meal => ({
            id: `${meal.id}-${meal.slug}`,
        }))
    } catch (error) {
        console.warn("⚠️ Backend unavailable during build, using empty path.")
        return []
    }
}
/* for now i have used id-slug will implement best practice later  */
export default async function MealDetailsPage(props) {
    const params = await props.params
    const [id] = params.id.split("-")
    return <MealDetail id={id} />;
}