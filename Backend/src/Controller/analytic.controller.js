import { tempData } from "../models/dashBoard.model.js"

// get all data
export const getAllTempData = async (req, res, next) => {
    try {
        const pipeline = []
        pipeline.push({
            $match: {}
        })

        const totalData = await tempData.aggregate(pipeline)
        return res.status(200).json({
            status: "success",
            totalData
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
export const getSearchData = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, query } = req.query;
        const { sector, pestle, country, end_year } = req.body

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
        if (pestle && pestle !== "") {
            pipeline.push({
                $match: {
                    pestle: pestle
                }
            })
        }
        if (sector && sector !== "" && sector !== "Overall") {
            pipeline.push({
                $match: {
                    sector: sector
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
        if (country && country !== "") {
            pipeline.push({
                $match: {
                    country: country
                }
            })
        }

        // if (sortBy && sortType) {
        //     pipeline.push({
        //         $sort: {
        //             [sortBy || "start_year"]: sortType === "desc" ? -1 : 1,
        //         },
        //     });
        // }
        pipeline.push({
            $sort: {
                end_year: 1
            }
        })
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
        const { sector, country, pestle, source, region, topic, end_year } = req.body

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

        function addStage(condition, matchObj) {
            if (condition) {
                pipeline.push({ $match: matchObj });
            }
        }

        addStage(sector && sector !== "" && sector !== "Overall", { sector: sector });
        addStage(country && country !== "", { country: country });
        addStage(end_year && end_year !== "", { end_year: end_year });
        addStage(pestle && pestle !== "", { pestle: pestle });
        addStage(source && source !== "", { source: source });
        addStage(region && region !== "", { region: region });
        addStage(topic && topic !== "", { topic: topic });

        if (pipeline.length === 0) {
            pipeline.push({ $match: {} });
        }

        const dashBoardData = await tempData.aggregate(pipeline)

        let sectorData = new Set()
        let pestleData = new Set()
        let countryData = new Set()
        let topicData = new Set()
        dashBoardData.map((value) => {
            if (value.sector !== "" && !sectorData.has(value))
                sectorData.add(value.sector)
            if (value.pestle !== "" && !pestleData.has(value))
                pestleData.add(value.pestle)
            if (value.country !== "" && !countryData.has(value))
                countryData.add(value.country)
            if (value.topic !== "" && !topicData.has(value))
                topicData.add(value.topic)
        })
        console.log(dashBoardData.length)
        return res.status(200).json({
            status: "success",
            data: [{ id: 1, name: "Sectors", value: [...sectorData] },
            { id: 2, name: "Pestles", value: [...pestleData] },
            { id: 3, name: "Country", value: [...countryData] },
            { id: 4, name: "Topics", value: [...topicData] }],
            dashBoardData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "failed",
            message: "Server error",
        })
    }
}
