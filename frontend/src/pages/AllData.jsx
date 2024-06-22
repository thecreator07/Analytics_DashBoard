import { useContext } from "react"
import Chart from "react-apexcharts"
import { UserContext } from "../context/userContext"
// analysis
const Analysis = () => {
    const { state } = useContext(UserContext)

    let topicSet = new Set()
    state.userData && state.userData.forEach((item) => {
        if (!topicSet.has(item.topic)) {
            topicSet.add(item.topic)
        }
    })


    let likelihood = [...topicSet].map((item) => {
        let totalLikelihood = state.userData && state.userData.filter((data) => data.topic === item).reduce((a, c) => a + c.likelihood, 0)
        if (totalLikelihood < 500) {
            totalLikelihood += totalLikelihood + 200
        }

        return totalLikelihood
    })

    let relevance = [...topicSet].map((item) => {
        let totalRelevance = state.userData && state.userData.filter((data) => data.topic === item).reduce((a, c) => a + c.relevance, 0)
        if (totalRelevance < 500) {
            totalRelevance += totalRelevance + 100
        }
        return totalRelevance
    })
    //console.log([...topicSet])


    const series = [{
        name: 'Likelihood',
        data: likelihood
    }, {
        name: 'Relevance',
        data: relevance
    }]

    //console.log(series)
    const options = {
        chart: {
            type: 'area',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth'
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: [...topicSet],
            labels: {
                show: false
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: state.theme === "light" ? "#000" : "#fff"
                }
            }
        }
    }


    return (
        <div className='w-full h-full pb-16'>
            <div className='w-full p-8 h-full overflow-auto'>
                <div className={`w-full p-3 ${state.theme === "light" ? "bg-white text-black" : "bg-slate-800 text-white"} rounded-xl border border-[#e5d3ff] shadow-md`}>
                    <h1 className="font-semibold text-lg">Comparison of Likelihood and Relevance across Topics</h1>
                    <p className={`${state.theme === "light" ? "text-gray-500" : "text-gray-200"} text-sm`}>Topic-wise Breakdown: Likelihood and Relevance Insights</p>
                    <div className="w-full mt-3 h-[450px]">
                        <Chart type="area" options={options} series={series} height={"100%"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analysis
