import { Router } from 'express';
import userMiddleware from '../middleware/user.js';
import { User, Course } from '../db/index.js';
import jwt from 'jsonwebtoken';
import { JWT_Secret } from '../config.js';

const router = Router();

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;

    const existingUser = await User.findOne({
        username: username,
    });

    if (existingUser) {
        return res.status(400).json({
            message: 'User already exists',
        });
    }

    const user = new User({
        username: username,
        password: password,
    });

    try {
        await user.save();
        return res.status(200).json({
            message: 'User created successfully',
        });
    } catch (error) {
        return res.status(400).json({
            message: 'User not created',
        });
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    const user = await User.findOne({
        username: username,
        password: password,
    });

    if (!user) {
        return res.status(400).json({
            message: 'User not found',
        });
    }

    const token = jwt.sign(
        {
            username: username,
        },
        JWT_Secret
    );

    return res.status(200).json({
        message: 'User signed in successfully',
        token: token,
    });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});

    return res.status(200).json({
        message: 'Courses fetched successfully',
        courses: courses,
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found',
            });
        }

        const user = await User.findOne({
            username: req.username,
        });

        if (user.purchasedCourses && user.purchasedCourses.includes(courseId)) {
            return res.status(400).json({
                message: 'Course already purchased',
            });
        }

        await User.updateOne({ username: req.username }, { $push: { purchasedCourses: courseId } });

        return res.status(200).json({
            message: 'Course purchased successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const user = await User.findOne({
            username: req.username,
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const purchasedCourses = await Course.find({
            _id: { $in: user.purchasedCourses },
        });

        return res.status(200).json({
            message: 'Purchased courses fetched successfully',
            courses: purchasedCourses,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

export default router;
