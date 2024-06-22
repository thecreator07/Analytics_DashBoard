const API_URI = import.meta.env.PROD ? window.location.origin : `http://localhost:8000`
// const API_URI = `http://localhost:8000`
// console.log(API_URI)
const SECTORS = [
    "Overall",
    "Energy",
    "Environment",
    "Government",
    "Aerospace & defence",
    "Manufacturing",
    "Retail",
    "Financial services",
    "Support services",
    "Information Technology",
    "Healthcare",
    "Food & agriculture",
    "Automotive",
    "Tourism & hospitality",
    "Construction",
    "Security",
    "Transport",
    "Water",
    "Media & entertainment",
]

export { API_URI, SECTORS }