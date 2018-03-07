/*
  Helpers Functions.
*/
function utility_Gender(gen) {
    if (gen === "M")
        return "Male";
    else if (gen === "F")
        return "Female";
}

function utility_Race(race) {
    if (race === "B")
        return "Black African";
    else if (race === "C")
        return "Coloured";
    else if (race === "I")
        return "Indian or Asian";
    else if (race === "W")
        return "White";
    else if (race === "N")
        return "None Dominant";
}

function utility_Review(review) {
    if (review === "P")
        return "Perfomance Increase";
    else if (review === "S")
        return "Starting Salary";
    else if (review === "A")
        return "Annual Increase";
    else if (review === "E")
        return "Expectation Review";
}

function utility_isSenior(level) {
    return (level === "Senior");
}

function utility_isMale(gend) {
    return (gend === "M");
}