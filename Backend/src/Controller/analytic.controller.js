import { tempData } from "../models/dashBoard.model.js"

// get all data
export const getAllTempData = async (req, res, next) => {
    try {
        const pipeline = []
        pipeline.push({
            $match: {}
        })

        const totalData = await tempData.aggregate(pipeline)
        res.status(200).json({ totalData })
    } catch (error) {
        //console.log(error)
        res.status(500).json({
            status: "failed",
            message: "Server error",
        })
    }
}

// get all insight table data
export const getSearchData = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, query, sortBy, sortType } = req.query;
        const { topic, insight, end_year } = req.body

        const pipeline = [];

        if (query) {
            pipeline.push({
                $search: {
                    index: "Analytics_Search",
                    text: {
                        query: query,
                        path: ["sector", "country", "pestle", "region", "topic"], //search only on title, desc
                    },
                },
            });
        }
        if (topic && topic !== "") {
            pipeline.push({
                $match: {
                    topic: topic
                }
            })
        }
        if (insight && insight !== "") {
            pipeline.push({
                $match: {
                    insight: insight
                }
            })
        }
        if (end_year && end_year !== "") {
            pipeline.push({
                $match: {
                    end_year: end_year
                }
            })
        }

        if (sortBy || sortType) {
            pipeline.push({
                $sort: {
                    [sortBy || "start_year"]: sortType === "desc" ? -1 : 1,
                },
            });
        }
        pipeline.push({
            $project: {
                _id: 0,
            }
        })

        const insightData = tempData.aggregate(pipeline)
        const options = {
            page,
            limit,
        };

        const results = await tempData.aggregatePaginate(insightData, options)
        return res.status(200).json({
            results
        })
    } catch (error) {
        console.error(error) // Log the error
        return res.status(500).json({
            status: "failed",
            message: "Server error",
        })
    }
}

// get dashboard analytics data
export const getDashboardData = async (req, res, next) => {
    try {
        const { sector, country, start_year } = req.body

        const pipeline = []
        // function inputType(inputType) {

        //     if (inputType && inputType !== "") {
        //         // console.log(sector)
        //         total.push({
        //             $match: {
        //                 inputType: inputType
        //             }
        //         })
        //     } else {
        //         total.push({
        //             $match: {}
        //         })
        //     }
        // }
        // console.log(region)
        // if (region) {
        //     inputType(region)
        // }

        if (sector && sector !== "" && sector !== "all") {
            // console.log(sector)
            total.push({
                $match: {
                    sector: sector
                }
            })
        } else {
            total.push({
                $match: {}
            })
        }

        if (country && country !== "") {
            // console.log(country)
            total.push({
                $match: {
                    country: country
                }
            })
        } else {
            total.push({
                $match: {}
            })
        }

        if (start_year && start_year !== "") {
            total.push({
                $match: {
                    start_year: start_year
                }
            })
        } else {
            total.push({
                $match: {}
            })
        }

        const dashBoardData = await tempData.aggregate(pipeline)

        let sectorData = new Set()
        let pestleData = new Set()
        let countryData = new Set()
        let topicData = new Set()
        totalData.map((value) => {
            if (value.sector !== "" && !sectorData.has(value))
                sectorData.add(value.sector)
            if (value.pestle !== "" && !pestleData.has(value))
                pestleData.add(value.pestle)
            if (value.country !== "" && !countryData.has(value))
                countryData.add(value.country)
            if (value.topic !== "" && !topicData.has(value))
                topicData.add(value.topic)
        })
        console.log(topicData.size)
        return res.status(200).json({
            status: "success",
            data: [{ id: 1, value: [...sectorData] },
            { id: 2, value: [...pestleData] },
            { id: 3, value: [...countryData] },
            { id: 4, value: [...topicData] }],
            dashBoardData
        })
    } catch (error) {
        //console.log(error)
        return res.status(500).json({
            status: "failed",
            message: "Server error",
        })
    }
}
