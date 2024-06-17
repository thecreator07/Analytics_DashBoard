import { tempData } from "../models/dashBoard.model.js"

// get all data
export const getAllTempData = async (req, res, next) => {
    try {
        //console.log(req.body)
        //console.log(req.params)
        const reqBody = [
            "country",
            "end_year",
            "source",
            "pestle",
            "region",
            "sector",
        ]

        Object.keys(req.body).forEach((key) => {
            if (!reqBody.includes(key)) {
                return res.status(400).json({
                    status: "failed",
                    message:
                        "Invalid filter applied. Valid filters are: country, end_year, source, pestle, region, sector",
                })
            }
        })

        const { end_year, sector, country } = req.body
        let filter = {}

        if (end_year && end_year !== "") {
            filter = {
                ...filter,
                end_year,
            }
        }
        if (sector && sector !== "" && sector !== "all") {
            filter = {
                ...filter,
                sector,
            }
        }
        if (country && country !== "") {
            filter = {
                ...filter,
                country,
            }
        }

        // let pageLimit = req.query.show ? parseInt(req.query.show, 10) : 20
        // let page = req.params.page ? parseInt(req.params.page, 10) : 1

        // if (page < 1) {
        //   return res.status(400).json({
        //     status: "failed",
        //     message: "Invalid page number",
        //   })
        // }

        const count = await tempData.countDocuments(filter)
        // const totalPages = Math.ceil(count / pageLimit)

        // if (page > totalPages) {
        //   return res.status(404).json({
        //     status: "failed",
        //     message: "Page not found",
        //   })
        // }

        // let skip = (page - 1) * pageLimit //.skip(skip).limit(pageLimit)

        const response = await tempData.find(filter)

        //console.log(response)

        if (!response || response.length <= 0) {
            return res.status(404).json({
                status: "failed",
                message: "No data found",
            })
        }

        res.status(200).json({
            status: "success",
            // pageLimit,
            totalItems: count,
            // currentPage: page,
            // totalPages,
            data: response,
        })
    } catch (error) {
        //console.log(error)
        res.status(500).json({
            status: "failed",
            message: "Server error",
        })
    }
}

// get all insight table data
export const searchData = async (req, res, next) => {
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
        if (sortBy && sortType) {
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
