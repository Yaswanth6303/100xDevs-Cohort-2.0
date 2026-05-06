const validateRequest = (schema) => {
    return (req, res, next) => {
        const payload = req.body;
        const parsedPayload = schema.safeParse(payload);
        
        if (!parsedPayload.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data",
                errors: parsedPayload.error.errors
            });
        }
        
        req.validatedData = parsedPayload.data;
        next();
    };
};

export default validateRequest;
