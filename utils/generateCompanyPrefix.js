const generateCompanyPrefix = (companyName) => {

    if (!companyName) {
        return "";
    }

    const words = companyName
        .trim()
        .toUpperCase()
        .split(" ")
        .filter(word =>
            ![
                "PRIVATE",
                "LIMITED",
                "PVT",
                "LTD",
                "TECHNOLOGIES",
                "TECHNOLOGY",
                "SERVICES",
                "SERVICE",
                "SOLUTIONS",
                "SOLUTION"
            ].includes(word)
        );

    let prefix = "";

    if (words.length === 1) {
        prefix = words[0].substring(0, 5);
    } else if (words.length === 2) {
        prefix = words[0].substring(0, 3) +
                 words[1].substring(0, 2);
    } else {
        prefix = words.map(word => word[0]).join("");
    }

    return prefix.toUpperCase();
};

module.exports = generateCompanyPrefix;