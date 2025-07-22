const sampleMeals = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta with creamy sauce and bacon.",
        location: "Rome, Italy",
        when: new Date().toISOString(),
        max_reservations: 10,
        price: 120,
        createdAt: new Date().toISOString(),
        imgUrl: "https://res.cloudinary.com/dtm7wbzin/image/upload/v1752334194/mealphoto/fh2akbxkelivapdrrkxy.jpg",
        slug: "spaghetti-carbonara"
    },
    {
        id: 2,
        title: "Sushi Platter",
        description: "Fresh sushi selection including nigiri and rolls.",
        location: "Tokyo, Japan",
        when: new Date().toISOString(),
        max_reservations: 6,
        price: 180,
        createdAt: new Date().toISOString(),
        imgUrl: "https://res.cloudinary.com/dtm7wbzin/image/upload/v1752347896/mealphoto/hklnvi80iwq94p31o6kz.jpg",
        slug: "sushi-platter"
    },
    {
        id: 3,
        title: "Chicken Tikka Masala",
        description: "Tender chicken chunks in rich tomato curry sauce.",
        location: "Delhi, India",
        when: new Date().toISOString(),
        max_reservations: 8,
        price: 140,
        createdAt: new Date().toISOString(),
        imgUrl: "https://res.cloudinary.com/dtm7wbzin/image/upload/v1752347976/mealphoto/rospwtmapcnxkiekef0x.jpg",
        slug: "chicken-tikka-masala"
    }
];

export default sampleMeals;
