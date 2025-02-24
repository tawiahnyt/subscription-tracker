
const arcjetMiddleware = (req, res, next) => {

    try {
        const decision = await aj.protect(req)

        if (decision.isDenied()) {
            
        }
    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
    }
}