//DEPENDENCIES
const request = require("supertest")

//Express application
const app = require("../../app")

//MODULES
const { 
    mongoConnect,
    mongoDisconnect
} = require("../../services/mongo")

const { loadPlanetsData } = require("../../models/planets.model")

describe("Launches API", () => {
    beforeAll( async() => {
        await mongoConnect()
        await loadPlanetsData()
    })

    afterAll(async () => {
        await mongoDisconnect()
    })
    describe("Test GET /launches", () => {
        test("It should respond with 200 success", async () => { 
            const response = await request(app)
            .get("/v1/launches")
            .expect("Content-Type", /json/)
            .expect(200)
            // expect(response.statusCode).toBe(200)
        })
    })

    describe("Test Post /launch", () => {
        const completeLaunchData = {
                mission: "Destroy the Unicron",
                rocket: "Jetfire",
                launchDate: "December 31, 2030",
                target: "Kepler-442 b"
            }

        const launchDataWithoutDate = {
                mission: "Destroy the Unicron",
                rocket: "Jetfire",
                target: "Kepler-442 b"
            }
        const launchDataWithInvalidDate = {
                mission: "Destroy the Unicron",
                rocket: "Jetfire",
                launchDate: "zoot",
                target: "Kepler-442 b"
        }
        test("It should respond with 201 created" , async () => {
            const response = await request(app)
            .post("/v1/launches")
            .send(completeLaunchData)
            .expect("Content-Type", /json/)
            .expect(201)

            const requestDate = new Date(completeLaunchData.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()
            // console.log("requestDate", requestDate)
            // console.log("responseDate", responseDate)
            expect(requestDate).toBe(responseDate)

            expect(response.body).toMatchObject(launchDataWithoutDate) 
        })

        test("It should catch missing required properties", async () => {
            const response = await request(app)
            .post("/v1/launches")
            .send(launchDataWithoutDate)
            .expect("Content-Type", /json/)
            .expect(400)

            expect(response.body).toStrictEqual({
                error: "Missing required launch property" 
            })
            })

        test("It should catch invalid dates", async () => {
            const response = await request(app)
            .post("/v1/launches")
            .send(launchDataWithInvalidDate)
            .expect("Content-Type", /json/)
            .expect(400)

            expect(response.body).toStrictEqual({
                error: "Invalid launch date" 
            })  
        })
    })

})

