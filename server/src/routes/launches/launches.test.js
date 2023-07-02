//DEPENDENCIES
const request = require("supertest")

//Express application
const app = require("../../app")


describe("Test GET /launches", () => {

    test("It should respond with 200 succes", async () => { 
        const response = await request(app)
        .get("/launches")
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
            target: "Unicron"
        }

    const launchDataWithoutDate = {
            mission: "Destroy the Unicron",
            rocket: "Jetfire",
            target: "Unicron"
        }
    const launchDataWithInvalidDate = {
            mission: "Destroy the Unicron",
            rocket: "Jetfire",
            launchDate: "zoot",
            target: "Unicron"
    }
    test("It should respond with 201 created" , async () => {
        const response = await request(app)
        .post("/launches")
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
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400)

        expect(response.body).toStrictEqual({
            error: "Missing required launch property" 
        })
        })

    test("It should catch invalid dates", async () => {
        const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400)

        expect(response.body).toStrictEqual({
            error: "Invalid launch date" 
        })  
    })
})