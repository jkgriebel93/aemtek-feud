// Family Feud Questions and Answers
// Each question has answers sorted by popularity (points)
// 'accepted' array contains alternative acceptable answers

const QUESTIONS = [
    {
        question: "Name something people do to relax after a long day at work.",
        answers: [
            { text: "Watch TV", points: 35, accepted: ["television", "netflix", "streaming", "tv"] },
            { text: "Take a Bath/Shower", points: 22, accepted: ["bath", "shower", "bathe"] },
            { text: "Have a Drink", points: 18, accepted: ["drink", "beer", "wine", "alcohol"] },
            { text: "Sleep/Nap", points: 12, accepted: ["sleep", "nap", "rest"] },
            { text: "Exercise", points: 8, accepted: ["workout", "gym", "run", "jog"] },
            { text: "Read", points: 5, accepted: ["book", "reading"] }
        ]
    },
    {
        question: "Name a popular pizza topping.",
        answers: [
            { text: "Pepperoni", points: 40, accepted: ["pepperoni"] },
            { text: "Mushrooms", points: 20, accepted: ["mushroom"] },
            { text: "Sausage", points: 15, accepted: ["italian sausage"] },
            { text: "Cheese", points: 10, accepted: ["extra cheese", "mozzarella"] },
            { text: "Peppers", points: 8, accepted: ["bell peppers", "green peppers", "pepper"] },
            { text: "Onions", points: 5, accepted: ["onion"] },
            { text: "Olives", points: 2, accepted: ["olive", "black olives"] }
        ]
    },
    {
        question: "Name something you might find in a doctor's office.",
        answers: [
            { text: "Stethoscope", points: 30, accepted: ["stethoscopes"] },
            { text: "Magazines", points: 22, accepted: ["magazine", "reading material"] },
            { text: "Scale", points: 18, accepted: ["weight scale", "weighing scale"] },
            { text: "Exam Table", points: 12, accepted: ["examination table", "table"] },
            { text: "Blood Pressure Cuff", points: 10, accepted: ["blood pressure", "bp cuff"] },
            { text: "Tongue Depressor", points: 5, accepted: ["tongue depressors", "popsicle stick"] },
            { text: "Cotton Balls", points: 3, accepted: ["cotton"] }
        ]
    },
    {
        question: "Name a reason someone might be late for work.",
        answers: [
            { text: "Traffic", points: 35, accepted: ["car traffic", "traffic jam"] },
            { text: "Overslept", points: 28, accepted: ["slept in", "alarm didn't go off", "alarm"] },
            { text: "Car Trouble", points: 15, accepted: ["car problems", "car broke down", "flat tire"] },
            { text: "Kids", points: 10, accepted: ["children", "dropped kids off", "kid"] },
            { text: "Weather", points: 7, accepted: ["bad weather", "snow", "rain"] },
            { text: "Sick", points: 5, accepted: ["illness", "not feeling well"] }
        ]
    },
    {
        question: "Name a place where you have to be quiet.",
        answers: [
            { text: "Library", points: 42, accepted: ["the library"] },
            { text: "Church", points: 25, accepted: ["temple", "mosque", "synagogue"] },
            { text: "Movie Theater", points: 15, accepted: ["movies", "cinema", "theater"] },
            { text: "Hospital", points: 10, accepted: ["doctor's office", "clinic"] },
            { text: "Funeral", points: 5, accepted: ["funeral home", "cemetery"] },
            { text: "Classroom", points: 3, accepted: ["school", "class"] }
        ]
    },
    {
        question: "Name something you might see at a beach.",
        answers: [
            { text: "Sand", points: 30, accepted: ["sand castle", "sandcastle"] },
            { text: "Ocean/Water", points: 25, accepted: ["water", "waves", "ocean", "sea"] },
            { text: "Seagulls", points: 15, accepted: ["birds", "seagull", "gulls"] },
            { text: "Umbrellas", points: 12, accepted: ["umbrella", "beach umbrella"] },
            { text: "Sunbathers", points: 10, accepted: ["people", "swimmers", "sunbathing"] },
            { text: "Shells", points: 5, accepted: ["seashells", "shell"] },
            { text: "Lifeguard", points: 3, accepted: ["lifeguards", "lifeguard tower"] }
        ]
    },
    {
        question: "Name something people collect.",
        answers: [
            { text: "Stamps", points: 32, accepted: ["stamp"] },
            { text: "Coins", points: 28, accepted: ["coin", "money"] },
            { text: "Baseball Cards", points: 15, accepted: ["cards", "sports cards", "trading cards"] },
            { text: "Art", points: 10, accepted: ["paintings", "artwork"] },
            { text: "Dolls", points: 8, accepted: ["doll", "action figures"] },
            { text: "Antiques", points: 5, accepted: ["antique", "vintage items"] },
            { text: "Rocks", points: 2, accepted: ["stones", "minerals", "crystals"] }
        ]
    },
    {
        question: "Name a common New Year's resolution.",
        answers: [
            { text: "Lose Weight", points: 38, accepted: ["diet", "get thin", "weight loss"] },
            { text: "Exercise More", points: 25, accepted: ["work out", "gym", "get fit", "exercise"] },
            { text: "Save Money", points: 15, accepted: ["spend less", "budget"] },
            { text: "Quit Smoking", points: 10, accepted: ["stop smoking", "quit cigarettes"] },
            { text: "Eat Healthier", points: 7, accepted: ["healthy eating", "better diet"] },
            { text: "Read More", points: 5, accepted: ["read books", "reading"] }
        ]
    },
    {
        question: "Name something you do every morning.",
        answers: [
            { text: "Brush Teeth", points: 30, accepted: ["brush my teeth", "teeth brushing"] },
            { text: "Shower", points: 25, accepted: ["take a shower", "bathe", "bath"] },
            { text: "Eat Breakfast", points: 18, accepted: ["breakfast", "eat"] },
            { text: "Get Dressed", points: 12, accepted: ["dress", "put on clothes", "change"] },
            { text: "Coffee", points: 10, accepted: ["drink coffee", "make coffee", "tea"] },
            { text: "Check Phone", points: 5, accepted: ["phone", "look at phone", "emails"] }
        ]
    },
    {
        question: "Name a popular pet.",
        answers: [
            { text: "Dog", points: 40, accepted: ["dogs", "puppy", "puppies"] },
            { text: "Cat", points: 30, accepted: ["cats", "kitten", "kittens"] },
            { text: "Fish", points: 12, accepted: ["goldfish", "tropical fish"] },
            { text: "Bird", points: 8, accepted: ["birds", "parrot", "parakeet"] },
            { text: "Hamster", points: 5, accepted: ["gerbil", "guinea pig"] },
            { text: "Rabbit", points: 3, accepted: ["bunny", "bunnies"] },
            { text: "Snake", points: 2, accepted: ["reptile", "lizard"] }
        ]
    },
    {
        question: "Name something you might find in a wallet.",
        answers: [
            { text: "Cash/Money", points: 35, accepted: ["money", "cash", "bills", "dollars"] },
            { text: "Credit Cards", points: 28, accepted: ["credit card", "debit card", "cards"] },
            { text: "Driver's License", points: 18, accepted: ["license", "id", "identification"] },
            { text: "Photos", points: 10, accepted: ["pictures", "photo", "family photos"] },
            { text: "Receipts", points: 5, accepted: ["receipt"] },
            { text: "Business Cards", points: 4, accepted: ["business card"] }
        ]
    },
    {
        question: "Name a yellow fruit.",
        answers: [
            { text: "Banana", points: 50, accepted: ["bananas"] },
            { text: "Lemon", points: 25, accepted: ["lemons"] },
            { text: "Pineapple", points: 12, accepted: ["pineapples"] },
            { text: "Mango", points: 8, accepted: ["mangoes", "mangos"] },
            { text: "Grapefruit", points: 5, accepted: ["grapefruits"] }
        ]
    },
    {
        question: "Name something you might do at a party.",
        answers: [
            { text: "Dance", points: 35, accepted: ["dancing"] },
            { text: "Eat", points: 22, accepted: ["eat food", "snack", "eating"] },
            { text: "Drink", points: 18, accepted: ["drinking", "have drinks"] },
            { text: "Talk/Socialize", points: 12, accepted: ["talk", "chat", "mingle", "socialize"] },
            { text: "Play Games", points: 8, accepted: ["games", "party games"] },
            { text: "Listen to Music", points: 5, accepted: ["music"] }
        ]
    },
    {
        question: "Name a type of footwear.",
        answers: [
            { text: "Sneakers", points: 30, accepted: ["tennis shoes", "athletic shoes", "running shoes"] },
            { text: "Boots", points: 22, accepted: ["boot"] },
            { text: "Sandals", points: 18, accepted: ["sandal", "flip flops", "flip-flops"] },
            { text: "High Heels", points: 12, accepted: ["heels", "pumps", "stilettos"] },
            { text: "Dress Shoes", points: 10, accepted: ["loafers", "oxfords"] },
            { text: "Slippers", points: 5, accepted: ["house slippers"] },
            { text: "Crocs", points: 3, accepted: ["clogs"] }
        ]
    },
    {
        question: "Name something you associate with Superman.",
        answers: [
            { text: "Cape", points: 32, accepted: ["red cape"] },
            { text: "Flying", points: 25, accepted: ["flight", "fly"] },
            { text: "Kryptonite", points: 18, accepted: ["green kryptonite"] },
            { text: "S Logo", points: 12, accepted: ["s", "s symbol", "logo"] },
            { text: "Clark Kent", points: 8, accepted: ["clark", "kent"] },
            { text: "Lois Lane", points: 5, accepted: ["lois"] }
        ]
    },
    {
        question: "Name something people do on their phone.",
        answers: [
            { text: "Text", points: 30, accepted: ["texting", "send texts", "message"] },
            { text: "Call", points: 22, accepted: ["make calls", "phone call", "talk"] },
            { text: "Social Media", points: 18, accepted: ["facebook", "instagram", "twitter", "tiktok"] },
            { text: "Play Games", points: 12, accepted: ["gaming", "games"] },
            { text: "Take Photos", points: 10, accepted: ["photos", "pictures", "camera"] },
            { text: "Email", points: 5, accepted: ["check email", "emails"] },
            { text: "Watch Videos", points: 3, accepted: ["youtube", "videos", "streaming"] }
        ]
    },
    {
        question: "Name a famous cartoon character.",
        answers: [
            { text: "Mickey Mouse", points: 35, accepted: ["mickey"] },
            { text: "Bugs Bunny", points: 22, accepted: ["bugs"] },
            { text: "SpongeBob", points: 18, accepted: ["spongebob squarepants"] },
            { text: "Homer Simpson", points: 12, accepted: ["homer", "simpsons", "bart"] },
            { text: "Scooby-Doo", points: 8, accepted: ["scooby", "scooby doo"] },
            { text: "Tom and Jerry", points: 5, accepted: ["tom", "jerry"] }
        ]
    },
    {
        question: "Name something you put in a sandwich.",
        answers: [
            { text: "Meat", points: 28, accepted: ["ham", "turkey", "beef", "chicken", "bacon"] },
            { text: "Cheese", points: 25, accepted: ["american cheese", "cheddar"] },
            { text: "Lettuce", points: 18, accepted: ["salad", "greens"] },
            { text: "Tomato", points: 12, accepted: ["tomatoes"] },
            { text: "Mayonnaise", points: 10, accepted: ["mayo"] },
            { text: "Mustard", points: 5, accepted: ["yellow mustard"] },
            { text: "Pickles", points: 2, accepted: ["pickle"] }
        ]
    },
    {
        question: "Name something you might find at a construction site.",
        answers: [
            { text: "Hard Hat", points: 28, accepted: ["helmet", "hard hats", "safety helmet"] },
            { text: "Crane", points: 22, accepted: ["cranes"] },
            { text: "Workers", points: 15, accepted: ["construction workers", "people"] },
            { text: "Tools", points: 12, accepted: ["tool", "hammers", "drills"] },
            { text: "Concrete", points: 10, accepted: ["cement", "cement mixer"] },
            { text: "Scaffolding", points: 8, accepted: ["scaffold"] },
            { text: "Caution Tape", points: 5, accepted: ["tape", "warning tape", "barrier"] }
        ]
    },
    {
        question: "Name a vegetable that's green.",
        answers: [
            { text: "Broccoli", points: 30, accepted: [] },
            { text: "Lettuce", points: 22, accepted: ["salad"] },
            { text: "Cucumber", points: 15, accepted: ["cucumbers"] },
            { text: "Peas", points: 12, accepted: ["green peas", "pea"] },
            { text: "Green Beans", points: 10, accepted: ["beans", "string beans"] },
            { text: "Spinach", points: 8, accepted: [] },
            { text: "Celery", points: 3, accepted: [] }
        ]
    },
    {
        question: "Name something that has buttons.",
        answers: [
            { text: "Shirt", points: 30, accepted: ["shirts", "dress shirt", "blouse"] },
            { text: "Remote Control", points: 25, accepted: ["remote", "tv remote"] },
            { text: "Phone", points: 15, accepted: ["telephone", "cell phone"] },
            { text: "Elevator", points: 12, accepted: ["lift"] },
            { text: "Computer", points: 10, accepted: ["keyboard", "mouse"] },
            { text: "Pants", points: 5, accepted: ["jeans", "trousers"] },
            { text: "Game Controller", points: 3, accepted: ["controller", "video game"] }
        ]
    },
    {
        question: "Name something you might order at a coffee shop.",
        answers: [
            { text: "Coffee", points: 35, accepted: ["regular coffee", "black coffee", "drip coffee"] },
            { text: "Latte", points: 22, accepted: ["cafe latte"] },
            { text: "Cappuccino", points: 15, accepted: [] },
            { text: "Espresso", points: 10, accepted: [] },
            { text: "Tea", points: 8, accepted: ["hot tea", "iced tea"] },
            { text: "Muffin", points: 5, accepted: ["pastry", "pastries", "scone"] },
            { text: "Iced Coffee", points: 5, accepted: ["cold brew"] }
        ]
    },
    {
        question: "Name a piece of office equipment.",
        answers: [
            { text: "Computer", points: 35, accepted: ["pc", "laptop", "desktop"] },
            { text: "Printer", points: 25, accepted: ["copier"] },
            { text: "Phone", points: 15, accepted: ["telephone"] },
            { text: "Stapler", points: 10, accepted: [] },
            { text: "Fax Machine", points: 8, accepted: ["fax"] },
            { text: "Scanner", points: 5, accepted: [] },
            { text: "Paper Shredder", points: 2, accepted: ["shredder"] }
        ]
    },
    {
        question: "Name a country known for soccer.",
        answers: [
            { text: "Brazil", points: 35, accepted: [] },
            { text: "England", points: 20, accepted: ["uk", "britain", "united kingdom"] },
            { text: "Spain", points: 15, accepted: [] },
            { text: "Germany", points: 12, accepted: [] },
            { text: "Argentina", points: 10, accepted: [] },
            { text: "Italy", points: 5, accepted: [] },
            { text: "France", points: 3, accepted: [] }
        ]
    },
    {
        question: "Name something you do when you're bored.",
        answers: [
            { text: "Watch TV", points: 32, accepted: ["tv", "netflix", "streaming", "television"] },
            { text: "Sleep", points: 22, accepted: ["nap", "rest"] },
            { text: "Scroll Phone", points: 18, accepted: ["phone", "social media", "browse"] },
            { text: "Eat", points: 12, accepted: ["snack", "eating"] },
            { text: "Read", points: 8, accepted: ["book", "reading"] },
            { text: "Play Games", points: 5, accepted: ["video games", "gaming"] },
            { text: "Clean", points: 3, accepted: ["cleaning", "organize"] }
        ]
    }
];
