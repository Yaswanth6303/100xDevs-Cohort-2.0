import { Router } from "express";
import adminMiddleware from "../middleware/admin.js";
import { Admin, Course } from "../db/index.js";

const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Create new admin
    await Admin.create({ username, password });

    return res.status(200).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Admin not created",
      error: error.message,
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic

  const { title, description, price, imageLink } = req.body;

  const newCourse = new Course({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });

  await newCourse.save();

  res.json({
    message: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  const response = await Course.find({});
  res.json({
    message: "Courses fetched successfully",
    courses: response,
  });
});

export default router;
