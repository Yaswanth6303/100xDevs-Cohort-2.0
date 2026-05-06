import { Router } from 'express';
import adminMiddleware from '../middleware/admin.js';
import { Admin, Course } from '../db/index.js';
import jwt from 'jsonwebtoken';
import { JWT_Secret } from '../config.js';

const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // Check if the username with this user is already exists. If it exists, return an error
    // If it doesn't exist, create a new user

    const admin = new Admin({
        username: username,
        password: password,
    });

    await admin.save();

    if (!admin) {
        return res.status(400).json({
            message: 'Admin not created',
        });
    }

    return res.status(200).json({
        message: 'Admin created successfully',
    });
});

router.post('/signin', async (req, res) => {
    // Implement admin signin logic
    const { username, password } = req.body;

    const admin = await Admin.findOne({
        username: username,
        password: password,
    });

    if (!admin) {
        // If admin not exists
        return res.status(411).json({
            message: 'Admin not found',
        });
    }

    const token = jwt.sign(
        {
            username: username,
        },
        JWT_Secret
    );

    return res.status(200).json({
        message: 'Admin signed in successfully',
        token: token,
    });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink } = req.body;

    const newCourse = await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
    });

    return res.status(200).json({
        message: 'Course created successfully',
        courseId: newCourse._id,
    });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    return res.status(200).json({
        courses: response,
    });
});

export default router;